import {createServer} from 'node:http';
import {readFileSync,statSync,createReadStream} from 'node:fs';
import path from 'node:path';

const filename=process.argv[2];
if(!filename)throw Error('Provide a local MP4 path');
const size=statSync(filename).size;
const ownedServer=createServer((req,res)=>{
  if(req.url==='/video'){
    const range=/^bytes=(\d+)-(\d*)$/.exec(req.headers.range||'');
    const start=range?Number(range[1]):0,end=range&&range[2]?Math.min(Number(range[2]),size-1):size-1;
    if(start>end||start>=size){res.writeHead(416);return res.end();}
    res.writeHead(range?206:200,{'Content-Type':'video/mp4','Accept-Ranges':'bytes','Content-Length':end-start+1,...(range?{'Content-Range':`bytes ${start}-${end}/${size}`}:{})});
    createReadStream(filename,{start,end}).pipe(res);return;
  }
  if(req.url!=='/'){res.writeHead(404);return res.end();}
  res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
  res.end('<!doctype html><video id="reference" src="/video" preload="auto" muted controls></video>');
});
await new Promise(resolve=>ownedServer.listen(0,'127.0.0.1',resolve));
process.env.APP_URL='http://127.0.0.1:'+ownedServer.address().port;
const source=readFileSync('tests/beginner-learning.mjs','utf8');
let prefix=source.slice(0,source.indexOf('  const signatures=[];')).replace('.planning/beginner-learning/qa','.planning/ccp-reference-20261002/qa/reference');
prefix=prefix.slice(0,prefix.indexOf('for(const filename of'))+prefix.slice(prefix.indexOf('const profile='));
const run=async function(){
  await navigate('/',"document.querySelector('video')?.readyState>=2");
  const metadata=await evaluate("(()=>{const v=document.querySelector('video');return {duration:v.duration,width:v.videoWidth,height:v.videoHeight,error:v.error?.message}})()");
  if(!Number.isFinite(metadata.duration))throw Error('Video metadata not available');
  writeFileSync(path.join(out,'metadata.json'),JSON.stringify(metadata,null,2));console.log(metadata);
  const times=Array.from({length:20},(_,i)=>Math.min(metadata.duration-.1,.1+i*metadata.duration/20));
  for(let i=0;i<times.length;i++){
    const t=times[i];
    const frame=await evaluate(`(async()=>{const v=document.querySelector('video');await new Promise((resolve,reject)=>{v.addEventListener('seeked',resolve,{once:true});v.addEventListener('error',()=>reject(Error('Seek failed')),{once:true});v.currentTime=${t};});const c=document.createElement('canvas');c.width=v.videoWidth;c.height=v.videoHeight;c.getContext('2d').drawImage(v,0,0);return c.toDataURL('image/png').split(',')[1];})()`);
    writeFileSync(path.join(out,'frame-'+String(i).padStart(2,'0')+'.png'),Buffer.from(frame,'base64'));
  }
  writeFileSync(path.join(out,'times.json'),JSON.stringify(times));console.log('Extracted '+times.length+' frames');
};
const body='\nawait ('+run.toString()+')();\n}finally{if(ws?.readyState===1){try{await call("Browser.close");}catch{}ws.close();}child.unref();}\n';
try{await import('data:text/javascript;base64,'+Buffer.from(prefix+body).toString('base64'));}
catch(error){throw new Error(error.message);}
finally{ownedServer.closeAllConnections();await new Promise(resolve=>ownedServer.close(resolve));}
