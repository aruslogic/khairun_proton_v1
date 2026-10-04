import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const c=vm.createContext({});
for(const p of ['catalog.js','showroom-data.js','showroom.js'])vm.runInContext(fs.readFileSync(p,'utf8'),c);
const {SHOWROOM_DATA:d,Showroom:s,PM}=c;
for(const [id,m] of Object.entries(d.models)){
 assert.deepEqual(JSON.parse(JSON.stringify(m)),JSON.parse(fs.readFileSync('data/'+id+'.json','utf8')),'Regenerate showroom-data.js after JSON changes');
 assert.deepEqual(Array.from(m.variants,v=>v.name),Array.from(PM.get(id).variants));
 assert.ok(m.priceSource.startsWith('https://')&&m.brochure.startsWith('https://cms-assets.proton.com/'));
 for(const v of m.variants){assert.ok(v.price>0);assert.ok([5,6,7].includes(v.seats));assert.equal(typeof v.aeb,'boolean');assert.equal(typeof v.acc,'boolean');assert.ok(v.safety.length>0);}
 for(const kind of ['interior','exterior'])assert.ok(fs.statSync(`assets/gallery/${id}-${kind}.webp`).size>1000);
}
assert.equal(d.models.s70.variants[0].price,59800,'Never silently use introductory rebate price');
assert.equal(d.models.x70.variants[0].price,106800);
assert.equal(d.models.x90.variants[0].price,106800);
assert.equal(d.models.x90.variants[2].seats,6);
assert.ok(d.models.x90.variants.every(v=>!v.aeb&&!v.acc));
const r=s.calculate(50000,5000,3,9);
assert.equal(r.principal,45000);assert.equal(r.interest,12150);assert.equal(r.total,57150);assert.equal(r.monthly,529.1666666666666);
assert.equal(s.calculate(50000,50000,3,9).monthly,0);
assert.equal(s.calculate(50000,0,0,5).monthly,50000/60);
for(const a of [[50000,-1,3,9],[50000,50001,3,9],[50000,5000,-1,9],[50000,5000,3,0],[NaN,0,3,9],[50000,NaN,3,9],[50000,0,Infinity,9]])assert.equal(s.calculate(...a),null);
const future=new Date(Date.now()+86400000*2).toISOString().slice(0,10);
const input={name:'Aina & Ali',model:'s70',variant:'1.5 Prime',date:future,time:'15:30'};
const msg=s.testDriveMessage(input);assert.match(msg,/Aina & Ali/);assert.match(msg,/1.5 Prime/);assert.match(msg,/15:30/);
for(const patch of [{name:'  '},{model:'toyota'},{variant:'retired'},{date:'2020-01-01'},{date:'2099-02-31'},{time:'25:60'}])assert.equal(s.testDriveMessage({...input,...patch}),null);
console.log('PASS: JSON parity, lineup, official base prices, X90 seating/ADAS, gallery files, loan boundaries and test-drive validation.');
