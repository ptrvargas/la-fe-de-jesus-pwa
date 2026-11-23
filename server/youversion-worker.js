import {ALLOWED_PASSAGES} from './allowed-passages.js';
const VERSIONS={es:128,en:111};
const ALLOWED_CHAPTERS=new Set(ALLOWED_PASSAGES.map(p=>p.split('.').slice(0,2).join('.')));
// No logs, database, user accounts, request bodies, or persistent Scripture cache.
export default {async fetch(request,env){
 const url=new URL(request.url);
 const origin=request.headers.get('Origin')||(request.headers.get('Sec-Fetch-Site')==='same-origin'?url.origin:null);
 const allowed=(env.ALLOWED_ORIGINS||'').split(',').map(s=>s.trim()).filter(Boolean);
 const headers={'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Vary':'Origin'};
 const reply=(status,error,diagnostic)=>new Response(JSON.stringify({error,...(diagnostic?{diagnostic}:{})}),{status,headers});
 if(!origin||!allowed.includes(origin))return reply(403,'origin');
 headers['Access-Control-Expose-Headers']='Retry-After';headers['Access-Control-Allow-Origin']=origin;headers['Access-Control-Allow-Methods']='GET, OPTIONS';
 const fonts=url.pathname==='/bible-fonts.css';
 if(!['/passage','/bible-fonts.css'].includes(url.pathname)||url.username||url.password)return reply(404,'route');
 if(request.method==='OPTIONS')return new Response(null,{status:204,headers});
 if(request.method!=='GET')return reply(405,'method');
 const lang=url.searchParams.get('lang'),passage=url.searchParams.get('passage');
 if(fonts&&url.search)return reply(400,'reference');
 if(!fonts&&([...url.searchParams.keys()].some(k=>!['lang','passage'].includes(k))||url.searchParams.getAll('lang').length!==1||url.searchParams.getAll('passage').length!==1||!Object.hasOwn(VERSIONS,lang)||(!ALLOWED_PASSAGES.includes(passage)&&!ALLOWED_CHAPTERS.has(passage))))return reply(400,'reference');
 if(!env.YVP_APP_KEY||!env.PASSAGE_RATE_LIMITER)return reply(503,'configuration');
 // Mandatory platform limiter: CORS alone is not protection against quota abuse.
 const ip=request.headers.get('CF-Connecting-IP');if(!ip)return reply(503,'rate-limit-configuration');
 const limited=await env.PASSAGE_RATE_LIMITER.limit({key:ip});if(!limited.success){headers['Retry-After']='60';return reply(429,'rate_limit',{source:'worker',retryAfter:60});}
 const version=VERSIONS[lang],auth={'X-YVP-App-Key':env.YVP_APP_KEY};
 let stage='metadata';
 const get=async(path,format='json')=>{const response=await fetch(`https://api.youversion.com/v1/${path}`,{headers:auth,redirect:'manual',signal:AbortSignal.timeout(8000),cache:'no-store'});if(!response.ok){const raw=response.headers.get('Retry-After');let retryAfter=null;if(raw){const seconds=/^\d+$/.test(raw.trim())?Number(raw):Math.ceil((Date.parse(raw)-Date.now())/1000);if(Number.isSafeInteger(seconds)&&seconds>0)retryAfter=seconds;}throw {status:response.status,retryAfter};}return format==='css'?response.text():response.json();};
 try{
  if(fonts){stage='font-stylesheet';const css=await get('fonts/1/stylesheet','css');if(typeof css!=='string'||css.length>32000||css.includes(env.YVP_APP_KEY)||css.includes(encodeURIComponent(env.YVP_APP_KEY))||/@import/i.test(css))return reply(502,'font-stylesheet');for(const item of css.matchAll(/url\(([^)]+)\)/gi)){try{const u=new URL(item[1].trim().replace(/^["']|["']$/g,''));if(u.protocol!=='https:'||u.hostname!=='cdn.youversion.com')return reply(502,'font-stylesheet');}catch{return reply(502,'font-stylesheet');}}return new Response(css,{headers:{...headers,'Content-Type':'text/css; charset=utf-8'}});}
  // Fresh licensed version metadata first. Never fetch content after a denied license.
  const metadata=await get(`bibles/${version}`),attribution=metadata.copyright?.trim()||metadata.promotional_content?.trim();
  if(!attribution)return reply(502,'attribution');
  stage='passage';
  const result=await get(`bibles/${version}/passages/${encodeURIComponent(passage)}?format=html&include_headings=false&include_notes=false`);
  if(typeof result.content!=='string'||!result.content.trim())return reply(502,'content');
  return new Response(JSON.stringify({versionId:version,passageId:passage,html:result.content,attribution}),{headers});
 }catch(error){if(error.status===429&&error.retryAfter)headers['Retry-After']=String(error.retryAfter);const status=[401,403,404,429].includes(error.status)?error.status:502;const upstreamStatus=Number.isInteger(error.status)&&error.status>=100&&error.status<=599?error.status:null;const kind=upstreamStatus?'http':error.name==='TimeoutError'?'timeout':error.name==='SyntaxError'?'json':/cache/i.test(error.message||'')?'cache-option':error.name==='TypeError'?'type-or-network':'technical';return reply(status,status===401?'authentication':status===403?'license':status===404?'unavailable':status===429?'rate_limit':'upstream',{stage,kind,upstreamStatus,...(status===429?{source:'youversion',retryAfter:error.retryAfter||null}:{})});}
}};
