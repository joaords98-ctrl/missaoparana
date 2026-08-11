(() => {
const $=s=>document.querySelector(s), canvas=$('#canvas'),ctx=canvas.getContext('2d');
const e={
  candidate:$('#candidate'),role:$('#role'),number:$('#number'),cnpj:$('#cnpj'),
  photoInput:$('#photoInput'),uploadBtn:$('#uploadBtn'),
  removeBgBtn:$('#removeBgBtn'),removeRenanBgBtn:$('#removeRenanBgBtn'),
  photoStatus:$('#photoStatus'),renanStatus:$('#renanStatus'),
  download:$('#download'),downloadBoth:$('#downloadBoth'),
  refresh:$('#refresh'),candScale:$('#candScale'),renanScale:$('#renanScale'),
  candX:$('#candX'),candY:$('#candY'),renanX:$('#renanX'),renanY:$('#renanY'),
  previewLabel:$('#previewLabel')
};

let format='feed', candidateImg=null, renanImg=null, candidateObjectUrl=null;
const dimensions={feed:[1080,1350],story:[1080,1920]}, templateImgs={};

const defaults = {
  feed: { candScale:1.45, renanScale:1.42, candX:-38, candY:18, renanX:86, renanY:8 },
  story:{ candScale:1.44, renanScale:1.48, candX:-42, candY:12, renanX:102, renanY:6 }
};

function loadImg(src,cross=true){
  return new Promise((res,rej)=>{const i=new Image(); if(cross) i.crossOrigin='anonymous'; i.onload=()=>res(i); i.onerror=rej; i.src=src;});
}
function sel(){ return window.GERADOR_CANDIDATOS[+e.candidate.value]; }
function key(){ return 'gerador-cnpj:'+sel().slug; }
function mask(v){
  const d=v.replace(/\D/g,'').slice(0,14);
  return d.replace(/^(\d{2})(\d)/,'$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/,'$1.$2.$3')
    .replace(/\.(\d{3})(\d)/,'.$1/$2')
    .replace(/(\d{4})(\d)/,'$1-$2');
}
function stateKey(){ return `gerador-layout:${sel().slug}:${format}`; }
function getState(){
  try { return JSON.parse(localStorage.getItem(stateKey()) || 'null'); } catch { return null; }
}
function saveState(){
  const payload = {
    candScale:+e.candScale.value, renanScale:+e.renanScale.value,
    candX:+e.candX.value, candY:+e.candY.value,
    renanX:+e.renanX.value, renanY:+e.renanY.value
  };
  localStorage.setItem(stateKey(), JSON.stringify(payload));
}
function applyStateOrDefaults(){
  const saved = getState();
  const d = defaults[format];
  const data = saved || d;
  e.candScale.value = data.candScale;
  e.renanScale.value = data.renanScale;
  e.candX.value = data.candX;
  e.candY.value = data.candY;
  e.renanX.value = data.renanX;
  e.renanY.value = data.renanY;
}

async function init(){
  window.GERADOR_CANDIDATOS.forEach((c,i)=>{
    const o=document.createElement('option');
    o.value=i; o.textContent=`${c.name} — ${c.number}`;
    e.candidate.appendChild(o);
  });
  e.candidate.value=Math.max(0,window.GERADOR_CANDIDATOS.findIndex(c=>c.slug==='wagner-jr'));
  bind();
  templateImgs.feed=await loadImg('/gerador/assets/template-feed.jpg',false);
  templateImgs.story=await loadImg('/gerador/assets/template-story.jpg',false);
  renanImg=await loadImg('/gerador/assets/renan.jpg',false);
  await chooseCandidate();
}
function bind(){
  e.candidate.onchange=chooseCandidate;
  ['role','number','cnpj'].forEach(k=>e[k].addEventListener('input',()=>{
    if(k==='cnpj'){ e.cnpj.value=mask(e.cnpj.value); localStorage.setItem(key(), e.cnpj.value); }
    draw();
  }));
  ['candScale','renanScale','candX','candY','renanX','renanY'].forEach(k=>e[k].addEventListener('input',()=>{
    saveState(); draw();
  }));
  document.querySelectorAll('.format').forEach(b=>b.onclick=()=>setFormat(b.dataset.format));
  e.uploadBtn.onclick=()=>e.photoInput.click();
  e.photoInput.onchange=async()=>{
    const f=e.photoInput.files[0]; if(!f) return;
    if(candidateObjectUrl) URL.revokeObjectURL(candidateObjectUrl);
    candidateObjectUrl=URL.createObjectURL(f);
    candidateImg=await loadImg(candidateObjectUrl,false);
    e.photoStatus.textContent='Foto carregada manualmente.';
    draw();
  };
  e.removeBgBtn.onclick=()=>removeBg('candidate');
  e.removeRenanBgBtn.onclick=()=>removeBg('renan');
  e.refresh.onclick=draw;
  e.download.onclick=downloadCurrent;
  e.downloadBoth.onclick=async()=>{
    const old=format;
    setFormat('feed'); await wait(150); downloadCurrent();
    await wait(320);
    setFormat('story'); await wait(150); downloadCurrent();
    setFormat(old);
  };
}
async function chooseCandidate(){
  const c=sel();
  e.role.value=c.role;
  e.number.value=c.number;
  e.cnpj.value=localStorage.getItem(key())||'';
  candidateImg=null;
  e.photoStatus.textContent='Tentando carregar foto já existente no site…';
  try{
    candidateImg=await loadImg(c.photo,true);
    e.photoStatus.textContent='Foto carregada do site.';
  }catch(err){
    if(c.fallback){
      try{
        candidateImg=await loadImg(c.fallback,false);
        e.photoStatus.textContent='Foto de teste carregada.';
      }catch{}
    }
    if(!candidateImg) e.photoStatus.textContent='Foto não localizada. Clique em “Trocar foto”.';
  }
  applyStateOrDefaults();
  draw();
}
function setFormat(f){
  format=f;
  document.querySelectorAll('.format').forEach(b=>b.classList.toggle('active',b.dataset.format===f));
  const [w,h]=dimensions[f];
  canvas.width=w; canvas.height=h;
  e.previewLabel.textContent=`${f==='feed'?'Feed':'Story'} ${w}×${h}`;
  applyStateOrDefaults();
  draw();
}
function cover(image,x,y,w,h,scale=1,dx=0,dy=0,anchor='center'){
  if(!image) return;
  const ir=image.width/image.height, br=w/h;
  let dw, dh;
  if(ir>br){ dh=h*scale; dw=dh*ir; } else { dw=w*scale; dh=dw/ir; }
  let px=x+(w-dw)/2+dx, py=y+(h-dh)/2+dy;
  if(anchor==='bottom-center') py=y+h-dh+dy;
  if(anchor==='bottom-left') { px=x+dx; py=y+h-dh+dy; }
  ctx.drawImage(image,px,py,dw,dh);
}
function fit(text,max,start,font){
  let s=start;
  do{
    ctx.font=`${s}px ${font}`;
    if(ctx.measureText(text).width<=max) return s;
    s-=2;
  }while(s>24);
  return s;
}
async function draw(){
  if(!templateImgs[format]) return;
  if(document.fonts) await Promise.allSettled([
    document.fonts.load('100px Anton'),
    document.fonts.load('700 48px Oswald')
  ]);

  const c=sel(), [w,h]=dimensions[format];
  ctx.clearRect(0,0,w,h);
  ctx.drawImage(templateImgs[format],0,0,w,h);

  // Portrait montage zone tuned to provided layout
  ctx.save();
  if(format==='feed'){
    ctx.beginPath(); ctx.roundRect(104,156,861,790,48); ctx.clip();
    // candidate left, bigger and lower
    cover(candidateImg,38,124,560,760,+e.candScale.value,+e.candX.value,+e.candY.value,'bottom-center');
    // Renan right, bigger and aligned
    cover(renanImg,522,170,365,655,+e.renanScale.value,+e.renanX.value,+e.renanY.value,'bottom-center');
  } else {
    ctx.beginPath(); ctx.roundRect(104,268,852,812,48); ctx.clip();
    cover(candidateImg,24,238,590,820,+e.candScale.value,+e.candX.value,+e.candY.value,'bottom-center');
    cover(renanImg,535,305,365,680,+e.renanScale.value,+e.renanX.value,+e.renanY.value,'bottom-center');
  }
  ctx.restore();

  // Dark gradient behind title/number for readability
  const gradTop = format==='feed' ? 760 : 1040;
  const gradHeight = format==='feed' ? 330 : 420;
  const grad = ctx.createLinearGradient(0, gradTop, 0, gradTop + gradHeight);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(0.35, 'rgba(0,0,0,0.70)');
  grad.addColorStop(1, 'rgba(0,0,0,0.96)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, gradTop, w, gradHeight);

  const name = c.name.toUpperCase().replace('WAGNER JR.','WAGNER JUNIOR');
  ctx.textAlign='center';
  ctx.textBaseline='alphabetic';

  if(format==='feed'){
    ctx.fillStyle='#f2b705';
    ctx.strokeStyle='rgba(0,0,0,.45)';
    ctx.lineWidth=4;
    let s=fit(name,930,108,'Anton');
    ctx.font=`${s}px Anton`;
    ctx.strokeText(name,550,904);
    ctx.fillText(name,550,904);

    ctx.fillStyle='#ffffff';
    s=fit(e.number.value,860,235,'Anton');
    ctx.font=`${s}px Anton`;
    ctx.fillText(e.number.value,548,1116);

    ctx.fillStyle='#090909';
    ctx.font='700 52px Oswald';
    ctx.fillText(e.role.value.toUpperCase(),548,1236);
  } else {
    ctx.fillStyle='#f2b705';
    ctx.strokeStyle='rgba(0,0,0,.45)';
    ctx.lineWidth=4;
    let s=fit(name,920,112,'Anton');
    ctx.font=`${s}px Anton`;
    ctx.strokeText(name,540,1248);
    ctx.fillText(name,540,1248);

    ctx.fillStyle='#ffffff';
    s=fit(e.number.value,870,250,'Anton');
    ctx.font=`${s}px Anton`;
    ctx.fillText(e.number.value,540,1520);

    ctx.fillStyle='#090909';
    ctx.font='700 54px Oswald';
    ctx.fillText(e.role.value.toUpperCase(),540,1648);
  }

  // vertical legal line
  ctx.save();
  ctx.translate(format==='feed'?48:48, format==='feed'?772:1002);
  ctx.rotate(-Math.PI/2);
  ctx.textAlign='center';
  ctx.fillStyle='#ffffff';
  ctx.font='500 17px Oswald';
  ctx.fillText(`ELEIÇÃO 2026 ${c.name.toUpperCase()} CNPJ ${e.cnpj.value || 'PENDENTE'}`, 0, 0);
  ctx.restore();
}
async function removeBg(target){
  const source=target==='candidate'?candidateImg:renanImg;
  const status=target==='candidate'?e.photoStatus:e.renanStatus;
  if(!source){ status.textContent='Carregue uma foto primeiro.'; return; }
  status.textContent='Carregando removedor de fundo… a primeira vez pode demorar.';
  try{
    const mod=await import('https://esm.sh/@imgly/background-removal@1.7.0');
    const blob=await imageBlob(source);
    const out=await mod.removeBackground(blob,{
      progress:(k,c,t)=>{ if(t) status.textContent=`Removendo fundo: ${Math.round(c/t*100)}%`; }
    });
    const url=URL.createObjectURL(out);
    const processed=await loadImg(url,false);
    if(target==='candidate') candidateImg=processed; else renanImg=processed;
    status.textContent='Fundo removido. Confira o recorte.';
    draw();
  }catch(err){
    console.error(err);
    status.textContent='Não foi possível remover automaticamente. Use PNG já recortado.';
  }
}
function imageBlob(image){
  const c=document.createElement('canvas');
  c.width=image.naturalWidth||image.width;
  c.height=image.naturalHeight||image.height;
  c.getContext('2d').drawImage(image,0,0);
  return new Promise(r=>c.toBlob(r,'image/png',1));
}
function downloadCurrent(){
  draw();
  const c=sel();
  const a=document.createElement('a');
  a.download=`${c.slug}-${format}-${e.number.value}.png`;
  a.href=canvas.toDataURL('image/png');
  a.click();
}
const wait=ms=>new Promise(r=>setTimeout(r,ms));
init();
})();