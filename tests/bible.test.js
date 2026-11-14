import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {JSDOM} from 'jsdom';
const html=await fs.readFile(new URL('../bible.html',import.meta.url),'utf8');
// Model the official tool's target-open/document-close event behavior.
// The fixture contains no Bible text and does not substitute for live verification.
function provider(w){const d=w.document,container=d.createElement('div');container.id='bg_popup-container';d.body.append(container);const popup=d.createElement('div');popup.className='bg_popup-outer';popup.textContent='PROVIDER TEST FIXTURE';container.append(popup);let clicks=0;d.getElementById('passage').addEventListener('click',()=>{clicks++;popup.style.display='block';});d.addEventListener('click',()=>{popup.style.display='none';});return {popup,get clicks(){return clicks;}};}
for(const [lang,version] of [['es','RVR1960'],['en','NIV']])test(`official click stays open in ${lang}; translation and fallback retained`,()=>{
 const dom=new JSDOM(html,{url:`https://example.test/bible.html?ref=Ephesians%204:6&lang=${lang}`,runScripts:'dangerously'}),w=dom.window;let tool;w.BGLinks={linkVerses(){tool=provider(w);}};const script=w.document.querySelector('script[src]');script.dispatchEvent(new w.Event('load'));
 assert.equal(w.BGLinks.version,version);assert.equal(w.BGLinks.clickTooltip,true);assert.equal(tool.clicks,1);assert.equal(tool.popup.style.display,'block');
 const a=w.document.getElementById('passage'),event=new w.MouseEvent('click',{bubbles:true,cancelable:true});a.dispatchEvent(event);assert.equal(event.defaultPrevented,true);assert.equal(tool.clicks,2);assert.equal(tool.popup.style.display,'block');assert.match(a.href,new RegExp('version='+version));dom.window.close();
});
test('provider load failure gives a readable error and keeps a direct link',()=>{const dom=new JSDOM(html,{url:'https://example.test/bible.html?lang=es',runScripts:'dangerously'});dom.window.document.querySelector('script[src]').dispatchEvent(new dom.window.Event('error'));assert.match(dom.window.document.getElementById('hint').textContent,/No se pudo mostrar/);assert.match(dom.window.document.getElementById('passage').href,/biblegateway.com\/passage/);dom.window.close();});
