import {readFileSync} from "node:fs";
const source=readFileSync("tests/beginner-learning.mjs","utf8");
const prefix=source.slice(0,source.indexOf("  const signatures=[];")).replace(".planning/beginner-learning/qa",".planning/ccp-reference-20261002/qa/website");
const run=async function(){
  const {createHash}=await import('node:crypto');
  const results={passed:false,stages:[],views:[],errors};
  await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
  await navigate('/step.html?process=etch',"document.querySelector('#detailContent')?.dataset.process==='etch'");
  assert.deepEqual(await evaluate("[...document.querySelectorAll('#detailDemos .demo-embed-open')].map(a=>a.getAttribute('href'))"),['/etch.html']);
  await click('#detailDemos .demo-embed-open');await waitExpr("document.querySelector('#player')?.dataset.renderer==='svg'");
  await directReading('etch');
  assert.equal(await evaluate("document.querySelectorAll('#stepNav button').length"),7);
  assert.equal(await evaluate("document.querySelectorAll('#textSteps>li').length"),7);
  assert.equal(await evaluate("document.querySelectorAll('.etch-parts>li').length"),6);
  assert.equal(await evaluate("document.querySelectorAll('.source-list,.source-line').length"),0,'demonstration page shows no source list');
  assert.equal(await evaluate("document.querySelectorAll('.etch-legend li').length"),5,'all particle symbols explained');
  assert.equal(await evaluate("document.querySelector('#readingLink').getAttribute('href')"),'/step.html?process=etch');
  const missing=await evaluate("[...document.querySelectorAll('[aria-labelledby],[aria-describedby]')].flatMap(e=>[e.getAttribute('aria-labelledby'),e.getAttribute('aria-describedby')].filter(Boolean).flatMap(v=>v.split(/\\s+/)).filter(id=>!document.getElementById(id)))");
  assert.deepEqual(missing,[]);
  assert.ok(await evaluate("document.body.textContent.includes('不是实测录像或粒子仿真') && document.body.textContent.includes('同时发生') && document.body.textContent.includes('耦合')"));
  const geometry=await evaluate("[document.querySelector('#targetFilm'),document.querySelector('#substrate'),document.querySelector('#mask')].map(e=>e.outerHTML)");
  async function scrub(value){await evaluate(`(()=>{const t=document.querySelector('#timeline');t.value=${value};t.dispatchEvent(new Event('input',{bubbles:true}))})()`);}
  async function imageHash(){
    const clip=await evaluate("(()=>{const b=document.querySelector('#materialView').getBoundingClientRect();return {x:b.x+scrollX,y:b.y+scrollY,width:b.width,height:b.height,scale:1}})()");
    const png=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip});
    return createHash('sha256').update(Buffer.from(png.data,'base64')).digest('hex');
  }
  for(let step=0;step<7;step++){
    await click('#stepNav button[data-step="'+step+'"]');
    assert.equal(await evaluate("document.querySelector('#stepNav [aria-current=step]').dataset.step"),String(step));
    assert.equal(await evaluate("document.querySelector('#player').dataset.step"),String(step));
    assert.equal(await evaluate("Number(document.querySelector('#plasma').getAttribute('opacity'))>0"),step>=1&&step<6,'plasma region follows stage');
    assert.equal(await evaluate("Number(document.querySelector('#sheath').getAttribute('opacity'))>0"),step>=2&&step<6,'sheath follows stage');
    assert.equal(await evaluate("Number(document.querySelector('#ionPaths').getAttribute('opacity'))>0"),step>=3&&step<6,'directed ion paths follow stage');
    for(const progress of [0,50,100]){
      await scrub(progress);
      const state=await evaluate("({progress:Number(document.querySelector('#player').dataset.progress),depth:Number(document.querySelector('#player').dataset.depth),height:[...document.querySelectorAll('#trenches rect')].map(e=>Number(e.getAttribute('height'))),front:[...document.querySelectorAll('#reactionFront path')].map(e=>e.getAttribute('d')),geometry:[document.querySelector('#targetFilm'),document.querySelector('#substrate'),document.querySelector('#mask')].map(e=>e.outerHTML),text:document.querySelector('#currentOutcome').textContent,focus:document.querySelector('#surfaceFocus').textContent})");
      assert.equal(state.progress,progress,'range really moves');
      const expected=step<4?0:step===4?84*.72*progress/100:step===5?84*(.72+.28*progress/100):84;
      assert.ok(Math.abs(state.depth-expected)<.011,'continuous depth');
      assert.ok(state.height.every(h=>Math.abs(h-expected)<.011&&h<96),'three trenches stay in target film');
      assert.deepEqual(state.geometry,geometry,'same mask, film and substrate throughout');
      assert.ok(state.text.length>20 && state.focus.length>8);
      results.stages.push({step,progress,depth:state.depth});
    }
    await shot('stage-'+step,'#player');
  }
  await click('#stepNav button[data-step="4"]');await scrub(0);const before=await imageHash();await scrub(100);const after=await imageHash();assert.notEqual(before,after,'actual pixels change, not only dataset');
  await click('#replay');assert.equal(await evaluate("document.querySelector('#player').dataset.step"),'0');assert.equal(await evaluate("document.querySelector('#player').dataset.playing"),'true');
  await sleep(350);assert.ok(await evaluate("Number(document.querySelector('#player').dataset.progress)>0"));
  await click('#play');const paused=await evaluate("document.querySelector('#player').outerHTML");await sleep(300);assert.equal(await evaluate("document.querySelector('#player').outerHTML"),paused,'pause freezes particles and material');
  await click('#next');assert.equal(await evaluate("document.querySelector('#player').dataset.step"),'1');await click('#previous');assert.equal(await evaluate("document.querySelector('#player').dataset.step"),'0');
  await click('#stepNav button[data-step="6"]');await scrub(100);await click('#play');assert.equal(await evaluate("document.querySelector('#player').dataset.step"),'0','restart at end');await click('#play');
  await click('#stepNav button[data-step="4"]');await scrub(50);
  await evaluate("document.querySelector('#timeline').focus()");
  await call('Input.dispatchKeyEvent',{type:'keyDown',key:'ArrowRight',code:'ArrowRight',windowsVirtualKeyCode:39});await call('Input.dispatchKeyEvent',{type:'keyUp',key:'ArrowRight',code:'ArrowRight',windowsVirtualKeyCode:39});
  assert.equal(await evaluate("document.querySelector('#player').dataset.progress"),'51','keyboard range input');
  await evaluate("document.querySelector('#next').focus()");await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13,text:'\r'});await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
  await waitExpr("document.querySelector('#player').dataset.step==='5'");

  for(const [width,height] of [[1440,1000],[768,1024],[390,844],[360,640],[320,568],[844,390]]){
    await call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false});
    await navigate('/etch.html',"document.querySelector('#player')?.dataset.renderer==='svg'");
    for(const scene of ['chamberView','surfaceView']){
      for(const stage of [0,4,6]){
        await click('#stepNav button[data-step="'+stage+'"]');await scrub(75);
        await evaluate(`(()=>{const e=document.getElementById('${scene}'),bar=document.querySelector('.etch-control-bar'),side=matchMedia('(min-width:621px) and (max-height:500px)').matches;scrollTo(0,e.getBoundingClientRect().top+scrollY-(side?8:bar.getBoundingClientRect().height+8))})()`);await sleep(100);
        await overflow('etch '+width+' '+scene);
        const view=await evaluate(`(()=>{const e=document.getElementById('${scene}'),svg=e.querySelector('svg'),r=n=>{const b=n.getBoundingClientRect();return {left:b.left,right:b.right,top:b.top,bottom:b.bottom}};const b=svg.getBoundingClientRect();return {width:innerWidth,height:innerHeight,scene:'${scene}',stage:${stage},rects:[svg,e.querySelector('figcaption'),e.querySelector('.view-note'),document.querySelector('#stepTitle'),...document.querySelectorAll('.etch-controls button'),document.querySelector('#timeline')].map(r),uncovered:document.elementFromPoint(b.x+b.width/2,b.y+b.height/2)?.closest('svg')===svg}})()`);
        // Tall desktop/tablet viewports and small screens must retain operative controls next to the inspected view.
        if(view.rects.some(rect=>rect.left< -1||rect.right>width+1||rect.top< -1||rect.bottom>height+1))await shot('failed-view-'+width+'x'+height+'-'+scene,undefined,true);
        for(const rect of view.rects)assert.ok(rect.left>=-1&&rect.right<=width+1&&rect.top>=-1&&rect.bottom<=height+1,'co-visible '+JSON.stringify(view));
        assert.ok(view.uncovered,'scene unobscured');results.views.push(view);
      }
      await shot('view-'+width+'x'+height+'-'+scene,undefined,true);
    }
    await directReading('etch '+width);
  }
  await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  await navigate('/etch.html',"document.querySelector('#player')?.dataset.renderer==='svg'");
  assert.equal(await evaluate("document.querySelector('#play').disabled"),true);
  await click('#stepNav button[data-step="4"]');assert.equal(await evaluate("document.querySelector('#player').dataset.playing"),'false');assert.equal(await evaluate("document.querySelector('#player').dataset.progress"),'100');
  const reducedState=await evaluate("document.querySelector('#player').outerHTML");await sleep(300);assert.equal(await evaluate("document.querySelector('#player').outerHTML"),reducedState);
  await scrub(50);assert.equal(await evaluate("document.querySelector('#player').dataset.depth"),'30.24');await click('#replay');assert.equal(await evaluate("document.querySelector('#player').dataset.step"),'0');assert.equal(await evaluate("document.querySelector('#player').dataset.playing"),'false');
  await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
  await call('Emulation.setScriptExecutionDisabled',{value:true});
  await call('Page.navigate',{url:base+'/etch.html'});await sleep(400);await call('Emulation.setScriptExecutionDisabled',{value:false});
  await waitExpr("!!document.querySelector('noscript a') && document.querySelector('#player').dataset.renderer==='static'");
  assert.equal(await evaluate("document.querySelectorAll('#textSteps>li').length"),7);assert.ok(await evaluate("!!document.querySelector('#equipmentView') && !!document.querySelector('#materialView')"));await directReading('noscript');
  const ids=await evaluate("[...document.querySelectorAll('[id]')].map(e=>e.id)");assert.equal(new Set(ids).size,ids.length);
  assert.deepEqual(errors,[]);assert.ok(requests.filter(u=>u.startsWith('http')).every(u=>new URL(u).origin===new URL(base).origin),'no remote asset requests');
  results.passed=true;writeFileSync(path.join(out,'results.json'),JSON.stringify(results,null,2));console.log(JSON.stringify({passed:true,materialStates:results.stages.length,viewChecks:results.views.length,errors}));
};
const body="\nawait ("+run.toString()+")();\n}finally{if(ws?.readyState===1){try{await call('Browser.close');}catch{}ws.close();}child.unref();}\n";
try{await import("data:text/javascript;base64,"+Buffer.from(prefix+body).toString("base64"));}
catch(error){throw new Error(error.message);}
