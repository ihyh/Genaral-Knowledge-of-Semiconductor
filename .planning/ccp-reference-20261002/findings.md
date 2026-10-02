# Findings & Decisions

## Requirements
用户认为现有动画初学者不易理解，希望参考双射频CCP刻蚀科普动画，核心是设备内部如何加工晶圆。

## Research Findings
本地视频20522702字节已可读。无头Edge本地解码成功，时长22.8333秒、1902×854，生成20个关键帧。已查看第0、5、10、15、19帧：录屏仅覆盖后半段鞘层建立、离子加速、表面反应和副产物排出，不能据此声称看到完整教程、听到旁白或确定双射频接线。系统无ffmpeg，Python已有Pillow/Numpy但无视频解码库。开始时Git main与origin/main一致且工作树干净。

参考采用深色二维剖面，蓝色电子、橙色正离子、绿色自由基、白色副产物分别具有不同运动；进度条强调当前机制；从等离子体区域切换至晶圆表面放大，三个开口中的刻蚀槽连续加深，材料保持一致。领导线指向真实目标，说明文字随阶段变化。鞘层电压和离子能量分布图是专业辅助内容，不适合未经铺垫直接放给零基础用户。

## Technical Decisions
从已有教学测试复用无头Edge/CDP启动与截图能力，只做本地视频解码；媒体仅通过临时127.0.0.1端口供应，无外部上传。改造范围先限定刻蚀样板。
不复制视频画面、作者标识、社交界面或素材；借鉴因果叙事与图示方法，以自主代码构建演示。新增工艺原理需核对第一手资料；动画须标注教学示意，不能伪装为实际物理仿真。

## Resources
用户提供的本地MP4；public/process.js、public/lithography.js和tests/beginner-learning.mjs。
原理核实：Lam Research https://newsroom.lamresearch.com/etch-essentials-semiconductor-manufacturing （等离子体产生离子与自由基，离子/中性粒子协同，挥发副产物排出）；密歇根大学研究组 https://cpseg.eecs.umich.edu/Projects/WAVE_EFFECTS/wave_effects_v02.html （高低频的主要调节目标及耦合）。保留来源链接、教学边界，不指定工艺配方或把动画速度当实际速度。

## 全演示改造（2026-10-02）
已有10个共享主题，加独立光刻共11个待改造主题；独立刻蚀样板保留，合计12项。阶段文字、材料含义、来源和进入上下文已有成熟数据，优先复用，不能只换皮而仍用低多边形三维画面。
以现有process.js保存主题/场景、lithography.js改作共享SVG播放控制器，现有process.html和lithography.html复用etch.css样板风格。不新增依赖和路由资产，现有8787静态文件实时读盘，不需要为增加新资产重新开放服务白名单。
已读取SUMCO晶圆流程、ASM ALD、ASML光刻、TEL CELLESTA以及Applied Materials改性/退火/CMP、Amkor倒装连接一手页面。材料制备需要炉/切片/抛光工位切换；CMP加工面朝下而材料图翻回朝上；正性胶曝光不能提前产生空洞；倒装互连不能额外强加引线键合。原文中的教学简化边界继续保留。
