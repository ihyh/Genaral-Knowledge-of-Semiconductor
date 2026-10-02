import {readFileSync} from "node:fs";
let prefix=readFileSync("tests/beginner-learning.mjs","utf8");
prefix=prefix.slice(0,prefix.indexOf("  const signatures=[];")).replace(".planning/beginner-learning/qa",".planning/review-round2-20261002/qa/before");
const run=async function(){
 const audit={details:[],replay:[],viewports:[],errors};
 await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
 for(const key of ['design','materials','cleaning','film','lithography','etch','implant','anneal','cmp','interconnect','transfer','feedback','wafer-testing','packaging']) {
  await navigate('/step.html?process='+key,"document.querySelector('#detailContent')?.dataset.process==="+JSON.stringify(key));
  audit.details.push(await evaluate(`(()=>{const c=document.querySelector('#detailContent'),links=[...document.querySelectorAll('#detailContent a,#detailAnimations a')].filter(a=>a.pathname==='/process.html'||a.pathname==='/lithography.html');const counts={};for(const a of links)counts[a.pathname+a.search]=(counts[a.pathname+a.search]||0)+1;return {key:c.dataset.process,characters:c.innerText.length,headings:[...c.querySelectorAll('h2,h3,h4')].map(e=>e.textContent),demoLinks:links.length,duplicates:Object.entries(counts).filter(([k,v])=>v>1),directGlossary:c.textContent.includes('载流子'),readingLink:document.querySelector('#readingFallback').getAttribute('href'),height:c.getBoundingClientRect().height}})()`));
  audit.details.at(-1).missingLabelledBy=await evaluate("[...document.querySelectorAll('#detailContent [aria-labelledby]')].flatMap(e=>e.getAttribute('aria-labelledby').split(/\\s+/).filter(id=>!document.getElementById(id)))");
  if(['materials','film','wafer-testing','packaging'].includes(key))await shot('detail-'+key,undefined,true);
 }
 for(const [from,lesson] of [['etch','patterning'],['packaging','packaging']]) {
  await navigate('/process.html?lesson='+lesson+'&from='+from,"document.querySelector('#player')?.dataset.renderer==='webgl'");
  const initial=await evaluate("Number(document.querySelector('#player').dataset.step)");
  await click('#replay');await click('#play');
  const replay=await evaluate("({step:Number(document.querySelector('#player').dataset.step),title:document.querySelector('#stepTitle').textContent})");
  await click('#stepNav button:last-child');await click('#play');await click('#play');
  audit.replay.push({from,initial,replay,endRestart:await evaluate("({step:Number(document.querySelector('#player').dataset.step),title:document.querySelector('#stepTitle').textContent})")});
 }
 for(const [width,height] of [[320,568],[360,640],[390,844],[844,390]]) {
  await call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false});
  await navigate('/process.html?lesson=patterning&from=etch',"document.querySelector('#player')?.dataset.renderer==='webgl'");
  for(const canvas of ['equipmentCanvas','materialCanvas']) {
   await evaluate(`(()=>{const e=document.getElementById('${canvas}').closest('.scene'),t=document.querySelector('.player-toolbar');scrollTo(0,e.getBoundingClientRect().top+scrollY-t.getBoundingClientRect().height-12)})()`);
   await sleep(100);
   audit.viewports.push(await evaluate(`(()=>{const r=s=>{const b=document.querySelector(s).getBoundingClientRect();return {top:b.top,bottom:b.bottom,height:b.height}};const v=document.querySelector('#${canvas}').getBoundingClientRect(),hit=document.elementFromPoint(v.left+v.width/2,Math.min(innerHeight-1,Math.max(0,v.top+v.height/2)));return {width:innerWidth,height:innerHeight,canvas:'${canvas}',view:r('#${canvas}'),toolbar:r('.player-toolbar'),controls:r('.player-controls'),outcome:r('.current-outcome'),hit:hit?.id||hit?.className,overflow:document.documentElement.scrollWidth>innerWidth}})()`));
   await shot('player-'+width+'x'+height+'-'+canvas,undefined,true);
  }
 }
 await navigate('/chapters.html',"document.readyState==='complete' && !!document.querySelector('#local-layer-cycle')");
 audit.type=await evaluate("({layerFont:parseFloat(getComputedStyle(document.querySelector('.layer-stack')).fontSize),layerCount:document.querySelectorAll('.local-state').length})");
 writeFileSync(path.join(out,'audit.json'),JSON.stringify(audit,null,2));console.log(JSON.stringify(audit));
};
const body="\nawait ("+run.toString()+")();\n} finally {if(ws?.readyState===1){try{await call('Browser.close');}catch{}ws.close();}child.unref();}\n";
try {await import("data:text/javascript;base64,"+Buffer.from(prefix+body).toString("base64"));}
catch(error) {throw new Error(error.message);}

