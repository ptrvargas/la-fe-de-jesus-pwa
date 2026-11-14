import test from 'node:test';import assert from 'node:assert/strict';import {JSDOM} from 'jsdom';import {indexedDB} from 'fake-indexeddb';import fs from 'node:fs/promises';import {webcrypto} from 'node:crypto';
const pause=()=>new Promise(r=>setTimeout(r,40));
test('DOM integration: navigation, bilingual persistence, voluntary decision, import, invitation and restoration',async()=>{
 const dom=new JSDOM('<div id="app"></div><p id="status"></p>',{url:'https://example.test/la-fe-de-jesus-pwa/'});const w=dom.window;
 for(const [key,value] of Object.entries({window:w,document:w.document,indexedDB,location:w.location,File:w.File,Blob:w.Blob,navigator:w.navigator,crypto:webcrypto,fetch:async url=>{const file=new URL('../'+url.replace(/^\.\//,''),import.meta.url);return {ok:true,json:async()=>JSON.parse(await fs.readFile(file,'utf8'))};}}))Object.defineProperty(globalThis,key,{value,configurable:true,writable:true});
 w.HTMLElement.prototype.scrollIntoView=function(){};
 await import('../src/app.js');await pause();const $=s=>w.document.querySelector(s),change=(s,value)=>{const e=$(s);e.value=value;e.dispatchEvent(new w.Event('change',{bubbles:true}));},input=(s,value)=>{const e=$(s);e.value=value;e.dispatchEvent(new w.Event('input',{bubbles:true}));},click=s=>$(s).click();
 assert.equal($('h1').textContent,'Conoce al Dios que te ama.');assert.equal(w.document.querySelectorAll('textarea[data-answer]').length,6);
 input('#q1','Un solo Dios.');input('#name','Estudiante de prueba');input('#church','Iglesia de prueba');await pause();
 const {readState}=await import('../src/db.js');assert.equal((await readState()).records[0].lessons[1].answers.q1,'Un solo Dios.');
 click('[data-tab="1"]');assert.equal(w.document.querySelectorAll('[data-application]').length,4);click('[data-tab="2"]');assert.equal($('#decision').checked,false);click('[data-tab="3"]');assert.equal(w.document.querySelectorAll('.additional').length,4);click('#additional');await pause();assert.equal((await readState()).records[0].lessons[1].decision,false);assert.equal((await readState()).records[0].lessons[1].additional,true);
 change('#language','en');await pause();assert.equal(w.document.documentElement.lang,'en');assert.match($('h1').textContent,/Meet the God/);click('[data-tab="0"]');assert.equal($('#q1').value,'Un solo Dios.');
 change('#mode','instructor');await pause();assert.equal($('.instructor-tools').hidden,false);assert.equal($('#q1').value,'Un solo Dios.');
 const {envelope}=await import('../src/core.js');const file={size:100,text:async()=>JSON.stringify(envelope((await readState()).records))};Object.defineProperty($('#import'),'files',{value:[file]});$('#import').dispatchEvent(new w.Event('change'));await pause();assert.equal((await readState()).records.length,2);
 click('[data-review="1"]');assert.equal($('#q1').disabled,true);assert.equal($('#q1').value,'Un solo Dios.');click('#restore');await pause();assert.equal($('#q1').disabled,false);assert.equal((await readState()).records.length,2);
 const invitation={size:100,text:async()=>JSON.stringify({app:'la-fe-de-jesus',schema:1,type:'invitation',instructor:'Teacher',invitationId:'test'})};Object.defineProperty($('#import'),'files',{value:[invitation]});$('#import').dispatchEvent(new w.Event('change'));await pause();assert.equal($('#mode').value,'accompanied');assert.equal($('#teacher').value,'Teacher');assert.equal($('#q1').value,'Un solo Dios.');
 click('[data-ref]');assert.match($('.passage-panel iframe').getAttribute('src'),/lang=en/);assert(!$('.passage-panel iframe').getAttribute('sandbox').includes('allow-same-origin'));click('.close-passage');assert.equal($('.passage-panel'),null);
 const bad={size:50,text:async()=>'{}'};Object.defineProperty($('#import'),'files',{value:[bad]});$('#import').dispatchEvent(new w.Event('change'));await pause();assert.match($('#status').textContent,/Invalid file/);assert.equal((await readState()).records.length,2);
 // Reinitialize the app module against the same database to simulate document restart.
 await import('../src/app.js?reload');await pause();assert.equal($('#q1').value,'Un solo Dios.');assert.equal($('#mode').value,'accompanied');
});
