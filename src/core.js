export const SCHEMA=1;
export const emptyLesson=()=>({answers:{},applications:{},studied:false,decision:false,signature:'',additional:false,selfCheck:[-1,-1,-1]});
export function progress(lessons){return Object.values(lessons).filter(x=>x.studied).length;}
const str=(v,max=10000)=>typeof v==='string'&&v.length<=max;
export function validateFile(v){
 if(!v||v.app!=='la-fe-de-jesus'||v.schema!==SCHEMA)throw Error('format');
 if(v.type==='invitation'){
  if(!str(v.instructor,120)||!str(v.invitationId,100))throw Error('invitation');
  return {app:v.app,schema:SCHEMA,type:'invitation',instructor:v.instructor,invitationId:v.invitationId};
 }
 if(v.type!=='records'||!Array.isArray(v.records)||v.records.length>200)throw Error('records');
 return {app:v.app,schema:SCHEMA,type:'records',records:v.records.map(r=>{
  if(!r||!str(r.id,100)||!str(r.name,120)||!r.lessons||typeof r.lessons!=='object'||Array.isArray(r.lessons))throw Error('record');
  const lessons={};for(const [id,l] of Object.entries(r.lessons)){
   if(!/^(?:[1-9]|1\d|20)$/.test(id)||!l||typeof l!=='object')throw Error('lesson');
   const n=emptyLesson();
   for(const k of ['studied','decision','additional']){if(typeof l[k]!=='boolean')throw Error(k);n[k]=l[k];}
   if(!str(l.signature,120))throw Error('signature');n.signature=l.signature;
   for(let i=1;i<=6;i++){const a=l.answers?.['q'+i];if(a!==undefined){if(!str(a))throw Error('answer');n.answers['q'+i]=a;}}
   for(let i=1;i<=4;i++){const a=l.applications?.['a'+i];if(a!==undefined){if(typeof a!=='boolean')throw Error('application');n.applications['a'+i]=a;}}
   if(!Array.isArray(l.selfCheck)||l.selfCheck.length>3||l.selfCheck.some(x=>!Number.isInteger(x)||x< -1||x>2))throw Error('selfCheck');n.selfCheck=[...l.selfCheck];
   lessons[id]=n;
  }return {id:r.id,name:r.name,lessons,instructor:str(r.instructor,120)?r.instructor:'',church:str(r.church,120)?r.church:'',notes:str(r.notes)?r.notes:'',importedAt:new Date().toISOString()};
 })};
}
export function envelope(records){return {app:'la-fe-de-jesus',schema:SCHEMA,type:'records',exportedAt:new Date().toISOString(),records};}
