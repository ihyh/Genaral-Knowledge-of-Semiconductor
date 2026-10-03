/* A qualitative mechanism illustration, not a physical plasma simulation. */
(() => {
  const stages = [
    {title:"工艺气体进入",short:"供气",part:"供气与真空排气",focus:"开口已有，薄膜未刻蚀",state:"掩膜已有开口，目标薄膜仍连续；供气本身不等于完成刻蚀。",cause:"供气与抽气共同建立处理环境，晶圆上的掩膜图形已经由前序工艺形成。"},
    {title:"射频形成等离子体",short:"产生粒子",part:"射频电场与电子",focus:"电子碰撞 → 产生粒子",state:"反应腔中产生离子与自由基，目标薄膜尚未在本例中被移除。",cause:"电场向电子传递能量，电子碰撞使部分气体电离或解离；不是把光照到晶圆上。"},
    {title:"晶圆附近建立鞘层",short:"建立鞘层",part:"晶圆近表面电场",focus:"鞘层：近表面电场区域",state:"近表面建立鞘层；这不是新增薄膜，掩膜与目标材料仍保持原有结构。",cause:"鞘层是近表面的电势变化区域，影响正离子到达晶圆时的能量与方向。"},
    {title:"离子定向到达表面",short:"离子加速",part:"鞘层电场与正离子",focus:"离子趋向表面，自由基扩散",state:"正离子趋向表面；图示先强调输运作用，下一阶段再展示材料移除。",cause:"带正电的离子受鞘层电场作用；中性自由基不会按相同方式被电场加速。"},
    {title:"协同反应与材料移除",short:"表面反应",part:"自由基与离子协同",focus:"开口下方：反应与移除",state:"掩膜开口下方开始形成沟槽，受保护区域的目标膜保留；反应前沿随加工下移。",cause:"自由基参与化学反应，离子可提供活化或材料移除作用；适用条件下两者协同形成所需轮廓。"},
    {title:"挥发性副产物排出",short:"副产物排出",part:"表面脱附与排气通道",focus:"副产物离开，沟槽继续加深",state:"沟槽继续加深，能挥发的副产物离开表面，经输运与排气移出腔体。",cause:"材料通过反应转变为可移出的产物；泵不直接吸走固体薄膜。此时反应与排气仍同时进行。"},
    {title:"停止处理与结果对照",short:"结果对照",part:"处理结束与后续检查",focus:"目标膜已有沟槽，掩膜仍在",state:"目标膜内已形成沟槽，掩膜仍在，衬底保留；后续去胶、清洗与检查按路线安排。",cause:"刻蚀将掩膜图形转移到目标材料；示意图不能证明深度、轮廓或电学性能已经合格。"}
  ];
  const byId = id => document.getElementById(id);
  const player=byId("player"), nav=byId("stepNav"), play=byId("play"), timeline=byId("timeline");
  const reduced=matchMedia("(prefers-reduced-motion: reduce)");
  let step=0, progress=0, phase=0, playing=false, frame=0, last=0;
  const duration=7000, ns="http://www.w3.org/2000/svg";
  const particles=[];
  function particle(parent,type,index){
    const group=document.createElementNS(ns,"g");
    const color={electron:"#75b6ff",ion:"#ffb870",radical:"#8adeb0",gas:"#a6bcd5",product:"#edf3fc"}[type];
    if(type==="radical"){
      const shape=document.createElementNS(ns,"path");shape.setAttribute("d","M0 -5L5 0L0 5L-5 0Z");shape.setAttribute("fill",color);group.append(shape);
    }else{
      const circle=document.createElementNS(ns,"circle");circle.setAttribute("r",type==="electron"?3:type==="gas"?4:6);circle.setAttribute("fill",type==="ion"||type==="product"?"#101c2e":color);circle.setAttribute("stroke",color);circle.setAttribute("stroke-width","1.5");group.append(circle);
      if(type==="ion"){
        const plus=document.createElementNS(ns,"path");plus.setAttribute("d","M-3 0H3 M0 -3V3");plus.setAttribute("stroke",color);plus.setAttribute("stroke-width","1.5");group.append(plus);
      }
      if(type==="product"){
        const second=circle.cloneNode();second.setAttribute("cx","7");second.setAttribute("r","4");group.append(second);
      }
    }
    parent.append(group);particles.push({group,type,index,surface:parent.id==="surfaceParticles"});
  }
  for(const [type,count] of [["gas",12],["electron",30],["ion",12],["radical",15],["product",8]]){
    for(let i=0;i<count;i++)particle(byId(type==="product"?"exhaustParticles":"chamberParticles"),type,i);
    if(type!=="gas")for(let i=0;i<(type==="electron"?8:9);i++)particle(byId("surfaceParticles"),type,i);
  }
  const buttons=stages.map((s,i)=>{
    const button=document.createElement("button");button.type="button";button.dataset.step=i;
    const number=document.createElement("span");number.textContent=String(i+1).padStart(2,"0");button.append(number,document.createTextNode(s.short));
    button.setAttribute("aria-label",number.textContent+" "+s.title);button.addEventListener("click",()=>choose(i));nav.append(button);return button;
  });
  function depth(){return step<4?0:step===4?84*.72*progress:step===5?84*(.72+.28*progress):84;}
  function opacity(id,value){byId(id).setAttribute("opacity",value);}
  function draw(){
    const d=depth(), plasmaOn=step>=1&&step<6, ionsOn=step>=3&&step<6, reactionOn=step>=4&&step<6;
    opacity("plasma",plasmaOn?step===1?.25+.75*progress:1:0);
    opacity("gasFlow",step<6?1:0);opacity("sheath",step>=2&&step<6?.13:0);opacity("sheathEdge",step>=2&&step<6?.9:0);
    opacity("surfaceSheath",step>=2&&step<6?.10:0);opacity("surfaceEdge",step>=2&&step<6?.8:0);opacity("ionPaths",ionsOn?.7:0);
    opacity("reactionFront",reactionOn?.8:0);opacity("exhaustFlow",step===5?1:.25);
    byId("exhaustFlow").setAttribute("stroke-dashoffset",-phase*16);
    byId("hfSupply").firstElementChild.setAttribute("stroke",plasmaOn?"#b293ff":"#526c92");
    byId("lfSupply").firstElementChild.setAttribute("stroke",step>=2&&step<6?"#efb77d":"#526c92");
    for(const rect of byId("trenches").children)rect.setAttribute("height",d.toFixed(2));
    for(const [i,path] of [...byId("reactionFront").children].entries())path.setAttribute("d",`M${90+90*i} ${190+d}h36`);
    for(const p of particles){
      const {type,index:i,surface,group}=p;
      const active=type==="gas"?step<6:type==="product"?reactionOn:plasmaOn;
      group.setAttribute("opacity",active?type==="product"&&step===4?.35:1:0);
      if(!active)continue;
      const offset={gas:0,electron:.37,ion:.83,radical:1.29,product:1.9}[type], localPhase=phase+offset;
      let x,y;const t=(localPhase*(type==="electron"?1.5:.25)+i*.173)%1;
      if(surface){
        if(type==="ion"){
          x=108+(i%3)*90;y=ionsOn?82+t*(108+d):78+(i%3)*20;
          // Protected regions remain covered; illustration follows ions in the openings only.
        }else if(type==="radical"){
          x=reactionOn?108+(i%3)*90+Math.sin(localPhase+i)*11:58+((i*41+Math.sin(localPhase+i)*9)%255);
          y=reactionOn?80+t*(106+d):86+((i*29+Math.cos(localPhase+i)*12)%58);
        }else if(type==="product"){
          x=108+(i%3)*90+Math.sin(localPhase+i)*7;y=190+d-t*(110+d);
        }else{x=48+(i*31+Math.sin(localPhase*3+i)*10)%269;y=75+(i*19+Math.cos(localPhase*4+i)*10)%26;}
      }else{
        if(type==="product"){
          if(t<.4){x=286+t/.4*77;y=236-t/.4*16;}
          else if(t<.7){x=363+(t-.4)/.3*65;y=220;}
          else{x=428;y=220+(t-.7)/.3*47;}
        }
        else if(type==="ion"&&ionsOn){x=135+(i%6)*40;y=130+t*111;}
        else{x=120+(i*37+Math.sin(localPhase*(type==="electron"?4:1)+i)*12)%244;y=type==="gas"?116+t*111:133+(i*23+Math.cos(localPhase*3+i)*8)%70;}
      }
      group.setAttribute("transform",`translate(${x.toFixed(2)} ${y.toFixed(2)})`);
    }
    player.dataset.step=step;player.dataset.progress=Math.round(progress*100);player.dataset.depth=d.toFixed(2);player.dataset.playing=String(playing);
    timeline.value=Math.round(progress*100);timeline.setAttribute("aria-valuetext",stages[step].title+"，教学进度 "+Math.round(progress*100)+"%；非实际处理时长");
  }
  function describe(){
    const s=stages[step];byId("stageCount").textContent=String(step+1).padStart(2,"0")+" / 07";byId("stepTitle").textContent=s.title;
    byId("activeMechanism").textContent=s.part;byId("surfaceFocus").textContent=s.focus;byId("currentOutcome").textContent=s.state;
    byId("materialDesc").textContent=s.state;byId("equipmentDesc").textContent=s.part+"。"+s.cause+" 供气、电极、承载与真空排气的功能位置见部件说明。";
    byId("previous").disabled=step===0;byId("next").disabled=step===stages.length-1;
    buttons.forEach((b,i)=>{if(i===step)b.setAttribute("aria-current","step");else b.removeAttribute("aria-current");});
  }
  function status(){
    play.textContent=playing?"暂停":step===6&&progress===1?"重播":"播放";play.setAttribute("aria-label",playing?"暂停播放":"播放全过程");play.setAttribute("aria-pressed",String(playing));
    byId("playbackStatus").textContent=reduced.matches?"减少动态模式：使用步骤与进度查看静态状态，不自动播放。":playing?"正在播放。可暂停观察，或拖动当前阶段进度。":step===6&&progress===1?"演示结束。可重播或返回刻蚀基础。":"已暂停，可分步查看或播放。";
  }
  function pause(){playing=false;cancelAnimationFrame(frame);draw();status();}
  function choose(index){pause();step=Math.max(0,Math.min(stages.length-1,index));progress=reduced.matches?1:0;phase=step*.8;describe();draw();status();}
  function tick(now){
    if(!playing)return;
    const elapsed=Math.min(100,now-last);last=now;phase+=elapsed/1000;progress+=elapsed/duration;
    if(progress>=1){progress=1;if(step<stages.length-1){step++;progress=0;describe();}else{pause();return;}}
    draw();frame=requestAnimationFrame(tick);
  }
  function start(){
    if(reduced.matches)return;
    if(step===6&&progress===1){step=0;progress=0;phase=0;describe();}
    playing=true;last=performance.now();draw();status();frame=requestAnimationFrame(tick);
  }
  play.addEventListener("click",()=>playing?pause():start());
  byId("previous").addEventListener("click",()=>choose(step-1));byId("next").addEventListener("click",()=>choose(step+1));
  byId("replay").addEventListener("click",()=>{choose(0);progress=0;phase=0;draw();if(!reduced.matches)start();});
  timeline.addEventListener("input",()=>{const value=Number(timeline.value);pause();progress=value/100;phase=step*.8+progress*2;draw();status();});
  // Pause on a hidden tab; returning must never unexpectedly resume playback.
  document.addEventListener("visibilitychange",()=>{if(document.hidden)pause();});
  function motionMode(){pause();play.disabled=reduced.matches;status();}
  reduced.addEventListener("change",motionMode);
  for(const id of ["play","next","replay","timeline"])byId(id).disabled=false;
  player.dataset.renderer="svg";describe();draw();motionMode();
})();
