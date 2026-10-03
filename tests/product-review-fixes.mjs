import {readFileSync} from "node:fs";
const source=readFileSync("tests/beginner-learning.mjs","utf8");
const prefix=source.slice(0,source.indexOf("  const signatures=[];")).replace(".planning/beginner-learning/qa",".planning/review-fixes-20261002/qa");
const run=async function(){
  const results={passed:false,detailSchemas:[],journeys:[],mobile:[],errors};
  const keys=['design','materials','cleaning','film','lithography','etch','implant','anneal','cmp','interconnect','transfer','feedback','wafer-testing','packaging'];
  await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
  for(const key of keys) {
    await navigate('/step.html?process='+key,"document.querySelector('#detailContent')?.dataset.process==="+JSON.stringify(key));
    const schema=await evaluate(`(()=>{const d=document.querySelector('#detailContent .process-basics');return {key:document.querySelector('#detailContent').dataset.process,labels:[...d.querySelectorAll('dt')].map(e=>e.textContent),answers:[...d.querySelectorAll('dd')].map(e=>({text:e.textContent,visible:e.getBoundingClientRect().height>0})),pre:document.querySelector('#detailPrerequisite').innerText,next:document.querySelector('#nextLearning').getAttribute('href'),reason:document.querySelector('#learningConnection').innerText,heading:document.querySelector('#detailContent h2').textContent,demosBeforeReading:document.getElementById('detailDemos').getBoundingClientRect().top<document.querySelector('#detailContent').getBoundingClientRect().top}})()`);
    assert.deepEqual(schema.labels,['工艺目的','进入状态','设备及作用','离开状态','关联环节','常见误解']);
    assert.ok(schema.answers.every(a=>a.visible&&a.text.length>10),key+' visible useful six answers');
    assert.ok(schema.pre.length>30 && schema.reason.length>15 && schema.next,key+' prerequisites and rationale');
    assert.ok(!/^\d{2}\s/.test(schema.heading),key+' detail reading number removed');
    if(!['design','transfer'].includes(key))assert.ok(schema.demosBeforeReading,key+' demonstration plays before the explanation');
    await directReading(key);
    assert.equal((await fetch(base+schema.next)).status,200);
    const pre=await evaluate("document.querySelector('#detailPrerequisite a').getAttribute('href')");
    const canonical=await (await fetch(base+'/chapters.html')).text();
    assert.ok(await evaluate('!!new DOMParser().parseFromString('+JSON.stringify(canonical)+',"text/html").querySelector('+JSON.stringify(pre.split('#')[1]?'#'+pre.split('#')[1]:'body')+')'),key+' precise prerequisite exists');
    if(key==='design')assert.equal(await evaluate("document.querySelector('#detailContent').textContent.includes('企业角色应该怎么区分')"),false);
    if(key==='transfer')assert.deepEqual(await evaluate("[...document.querySelectorAll('#detailContent .transfer-section>*:first-child')].map(e=>e.tagName)"),['H3','H3','H3']);
    if(['film','etch','implant','anneal','cmp'].includes(key))assert.equal(await evaluate("document.querySelectorAll('#detailContent .device-chain ol>li').length"),3);
    if(['film','etch'].includes(key)) {
      assert.ok(await evaluate("['供给模块','反应空间','晶圆与承载模块','排气模块'].every(t=>document.querySelector('#detailContent .equipment-cutaway').innerText.includes(t))"),key+' labeled equipment functional section');
      await shot('equipment-section-'+key,'#detailContent .equipment-cutaway');
    }
    results.detailSchemas.push(schema);
    const entries=await evaluate("[...document.querySelectorAll('#detailDemos iframe')].map(f=>f.getAttribute('src').replace(/([?&])embed=1/,''))");
    for(const entry of entries) {
      await navigate(entry,"document.querySelector('#player')?.dataset.renderer==="+JSON.stringify(key==='lithography'?'webgl':'svg'));
      const journey=await evaluate("({url:location.pathname+location.search,step:Number(document.querySelector('#player').dataset.step),title:document.querySelector('#stepTitle').textContent,returnTo:document.querySelector('#readingLink').getAttribute('href'),outcome:document.querySelector('#currentOutcome').textContent})");
      assert.equal(journey.step,key==='packaging'?2:0,key+' relevant initial stage');
      assert.equal(journey.returnTo,'/step.html?process='+key,key+' retains original explanation');
      assert.ok(journey.outcome.length>20);
      if(key==='etch'){assert.equal(journey.url,'/etch.html');assert.equal(journey.title,'工艺气体进入');assert.ok(await evaluate("!!document.querySelector('#equipmentView') && !!document.querySelector('#materialView')"));}
      if(key==='packaging')assert.ok(journey.title.includes('裸片'));
      await click('#readingLink');
      await waitExpr("document.querySelector('#detailContent')?.dataset.process==="+JSON.stringify(key));
      results.journeys.push({key,...journey,returned:true});
    }
  }
  for(const path of ['/process.html?lesson=patterning&from=__proto__','/process.html?lesson=patterning&from=constructor','/process.html?lesson=patterning&from=packaging','/process.html?lesson=patterning']) {
    await navigate(path,"document.querySelector('#player')?.dataset.renderer==='webgl'");
    assert.equal(await evaluate("document.querySelector('#player').dataset.step"),'0');
    assert.equal(await evaluate("document.querySelector('#readingLink').getAttribute('href')"),'/chapters.html#fab-film');
  }
  await navigate('/chapters.html',"document.readyState==='complete' && !!document.querySelector('#local-layer-cycle')");
  assert.equal(await evaluate("document.querySelectorAll('#local-layer-cycle .local-state').length"),4);
  assert.equal(await evaluate("document.querySelectorAll('.structure-figure svg').length"),6,'six existing figures retained');
  await evaluate("document.querySelector('#local-layer-cycle').scrollIntoView()");
  await shot('local-layer-desktop','#local-layer-cycle');
  for(const width of [390,320]) {
    await call('Emulation.setDeviceMetricsOverride',{width,height:width===320?844:900,deviceScaleFactor:1,mobile:false});
    await navigate('/learn.html',"document.readyState==='complete' && !!document.querySelector('#manufacturingFlow')");
    await click('.entry-actions a[href="#manufacturingFlow"]');
    await waitExpr("location.hash==='#manufacturingFlow'");
    assert.ok(await evaluate("document.querySelector('.learn-header').getBoundingClientRect().top>=-1"),'home long-page nav retained');
    assert.ok(await evaluate("document.querySelector('#manufacturingFlow').getBoundingClientRect().top>=document.querySelector('.learn-header').getBoundingClientRect().bottom-1"),'anchor not obscured');
    await overflow('mobile home');
    for(const [path,pathRenderer] of [['/process.html?lesson=patterning&from=etch','svg'],['/lithography.html?from=lithography','webgl']]) {
      await navigate(path,"document.querySelector('#player')?.dataset.renderer==="+JSON.stringify(pathRenderer));
      for(const canvas of pathRenderer==='svg'?['equipmentSvg','materialSvg']:['equipmentCanvas','materialCanvas']) {
        await click('#stepNav button[data-step="'+(path.startsWith('/process')?2:0)+'"]');
        await evaluate("document.querySelector('#timeline').value=0;document.querySelector('#timeline').dispatchEvent(new Event('input',{bubbles:true}))");
        await evaluate(`(()=>{const e=document.getElementById('${canvas}').closest('.scene'),t=document.querySelector('.player-toolbar');scrollTo(0,e.getBoundingClientRect().top+scrollY-t.getBoundingClientRect().height-12)})()`);
        await sleep(100);
        const visible=await evaluate(`(()=>{const r=s=>{const e=document.querySelector(s),b=e.getBoundingClientRect();return {top:b.top,bottom:b.bottom,height:b.height}};return {width:innerWidth,url:location.pathname+location.search,canvas:'${canvas}',view:r('#${canvas}'),viewTitle:r('#${canvas}'),toolbar:r('.player-toolbar'),controls:r('.player-controls'),step:r('#stepTitle'),mechanism:r('#activeMechanism'),outcome:r('.current-outcome'),before:Number(document.querySelector('#player').dataset.step)}})()`);
        const sceneTitle=await evaluate(`(()=>{const r=document.getElementById('${canvas}').closest('.scene').querySelector('.scene-head').getBoundingClientRect();return {top:r.top,bottom:r.bottom}})()`);
        visible.viewTitle=sceneTitle;
        const viewport=await evaluate('innerHeight');
        for(const key of ['view','viewTitle','controls','step','mechanism','outcome'])assert.ok(visible[key].top>=-1&&visible[key].bottom<=viewport+1,JSON.stringify(visible)+' '+key+' co-visible');
        await click('#next');
        assert.equal(await evaluate("Number(document.querySelector('#player').dataset.step)"),visible.before+1,'mobile next step '+width+' '+canvas+' '+path);
        assert.ok(await evaluate("document.querySelector('#currentOutcome').textContent===document.querySelector('#materialText').textContent"),'short material statement synchronized');
        await click('#play');assert.equal(await evaluate("document.querySelector('#player').dataset.playing"),'true');
        await click('#play');assert.equal(await evaluate("document.querySelector('#player').dataset.playing"),'false');
        await overflow('mobile player');
        results.mobile.push(visible);
        await shot('player-'+width+'-'+(path.startsWith('/process')?'etch':'lithography')+'-'+canvas,undefined,true);
      }
    }
    await navigate('/chapters.html',"document.readyState==='complete' && !!document.querySelector('#local-layer-cycle')");
    await evaluate("document.querySelector('#local-layer-cycle').scrollIntoView()");
    await overflow('local cycle');
    await shot('local-layer-'+width,'#local-layer-cycle');
  }
  assert.deepEqual(errors,[]);
  results.passed=true;
  writeFileSync(path.join(out,'results.json'),JSON.stringify(results,null,2));
  console.log(JSON.stringify({passed:true,schemas:results.detailSchemas.length,journeys:results.journeys.length,mobileViews:results.mobile.length,errors}));
};
const body="\nawait ("+run.toString()+")();\n} finally {if(ws?.readyState===1){try{await call('Browser.close');}catch{}ws.close();}child.unref();}\n";
try {await import("data:text/javascript;base64,"+Buffer.from(prefix+body).toString("base64"));}
catch(error) {throw new Error(error.message);}

