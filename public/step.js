/* Reuse the canonical chapter explanations rather than maintain a second copy. */
const steps = {
  design: {title:"芯片设计",group:"制造前准备",target:"#design-delivery",lessons:[]},
  materials: {title:"晶圆制备",group:"制造前准备",target:"#wafer-preparation",lessons:[["materials","材料制备"]]},
  cleaning: {title:"清洗与表面准备",group:"晶圆制造",target:"#fab-cleaning",lessons:[["cleaning","清洗与干燥"]]},
  film: {title:"成膜",group:"晶圆制造",target:"#fab-film",lessons:[["patterning","成膜—图形化—刻蚀"]]},
  lithography: {title:"光刻",group:"晶圆制造",target:"#fab-lithography",lessons:[["lithography","光刻七步"]]},
  etch: {title:"刻蚀",group:"晶圆制造",target:"#fab-etch",lessons:[["patterning","薄膜图形化与刻蚀"]]},
  implant: {title:"掺杂与注入",group:"晶圆制造",target:"#fab-implant",lessons:[["implant","掺杂与注入"]]},
  anneal: {title:"热处理与退火",group:"晶圆制造",target:"#fab-anneal",lessons:[["anneal","热处理与退火"]]},
  cmp: {title:"平坦化",group:"晶圆制造",target:"#fab-cmp",lessons:[["cmp","平坦化"]]},
  interconnect: {title:"多层互连",group:"晶圆制造",target:"#fab-interconnect",lessons:[["interconnect","多层互连"]]},
  transfer: {title:"晶圆传输与自动化",group:"贯穿制造的晶圆交接",target:"#fab-transfer",lessons:[]},
  feedback: {title:"量测与检测",group:"贯穿制造的工艺评估",target:"#fab-feedback",lessons:[["metrology","薄膜厚度量测"],["inspection","缺陷检测"]]},
  "wafer-testing": {title:"晶圆测试与分离",group:"制造后的处理",target:"#wafer-testing",lessons:[["packaging","测试与封装路线"]]},
  packaging: {title:"封装与成品测试",group:"制造后的处理",target:"#package-connections",more:["#final-testing","#packaging-routes"],lessons:[["packaging","封装与测试"]]}
};
// Reading guidance only; technical knowledge remains in chapters.html.
const learning = {
  "design": [
    "电路是器件与连接共同构成的功能结构；版图是描述这些结构的设计数据。",
    "#circuit-basics",
    "materials",
    "设计交付数据，材料制备提供加工载体，二者共同支持制造。"
  ],
  "materials": [
    "衬底是承载加工的基础材料；单晶指内部原子按连续规则排列，不是单个原子。",
    "#chapter-4",
    "cleaning",
    "了解载体如何制备后，再看其表面为什么需要清洗。"
  ],
  "cleaning": [
    "薄膜是表面形成的一层材料；残留物与已制造的有用结构需要区分。",
    "#chapter-5",
    "film",
    "清洗准备加工表面，成膜说明如何在其上增加所需材料。"
  ],
  "film": [
    "导电材料提供电流通路；绝缘材料用于隔离不同连接。材料层的任务决定需要哪类薄膜。",
    "#circuit-basics",
    "lithography",
    "增加材料后，还需要确定本轮哪些位置要加工。"
  ],
  "lithography": [
    "图形指加工区域和形状；光刻胶是临时感光层，与下方目标材料不同。",
    "#fab-film",
    "etch",
    "胶层开口只是图形依据；刻蚀说明如何转移到目标材料。"
  ],
  "etch": [
    "掩膜是保护非目标区域的材料；光刻胶可以承担此功能，但掩膜不等于光罩。",
    "#fab-lithography",
    "implant",
    "移除材料改变结构；接着对比不以改变外形为目的的材料改性。"
  ],
  "implant": [
    "电流是电荷的定向运动；掺杂是受控引入少量特定成分，用于调节材料的导电特性；这与在表面增加一层膜不同。",
    "#circuit-basics",
    "anneal",
    "注入后可能需要热处理，以修复损伤并促进掺杂激活。"
  ],
  "anneal": [
    "晶格指原子排列结构；激活指掺杂原子进入能发挥预期电学作用的状态。",
    "#fab-implant",
    "interconnect",
    "理解器件材料状态后，再看如何将器件连接成电路。"
  ],
  "cmp": [
    "平坦化调整表面高度差；凹槽内所需材料与表面多余覆盖材料需要区分。",
    "#fab-interconnect",
    "feedback",
    "加工结果需用量测与检测评估，不能仅凭画面判断合格。"
  ],
  "interconnect": [
    "器件承担功能，互连提供电流通路；通孔连接不同高度的布线层。",
    "#circuit-basics",
    "cmp",
    "多层结构需要适当的表面状态，平坦化说明如何处理多余材料。"
  ],
  "transfer": [
    "载具保护并承载多片晶圆；设备机械手通常按任务搬送单片。",
    "#chapter-4",
    "wafer-testing",
    "传输贯穿制造；接着了解制造完成后如何检查与分离电路单元。"
  ],
  "feedback": [
    "量测得到参数，缺陷检测寻找异常，电气测试检查电路响应；三者不等同。",
    "#fab-film",
    "transfer",
    "获得信息与搬送晶圆都是制造支撑任务，不能当作直接改变结构的工艺。"
  ],
  "wafer-testing": [
    "裸片是晶圆上制造并分离出的电路单元；测试读取响应，不制造电路。",
    "#chapter-1",
    "packaging",
    "分离得到裸片后，需要对外连接与保护，并进行成品测试。"
  ],
  "packaging": [
    "封装基板承载并连接裸片，不是最初加工器件的晶圆衬底。",
    "#wafer-testing",
    null,
    "已经覆盖从设计、材料到成品的主线，可返回全景对照各环节任务。"
  ]
};
const choice = new URL(location.href).searchParams.get("process");
const content = document.getElementById("detailContent");
const message = document.getElementById("detailMessage");
const reading = document.getElementById("readingFallback");
async function showStep() {
  if (!Object.hasOwn(steps, choice)) {
    document.getElementById("detailTitle").textContent = "请选择流程环节";
    message.textContent = "未找到指定环节。请返回制造流程图，选择需要了解的流程。";
    content.setAttribute("aria-busy", "false");
    return;
  }
  content.setAttribute("aria-busy", "true");
  const step = steps[choice];
  document.title = step.title + " · 流程详情 · 半导体，从零开始";
  document.getElementById("detailTitle").textContent = step.title;
  document.getElementById("detailContext").textContent = step.group + " / " + step.title;
  reading.href = "/chapters.html" + step.target;
  try {
    const response = await fetch("/chapters.html", {cache:"no-store"});
    if (!response.ok) throw new Error("Chapter unavailable");
    const chapters = new DOMParser().parseFromString(await response.text(), "text/html");
    content.replaceChildren();
    for (const selector of [step.target, ...(step.more || [])]) {
      const original = chapters.querySelector(selector);
      if (!original) throw new Error("Section unavailable");
      const explanation = original.cloneNode(true);
      explanation.querySelectorAll(".chapter-navigation,.equipment-entry").forEach(n => n.remove());
      if (explanation.matches(".reading-block,.lesson-section")) {
        const heading = explanation.querySelector(":scope>h3");
        if (heading) {
          const title = document.createElement("h2");
          if (heading.id) title.id = heading.id;
          title.textContent = heading.textContent.replace(/^\d{2}\s+/, "");
          heading.replaceWith(title);
        }
      }
      explanation.querySelectorAll(".transfer-section>h4,.device-chain>h4,.preparation-topic>h4").forEach(heading => {
        const title = document.createElement("h3"); if (heading.id) title.id = heading.id;
        title.textContent = heading.textContent; heading.replaceWith(title);
      });
      // Chapter-only fragments must still lead to the full reading context.
      explanation.querySelectorAll('a[href^="#"]').forEach(a => a.setAttribute("href", "/chapters.html" + a.getAttribute("href")));
      content.append(explanation);
      if (selector === step.target && !explanation.querySelector(".source-line")) {
        const source = original.closest("section.chapter").querySelector(":scope>.source-line");
        if (source) content.append(source.cloneNode(true));
      }
    }
    const animations = document.getElementById("detailAnimations");
    animations.hidden = step.lessons.length === 0;
    for (const [lesson, label] of step.lessons) {
      const link = document.createElement("a");
      link.className = "button";
      link.href = (lesson === "lithography" ? "/lithography.html?from=" : "/process.html?lesson=" + lesson + "&from=") + choice;
      link.textContent = "观看" + label + "演示 →";
      animations.append(link);
    }
    const [definition, anchor, next, connection] = learning[choice];
    const prerequisite = document.getElementById("detailPrerequisite");
    prerequisite.textContent = "阅读前先明确：" + definition + " ";
    const basics = document.createElement("a"); basics.href = "/chapters.html" + anchor;
    basics.textContent = "补充基础解释 →"; prerequisite.append(basics); prerequisite.hidden = false;
    document.getElementById("learningConnection").textContent = connection;
    const nextLink = document.getElementById("nextLearning");
    nextLink.href = next ? "/step.html?process=" + next : "/learn.html#manufacturingFlow";
    nextLink.textContent = next ? "继续了解" + steps[next].title + " →" : "返回制造流程全景 →";
    document.getElementById("learningNext").hidden = false;
    message.hidden = true;
    content.dataset.process = choice;
  } catch {
    message.textContent = "本环节暂时未能载入。可使用下方“阅读完整章节”查看同一份讲解，或刷新后重试。";
  } finally {
    content.setAttribute("aria-busy", "false");
  }
}
showStep();
