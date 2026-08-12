(() => {
const $ = s => document.querySelector(s);
const ui = {
  stateZip: $('#stateZip'), federalZip: $('#federalZip'), stateFileName: $('#stateFileName'),
  federalFileName: $('#federalFileName'), zipSummary: $('#zipSummary'),
  makeFeed: $('#makeFeed'), makeStory: $('#makeStory'), onlyDeputies: $('#onlyDeputies'),
  legalText: $('#legalText'), generateAll: $('#generateAll'), cancelBatch: $('#cancelBatch'),
  batchTitle: $('#batchTitle'), counter: $('#counter'), progressBar: $('#progressBar'),
  doneCount: $('#doneCount'), errorCount: $('#errorCount'), timeCount: $('#timeCount'),
  currentName: $('#currentName'), currentStep: $('#currentStep'), previewCanvas: $('#previewCanvas'),
  log: $('#log'), clearLog: $('#clearLog'), resultCard: $('#resultCard'),
  resultText: $('#resultText'), downloadZip: $('#downloadZip')
};

let stateFiles = new Map(), federalFiles = new Map(), cancelRequested = false, finalZipBlob = null;
let templates = {}, renanImg = null, timerStart = 0, timerHandle = null;
const pctx = ui.previewCanvas.getContext('2d');

const dimensions = { feed:[1080,1350], story:[1080,1920] };
const renanLayout = {
  feed:{x:575,y:205,w:335,h:555,scale:1.00},
  story:{x:585,y:330,w:340,h:590,scale:1.00}
};

function normalizeName(s){
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()
    .replace(/\.(jpg|jpeg|png|webp|heic)$/,'')
    .replace(/\b(deputado|deputada|estadual|federal|foto|final|editada|tratada)\b/g,' ')
    .replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' ');
}
function slug(s){ return normalizeName(s).replace(/\s+/g,'-'); }
function log(msg,type='info'){
  const d=document.createElement('div'); d.className=`log-line log-${type}`; d.textContent=`${new Date().toLocaleTimeString()}  ${msg}`;
  ui.log.appendChild(d); ui.log.scrollTop=ui.log.scrollHeight;
}
function setStep(name,step){ ui.currentName.textContent=name; ui.currentStep.textContent=step; }
function img(src,cross=true){
  return new Promise((resolve,reject)=>{const i=new Image(); if(cross)i.crossOrigin='anonymous'; i.onload=()=>resolve(i); i.onerror=reject; i.src=src;});
}
function fileToImage(file){
  return new Promise((resolve,reject)=>{const u=URL.createObjectURL(file); const i=new Image(); i.onload=()=>{resolve({image:i,url:u})}; i.onerror=e=>{URL.revokeObjectURL(u);reject(e)}; i.src=u;});
}
async function loadTemplates(){
  if(templates.feed) return;
  templates.feed=await img('/gerador/assets/template-feed.jpg',false);
  templates.story=await img('/gerador/assets/template-story.jpg',false);
  renanImg=await img('/gerador/assets/renan-bust.png',false);
}
async function parseZip(input, map, labelEl){
  const f=input.files[0]; if(!f)return;
  labelEl.textContent=f.name;
  map.clear();
  log(`Lendo ${f.name}...`);
  const zip=await JSZip.loadAsync(f);
  const entries=Object.values(zip.files).filter(x=>!x.dir && /\.(jpg|jpeg|png|webp)$/i.test(x.name) && !x.name.includes('__MACOSX') && !/\/\._/.test(x.name));
  for(const entry of entries){
    const blob=await entry.async('blob');
    const key=normalizeName(entry.name.split('/').pop());
    map.set(key,new File([blob],entry.name.split('/').pop(),{type:blob.type||'image/jpeg'}));
  }
  log(`${entries.length} imagens encontradas em ${f.name}.`,'ok');
  ui.zipSummary.textContent=`Fotos carregadas: ${stateFiles.size} estaduais + ${federalFiles.size} federais.`;
}
ui.stateZip.addEventListener('change',()=>parseZip(ui.stateZip,stateFiles,ui.stateFileName));
ui.federalZip.addEventListener('change',()=>parseZip(ui.federalZip,federalFiles,ui.federalFileName));
ui.clearLog.onclick=()=>ui.log.innerHTML='';
ui.cancelBatch.onclick=()=>{cancelRequested=true;ui.cancelBatch.disabled=true;log('Interrupção solicitada. O lote vai parar após o candidato atual.','info')};

function findLocalFile(candidate){
  const map=candidate.role.toLowerCase().includes('estadual')?stateFiles:federalFiles;
  if(!map.size) return null;
  const target=normalizeName(candidate.name).replace(/\b(jr|junior)\b/g,'junior').trim();
  let best=null,bestScore=-1;
  for(const [k,file] of map.entries()){
    const kk=k.replace(/\b(jr|junior)\b/g,'junior').trim();
    if(kk===target) return file;
    const a=new Set(target.split(' ')), b=new Set(kk.split(' '));
    let score=0; for(const token of a) if(b.has(token)) score++;
    if(target.includes(kk)||kk.includes(target))score+=3;
    if(score>bestScore){bestScore=score;best=file}
  }
  return bestScore>=2?best:null;
}
async function getCandidateImage(candidate){
  const local=findLocalFile(candidate);
  if(local){
    const got=await fileToImage(local);
    return {image:got.image, cleanup:()=>URL.revokeObjectURL(got.url), source:'ZIP'};
  }
  try{
    const i=await img(candidate.photo,true);
    return {image:i,cleanup:()=>{},source:'site'};
  }catch{}
  if(candidate.fallback){
    const i=await img(candidate.fallback,false);
    return {image:i,cleanup:()=>{},source:'fallback'};
  }
  throw new Error('Foto não encontrada no ZIP nem no site');
}
function imageToBlob(image){
  const c=document.createElement('canvas'); c.width=image.naturalWidth||image.width; c.height=image.naturalHeight||image.height;
  c.getContext('2d').drawImage(image,0,0);
  return new Promise(r=>c.toBlob(r,'image/png',1));
}
async function removeBackgroundAI(image,name){
  setStep(name,'IA removendo o fundo...');
  const mod=await import('https://esm.sh/@imgly/background-removal@1.7.0');
  const blob=await imageToBlob(image);
  const out=await mod.removeBackground(blob,{
    progress:(key,current,total)=>{ if(total) ui.currentStep.textContent=`IA removendo fundo — ${Math.min(100,Math.round(current/total*100))}%`; }
  });
  const u=URL.createObjectURL(out), i=await img(u,false);
  return {image:i,cleanup:()=>URL.revokeObjectURL(u)};
}
function alphaCrop(image){
  const c=document.createElement('canvas'), w=image.naturalWidth||image.width,h=image.naturalHeight||image.height;
  c.width=w;c.height=h;const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(image,0,0);
  const data=x.getImageData(0,0,w,h).data;
  let minX=w,minY=h,maxX=-1,maxY=-1;
  for(let yy=0;yy<h;yy+=2){
    for(let xx=0;xx<w;xx+=2){
      if(data[(yy*w+xx)*4+3]>20){if(xx<minX)minX=xx;if(xx>maxX)maxX=xx;if(yy<minY)minY=yy;if(yy>maxY)maxY=yy;}
    }
  }
  if(maxX<0)return image;
  const padX=Math.round((maxX-minX)*.025),padY=Math.round((maxY-minY)*.025);
  minX=Math.max(0,minX-padX);minY=Math.max(0,minY-padY);maxX=Math.min(w-1,maxX+padX);maxY=Math.min(h-1,maxY+padY);
  const out=document.createElement('canvas');out.width=maxX-minX+1;out.height=maxY-minY+1;
  out.getContext('2d').drawImage(c,minX,minY,out.width,out.height,0,0,out.width,out.height);
  return out;
}
function cover(ctx,image,x,y,w,h,scale=1,dx=0,dy=0,anchor='bottom-center'){
  const iw=image.width||image.naturalWidth, ih=image.height||image.naturalHeight,ir=iw/ih,br=w/h;let dw,dh;
  if(ir>br){dh=h*scale;dw=dh*ir}else{dw=w*scale;dh=dw/ir}
  let px=x+(w-dw)/2+dx,py=y+(h-dh)/2+dy;if(anchor==='bottom-center')py=y+h-dh+dy;
  ctx.drawImage(image,px,py,dw,dh);
}

function drawCandidateSmart(ctx,image,format){
  const iw=image.width||image.naturalWidth, ih=image.height||image.naturalHeight;
  const ratio=iw/ih;

  // Approved composition target: candidate occupies left half, from near top to just behind the text.
  const zone = format==='feed'
    ? {x:92,y:150,w:590,h:755,bottom:905}
    : {x:82,y:270,w:610,h:835,bottom:1250};

  // Full-body/narrow cutouts get more height; headshot/wide cutouts get less.
  let targetH;
  if(ratio < 0.42) targetH = zone.h * 1.03;       // full body / very narrow
  else if(ratio < 0.62) targetH = zone.h * 0.96;  // half body
  else if(ratio < 0.82) targetH = zone.h * 0.88;  // portrait
  else targetH = zone.h * 0.78;                   // head & shoulders / very wide

  let dw = targetH * ratio, dh = targetH;

  // Never let a wide headshot swallow the layout.
  const maxW = format==='feed' ? 610 : 630;
  if(dw > maxW){
    const k=maxW/dw; dw*=k; dh*=k;
  }

  // Slightly more left bias, candidate anchored to bottom.
  let px = zone.x + (zone.w - dw) * 0.36;
  let py = zone.bottom - dh;

  // Guardrails so the head does not get chopped.
  const minY = format==='feed' ? 160 : 280;
  if(py < minY){
    const delta=minY-py;
    py=minY;
    // Reduce height a little if necessary to stay inside the composition.
    if(delta>20){
      const maxH=zone.bottom-minY;
      const k=maxH/dh; dw*=k; dh*=k;
    }
  }

  ctx.drawImage(image,px,py,dw,dh);
}

function fitText(ctx,text,maxWidth,startSize,font){
  let s=startSize; do{ctx.font=`${s}px ${font}`; if(ctx.measureText(text).width<=maxWidth)return s;s-=2;}while(s>22);return s;
}
async function renderArt(candidate,cutout,format,legal){
  const [w,h]=dimensions[format],c=document.createElement('canvas');c.width=w;c.height=h;const ctx=c.getContext('2d');
  if(document.fonts)await Promise.allSettled([document.fonts.load('100px Anton'),document.fonts.load('700 48px Oswald')]);
  ctx.drawImage(templates[format],0,0,w,h);
  ctx.save();
  if(format==='feed'){
    ctx.beginPath();ctx.roundRect(104,156,861,790,48);ctx.clip();
  }else{
    ctx.beginPath();ctx.roundRect(104,268,852,812,48);ctx.clip();
  }
  drawCandidateSmart(ctx,cutout,format);
  const r=renanLayout[format];cover(ctx,renanImg,r.x,r.y,r.w,r.h,r.scale,0,0);
  ctx.restore();

  const gradTop=format==='feed'?720:990,gradHeight=format==='feed'?390:500;
  const grad=ctx.createLinearGradient(0,gradTop,0,gradTop+gradHeight);
  grad.addColorStop(0,'rgba(0,0,0,0)');grad.addColorStop(.35,'rgba(0,0,0,.70)');grad.addColorStop(1,'rgba(0,0,0,.96)');
  ctx.fillStyle=grad;ctx.fillRect(0,gradTop,w,gradHeight);

  const name=candidate.name.toUpperCase().replace('WAGNER JR.','WAGNER JUNIOR');
  ctx.textAlign='center';ctx.textBaseline='alphabetic';
  if(format==='feed'){
    ctx.fillStyle='#f2b705';ctx.strokeStyle='rgba(0,0,0,.45)';ctx.lineWidth=4;
    let s=fitText(ctx,name,880,94,'Anton');ctx.font=`${s}px Anton`;ctx.strokeText(name,550,920);ctx.fillText(name,550,920);
    ctx.fillStyle='#fff';s=fitText(ctx,candidate.number,800,205,'Anton');ctx.font=`${s}px Anton`;ctx.fillText(candidate.number,548,1092);
    ctx.fillStyle='#090909';ctx.font='700 40px Oswald';ctx.fillText(candidate.role.toUpperCase(),548,1197);
  }else{
    ctx.fillStyle='#f2b705';ctx.strokeStyle='rgba(0,0,0,.45)';ctx.lineWidth=4;
    let s=fitText(ctx,name,880,98,'Anton');ctx.font=`${s}px Anton`;ctx.strokeText(name,540,1260);ctx.fillText(name,540,1260);
    ctx.fillStyle='#fff';s=fitText(ctx,candidate.number,805,215,'Anton');ctx.font=`${s}px Anton`;ctx.fillText(candidate.number,540,1495);
    ctx.fillStyle='#090909';ctx.font='700 43px Oswald';ctx.fillText(candidate.role.toUpperCase(),540,1590);
  }
  if(legal.trim()){
    ctx.save();ctx.translate(48,format==='feed'?772:1002);ctx.rotate(-Math.PI/2);ctx.textAlign='center';ctx.fillStyle='#fff';ctx.font='500 17px Oswald';
    ctx.fillText(`ELEIÇÃO 2026 ${candidate.name.toUpperCase()} ${legal.toUpperCase()}`,0,0);ctx.restore();
  }
  return c;
}
function canvasBlob(canvas,type='image/jpeg',quality=.94){return new Promise(r=>canvas.toBlob(r,type,quality));}
function showPreview(canvas){ui.previewCanvas.width=canvas.width;ui.previewCanvas.height=canvas.height;pctx.clearRect(0,0,canvas.width,canvas.height);pctx.drawImage(canvas,0,0);}
function updateStats(done,errors,total){
  ui.doneCount.textContent=done;ui.errorCount.textContent=errors;ui.counter.textContent=`${done+errors} / ${total}`;
  ui.progressBar.style.width=`${total?((done+errors)/total)*100:0}%`;
}
function timerStartFn(){timerStart=Date.now();clearInterval(timerHandle);timerHandle=setInterval(()=>{const s=Math.floor((Date.now()-timerStart)/1000);ui.timeCount.textContent=`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`},1000)}
function timerStop(){clearInterval(timerHandle);timerHandle=null;}

ui.generateAll.onclick=async()=>{
  if(!ui.makeFeed.checked && !ui.makeStory.checked){alert('Marque Feed, Story ou ambos.');return;}
  cancelRequested=false;finalZipBlob=null;ui.downloadZip.disabled=true;ui.resultCard.classList.add('hidden');
  ui.generateAll.disabled=true;ui.cancelBatch.disabled=false;ui.log.innerHTML='';
  await loadTemplates();

  let candidates=window.GERADOR_CANDIDATOS.filter(c=>{
    if(!ui.onlyDeputies.checked)return true;
    const r=c.role.toLowerCase();return r.includes('estadual')||r.includes('federal');
  });
  const zip=new JSZip(),feedFolder=zip.folder('FEED'),storyFolder=zip.folder('STORY'),errorsFolder=zip.folder('_ERROS');
  let done=0,errors=0;updateStats(done,errors,candidates.length);ui.batchTitle.textContent='Processando';timerStartFn();
  log(`Lote iniciado com ${candidates.length} candidatos.`,'info');

  for(let i=0;i<candidates.length;i++){
    if(cancelRequested){log('Lote interrompido pelo usuário.','info');break;}
    const c=candidates[i];setStep(c.name,'Carregando foto...');
    try{
      const source=await getCandidateImage(c);log(`${c.name}: foto carregada (${source.source}).`);
      const ai=await removeBackgroundAI(source.image,c.name);source.cleanup();
      setStep(c.name,'IA calculando enquadramento...');
      const cut=alphaCrop(ai.image);
      let lastCanvas=null;
      if(ui.makeFeed.checked){
        setStep(c.name,'Gerando Feed...');
        const art=await renderArt(c,cut,'feed',ui.legalText.value);lastCanvas=art;
        const blob=await canvasBlob(art);feedFolder.file(`${slug(c.name)}-${c.number}-feed.jpg`,blob);
      }
      if(ui.makeStory.checked){
        setStep(c.name,'Gerando Story...');
        const art=await renderArt(c,cut,'story',ui.legalText.value);lastCanvas=art;
        const blob=await canvasBlob(art);storyFolder.file(`${slug(c.name)}-${c.number}-story.jpg`,blob);
      }
      if(lastCanvas)showPreview(lastCanvas);
      ai.cleanup();done++;log(`${c.name}: concluído.`,'ok');
    }catch(err){
      errors++;log(`${c.name}: ERRO — ${err.message||err}`,'error');
      errorsFolder.file(`${slug(c.name)}.txt`,String(err.stack||err.message||err));
    }
    updateStats(done,errors,candidates.length);
  }

  setStep('Compactando arquivos','Gerando ZIP final...');
  ui.batchTitle.textContent='Compactando ZIP';
  try{
    finalZipBlob=await zip.generateAsync({type:'blob',compression:'DEFLATE',compressionOptions:{level:6}},meta=>{
      ui.currentStep.textContent=`Compactando ZIP — ${Math.round(meta.percent)}%`;
    });
    ui.downloadZip.disabled=false;ui.resultCard.classList.remove('hidden');
    ui.resultText.textContent=`${done} candidatos concluídos e ${errors} com erro. Clique abaixo para baixar o lote.`;
    ui.batchTitle.textContent=cancelRequested?'Lote interrompido':'Lote concluído';
    setStep('Pronto','ZIP final disponível para download.');
    log('ZIP final pronto.','ok');
  }catch(err){log(`Erro ao compactar ZIP: ${err.message||err}`,'error');ui.batchTitle.textContent='Erro ao compactar';}
  timerStop();ui.generateAll.disabled=false;ui.cancelBatch.disabled=true;
};

ui.downloadZip.onclick=()=>{
  if(!finalZipBlob)return;
  const a=document.createElement('a'),u=URL.createObjectURL(finalZipBlob);
  const d=new Date().toISOString().slice(0,10);
  a.href=u;a.download=`artes-missao-parana-${d}.zip`;a.click();setTimeout(()=>URL.revokeObjectURL(u),4000);
};
})();