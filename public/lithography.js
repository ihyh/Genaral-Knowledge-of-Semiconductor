(() => {
  "use strict";
  const $=id=>document.getElementById(id);
  if(!$('player')) return;
  const lesson=window.FabLesson;
  const steps=lesson?.steps || [
    {title:"准备表面",name:"加工台与晶圆承载",equipment:"晶圆被送到加工位置，承载台提供支撑与定位。清洗和表面准备按实际路线完成，本场景只展示承载。",material:"硅基底上已有本轮待加工的连续薄膜，没有本轮胶层图形。",takeaway:"加工对象可以是已有多层结构的晶圆，不必是裸硅。",caption:"硅基底和待加工薄膜连续，本轮图形尚未形成。"},
    {title:"涂胶",name:"旋涂模块与供胶喷嘴",equipment:"喷嘴向晶圆供胶，承载台带动晶圆旋转，使胶液铺展。外壳和排液结构已简化。",material:"待加工薄膜上形成连续光刻胶层。画面用铺展和加厚示意涂胶，厚度不按真实比例。",takeaway:"光刻胶是临时感光材料，不是这一轮最终要加工的薄膜。",caption:"琥珀色光刻胶铺展在蓝色薄膜之上。"},
    {title:"预烘",name:"加热台",equipment:"加热台对涂胶后的晶圆进行预烘，处理胶层中的溶剂并调整胶层状态。",material:"胶层仍连续；本步没有产生图形开口。画面中的暖色只表示加热过程。",takeaway:"预烘在曝光前进行，不能用它替代曝光或显影。",caption:"胶层、薄膜与硅基底仍连续，没有开口。"},
    {title:"对准与曝光",name:"光罩、投影光学组件与平台",equipment:"设备将本层图形对准已有结构，再通过光罩与投影光学组件成像到胶层。平台位移和可视光路是简化示意。",material:"指定区域发生曝光反应。浅黄色表示受曝光影响的胶，不是真实颜色变化；此时胶仍在，没有开口。",takeaway:"曝光改变后续显影行为，不是用光束切走光刻胶或硅。",caption:"浅黄色胶区受曝光影响；胶层仍连续。"},
    {title:"曝光后烘烤",name:"加热台 · 曝光后烘烤（PEB）",equipment:"本例采用化学放大型胶，曝光后通过加热推进相关反应。PEB 即曝光后烘烤，不是所有胶的通用固定步骤。",material:"曝光区域形成进一步的显影差异；尚未显影，胶层仍连续。",takeaway:"预烘与曝光后烘烤处于不同位置，也不是同一个目的。",caption:"受曝光影响区域继续反应，尚未移除胶层。"},
    {title:"显影",name:"显影供液与冲洗模块",equipment:"设备供给显影液，随后进行所需冲洗与干燥；供液位置和动作已简化，并未显示全部机构。",material:"本例为正性胶，受曝光影响的区域被选择性移除，形成胶层开口，露出下面的薄膜。",takeaway:"开口只在胶层。蓝色待加工薄膜和硅基底仍连续，尚未刻蚀。",caption:"正性胶的选定区域被移除，蓝色薄膜露出且未被刻穿。"},
    {title:"后续衔接",name:"晶圆承载与移出",equipment:"晶圆离开本流程加工位置，按产品路线进入图形检查与后续处理。动画没有执行刻蚀。",material:"图形化胶层保留，待加工薄膜仍连续。后续可通过开口进行刻蚀等加工，具体取决于路线。",takeaway:"光刻输出的是胶层图形，不是一颗已完成的芯片。",caption:"保留显影后的图形化胶层；后续加工尚未执行。"}
  ];
  const startStep=Number.isInteger(lesson?.startStep) && lesson.startStep>=0 && lesson.startStep<steps.length?lesson.startStep:0;
  let step=startStep, progress=0, playing=false, lastTime=0, frame=0;
  if(!lesson && new URLSearchParams(location.search).get("from")==="lithography") {
    $("readingLink").href="/step.html?process=lithography";
    $("readingLink").textContent="← 返回光刻讲解";
  }
  const reduced=matchMedia("(prefers-reduced-motion: reduce)");
  const player=$("player");
  const palette={silicon:[.54,.60,.63],film:[.32,.64,.72],resist:[.82,.52,.17],exposed:[.98,.76,.30],metal:[.69,.75,.74],white:[.86,.90,.87],dark:[.15,.23,.22],fluid:[.26,.81,.87],heat:[.86,.33,.13]};

  // ponytail: bounded procedural teaching scenes, not a general rendering engine.
  // Use an established engine when lessons require imported equipment models.
  const circle=Array.from({length:64},(_,i)=>[Math.cos(i*Math.PI/32),Math.sin(i*Math.PI/32)]);
  const square=[[-.5,-.5],[.5,-.5],[.5,.5],[-.5,.5]];
  function clipX(points,x,keepRight) {
    const out=[];
    for(let i=0;i<points.length;i++) {
      const a=points[i],b=points[(i+1)%points.length];
      const inside=p=>keepRight?p[0]>=x:p[0]<=x;
      if(inside(a)) out.push(a);
      if(inside(a)!==inside(b)) { const t=(x-a[0])/(b[0]-a[0]);out.push([x,a[1]+(b[1]-a[1])*t]); }
    }
    return out;
  }
  function extrude(points) {
    const vertices=[],center=points.reduce((a,p)=>[a[0]+p[0]/points.length,a[1]+p[1]/points.length],[0,0]);
    const triangle=(a,b,c,n)=>[a,b,c].forEach(p=>vertices.push(...p,...n));
    for(let i=0;i<points.length;i++) {
      const a=points[i],b=points[(i+1)%points.length],len=Math.hypot(b[0]-a[0],b[1]-a[1]);
      const n=[(b[1]-a[1])/len,0,(a[0]-b[0])/len];
      triangle([center[0],.5,center[1]],[a[0],.5,a[1]],[b[0],.5,b[1]],[0,1,0]);
      triangle([center[0],-.5,center[1]],[b[0],-.5,b[1]],[a[0],-.5,a[1]],[0,-1,0]);
      triangle([a[0],-.5,a[1]],[b[0],-.5,b[1]],[b[0],.5,b[1]],n);
      triangle([a[0],-.5,a[1]],[b[0],.5,b[1]],[a[0],.5,a[1]],n);
    }
    return new Float32Array(vertices);
  }
  const meshData={box:extrude(square),cylinder:extrude(circle)};
  for(let i=0;i<7;i++) meshData["band"+i]=extrude(clipX(clipX(circle,-1+i*2/7,true),-1+(i+1)*2/7,false));
  const dot=(a,b)=>a.reduce((sum,x,i)=>sum+x*b[i],0);
  const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
  const unit=a=>a.map(x=>x/Math.hypot(...a));
  function viewMatrix(eye,target) {
    const z=unit(eye.map((x,i)=>x-target[i])),x=unit(cross([0,1,0],z)),y=cross(z,x);
    return new Float32Array([x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-dot(x,eye),-dot(y,eye),-dot(z,eye),1]);
  }
  function renderer(canvas,kind) {
    const gl=canvas.getContext("webgl",{antialias:true,alpha:false,preserveDrawingBuffer:true});
    if(!gl) throw new Error("WebGL unavailable");
    const shader=(type,source)=>{const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));return s;};
    const program=gl.createProgram();
    const vertex=shader(gl.VERTEX_SHADER,`
      attribute vec3 position; attribute vec3 normal;
      uniform vec3 size; uniform vec3 offset; uniform vec2 rotation;
      uniform mat4 view; uniform mat4 projection;
      varying mediump vec3 surface; varying mediump vec3 world;
      vec3 turn(vec3 p){return vec3(rotation.x*p.x+rotation.y*p.z,p.y,-rotation.y*p.x+rotation.x*p.z);}
      void main(){world=turn(position*size)+offset;surface=normalize(turn(normal/size));gl_Position=projection*view*vec4(world,1.0);}`);
    const fragment=shader(gl.FRAGMENT_SHADER,`
      precision mediump float;
      uniform vec3 color; uniform vec3 eye;
      varying mediump vec3 surface; varying mediump vec3 world;
      void main(){vec3 n=normalize(surface);vec3 l=normalize(vec3(-0.4,1.0,0.8));vec3 e=normalize(eye-world);
      float diffuse=max(dot(n,l),0.0);float shine=pow(max(dot(n,normalize(l+e)),0.0),38.0);
      gl_FragColor=vec4(color*(0.48+0.52*diffuse)+vec3(0.18)*shine,1.0);}`);
    gl.attachShader(program,vertex);gl.attachShader(program,fragment);gl.linkProgram(program);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
    gl.deleteShader(vertex);gl.deleteShader(fragment);gl.useProgram(program);
    const uniforms=Object.fromEntries(["size","offset","rotation","view","projection","color","eye"].map(k=>[k,gl.getUniformLocation(program,k)]));
    const pos=gl.getAttribLocation(program,"position"),normal=gl.getAttribLocation(program,"normal");
    const buffers=Object.fromEntries(Object.entries(meshData).map(([key,data])=>{const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);return [key,{buffer:b,count:data.length/6}];}));
    const eye=kind==="equipment"?[6.5,5.7,7.8]:[5.8,4.8,6.2];
    gl.uniform3fv(uniforms.eye,eye);gl.uniformMatrix4fv(uniforms.view,false,viewMatrix(eye,kind==="equipment"?[0,1.4,0]:[0,.3,0]));
    gl.enable(gl.DEPTH_TEST);gl.clearColor(.93,.96,.94,1);
    const draw=(mesh,offset,size,color,angle=0)=>{
      if(size.some(v=>v<=.0001)) return;
      const data=buffers[mesh];gl.bindBuffer(gl.ARRAY_BUFFER,data.buffer);
      gl.vertexAttribPointer(pos,3,gl.FLOAT,false,24,0);gl.enableVertexAttribArray(pos);
      gl.vertexAttribPointer(normal,3,gl.FLOAT,false,24,12);gl.enableVertexAttribArray(normal);
      gl.uniform3fv(uniforms.offset,offset);gl.uniform3fv(uniforms.size,size);gl.uniform3fv(uniforms.color,color);gl.uniform2f(uniforms.rotation,Math.cos(angle),Math.sin(angle));
      gl.drawArrays(gl.TRIANGLES,0,data.count);
    };
    return (phase,p)=>{
      const dpr=Math.min(devicePixelRatio || 1,2),w=Math.round(canvas.clientWidth*dpr),h=Math.round(canvas.clientHeight*dpr);
      if(!w || !h) return;
      if(canvas.width!==w || canvas.height!==h) { canvas.width=w;canvas.height=h; }
      gl.viewport(0,0,w,h);const f=1/Math.tan((kind==="equipment"?.82:.65)/2),near=.1,far=40;
      const projection=[f/(w/h),0,0,0,0,f,0,0,0,0,(far+near)/(near-far),-1,0,0,2*far*near/(near-far),0];
      gl.uniformMatrix4fv(uniforms.projection,false,new Float32Array(projection));
      gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
      const box=(position,size,color,angle)=>draw("box",position,size,color,angle);
      const cyl=(position,size,color,angle)=>draw("cylinder",position,size,color,angle);
      if(lesson) {lesson.drawScene({kind,phase,p,box,cyl,draw,palette});return;}
      const exposed=i=>i%2===1;
      const tint=(i)=>exposed(i) && phase>=3 ? palette.resist.map((v,k)=>v+(palette.exposed[k]-v)*(phase===3?p:1)) : palette.resist;
      const height=i=>phase===0?0:phase===1?.18*p:(exposed(i) && phase>=5?.18*(phase===5?1-p:0):.18);
      if(kind==="material") {
        box([0,-.1,0],[5,.06,3.7],palette.dark);
        box([0,.14,0],[4.4,.42,3.2],palette.silicon);
        box([0,.43,0],[4.4,.16,3.2],palette.film);
        for(let i=0;i<7;i++) {const y=height(i);box([-2.2+(i+.5)*4.4/7,.51+y/2,0],[4.4/7,y,3.2],tint(i));}
        return;
      }
      box([0,-.22,0],[5.6,.35,4.3],palette.metal);
      box([0,1.3,-1.9],[5.2,3.1,.16],palette.white);
      box([-2.5,1.25,-.8],[.24,3,2.4],palette.white);box([2.5,1.25,-.8],[.24,3,2.4],palette.white);
      box([1.96,1.84,-1.75],[.65,.6,.08],palette.dark);
      box([1.96,1.84,-1.70],[.48,.39,.025],palette.film);
      const shift=phase===0?-1.5*(1-p):phase===6?1.5*p:phase===3?.16*Math.sin(p*Math.PI):0;
      const angle=phase===1?p*12:0;
      if(phase===1 || phase===5) {
        cyl([0,.18,0],[1.9,.34,1.9],palette.dark);cyl([0,.4,0],[1.7,.09,1.7],palette.metal);
        box([1.65,1.35,-.7],[.16,1.6,.18],palette.metal);
        const nozzle=phase===5?.7*Math.sin(p*Math.PI*2):0;
        box([.75+nozzle/2,2.07,-.25],[1.7,.13,.2],palette.metal);
        cyl([nozzle,1.84,0],[.10,.5,.10],palette.dark);
        if(p>.02 && p<.98) cyl([nozzle,1.22,0],[.026,.73,.026],phase===1?palette.resist:palette.fluid);
      } else if(phase===2 || phase===4) {
        cyl([0,.27,0],[1.63,.38,1.63],palette.metal);
        cyl([0,.47,0],[1.55,.08,1.55],palette.heat.map((v,i)=>v*(.75+.25*Math.sin(p*Math.PI))));
        box([0,2.4,-1],[3,.15,1.5],palette.metal);
      } else if(phase===3) {
        box([0,2.9,-.6],[3.4,.22,2.2],palette.dark);
        box([0,2.71,0],[1.6,.07,1.3],palette.white);
        for(let i=0;i<4;i++) box([-.69+i*.46,2.75,0],[.2,.04,1.3],palette.dark);
        cyl([0,2.08,0],[.69,1.1,.69],palette.metal);cyl([0,1.52,0],[.53,.08,.53],palette.film);
      } else {
        box([-1.7,.62,-.3],[.25,.9,.35],palette.dark);
        box([-1.0+shift/2,.55,0],[1.65,.09,.25],palette.metal);
      }
      cyl([shift,.34,0],[1.18,.2,1.18],palette.dark);
      cyl([shift,.56,0],[1.45,.18,1.45],palette.silicon,angle);
      cyl([shift,.7,0],[1.45,.1,1.45],palette.film,angle);
      const radius=phase===1?1.43*(.08+.92*p):1.43;
      for(let i=0;i<7;i++) {const y=height(i)*.55;draw("band"+i,[shift,.75+y/2,0],[radius,y,radius],tint(i),angle);}
      box([shift+Math.cos(angle)*1.37,.79,Math.sin(angle)*1.37],[.14,.035,.08],palette.dark,angle);
      if(phase===3 && p>.02 && p<.98) {
        for(let i=0;i<3;i++) cyl([shift+(i-1)*.5,1.1,0],[.035,.65,.035],palette.fluid);
      }
    };
  }

  let renderers=[];
  function fallback() {
    playing=false;cancelAnimationFrame(frame);renderers=[];
    player.dataset.renderer="unavailable";$("renderFallback").hidden=false;
    $("equipmentCanvas").hidden=true;$("materialCanvas").hidden=true;
    update();
  }
  try {renderers=[renderer($("equipmentCanvas"),"equipment"),renderer($("materialCanvas"),"material")];player.dataset.renderer="webgl";}
  catch {fallback();}
  document.querySelectorAll("canvas").forEach(canvas=>canvas.addEventListener("webglcontextlost",e=>{e.preventDefault();fallback();}));
  $("stepNav").innerHTML=steps.map((s,i)=>'<button data-step="'+i+'" aria-current="'+(i===0?'step':'false')+'"><span>'+String(i+1).padStart(2,"0")+'</span>'+s.title+'</button>').join("");
  function draw() {renderers.forEach(render=>render(step,progress));player.dataset.progress=String(Math.round(progress*100));$("timeline").value=String(Math.round(progress*100));$("timeline").setAttribute("aria-valuetext",steps[step].title+'：'+Math.round(progress*100)+'%');}
  function update(notice="") {
    const s=steps[step];player.dataset.step=String(step);player.dataset.playing=String(playing);
    $("stepTitle").textContent=String(step+1).padStart(2,"0")+' '+s.title;
    $("equipmentName").textContent=s.name;$("activeMechanism").textContent=s.name;$("currentOutcome").textContent=s.material;$("equipmentText").textContent=s.equipment;$("materialText").textContent=s.material;$("takeaway").textContent=s.takeaway;
    $("equipmentCaption").textContent=s.equipment;$("materialCaption").textContent=s.caption;
    $("equipmentCanvas").setAttribute("aria-label",s.title+'：'+'设备内部加工机构'+'三维示意');$("materialCanvas").setAttribute("aria-label",s.title+'：'+'晶圆或材料局部变化'+'三维示意');
    document.querySelectorAll("[data-step]").forEach(b=>{if(b.tagName==="BUTTON") b.setAttribute("aria-current",Number(b.dataset.step)===step?'step':'false');});
    $("previous").disabled=step===0;$("next").disabled=step===steps.length-1;
    $("play").disabled=reduced.matches || !renderers.length;
    $("play").textContent=playing?'暂停':step===steps.length-1 && progress===1?'重新播放':step===startStep && progress===0?'播放':'继续播放';$("play").setAttribute("aria-pressed",String(playing));
    $("playbackStatus").textContent=reduced.matches?'已启用减少动态效果：请用步骤按钮静态查看。':!renderers.length?'三维不可用：可选择步骤阅读完整文字说明；刷新页面可重试绘制。':notice || (playing?'正在播放：'+s.title:'已暂停，可选择步骤或拖动进度查看。');
    draw();
  }
  function stop() {playing=false;cancelAnimationFrame(frame);}
  function choose(index,p=1) {stop();step=index;progress=p;update('当前显示“'+steps[step].title+'”的'+(p===1?'完成':'起始')+'状态。');}
  function tick(time) {
    if(!playing) return;
    const delta=Math.min((time-lastTime)/5500,.05);lastTime=time;progress=Math.min(1,progress+delta);
    if(progress===1) {
      if(step===steps.length-1) {stop();update('全过程播放完毕。可重播或选择某一步重新查看。');return;}
      step++;progress=0;update();
    } else draw();
    frame=requestAnimationFrame(tick);
  }
  function start() {if(reduced.matches || !renderers.length || document.hidden) return;playing=true;lastTime=performance.now();update();frame=requestAnimationFrame(tick);}
  $("stepNav").addEventListener("click",e=>{const b=e.target.closest("button[data-step]");if(b) choose(Number(b.dataset.step));});
  $("previous").addEventListener("click",()=>choose(Math.max(0,step-1)));
  $("next").addEventListener("click",()=>choose(Math.min(steps.length-1,step+1)));
  $("play").addEventListener("click",()=>{if(playing){stop();update('已暂停；继续播放会从当前位置开始。');}else{if(step===steps.length-1 && progress===1) {step=startStep;progress=0;}start();}});
  $("replay").addEventListener("click",()=>{choose(startStep,0);start();});
  $("timeline").addEventListener("input",()=>{stop();progress=Number($("timeline").value)/100;update('已暂停，当前步骤进度 '+Math.round(progress*100)+'%。');});
  document.addEventListener("visibilitychange",()=>{if(document.hidden && playing) {stop();update('页面离开前台，播放已暂停。');}});
  reduced.addEventListener("change",()=>{stop();update();});
  window.addEventListener("pagehide",stop);
  new ResizeObserver(()=>draw()).observe(player);
  update('尚未播放。点击步骤可查看该步完成状态，或拖动进度观察过程。');
})();
