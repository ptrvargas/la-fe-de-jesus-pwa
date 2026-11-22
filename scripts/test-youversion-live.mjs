// Opt-in network test. Secret comes from the process environment only.
// Never outputs credentials, response bodies, request headers or upstream errors.
const key=process.env.YVP_APP_KEY;
if(!key){console.log('NO COMPROBADO: falta el secreto YVP_APP_KEY.');process.exit(2);}
let all=true;
for(const [name,id] of [['NVI 2025',128],['NIV 2011',111]]){
 try{
  const options={headers:{'X-YVP-App-Key':key},redirect:'error',signal:AbortSignal.timeout(10000),cache:'no-store'};
  const metadata=await fetch(`https://api.youversion.com/v1/bibles/${id}`,options);
  if(!metadata.ok){all=false;console.log(`${name}: ${metadata.status===401?'autenticación rechazada':metadata.status===403?'requiere permiso de licencia':'fallo técnico'} (HTTP ${metadata.status}).`);continue;}
  const version=await metadata.json();if(!(version.copyright?.trim()||version.promotional_content?.trim())){all=false;console.log(`${name}: atribución no disponible.`);continue;}
  const r=await fetch(`https://api.youversion.com/v1/bibles/${id}/passages/JHN.3.16?format=html&include_headings=false&include_notes=false`,{...options,signal:AbortSignal.timeout(10000)});
  if(!r.ok){all=false;console.log(`${name}: ${r.status===401?'autenticación rechazada':r.status===403?'requiere permiso de licencia':'fallo técnico'} (HTTP ${r.status}).`);continue;}
  const passage=await r.json();if(typeof passage.content!=='string'||!passage.content.trim()){all=false;console.log(`${name}: contenido vacío o inválido.`);continue;}
  console.log(`${name}: funciona (HTTP 200; contenido y atribución presentes).`);
 }catch{all=false;console.log(`${name}: fallo técnico de red o respuesta.`);}
}
process.exitCode=all?0:1;
