/* Local beginner-learning site. Run: node server.mjs */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PUBLIC_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "public");
const PORT = Number(process.env.PORT || 8787);
const HOST = process.env.HOST || "127.0.0.1";
const FILES = new Set(["learn.html", "chapters.html", "step.html", "step.js", "learning.css", "process.html", "process.js", "lithography.html", "lithography.js"]);
const MIME = {".html":"text/html; charset=utf-8", ".js":"text/javascript; charset=utf-8", ".css":"text/css; charset=utf-8"};

const server = http.createServer((req, res) => {
  function send(code, body, type = "text/plain; charset=utf-8") {
    res.writeHead(code, {"Content-Type":type, "Cache-Control":"no-store"});
    res.end(req.method === "HEAD" ? undefined : body);
  }
  try {
    let url, pathname;
    try {
      url = new URL(req.url, `http://${req.headers.host}`);
      pathname = decodeURIComponent(url.pathname);
    } catch {
      return send(400, "请求地址格式无效。");
    }
    if (pathname.startsWith("/api/")) return send(410, "旧工艺查询台及数据接口已移除。");
    if (!["GET", "HEAD"].includes(req.method)) {
      res.setHeader("Allow", "GET, HEAD");
      return send(405, "此地址不支持该请求方法。");
    }
    if (pathname === "/index.html" || (pathname === "/" && url.search)) {
      res.writeHead(308, {"Location":"/", "Cache-Control":"no-store"});
      return res.end();
    }
    const filename = pathname === "/" ? "learn.html" : pathname.slice(1);
    if (!FILES.has(filename)) return send(404, "Not found");
    const file = path.join(PUBLIC_DIR, filename);
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) return send(404, "Not found");
    return send(200, fs.readFileSync(file), MIME[path.extname(file)]);
  } catch {
    return send(500, "页面暂时无法读取。");
  }
});

server.listen(PORT, HOST, () => {
  console.log("半导体，从零开始 · 本地教学网站");
  console.log("  地址：http://" + HOST + ":" + PORT);
});
