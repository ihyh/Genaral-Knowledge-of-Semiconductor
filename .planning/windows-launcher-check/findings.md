# Findings & Decisions

## Requirements
修复用户截图中的启动批处理乱码命令报错；同时修复停止脚本的相同格式问题。

## Research Findings
两份原文件UTF-8无BOM，仅LF；chcp65001在第二行。截图显示前两行中文被当命令，之后Node正常运行。此时8787由21936监听，实测HTTP200。格式转换需保持其他字节内容不变。

有效安全复现：936初始代码页下两份LF脚本报错，437下停止脚本报错；启动脚本437下通过。统一CRLF后四项均退出0、stderr为空、中文完整。两份命令文本逐字比较一致，只更改换行字节；保持UTF-8无BOM。正式服务仍由21936监听且HTTP200。

## Technical Decisions
保留中文及原命令，用CRLF；测试使用副本禁用所有真实服务操作，生成副本只允许echo/chcp/cd。

## Issues Encountered
首次隔离调用因Node对CMD参数的引号转义失败，不能把这个结果当成脚本复现；已调整调用方式，需重新观察。

## Resources
tests/windows-launchers.mjs；before.json与after.json保存实际输出；before/存原文件。
