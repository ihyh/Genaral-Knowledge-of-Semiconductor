import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import path from 'node:path';

const observe=process.argv.includes('--observe');
const out=path.resolve('.planning/windows-launcher-check');
mkdirSync(out,{recursive:true});
const results=[];
for(const name of ['启动App.bat','停止服务.bat']){
  const bytes=readFileSync(name),text=bytes.toString('utf8');
  if(!observe){
    assert.notEqual(bytes.subarray(0,3).toString('hex'),'efbbbf',name+' has no BOM');
    assert.ok(!/(?<!\r)\n|\r(?!\n)/.test(text),name+' uses CRLF');
    assert.deepEqual(Buffer.from(text,'utf8'),bytes,name+' valid UTF-8');
  }
  // Test CMD parsing only: never open a browser, run Node, pause, or kill a process.
  const safe=text.replace(/^start .*$/m,'echo MOCK_BROWSER')
    .replace(/^node server\.mjs\r?$/m,'echo MOCK_SERVER')
    .replace(/^for \/f .*$/m,'echo MOCK_STOP')
    .replace(/^pause\r?$/m,'echo MOCK_PAUSE');
  for(const line of safe.split(/\r?\n/))assert.ok(!line || /^(?:@echo off|chcp 65001 >nul|cd \/d "%~dp0"|echo(?: |$))/.test(line),'safe command only: '+line);
  for(const codepage of [936,437]){
    const sample=path.join(out,codepage+'-'+name);
    // Preserve the original newline bytes, including CR removed by a mocked line replacement.
    const normalizedSafe=safe.replace(/\r?\n/g,text.includes('\r\n')?'\r\n':'\n');
    writeFileSync(sample,normalizedSafe,'utf8');
    const child=spawnSync(process.env.ComSpec || 'cmd.exe',['/d','/c',`chcp ${codepage} >nul & call "${sample}"`],{windowsVerbatimArguments:true,windowsHide:true,timeout:10000,encoding:'utf8'});
    if(child.error)throw child.error;
    const result={name,codepage,status:child.status,stdout:child.stdout,stderr:child.stderr};
    results.push(result);
    if(!observe){
      assert.equal(child.status,0,name+' exits normally');
      assert.equal(child.stderr,'',name+' no invalid commands');
      assert.ok(child.stdout.includes(name==='启动App.bat'?'半导体，从零开始':'正在停止 半导体教学网站'),name+' Chinese text intact');
      assert.ok(child.stdout.includes(name==='启动App.bat'?'MOCK_SERVER':'MOCK_STOP'),name+' reaches safe final action');
    }
  }
}
writeFileSync(path.join(out,observe?'before.json':'after.json'),JSON.stringify({passed:!observe,results},null,2));
console.log(JSON.stringify({observe,passed:!observe,checks:results.length,results},null,2));
