import {createServer} from "node:net";
import {spawn} from "node:child_process";
import {setTimeout as sleep} from "node:timers/promises";
import {pathToFileURL} from "node:url";
import path from "node:path";

const probe=createServer();
await new Promise(r=>probe.listen(0,"127.0.0.1",r));
const port=probe.address().port;
await new Promise(r=>probe.close(r));
const ownedServer=spawn(process.execPath,["server.mjs"],{env:{...process.env,PORT:String(port),HOST:"127.0.0.1"},windowsHide:true,stdio:"ignore"});
process.env.APP_URL="http://127.0.0.1:"+port;
try {
  let ready=false;
  for(let i=0;i<50;i++) {try{ready=(await fetch(process.env.APP_URL)).status===200;}catch{}if(ready)break;await sleep(100);}
  if(!ready)throw Error("Temporary verification server failed");
  const tests=process.argv.includes("--targeted")?["product-review-fixes"]:process.argv.includes("--baseline")?["beginner-learning"]:["product-review-fixes","beginner-learning"];
  for(const name of tests) {
    console.log("Verifying: "+name+" on temporary port "+port);
    await import(pathToFileURL(path.resolve("tests/"+name+".mjs")));
  }
} finally {ownedServer.kill();}
