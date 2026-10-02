import assert from "node:assert/strict";
import fs from "node:fs";

const base = process.env.APP_URL || "http://127.0.0.1:8787";
const root = await fetch(base + "/");
assert.equal(root.status, 200);
assert.equal(await root.text(), fs.readFileSync("public/learn.html", "utf8"));
const old = await fetch(base + "/?sort=auto&tab=all&active=%E8%96%84%E8%86%9C%E6%B2%89%E7%A7%AF");
assert.equal(new URL(old.url).pathname + new URL(old.url).search, "/");
assert.equal(await old.text(), fs.readFileSync("public/learn.html", "utf8"));
const legacy = await fetch(base + "/index.html", {redirect:"manual"});
assert.equal(legacy.status, 308);
assert.equal(legacy.headers.get("location"), "/");
for (const resource of ["/app.js", "/styles.css", "/data/chipdb.sqlite", "/seed-data.mjs", "/../server.mjs", "/%5c..%5cserver.mjs", "/retired-query-console-20261002/before/chipdb.sqlite"]) {
  assert.equal((await fetch(base + resource)).status, 404, resource);
}
for (const endpoint of ["flow", "stats", "records", "compare", "rank", "facets", "vendors", "vendor/ASML", "segment/光刻", "audit", "sources", "sources/1", "queries", "export.csv"]) {
  const response = await fetch(base + "/api/" + endpoint);
  assert.equal(response.status, 410, endpoint);
  assert.equal(await response.text(), "旧工艺查询台及数据接口已移除。");
}
assert.equal((await fetch(base + "/api/sources/1", {method:"PUT", body:"{}"})).status, 410);
assert.equal((await fetch(base + "/", {method:"POST"})).status, 405);
assert.equal((await fetch(base + "/%zz")).status, 400);
const head = await fetch(base + "/chapters.html", {method:"HEAD"});
assert.equal(head.status, 200);
assert.equal(await head.text(), "");
const pages = ["learn.html", "chapters.html", "step.html", "process.html", "lithography.html"];
for (const file of pages) {
  const source = fs.readFileSync("public/" + file, "utf8");
  assert.ok(!source.includes('class="reference-link"') && !source.includes('href="/"'), file + " no query navigation");
  assert.ok(!/href="\/\?[^"\n]*\b(?:tab|active|panel)=/.test(source), file + " no retired query parameter navigation");
  assert.ok(!source.includes("再进入独立查询工具") && !source.includes("独立查询光刻资料"), file + " no retired feature promise");
  for (const match of source.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
    assert.equal((await fetch(base + match[1])).status, 200, file + " -> " + match[1]);
  }
}
for (const file of ["data", "db.mjs", "seed-data.mjs", "enrichment.mjs", "search.mjs", "record-info.mjs", "source-maintenance.mjs", "handoffs.mjs", "vendors.mjs", "public/index.html", "public/app.js", "public/styles.css"]) {
  assert.ok(!fs.existsSync(file), file + " removed from active app");
}
assert.ok(!/node:sqlite|openDb|seed\(/.test(fs.readFileSync("server.mjs", "utf8")), "no database or seed runtime");
assert.ok(!fs.existsSync("data"), "HTTP checks did not regenerate old data");
console.log("Retired console: clean teaching root, removed pages/data/APIs, no stale links or reseeding, HTTP boundaries passed.");
