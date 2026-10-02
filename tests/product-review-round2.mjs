import {readFileSync} from "node:fs";
const source=readFileSync("tests/beginner-learning.mjs","utf8");
const prefix=source.slice(0,source.indexOf("  const signatures=[];")).replace(".planning/beginner-learning/qa",".planning/review-round2-20261002/qa/after");
const run=async function(){
  const results={passed:false,details:[],restarts:[],views:[],errors};
  const keys=['design','materials','cleaning','film','lithography','etch','implant','anneal','cmp','interconnect','transfer','feedback','wafer-testing','packaging'];
  await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
  for(const key of keys){
    await navigate('/step.html?process='+key,"document.querySelector('#detailContent')?.dataset.process==="+JSON.stringify(key));
    const detail=await evaluate(`(()=>{const d=document.querySelector('#detailContent'),links=[...document.querySelectorAll('#detailAnimations a')].map(a=>a.getAttribute('href'));return {key:${JSON.stringify(key)},links,inlineDemos:d.querySelectorAll('a[href^="/process.html"],a[href^="/lithography.html"]').length,missingLabels:[...document.querySelectorAll('[aria-labelledby]')].flatMap(e=>e.getAttribute('aria-labelledby').split(/\\s+/).filter(id=>!document.getElementById(id))),ids:[...document.querySelectorAll('[id]')].map(e=>e.id),text:d.textContent,source:document.querySelector('#readingFallback').getAttribute('href')}})()`);
    assert.equal(detail.inlineDemos,0,key+' no repeated demo entry in reading');
    assert.equal(detail.links.length,key==='feedback'?2:['design','transfer'].includes(key)?0:1,key+' one entry per demo');
    assert.equal(new Set(detail.links).size,detail.links.length);
    assert.deepEqual(detail.missingLabels,[],key+' heading labels resolve');
    assert.ok(detail.ids.every(Boolean));assert.equal(new Set(detail.ids).size,detail.ids.length);
    await directReading(key);
    if(key==='materials'){
      assert.equal(detail.source,'/chapters.html#wafer-preparation');
      assert.ok(detail.text.includes('Czochralski')&&detail.text.includes('切片')&&detail.text.includes('抛光'));
      assert.equal(await evaluate("document.querySelector('#detailContent #material-routes,#detailContent #chapter-4')"),null);
      assert.ok(await evaluate("!!document.querySelector('#detailContent a[href=\"/chapters.html#material-routes\"]')"));
      assert.equal(await evaluate("document.querySelectorAll('#detailContent .preparation-topic>h3').length"),2);
      await shot('focused-materials','#detailContent');
    }
    if(key==='packaging'){
      assert.ok(await evaluate("document.querySelector('#packaging-routes>.eyebrow').textContent.includes('扩展阅读')"));
      assert.equal(await evaluate("document.querySelector('#packaging-routes>h2').id"),'packagingRoutesTitle');
      assert.equal(await evaluate("document.querySelectorAll('#packaging-routes .comparison-note>article').length"),4);
      await shot('packaging-routes','#packaging-routes');
    }
    if(key==='implant')assert.equal(await evaluate("document.querySelector('#detailPrerequisite').textContent.includes('载流子')"),false);
    results.details.push({key,links:detail.links,missingLabels:detail.missingLabels,source:detail.source});
  }
  await navigate('/chapters.html',"document.querySelectorAll('section.chapter').length===7");
  assert.equal(await evaluate("document.querySelectorAll('#material-routes .term').length"),3);
  assert.equal(await evaluate("document.querySelectorAll('.structure-figure svg').length"),6);
  assert.ok(await evaluate("document.querySelector('#chapter-4').textContent.includes('制造还用到哪些材料')"));
  assert.ok(await evaluate("Number.parseFloat(getComputedStyle(document.querySelector('.layer-stack')).fontSize)>=12"));
  await shot('layer-labels','#local-layer-cycle');
  for(const width of [1440,390,320]){
    await call('Emulation.setDeviceMetricsOverride',{width,height:844,deviceScaleFactor:1,mobile:false});
    const labels=await evaluate("[...document.querySelectorAll('.layer-stack span')].map(e=>{const b=e.getBoundingClientRect(),range=document.createRange();range.selectNodeContents(e);const t=range.getBoundingClientRect();return {text:e.textContent,size:parseFloat(getComputedStyle(e).fontSize),fits:t.left>=b.left-1&&t.right<=b.right+1&&t.top>=b.top-1&&t.bottom<=b.bottom+1}})");
    assert.ok(labels.every(l=>l.size>=12&&l.fits),'layer labels readable and fit '+width+' '+JSON.stringify(labels));
    await overflow('layer labels '+width);
  }
  await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});

  for(const [url,start,reduced] of [
    ['/process.html?lesson=patterning&from=etch',2,false],
    ['/process.html?lesson=packaging&from=packaging',2,false],
    ['/process.html?lesson=patterning',0,false],
    ['/lithography.html?from=lithography',0,false],
    ['/process.html?lesson=patterning&from=etch',2,true]
  ]){
    await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:reduced?'reduce':'no-preference'}]});
    await navigate(url,"document.querySelector('#player')?.dataset.renderer==='webgl'");
    assert.equal(await evaluate("Number(document.querySelector('#player').dataset.step)"),start);
    await click('#next');await click('#replay');
    assert.equal(await evaluate("Number(document.querySelector('#player').dataset.step)"),start,url+' replay context');
    assert.equal(await evaluate("document.querySelector('#player').dataset.playing"),reduced?'false':'true');
    if(!reduced){
      await click('#play');
      await evaluate("document.querySelector('#stepNav button:last-child').click()");
      await click('#play');
      assert.equal(await evaluate("Number(document.querySelector('#player').dataset.step)"),start,url+' finished restart context');
      await click('#play');
    }
    results.restarts.push({url,start,reduced});
  }
  await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
  await navigate('/process.html?lesson=patterning&from=film',"document.querySelector('#player')?.dataset.renderer==='webgl'");
  assert.ok(await evaluate("document.querySelector('#lessonTitle').textContent.includes('成膜')"));
  assert.ok(await evaluate("document.body.textContent.includes('还没有对应的加工开口')"),'film output distinguished from later patterning');

  async function positionView(canvas){
    await evaluate(`(()=>{const scene=document.getElementById('${canvas}').closest('.scene'),toolbar=document.querySelector('.player-toolbar');const side=matchMedia('(min-width:621px) and (max-height:500px)').matches;scrollTo(0,scene.getBoundingClientRect().top+scrollY-(side?12:toolbar.getBoundingClientRect().height+12))})()`);
    await sleep(80);
  }
  async function checkView(canvas,label){
    await positionView(canvas);
    const view=await evaluate(`(()=>{const r=e=>{const b=e.getBoundingClientRect();return {x:b.x,y:b.y,right:b.right,bottom:b.bottom,width:b.width,height:b.height}};const canvas=document.getElementById('${canvas}'),p=r(canvas);return {label:${JSON.stringify(label)},width:innerWidth,height:innerHeight,canvas:'${canvas}',rects:[canvas,canvas.closest('.scene').querySelector('.scene-head'),document.querySelector('#stepTitle'),document.querySelector('#activeMechanism'),document.querySelector('#currentOutcome'),...document.querySelectorAll('.player-controls')].map(r),hit:[[p.x+p.width/2,p.y+3],[p.x+p.width/2,p.bottom-3]].every(([x,y])=>document.elementFromPoint(x,y)===canvas),outcome:document.querySelector('#currentOutcome').textContent,material:document.querySelector('#materialText').textContent}})()`);
    for(const rect of view.rects)assert.ok(rect.y>=-1&&rect.bottom<=view.height+1&&rect.x>=-1&&rect.right<=view.width+1,JSON.stringify(view)+' co-visible');
    if(!view.hit){await shot('failed-canvas-hit',undefined,true);console.log(view);console.log(await evaluate("[...document.querySelectorAll('.scene canvas')].map(c=>{const b=c.getBoundingClientRect();return [3,b.height-3].map(d=>document.elementFromPoint(b.x+b.width/2,b.y+d)?.outerHTML.slice(0,240))})"));}
    assert.ok(view.hit,label+' canvas unobscured');assert.equal(view.outcome,view.material,'full state synchronized, not clipped');
    await overflow(label);
    results.views.push({label,width:view.width,height:view.height,canvas,rects:view.rects,hit:view.hit});
  }
  for(const [width,height] of [[320,568],[360,640],[390,844],[844,390]]){
    await call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false});
    for(const url of ['/process.html?lesson=patterning&from=etch','/lithography.html?from=lithography']){
      await navigate(url,"document.querySelector('#player')?.dataset.renderer==='webgl'");
      for(const canvas of ['equipmentCanvas','materialCanvas']){
        await click('#replay');await click('#play');
        await checkView(canvas,url+' initial');
        await click('#next');await checkView(canvas,url+' next');
        await click('#play');assert.equal(await evaluate("document.querySelector('#player').dataset.playing"),'true');
        await click('#play');assert.equal(await evaluate("document.querySelector('#player').dataset.playing"),'false');
        await shot('player-'+width+'x'+height+'-'+(url.startsWith('/process')?'etch':'lithography')+'-'+canvas,undefined,true);
      }
    }
  }
  // Other lessons include longer mechanism names and state text; check every stage on the shortest portrait and landscape.
  for(const [width,height] of [[320,568],[844,390]]){
    await call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false});
    for(const lesson of ['materials','cleaning','implant','anneal','cmp','interconnect','metrology','inspection','packaging']){
      await navigate('/process.html?lesson='+lesson,"document.querySelector('#player')?.dataset.renderer==='webgl'");
      const count=await evaluate("document.querySelectorAll('#stepNav button').length");
      for(let step=0;step<count;step++){
        await click('#stepNav button[data-step="'+step+'"]');
        for(const canvas of ['equipmentCanvas','materialCanvas'])await checkView(canvas,lesson+' stage '+step);
      }
    }
  }
  assert.deepEqual(errors,[]);
  results.passed=true;writeFileSync(path.join(out,'results.json'),JSON.stringify(results,null,2));
  console.log(JSON.stringify({passed:true,details:results.details.length,restarts:results.restarts.length,visibleChecks:results.views.length,errors}));
};
const body="\nawait ("+run.toString()+")();\n}finally{if(ws?.readyState===1){try{await call('Browser.close');}catch{}ws.close();}child.unref();}\n";
try{await import("data:text/javascript;base64,"+Buffer.from(prefix+body).toString("base64"));}
catch(error){throw new Error(error.message);}
