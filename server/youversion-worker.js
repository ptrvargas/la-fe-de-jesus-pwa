import {ALLOWED_PASSAGES} from './allowed-passages.js';
const VERSIONS={es:2664,en:111};
// No logs, database, user accounts, request bodies, or persistent Scripture cache.
export default {async fetch(request,env){
 const url=new URL(request.url);
 const origin=request.headers.get('Origin')||(request.headers.get('Sec-Fetch-Site')==='same-origin'?url.origin:null);
 const allowed=(env.ALLOWED_ORIGINS||'').split(',').map(s=>s.trim()).filter(Boolean);
 const headers={'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Vary':'Origin'};
 const reply=(status,error,diagnostic)=>new Response(JSON.stringify({error,...(diagnostic?{diagnostic}:{})}),{status,headers});
 if(!origin||!allowed.includes(origin))return reply(403,'origin');
 headers['Access-Control-Allow-Origin']=origin;headers['Access-Control-Allow-Methods']='GET, OPTIONS';
 if(url.pathname!=='/passage'||url.username||url.password)return reply(404,'route');
 if(request.method==='OPTIONS')return new Response(null,{status:204,headers});
 if(request.method!=='GET')return reply(405,'method');
 const lang=url.searchParams.get('lang'),passage=url.searchParams.get('passage');
 if([...url.searchParams.keys()].some(k=>!['lang','passage'].includes(k))||url.searchParams.getAll('lang').length!==1||url.searchParams.getAll('passage').length!==1||!Object.hasOwn(VERSIONS,lang)||!ALLOWED_PASSAGES.includes(passage))return reply(400,'reference');
 if(!env.YVP_APP_KEY||!env.PASSAGE_RATE_LIMITER)return reply(503,'configuration');
 // Mandatory platform limiter: CORS alone is not protection against quota abuse.
 const ip=request.headers.get('CF-Connecting-IP');if(!ip)return reply(503,'rate-limit-configuration');
 const limited=await env.PASSAGE_RATE_LIMITER.limit({key:ip});if(!limited.success)return reply(429,'rate_limit');
 const version=VERSIONS[lang],auth={'X-YVP-App-Key':env.YVP_APP_KEY};
 let stage='metadata';
 const get=async path=>{const response=await fetch(`https://api.youversion.com/v1/${path}`,{headers:auth,redirect:'error',signal:AbortSignal.timeout(8000),cache:'no-store'});if(!response.ok)throw {status:response.status};return response.json();};
 try{
  // Fresh licensed version metadata first. Never fetch content after a denied license.
  const metadata=await get(`bibles/${version}`),attribution=metadata.copyright?.trim()||metadata.promotional_content?.trim();
  if(!attribution)return reply(502,'attribution');
  stage='passage';
  const result=await get(`bibles/${version}/passages/${encodeURIComponent(passage)}?format=html&include_headings=false&include_notes=false`);
  if(typeof result.content!=='string'||!result.content.trim())return reply(502,'content');
  return new Response(JSON.stringify({versionId:version,passageId:passage,html:result.content,attribution}),{headers});
 }catch(error){const status=[401,403,404,429].includes(error.status)?error.status:502;const upstreamStatus=Number.isInteger(error.status)&&error.status>=100&&error.status<=599?error.status:null;const kind=upstreamStatus?'http':error.name==='TimeoutError'?'timeout':error.name==='SyntaxError'?'json':/cache/i.test(error.message||'')?'cache-option':error.name==='TypeError'?'type-or-network':'technical';return reply(status,status===401?'authentication':status===403?'license':status===404?'unavailable':status===429?'rate_limit':'upstream',{stage,kind,upstreamStatus});}
}};
