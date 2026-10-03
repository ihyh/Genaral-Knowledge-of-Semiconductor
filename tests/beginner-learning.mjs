import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdtempSync,readFileSync,mkdirSync,writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { setTimeout as sleep } from "node:timers/promises";

const base=process.env.APP_URL || "http://127.0.0.1:8787";
const processCases=[['materials',5,'svg'],['cleaning',5,'svg'],['patterning',5,'svg'],['implant',5,'svg'],['anneal',5,'svg'],['cmp',5,'svg'],['interconnect',7,'svg'],['metrology',5,'svg'],['inspection',5,'svg'],['packaging',6,'svg']];
const out=path.resolve('.planning/beginner-learning/qa');mkdirSync(out,{recursive:true});
writeFileSync(path.join(out,'results.json'),JSON.stringify({passed:false,status:'running'}));
for(const filename of ['/learn.html','/chapters.html','/process.html','/process.js','/lithography.html','/learning.css','/lithography.js']) assert.equal((await fetch(base+filename)).status,200,filename);


const profile=mkdtempSync(path.join(os.tmpdir(),'fab-learning-ui-'));
const child=spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',[
  '--headless=new','--use-angle=swiftshader','--enable-unsafe-swiftshader','--no-first-run','--no-default-browser-check','--remote-debugging-port=0','--remote-debugging-address=127.0.0.1','--user-data-dir='+profile,'about:blank'
],{windowsHide:true,stdio:'ignore'});
let ws,counter=0;const pending=new Map(),errors=[],requests=[];
async function waitFor(fn,label,timeout=15000) {const until=Date.now()+timeout;while(Date.now()<until){if(await fn())return;await sleep(80);}throw new Error('Timeout: '+label);}
function call(method,params={}) {return new Promise((resolve,reject)=>{const id=++counter;const timer=setTimeout(()=>{pending.delete(id);reject(new Error('CDP timeout '+method));},15000);pending.set(id,{resolve:r=>{clearTimeout(timer);resolve(r);},reject:e=>{clearTimeout(timer);reject(e);}});ws.send(JSON.stringify({id,method,params}));});}
async function evaluate(expression) {const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw new Error(JSON.stringify(r.exceptionDetails));return r.result.value;}
const waitExpr=e=>waitFor(()=>evaluate(e),e);
const click=s=>evaluate('document.querySelector('+JSON.stringify(s)+').click()');
async function navigate(url,ready) {const old=await evaluate('performance.timeOrigin');await call('Page.navigate',{url:base+url});await waitExpr('performance.timeOrigin!=='+old+' && ('+ready+')');await evaluate("document.documentElement.style.scrollBehavior='auto'");}
async function shot(name,selector,viewport=false) {const options={format:'png',captureBeyondViewport:!viewport};if(selector)options.clip=await evaluate(`(()=>{const r=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();return {x:0,y:r.top+scrollY,width:innerWidth,height:r.height,scale:1}})()`);const r=await call('Page.captureScreenshot',options);writeFileSync(path.join(out,name+'.png'),Buffer.from(r.data,'base64'));}
async function overflow(label) {const v=await evaluate('({width:innerWidth,scroll:document.documentElement.scrollWidth})');assert.ok(v.scroll<=v.width+1,label+JSON.stringify(v));}
async function directReading(label) {
  assert.equal(await evaluate("document.querySelectorAll('details,summary').length"),0,label+' has no disclosure controls');
  assert.ok(await evaluate("[...document.querySelectorAll('.reading-block p,.reading-block ol,.concept p,.role-card p')].every(e=>e.getClientRects().length>0 && e.getBoundingClientRect().height>0 && getComputedStyle(e).visibility==='visible')"),label+' complete explanations directly visible');
}
async function frameSignature(canvas) {
  return evaluate(`(()=>{const c=document.getElementById(${JSON.stringify(canvas)}),svgMode=document.getElementById('player').dataset.renderer==='svg';if(svgMode){let t='';for(const n of document.querySelectorAll('.mechanism-svg'))t+=n.outerHTML;let hh=2166136261;for(let i=0;i<t.length;i++)hh=Math.imul(hh^t.charCodeAt(i),16777619);const bb=document.querySelector('.mechanism-svg').getBoundingClientRect();return {hash:hh,contrast:9999,width:Math.round(bb.width),height:Math.round(bb.height),error:0}}const g=c.getContext('webgl'),p=new Uint8Array(c.width*c.height*4);g.readPixels(0,0,c.width,c.height,g.RGBA,g.UNSIGNED_BYTE,p);let h=2166136261,contrast=0;for(let i=0;i<p.length;i+=4){h=Math.imul(h^p[i],16777619);if(p[i]<210)contrast++;}return {hash:h,contrast,width:c.width,height:c.height,error:g.getError()}})()`);
}
try {
  let port;await waitFor(()=>{try{port=Number(readFileSync(path.join(profile,'DevToolsActivePort'),'utf8').split('\n')[0]);return port>0;}catch{return false;}},'Edge ready');
  const tabs=await (await fetch('http://127.0.0.1:'+port+'/json/list')).json();ws=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);
  await new Promise((resolve,reject)=>{ws.addEventListener('open',resolve,{once:true});ws.addEventListener('error',reject,{once:true});});
  ws.addEventListener('message',e=>{const m=JSON.parse(String(e.data));if(m.id){const t=pending.get(m.id);if(!t)return;pending.delete(m.id);if(m.error)t.reject(new Error(JSON.stringify(m.error)));else t.resolve(m.result);}else if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.text);else if(m.method==='Network.requestWillBeSent')requests.push(m.params.request.url);});
  await call('Page.enable');await call('Runtime.enable');await call('Network.enable');
  const signatures=[];
  for(const width of [1440,390,320]) {
    await call('Emulation.setDeviceMetricsOverride',{width,height:width===1440?1000:844,deviceScaleFactor:1,mobile:false});
    await navigate('/learn.html',"!!document.querySelector('#directory')");
    assert.deepEqual(await evaluate("[...document.querySelectorAll('#main>section')].map(e=>e.id)"),['basics','overview','manufacturingFlow','basicsReading'],'ordered learning-entry sections plus basic reading');
    assert.deepEqual(await evaluate("[...document.querySelectorAll('#basics .concept h3')].map(e=>e.textContent)"),['半导体','芯片','晶圆'],'concept order requested by user');
    assert.equal(await evaluate("document.querySelectorAll('#overview .role-card').length"),4);
    assert.ok(await evaluate("['Fabless','Foundry','IDM','封装测试企业'].every(t=>document.querySelector('#overview').textContent.includes(t))"),'company business roles explained');
    assert.equal(await evaluate("document.querySelector('.curriculum,.hero-figure,.overview-grid,.coverage-note,.flow-intro,.sample-callout')"),null,'no redundant home modules');
    assert.equal(await evaluate("document.querySelector('a[href^=\"/process.html\"],a[href=\"/lithography.html\"]')"),null,'equipment demonstrations accessed through process details');
    assert.ok(await evaluate("document.querySelector('#basics').getBoundingClientRect().top<innerHeight && document.querySelector('#basics').getBoundingClientRect().top<document.querySelector('#overview').getBoundingClientRect().top && document.querySelector('#overview').getBoundingClientRect().top<document.querySelector('#manufacturingFlow').getBoundingClientRect().top"),'concepts then companies then process map');
    assert.equal(await evaluate("document.querySelectorAll('.concept').length"),3);
    for(const lesson of ['design','applications','nodes','wafers','yield'])assert.equal(await evaluate('!!document.querySelector(\'a[href="/process.html?lesson='+lesson+'"]\')'),false,'no conceptual animation entry '+lesson);
    assert.equal(await evaluate("document.querySelectorAll('a[href=\"#\"]').length"),0,'no empty lesson links');
    const local=await evaluate("[...document.querySelectorAll('a[href]')].map(a=>a.href).filter(u=>new URL(u).origin===location.origin)");
    for(const url of new Set(local)) assert.equal((await fetch(url)).status,200,url);

    assert.equal(await evaluate("document.querySelectorAll('#manufacturingFlow [data-process]').length"),14,'complete process overview');
    assert.equal(await evaluate("document.querySelector('.hero,.sample-callout')"),null,'no singled-out lithography hero');
    assert.equal(await evaluate("document.querySelector('.learn-header nav a').hash"),'#basics','primary navigation starts with concepts');
    await shot('entry-overview-'+width,undefined,true);
    for(const anchor of ['basics','overview','manufacturingFlow','basicsReading']){
      await click('.learn-header nav a[href="#'+anchor+'"]');await waitExpr('location.hash==='+JSON.stringify('#'+anchor));
      assert.ok(await evaluate('document.getElementById('+JSON.stringify(anchor)+').getBoundingClientRect().top>=-1 && document.getElementById('+JSON.stringify(anchor)+').getBoundingClientRect().top<innerHeight'),'header reaches visible section '+anchor);
    }
    if(width===1440)assert.ok(await evaluate("document.querySelector('.flow-board').getBoundingClientRect().bottom<=innerHeight"),'complete desktop map visible after navigation');
    for(const alias of ['directory','overview']){
      await navigate('/chapters.html',"document.readyState==='complete' && !!document.querySelector('#chapter-1')");
      await navigate('/learn.html#'+alias,"document.readyState==='complete' && !!document.querySelector('#"+alias+"')");
      await waitExpr('document.getElementById('+JSON.stringify(alias)+').getBoundingClientRect().top>=-1 && document.getElementById('+JSON.stringify(alias)+').getBoundingClientRect().top<innerHeight');
      assert.ok(await evaluate('document.getElementById('+JSON.stringify(alias)+').getBoundingClientRect().height>0'),'legacy anchor targets a visible block '+alias);
    }
    await click('.learn-header nav a[href="#manufacturingFlow"]');await waitExpr("location.hash==='#manufacturingFlow'");
    await shot('flow-home-'+width,undefined,true);
    const flowNodes=await evaluate("[...document.querySelectorAll('#manufacturingFlow [data-process]')].map(a=>({key:a.dataset.process,href:a.getAttribute('href'),title:a.querySelector('h3').textContent}))");
    assert.deepEqual(flowNodes.map(n=>n.key),['design','materials','cleaning','film','lithography','etch','implant','anneal','cmp','interconnect','transfer','feedback','wafer-testing','packaging']);
    for(const node of flowNodes){
      await waitExpr("document.readyState==='complete' && !!document.querySelector('#manufacturingFlow [data-process]')");
      await evaluate('document.querySelector(\'#manufacturingFlow [data-process="'+node.key+'"]\').focus()');
      await waitExpr('document.activeElement?.dataset.process==='+JSON.stringify(node.key));
      await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13,text:'\r'});await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
      try {await waitExpr("document.querySelector('#detailContent')?.dataset.process==="+JSON.stringify(node.key));}
      catch(error) {console.log(await evaluate("({url:location.href,focused:document.activeElement?.outerHTML,hasFocus:document.hasFocus(),ready:document.readyState})"));await shot('failed-keyboard-'+node.key+'-'+width,undefined,true);throw error;}
      assert.equal(await evaluate("document.querySelector('#detailTitle').textContent"),node.title);
      await directReading('detail '+node.key+' '+width);
      assert.ok(await evaluate("document.querySelector('#detailContent').textContent.length>150 && document.querySelectorAll('#detailContent .source-line').length===0"),'detail content without source lines '+node.key);
      assert.ok(await evaluate("document.querySelector('#detailContent').getAttribute('aria-busy')==='false'"),'detail loaded status');
      assert.equal(await evaluate("document.getElementById('detailAnimations')"),null,'retired demonstration entry panel removed');
      if(['design','transfer'].includes(node.key))assert.ok(await evaluate("document.getElementById('detailDemos').hidden && document.querySelectorAll('#detailDemos iframe').length===0"),node.key+' is text-only, no empty demonstration panel');
      else assert.ok(await evaluate("!document.getElementById('detailDemos').hidden && document.querySelectorAll('#detailDemos iframe').length>=1"),'equipment demonstration plays in place');
      if(['design','transfer'].includes(node.key))assert.ok(await evaluate("document.getElementById('detailDemos').hidden && document.querySelectorAll('#detailDemos iframe').length===0"),node.key+' has no inline demonstration');
      else {
        const inline=await evaluate("[...document.querySelectorAll('#detailDemos iframe')].map(f=>f.getAttribute('src'))");
        const entries=await evaluate("[...document.querySelectorAll('#detailDemos iframe')].map(f=>f.getAttribute('src').replace(/([?&])embed=1/,''))");
        assert.equal(inline.length,entries.length,node.key+' one inline demonstration per entry');
        assert.deepEqual(inline.map(s=>s.replace(/([?&])embed=1/,'')),entries,node.key+' inline demonstration matches its entry');
        assert.ok(await evaluate("document.getElementById('detailDemos').getBoundingClientRect().top<document.getElementById('detailContent').getBoundingClientRect().top"),node.key+' demonstration shown before the explanation');
        await waitExpr("(()=>{const f=document.querySelector('#detailDemos iframe');const d=f&&f.contentDocument;if(!d)return false;const p=d.getElementById('player');return !!p&&['webgl','svg'].includes(p.dataset.renderer)&&f.getBoundingClientRect().height>320})()");
        assert.ok(await evaluate("(()=>{const f=document.querySelector('#detailDemos iframe'),d=f.contentDocument;return d.documentElement.scrollHeight<=f.clientHeight+3&&d.querySelector('.learn-header').getBoundingClientRect().height===0})()"),node.key+' inline demonstration rendered without page chrome');
      }
      assert.ok(await evaluate("[...document.querySelectorAll('#detailContent a[href^=\"#\"]')].length===0"),'chapter fragment links resolve outside focused detail');
      if(node.key==='packaging')assert.ok(await evaluate("document.querySelector('#detailContent>#package-connections') && document.querySelector('#detailContent>#final-testing') && document.querySelector('#detailContent>#packaging-routes') && !document.querySelector('#detailContent #wafer-testing')"),'packaging detail begins with connections and retains final test/route comparisons, not wafer testing');
      if(node.key==='transfer'){
        assert.equal(await evaluate("document.querySelector('#readingFallback').getAttribute('href')"),'/chapters.html#fab-transfer','transfer canonical reading target');
        assert.ok(await evaluate("['FOUP（Front Opening Unified Pod','AMHS（Automated Material Handling System','OHT（Overhead Hoist Transport','EFEM（Equipment Front End Module','Load Port（','Aligner（','Load Lock（'].every(t=>document.querySelector('#detailContent').textContent.includes(t))"),'transfer acronyms explained on first use');
        assert.equal(await evaluate("document.querySelectorAll('#detailContent .transfer-route>li').length"),6,'six visible carrier-to-wafer handoffs');
        assert.ok(await evaluate("['设备之间搬载具','设备内部搬单片','不以增加薄膜','并非每台设备都需要真空机械手或装载锁','身份与槽位记录','传感器及联锁'].every(t=>document.querySelector('#detailContent').textContent.includes(t))"),'transfer distinguishes transport, processing, optional vacuum route and coordinated safety');
      }
      const expected=await(await fetch(base+'/chapters.html')).text();
      const sourceCheck=await evaluate('(()=>{const source=new DOMParser().parseFromString('+JSON.stringify(expected)+',"text/html").querySelector(document.querySelector("#readingFallback").hash);return [...source.querySelectorAll("p:not(.equipment-entry)")].every(p=>document.querySelector("#detailContent").textContent.includes(p.textContent))})()');
      assert.ok(sourceCheck,'canonical knowledge paragraphs reused '+node.key);
      const ids=await evaluate("[...document.querySelectorAll('[id]')].map(e=>e.id)");
      assert.equal(new Set(ids).size,ids.length,'detail IDs remain unique');
      await overflow('detail '+node.key+' '+width);
      if(['lithography','transfer','wafer-testing','packaging'].includes(node.key))await shot('detail-'+node.key+'-'+width,undefined,true);
      await click('.bottom-nav a[href="/learn.html#manufacturingFlow"]');await waitExpr("location.pathname==='/learn.html' && location.hash==='#manufacturingFlow' && document.readyState==='complete' && !!document.querySelector('#manufacturingFlow [data-process]') && !document.querySelector('#detailContent')");
    }
    await evaluate("document.documentElement.style.scrollBehavior='auto';scrollTo(0,0)");

    await overflow('home '+width);await shot('home-'+width);
    await directReading('home '+width);
    const homeIds=await evaluate("[...document.querySelectorAll('[id]')].map(e=>e.id)");
    assert.equal(new Set(homeIds).size,homeIds.length,'unique home IDs');
    for(const id of ['basics','overview','manufacturingFlow','basicsReading']){await evaluate('document.getElementById("'+id+'").scrollIntoView()');await shot('home-'+id+'-'+width,'#'+id);}
    await click('.chapter-entry a[href="/chapters.html#chapter-1"]');await waitExpr("location.pathname==='/chapters.html' && !!document.querySelector('#chapter-1')");
    for(const id of ['circuit-basics','material-routes','product-routes','packaging-routes'])assert.ok(await evaluate('!!document.getElementById('+JSON.stringify(id)+')'),'advanced foundational reading retained '+id);
    await evaluate("document.documentElement.style.scrollBehavior='auto'");
    assert.ok(await evaluate("document.querySelector('.lesson-hero').textContent.includes('流程详情')"),'hero states where demonstrations live');
    assert.equal(await evaluate("document.querySelectorAll('.chapter-navigation').length"),0,'chapters carry no per-chapter link bar');
    for(let chapter=1;chapter<7;chapter++) {
      await click('.chapter-links a[href="#chapter-'+(chapter+1)+'"]');await waitExpr("location.hash==='#chapter-"+(chapter+1)+"'");
      await overflow('reading transition '+chapter+' '+width);
    }
    await evaluate("document.querySelector('#chapter-7').scrollIntoView({block:'center'})");await sleep(100);await shot('reading-finish-'+width,undefined,true);
    for(let chapter=7;chapter>1;chapter--) {
      await click('.chapter-links a[href="#chapter-'+(chapter-1)+'"]');await waitExpr("location.hash==='#chapter-"+(chapter-1)+"'");
    }
    assert.ok(await evaluate("document.querySelector('#chapter-1 .formal-definition').textContent.includes('电信号') && document.querySelector('#chapter-3').textContent.includes('版图是') && document.querySelector('#chapter-4 .chapter-lead').textContent.includes('衬底指') && document.querySelector('#chapter-5 .formal-definition').textContent.includes('显影选择性移除胶层区域')"),'foundational meanings precede demonstrations');
    await navigate('/chapters.html',"document.querySelectorAll('section.chapter').length===7");
    assert.equal(await evaluate("document.querySelectorAll('.chapter-links a').length"),7);
    assert.equal(await evaluate("document.querySelectorAll('#chapter-5 .process-reading>.reading-block').length"),10,'fabrication has more depth');
    assert.equal(await evaluate("document.querySelectorAll('#circuit-basics .reading-block').length"),3,'three bounded prerequisite explanations');
    assert.ok(await evaluate("document.querySelector('#circuit-signal').textContent.includes('供电') && document.querySelector('#circuit-transistor').textContent.includes('Metal–Oxide–Semiconductor Field-Effect Transistor') && document.querySelector('#circuit-logic').textContent.includes('不是统一的 0 伏和 1 伏') && document.querySelector('#circuit-basics').textContent.includes('不是每处理一条数据就重新光刻晶圆')"),'signal/power, first-use expansion, logical levels and manufacture/use distinction');
    assert.ok(await evaluate("[...document.querySelectorAll('#circuit-basics .reading-block')].every(d=>d.textContent.length>150 && d.querySelectorAll('.source-line').length===0)"),'foundational explanations stay readable without source lines');
    await directReading('chapters '+width);
    assert.equal(await evaluate("document.querySelectorAll('.reading-content>section.chapter').length"),7);
    assert.ok(await evaluate("[...document.querySelectorAll('.chapter .lesson-section')].every(s=>s.querySelector(':scope>h3') && !s.querySelector(':scope>h2'))"),'consistent subsection heading depth');
    assert.equal(await evaluate("getComputedStyle(document.querySelector('#contents')).position"),width===1440?'sticky':'static');
    for(const id of ['circuit-transistor','circuit-logic'])assert.ok(await evaluate('document.querySelector("#'+id+' >h4")?.textContent.length>10 && document.querySelector("#'+id+' p").getBoundingClientRect().height>0'),id+' directly readable');
    await evaluate('document.querySelector(\'#contents a[href="#chapter-1"]\').focus()');
    await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13,text:'\r'});await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
    assert.equal(await evaluate('location.hash'),'#chapter-1','directory keyboard navigation');




    assert.deepEqual(await evaluate("[...document.querySelectorAll('.logic-example tbody tr')].map(r=>[...r.cells].map(c=>c.textContent))"),[['0（低电平）','1（高电平）'],['1（高电平）','0（低电平）']],'inverter example mappings');
    assert.ok(await evaluate("document.querySelector('.logic-example caption').textContent.includes('输出稳定') && document.querySelectorAll('.logic-example th[scope=col]').length===2 && !document.querySelector('#circuit-basics input,#circuit-basics form')"),'explanatory accessible table, not a quiz');
    await evaluate("document.querySelector('.logic-example').scrollIntoView({block:'center'})");await sleep(100);await overflow('logic example '+width);await shot('circuit-logic-'+width,undefined,true);
    await click('#chapter-5 a[href="#circuit-basics"]');assert.equal(await evaluate('location.hash'),'#circuit-basics','manufacturing prerequisite cross-reading');
    assert.ok(await evaluate("[...document.querySelectorAll('section.chapter')].every(c=>c.textContent.length>350 && c.querySelectorAll('.source-line').length===0 && c.querySelector('.chapter-takeaway'))"),'all chapters keep content and takeaway');
    assert.ok(await evaluate("document.querySelector('#chapter-5').textContent.includes('BEOL 不等于晶圆完成后的封装测试')"));
    assert.ok(await evaluate("document.querySelector('#chapter-5').textContent.includes('Atomic Layer Deposition')"));
    assert.equal(await evaluate("document.querySelectorAll('#material-routes .term').length"),3);
    assert.equal(await evaluate("document.querySelectorAll('#product-routes .comparison-note>article').length"),4);
    assert.equal(await evaluate("document.querySelectorAll('#packaging-routes .comparison-note>article').length"),4);
    const diagrams=[['structure-circuit',3],['structure-gan',2],['structure-dram',2],['structure-nand',6],['structure-2d5',4],['structure-stacked',5]];
    assert.ok(await evaluate("[...document.querySelectorAll('#material-routes .terms,#product-routes .comparison-note,#packaging-routes .comparison-note')].every(g=>getComputedStyle(g).alignItems==='start')"),'diagram grids do not stretch text-only cards');
    assert.equal(await evaluate("document.querySelectorAll('.structure-figure').length"),6,'five structural comparisons plus foundational circuit relationship');
    assert.ok(await evaluate("(()=>{const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);return new Set(ids).size===ids.length})()"),'unique chapter and SVG IDs');
    for(const [id,rects] of diagrams) {
      const figure=await evaluate(`(()=>{const f=document.getElementById('${id}'),s=f.querySelector('svg'),v=s.getBoundingClientRect(),labels=[...s.querySelectorAll('text')].map(t=>t.getBoundingClientRect()),refs=s.getAttribute('aria-labelledby').split(' ');return {role:s.getAttribute('role'),refs:refs.map(id=>({tag:document.getElementById(id)?.tagName,text:document.getElementById(id)?.textContent})),rects:s.querySelectorAll('rect').length,caption:f.querySelector('figcaption').textContent,fit:labels.every(r=>r.left>=v.left && r.right<=v.right && r.top>=v.top && r.bottom<=v.bottom),separate:labels.every((a,i)=>labels.every((b,j)=>i===j || a.right<=b.left || b.right<=a.left || a.bottom<=b.top || b.bottom<=a.top)),minimumText:Math.min(...[...s.querySelectorAll('text')].map(t=>parseFloat(getComputedStyle(t).fontSize)*v.width/s.viewBox.baseVal.width))}})()`);
      assert.equal(figure.role,'img',id+' accessible image role');
      assert.deepEqual(figure.refs.map(r=>r.tag),['title','desc'],id+' accessible name and description');
      assert.ok(figure.refs.every(r=>r.text?.length>12) && figure.caption.length>50,id+' complete adjacent explanation');
      assert.equal(figure.rects,rects,id+' bounded structural components');
      assert.ok(figure.fit && figure.separate,id+' labels fit without overlap at '+width);
      assert.ok(figure.minimumText>=12,id+' readable labels at '+width);
      await evaluate('document.getElementById("'+id+'").scrollIntoView({block:"center"})');await sleep(100);await overflow(id+' '+width);await shot(id+'-'+width,undefined,true);
    }
    assert.ok(await evaluate("document.querySelector('#structure-dram figcaption').textContent.includes('功能关系') && document.querySelector('#structure-nand figcaption').textContent.includes('同一个裸片') && document.querySelector('#structure-2d5 figcaption').textContent.includes('独立边界') && document.querySelector('#structure-stacked figcaption').textContent.includes('引线键合')"),'functional role versus die-internal layers versus assembled dies');
    assert.ok(await evaluate("[...document.querySelectorAll('#material-routes article,#product-routes article,#packaging-routes article')].every(a=>a.textContent.length>120)"),'comparisons keep their explanations');
    assert.ok(await evaluate("document.querySelector('#material-routes').textContent.includes('不表示整片衬底一定都是 GaN') && document.querySelector('#material-routes').textContent.includes('不能照搬本章硅直拉法')"),'material and substrate are not conflated');
    assert.ok(await evaluate("document.querySelector('#route-dram').textContent.includes('电容') && document.querySelector('#route-dram').textContent.includes('周期性刷新') && document.querySelector('#route-nand').textContent.includes('不是把多个已经完成的裸片封装叠放') && document.querySelector('#route-power').textContent.includes('不能仅按逻辑制程节点')"),'representative product structure and scope distinctions');
    assert.ok(await evaluate("document.querySelector('#packaging-routes').textContent.includes('不是与倒装或堆叠互斥') && document.querySelector('#package-wafer-level').textContent.includes('Wafer Level Chip Scale Packaging') && document.querySelector('#package-3d').textContent.includes('两者可以同时存在')"),'packaging dimensions and wafer-level meaning');
    assert.ok(await evaluate("document.querySelector('#package-wafer-level>h4') && document.querySelector('#package-wafer-level p').getBoundingClientRect().height>0"),'wafer-level content directly visible');


    assert.ok(await evaluate("(()=>{const row=[...document.querySelectorAll('#packaging-routes .comparison-note>article')].map(a=>a.getBoundingClientRect().bottom);return document.querySelector('#packaging-routes>.lesson-details').getBoundingClientRect().top-Math.max(...row)>=19})()"),'wafer-level disclosure visually separated from comparison cards');
    for(const id of ['material-routes','product-routes','packaging-routes']) {
      await evaluate('document.querySelector("#'+id+'").scrollIntoView()');await overflow(id+' '+width);await sleep(100);await shot(id+'-'+width,undefined,true);
      const layout=await evaluate('(()=>{const a=[...document.querySelectorAll("#'+id+' article")].map(a=>a.getBoundingClientRect());return {first:a[0].top,second:a[1].top}})()');
      assert.ok(layout.second>layout.first,id+' responsive comparison layout');
    }
    await click('#product-routes a[href="#packaging-routes"]');assert.equal(await evaluate('location.hash'),'#packaging-routes');
    await click('#package-3d a[href="#route-nand"]');assert.equal(await evaluate('location.hash'),'#route-nand');
    const chapterLinks=await evaluate("[...document.querySelectorAll('a')].filter(a=>a.origin===location.origin).map(a=>({href:a.href,hash:a.hash,path:a.pathname}))");
    for(const link of chapterLinks) {assert.equal((await fetch(link.href)).status,200,link.href);if(link.path==='/chapters.html' && link.hash)assert.ok(await evaluate('!!document.getElementById('+JSON.stringify(decodeURIComponent(link.hash.slice(1)))+')'),'anchor exists '+link.hash);}
    for(let chapter=1;chapter<=7;chapter++) {await evaluate(`document.querySelector('#chapter-${chapter}').scrollIntoView()`);await overflow('chapter '+chapter+' '+width);}
    assert.deepEqual(await evaluate("[...document.querySelectorAll('#chapter-5 .process-reading>.reading-block')].map(a=>a.id)"),['fab-cleaning','fab-film','fab-lithography','fab-etch','fab-implant','fab-anneal','fab-cmp','fab-interconnect','fab-feedback','fab-transfer']);
    assert.ok(await evaluate("document.querySelector('.reading-content').getBoundingClientRect().width<=880"),'bounded readable column');
    await evaluate("document.querySelector('#chapter-5').scrollIntoView()");await shot('chapters-fabrication-'+width,undefined,true);
    for(const [lesson,count,renderer='webgl'] of processCases) {
      console.log('Checking '+lesson+' at '+width+'px');
      await navigate('/process.html?lesson='+lesson,"document.querySelector('#player')?.dataset.renderer==="+JSON.stringify(renderer));
      assert.equal(await evaluate("document.querySelectorAll('#stepNav button').length"),count);
      assert.equal(await evaluate("document.querySelectorAll('#textSteps li').length"),count);
      await directReading(lesson+' '+width);
      assert.equal(await evaluate("document.querySelector('#player').dataset.playing"),'false');
      assert.ok(await evaluate("document.querySelector('#routeNote').textContent.includes('教学示意')"));
      assert.equal(await evaluate("document.querySelectorAll('.lesson-nav a').length"),processCases.length);
      assert.equal(await evaluate("document.querySelectorAll('.lesson-nav [aria-current=page]').length"),1);
      const returnTarget=await evaluate("document.querySelector('#readingLink').hash");
      assert.equal(await evaluate("document.querySelector('#readingStart').hash"),returnTarget,'pre-reading and return share exact subsection');
      const expectedChapter=await evaluate('window.FabLesson.chapter');
      await click('#readingLink');await waitExpr("location.pathname==='/chapters.html' && location.hash==="+JSON.stringify(returnTarget)+" && !!document.querySelector(location.hash)");
      assert.equal(await evaluate("document.querySelector(location.hash).closest('section.chapter').id"),'chapter-'+expectedChapter,'returns to relevant chapter');
      if(!returnTarget.startsWith('#chapter-')) {
        assert.ok(await evaluate('document.querySelector('+JSON.stringify(returnTarget)+').querySelector("p").getBoundingClientRect().height>0'),'return explanation directly visible');

      }
      await navigate('/process.html?lesson='+lesson,"document.querySelector('#player')?.dataset.renderer==="+JSON.stringify(renderer));
      if(renderer==='svg')assert.ok(await evaluate("document.querySelectorAll('.mechanism-svg').length===2 && document.querySelector('#player').dataset.renderer==='svg'"),'svg mechanism views present '+lesson);
      else {const projection=await evaluate("(()=>{const g=document.querySelector('#materialCanvas').getContext('webgl'),program=g.getParameter(g.CURRENT_PROGRAM);return Array.from(g.getUniform(program,g.getUniformLocation(program,'projection')));})()");assert.equal(projection[11],-1,'unchanged perspective process defaults');assert.equal(projection[15],0);}
      if(width===1440 && ['cleaning','metrology','inspection'].includes(lesson)) {
        const states=await evaluate(`(()=>{const palette={silicon:'si',film:'film',resist:'residue',metal:'metal',white:'white',dark:'dark',fluid:'fluid'};return window.FabLesson.steps.flatMap((_,phase)=>[0,.5,1].map(p=>{const shapes=[];const record=(position,size,color)=>{if(size.every(x=>x>.0001))shapes.push({position,size,color:Array.isArray(color)?JSON.stringify(color):color});};window.FabLesson.drawScene({kind:'material',phase,p,box:record,cyl:record,palette});return {phase,p,shapes};}));})()`);
        const colored=(state,color)=>state.shapes.filter(s=>s.color===color),at=(phase,p)=>states.find(s=>s.phase===phase && s.p===p),initial=at(0,0);
        for(const state of states) {assert.deepEqual(colored(state,'si'),colored(initial,'si'),'carrier remains '+lesson);assert.deepEqual(colored(state,'film'),colored(initial,'film'),'useful material unchanged '+lesson);for(const shape of state.shapes)assert.ok([...shape.position,...shape.size].every(Number.isFinite),'finite '+lesson);}
        if(lesson==='cleaning') {
          assert.equal(colored(initial,'film').length,3);assert.equal(colored(at(2,0),'residue').length,6);assert.equal(colored(at(2,.5),'residue').length,3);assert.equal(colored(at(2,1),'residue').length,0);
          assert.equal(colored(at(1,1),'fluid').length,8);assert.equal(colored(at(3,.5),'fluid').length,8);assert.equal(colored(at(3,1),'fluid').length,0,'drying removes liquid markers');
          assert.ok(colored(at(3,.5),'fluid').every((s,i)=>s.size[0]<colored(at(2,1),'fluid')[i].size[0]));
          const rotating=await evaluate(`(()=>{const shapes=[];window.FabLesson.drawScene({kind:'equipment',phase:2,p:.5,box:(position,size,color,angle)=>{if(color==='film' && size[1]===.14)shapes.push({position,size,angle});},cyl:()=>{},palette:{silicon:'si',film:'film',resist:'residue',metal:'metal',white:'white',dark:'dark',fluid:'fluid'}});return shapes;})()`);
          assert.equal(rotating.length,3);for(let i=0;i<3;i++){assert.ok(Math.abs(rotating[i].position[0]-(i-1)*1.35*.58*Math.cos(2.5))<1e-8);assert.ok(Math.abs(rotating[i].position[2]+(i-1)*1.35*.58*Math.sin(2.5))<1e-8);assert.equal(rotating[i].angle,2.5);}
        } else if(lesson==='metrology') {
          assert.equal(colored(initial,'film').length,1);assert.equal(colored(initial,'film')[0].size[1],.16);
          const points=state=>colored(state,'fluid').filter(s=>s.size[1]===.02);
          assert.equal(points(at(2,0)).length,0);assert.equal(points(at(2,.5)).length,2);assert.equal(points(at(2,1)).length,3);
          const bracket=colored(at(3,1),'residue').find(s=>s.position[0]===2.35);
          assert.ok(Math.abs(bracket.position[1]-bracket.size[1]/2-.18)<1e-8 && Math.abs(bracket.position[1]+bracket.size[1]/2-.34)<1e-8,'annotation spans fixed film interfaces');
          assert.ok(await evaluate("document.querySelector('#routeNote').textContent.includes('不输出数值或通过判定')"));
        } else {
          const red=JSON.stringify([.88,.24,.21]);
          for(const state of states)assert.deepEqual(colored(state,'residue'),colored(initial,'residue'),'inspection never cleans particle');
          assert.equal(colored(initial,'film').length,4,'three lines plus pre-existing bridge');assert.equal(colored(initial,'residue').length,1);
          assert.equal(colored(at(1,1),red).length,0);assert.equal(colored(at(2,0),red).length,0);assert.equal(colored(at(2,.5),red).length,4);assert.equal(colored(at(2,1),red).length,8);
          assert.deepEqual(colored(at(4,1),'film'),colored(initial,'film'),'recording defects does not repair bridge');
          assert.ok(await evaluate("document.querySelector('#routeNote').textContent.includes('不代表真实检出率')"));
        }
      }
      if(width===1440 && ['implant','anneal','cmp','interconnect'].includes(lesson)) {
        const geometry=await evaluate(`(()=>{const palette={silicon:'si',film:'film',resist:'mask',metal:'metal',white:'white',dark:'dark',fluid:'fluid',heat:'heat'};return window.FabLesson.steps.flatMap((_,phase)=>[0,.5,1].map(p=>{const shapes=[];const record=(position,size,color)=>{if(size.every(x=>x>.0001))shapes.push({position,size,color:Array.isArray(color)?JSON.stringify(color):color});};window.FabLesson.drawScene({kind:'material',phase,p,box:record,cyl:record,palette});return {phase,p,shapes};}));})()`);
        const orange=JSON.stringify([.94,.45,.25]),green=JSON.stringify([.26,.72,.5]),copper=JSON.stringify([.72,.47,.27]);
        const colored=(state,color)=>state.shapes.filter(s=>s.color===color),at=(phase,p)=>geometry.find(s=>s.phase===phase && s.p===p);
        if(lesson==='implant') {
          for(const state of geometry) {
            assert.deepEqual(colored(state,'si'),colored(at(0,0),'si'),'implant does not add silicon or change its outline');
            assert.equal(colored(state,green).length,0,'implant is not already annealed');
            for(const marker of colored(state,orange)) {assert.ok(Math.abs(marker.position[0])>.325 && Math.abs(marker.position[0])<1.325,'markers lie in mask openings');assert.ok(marker.position[1]+marker.size[1]/2<.35,'dopant marker is below surface, not a deposited film');}
          }
          assert.equal(colored(at(2,0),orange).length,0);assert.equal(colored(at(2,.5),orange).length,6);assert.equal(colored(at(2,1),orange).length,12);
          assert.equal(colored(at(3,1),'mask').length,0);assert.deepEqual(colored(at(3,1),orange),colored(at(2,1),orange),'strip preserves implanted elements');
        } else if(lesson==='anneal') {
          for(const state of geometry) {assert.deepEqual(colored(state,'si'),colored(at(0,0),'si'));assert.equal(colored(state,orange).length+colored(state,green).length,12,'anneal changes state, not element count');}
          assert.equal(colored(at(2,0),green).length,0);assert.equal(colored(at(2,.5),green).length,6);assert.equal(colored(at(2,1),green).length,12);
          assert.equal(colored(at(2,0),'dark').filter(s=>s.size[0]===.18).length,24);assert.equal(colored(at(2,1),'dark').filter(s=>s.size[0]===.18).length,0);
          assert.deepEqual(colored(at(3,1),green),colored(at(2,1),green),'cooling retains activated-state markers');
        } else if(lesson==='cmp') {
          const lines=state=>colored(state,copper).filter(s=>s.size[1]===.46),excess=state=>colored(state,copper).find(s=>s.size[0]===4.4);
          assert.equal(lines(at(0,0)).length,3);
          for(const state of geometry) {assert.deepEqual(lines(state),lines(at(0,0)),'CMP retains recessed copper');assert.deepEqual(colored(state,'film'),colored(at(0,0),'film'),'dielectric remains');}
          assert.equal(excess(at(2,0)).size[1],.3);assert.equal(excess(at(2,.5)).size[1],.15);assert.equal(excess(at(2,1)),undefined,'overburden removed');
          const inverted=await evaluate(`(()=>{const shapes=[],C={silicon:'si',film:'film',resist:'mask',metal:'metal',white:'white',dark:'dark',fluid:'fluid'};window.FabLesson.drawScene({kind:'equipment',phase:2,p:1,box:(position,size,color)=>{if(Array.isArray(color)&&size[1]>.0001)shapes.push({position,size});},cyl:()=>{},palette:C});return shapes;})()`);
          assert.equal(inverted.length,3);for(const line of inverted)assert.ok(Math.abs(line.position[1]-line.size[1]/2-.16)<1e-8,'processed face contacts pad downward');
        } else {
          const lower=state=>colored(state,copper).find(s=>s.size[0]===3.6 && s.size[1]===.35),via=state=>colored(state,copper).find(s=>s.size[0]===.34),upper=state=>colored(state,copper).find(s=>s.size[0]===.4),excess=state=>colored(state,copper).find(s=>s.size[0]===3.6 && s.size[1]!==.35);
          for(const state of geometry)assert.deepEqual(lower(state),lower(at(0,0)),'lower connection preserved');
          assert.equal(colored(at(2,1),copper).length,1,'etch makes empty openings, not copper');assert.equal(colored(at(3,1),'mask').length,8,'seed lining is separate from fill');
          for(const state of geometry.filter(s=>s.phase>=5)) {assert.deepEqual(via(state),via(at(4,1)));assert.deepEqual(upper(state),upper(at(4,1)));}
          assert.equal(excess(at(5,0)).size[1],.24);assert.equal(excess(at(5,1)),undefined);
          const end=at(6,1),v=via(end),u=upper(end),l=lower(end);
          assert.ok(Math.abs(v.position[1]-v.size[1]/2-(l.position[1]+l.size[1]/2))<1e-8,'via reaches lower line');
          assert.ok(Math.abs(v.position[1]+v.size[1]/2-(u.position[1]-u.size[1]/2))<1e-8,'via reaches upper line');
          assert.ok(colored(end,'film').length>1,'insulation retained in cutaway');
        }
        for(const state of geometry)for(const shape of state.shapes)assert.ok([...shape.position,...shape.size].every(Number.isFinite) && shape.size.every(n=>n>0),'finite positive geometry');
      }
      if(lesson==='patterning') {
        const geometry=await evaluate(`(()=>{const palette={silicon:'si',film:'film',resist:'resist',metal:'metal',white:'white',dark:'dark',fluid:'fluid'};return [1,2,3].map(phase=>{const shapes=[];const record=(position,size,color)=>{if(size.every(x=>x>.0001))shapes.push({position,size,color});};window.FabLesson.drawScene({kind:'material',phase,p:1,box:record,cyl:record,draw:(_,position,size,color)=>record(position,size,color),palette});return {si:shapes.filter(x=>x.color==='si').length,film:shapes.filter(x=>x.color==='film').length,resist:shapes.filter(x=>x.color==='resist').length};});})()`);
        assert.deepEqual(geometry,[{si:1,film:7,resist:4},{si:1,film:4,resist:4},{si:1,film:4,resist:0}],'development leaves film; etch transfers; strip removes resist only');
      }
      const hashes=[];
      for(let i=0;i<count;i++) {
        await click('#stepNav button[data-step="'+i+'"]');
        assert.equal(await evaluate("document.querySelector('#player').dataset.step"),String(i));
        assert.equal(await evaluate("document.querySelector('#player').dataset.progress"),'100');
        assert.equal(await evaluate("document.querySelectorAll('#stepNav [aria-current=step]').length"),1);
        assert.ok(await evaluate("document.querySelector('#activeMechanism').textContent===window.FabLesson.steps[Number(document.querySelector('#player').dataset.step)].name"),'active internal mechanism follows step');
        assert.ok(await evaluate("document.querySelector('#equipmentCanvas').getAttribute('aria-label').includes('设备内部加工机构') && document.querySelector('#animationTitle').textContent.includes('设备内部')"),'equipment mechanism focus');
        assert.ok(await evaluate("document.querySelector('#materialText').textContent.length>20 && document.querySelector('#equipmentText').textContent.length>20"));
        for(const canvas of ['equipmentCanvas','materialCanvas']) {const sig=await frameSignature(canvas);assert.equal(sig.error,0);assert.ok(sig.contrast>500,'nonblank '+lesson+' '+canvas);if(canvas==='materialCanvas')hashes.push(sig.hash);if(width===1440)signatures.push({lesson,step:i,canvas,...sig});}
        if(lesson==='patterning' && i===1)assert.ok(await evaluate("document.querySelector('#materialText').textContent.includes('薄膜仍连续')"));
        if(lesson==='patterning' && i===2)assert.ok(await evaluate("document.querySelector('#materialText').textContent.includes('目标膜被移除')"));
        if(i===2 || i===count-1){await evaluate("document.querySelector('#animation').scrollIntoView()");await shot(lesson+'-step'+i+'-'+width,'#animation');}
        await overflow(lesson+' '+i+' '+width);
      }
      assert.ok(new Set(hashes).size>=3,'distinct material geometry '+lesson);
      assert.equal(await evaluate("document.querySelector('#play').textContent"),'重新播放');
      await click('#play');await waitExpr("document.querySelector('#player').dataset.step==='0' && Number(document.querySelector('#player').dataset.progress)>0");await click('#play');
      await click('#stepNav button[data-step="'+(count-1)+'"]');
      await evaluate("document.querySelector('#timeline').value=98;document.querySelector('#timeline').dispatchEvent(new Event('input',{bubbles:true}))");
      await click('#play');await waitExpr("document.querySelector('#player').dataset.playing==='false' && document.querySelector('#player').dataset.progress==='100'");
      assert.ok(await evaluate("document.querySelector('#playbackStatus').textContent.includes('播放完毕')"));
      await click('#replay');await waitExpr("Number(document.querySelector('#player').dataset.progress)>0");await click('#play');
      const pausedNew=await evaluate("document.querySelector('#player').dataset.progress");await sleep(160);assert.equal(await evaluate("document.querySelector('#player').dataset.progress"),pausedNew);
      await evaluate("document.querySelector('#stepNav button[data-step=\"2\"]').focus()");
      await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13,text:'\r'});await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
      assert.equal(await evaluate("document.querySelector('#player').dataset.step"),'2');
      await evaluate("document.querySelector('#timeline').value=50;document.querySelector('#timeline').dispatchEvent(new Event('input',{bubbles:true}))");assert.equal(await evaluate("document.querySelector('#player').dataset.progress"),'50');
      const still=await frameSignature('equipmentCanvas');await click('#play');await sleep(240);await click('#play');const moving=await frameSignature('equipmentCanvas');
      assert.notEqual(still.hash,moving.hash,'equipment-view animation changes '+lesson);
    }
    for(const [topic,anchor] of Object.entries({applications:'chapter-2',design:'chapter-3',nodes:'concept-nodes',wafers:'concept-wafers',yield:'concept-yield'})){
      await navigate('/process.html?lesson='+topic,"!document.querySelector('#player') && !document.querySelector('#unknownLesson').hidden");
      assert.equal(await evaluate("window.FabLesson"),undefined,'no retired animation initialized');
      assert.ok(await evaluate("document.querySelector('.preview').textContent==='基础阅读' && document.querySelector('#lessonEyebrow').textContent==='基础概念与行业关系' && !document.querySelector('#readingStart').parentElement.textContent.includes('再观察分步演示')"),'retired route has no misleading animation promise');
      assert.equal(await evaluate("document.querySelectorAll('.lesson-nav a').length"),10,'only equipment themes remain in demonstration navigation');
      assert.ok(await evaluate("document.querySelector('#lessonContent').hidden && document.querySelector('#unknownLesson').textContent.includes('知识内容仍完整保留')"),'explicit reading-only fallback');
      assert.equal(await evaluate("document.querySelector('#unknownLesson a').getAttribute('href')"),'/chapters.html#'+anchor,'exact reading fallback');
      await overflow('retired '+topic+' '+width);
      if(topic==='design')await shot('retired-design-'+width,undefined,true);
      await click('#unknownLesson a');await waitExpr("location.pathname==='/chapters.html' && location.hash==="+JSON.stringify('#'+anchor)+" && !!document.querySelector(location.hash)");
      assert.ok(await evaluate("document.querySelector(location.hash).textContent.length>150"),'knowledge survives animation removal');
      for(const removed of ['design','applications','nodes','wafers','yield'])assert.equal(await evaluate('!!document.querySelector(\'a[href="/process.html?lesson='+removed+'"]\')'),false,'no retired chapter CTA');
    }
    await navigate('/lithography.html',"document.querySelector('#player')?.dataset.renderer!=='pending' && document.querySelector('#stepNav button')");
    await directReading('lithography '+width);
    await click('#readingLink');await waitExpr("location.pathname==='/chapters.html' && location.hash==='#fab-lithography' && !!document.querySelector('#fab-lithography')");
    assert.equal(await evaluate("document.querySelector('#fab-lithography').closest('section.chapter').id"),'chapter-5');
    await navigate('/lithography.html',"document.querySelector('#player')?.dataset.renderer!=='pending' && document.querySelector('#stepNav button')");
    assert.equal(await evaluate("document.querySelector('#player').dataset.renderer"),'webgl','actual 3D renderer must work');
    assert.equal(await evaluate("document.querySelector('#player').dataset.playing"),'false','no autoplay');
    assert.equal(await evaluate("document.querySelectorAll('#stepNav button').length"),7);
    await evaluate("document.querySelector('#animation').scrollIntoView()");await overflow('lesson '+width);await shot('lesson-start-'+width);
    for(let i=0;i<7;i++) {
      await click('#stepNav button[data-step="'+i+'"]');
      assert.equal(await evaluate("document.querySelector('#player').dataset.step"),String(i));
      assert.equal(await evaluate("document.querySelector('#player').dataset.progress"),'100');
      assert.ok(await evaluate("document.querySelector('#equipmentText').textContent.length>10 && document.querySelector('#materialText').textContent.length>10"));
      assert.equal(await evaluate("document.querySelectorAll('#stepNav [aria-current=step]').length"),1);
      assert.ok(await evaluate("document.querySelector('#activeMechanism').textContent===document.querySelector('#equipmentName').textContent && document.querySelector('#equipmentCanvas').getAttribute('aria-label').includes('设备内部加工机构')"),'lithography mechanism label follows step');
      for(const canvas of ['equipmentCanvas','materialCanvas']) {
        const signature=await frameSignature(canvas);assert.equal(signature.error,0);assert.ok(signature.contrast>500,'not just blank '+canvas);
        if(width===1440) signatures.push({step:i,canvas,...signature});
      }
      if(i===3 || i===5) {await evaluate("document.querySelector('#animation').scrollIntoView()");await shot('lesson-step'+i+'-'+width);}
      await overflow('step '+i+' '+width);
    }
    assert.ok(await evaluate("document.querySelector('#materialText').textContent.includes('薄膜仍连续')"),'handoff does not imply an etched film');
    await click('#previous');assert.equal(await evaluate("document.querySelector('#player').dataset.step"),'5');
    await click('#next');assert.equal(await evaluate("document.querySelector('#player').dataset.step"),'6');
    await click('#replay');await waitExpr("Number(document.querySelector('#player').dataset.progress)>0");await click('#play');
    const paused=await evaluate("document.querySelector('#player').dataset.progress");await sleep(220);assert.equal(await evaluate("document.querySelector('#player').dataset.progress"),paused);
    await evaluate("const r=document.querySelector('#timeline');r.value=50;r.dispatchEvent(new Event('input',{bubbles:true}))");
    assert.equal(await evaluate("document.querySelector('#player').dataset.progress"),'50');
    // Native keyboard activation, not a scripted click substitute.
    await evaluate("document.querySelector('#stepNav button[data-step=\"3\"]').focus()");
    await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13,text:'\r'});await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
    assert.equal(await evaluate("document.querySelector('#player').dataset.step"),'3');
    await evaluate("document.querySelector('#timeline').value=0;document.querySelector('#timeline').dispatchEvent(new Event('input',{bubbles:true}))");
    const a=await frameSignature('equipmentCanvas');await click('#play');await sleep(240);await click('#play');const b=await frameSignature('equipmentCanvas');assert.notEqual(a.hash,b.hash,'real animation frame changes');
    await evaluate("document.querySelector('#timeline').value=98;document.querySelector('#timeline').dispatchEvent(new Event('input',{bubbles:true}))");
    await click('#play');await waitExpr("document.querySelector('#player').dataset.step==='4'");await click('#play');
    await click('#stepNav button[data-step="6"]');await evaluate("document.querySelector('#timeline').value=98;document.querySelector('#timeline').dispatchEvent(new Event('input',{bubbles:true}))");
    await click('#play');await waitExpr("document.querySelector('#player').dataset.playing==='false' && document.querySelector('#player').dataset.progress==='100'");
    assert.ok(await evaluate("document.querySelector('#playbackStatus').textContent.includes('播放完毕')"),'automatic end is bounded');
    await click('#replay');await waitExpr("document.querySelector('#player').dataset.playing==='true'");
    await evaluate("Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'))");
    assert.equal(await evaluate("document.querySelector('#player').dataset.playing"),'false','hidden-page event stops playback');
    const hiddenProgress=await evaluate("document.querySelector('#player').dataset.progress");await sleep(160);assert.equal(await evaluate("document.querySelector('#player').dataset.progress"),hiddenProgress);
    await evaluate('delete document.hidden');
    console.log('Learning '+width+': directory, concepts, 3D steps/frames, controls, native keyboard and no overflow passed.');
  }
  assert.equal(new Set(signatures.filter(s=>!s.lesson && s.canvas==='materialCanvas').map(s=>s.hash)).size>=4,true,'different lithography material-stage geometry/lighting is visible');
  await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await waitExpr("document.querySelector('#play').disabled");
  assert.equal(await evaluate("document.querySelector('#player').dataset.playing"),'false');await click('#next');await click('#replay');assert.equal(await evaluate("document.querySelector('#player').dataset.playing"),'false');await shot('reduced-motion-320');
  await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
  const injected=await call('Page.addScriptToEvaluateOnNewDocument',{source:"const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return type==='webgl'?null:original.call(this,type,...args)}"});
  await navigate('/lithography.html',"document.querySelector('#player')?.dataset.renderer==='unavailable'");
  assert.equal(await evaluate("document.querySelector('#renderFallback').hidden"),false);await click('#stepNav button[data-step="5"]');
  assert.ok(await evaluate("document.querySelector('#takeaway').textContent.includes('薄膜和硅基底仍连续')"));await evaluate("document.querySelector('#animation').scrollIntoView()");await overflow('fallback');await shot('fallback-320');
  await call('Page.removeScriptToEvaluateOnNewDocument',{identifier:injected.identifier});
  for(const [lesson,,renderer='webgl'] of processCases) {
    await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
    await navigate('/process.html?lesson='+lesson,"document.querySelector('#player')?.dataset.renderer==="+JSON.stringify(renderer));
    assert.equal(await evaluate("document.querySelector('#play').disabled"),true);await click('#replay');assert.equal(await evaluate("document.querySelector('#player').dataset.playing"),'false');
    await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
    await waitExpr("!document.querySelector('#play').disabled && !document.querySelector('#playbackStatus').textContent.includes('减少动态效果')");
    await click('#replay');await waitExpr("document.querySelector('#player').dataset.playing==='true'");
    await evaluate("Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'))");assert.equal(await evaluate("document.querySelector('#player').dataset.playing"),'false');await evaluate('delete document.hidden');
    if(renderer==='webgl'){await evaluate("document.querySelector('#equipmentCanvas').dispatchEvent(new Event('webglcontextlost',{cancelable:true}))");assert.equal(await evaluate("document.querySelector('#player').dataset.renderer"),'unavailable');await click('#stepNav button[data-step="2"]');assert.ok(await evaluate("document.querySelector('#takeaway').textContent.length>10"));}
    else assert.ok(await evaluate("!!document.querySelector('.mechanism-svg')"),'svg mechanism rendered '+lesson);
  }
  for(const key of ['unknown','__proto__','constructor']) {await navigate('/process.html?lesson='+key,"document.querySelector('#unknownLesson')?.hidden===false");assert.equal(await evaluate("document.querySelector('#player')"),null,'unknown lesson is explicit '+key);}
  await navigate('/lithography.html',"document.querySelector('#player')?.dataset.renderer==='webgl'");
  await evaluate("document.querySelector('#equipmentCanvas').dispatchEvent(new Event('webglcontextlost',{cancelable:true}))");assert.equal(await evaluate("document.querySelector('#player').dataset.renderer"),'unavailable');
  await call('Emulation.setScriptExecutionDisabled',{value:true});await call('Page.navigate',{url:base+'/lithography.html'});await sleep(300);await call('Emulation.setScriptExecutionDisabled',{value:false});
  await waitExpr("!!document.querySelector('#textSteps')");assert.equal(await evaluate("document.querySelectorAll('#textSteps li').length"),7);await directReading('no-script lithography');
  await call('Emulation.setScriptExecutionDisabled',{value:true});await call('Page.navigate',{url:base+'/chapters.html'});await sleep(300);await call('Emulation.setScriptExecutionDisabled',{value:false});
  await waitExpr("document.querySelectorAll('section.chapter').length===7");assert.ok(await evaluate("document.querySelector('#chapter-6').textContent.includes('倒装连接')"),'static seven-chapter reading works without scripts');
  await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
  await navigate('/chapters.html',"document.readyState==='complete' && document.querySelectorAll('section.chapter').length===7");
  assert.equal(await evaluate("document.querySelectorAll('.demo-embed,iframe,#detailDemos,p.equipment-entry,.hero-actions').length"),0,'foundational reading keeps no equipment demonstration');
  assert.equal(await evaluate("[...document.querySelectorAll('main a[href]')].filter(a=>/^\/(process\.html|lithography\.html|etch\.html)/.test(a.getAttribute('href'))).length"),0,'foundational reading links to no demonstration page');
  assert.equal(await evaluate("document.querySelector('script')"),null,'foundational reading needs no script');
  await overflow('foundational reading without demonstrations');
  await shot('chapter-reading','#chapter-5');
  assert.equal(await evaluate("document.querySelectorAll('.chapter-navigation').length"),0,'chapters keep no per-chapter link bar without scripts');
  assert.equal(await evaluate("document.querySelectorAll('.structure-figure svg[role=img]').length"),6,'inline figures remain available without scripts');
  await directReading('no-script chapters');assert.ok(await evaluate("document.querySelector('#circuit-logic .logic-example').getBoundingClientRect().height>0"),'logic table visible without script or expansion');
  assert.equal(await evaluate("document.querySelectorAll('#circuit-logic .logic-example tbody tr').length"),2,'static inverter mappings present without scripts');
  assert.ok(await evaluate("[...document.querySelectorAll('.structure-figure')].every(f=>f.querySelector('svg desc')?.textContent.length>50 && f.querySelector('figcaption')?.textContent.length>50)"),'figure alternatives remain readable without scripts');
  assert.ok(await evaluate("document.querySelector('#route-dram').textContent.includes('电容') && document.querySelector('#material-routes').textContent.includes('GaN-on-Si') && document.querySelector('#packaging-routes').textContent.includes('晶圆级封装')"),'all new routes readable without scripts');
  assert.ok(await evaluate("document.querySelector('#package-wafer-level p').getBoundingClientRect().height>0"),'wafer-level explanation visible without scripts');
  await click('.chapter-links a[href="#chapter-2"]');assert.equal(await evaluate('location.hash'),'#chapter-2','chapter directory navigation works without chapter scripts');
  await call('Emulation.setScriptExecutionDisabled',{value:true});await call('Page.navigate',{url:base+'/process.html?lesson=materials'});await sleep(300);await call('Emulation.setScriptExecutionDisabled',{value:false});await waitExpr("!!document.querySelector('noscript a')");assert.ok(await evaluate("document.querySelector('noscript a').getAttribute('href')==='/chapters.html'"));

  await call('Emulation.setDeviceMetricsOverride',{width:768,height:1000,deviceScaleFactor:1,mobile:false});
  await navigate('/learn.html',"!!document.querySelector('#manufacturingFlow')");
  await directReading('tablet map');await overflow('tablet map');await shot('flow-home-768',undefined,true);
  await navigate('/step.html?process=materials',"document.querySelector('#detailContent')?.dataset.process==='materials'");await overflow('tablet detail');await shot('detail-materials-768',undefined,true);
  for(const key of ['unknown','__proto__','constructor']) {
    await navigate('/step.html?process='+key,"document.querySelector('#detailContent')?.getAttribute('aria-busy')==='false' && document.querySelector('#detailMessage')?.textContent.includes('未找到')");
    assert.equal(await evaluate("document.querySelectorAll('#detailDemos iframe').length"),0,'unknown process explicitly handled');
  }
  await call('Page.addScriptToEvaluateOnNewDocument',{source:"window.fetch=async()=>{throw new Error('simulated failure')}" }).then(async script=>{
    await navigate('/step.html?process=cleaning',"document.querySelector('#detailMessage')?.textContent.includes('暂时未能载入')");
    assert.equal(await evaluate("document.querySelector('#readingFallback').getAttribute('href')"),'/chapters.html#fab-cleaning','failed fetch has exact chapter fallback');
    await navigate('/step.html?process=transfer',"document.querySelector('#detailMessage')?.textContent.includes('暂时未能载入')");
    assert.equal(await evaluate("document.querySelector('#readingFallback').getAttribute('href')"),'/chapters.html#fab-transfer','failed transfer fetch has exact canonical fallback');
    await call('Page.removeScriptToEvaluateOnNewDocument',{identifier:script.identifier});
  });
  await call('Emulation.setScriptExecutionDisabled',{value:true});await call('Page.navigate',{url:base+'/step.html?process=film'});await sleep(300);await call('Emulation.setScriptExecutionDisabled',{value:false});
  await waitExpr("!!document.querySelector('noscript a')");
  assert.equal(await evaluate("getComputedStyle(document.querySelector('#detailMessage')).display"),'none','no endless loading without scripts');
  assert.equal(await evaluate("document.querySelector('noscript a').getAttribute('href')"),'/chapters.html#chapter-5');
  await call('Emulation.setScriptExecutionDisabled',{value:true});await call('Page.navigate',{url:base+'/learn.html'});await sleep(300);await call('Emulation.setScriptExecutionDisabled',{value:false});
  await waitExpr("document.querySelectorAll('#manufacturingFlow [data-process]').length===14");await directReading('no-script manufacturing map');

  await call('Emulation.setScriptExecutionDisabled',{value:true});await call('Page.navigate',{url:base+'/chapters.html#fab-transfer'});await sleep(300);await call('Emulation.setScriptExecutionDisabled',{value:false});
  await waitExpr("!!document.querySelector('#fab-transfer')");
  await directReading('no-script transfer explanation');await overflow('no-script transfer explanation');
  assert.equal(await evaluate("document.querySelectorAll('#fab-transfer .transfer-route>li').length"),6,'transfer has native no-script learning path');

  await navigate('/?sort=auto&tab=all&active=%E8%96%84%E8%86%9C%E6%B2%89%E7%A7%AF',"document.readyState==='complete' && !!document.querySelector('#manufacturingFlow')");
  assert.ok(await evaluate("location.pathname==='/' && !!document.querySelector('#manufacturingFlow')"),'query parameters do not change the teaching homepage');
  assert.ok(requests.every(u=>u==='about:blank' || new URL(u).origin===new URL(base).origin),'no third-party runtime assets');
  assert.deepEqual(errors,[]);
  writeFileSync(path.join(out,'results.json'),JSON.stringify({passed:true,chapters:7,threePartLearningEntry:true,conceptsCompaniesFlowOrder:true,noRedundantDirectoryModules:true,legacyDirectoryAnchor:true,focusedProcessDetails:14,waferTransferAutomation:true,flowDetailCanonicalContentAndFallback:true,flowTabletWidth:768,directReadingWithoutDisclosures:true,orderedReadingLayout:true,structuralFigures:6,foundationalCircuitReadingAndExample:true,structuralFigureAccessibilityAndFit:true,lessons:{lithography:7,...Object.fromEntries(processCases)},retiredConceptAnimations:5,staticKnowledgeRetained:true,equipmentMechanismFocus:true,patterningGeometryInvariant:true,manufacturingGeometryInvariants:true,processFeedbackGeometryInvariants:true,widths:[1440,390,320],renderer:'native WebGL / software-rendered QA',signatures,errors},null,2));
  console.log('Fallback/reduced motion/no-script, local-only assets and teaching homepage passed.');
} catch(e) {let state;try{state=await evaluate("({url:location.href,hidden:document.hidden,visibility:document.visibilityState,player:document.querySelector('#player')?.dataset,status:document.querySelector('#playbackStatus')?.textContent,disabled:document.querySelector('#play')?.disabled})");}catch{}writeFileSync(path.join(out,'results.json'),JSON.stringify({passed:false,error:e.message,errors,state},null,2));console.error(state);throw e;}
finally {if(ws?.readyState===1){try{await call('Browser.close');}catch{}ws.close();}child.unref();}
