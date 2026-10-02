# Task Plan: Windows启动与停止脚本格式修复

## Goal
保留全部中文提示和原命令，将两份批处理规范为UTF-8无BOM、CRLF，并验证CMD解析正常，不影响正式8787。

## Next Step
交付修复结果；当前正式服务无需重启。

## Current Phase
Complete

## Phases

### Phase 1: Requirements & Discovery
Status: complete
脚本均为UTF-8/LF；当前正式PID21936。安全副本替换浏览器、Node、停止进程及pause动作。

### Phase 2: Implementation
Status: complete
备份两份原文件，使用格式转换命令统一CRLF，无命令变更。

### Phase 3: Testing & Delivery
Status: complete
936/437初始代码页各验证两份安全脚本，中文、stderr、退出码及文件编码检查；核对PID及HTTP200。

## Decisions Made
不改网站、server.mjs和现有启动/停止行为，不实际运行停止服务脚本。

## Errors Encountered
| Error | Attempt | Resolution |
| --- | --- | --- |
| Node默认参数引用给CMD传入反斜杠引号，测试副本未执行 | 1 | 使用windowsVerbatimArguments按CMD语法传参后再复现 |
