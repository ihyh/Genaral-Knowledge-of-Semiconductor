# 部署到公网

本站是**纯静态站点**：`public/` 下 12 个文件、约 304 KB，没有任何后端接口、数据库或构建步骤。
`server.mjs` 只是本机预览用的静态服务器，公网部署时**可以完全不用它**。

发布前请先提交当前改动（本机有 33 个未提交文件，部署平台是按仓库内容发布的）：

```
git add -A && git commit -m "2D 机构剖面演示与界面精简" && git push
```

---

## 方案 A：拖拽发布（最快，约 3 分钟）

适合马上把链接发人。

1. 打开 https://app.netlify.com/drop （免费账号，用 GitHub 登录即可）
2. 把本目录下的 **`public` 文件夹**整个拖进去
3. 立刻得到一个 `https://xxx.netlify.app` 公网地址，自带 HTTPS

> 拖的是 `public`，不是项目根目录——根目录里有 `.planning`、`docs`、`tests` 等开发文件，不应公开。
> 云flare 的对应做法：Cloudflare Dashboard → Pages → Upload assets，同样拖 `public`。

## 方案 B：连接仓库自动部署（推荐长期使用）

1. 先把仓库推送到 GitHub（见上方命令）
2. Cloudflare Pages 或 Netlify 里选「Import from Git」，授权 `ihyh/Genaral-Knowledge-of-Semiconductor`
3. 构建设置：
   - Build command：**留空**
   - Output / Publish directory：**public**
4. 之后每次 `git push` 自动重新发布；可绑定自己的域名

仓库里已放好 [netlify.toml](netlify.toml)（Netlify 会自动识别 `publish = "public"`）。

## 方案 C：自己的服务器 / 云主机

仓库里已提供 [Dockerfile](Dockerfile)（用同一份 `server.mjs`，监听 `0.0.0.0`）：

```
docker build -t semi-site .
docker run -d -p 80:8787 --name semi-site semi-site
```

建议前面加一层 Nginx/Caddy 反向代理并启用 HTTPS。注意 `server.mjs` 只提供白名单内的 12 个教学文件，
不提供目录列表、不执行脚本，暴露公网的风险面很小；但它没有访问控制与限流，公开站点请自行评估。

## 方案 D：临时公网链接（不部署，本机当服务器）

```
# 安装一次（需要外网）
winget install --id Cloudflare.cloudflared
# 本机先启动站点：双击 启动App.bat
cloudflared tunnel --url http://127.0.0.1:8787
```

会输出一个 `https://xxx.trycloudflare.com` 临时地址，关掉窗口即失效，且**你的电脑必须保持开机**。
适合给一两个人临时看，不适合正式发布。

---

## ⚠️ GitHub Pages 的路径限制

本站页面里用的是**根路径**（`/learning.css`、`/step.html?process=film`）。
GitHub Pages 的**项目站点**地址形如 `https://ihyh.github.io/Genaral-Knowledge-of-Semiconductor/`，
位于子路径下，根路径资源会 404。三种解法：

1. 用方案 A/B 的根域名托管（最省事，推荐）
2. GitHub Pages 绑定自定义域名（域名解析到 Pages，根路径可用）
3. 把仓库改名为 `ihyh.github.io`（变成用户站点，地址在根）
4. 或者让我把全站路径改成相对路径（我可以做，但要同步改一批测试断言）

## 发布前后检查清单

- [ ] 已 `git commit`（否则平台发布的是旧版本）
- [ ] 发布目录选的是 `public`，不是仓库根目录
- [ ] 打开首页、任意流程详情、任意演示页各点一遍（内嵌演示依赖 iframe + `fetch`，静态托管下均可用）
- [ ] 不需要配置任何环境变量；没有数据库、没有密钥、没有第三方脚本
- [ ] 站内没有个人隐私信息（无账号、无埋点、无统计）
