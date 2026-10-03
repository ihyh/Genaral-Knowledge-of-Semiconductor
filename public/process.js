(() => {
  "use strict";
  const $=id=>document.getElementById(id);
  const s=(title,name,equipment,material,takeaway)=>({title,name,equipment,material,takeaway,caption:material});
  const commonNote="设备按功能重建，并非具体厂商型号；外壳局部隐藏，尺寸、厚度、颜色及加工速度均为教学示意，不提供生产参数。涉及多个工序的演示按工位切换，不表示同一台设备完成所有加工；量测与检测用于获取信息，不直接改变材料。";
  const lessons={
    materials:{chapter:4,title:"先获得晶圆，再制造电路。",intro:"以硅晶圆为例，观察原料如何成为单晶棒、薄片和可加工表面。材料制备与器件制造是两个不同阶段。",why:"后续精细加工需要符合材料、形状与表面要求的载体，不能直接用普通原料块替代晶圆。",before:"高纯多晶硅原料，还不是片状加工载体。",after:"完成相应表面加工与检查的晶圆，尚未制造芯片电路。",note:"本例采用直拉法（CZ，Czochralski）生长路线。原料提纯未动画展开；切片后的研磨、损伤去除和抛光在第三处理场景中概括，画面只演示抛光接触；检查用扫描位置表示，不模拟实际测量结果。"+commonNote,
      legend:[["#8b9a9f","硅原料 / 晶体 / 晶圆"],["#dc7344","熔体与加热（状态示意色）"],["#68a6b8","加工表面（非额外薄膜）"],["#66cbd6","清洗液（示意）"]],
      steps:[
        s("准备原料","原料与生长炉","高纯多晶硅装入生长所需容器。提纯与原料检验不在本动画中展开。","画面中的硅块是单晶生长的原料，还不是晶圆，也没有芯片电路。","高纯原料与合格晶圆不是同一形态。"),
        s("单晶生长","直拉生长机构","硅熔化后，籽晶引导晶体生长，提拉与旋转机构形成单晶棒；炉体已剖开。","原料转为熔体，随后形成单晶棒。旋转与高度变化被放大，暖色不代表实际熔体外观。","单晶是晶体结构概念，不是已经完成电路的芯片。"),
        s("切片","切片机构","切割机构将晶棒分为薄片。切割线与片间距被放大；未模拟线锯完整结构。","单晶棒成为多个薄片，仍需后续表面加工。右侧片间距仅用于展示分离。","切片不是从晶圆上切出芯片；此时晶圆上还没有电路。"),
        s("表面加工","抛光承载机构","切片后经研磨、损伤去除和抛光等处理。本场景只显示承载头与抛光垫接触、旋转。","局部起伏逐渐减小，形成适合后续加工的表面；蓝色只强调加工面，不表示新增一层膜。","这些步骤准备表面，不是制造器件或布线。"),
        s("清洗与检查","供液与检查位置","晶圆清洗、干燥并检查表面及相关指标。供液与扫描位置为概括示意，未显示检测数据。","残留物被清除，晶圆经规定项目检查后才可作为后续制造的载体；画面洁净不等于证明合格。","材料制备完成后，还要进入晶圆制造才能形成电路。")
      ],drawScene:materialsScene},
    patterning:{chapter:5,title:"从连续薄膜，走到一层材料图形。",intro:"将成膜、光刻、刻蚀与去胶放在同一个局部循环中，分清每一步处理的是哪层材料。这不是一颗芯片的完整制造过程。",why:"电路中的材料不能无差别覆盖所有位置，需要把某一层材料加工成设计要求的结构。",before:"承载本轮加工的硅基底，没有本例蓝色目标薄膜。",after:"目标薄膜有了图形，临时胶层被去除；还没有形成完整器件、多层互连或成品芯片。",note:"本例只演示一层薄膜的简化减法图形化：成膜→正性胶图形化→目标膜刻蚀→去胶→检查。光刻中涂胶、烘烤、曝光、显影合并为一个阶段，详见独立光刻演示。保护层理想化，刻蚀停在基底表面；不模拟真实选择比、反应、掩膜消耗或全部清洗。"+commonNote,
      legend:[["#8b9a9f","硅基底"],["#68a6b8","本轮目标薄膜"],["#d59843","临时光刻胶"],["#66cbd6","反应 / 检查位置（可视化示意）"]],
      steps:[
        s("增加薄膜","成膜腔体","腔体内形成一层目标薄膜；画面的下行标记只表示材料供应，不对应特定沉积设备的气路。","硅基底上逐渐增加连续蓝色薄膜。目标膜的材料与用途随产品层次变化。","成膜是在增加材料，此时没有本轮图形开口。"),
        s("形成胶图形","光刻处理概括","涂胶、曝光与显影在此合并演示。设备图只是过程概括，详细动作应阅读光刻七步演示。","先形成连续胶层，再选择性移除部分胶，露出蓝色薄膜。薄膜仍连续，未被刻穿。","光刻输出胶层图形；显影开口不等于薄膜刻蚀完成。"),
        s("刻蚀目标膜","刻蚀腔体","反应通过胶层开口加工目标薄膜；胶覆盖区域在此理想化示例中保留。可视标记不表示实际可见光束。","开口下的蓝色目标膜被移除，图形转移到薄膜；硅基底在本例中保持连续。","刻蚀加工目标膜，而不是再次显影光刻胶。"),
        s("移除临时胶","去胶处理","设备移除不再需要的剩余光刻胶，相关清洗过程按实际路线完成。","琥珀色胶层被移除，蓝色薄膜保留本轮图形。去胶不是把图形化目标膜一起去掉。","临时保护材料与最终要保留的材料应区分。"),
        s("检查与衔接","量测与检查位置","检查图形尺寸、位置或缺陷，为后续处理提供依据。扫描线只表示检查位置，不输出合格结论。","薄膜图形保留，本例未继续生成器件或多层连接。实际加工还会使用多次不同循环。","完成一个图形化循环，不等于完成一颗芯片。")
      ],drawScene:patternScene},
    packaging:{chapter:6,title:"裸片还需要连接、保护与测试。",intro:"以单裸片倒装连接为例，从晶圆测试和分离，走到封装与成品测试。此例不是所有封装的共同配方。",why:"裸片需要与外部电路连接，并满足机械保护等要求；测试用于确认规定的功能与电气表现。",before:"晶圆上已有电路单元，尚未成为本例的独立封装器件。",after:"一个倒装连接的封装器件完成相应装配，并进入成品测试；动画不提供实际测试结论。",note:"单裸片倒装示例；凸点准备、减薄、底部填充和其他装配细节被概括或省略，外部连接以柱状接点简化。晶圆边缘与划片损耗未显示；材料视图将裸片和保护结构局部剖开以便观察接点，不是实际器件缺损。引线键合、多裸片与晶圆级封装使用其他安排。"+commonNote,
      legend:[["#8b9a9f","硅裸片"],["#68a6b8","晶圆电路区域（概括）"],["#d59843","凸点与电连接"],["#3d795a","封装承载结构"],["#263e38","保护结构（局部剖开）"]],
      steps:[
        s("晶圆测试","探针接触与定位","探针接触电路单元的测试位置，测试系统施加并读取电信号。画面只显示接触和定位。","电路单元仍在整片晶圆上；本步骤获取测试结果，不重新生成电路，也没有给出通过比例。","探针台负责定位与接触，判断需要测试系统和规定标准。"),
        s("分离裸片","划片机构","切割机构沿电路单元之间的划片区域加工。画面省略减薄、边缘区域及切割损耗。","电路单元成为分离的裸片；间距被放大，以便区分。电路不是在切割时才形成。","从晶棒切晶圆和从电路晶圆分离裸片，是不同阶段的切割。"),
        s("放置裸片","拾取与对准机构","拾取机构把已准备连接结构的裸片对准封装承载结构。本例已按倒装方向放置，不动画展开翻转与凸点制备。","裸片的电连接面朝向承载结构，凸点与下方连接位置对应；尚未表示连接完成。","倒装的连接方向与引线键合不同，不需再必然加入金属键合线。"),
        s("建立连接","连接工位","设备按选定装配路线完成凸点等连接，具体加热、材料与过程未模拟。","裸片与承载结构通过接点连接；下方外部连接属于封装结构，不是原硅晶圆。","封装互连把裸片连接到外部，与晶圆内部互连不是同一层次。"),
        s("保护结构","装配工位","添加所需保护结构。本例用局部开盖示意，未模拟具体成型、填充和散热工艺。","器件获得保护与支撑，材料视图剖开裸片前部以露出接点；这不是实际缺损的成品。","封装不只是加壳，还要考虑连接、机械与热方面的要求。"),
        s("成品测试","测试插座与接触机构","器件通过外部连接接入测试位置，测试系统检查规定项目。接触位移不表示所有测试项目。","封装器件形态保持，产生测试数据与分类依据。本动画不输出合格结论，也不模拟可靠性寿命。","晶圆测试和成品测试处于不同阶段，不能相互完全替代。")
      ],drawScene:packageScene},
    implant:{chapter:5,title:"掺杂改变硅的性质，不是增加一层膜。",intro:"以有掩膜的离子注入为例，观察选定元素如何进入硅的指定区域。先理解目的与位置，再认识设备。",why:"器件需要不同区域具有不同的电学特性。掺杂是引入选定元素来调节性质；离子注入是实现掺杂的一种方法。",before:"已有开口的临时掩膜覆盖部分硅表面，待处理区域尚未完成本轮注入。",after:"选定区域内引入了掺杂元素，掩膜被移除；通常还需相应退火，不能直接等同于器件完成。",note:"本例假定掩膜可有效阻挡注入，省略其光刻制备。右侧硅前部剖开以显示内部标记；橙色小柱代表掺杂元素，不是可见颗粒或新薄膜。大小、数量、深度均非真实比例；不模拟离子轨迹、通道效应或完整浓度分布。"+commonNote,
      legend:[["#8b9a9f","硅（前部局部剖开）"],["#d59843","临时掩膜"],["#ef7340","硅内部的掺杂元素标记"],["#66cbd6","离子束路径示意"]],
      steps:[
        s("识别开口","掩膜与晶圆定位","晶圆已有带开口的掩膜；定位机构将指定区域安排到加工位置。本步骤不重新演示光刻。","掩膜覆盖区域与开口区域不同；右侧剖开硅前部，方便随后观察内部变化。","掩膜用于选择处理区域，不是要保留的电路材料。"),
        s("形成离子束","离子源与束线概括","离子源产生离子，束线完成选取、加速和输送。路径被简化为折线，不代表实际磁场与设备尺寸。","离子束到达开口，覆盖区域在本例中被掩膜阻挡。本阶段主要解释束的来源与位置。","离子注入设备与薄膜沉积设备解决不同任务。"),
        s("进入硅内部","束线与扫描机构","离子束与晶圆相对扫描，将选定元素引入开口下方的硅。移动位置和注入深度为教学示意。","橙色标记出现在硅内部指定区域，硅的宏观外形保持；不是在表面铺出橙色膜。","掺杂可以改变性质，而不产生肉眼可辨的外形变化。"),
        s("移除掩膜","去除临时掩膜","按工艺路线移除不再需要的临时掩膜，并完成相关清洗；去除方法未具体模拟。","掩膜逐渐消失，内部掺杂标记保留；去掩膜不应把已注入的元素一并删除。","临时掩膜与硅内部的掺杂元素要分开理解。"),
        s("衔接退火","过程检查与后续衔接","核对本轮工艺信息与规定检查项，再衔接所需热处理。扫描位置不提供测量或合格结论。","硅内已有掺杂元素，但其电学作用和注入损伤仍需后续处理；此时尚未形成完整芯片。","注入与退火是关联步骤，不是同一个过程。")
      ],drawScene:implantScene},
    anneal:{chapter:5,title:"退火处理内部状态，不是清除掺杂。",intro:"以离子注入后的退火为例，理解为什么外形相近的晶圆仍需要受控热处理。",why:"注入会扰动硅的晶体结构，部分掺杂元素也尚未处于发挥预期电学作用的状态。适当退火可修复损伤并促进电学激活。",before:"已经注入掺杂元素的硅，存在需要处理的结构损伤；外形变化不一定可见。",after:"经过相应热处理后，内部损伤与掺杂状态得到调整；掺杂元素仍保留，实际效果需规定量测确认。",note:"采用灯加热的快速热处理功能示例。RTP（Rapid Thermal Processing，快速热处理）不是所有热处理的统称。前部剖切、灰色短线及橙／绿标记分别示意损伤和激活状态，不是实际可见颜色；暖色边框是加热状态提示，不是新增材料。为便于比较，标记数量与位置保持，未模拟扩散、真实晶格、温度曲线或完全修复。"+commonNote,
      legend:[["#8b9a9f","硅"],["#ef7340","待激活掺杂元素（状态色）"],["#42b87f","已激活状态（教学标记）"],["#263e38","注入损伤（局部短线）"],["#dc7344","加热状态（非实际发光）"]],
      steps:[
        s("处理前状态","热处理腔体与承载","晶圆进入热处理位置，相关环境与温度控制按工艺要求安排；外壳已局部隐藏。","橙色标记代表待激活掺杂元素，灰色短线代表注入损伤；并非实际可见的杂质颗粒和裂纹。","外观没有明显变化，不代表材料内部状态相同。"),
        s("受控加热","灯加热与温度控制","本例用灯加热机构表示升温，实际过程需控制温度、时间与环境；不提供生产设定。","晶圆受到热处理，暖色只表示加热状态；本阶段没有把掺杂元素画成蒸发或移除。","热处理依靠受控条件，不能简单理解为越热越好。"),
        s("修复与激活","热处理阶段","在选定工艺条件下，退火促进结构修复与掺杂电学激活。灯光脉动只表达过程进行中。","损伤标记减少，橙色标记逐渐变为绿色状态码；这是内部性质改变，不是增加绿色材料。","激活不是新增元素，修复也不意味着动画能证明完全无缺陷。"),
        s("受控冷却","冷却与承载","完成相应热处理后受控冷却并准备后续搬运；画面不模拟热传导或具体冷却气路。","加热提示减弱，已激活状态标记保留；冷却没有把掺杂区域恢复成未注入状态。","热处理结束后，材料状态的变化可以继续保留。"),
        s("量测与衔接","量测位置示意","按规定项目评估材料及电学表现，并衔接下一工序；检查光标不对应真实测试数据。","硅的宏观轮廓仍与处理前相近，但内部状态已调整；具体分布还可能受扩散等因素影响。","动画中的状态色便于理解，合格判断仍需要真实量测。")
      ],drawScene:annealScene},
    cmp:{chapter:5,title:"去除多余材料，保留凹槽内的导线。",intro:"以铜互连的化学机械平坦化为例，观察表面多余铜如何被移除，同时凹槽内的铜得到保留。",why:"填充后表面存在多余材料与起伏，影响后续层的加工。需要控制去除量并建立适合继续加工的表面。",before:"绝缘材料内的凹槽已填铜，表面还覆盖多余铜；不是可直接继续叠层的最终状态。",after:"表面多余铜被去除，凹槽中的铜保留；还需清洗与量测，动画不证明完全平整或合格。",note:"CMP（Chemical Mechanical Planarization，化学机械平坦化）结合化学作用与机械接触。本例省略阻挡层去除细节，仅跟踪铜与绝缘层；实际存在选择性、磨损、凹陷等控制问题。设备中加工面朝下接触抛光垫，右侧剖面加工面朝上便于比较，不代表同时两面加工。"+commonNote,
      legend:[["#8b9a9f","下方载体（已有结构省略）"],["#68a6b8","绝缘层"],["#b87945","铜（颜色用于识别）"],["#66cbd6","抛光液 / 供液位置"],["#263e38","抛光垫"]],
      steps:[
        s("识别多余材料","承载与抛光平台","承载头固定晶圆，抛光平台准备加工。设备示意已把加工面朝向下方的垫面。","铜已填入绝缘层凹槽，还连续覆盖在绝缘层表面；右侧以局部直线凹槽举例。","待去除的是表面多余材料，不是凹槽中的全部铜。"),
        s("供液与接触","供液机构与承载头","抛光液供应到垫面，承载头让加工面接触抛光垫；化学作用与机械作用共同参与。","加工开始时表面仍有多余铜。供液标记不代表实际颗粒大小或所有化学反应。","平坦化不是只用水冲洗，也不是仅靠干磨。"),
        s("去除表面铜","相对运动与压力控制","垫面与晶圆进行相对运动，承载机构控制接触；垫上的浅色标记用于显示旋转。","连续覆盖层逐渐变薄，凹槽中的铜仍保留；本例将去除终点理想化在绝缘层表面。","去除量要受控，过度加工可能损伤目标结构。"),
        s("清洗残留","加工后清洗","离开抛光接触后清洗残留物；画面概括供液与表面清理，不展示实际刷洗机构。","表面多余铜已移除，绝缘层与铜线顶面在本例中齐平；残留物清理不应删除铜线。","平坦化与加工后清洗承担不同任务。"),
        s("检查表面","量测与检查位置","检查表面状态及规定指标，再进入后续层加工；扫描位置不输出厚度或合格判断。","凹槽内保留铜线，绝缘层仍分隔相邻线；实际平整程度与缺陷需要量测确认。","看起来平整不等于已通过工艺验收。")
      ],drawScene:cmpScene},
    interconnect:{chapter:5,title:"导线跨越多层，通孔连接指定位置。",intro:"以铜双镶嵌互连的局部示例，观察绝缘层、沟槽、通孔、金属填充与平坦化如何配合。先辨认材料，再追踪上下层连接。",why:"器件需要电连接才能形成电路。绝缘材料隔开不同导线，金属线沿层内延伸，通孔在设计指定的位置连接不同层。",before:"已有一条下层铜线及周围绝缘材料；前段器件结构在本例中省略。",after:"新增一条上层铜线，并通过一个通孔连接下层线；两层线路的交叉处不是自动连接，更多层需要继续相应加工。",note:"采用铜双镶嵌（Dual damascene）教学路线：在绝缘层中形成沟槽和通孔，再衬层、填铜、平坦化。光刻与多次刻蚀合并，阻挡／衬里／种子层夸大为薄壁；材料视图剖开前部绝缘层，填铜后也剖开通孔前侧衬层，露出铜芯，实际结构并非缺损。真实器件与底部接触省略，不能把它当成完整芯片横截面。"+commonNote,
      legend:[["#8b9a9f","下方载体"],["#68a6b8","绝缘材料（前部剖开）"],["#b87945","铜线与通孔"],["#263e38","阻挡 / 衬里示意"],["#d59843","铜种子层示意"]],
      steps:[
        s("识别下层线","已有结构与承载","晶圆上已有下层互连结构。此阶段只建立观察起点，不重新演示前段器件制造。","一条铜线嵌在绝缘材料中；不同线路之间需要绝缘分隔，下方器件在此省略。","晶圆内部互连不是封装后的外部引脚。"),
        s("增加绝缘层","成膜腔体概括","在已有结构上增加所需绝缘材料，为下一层线路准备加工空间。设备内部按功能简化。","上方增加绝缘层，下层铜线保留。绝缘层不是要把上下层全部短接的金属膜。","多层互连需要导电材料与绝缘材料共同配合。"),
        s("形成沟槽与通孔","光刻与刻蚀概括","按设计形成上层沟槽及通向下层线的孔。光刻、刻蚀与清洗在本阶段合并；可视标记只示意加工位置，不是用光束切硅。","沟槽用于容纳上层线，通孔开口到达指定下层线；此时孔内还没有铜。","几何开口形成后，还需要导电材料才能建立电连接。"),
        s("准备衬层与种子层","阻挡、衬里与种子层沉积","在开口内形成适当的阻挡层、衬里和铜种子层；本例以两种薄壁颜色合并展示，不表达真实层厚。","阻挡层限制铜向周围材料扩散，衬里服务于界面，铜种子层为后续电镀提供基础。","衬层不是多余包装；它参与界面与材料控制。"),
        s("填充铜","电化学沉积工位","通过电化学沉积（ECD，Electrochemical Deposition）等选定方式填铜；液槽与供电结构为概括。","铜填入沟槽和通孔，连接上下层指定位置；表面同时形成需要去除的多余铜。","填满开口还不是这一层互连的最终表面状态。"),
        s("平坦化表面","化学机械平坦化概括","去除表面多余材料并完成相应清洗，控制终点。本场景只表示工序衔接，接触机制见独立 CMP 演示。","表面覆盖层消失，沟槽和通孔内的铜保留；上层线通过这一个通孔与下层线相连。","平坦化不能把通孔和目标导线一起删除。"),
        s("检查与继续叠层","检查位置与下一轮加工","检查规定项目，然后按设计继续其他层的加工。扫描光标不是电流或真实测试结果。","剖开前部绝缘层后可追踪下层线、通孔、上层线；未设通孔的交叉线路不会仅因交叉而连接。","后段互连（BEOL，Back End of Line）属于晶圆制造，不是封装测试的同义词。")
      ],drawScene:interconnectScene},
    cleaning:{chapter:5,title:"清除残留，保留需要的材料与结构。",intro:"以单片湿法清洗为例，观察供液、冲洗与干燥怎样衔接。清洗在制造中多次出现，不是只在开始时进行。",why:"颗粒与加工残留可能影响后续成膜、图形加工和器件表现。清洗要针对当前材料与污染类型，同时避免损伤有用结构。",before:"晶圆上已有本轮需保留的薄膜图形，表面带有待去除的残留物。",after:"本例残留物经清洗移走，完成冲洗与干燥；原有薄膜图形保留，洁净程度仍需相应检查。",note:"采用供液与旋转承载的单片湿法功能示例，不代表所有清洗路线。橙色块代表选定残留；浅蓝标记表示液体，不是新增功能膜。残留移动与消失仅表示被带离观察区域，不模拟溶解、真实流场、化学选择性或完全无污染。干燥示意不适用于所有高深宽比结构；本例不提供化学品、浓度、转速等生产参数。"+commonNote,
      legend:[["#8b9a9f","硅基底"],["#68a6b8","需要保留的薄膜图形"],["#d59843","待去除残留（放大）"],["#66cbd6","液体 / 供液 / 检查位置（示意）"]],
      steps:[
        s("识别处理对象","承载与定位机构","承载机构固定并定位晶圆，依据已有材料与残留类型安排本轮清洗；不是将所有表面材料都视为污染。","蓝色薄膜图形是需要保留的结构，橙色块是待处理残留。颜色只用于区分任务，不代表真实外观。","清洗必须分清要保留什么、要去除什么。"),
        s("供液与作用","供液及承载机构","供液机构向表面输送选定清洗介质，晶圆与液体按路线作用；可视液柱不代表化学反应或设备真实气路。","表面处于清洗介质作用下，残留尚未在本阶段全部移走；原有薄膜图形保持。","清洗介质和条件取决于材料与污染，不是所有步骤共用一种配方。"),
        s("带离残留","旋转与排液概括","本例概括清洗作用、液体更新与排出，承载台旋转标记用于显示运动；不模拟真实液体轨迹。","残留标记逐渐离开局部观察区域，有用薄膜不变。标记消失仅说明本例被带走，不证明真实表面零污染。","清洗去除的是选定残留，不是把电路结构一起删除。"),
        s("冲洗与干燥","冲洗供液与干燥概括","冲洗减少清洗介质及相关残留，随后按路线干燥。动画用供液停止、液体标记减少概括，不表示所有结构均适合旋转干燥。","表面液体标记逐渐消失，已保留的材料图形不被磨薄或刻穿；这不同于平坦化和刻蚀。","冲洗和干燥解决液体与残留管理，不是新一轮图形加工。"),
        s("检查与衔接","后续检查位置","按规定项目确认表面状态，再进入后续加工；移动光标只表示检查位置，不给出合格结论。","本例残留与液体标记已移除，基底和有用薄膜保留；实际洁净度仍需相应检测与工艺控制。","清洗贯穿制造；清洗后的状态也需要确认。")
      ],drawScene:cleaningScene},
    metrology:{chapter:5,title:"量测得到参数，不是把材料重新加工。",intro:"以非接触光学薄膜厚度量测为例，分清材料本身与观察后得到的信息。无需先掌握光学公式。",why:"成膜后需要知道厚度及不同位置的情况，不能只凭外观判断。量测提供参数与反馈，支持后续过程控制。",before:"硅基底上已有薄膜，尚未获得本轮示例的厚度信息。",after:"采集信号并进行相应分析，获得厚度等参数信息；本例薄膜和基底的形状、厚度保持。",note:"采用分析反射光的非接触量测功能示例；发射／接收路径被画成位置标记，不是真实光线追迹或仪器光路。厚度括号与测点是注释，不是实体探针或新增材料。真实量测涉及材料光学性质、模型、校准及不确定度；本动画不生成光谱、不反演真实厚度、不输出数值或通过判定。示意测点不等于覆盖整片晶圆所有位置。"+commonNote,
      legend:[["#8b9a9f","硅基底"],["#68a6b8","已有薄膜（保持不变）"],["#66cbd6","照明 / 采样位置示意"],["#d59843","接收 / 厚度注释（非材料）"]],
      steps:[
        s("定义量测项目","量测位置与校准准备","确认本轮要测的是薄膜厚度，选取合适方法与位置；设备校准及模型准备未动画展开。","膜厚是这层膜上下界面间的距离，不是整片晶圆厚度。薄膜保持连续；看到蓝色层不等于知道真实厚度。","量测前先明确要得到哪个参数。"),
        s("照明与接收","光学量测头","光学组件照明并采集反射信号；两种路径颜色只区分发射和接收功能，不代表真实可见光束。","光与材料相互作用，获得用于分析的信号；本例不是用光束去除薄膜，也不新增材料。","检测到光信号后，还需要分析才能得到厚度信息。"),
        s("采集不同位置","定位与采样机构","改变观察位置并采集对应信号。画面用少量测点表达采样，未模拟整片扫描策略。","采样位置标记增加，薄膜厚度和基底轮廓保持；得到的是不同位置的信息，不是把这些位置加工出来。","不同位置的量测有助于了解空间差异，但采样不等于全覆盖。"),
        s("分析厚度参数","信号分析与量测模型","结合适用模型、材料信息及校准，分析采集信号。右侧括号只指出所讨论的上下界面间距。","材料不变，新增的是厚度参数信息。本动画不给出数值，不把括号长度直接当作真实量测值。","量测模型与校准影响结果，教学模型不能替代真实仪器。"),
        s("提供过程反馈","结果记录与控制衔接","将结果与规定要求比较，必要时进行复核或为后续过程提供反馈；判断与处理需按实际规范完成。","材料仍保持，量测信息可用于评价过程。本动画没有合格阈值，也没有自动修正厚度。","量测、依据标准判断、采取加工措施，是不同环节。")
      ],drawScene:metrologyScene},
    inspection:{chapter:5,title:"检测标出异常，不会自动修复结构。",intro:"以光学图形晶圆缺陷检测为例，观察信号采集、候选位置标记与复查的关系。量测参数与查找缺陷各有任务。",why:"颗粒、异常连接等可能影响器件与后续加工。制造中需要及时发现异常位置，再结合复查与工艺信息判断原因。",before:"已有薄膜图形中，本教学样本设有一处颗粒和一处异常桥连；它们在检测前已存在。",after:"示例异常位置被标注以便复查，原颗粒与异常桥连仍在；未执行清洗、刻蚀、返工或电气测试。",note:"采用光学信号采集与缺陷位置标注的功能示例，不模拟具体厂商算法。橙色颗粒和蓝色桥连被放大；红框是叠加注释，不是实体材料、加工光束或删除指令。本例预设两个异常，不代表真实检出率或能检出全部缺陷；未模拟参考图像、信噪比、误报、漏报或实际分类结果。结构异常的电气影响还需进一步评估。"+commonNote,
      legend:[["#8b9a9f","硅基底"],["#68a6b8","薄膜图形与异常桥连"],["#d59843","已有颗粒（放大）"],["#66cbd6","采集位置注释"],["#df3d36","候选异常位置（叠加框）"]],
      steps:[
        s("识别已有样本","承载与定位机构","将已有图形的晶圆安排到检测位置。此时没有执行清洗或修复，设备外壳已局部隐藏。","颗粒与桥连原本就存在。桥连指本应分开的图形被多余材料连接；没有红框不代表异常尚不存在。","检测发现已有异常，不是在检测时制造异常。"),
        s("采集光学信号","照明与成像组件","照明、成像与定位配合采集相应区域信号；可视光标只表示观察位置，不模拟实际镜头分辨率。","薄膜图形、颗粒与桥连都保持。采集信号并不将颗粒冲走，也没有把桥连切断。","光学检测和湿法清洗是不同任务。"),
        s("标记候选位置","信号处理与位置记录","分析采集信号，记录需进一步关注的位置。本动画的候选位置由预设样本演示，不运行真实检出算法。","红框逐渐指出颗粒和桥连位置；框是观察注释，框内的实际材料没有因此变化。","候选标记是需要评估的信息，不是自动修复指令。"),
        s("复查与分类","复查观察位置","对候选位置进一步观察，结合工艺信息区分缺陷类型与其他信号；实际复查可能采用不同成像方法。","异常结构仍保留。复查用于理解位置与性质，本例不提供电气通过结论或真实分类置信度。","位置标记不等于确定根因，结构检测也不等于电气测试。"),
        s("形成处理依据","缺陷记录与过程反馈","将缺陷信息用于过程分析，必要时按规范安排后续复核、工艺调整或处置；不是所有缺陷都可返工。","颗粒、桥连与标记保留，新增的是位置和评估信息。即使需要清洗，也应由相应工序另行完成。","检测提供反馈；修复、处置和质量判定需要另外的依据与流程。")
      ],drawScene:inspectionScene}
  };
  const key=window.FabMechanismKey || new URLSearchParams(location.search).get("lesson") || "materials",lesson=Object.hasOwn(lessons,key)?lessons[key]:null;
  const readingTopics={applications:["芯片有什么用","chapter-2"],design:["芯片设计与行业分工","chapter-3"],nodes:["制程节点","concept-nodes"],wafers:["晶圆尺寸","concept-wafers"],yield:["良率","concept-yield"]};
  if(Object.hasOwn(readingTopics,key)) {
    const [title,anchor]=readingTopics[key],url="/chapters.html#"+anchor;
    document.title=title+" · 基础阅读";
    $("lessonTitle").textContent=title;
    $("lessonEyebrow").textContent="基础概念与行业关系";
    document.querySelector(".preview").textContent="基础阅读";
    document.querySelector(".breadcrumb").lastChild.textContent=" / 基础阅读";
    $("readingStart").parentElement.lastChild.textContent=" 知识内容以图文直接显示；上方设备主题为可选学习内容。";
    $("lessonIntro").textContent="本主题以基础文字和静态图示讲解，不再提供动画；设备演示仅用于解释内部加工与观察机制。";
    $("lessonContent").hidden=true;$("player").remove();
    const status=$("unknownLesson"),link=document.createElement("a");
    status.textContent="本主题的动画已移除，知识内容仍完整保留。";
    link.href=url;link.textContent="阅读"+title+" →";status.append(" ",link);status.hidden=false;
    for(const id of ["chapterLink","readingStart","readingLink"])$(id).href=url;
    $("chapterLink").textContent="对应基础阅读";
    return;
  }
  if(!lesson) {$('lessonContent').hidden=true;$('unknownLesson').hidden=false;$('player').remove();return;}
  // Retain a bounded entry context when several topics share one scene.
  const origins = {
    materials:["materials","wafer-preparation",0,"晶圆制备"], cleaning:["cleaning","fab-cleaning",0,"清洗与表面准备"],
    film:["patterning","fab-film",0,"成膜"], etch:["patterning","fab-etch",2,"刻蚀"],
    implant:["implant","fab-implant",0,"掺杂与注入"], anneal:["anneal","fab-anneal",0,"热处理与退火"],
    cmp:["cmp","fab-cmp",0,"平坦化"], interconnect:["interconnect","fab-interconnect",0,"多层互连"],
    feedback:[null,"fab-feedback",0,"量测与检测"],
    "wafer-testing":["packaging","wafer-testing",0,"晶圆测试与分离"], packaging:["packaging","package-connections",2,"封装与成品测试"]
  };
  const from=new URLSearchParams(location.search).get("from");
  const origin=Object.hasOwn(origins,from)?origins[from]:null;
  const context=origin && (origin[0]===key || (from==="feedback" && ["metrology","inspection"].includes(key)))?origin:null;
  lesson.startStep=context?context[2]:0;
  if(context && from==="film") {
    lesson.title="成膜：在表面形成所需材料层。";
    lesson.intro="本环节关注增加薄膜。共享示例的后续图形化、刻蚀与检查，用于说明这层材料如何继续加工。";
    lesson.why="为后续器件、绝缘或连接提供需要的材料层。";
    lesson.after="成膜结束时，本轮目标薄膜已经形成，但还没有对应的加工开口；后续图形化不属于成膜本身。";
  }
  if(context && from==="etch") {
    lesson.title="刻蚀：将掩膜开口转移到目标材料。";
    lesson.intro="从已形成的胶层开口开始观察刻蚀、去胶与检查。前面的成膜及胶图形化可用步骤按钮回看。";
    lesson.why="通过掩膜限定区域，选择性移除本轮目标薄膜，使材料获得需要的图形。";
    lesson.before="胶层已经有开口，开口下的目标膜仍连续；本轮刻蚀尚未执行。";
  }
  if(context && from==="packaging") {
    lesson.intro="从分离并准备连接结构的裸片开始观察倒装装配、连接、保护和成品测试；晶圆测试与分离可回看。";
    lesson.before="已有分离的裸片及准备好的连接结构，尚未与本例封装承载结构完成连接。";
  }
  if(context && from==="wafer-testing") {
    lesson.title="晶圆测试与分离：从电路单元到裸片。";
    lesson.intro="先观察探针测试与裸片分离；后续装配、连接及成品测试用于说明它们如何衔接。";
    lesson.why="获得电路单元的测试信息，并按路线获得可供后续封装的裸片。";
    lesson.after="本环节形成测试记录与分离裸片；本共享演示随后还可继续观察封装与成品测试。";
  }
  window.FabLesson=lesson;
  document.title=lesson.title+" · 半导体入门";
  for(const [id,value] of Object.entries({lessonTitle:lesson.title,lessonIntro:lesson.intro,lessonWhy:lesson.why,lessonBefore:lesson.before,lessonAfter:lesson.after,routeNote:lesson.note})) $(id).textContent=value;
  $('chapterLink').href='/chapters.html#chapter-'+lesson.chapter;
  $('chapterLink').textContent='第'+lesson.chapter+'章基础阅读';
  const readingSections={cleaning:'fab-cleaning',patterning:'fab-film',implant:'fab-implant',anneal:'fab-anneal',cmp:'fab-cmp',interconnect:'fab-interconnect',metrology:'fab-feedback',inspection:'fab-feedback'};
  for(const id of ['readingStart','readingLink']) $(id).href='/chapters.html#'+(readingSections[key] || 'chapter-'+lesson.chapter);
  if(context) {
    $('readingStart').href='/chapters.html#'+context[1];
    $('readingLink').href='/step.html?process='+from;
    $('readingLink').textContent='← 返回'+context[3]+'讲解';
  }
  document.querySelectorAll('.lesson-nav a').forEach(a=>{if(new URL(a.href).searchParams.get('lesson')===key)a.setAttribute('aria-current','page');});
  for(const [color,label] of lesson.legend) {const span=document.createElement('span');span.style.setProperty('--color',color);span.textContent=label;$('legend').append(span);}
  lesson.steps.forEach(step=>{const li=document.createElement('li');li.textContent=step.title+'：'+step.equipment+' '+step.material+' 要点：'+step.takeaway;$('textSteps').append(li);});

  function foundation(box,palette) {
    box([0,-.22,0],[5.6,.35,4.3],palette.metal);
    box([0,1.3,-1.9],[5.2,3.1,.16],palette.white);
  }
  function materialsScene({kind,phase,p,box,cyl,palette:C}) {
    const equipment=kind==='equipment';
    if(equipment) foundation(box,C);else box([0,-.23,0],[4.9,.1,3.5],C.dark);
    if(phase<2) {
      const y=equipment?.18:-.05;
      cyl([0,y,0],[1.6,.2,1.6],C.dark);
      if(phase===0) {
        for(let i=0;i<9;i++) box([(i%3-1)*.55,y+.3+(i%2)*.12,(Math.floor(i/3)-1)*.55],[.45,.3,.45],C.silicon,i*.7);
        if(equipment) {box([-1.8,1.6,-.5],[.15,2.3,.2],C.metal);box([0,2.7,-.5],[3.6,.18,.35],C.metal);}
      } else {
        cyl([0,y+.13,0],[1.45,.1,1.45],C.heat);
        const h=.18+2.2*p;
        cyl([0,y+.18+h/2,0],[.74,h,.74],C.silicon,p*5);
        cyl([0,y+.22+h+.28,0],[.075,.56,.075],C.metal);
        if(equipment) {box([-1.85,1.6,-.5],[.16,3,.24],C.metal);box([-.85,3.12,-.5],[2.2,.15,.3],C.metal);}
      }
      return;
    }
    if(phase===2) {
      for(let i=0;i<9;i++) cyl([0,.02+i*(.17+.06*p),0],[.96,.16,.96],C.silicon);
      if(equipment) {box([-1.8,1.3,0],[.16,2.7,2.4],C.metal);box([1.8,1.3,0],[.16,2.7,2.4],C.metal);for(let i=1;i<9;i++)box([0,.02+i*.17,-1.4+2.8*p],[3.55,.014,.022],C.dark);}
      return;
    }
    cyl([0,.28,0],[1.45,.24,1.45],C.silicon);
    cyl([0,.405,0],[1.45,.018,1.45],C.film);
    if(phase===3) {
      if(equipment) {cyl([0,.06,0],[1.8,.18,1.8],C.dark,p*4);cyl([0,.66,0],[1.25,.32,1.25],C.metal);box([0,1.52,0],[.23,1.5,.25],C.metal);}
      else for(let i=0;i<24;i++) {const angle=i*2.4,r=.3+(i%4)*.28;cyl([Math.cos(angle)*r,.42+.065*(1-p),Math.sin(angle)*r],[.065,.13*(1-p),.065],C.film);}
    } else {
      if(equipment) {box([.8,1.8,-.3],[1.9,.15,.24],C.metal);cyl([0,1.57,0],[.08,.4,.08],C.dark);if(p<.65)cyl([0,.97,0],[.02,.9,.02],C.fluid);box([-1.15+2.3*p,1.37,.5],[.5,.25,.36],C.dark);}
      for(let i=0;i<8;i++) {const a=i*2.4,r=.4+(i%3)*.3;box([Math.cos(a)*r,.44,Math.sin(a)*r],[.065*(1-p),.04*(1-p),.065*(1-p)],C.dark);}
    }
  }
  function patternScene({kind,phase,p,box,cyl,draw,palette:C}) {
    const equipment=kind==='equipment';
    if(equipment) {
      foundation(box,C);cyl([0,.26,0],[1.6,.27,1.6],C.dark);
      if(phase===1) {cyl([0,2.06,0],[.58,1.15,.58],C.metal);box([0,2.74,0],[2.2,.12,1.6],C.dark);}
      else if(phase===4) box([-1.4+2.8*p,1.55,0],[.6,.35,.55],C.dark);
      else {cyl([0,1.94,0],[1.7,.15,1.7],C.metal);box([0,2.52,0],[.28,1,.28],C.dark);}
      if((phase===0 || phase===2) && p>.02 && p<.98) for(let i=0;i<3;i++)cyl([(i-1)*.55,1.26,0],[.025,.8,.025],C.fluid);
    } else box([0,-.1,0],[5,.06,3.7],C.dark);
    const sy=equipment?.5:.14,baseTop=equipment?.62:.35;
    if(equipment)cyl([0,sy,0],[1.45,.24,1.45],C.silicon);else box([0,sy,0],[4.4,.42,3.2],C.silicon);
    for(let i=0;i<7;i++) {
      const open=i%2===1,film=phase===0?.16*p:phase===2 && open?.16*(1-p):phase>2 && open?0:.16;
      const resist=phase===1 ? p<.45?.18*p/.45:open?.18*(1-(p-.45)/.55):.18 : phase===2 && !open?.18:phase===3 && !open?.18*(1-p):0;
      const layer=(height,y,color)=>equipment?draw('band'+i,[0,y+height/2,0],[1.45,height,1.45],color):box([-2.2+(i+.5)*4.4/7,y+height/2,0],[4.4/7,height,3.2],color);
      layer(film,baseTop,C.film);layer(resist,baseTop+film,C.resist);
    }
  }
  function cleaningScene({kind,phase,p,box,cyl,palette:C}) {
    const equipment=kind==='equipment',angle=phase>0 && phase<4?p*5:0;
    const c=Math.cos(angle),q=Math.sin(angle);
    const layer=(position,size,color)=>equipment?box([.58*(c*position[0]+q*position[2]),position[1]+.42,.58*(-q*position[0]+c*position[2])],[size[0]*.58,size[1],size[2]*.58],color,angle):box(position,size,color);
    if(equipment) {
      foundation(box,C);cyl([0,.22,0],[1.65,.18,1.65],C.dark);
      cyl([0,.42,0],[1.45,.36,1.45],C.silicon);
      box([.4,1.9,-.5],[2.4,.14,.22],C.metal);cyl([-.5+.6*p,1.64,-.5],[.075,.4,.075],C.dark);
      if(phase===1 || phase===2 || phase===3 && p<.45)cyl([-.5+.6*p,1.08,-.5],[.025,.7,.025],C.fluid);
      for(let i=0;i<3;i++)box([Math.cos(angle+i*2.1)*1.54,.34,Math.sin(angle+i*2.1)*1.54],[.12,.04,.12],C.white,angle);
      if(phase===4)box([-1.2+2.4*p,1.2,.5],[.45,.25,.4],C.dark);
    } else {box([0,-.28,0],[5,.06,3.7],C.dark);box([0,0,0],[4.4,.36,3.2],C.silicon);}
    for(const x of [-1.35,0,1.35])layer([x,.25,0],[.45,.14,3],C.film);
    for(let i=0;i<6;i++)if(phase<2 || phase===2 && i>=p*6)layer([(i%3-1)*1.35+(phase===2?p*.45:0),.38,-.85+Math.floor(i/3)*1.7],[.16,.12,.16],C.resist);
    const wet=phase===1 || phase===2?1:phase===3?1-p:0;
    if(wet>0)for(let i=0;i<8;i++)layer([-1.9+(i%4)*1.25,.39,Math.floor(i/4)*1.5-.7],[.12*wet,.035*wet,.17*wet],C.fluid);
    if(!equipment && phase===4)box([-1.9+3.8*p,.43,0],[.025,.025,3.1],C.fluid);
  }
  function metrologyScene({kind,phase,p,box,cyl,palette:C}) {
    const equipment=kind==='equipment',x=phase===2?-1.3+2.6*p:0;
    if(equipment) {
      foundation(box,C);cyl([0,.22,0],[1.65,.2,1.65],C.dark);cyl([0,.5,0],[1.45,.36,1.45],C.silicon);cyl([0,.76,0],[1.45,.16,1.45],C.film);
      box([0,2.2,-1],[3.5,.15,.25],C.metal);box([x*.6,1.64,0],[.7,.6,.65],C.dark);
      if(phase>0) {cyl([x*.6-.12,1.1,0],[.025,.45,.025],C.fluid);cyl([x*.6+.12,1.1,0],[.025,.45,.025],C.resist);}
      if(phase>=3)for(let i=0;i<3;i++)box([1.85+i*.12,1.8,-1.69],[.045,.15,.015],C.resist);
    } else {
      box([0,-.28,0],[5,.06,3.7],C.dark);box([0,0,0],[4.4,.36,3.2],C.silicon);box([0,.26,0],[4.4,.16,3.2],C.film);
      if(phase>0) {cyl([x-.12,.85,.55],[.025,.95,.025],C.fluid);cyl([x+.12,.85,.55],[.025,.95,.025],C.resist);}
      const points=phase<2?0:phase===2?3*p:3;
      for(let i=0;i<points;i++)cyl([-1.3+i*1.3,.36,.55],[.09,.02,.09],C.fluid);
      if(phase>=3) {
        // Annotation bracket spans the film interfaces; it is not a physical probe.
        box([2.35,.26,1.35],[.035,.16,.035],C.resist);
        for(const y of [.18,.34])box([2.22,y,1.35],[.3,.025,.035],C.resist);
      }
    }
  }
  function inspectionScene({kind,phase,p,box,cyl,palette:C}) {
    const equipment=kind==='equipment',red=[.88,.24,.21],scan=phase===1 || phase===2?-1.7+3.4*p:phase===3?-.9+1.8*p:0;
    const layer=(position,size,color)=>equipment?box([position[0]*.6,position[1]+.42,position[2]*.6],[size[0]*.6,size[1],size[2]*.6],color):box(position,size,color);
    if(equipment) {
      foundation(box,C);cyl([0,.22,0],[1.65,.2,1.65],C.dark);cyl([0,.42,0],[1.45,.36,1.45],C.silicon);
      box([0,2.1,-1],[3.5,.15,.24],C.metal);box([scan*.6,1.6,0],[.7,.5,.65],C.dark);
      if(phase>0)cyl([scan*.6,1.05,.2],[.035,.55,.035],C.fluid);
    } else {box([0,-.28,0],[5,.06,3.7],C.dark);box([0,0,0],[4.4,.36,3.2],C.silicon);}
    for(const x of [-1.35,0,1.35])layer([x,.25,0],[.45,.14,3],C.film);
    layer([.675,.25,-.6],[.9,.14,.2],C.film); // Pre-existing unwanted bridge stays throughout inspection.
    layer([-1.35,.4,.65],[.18,.16,.18],C.resist);
    if(phase>0)layer([scan,.5,0],[.025,.025,3.1],C.fluid);
    const marked=phase<2?0:phase===2?p===0?0:p<.6?1:2:2;
    for(let i=0;i<marked;i++) {
      const [x,z,w,d,y]=i===0?[-1.35,.65,.55,.55,.51]:[.675,-.6,1.35,.55,.37];
      for(const side of [-1,1]) {layer([x+side*w/2,y,z],[.035,.035,d],red);layer([x,y,z+side*d/2],[w,.035,.035],red);}
    }
  }
  // The opened front section makes internal teaching markers visible, not a real wafer defect.
  function siliconSection({equipment,box,cyl,C,mask,implanted,active=0,damage=0}) {
    if(equipment)cyl([0,.26,0],[1.45,.26,1.45],C.silicon);
    else {box([0,-.06,0],[4.4,.22,3.2],C.silicon);box([0,.2,-.55],[4.4,.3,2.1],C.silicon);}
    for(const x of [-1.65,0,1.65])box([x*(equipment?.58:1),equipment?.44:.35+.075*mask,0],[equipment?.38:.65,.15*mask,equipment?1.6:3.2],C.resist);
    if(equipment)return;
    for(let i=0;i<12;i++) {
      const x=i%2===0?-.82:.82,z=.35+(Math.floor(i/2)%3)*.45,y=i<6?.13:.25;
      if(i<implanted)cyl([x,y,z],[.075,.065,.075],i<active?[.26,.72,.5]:[.94,.45,.25]);
      if(i<damage) {box([x+.14,y-.045,z],[.18,.025,.028],C.dark,.65);box([x+.14,y-.045,z],[.18,.025,.028],C.dark,-.65);}
    }
  }
  function implantScene({kind,phase,p,box,cyl,palette:C}) {
    const equipment=kind==='equipment',mask=phase<3?1:phase===3?1-p:0,implanted=phase<2?0:phase===2?12*p:12;
    if(equipment) {
      foundation(box,C);
      box([-1.95,1.9,-.6],[.55,.65,.65],C.dark);box([-.55,1.9,-.6],[2.4,.14,.18],C.metal);
      cyl([.65,1.45,-.6],[.16,.9,.16],C.metal);box([.65,.96,-.6],[.4,.2,.4],C.dark);
      if(phase===1 || phase===2) {box([-.65,1.9,-.6],[2,.035,.035],C.fluid);const x=phase===2?-.85+1.7*p:.65;box([x,.72,0],[.035,.58,.035],C.fluid);for(let i=0;i<4;i++)cyl([x,1.04-((p+i*.25)%1)*.6,0],[.04,.045,.04],C.fluid);}
      if(phase>=3)box([-1.15+2.3*p,1.1,.3],[.5,.25,.4],C.dark);
    } else box([0,-.23,0],[5,.06,3.7],C.dark);
    siliconSection({equipment,box,cyl,C,mask,implanted});
    if(!equipment && phase===2)for(const x of [-.82,.82])for(let i=0;i<3;i++)cyl([x,.45+((p+i/3)%1)*.55,.8],[.045,.075,.045],C.fluid);
  }
  function annealScene({kind,phase,p,box,cyl,palette:C}) {
    const equipment=kind==='equipment',active=phase<2?0:phase===2?12*p:12,damage=phase<2?12:phase===2?12*(1-p):0;
    const heat=phase===1?p:phase===2?1:phase===3?1-p:0;
    if(equipment) {
      foundation(box,C);cyl([0,.1,0],[1.6,.1,1.6],C.dark);
      box([0,1.95,0],[3.5,.15,2.5],C.metal);
      for(let i=0;i<5;i++)box([(i-2)*.57,1.77,0],[.24,.13,2.1],heat>0?[.42+.44*heat,.32+.16*heat,.18]:C.white);
      if(phase===2)box([0,1.47+.04*Math.sin(p*12),0],[2.7,.035,1.8],C.heat);
      if(phase===4)box([-1.2+2.4*p,1.1,.6],[.5,.25,.4],C.dark);
    } else box([0,-.23,0],[5,.06,3.7],C.dark);
    siliconSection({equipment,box,cyl,C,mask:0,implanted:12,active,damage});
    if(!equipment && heat>0) {
      for(const x of [-2.32,2.32])box([x,.05,0],[.06*heat,.035,3.4],C.heat);
      for(const z of [-1.72,1.72])box([0,.05,z],[4.7,.035,.06*heat],C.heat);
    }
  }
  function cmpScene({kind,phase,p,box,cyl,palette:C}) {
    const equipment=kind==='equipment',copper=[.72,.47,.27],over=phase<2?.3:phase===2?.3*(1-p):0;
    const lift=phase===0?.55:phase===1?.55*(1-p):phase===3?.4*p:phase===4?.4:0;
    const layer=(position,size,color)=>equipment?box([position[0]*.5,.16+(.44+over-position[1])*.65+lift,position[2]*.5],[size[0]*.5,size[1]*.65,size[2]*.5],color):box(position,size,color);
    if(equipment) {
      foundation(box,C);cyl([0,.05,0],[1.9,.22,1.9],C.dark,p*5);
      for(let i=0;i<4;i++)box([Math.cos(p*5+i*Math.PI/2)*1.65,.17,Math.sin(p*5+i*Math.PI/2)*1.65],[.32,.025,.13],C.white,p*5);
      const head=.16+(.44+over+.24)*.65+lift+.17;
      cyl([0,head,0],[1.45,.32,1.45],C.metal);box([0,head+.55,0],[.2,.8,.2],C.metal);
      box([1.2,1.9,-.5],[1.4,.12,.2],C.metal);cyl([.6,1.65,-.5],[.07,.4,.07],C.dark);
      if(phase===1 || phase===2 || phase===3)cyl([.6,.92,-.5],[.018,1.05,.018],C.fluid);
      if(phase===4)box([-1.2+2.4*p,1.5,.6],[.5,.25,.4],C.dark);
    } else box([0,-.3,0],[5,.06,3.7],C.dark);
    layer([0,-.13,0],[4.4,.22,3.2],C.silicon);
    const edges=[-2.2,-1.66,-1.14,-.26,.26,1.14,1.66,2.2];
    for(let i=0;i<7;i++)layer([(edges[i]+edges[i+1])/2,.21,0],[edges[i+1]-edges[i],.46,3.2],i%2===0?C.film:copper);
    layer([0,.44+over/2,0],[4.4,over,3.2],copper);
    if(!equipment && phase===3)for(let i=0;i<7;i++)box([-1.8+i*.6,.48,.7],[.07*(1-p),.04*(1-p),.07*(1-p)],C.dark);
    if(!equipment && phase===4)box([-1.9+3.8*p,.49,0],[.025,.025,3.2],C.fluid);
  }
  function interconnectScene({kind,phase,p,box,cyl,palette:C}) {
    const equipment=kind==='equipment',copper=[.72,.47,.27],cut=!equipment && phase>=2;
    const layer=(position,size,color)=>equipment?box([position[0]*.6,position[1]*.75+.35,position[2]*.6],[size[0]*.6,size[1]*.75,size[2]*.6],color):box(position,size,color);
    if(equipment) {
      foundation(box,C);cyl([0,.12,0],[1.55,.22,1.55],C.dark);
      if(phase===4) {cyl([0,.1,0],[1.7,.55,1.7],C.film);box([1.5,1.5,-.5],[.18,2,.2],C.metal);}
      else if(phase===6)box([-1.2+2.4*p,1.65,0],[.5,.25,.45],C.dark);
      else {box([0,2.1,-.9],[3.2,.18,.5],C.metal);box([0,2.65,-.9],[.25,.9,.25],C.dark);}
      if(phase>0 && phase<6)for(let i=0;i<3;i++)cyl([(i-1)*.55,1.55+.06*Math.sin(p*8),-.5],[.025,.45,.025],phase===5?C.white:C.fluid);
      if(phase===2)box([-.7+1.4*p,1.55,.6],[.045,.5,.045],C.fluid);
    } else box([0,-.35,0],[4.8,.07,3.6],C.dark);
    layer([0,-.25,0],[3.6,.15,2.8],C.silicon);
    layer([0,0,.4],[3.6,.35,.5],copper);
    layer([0,0,-.625],[3.6,.35,1.55],C.film);
    if(!cut)layer([0,0,1.025],[3.6,.35,.75],C.film);
    if(phase===0)return;
    const height=phase===1?p:1;
    if(phase===1) {layer([0,.175+height/2,0],[3.6,height,2.8],C.film);return;}
    const trenchDepth=phase===2?.32*Math.min(1,2*p):.32,viaDepth=phase===2?.68*Math.max(0,2*p-1):.68;
    // Rectangular cells leave real voids in the trench / via instead of drawing holes over solid material.
    const xs=[-1.8,.39,.91,1.8],zs=[-1.4,.18,.62,1.4];
    for(let x=0;x<3;x++)for(let z=0;z<3;z++) {
      if(cut && z>0)continue;
      const pos=[(xs[x]+xs[x+1])/2,0,(zs[z]+zs[z+1])/2],size=[xs[x+1]-xs[x],0,zs[z+1]-zs[z]];
      const bottom=.68-(x===1 && z===1?viaDepth:0),top=.32-(x===1?trenchDepth:0);
      layer([pos[0],.175+bottom/2,pos[2]],[size[0],bottom,size[2]],C.film);
      layer([pos[0],.855+top/2,pos[2]],[size[0],top,size[2]],C.film);
    }
    if(phase<3)return;
    const lining=phase===3?p:1;
    for(const side of [-1,1]) {
      layer([.65+side*.2475,1.015,0],[.025*lining,.32,2.8],C.dark);
      layer([.65+side*.22,1.015,0],[.018*lining,.32,2.8],C.resist);
      layer([.65+side*.2075,.515,.4],[.025*lining,.68,.44],C.dark);
      layer([.65+side*.18,.515,.4],[.018*lining,.68,.4],C.resist);
      if(equipment || phase<4 || side===-1) {
        layer([.65,.515,.4+side*.2075],[.44,.68,.025*lining],C.dark);
        layer([.65,.515,.4+side*.18],[.4,.68,.018*lining],C.resist);
      }
    }
    for(const [z,d] of [[-.61,1.58],[1.01,.78]]) {
      layer([.65,.865,z],[.52,.02*lining,d],C.dark);
      layer([.65,.881,z],[.46,.012*lining,d],C.resist);
    }
    if(phase<4)return;
    const fill=phase===4?p:1;
    layer([.65,.175+.68*fill/2,.4],[.34,.68*fill,.34],copper);
    layer([.65,.855+.32*fill/2,0],[.4,.32*fill,2.8],copper);
    const over=phase===4?.24*p:phase===5?.24*(1-p):0;
    layer([0,1.175+over/2,0],[3.6,over,2.8],copper);
  }
  function packageScene({kind,phase,p,box,cyl,palette:C}) {
    const equipment=kind==='equipment',gold=C.resist,substrate=[.23,.46,.33];
    if(equipment)foundation(box,C);else box([0,-.18,0],[4.8,.1,3.6],C.dark);
    if(phase<2) {
      const spacing=.72+(phase===1?.25*p:0);
      if(phase===0)cyl([0,.08,0],[1.55,.2,1.55],C.silicon);
      for(let x=-1;x<=1;x++)for(let z=-1;z<=1;z++) {box([x*spacing,.24,z*spacing],[.65,.16,.65],C.silicon);box([x*spacing,.33,z*spacing],[.59,.025,.59],C.film);for(let i=0;i<3;i++)box([x*spacing-.18+i*.18,.35,z*spacing],[.07,.018,.28],gold);}
      if(equipment && phase===0) {const y=1.1-.6*p;box([0,y+.38,0],[1.1,.18,.9],C.dark);for(let i=0;i<3;i++)cyl([-.18+i*.18,y,0],[.018,.6,.018],gold);box([-1.8,1.4,-.6],[.2,2.1,.3],C.metal);box([-.9,1.88,-.6],[1.9,.16,.3],C.metal);}
      if(equipment && phase===1) {box([-.9+1.8*p,.6,0],[.08,.5,3.1],C.metal);box([0,1.25,-1.3],[3,.18,.25],C.dark);}
      return;
    }
    const w=equipment?1.25:2.05,d=equipment?1.1:1.8;
    const dy=phase===2?1.65-.85*p:phase===3?.8-.26*p:.54;
    box([0,.12,0],[w+1.2,.26,d+1],substrate);
    for(let x=-1;x<=1;x++)for(let z=-1;z<=1;z++) {
      const px=x*w*.3,pz=z*d*.3;
      cyl([px,.266,pz],[.09,.025,.09],gold);
      cyl([px,dy-.21,pz],[.07,.12,.07],gold);
      if(phase>=3)cyl([px,-.07,pz],[.085,.12,.085],gold);
    }
    const cut=equipment?1:.65,zOffset=equipment?0:-d*.175;
    box([0,dy,zOffset],[w,.3,d*cut],C.silicon);
    box([0,dy-.16,zOffset],[w,.02,d*cut],C.film);
    if(phase===2 && equipment) {box([0,dy+.45,0],[.5,.6,.4],C.dark);box([-.65,2.23,-.3],[1.8,.16,.3],C.metal);box([-1.55,1.3,-.3],[.2,2.7,.3],C.metal);}
    if(phase===3 && equipment) {box([0,1.95-.7*p,0],[1.5,.3,1.3],C.metal);box([0,2.52-.35*p,0],[.22,1,.22],C.dark);}
    if(phase>=4) {
      const h=phase===4?.75*p:.75;
      // Material view uses a labelled cutaway, keeping bumps visible from the front.
      box([0,.29+h/2,-d/2-.13],[w+.7,h,.15],C.dark);box([-w/2-.28,.29+h/2,0],[.15,h,d+.4],C.dark);
      box([0,.29+h, equipment?0:-d*.33],[w+.7,.12*(phase===4?p:1),equipment?d+.4:d*.3],C.dark);
    }
    if(phase===5 && equipment) {
      box([0,-.02,0],[w+1.5,.18,d+1.3],C.dark);
      for(let x=-1;x<=1;x++)for(let z=-1;z<=1;z++)cyl([x*w*.3,-.13+(1-p)*.2,z*d*.3],[.075,.23,.075],gold);
      box([1.9,1.3,-1.1],[.45,1.5,.35],C.dark);
    }
  }

  /* ---- 2D 机构剖面演示：与刻蚀样板同一视觉语言（原生 SVG，替代低模三维） ---- */
  const SVGNS="http://www.w3.org/2000/svg";
  function svgMake(host){
    host.replaceChildren();
    const mk=(parent,tag,attrs)=>{const e=document.createElementNS(SVGNS,tag);for(const k in attrs)e.setAttribute(k,attrs[k]);parent.append(e);return e;};
    const bind=parent=>({
      node:parent,
      g:()=>{const el=document.createElementNS(SVGNS,"g");parent.append(el);return bind(el);},
      rect:(x,y,w,h,fill,o={})=>mk(parent,"rect",Object.assign({x,y,width:w,height:h,fill,rx:o.rx===undefined?3:o.rx},o)),
      line:(x1,y1,x2,y2,stroke,o={})=>mk(parent,"line",Object.assign({x1,y1,x2,y2,stroke,"stroke-width":2,"stroke-linecap":"round"},o)),
      circle:(cx,cy,r,fill,o={})=>mk(parent,"circle",Object.assign({cx,cy,r,fill},o)),
      path:(d,o={})=>mk(parent,"path",Object.assign({d,fill:"none"},o)),
      text:(x,y,str,o={})=>{const e=mk(parent,"text",Object.assign({x,y,fill:"#cfe0ef","font-size":13},o));e.textContent=str;return e;},
      op:(el,v)=>{const t=el&&el.node?el.node:el;t.setAttribute("opacity",v);return el;}
    });
    return bind(host);
  }
  const SVC={silicon:"#8b9a9f",melt:"#dc7344",surface:"#68a6b8",fluid:"#66cbd6",metal:"#7c8ea0",dark:"#0c1523",panel:"#16273c",line:"#39516f",text:"#cfe0ef",muted:"#9fb6cb"};
  const svgScenes={
    /* 晶圆制备：生长炉 → 单晶生长 → 切片 → 抛光 → 清洗检查（工位切换） */
    materials({device,material}){
      const frames=[],mats=[];
      for(let i=0;i<5;i++){const g=device.g();g.rect(0,0,480,360,SVC.dark,{rx:0});frames.push(g);}
      for(let i=0;i<5;i++){const m=material.g();m.rect(0,0,480,360,SVC.dark,{rx:0});mats.push(m);}
      let g=frames[0];
      g.rect(120,58,244,236,SVC.panel,{rx:16});g.rect(120,58,244,10,SVC.line,{rx:5});g.rect(150,124,184,146,"#1d3149",{rx:8});
      for(let i=0;i<9;i++)g.rect(168+(i%3)*52,296-Math.floor(i/3)*26,40,20,i%2?SVC.silicon:"#7d8c93",{rx:3});
      g.text(24,40,"生长炉（剖开）",{fill:SVC.muted,"font-size":14});g.text(24,66,"高纯多晶硅原料",{fill:SVC.text});
      g=frames[1];
      g.rect(120,58,244,236,SVC.panel,{rx:16});g.rect(150,124,184,146,"#1d3149",{rx:8});
      const melt=g.circle(242,250,72,SVC.melt,{opacity:.5});
      const ingot=g.rect(222,250,40,0,SVC.silicon,{rx:6});
      const seed=g.rect(238,62,8,70,SVC.metal,{rx:4});
      g.line(242,240,242,130,SVC.metal,{opacity:.5,"stroke-dasharray":"4 5"});
      g.text(24,40,"直拉生长机构",{fill:SVC.muted,"font-size":14});g.text(24,66,"籽晶提拉与旋转",{fill:SVC.text});
      g=frames[2];
      g.rect(56,58,368,18,SVC.metal,{rx:6});
      const cutIngot=g.rect(198,80,56,222,SVC.silicon,{rx:6});
      const wires=[];for(let i=0;i<7;i++)wires.push(g.line(64,112+i*28,416,112+i*28,SVC.fluid,{opacity:0}));
      g.text(24,40,"切片机构",{fill:SVC.muted,"font-size":14});g.text(24,336,"切割线与片间距被放大，未模拟完整线锯结构",{fill:SVC.muted,"font-size":12});
      g=frames[3];
      g.rect(96,240,288,40,SVC.panel,{rx:10});g.path("M120 262H360",{stroke:SVC.metal,"stroke-width":4});
      const head=g.rect(186,124,108,50,SVC.metal,{rx:10});
      const heldWafer=g.rect(198,178,84,14,SVC.silicon,{rx:4});
      g.line(240,174,240,196,SVC.fluid,{opacity:.5});
      g.text(24,40,"抛光承载机构",{fill:SVC.muted,"font-size":14});g.text(24,336,"承载头使晶圆与抛光垫相对运动，抛光液提供化学与磨料作用",{fill:SVC.muted,"font-size":12});
      g=frames[4];
      g.rect(120,152,240,16,SVC.silicon,{rx:5});
      const nozzle=g.rect(232,88,16,34,SVC.metal,{rx:5});
      const jets=[];for(let i=0;i<5;i++)jets.push(g.line(240,124,170+i*36,152,SVC.fluid,{opacity:0}));
      const scan=g.rect(120,112,34,6,SVC.fluid,{opacity:0,rx:3});
      g.text(24,40,"供液与检查位置",{fill:SVC.muted,"font-size":14});g.text(24,336,"冲洗干燥后按项目检查；画面洁净不等于证明合格",{fill:SVC.muted,"font-size":12});
      let m=mats[0];
      for(let i=0;i<7;i++)m.rect(140+(i%4)*52,150+Math.floor(i/4)*56,44,44,i%2?SVC.silicon:"#7d8c93",{rx:6});
      m.text(24,40,"原料：多晶硅块",{fill:SVC.muted,"font-size":14});m.text(24,330,"还不是晶圆，也没有电路。",{fill:SVC.text});
      m=mats[1];
      m.rect(120,300,240,26,SVC.panel,{rx:8});
      const melt2=m.rect(140,268,200,30,SVC.melt,{rx:8,opacity:.55});
      const ingot2=m.rect(214,268,52,0,SVC.silicon,{rx:6});
      const seed2=m.rect(236,150,8,120,SVC.metal,{rx:4});
      m.text(24,40,"熔体 → 单晶棒",{fill:SVC.muted,"font-size":14});m.text(24,330,"连续、规则的晶体排列形成单晶。",{fill:SVC.text});
      m=mats[2];
      const slices=[];for(let i=0;i<5;i++)slices.push(m.rect(96+i*58,120,46,180,SVC.silicon,{rx:5}));
      m.text(24,40,"晶棒 → 薄片",{fill:SVC.muted,"font-size":14});m.text(24,330,"切片后仍需表面加工；此时仍无电路。",{fill:SVC.text});
      m=mats[3];
      m.rect(90,214,300,54,SVC.silicon,{rx:4});
      const bumps=[];for(let i=0;i<9;i++)bumps.push(m.rect(104+i*32,204,20,12,SVC.metal,{rx:3}));
      m.rect(90,206,300,6,SVC.surface,{rx:3,opacity:.7});
      m.text(24,40,"局部起伏 → 平整表面",{fill:SVC.muted,"font-size":14});m.text(24,330,"蓝色表示加工面，不是新增薄膜。",{fill:SVC.text});
      m=mats[4];
      m.rect(90,214,300,54,SVC.silicon,{rx:4});
      const residue=[];for(let i=0;i<10;i++)residue.push(m.circle(110+i*28,208,4,SVC.fluid,{opacity:.85}));
      const scanLine=m.rect(90,150,10,116,SVC.fluid,{opacity:.3});
      m.text(24,40,"残留被清除并检查",{fill:SVC.muted,"font-size":14});m.text(24,330,"洁净状态需相应检查，不代表自动合格。",{fill:SVC.text});
      return (step,p)=>{
        frames.forEach((f,i)=>f.op(f,i===step?1:0));
        mats.forEach((f,i)=>f.op(f,i===step?1:0));
        const h=step===1?Math.max(.08,p):1;
        ingot.setAttribute("y",(250-150*h).toFixed(1));ingot.setAttribute("height",(150*h).toFixed(1));
        seed.setAttribute("y",(62+(1-h)*56).toFixed(1));
        melt.setAttribute("opacity",(step===1?.5*(1-h*.45):0).toFixed(2));
        ingot2.setAttribute("y",(268-118*h).toFixed(1));ingot2.setAttribute("height",(118*h).toFixed(1));
        seed2.setAttribute("y",(150+(1-h)*60).toFixed(1));
        melt2.setAttribute("opacity",(step===1?.55*(1-h*.4):0).toFixed(2));
        wires.forEach((w,i)=>w.setAttribute("opacity",step===2?String(.2+.55*Math.abs(Math.sin(p*Math.PI*2+i*.5))):"0"));
        cutIngot.setAttribute("opacity",step===2?String(Math.max(0,1-p*1.8)):"0");
        const gap=step===2?p*12:0;
        slices.forEach((s,i)=>{s.setAttribute("x",(96+i*58+(i-2)*gap).toFixed(1));s.setAttribute("opacity",step===2?"1":"0");});
        const drop=step===3?(1-p)*26:0;
        head.setAttribute("y",(124+drop).toFixed(1));heldWafer.setAttribute("y",(178+drop).toFixed(1));
        bumps.forEach(b=>b.setAttribute("opacity",step===3?String(Math.max(0,1-p)):"0"));
        residue.forEach(r=>r.setAttribute("opacity",step===4?String(Math.max(0,1-p*1.15)):"0"));
        scanLine.setAttribute("x",(90+(step===4?p*286:0)).toFixed(1));scanLine.setAttribute("opacity",step===4?".3":"0");
        jets.forEach(j=>j.setAttribute("opacity",step===4?String(.15+.5*(1-p)):"0"));
      };
    },
    /* 清洗与干燥：供液 → 作用 → 带离 → 冲洗干燥 → 检查（有用图形全程保留） */
    cleaning({device,material}){
      const frames=[],mats=[];
      for(let i=0;i<5;i++){const g=device.g();g.rect(0,0,480,360,SVC.dark,{rx:0});frames.push(g);}
      for(let i=0;i<5;i++){const m=material.g();m.rect(0,0,480,360,SVC.dark,{rx:0});mats.push(m);}
      let g=frames[0];
      g.rect(150,252,180,26,SVC.panel,{rx:8});g.rect(150,232,180,18,SVC.silicon,{rx:5});
      g.text(24,40,"承载与定位机构",{fill:SVC.muted,"font-size":14});g.text(24,66,"按已有材料与残留类型安排本轮清洗",{fill:SVC.text});
      g=frames[1];
      g.rect(150,252,180,26,SVC.panel,{rx:8});g.rect(150,232,180,18,SVC.silicon,{rx:5});
      g.rect(232,78,16,34,SVC.metal,{rx:5});
      const cols1=[];for(let i=0;i<5;i++)cols1.push(g.line(240,114,182+i*29,226,SVC.fluid,{opacity:.5}));
      g.rect(146,222,188,14,SVC.fluid,{rx:6,opacity:.28});
      g.text(24,40,"供液及承载机构",{fill:SVC.muted,"font-size":14});g.text(24,66,"介质与条件取决于材料和污染",{fill:SVC.text});
      g=frames[2];
      g.rect(150,252,180,26,SVC.panel,{rx:8});g.rect(150,232,180,18,SVC.silicon,{rx:5});
      g.rect(146,222,188,14,SVC.fluid,{rx:6,opacity:.3});
      g.path("M150 292A132 40 0 0 0 330 292",{stroke:SVC.fluid,"stroke-width":3,"stroke-dasharray":"8 7",opacity:.8});
      g.text(24,40,"旋转与排液（概括）",{fill:SVC.muted,"font-size":14});g.text(24,66,"液体更新并排出，不模拟真实流场",{fill:SVC.text});
      g=frames[3];
      g.rect(150,252,180,26,SVC.panel,{rx:8});g.rect(150,232,180,18,SVC.silicon,{rx:5});
      const air=[];for(let i=0;i<4;i++)air.push(g.line(140,196+i*10,340,196+i*10,SVC.metal,{opacity:.35,"stroke-dasharray":"10 8"}));
      g.text(24,40,"冲洗与干燥（概括）",{fill:SVC.muted,"font-size":14});g.text(24,66,"减少介质与残留后按路线干燥",{fill:SVC.text});
      g=frames[4];
      g.rect(150,252,180,26,SVC.panel,{rx:8});g.rect(150,232,180,18,SVC.silicon,{rx:5});
      const scan1=g.rect(150,150,34,6,SVC.fluid,{opacity:.8,rx:3});
      g.text(24,40,"后续检查位置",{fill:SVC.muted,"font-size":14});g.text(24,66,"移动光标只表示检查位置",{fill:SVC.text});
      let m=mats[0];
      m.rect(90,250,300,52,SVC.silicon,{rx:4});m.rect(90,214,300,36,SVC.surface,{rx:4,opacity:.85});
      const res=[];for(let i=0;i<6;i++)res.push(m.rect(108+i*46,168,26,16,"#d98a4e",{rx:4}));
      m.text(24,40,"保留结构 + 待处理残留",{fill:SVC.muted,"font-size":14});m.text(24,330,"颜色只用于区分任务，不代表真实外观。",{fill:SVC.text});
      m=mats[1];
      m.rect(90,250,300,52,SVC.silicon,{rx:4});m.rect(90,214,300,36,SVC.surface,{rx:4,opacity:.85});
      for(let i=0;i<6;i++)m.rect(108+i*46,168,26,16,"#d98a4e",{rx:4});
      const liq=m.rect(90,150,300,100,SVC.fluid,{rx:4,opacity:.3});
      m.text(24,40,"处于清洗介质作用下",{fill:SVC.muted,"font-size":14});m.text(24,330,"残留尚未全部移走，有用薄膜保持。",{fill:SVC.text});
      m=mats[2];
      m.rect(90,250,300,52,SVC.silicon,{rx:4});m.rect(90,214,300,36,SVC.surface,{rx:4,opacity:.85});
      const gone=[];for(let i=0;i<6;i++)gone.push(m.rect(108+i*46,168,26,16,"#d98a4e",{rx:4}));
      m.rect(90,150,300,100,SVC.fluid,{rx:4,opacity:.22});
      m.text(24,40,"残留被带离",{fill:SVC.muted,"font-size":14});m.text(24,330,"去除的是选定残留，不是电路结构。",{fill:SVC.text});
      m=mats[3];
      m.rect(90,250,300,52,SVC.silicon,{rx:4});m.rect(90,214,300,36,SVC.surface,{rx:4,opacity:.85});
      const film=m.rect(90,150,300,100,SVC.fluid,{rx:4,opacity:.25});
      m.text(24,40,"表面液体减少（干燥）",{fill:SVC.muted,"font-size":14});m.text(24,330,"这不是新一轮图形加工。",{fill:SVC.text});
      m=mats[4];
      m.rect(90,250,300,52,SVC.silicon,{rx:4});m.rect(90,214,300,36,SVC.surface,{rx:4,opacity:.85});
      const scan2=m.rect(90,150,12,100,SVC.fluid,{rx:4,opacity:.3});
      m.text(24,40,"检查后进入后续加工",{fill:SVC.muted,"font-size":14});m.text(24,330,"实际洁净度仍需检测与工艺控制。",{fill:SVC.text});
      return (step,p)=>{
        frames.forEach((f,i)=>f.op(f,i===step?1:0));mats.forEach((f,i)=>f.op(f,i===step?1:0));
        cols1.forEach(c=>c.setAttribute("opacity",step===1?String(.25+.45*(1-p)):"0"));
        air.forEach((a,i)=>a.setAttribute("opacity",step===3?String(.15+.35*(1-p)):"0"));
        scan1.setAttribute("x",(150+(step===4?p*146:0)).toFixed(1));scan1.setAttribute("opacity",step===4?".8":"0");
        gone.forEach((r,i)=>r.setAttribute("opacity",step===2?String(Math.max(0,1-p*1.2)):"0"));
        liq.setAttribute("opacity",(step===1?.3:step===2?.22:step===3?.25:0).toFixed(2));
        film.setAttribute("opacity",step===3?String(Math.max(0,.25*(1-p))):"0");
        scan2.setAttribute("x",(90+(step===4?p*286:0)).toFixed(1));scan2.setAttribute("opacity",step===4?".3":"0");
      };
    },
    /* 薄膜图形化：成膜 → 胶图形 → 刻蚀 → 去胶 → 检查（每步只改变对应材料） */
    patterning({device,material}){
      const frames=[],mats=[];
      for(let i=0;i<5;i++){const g=device.g();g.rect(0,0,480,360,SVC.dark,{rx:0});frames.push(g);}
      for(let i=0;i<5;i++){const m=material.g();m.rect(0,0,480,360,SVC.dark,{rx:0});mats.push(m);}
      let g=frames[0];
      g.rect(120,60,240,220,SVC.panel,{rx:16});g.rect(120,60,240,10,SVC.line,{rx:5});
      const down=[];for(let i=0;i<5;i++)down.push(g.line(150+i*45,96,150+i*45,140,SVC.surface,{opacity:.5}));
      g.rect(150,220,180,20,SVC.silicon,{rx:5});
      g.text(24,40,"成膜腔体",{fill:SVC.muted,"font-size":14});g.text(24,66,"下行标记只表示材料供应",{fill:SVC.text});
      g=frames[1];
      g.rect(120,60,240,220,SVC.panel,{rx:16});g.rect(150,220,180,20,SVC.silicon,{rx:5});
      g.rect(158,110,164,18,SVC.metal,{rx:4});
      const rays=[];for(let i=0;i<5;i++)rays.push(g.line(168+i*36,132,168+i*36,178,SVC.fluid,{opacity:.5}));
      g.text(24,40,"光刻处理（合并概括）",{fill:SVC.muted,"font-size":14});g.text(24,66,"涂胶、曝光与显影合并；详细见光刻七步",{fill:SVC.text});
      g=frames[2];
      g.rect(120,60,240,220,SVC.panel,{rx:16});g.rect(150,220,180,20,SVC.silicon,{rx:5});
      const ions=[];for(let i=0;i<7;i++)ions.push(g.line(158+i*24,110,158+i*24,196,SVC.fluid,{opacity:.55}));
      g.text(24,40,"刻蚀腔体",{fill:SVC.muted,"font-size":14});g.text(24,66,"反应通过胶层开口加工目标薄膜",{fill:SVC.text});
      g=frames[3];
      g.rect(120,60,240,220,SVC.panel,{rx:16});g.rect(150,220,180,20,SVC.silicon,{rx:5});
      g.rect(232,88,16,30,SVC.metal,{rx:5});
      const wash=[];for(let i=0;i<4;i++)wash.push(g.line(240,120,170+i*46,180,SVC.fluid,{opacity:.4}));
      g.text(24,40,"去胶处理",{fill:SVC.muted,"font-size":14});g.text(24,66,"移除不再需要的临时胶",{fill:SVC.text});
      g=frames[4];
      g.rect(120,60,240,220,SVC.panel,{rx:16});g.rect(150,220,180,20,SVC.silicon,{rx:5});
      const scanP=g.rect(150,160,32,6,SVC.fluid,{opacity:.8,rx:3});
      g.text(24,40,"量测与检查位置",{fill:SVC.muted,"font-size":14});g.text(24,66,"扫描线只表示检查位置",{fill:SVC.text});
      let m=mats[0];
      m.rect(90,250,300,52,SVC.silicon,{rx:4});
      const filmGrow=m.rect(90,250,300,0,SVC.surface,{rx:3,opacity:.85});
      m.text(24,40,"成膜：增加目标薄膜",{fill:SVC.muted,"font-size":14});m.text(24,330,"此时没有本轮图形开口。",{fill:SVC.text});
      m=mats[1];
      m.rect(90,250,300,52,SVC.silicon,{rx:4});m.rect(90,214,300,36,SVC.surface,{rx:3,opacity:.85});
      const resist=[];for(let i=0;i<6;i++)resist.push(m.rect(94+i*50,196,46,18,"#d59843",{rx:3}));
      const opened=[];for(let i=0;i<6;i++)opened.push(m.rect(94+i*50,196,20,18,SVC.dark,{rx:0,opacity:0}));
      m.text(24,40,"胶图形：选择性移除部分胶",{fill:SVC.muted,"font-size":14});m.text(24,330,"薄膜仍连续，未被刻穿。",{fill:SVC.text});
      m=mats[2];
      m.rect(90,250,300,52,SVC.silicon,{rx:4});m.rect(90,214,300,36,SVC.surface,{rx:3,opacity:.85});
      for(let i=0;i<6;i++)m.rect(94+i*50,196,46,18,"#d59843",{rx:3});
      const cuts=[];for(let i=0;i<6;i++)cuts.push(m.rect(94+i*50+13,214,20,0,SVC.dark,{rx:0}));
      m.text(24,40,"刻蚀：图形转移进目标膜",{fill:SVC.muted,"font-size":14});m.text(24,330,"基底保持连续。",{fill:SVC.text});
      m=mats[3];
      m.rect(90,250,300,52,SVC.silicon,{rx:4});m.rect(90,214,300,36,SVC.surface,{rx:3,opacity:.85});
      for(let i=0;i<6;i++)m.rect(94+i*50+13,214,20,36,SVC.dark,{rx:0});
      const peel=[];for(let i=0;i<6;i++)peel.push(m.rect(94+i*50,196,46,18,"#d59843",{rx:3}));
      m.text(24,40,"去胶：移除临时材料",{fill:SVC.muted,"font-size":14});m.text(24,330,"图形化目标膜保留。",{fill:SVC.text});
      m=mats[4];
      m.rect(90,250,300,52,SVC.silicon,{rx:4});m.rect(90,214,300,36,SVC.surface,{rx:3,opacity:.85});
      for(let i=0;i<6;i++)m.rect(94+i*50+13,214,20,36,SVC.dark,{rx:0});
      const scanM=m.rect(90,150,12,110,SVC.fluid,{rx:4,opacity:.3});
      m.text(24,40,"检查与衔接",{fill:SVC.muted,"font-size":14});m.text(24,330,"一个循环不等于完成一颗芯片。",{fill:SVC.text});
      return (step,p)=>{
        frames.forEach((f,i)=>f.op(f,i===step?1:0));mats.forEach((f,i)=>f.op(f,i===step?1:0));
        down.forEach((d,i)=>d.setAttribute("opacity",step===0?String(.2+.5*p):"0"));
        rays.forEach((r,i)=>r.setAttribute("opacity",step===1?String(.2+.45*Math.abs(Math.sin(p*Math.PI*2+i*.5))):"0"));
        ions.forEach((r,i)=>r.setAttribute("opacity",step===2?String(.2+.5*Math.abs(Math.sin(p*Math.PI*3+i*.6))):"0"));
        wash.forEach((w,i)=>w.setAttribute("opacity",step===3?String(.15+.4*(1-p)):"0"));
        scanP.setAttribute("x",(150+(step===4?p*146:0)).toFixed(1));scanP.setAttribute("opacity",step===4?".8":"0");
        const fh=step===0?36*p:36;
        filmGrow.setAttribute("y",(250-fh).toFixed(1));filmGrow.setAttribute("height",fh.toFixed(1));
        resist.forEach((r,i)=>{r.setAttribute("opacity",step===1?String(Math.max(0,1-Math.max(0,p-.45)/.55)):step<3?"1":"0");});
        opened.forEach((o,i)=>o.setAttribute("opacity",step===1?String(Math.max(0,(p-.45)/.55)):"0"));
        cuts.forEach((c,i)=>{const d=step===2?36*p:step>2?36:0;c.setAttribute("y",(214).toFixed(1));c.setAttribute("height",d.toFixed(1));c.setAttribute("opacity",step>=2?"1":"0");});
        peel.forEach(pe=>pe.setAttribute("opacity",step===3?String(Math.max(0,1-p*1.1)):step===4?"0":"0"));
        scanM.setAttribute("x",(90+(step===4?p*286:0)).toFixed(1));scanM.setAttribute("opacity",step===4?".3":"0");
      };
    },
    /* 掺杂与注入：识别开口 → 形成离子束 → 进入硅内部 → 移除掩膜 → 衔接退火 */
    implant({device,material}){
      const frames=[],mats=[];
      for(let i=0;i<5;i++){const g=device.g();g.rect(0,0,480,360,SVC.dark,{rx:0});frames.push(g);}
      for(let i=0;i<5;i++){const m=material.g();m.rect(0,0,480,360,SVC.dark,{rx:0});mats.push(m);}
      let g=frames[0];
      g.rect(150,250,180,22,SVC.silicon,{rx:5});
      for(let i=0;i<3;i++)g.rect(158+i*58,226,40,20,"#c99054",{rx:3});
      g.line(240,150,240,196,SVC.fluid,{opacity:.5,"stroke-dasharray":"6 6"});
      g.text(24,40,"掩膜与晶圆定位",{fill:SVC.muted,"font-size":14});g.text(24,66,"本步骤不重新演示光刻",{fill:SVC.text});
      g=frames[1];
      g.rect(56,150,60,46,SVC.panel,{rx:8});g.text(66,178,"离子源",{fill:SVC.text,"font-size":12});
      g.path("M116 173H190L214 196",{stroke:SVC.fluid,"stroke-width":3});
      const beam=[];for(let i=0;i<6;i++)beam.push(g.circle(196+i*14,206+i*5,3,SVC.fluid,{opacity:.7}));
      g.rect(150,250,180,22,SVC.silicon,{rx:5});
      g.text(24,40,"离子源与束线（概括）",{fill:SVC.muted,"font-size":14});g.text(24,66,"选取、加速与输送合并示意",{fill:SVC.text});
      g=frames[2];
      g.rect(150,250,180,22,SVC.silicon,{rx:5});
      g.rect(140,120,200,26,SVC.panel,{rx:6});
      const sweep=g.rect(150,124,40,18,SVC.fluid,{opacity:.55,rx:4});
      g.text(24,40,"束线与扫描机构",{fill:SVC.muted,"font-size":14});g.text(24,66,"束流与晶圆相对扫描",{fill:SVC.text});
      g=frames[3];
      g.rect(150,250,180,22,SVC.silicon,{rx:5});
      g.rect(232,88,16,30,SVC.metal,{rx:5});
      const strip=[];for(let i=0;i<3;i++)strip.push(g.rect(158+i*58,226,40,20,"#c99054",{rx:3}));
      g.text(24,40,"去除临时掩膜",{fill:SVC.muted,"font-size":14});g.text(24,66,"去掩膜不删除已注入元素",{fill:SVC.text});
      g=frames[4];
      g.rect(150,250,180,22,SVC.silicon,{rx:5});
      const chk=g.rect(150,160,32,6,SVC.fluid,{opacity:.8,rx:3});
      g.text(24,40,"过程检查与后续衔接",{fill:SVC.muted,"font-size":14});g.text(24,66,"注入与退火是关联但不同的步骤",{fill:SVC.text});
      let m=mats[0];
      m.rect(90,250,300,52,SVC.silicon,{rx:4});
      for(let i=0;i<3;i++)m.rect(96+i*100,226,80,24,"#c99054",{rx:3});
      m.text(24,40,"掩膜开口已就位",{fill:SVC.muted,"font-size":14});m.text(24,330,"覆盖区与开口区不同。",{fill:SVC.text});
      m=mats[1];
      m.rect(90,250,300,52,SVC.silicon,{rx:4});
      for(let i=0;i<3;i++)m.rect(96+i*100,226,80,24,"#c99054",{rx:3});
      const flying=[];for(let i=0;i<8;i++)flying.push(m.circle(116+i*34,196,4,SVC.fluid,{opacity:.7}));
      m.text(24,40,"离子束到达开口",{fill:SVC.muted,"font-size":14});m.text(24,330,"覆盖区在本例中被掩膜阻挡。",{fill:SVC.text});
      m=mats[2];
      m.rect(90,250,300,52,SVC.silicon,{rx:4});
      for(let i=0;i<3;i++)m.rect(96+i*100,226,80,24,"#c99054",{rx:3});
      const dop=[];for(let i=0;i<9;i++)dop.push(m.circle(116+Math.floor(i/3)*100+((i%3)*20),252+26+((i%3)*6),4,"#e08a4a",{opacity:.85}));
      m.text(24,40,"元素进入硅内部",{fill:SVC.muted,"font-size":14});m.text(24,330,"宏观外形保持，不是表面铺膜。",{fill:SVC.text});
      m=mats[3];
      m.rect(90,250,300,52,SVC.silicon,{rx:4});
      const maskGone=[];for(let i=0;i<3;i++)maskGone.push(m.rect(96+i*100,226,80,24,"#c99054",{rx:3}));
      for(let i=0;i<9;i++)m.circle(116+Math.floor(i/3)*100+((i%3)*20),278+((i%3)*6),4,"#e08a4a",{opacity:.85});
      m.text(24,40,"掩膜移除，掺杂保留",{fill:SVC.muted,"font-size":14});m.text(24,330,"去掩膜不应删除已注入元素。",{fill:SVC.text});
      m=mats[4];
      m.rect(90,250,300,52,SVC.silicon,{rx:4});
      for(let i=0;i<9;i++)m.circle(116+Math.floor(i/3)*100+((i%3)*20),278+((i%3)*6),4,"#e08a4a",{opacity:.85});
      const scanI=m.rect(90,150,12,110,SVC.fluid,{rx:4,opacity:.3});
      m.text(24,40,"检查后衔接热处理",{fill:SVC.muted,"font-size":14});m.text(24,330,"电学作用与损伤仍需后续处理。",{fill:SVC.text});
      return (step,p)=>{
        frames.forEach((f,i)=>f.op(f,i===step?1:0));mats.forEach((f,i)=>f.op(f,i===step?1:0));
        beam.forEach((b,i)=>b.setAttribute("opacity",step===1?String(Math.max(0,Math.sin((p*3+i*.2)%1*Math.PI))*.8):"0"));
        sweep.setAttribute("x",(150+(step===2?p*150:0)).toFixed(1));sweep.setAttribute("opacity",step===2?".55":"0");
        strip.forEach((s,i)=>s.setAttribute("opacity",step===3?String(Math.max(0,1-p*1.2)):"0"));
        chk.setAttribute("x",(150+(step===4?p*146:0)).toFixed(1));chk.setAttribute("opacity",step===4?".8":"0");
        flying.forEach((f,i)=>f.setAttribute("opacity",step===1?String(.2+.5*Math.abs(Math.sin(p*Math.PI*2+i*.4))):"0"));
        dop.forEach((d,i)=>d.setAttribute("opacity",step>=2?String(step===2?Math.min(1,p*1.4):1):"0"));
        maskGone.forEach((mg,i)=>mg.setAttribute("opacity",step===3?String(Math.max(0,1-p*1.2)):"0"));
        scanI.setAttribute("x",(90+(step===4?p*286:0)).toFixed(1));scanI.setAttribute("opacity",step===4?".3":"0");
      };
    },
    /* 热处理：处理前状态 → 受控加热 → 修复与激活 → 受控冷却 → 量测衔接（宏观形状不变） */
    anneal({device,material}){
      const frames=[],mats=[];
      for(let i=0;i<5;i++){const g=device.g();g.rect(0,0,480,360,SVC.dark,{rx:0});frames.push(g);}
      for(let i=0;i<5;i++){const m=material.g();m.rect(0,0,480,360,SVC.dark,{rx:0});mats.push(m);}
      let g=frames[0];
      g.rect(120,150,240,140,SVC.panel,{rx:16});g.rect(150,252,180,22,SVC.panel,{rx:8});g.rect(150,232,180,18,SVC.silicon,{rx:5});
      g.text(24,40,"热处理腔体与承载",{fill:SVC.muted,"font-size":14});g.text(24,66,"环境与温度按工艺要求安排",{fill:SVC.text});
      g=frames[1];
      g.rect(150,232,180,18,SVC.silicon,{rx:5});
      g.rect(138,110,204,16,SVC.metal,{rx:6});
      const lamp1=[];for(let i=0;i<6;i++)lamp1.push(g.line(156+i*32,128,156+i*32,224,"#e5a86a",{opacity:.5}));
      g.text(24,40,"灯加热与温度控制",{fill:SVC.muted,"font-size":14});g.text(24,66,"不提供生产设定",{fill:SVC.text});
      g=frames[2];
      g.rect(150,232,180,18,SVC.silicon,{rx:5});g.rect(138,110,204,16,SVC.metal,{rx:6});
      const lamp2=[];for(let i=0;i<6;i++)lamp2.push(g.line(156+i*32,128,156+i*32,224,"#f0b877",{opacity:.6}));
      g.text(24,40,"修复与激活阶段",{fill:SVC.muted,"font-size":14});g.text(24,66,"灯光脉动只表示过程进行中",{fill:SVC.text});
      g=frames[3];
      g.rect(150,232,180,18,SVC.silicon,{rx:5});
      const cool=[];for(let i=0;i<4;i++)cool.push(g.line(140,150+i*22,340,150+i*22,SVC.fluid,{opacity:.3,"stroke-dasharray":"12 9"}));
      g.text(24,40,"受控冷却",{fill:SVC.muted,"font-size":14});g.text(24,66,"不模拟热传导或具体气路",{fill:SVC.text});
      g=frames[4];
      g.rect(150,232,180,18,SVC.silicon,{rx:5});g.rect(150,120,180,20,SVC.metal,{rx:6});
      const scanA=g.rect(150,180,32,6,SVC.fluid,{opacity:.8,rx:3});
      g.text(24,40,"量测位置示意",{fill:SVC.muted,"font-size":14});g.text(24,66,"检查光标不对应真实测试数据",{fill:SVC.text});
      let m=mats[0];
      m.rect(90,250,300,52,SVC.silicon,{rx:4});
      const dmg=[];for(let i=0;i<5;i++)dmg.push(m.line(120+i*56,262,140+i*56,290,SVC.metal,{opacity:.8}));
      for(let i=0;i<6;i++)m.circle(118+i*46,276,4,"#e08a4a",{opacity:.85});
      m.text(24,40,"处理前：掺杂标记 + 损伤",{fill:SVC.muted,"font-size":14});m.text(24,330,"外观相近不代表内部状态相同。",{fill:SVC.text});
      m=mats[1];
      m.rect(90,250,300,52,SVC.silicon,{rx:4});
      for(let i=0;i<5;i++)m.line(120+i*56,262,140+i*56,290,SVC.metal,{opacity:.8});
      for(let i=0;i<6;i++)m.circle(118+i*46,276,4,"#e08a4a",{opacity:.85});
      const warm=m.rect(90,238,300,76,"#dc7344",{rx:6,opacity:.16});
      m.text(24,40,"受控加热",{fill:SVC.muted,"font-size":14});m.text(24,330,"暖色只表示加热状态。",{fill:SVC.text});
      m=mats[2];
      m.rect(90,250,300,52,SVC.silicon,{rx:4});
      const dmgGone=[];for(let i=0;i<5;i++)dmgGone.push(m.line(120+i*56,262,140+i*56,290,SVC.metal,{opacity:.8}));
      const act=[];for(let i=0;i<6;i++)act.push(m.circle(118+i*46,276,4,"#8adeb0",{opacity:0}));
      for(let i=0;i<6;i++)m.circle(118+i*46,276,4,"#e08a4a",{opacity:.85});
      m.text(24,40,"修复与激活",{fill:SVC.muted,"font-size":14});m.text(24,330,"状态色表示内部性质变化，不是新增材料。",{fill:SVC.text});
      m=mats[3];
      m.rect(90,250,300,52,SVC.silicon,{rx:4});
      for(let i=0;i<6;i++)m.circle(118+i*46,276,4,"#8adeb0",{opacity:.85});
      const cooled=m.rect(90,238,300,76,SVC.fluid,{rx:6,opacity:.12});
      m.text(24,40,"受控冷却",{fill:SVC.muted,"font-size":14});m.text(24,330,"已激活状态保留，未恢复成未注入。",{fill:SVC.text});
      m=mats[4];
      m.rect(90,250,300,52,SVC.silicon,{rx:4});
      for(let i=0;i<6;i++)m.circle(118+i*46,276,4,"#8adeb0",{opacity:.85});
      const scanA2=m.rect(90,150,12,110,SVC.fluid,{rx:4,opacity:.3});
      m.text(24,40,"量测与衔接",{fill:SVC.muted,"font-size":14});m.text(24,330,"轮廓相近，内部状态已调整。",{fill:SVC.text});
      return (step,p)=>{
        frames.forEach((f,i)=>f.op(f,i===step?1:0));mats.forEach((f,i)=>f.op(f,i===step?1:0));
        lamp1.forEach((l,i)=>l.setAttribute("opacity",step===1?String(.2+.4*(1-Math.abs(p-.5)*2)):"0"));
        lamp2.forEach((l,i)=>l.setAttribute("opacity",step===2?String(.25+.5*Math.abs(Math.sin(p*Math.PI*4+i*.5))):"0"));
        cool.forEach((c,i)=>c.setAttribute("opacity",step===3?String(.1+.25*p):"0"));
        scanA.setAttribute("x",(150+(step===4?p*146:0)).toFixed(1));scanA.setAttribute("opacity",step===4?".8":"0");
        warm.setAttribute("opacity",(step===1?.10+.12*p:step===2?.16*(1-p*.5):0).toFixed(2));
        dmgGone.forEach(d=>d.setAttribute("opacity",step===2?String(Math.max(0,.8*(1-p*1.2))):"0"));
        act.forEach(a=>a.setAttribute("opacity",step>=2?String(step===2?Math.min(1,p*1.3):.85):"0"));
        cooled.setAttribute("opacity",step===3?String(.12*(1-p*.4)):"0");
        scanA2.setAttribute("x",(90+(step===4?p*286:0)).toFixed(1));scanA2.setAttribute("opacity",step===4?".3":"0");
      };
    },
    /* 平坦化：识别多余材料 → 供液接触 → 去除表面铜 → 清洗 → 检查（槽内铜保留） */
    cmp({device,material}){
      const frames=[],mats=[];
      for(let i=0;i<5;i++){const g=device.g();g.rect(0,0,480,360,SVC.dark,{rx:0});frames.push(g);}
      for(let i=0;i<5;i++){const m=material.g();m.rect(0,0,480,360,SVC.dark,{rx:0});mats.push(m);}
      let g=frames[0];
      g.rect(120,244,240,52,SVC.panel,{rx:10});g.path("M140 270H340",{stroke:SVC.metal,"stroke-width":4});
      g.rect(186,120,108,52,SVC.metal,{rx:10});g.rect(198,176,84,14,SVC.silicon,{rx:4});
      g.text(24,40,"承载头与抛光平台",{fill:SVC.muted,"font-size":14});g.text(24,66,"本例加工面朝向下方垫面",{fill:SVC.text});
      g=frames[1];
      g.rect(120,244,240,52,SVC.panel,{rx:10});g.path("M140 270H340",{stroke:SVC.metal,"stroke-width":4});
      g.rect(186,120,108,52,SVC.metal,{rx:10});g.rect(198,176,84,14,SVC.silicon,{rx:4});
      g.rect(232,196,16,30,SVC.metal,{rx:5});
      const slurry=[];for(let i=0;i<4;i++)slurry.push(g.line(240,228,190+i*34,262,SVC.fluid,{opacity:.45}));
      g.text(24,40,"供液机构与承载头",{fill:SVC.muted,"font-size":14});g.text(24,66,"化学作用与机械作用共同参与",{fill:SVC.text});
      g=frames[2];
      g.rect(120,244,240,52,SVC.panel,{rx:10});g.path("M140 270H340",{stroke:SVC.metal,"stroke-width":4});
      g.rect(186,126,108,52,SVC.metal,{rx:10});g.rect(198,182,84,14,SVC.silicon,{rx:4});
      g.path("M150 300A110 26 0 0 0 330 300",{stroke:SVC.fluid,"stroke-width":3,"stroke-dasharray":"9 7",opacity:.75});
      g.text(24,40,"相对运动与压力控制",{fill:SVC.muted,"font-size":14});g.text(24,66,"垫上浅色标记只显示旋转",{fill:SVC.text});
      g=frames[3];
      g.rect(120,244,240,52,SVC.panel,{rx:10});g.path("M140 270H340",{stroke:SVC.metal,"stroke-width":4});
      g.rect(186,120,108,52,SVC.metal,{rx:10});g.rect(198,176,84,14,SVC.silicon,{rx:4});
      const rinse=[];for(let i=0;i<4;i++)rinse.push(g.line(160+i*52,150,160+i*52,196,SVC.fluid,{opacity:.35}));
      g.text(24,40,"加工后清洗（概括）",{fill:SVC.muted,"font-size":14});g.text(24,66,"清理不应删除铜线",{fill:SVC.text});
      g=frames[4];
      g.rect(120,244,240,52,SVC.panel,{rx:10});g.path("M140 270H340",{stroke:SVC.metal,"stroke-width":4});
      g.rect(186,120,108,52,SVC.metal,{rx:10});g.rect(198,176,84,14,SVC.silicon,{rx:4});
      const scanC=g.rect(150,120,32,6,SVC.fluid,{opacity:.8,rx:3});
      g.text(24,40,"量测与检查位置",{fill:SVC.muted,"font-size":14});g.text(24,66,"扫描位置不输出厚度或合格判断",{fill:SVC.text});
      let m=mats[0];
      m.rect(90,262,300,40,SVC.silicon,{rx:4});
      for(let i=0;i<3;i++)m.rect(120+i*90,236,54,26,"#b8763f",{rx:3});
      const over=m.rect(90,214,300,22,"#c98a4e",{rx:4,opacity:.9});
      m.text(24,40,"铜已填入凹槽并覆盖表面",{fill:SVC.muted,"font-size":14});m.text(24,330,"待去除的是表面多余材料。",{fill:SVC.text});
      m=mats[1];
      m.rect(90,262,300,40,SVC.silicon,{rx:4});
      for(let i=0;i<3;i++)m.rect(120+i*90,236,54,26,"#b8763f",{rx:3});
      m.rect(90,214,300,22,"#c98a4e",{rx:4,opacity:.9});
      const sl=m.rect(90,190,300,26,SVC.fluid,{rx:4,opacity:.28});
      m.text(24,40,"供液与接触",{fill:SVC.muted,"font-size":14});m.text(24,330,"不是只用水冲洗，也不仅靠干磨。",{fill:SVC.text});
      m=mats[2];
      m.rect(90,262,300,40,SVC.silicon,{rx:4});
      for(let i=0;i<3;i++)m.rect(120+i*90,236,54,26,"#b8763f",{rx:3});
      const over2=m.rect(90,214,300,22,"#c98a4e",{rx:4,opacity:.9});
      m.text(24,40,"表面多余铜被去除",{fill:SVC.muted,"font-size":14});m.text(24,330,"凹槽中的铜保留。",{fill:SVC.text});
      m=mats[3];
      m.rect(90,262,300,40,SVC.silicon,{rx:4});
      for(let i=0;i<3;i++)m.rect(120+i*90,236,54,26,"#b8763f",{rx:3});
      const cleanC=m.rect(90,214,300,22,SVC.fluid,{rx:4,opacity:.2});
      m.text(24,40,"清洗残留",{fill:SVC.muted,"font-size":14});m.text(24,330,"绝缘层与铜线顶面齐平。",{fill:SVC.text});
      m=mats[4];
      m.rect(90,262,300,40,SVC.silicon,{rx:4});
      for(let i=0;i<3;i++)m.rect(120+i*90,236,54,26,"#b8763f",{rx:3});
      const scanC2=m.rect(90,190,12,110,SVC.fluid,{rx:4,opacity:.3});
      m.text(24,40,"检查表面",{fill:SVC.muted,"font-size":14});m.text(24,330,"看起来平整不等于通过验收。",{fill:SVC.text});
      return (step,p)=>{
        frames.forEach((f,i)=>f.op(f,i===step?1:0));mats.forEach((f,i)=>f.op(f,i===step?1:0));
        slurry.forEach((s,i)=>s.setAttribute("opacity",step===1?String(.2+.35*(1-p)):"0"));
        rinse.forEach((s,i)=>s.setAttribute("opacity",step===3?String(.15+.3*(1-p)):"0"));
        scanC.setAttribute("x",(150+(step===4?p*146:0)).toFixed(1));scanC.setAttribute("opacity",step===4?".8":"0");
        const keep=step===2?Math.max(0,1-p*1.25):step>2?0:1;
        over2.setAttribute("height",(22*keep).toFixed(1));over2.setAttribute("opacity",String(.9*keep));
        sl.setAttribute("opacity",(step===1?.28*(1-p*.4):0).toFixed(2));
        cleanC.setAttribute("opacity",step===3?String(.2*(1-p*.6)):"0");
        scanC2.setAttribute("x",(90+(step===4?p*286:0)).toFixed(1));scanC2.setAttribute("opacity",step===4?".3":"0");
      };
    },
    /* 多层互连：已有下层线 → 绝缘层 → 沟槽与通孔 → 衬层 → 填铜 → 平坦化 → 检查（7 阶段） */
    interconnect({device,material}){
      const N=7,frames=[],mats=[];
      for(let i=0;i<N;i++){const g=device.g();g.rect(0,0,480,360,SVC.dark,{rx:0});frames.push(g);}
      for(let i=0;i<N;i++){const m=material.g();m.rect(0,0,480,360,SVC.dark,{rx:0});mats.push(m);}
      let g=frames[0];
      g.rect(140,250,200,26,SVC.panel,{rx:8});g.rect(150,226,180,24,SVC.silicon,{rx:5});
      g.text(24,40,"已有下层互连结构",{fill:SVC.muted,"font-size":14});g.text(24,66,"本阶段只建立观察起点",{fill:SVC.text});
      g=frames[1];
      g.rect(120,60,240,220,SVC.panel,{rx:16});g.rect(150,220,180,20,SVC.silicon,{rx:5});
      const idown=[];for(let i=0;i<5;i++)idown.push(g.line(152+i*44,96,152+i*44,140,SVC.surface,{opacity:.5}));
      g.text(24,40,"成膜腔体（概括）",{fill:SVC.muted,"font-size":14});g.text(24,66,"增加绝缘材料，为下一层线路准备空间",{fill:SVC.text});
      g=frames[2];
      g.rect(120,60,240,220,SVC.panel,{rx:16});g.rect(150,220,180,20,SVC.silicon,{rx:5});
      g.rect(158,104,164,16,SVC.metal,{rx:4});
      const irays=[];for(let i=0;i<4;i++)irays.push(g.line(176+i*42,124,176+i*42,170,SVC.fluid,{opacity:.5}));
      g.text(24,40,"光刻与刻蚀（合并）",{fill:SVC.muted,"font-size":14});g.text(24,66,"形成上层沟槽与通向下层线的孔",{fill:SVC.text});
      g=frames[3];
      g.rect(120,60,240,220,SVC.panel,{rx:16});g.rect(150,220,180,20,SVC.silicon,{rx:5});
      g.rect(150,110,180,16,"#7fa8b8",{rx:4,opacity:.6});
      const ldown=[];for(let i=0;i<4;i++)ldown.push(g.line(168+i*50,130,168+i*50,180,"#b9d7e2",{opacity:.45}));
      g.text(24,40,"阻挡、衬里与种子层",{fill:SVC.muted,"font-size":14});g.text(24,66,"以两种薄壁颜色合并展示，不表达真实层厚",{fill:SVC.text});
      g=frames[4];
      g.rect(110,214,260,66,SVC.panel,{rx:12});g.rect(128,232,224,34,SVC.fluid,{rx:6,opacity:.28});
      g.rect(150,196,180,20,SVC.silicon,{rx:5});g.rect(60,196,26,30,SVC.metal,{rx:5});g.path("M86 211H140",{stroke:SVC.metal,"stroke-width":3});
      g.text(24,40,"电化学沉积工位（ECD）",{fill:SVC.muted,"font-size":14});g.text(24,66,"液槽与供电结构为概括示意",{fill:SVC.text});
      g=frames[5];
      g.rect(120,244,240,52,SVC.panel,{rx:10});g.path("M140 270H340",{stroke:SVC.metal,"stroke-width":4});
      g.rect(186,120,108,52,SVC.metal,{rx:10});g.rect(198,176,84,14,SVC.silicon,{rx:4});
      g.path("M150 300A110 26 0 0 0 330 300",{stroke:SVC.fluid,"stroke-width":3,"stroke-dasharray":"9 7",opacity:.7});
      g.text(24,40,"平坦化（概括）",{fill:SVC.muted,"font-size":14});g.text(24,66,"接触机制见独立 CMP 演示",{fill:SVC.text});
      g=frames[6];
      g.rect(150,226,180,24,SVC.silicon,{rx:5});g.rect(150,120,180,20,SVC.metal,{rx:6});
      const iscan=g.rect(150,170,32,6,SVC.fluid,{opacity:.8,rx:3});
      g.text(24,40,"检查与继续叠层",{fill:SVC.muted,"font-size":14});g.text(24,66,"扫描光标不是电流或测试结果",{fill:SVC.text});
      let m=mats[0];
      m.rect(80,268,320,40,SVC.silicon,{rx:4});m.rect(80,214,320,54,"#2c4a63",{rx:4});
      m.rect(150,232,180,22,"#b8763f",{rx:3});
      m.text(24,40,"下层铜线嵌在绝缘材料中",{fill:SVC.muted,"font-size":14});m.text(24,330,"晶圆内部互连不是封装后的外部引脚。",{fill:SVC.text});
      m=mats[1];
      m.rect(80,268,320,40,SVC.silicon,{rx:4});m.rect(80,214,320,54,"#2c4a63",{rx:4});m.rect(150,232,180,22,"#b8763f",{rx:3});
      const insul=m.rect(80,214,320,0,"#2c4a63",{rx:4});
      m.text(24,40,"增加绝缘层",{fill:SVC.muted,"font-size":14});m.text(24,330,"下层铜线保留。",{fill:SVC.text});
      m=mats[2];
      m.rect(80,268,320,40,SVC.silicon,{rx:4});m.rect(80,180,320,88,"#2c4a63",{rx:4});m.rect(150,248,180,22,"#b8763f",{rx:3});
      const trench=m.rect(150,180,180,34,SVC.dark,{rx:0});
      const via=m.rect(228,214,34,34,SVC.dark,{rx:0});
      m.text(24,40,"沟槽与通孔（此时无铜）",{fill:SVC.muted,"font-size":14});m.text(24,330,"开口到达指定下层线。",{fill:SVC.text});
      m=mats[3];
      m.rect(80,268,320,40,SVC.silicon,{rx:4});m.rect(80,180,320,88,"#2c4a63",{rx:4});m.rect(150,248,180,22,"#b8763f",{rx:3});
      m.rect(150,180,180,34,SVC.dark,{rx:0});m.rect(228,214,34,34,SVC.dark,{rx:0});
      m.rect(150,180,180,5,"#8fb6c6",{rx:0,opacity:.85});m.rect(228,214,5,34,"#8fb6c6",{rx:0,opacity:.85});
      m.rect(150,180,180,9,"#c6dbe4",{rx:0,opacity:.35});m.rect(228,214,9,34,"#c6dbe4",{rx:0,opacity:.35});
      m.text(24,40,"阻挡层、衬里与种子层",{fill:SVC.muted,"font-size":14});m.text(24,330,"薄壁参与界面与材料控制。",{fill:SVC.text});
      m=mats[4];
      m.rect(80,268,320,40,SVC.silicon,{rx:4});m.rect(80,180,320,88,"#2c4a63",{rx:4});m.rect(150,248,180,22,"#b8763f",{rx:3});
      m.rect(228,214,34,34,"#b8763f",{rx:0,opacity:.9});
      const fillCu=m.rect(150,180,180,34,"#c98a4e",{rx:0});
      const overCu=m.rect(80,172,320,8,"#c98a4e",{rx:2,opacity:.9});
      m.text(24,40,"铜填入沟槽与通孔",{fill:SVC.muted,"font-size":14});m.text(24,330,"表面同时形成需要去除的多余铜。",{fill:SVC.text});
      m=mats[5];
      m.rect(80,268,320,40,SVC.silicon,{rx:4});m.rect(80,180,320,88,"#2c4a63",{rx:4});
      m.rect(228,214,34,34,"#b8763f",{rx:0,opacity:.9});m.rect(150,180,180,34,"#b8763f",{rx:0,opacity:.9});
      const flat=m.rect(80,172,320,8,"#c98a4e",{rx:2,opacity:.9});
      m.text(24,40,"平坦化后：上层线形成",{fill:SVC.muted,"font-size":14});m.text(24,330,"通孔连接上下层，槽内铜保留。",{fill:SVC.text});
      m=mats[6];
      m.rect(80,268,320,40,SVC.silicon,{rx:4});m.rect(80,180,320,88,"#2c4a63",{rx:4});
      m.rect(228,214,34,34,"#b8763f",{rx:0});m.rect(150,180,180,34,"#b8763f",{rx:0});m.rect(150,248,180,22,"#b8763f",{rx:3});
      m.circle(245,231,5,"#8adeb0",{opacity:.9});
      const iscan2=m.rect(80,146,12,130,SVC.fluid,{rx:4,opacity:.3});
      m.text(24,40,"检查并继续叠层",{fill:SVC.muted,"font-size":14});m.text(24,330,"未设通孔的交叉线路不会仅因交叉而连接。",{fill:SVC.text});
      return (step,p)=>{
        frames.forEach((f,i)=>f.op(f,i===step?1:0));mats.forEach((f,i)=>f.op(f,i===step?1:0));
        idown.forEach((d,i)=>d.setAttribute("opacity",step===1?String(.2+.5*p):"0"));
        irays.forEach((r,i)=>r.setAttribute("opacity",step===2?String(.15+.5*Math.abs(Math.sin(p*Math.PI*3+i*.5))):"0"));
        ldown.forEach((d,i)=>d.setAttribute("opacity",step===3?String(.15+.5*p):"0"));
        iscan.setAttribute("x",(150+(step===6?p*146:0)).toFixed(1));iscan.setAttribute("opacity",step===6?".8":"0");
        insul.setAttribute("y",(214-(step===1?54*p:54)).toFixed(1));insul.setAttribute("height",(step===1?54*p:54).toFixed(1));
        const open=step===2?Math.min(1,p*1.3):step>2?1:0;
        trench.setAttribute("opacity",String(open));via.setAttribute("opacity",String(open));
        fillCu.setAttribute("opacity",step===4?String(Math.min(1,p*1.35)):step>4?"1":"0");
        overCu.setAttribute("opacity",step===4?String(Math.min(1,p*1.35)*.9):"0");
        flat.setAttribute("opacity",step===5?String(Math.max(0,.9*(1-p*1.2))):"0");
        iscan2.setAttribute("x",(80+(step===6?p*296:0)).toFixed(1));iscan2.setAttribute("opacity",step===6?".3":"0");
      };
    },
    /* 薄膜厚度量测：材料几何全程不变，新增的只有信息（5 阶段） */
    metrology({device,material}){
      const frames=[],mats=[];
      for(let i=0;i<5;i++){const g=device.g();g.rect(0,0,480,360,SVC.dark,{rx:0});frames.push(g);}
      for(let i=0;i<5;i++){const m=material.g();m.rect(0,0,480,360,SVC.dark,{rx:0});mats.push(m);}
      let g=frames[0];
      g.rect(150,250,180,22,SVC.silicon,{rx:5});g.rect(150,214,180,36,SVC.surface,{rx:3,opacity:.85});
      g.rect(150,120,180,22,SVC.metal,{rx:6});
      g.text(24,40,"量测位置与校准准备",{fill:SVC.muted,"font-size":14});g.text(24,66,"先明确要得到哪个参数",{fill:SVC.text});
      g=frames[1];
      g.rect(150,250,180,22,SVC.silicon,{rx:5});g.rect(150,214,180,36,SVC.surface,{rx:3,opacity:.85});g.rect(150,120,180,22,SVC.metal,{rx:6});
      g.line(240,142,214,214,"#f0b877",{opacity:.6});g.line(240,142,266,214,SVC.fluid,{opacity:.6});
      g.text(24,40,"光学量测头：照明与接收",{fill:SVC.muted,"font-size":14});g.text(24,66,"两种路径颜色只区分发射与接收功能",{fill:SVC.text});
      g=frames[2];
      g.rect(150,250,180,22,SVC.silicon,{rx:5});g.rect(150,214,180,36,SVC.surface,{rx:3,opacity:.85});g.rect(150,120,180,22,SVC.metal,{rx:6});
      g.line(240,142,214,214,"#f0b877",{opacity:.6});g.line(240,142,266,214,SVC.fluid,{opacity:.6});
      const pos=g.rect(150,196,180,8,SVC.fluid,{rx:3,opacity:.35});
      g.text(24,40,"定位与采样机构",{fill:SVC.muted,"font-size":14});g.text(24,66,"用少量测点表达采样，未模拟整片扫描",{fill:SVC.text});
      g=frames[3];
      g.rect(150,250,180,22,SVC.silicon,{rx:5});g.rect(150,214,180,36,SVC.surface,{rx:3,opacity:.85});g.rect(150,120,180,22,SVC.metal,{rx:6});
      g.rect(360,196,26,54,SVC.panel,{rx:4});g.path("M360 196H386 M360 250H386",{stroke:SVC.muted,"stroke-width":2});
      g.text(24,40,"信号分析与量测模型",{fill:SVC.muted,"font-size":14});g.text(24,66,"结合模型与校准分析，教学模型不替代仪器",{fill:SVC.text});
      g=frames[4];
      g.rect(150,250,180,22,SVC.silicon,{rx:5});g.rect(150,214,180,36,SVC.surface,{rx:3,opacity:.85});g.rect(150,120,180,22,SVC.metal,{rx:6});
      const rec=g.rect(120,140,90,54,SVC.panel,{rx:8});g.path("M136 158H194 M136 174H178",{stroke:SVC.fluid,"stroke-width":3,opacity:.8});
      g.text(24,40,"结果记录与控制衔接",{fill:SVC.muted,"font-size":14});g.text(24,66,"判断与处理按实际规范完成",{fill:SVC.text});
      for(let i=0;i<5;i++){const m=mats[i];
        m.rect(80,268,320,40,SVC.silicon,{rx:4});m.rect(80,232,320,36,SVC.surface,{rx:3,opacity:.85});
      }
      let m=mats[0];
      m.text(24,40,"膜厚 = 这层膜上下界面的间距",{fill:SVC.muted,"font-size":14});m.text(24,330,"不是整片晶圆厚度；薄膜保持连续。",{fill:SVC.text});
      m=mats[1];
      m.line(240,150,214,232,"#f0b877",{opacity:.55});m.line(240,150,266,232,SVC.fluid,{opacity:.55});
      m.text(24,40,"照明与接收（材料不变）",{fill:SVC.muted,"font-size":14});m.text(24,330,"不是用光束去除薄膜，也不新增材料。",{fill:SVC.text});
      m=mats[2];
      for(let i=0;i<4;i++)m.circle(130+i*72,222,5,SVC.fluid,{opacity:.45});
      m.text(24,40,"不同位置采样",{fill:SVC.muted,"font-size":14});m.text(24,330,"得到的是信息，不是把这些位置加工出来。",{fill:SVC.text});
      m=mats[3];
      m.line(400,232,400,268,SVC.muted,{opacity:.8});m.line(395,232,405,232,SVC.muted,{opacity:.8});m.line(395,268,405,268,SVC.muted,{opacity:.8});
      m.text(24,40,"分析得到厚度参数",{fill:SVC.muted,"font-size":14});m.text(24,330,"括号只指出所讨论的界面间距，不给出数值。",{fill:SVC.text});
      m=mats[4];
      m.rect(120,150,90,54,SVC.panel,{rx:8});m.path("M136 168H194 M136 184H178",{stroke:SVC.fluid,"stroke-width":3,opacity:.8});
      m.text(24,40,"提供过程反馈",{fill:SVC.muted,"font-size":14});m.text(24,330,"量测、判断与加工是不同环节。",{fill:SVC.text});
      return (step,p)=>{
        frames.forEach((f,i)=>f.op(f,i===step?1:0));mats.forEach((f,i)=>f.op(f,i===step?1:0));
        pos.setAttribute("x",(150+(step===2?p*140:0)).toFixed(1));pos.setAttribute("opacity",step===2?String(.2+.3*p):"0");
        rec.setAttribute("opacity",step===4?String(.4+.6*p):"0");
      };
    },
    /* 缺陷检测：颗粒与桥连自始存在，标记只是注释，材料不被修复（5 阶段） */
    inspection({device,material}){
      const frames=[],mats=[];
      for(let i=0;i<5;i++){const g=device.g();g.rect(0,0,480,360,SVC.dark,{rx:0});frames.push(g);}
      for(let i=0;i<5;i++){const m=material.g();m.rect(0,0,480,360,SVC.dark,{rx:0});mats.push(m);}
      let g=frames[0];
      g.rect(150,250,180,22,SVC.silicon,{rx:5});g.rect(150,214,180,36,SVC.surface,{rx:3,opacity:.8});
      g.text(24,40,"承载与定位机构",{fill:SVC.muted,"font-size":14});g.text(24,66,"没有执行清洗或修复",{fill:SVC.text});
      g=frames[1];
      g.rect(150,250,180,22,SVC.silicon,{rx:5});g.rect(150,214,180,36,SVC.surface,{rx:3,opacity:.8});
      g.rect(150,120,180,22,SVC.metal,{rx:6});g.line(240,142,214,214,"#f0b877",{opacity:.55});g.line(240,142,266,214,SVC.fluid,{opacity:.55});
      g.text(24,40,"照明与成像组件",{fill:SVC.muted,"font-size":14});g.text(24,66,"采集信号并不冲走颗粒或切断桥连",{fill:SVC.text});
      g=frames[2];
      g.rect(150,250,180,22,SVC.silicon,{rx:5});g.rect(150,214,180,36,SVC.surface,{rx:3,opacity:.8});
      g.rect(150,120,180,22,SVC.metal,{rx:6});
      const boxes=[];for(let i=0;i<3;i++)boxes.push(g.rect(168+i*58,190,34,30,"none",{rx:3,stroke:"#e05a4a","stroke-width":2,opacity:0}));
      g.text(24,40,"信号处理与位置记录",{fill:SVC.muted,"font-size":14});g.text(24,66,"候选位置由预设样本演示",{fill:SVC.text});
      g=frames[3];
      g.rect(150,250,180,22,SVC.silicon,{rx:5});g.rect(150,214,180,36,SVC.surface,{rx:3,opacity:.8});
      g.rect(300,120,110,86,SVC.panel,{rx:10});g.rect(312,132,86,62,SVC.silicon,{rx:4});
      g.circle(340,152,6,"#d98a4e");g.rect(360,164,28,6,"#c98a4e",{rx:3});
      g.text(24,40,"复查观察位置",{fill:SVC.muted,"font-size":14});g.text(24,66,"实际复查可能采用不同成像方法",{fill:SVC.text});
      g=frames[4];
      g.rect(150,250,180,22,SVC.silicon,{rx:5});
      const rec2=g.rect(120,140,96,54,SVC.panel,{rx:8});g.path("M136 158H198 M136 174H180",{stroke:SVC.fluid,"stroke-width":3,opacity:.8});
      g.text(24,40,"缺陷记录与过程反馈",{fill:SVC.muted,"font-size":14});g.text(24,66,"必要时由相应工序另行处理",{fill:SVC.text});
      let m;
      for(let i=0;i<5;i++){m=mats[i];
        m.rect(80,250,320,52,SVC.silicon,{rx:4});m.rect(80,214,320,36,SVC.surface,{rx:3,opacity:.8});
        m.rect(128,206,26,8,"#d98a4e",{rx:2});
        m.rect(246,206,58,8,"#c98a4e",{rx:2});
        m.circle(300,196,6,"#d98a4e");
      }
      m=mats[0];
      m.text(24,40,"样本上已有颗粒与桥连",{fill:SVC.muted,"font-size":14});m.text(24,330,"没有红框不代表异常尚不存在。",{fill:SVC.text});
      m=mats[1];
      m.text(24,40,"采集光学信号（材料不变）",{fill:SVC.muted,"font-size":14});m.text(24,330,"光学检测与湿法清洗是不同任务。",{fill:SVC.text});
      m=mats[2];
      m.rect(122,200,38,20,"none",{rx:3,stroke:"#e05a4a","stroke-width":2});
      m.rect(240,200,40,20,"none",{rx:3,stroke:"#e05a4a","stroke-width":2});
      m.rect(288,184,26,24,"none",{rx:3,stroke:"#e05a4a","stroke-width":2});
      m.text(24,40,"标记候选位置",{fill:SVC.muted,"font-size":14});m.text(24,330,"框是观察注释，框内材料没有变化。",{fill:SVC.text});
      m=mats[3];
      m.rect(288,184,26,24,"none",{rx:3,stroke:"#e05a4a","stroke-width":3});
      m.text(24,40,"复查与分类",{fill:SVC.muted,"font-size":14});m.text(24,330,"位置标记不等于确定根因。",{fill:SVC.text});
      m=mats[4];
      m.rect(120,150,96,54,SVC.panel,{rx:8});m.path("M136 168H198 M136 184H180",{stroke:SVC.fluid,"stroke-width":3,opacity:.8});
      m.text(24,40,"形成处理依据",{fill:SVC.muted,"font-size":14});m.text(24,330,"即使需要清洗，也应由相应工序另行完成。",{fill:SVC.text});
      return (step,p)=>{
        frames.forEach((f,i)=>f.op(f,i===step?1:0));mats.forEach((f,i)=>f.op(f,i===step?1:0));
        boxes.forEach((b,i)=>b.setAttribute("opacity",step===2?String(Math.max(0,Math.min(1,p*2-i*.3))):"0"));
        rec2.setAttribute("opacity",step===4?String(.4+.6*p):"0");
      };
    },
    /* 封装与测试：晶圆测试 → 分离裸片 → 放置 → 连接 → 保护 → 成品测试（6 阶段） */
    packaging({device,material}){
      const N=6,frames=[],mats=[];
      for(let i=0;i<N;i++){const g=device.g();g.rect(0,0,480,360,SVC.dark,{rx:0});frames.push(g);}
      for(let i=0;i<N;i++){const m=material.g();m.rect(0,0,480,360,SVC.dark,{rx:0});mats.push(m);}
      let g=frames[0];
      g.rect(140,250,200,24,SVC.panel,{rx:8});g.rect(150,232,180,18,SVC.silicon,{rx:5});
      const probes=[];for(let i=0;i<3;i++)probes.push(g.line(196+i*44,150,196+i*44,232,SVC.metal,{opacity:.8}));
      g.rect(150,120,180,18,SVC.panel,{rx:6});
      g.text(24,40,"探针接触与定位",{fill:SVC.muted,"font-size":14});g.text(24,66,"画面只显示接触和定位",{fill:SVC.text});
      g=frames[1];
      g.rect(60,64,360,18,SVC.metal,{rx:6});
      const dice=[];for(let i=0;i<5;i++)dice.push(g.rect(96+i*60,120,46,120,SVC.silicon,{rx:5}));
      g.text(24,40,"划片机构",{fill:SVC.muted,"font-size":14});g.text(24,336,"省略减薄、边缘区域及切割损耗",{fill:SVC.muted,"font-size":12});
      g=frames[2];
      g.rect(120,268,240,22,SVC.panel,{rx:8});g.rect(196,236,88,14,SVC.silicon,{rx:4});
      g.rect(196,196,88,34,SVC.metal,{rx:8});g.circle(212,250,5,"#c98a4e");g.circle(268,250,5,"#c98a4e");
      g.text(24,40,"拾取与对准机构",{fill:SVC.muted,"font-size":14});g.text(24,336,"本例已按倒装方向放置，不展开翻转与凸点制备",{fill:SVC.muted,"font-size":12});
      g=frames[3];
      g.rect(120,268,240,22,SVC.panel,{rx:8});g.rect(196,236,88,14,SVC.silicon,{rx:4});
      g.rect(196,196,88,34,SVC.metal,{rx:8});
      const joints=[];for(let i=0;i<2;i++)joints.push(g.circle(212+i*56,250,6,"#c98a4e",{opacity:0}));
      g.text(24,40,"连接工位",{fill:SVC.muted,"font-size":14});g.text(24,66,"加热、材料与过程未模拟",{fill:SVC.text});
      g=frames[4];
      g.rect(120,268,240,22,SVC.panel,{rx:8});g.rect(196,236,88,14,SVC.silicon,{rx:4});
      g.rect(196,196,88,34,SVC.metal,{rx:8});
      const shell=g.rect(150,176,180,96,SVC.panel,{rx:12,opacity:.55});g.circle(212,250,6,"#c98a4e");g.circle(268,250,6,"#c98a4e");
      g.text(24,40,"装配工位：保护结构",{fill:SVC.muted,"font-size":14});g.text(24,66,"用局部开盖示意，未模拟成型与散热",{fill:SVC.text});
      g=frames[5];
      g.rect(120,268,240,22,SVC.panel,{rx:8});g.rect(196,196,88,34,SVC.metal,{rx:8});
      g.rect(60,120,50,60,SVC.panel,{rx:8});g.rect(370,120,50,60,SVC.panel,{rx:8});
      g.path("M212 268V300H110V180 M268 268V300H370V180",{stroke:SVC.metal,"stroke-width":3});
      g.text(24,40,"测试插座与接触机构",{fill:SVC.muted,"font-size":14});g.text(24,66,"本动画不输出合格结论",{fill:SVC.text});
      let m=mats[0];
      m.rect(80,238,320,64,SVC.silicon,{rx:6});
      for(let i=0;i<4;i++)m.rect(96+i*80,238,60,64,"#2c4a63",{rx:4});
      m.text(24,40,"电路单元仍在整片晶圆上",{fill:SVC.muted,"font-size":14});m.text(24,330,"测试获取结果，不重新生成电路。",{fill:SVC.text});
      m=mats[1];
      const sep=[];for(let i=0;i<4;i++)sep.push(m.rect(96+i*80,238,60,64,SVC.silicon,{rx:6}));
      m.rect(80,302,320,10,SVC.panel,{rx:5});
      m.text(24,40,"分离得到裸片（间距被放大）",{fill:SVC.muted,"font-size":14});m.text(24,330,"电路不是在切割时才形成。",{fill:SVC.text});
      m=mats[2];
      m.rect(80,302,320,10,SVC.panel,{rx:5});
      m.rect(196,214,88,16,SVC.silicon,{rx:4});
      m.circle(212,238,5,"#c98a4e");m.circle(268,238,5,"#c98a4e");
      m.text(24,40,"连接面朝向承载结构",{fill:SVC.muted,"font-size":14});m.text(24,330,"尚未表示连接完成。",{fill:SVC.text});
      m=mats[3];
      m.rect(80,302,320,10,SVC.panel,{rx:5});m.rect(196,214,88,16,SVC.silicon,{rx:4});
      m.rect(202,240,72,8,"#c98a4e",{rx:3,opacity:.9});
      m.text(24,40,"建立连接",{fill:SVC.muted,"font-size":14});m.text(24,330,"下方外部连接属于封装结构，不是原硅晶圆。",{fill:SVC.text});
      m=mats[4];
      m.rect(80,302,320,10,SVC.panel,{rx:5});m.rect(196,214,88,16,SVC.silicon,{rx:4});m.rect(202,240,72,8,"#c98a4e",{rx:3});
      m.rect(120,188,240,64,SVC.panel,{rx:10,opacity:.55});m.rect(196,206,88,10,SVC.dark,{rx:0,opacity:.85});
      m.text(24,40,"保护与支撑（剖开示意）",{fill:SVC.muted,"font-size":14});m.text(24,330,"不是实际缺损的成品。",{fill:SVC.text});
      m=mats[5];
      m.rect(80,302,320,10,SVC.panel,{rx:5});m.rect(196,214,88,16,SVC.silicon,{rx:4});m.rect(202,240,72,8,"#c98a4e",{rx:3});
      m.rect(120,188,240,64,SVC.panel,{rx:10,opacity:.45});
      m.path("M202 248V292H60 M278 248V292H420",{stroke:SVC.metal,"stroke-width":3});
      m.text(24,40,"成品测试（形态保持）",{fill:SVC.muted,"font-size":14});m.text(24,330,"晶圆测试与成品测试不能相互完全替代。",{fill:SVC.text});
      return (step,p)=>{
        frames.forEach((f,i)=>f.op(f,i===step?1:0));mats.forEach((f,i)=>f.op(f,i===step?1:0));
        probes.forEach(pr=>pr.setAttribute("opacity",step===0?String(.4+.5*(1-Math.abs(p-.5)*2)):"0"));
        dice.forEach((d,i)=>{d.setAttribute("x",(96+i*60+(step===1?(i-2)*p*8:0)).toFixed(1));});
        joints.forEach(j=>j.setAttribute("opacity",step===3?String(Math.min(1,p*1.4)):"0"));
        shell.setAttribute("opacity",step===4?String(.25+.35*p):"0");
        sep.forEach((s,i)=>{s.setAttribute("x",(96+i*80+(i-1.5)*p*14).toFixed(1));s.setAttribute("opacity",step===1?"1":"0");});
      };
    }
  };
  const svgScene=Object.prototype.hasOwnProperty.call(svgScenes,key)?svgScenes[key]:null;
  if(svgScene){
    const player=$('player');player.dataset.renderer='svg';
    const mkSvg=label=>{const s=document.createElementNS(SVGNS,'svg');s.setAttribute('viewBox','0 0 480 360');s.setAttribute('class','mechanism-svg');s.setAttribute('role','img');s.setAttribute('aria-label',label);return s;};
    const eqSvg=mkSvg('设备内部机构剖面'),matSvg=mkSvg('材料局部变化剖面');
    const eqCanvas=$('equipmentCanvas'),matCanvas=$('materialCanvas');
    eqCanvas.after(eqSvg);matCanvas.after(matSvg);eqCanvas.hidden=true;matCanvas.hidden=true;
    const render=svgScene({device:svgMake(eqSvg),material:svgMake(matSvg)});
    const steps=lesson.steps,nav=$('stepNav'),play=$('play'),timeline=$('timeline');
    const reduced=matchMedia('(prefers-reduced-motion: reduce)'),duration=6000;
    let step=0,progress=0,playing=false,frame=0,last=0;
    nav.replaceChildren();
    const buttons=steps.map((s,i)=>{const b=document.createElement('button');b.type='button';b.dataset.step=i;const n=document.createElement('span');n.textContent=String(i+1).padStart(2,'0');b.append(n,document.createTextNode(s.title));b.setAttribute('aria-label',n.textContent+' '+s.title);b.addEventListener('click',()=>choose(i));nav.append(b);return b;});
    function describe(){const s=steps[step];$('stepTitle').textContent=s.title;$('activeMechanism').textContent=s.name;$('currentOutcome').textContent=s.material;$('takeaway').textContent=s.takeaway;$('equipmentText').textContent=s.equipment;$('materialText').textContent=s.material;$('previous').disabled=step===0;$('next').disabled=step===steps.length-1;buttons.forEach((b,i)=>i===step?b.setAttribute('aria-current','step'):b.removeAttribute('aria-current'));}
    function status(){play.textContent=playing?'暂停':(step===steps.length-1&&progress===1?'重播':'播放全过程');play.setAttribute('aria-pressed',String(playing));$('playbackStatus').textContent=reduced.matches?'减少动态模式：用步骤与进度查看静态状态，不自动播放。':playing?'正在播放。可暂停观察，或拖动当前步骤进度。':'已暂停，可分步查看或播放。';}
    function draw(){render(step,progress);player.dataset.step=step;player.dataset.progress=String(Math.round(progress*100));player.dataset.playing=String(playing);timeline.value=String(Math.round(progress*100));timeline.setAttribute('aria-valuetext',steps[step].title+'，教学进度 '+Math.round(progress*100)+'%；非实际处理时长');}
    function pause(){playing=false;cancelAnimationFrame(frame);draw();status();}
    function choose(i){pause();step=Math.max(0,Math.min(steps.length-1,i));progress=reduced.matches?1:0;describe();draw();status();}
    function tick(now){if(!playing)return;const dt=Math.min(100,now-last);last=now;progress+=dt/duration;if(progress>=1){progress=1;if(step<steps.length-1){step++;progress=0;describe();}else{pause();return;}}draw();frame=requestAnimationFrame(tick);}
    function start(){if(reduced.matches)return;if(step===steps.length-1&&progress===1){step=0;progress=0;describe();}playing=true;last=performance.now();draw();status();frame=requestAnimationFrame(tick);}
    play.addEventListener('click',()=>playing?pause():start());
    $('previous').addEventListener('click',()=>choose(step-1));$('next').addEventListener('click',()=>choose(step+1));
    $('replay').addEventListener('click',()=>{choose(0);progress=0;draw();if(!reduced.matches)start();});
    timeline.addEventListener('input',()=>{pause();progress=Number(timeline.value)/100;draw();status();});
    document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});
    reduced.addEventListener('change',()=>{pause();play.disabled=reduced.matches;status();});
    for(const id of ['play','next','replay','timeline'])$(id).disabled=false;
    play.disabled=reduced.matches;
    describe();draw();status();
  }
})();
