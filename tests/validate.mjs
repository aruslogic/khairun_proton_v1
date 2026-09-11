import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const exists=p=>assert.ok(fs.existsSync(path.join(root,p)),`Missing: ${p}`);
const manifest=JSON.parse(read('manifest.json'));
assert.equal(manifest.scope,'./');assert.equal(manifest.start_url,'./#home');
for(const i of manifest.icons){exists(i.src);const b=fs.readFileSync(path.join(root,i.src));assert.equal(b.toString('hex',0,8),'89504e470d0a1a0a');assert.equal(`${b.readUInt32BE(16)}x${b.readUInt32BE(20)}`,i.sizes);}
for(const p of ['app.js','catalog.js','pwa.js','sw.js'])new vm.Script(read(p),{filename:p});
for(const [,p]of read('index.html').matchAll(/(?:href|src)="([^"]+)"/g))if(!p.startsWith('#')&&!/^https?:/.test(p))exists(p);
const cat=vm.createContext({});vm.runInContext(read('catalog.js'),cat);
const PM=cat.PM;
assert.deepEqual(Array.from(PM.allowedIds),['saga','s70','x50','x70','x90']);
for(const id of ['toyota','emas','persona','iriz','__proto__'])assert.equal(PM.get(id),undefined);
for(const m of PM.catalog)exists(`assets/${m.id}.png`);
assert.deepEqual(Array.from(PM.match(['Keluarga','7',['Ruang'],'SUV']),x=>x.model.id),['x90']);
assert.ok(!PM.variants(PM.get('x90'),'7').includes('1.5TD Prime X'));
function render(route,saved=null){
 const events={},nodes=new Map();
 const node=id=>{if(!nodes.has(id))nodes.set(id,{innerHTML:'',textContent:'',href:'',hidden:false,classList:{toggle(){},remove(){}},dataset:{},focus(){},insertAdjacentHTML(_pos,h){this.innerHTML+=h},querySelector(){return node('child')},addEventListener(type,fn){events[id+':'+type]=fn}});return nodes.get(id)};
 const app=node('app');
 const c=vm.createContext({console,PM,document:{getElementById:node,body:{dataset:{}}},location:{hash:'#'+route},sessionStorage:{getItem:()=>saved,setItem(){},removeItem(){}},window:{addEventListener(){},scrollTo(){}},history:{back(){}},navigator:{clipboard:{writeText:async()=>{}}},alert(){},confirm:()=>true});
 vm.runInContext(read('app.js'),c);
 return {app,nodes,events};
}
const valid={answers:['Keluarga','7',['Ruang'],'SUV'],selected:'x90',variant:'1.5TD Prime',compare:['saga','x90'],trade:'yes',old:{brand:'Perodua',model:'Myvi',year:'2018',mileage:'90000',loan:'Ya'}};
for(const route of ['home','catalog','question/0','question/1','question/2','question/3','results','compare','summary',...PM.allowedIds.map(x=>'model/'+x)])assert.ok(render(route,JSON.stringify(valid)).app.innerHTML.length>100,route);
for(const bad of ['{',JSON.stringify({answers:[null,null,null,null],compare:[null],purpose:'<script>alert(1)</script>'}),JSON.stringify({answers:['<img>',{},['<svg>'],'SUV'],old:{brand:{bad:true}}})]){
 for(const route of ['home','question/2','summary','results'])assert.doesNotThrow(()=>render(route,bad));
}
assert.match(render('model/toyota').app.innerHTML,/Pilihan tidak tersedia/);
const summary=render('summary',JSON.stringify(valid));
const url=new URL(summary.nodes.get('whatsapp-link').href);
assert.equal(url.hostname,'wa.me');assert.equal(url.pathname,'/60172032996');
assert.match(url.searchParams.get('text'),/Myvi/);assert.match(url.searchParams.get('text'),/1.5TD Prime/);
const privateSummary=render('summary',JSON.stringify({...valid,share:false,tradeShare:false}));
assert.doesNotMatch(privateSummary.nodes.get('message').textContent,/Myvi|Varian:|Penggunaan:/);
// Exercise service-worker lifecycle and scoped cache cleanup without network access.
const listeners={},removed=[],requests=[];
const scope='https://aruslogic.github.io/khairun-proton/';
const cache={addAll:async list=>{for(const p of list)exists(p==='./'?'index.html':p)},match:async url=>({cached:url})};
const worker=vm.createContext({URL,Set,self:{registration:{scope},location:{origin:'https://aruslogic.github.io'},clients:{claim:async()=>{}},skipWaiting(){},addEventListener:(k,f)=>listeners[k]=f},caches:{open:async()=>cache,keys:async()=>['other-project','khairun-proton:'+scope+':old'],delete:async x=>removed.push(x)},fetch:async x=>{requests.push(x);return {network:true}}});
vm.runInContext(read('sw.js'),worker);
await new Promise((resolve,reject)=>listeners.install({waitUntil:p=>p.then(resolve,reject)}));
await new Promise((resolve,reject)=>listeners.activate({waitUntil:p=>p.then(resolve,reject)}));
assert.deepEqual(removed,['khairun-proton:'+scope+':old']);
let response;
listeners.fetch({request:{method:'GET',url:scope+'app.js'},respondWith:p=>response=p});assert.ok((await response).cached);
for(const url of ['https://wa.me/60172032996','https://aruslogic.github.io/another/app.js'])listeners.fetch({request:{method:'GET',url},respondWith:()=>assert.fail('Outside scope intercepted')});
assert.equal(requests.length,0);
// Common credential signatures and accidental private configuration.
for(const p of ['index.html','app.js','catalog.js','pwa.js','sw.js','manifest.json','style.css','khairun.css'])assert.doesNotMatch(read(p),/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|sk-proj-[A-Za-z0-9_-]{20,}/,p);
assert.ok(!fs.existsSync(path.join(root,'.env')));
console.log('PASS: syntax, local assets, icon dimensions, manifest, 5-model allowlist, 7-seat filter, 14 routes, malformed sessions, WhatsApp context/privacy, service-worker install/cache isolation, credential signatures.');
