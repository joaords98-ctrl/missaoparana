(() => {
const $=s=>document.querySelector(s), canvas=$('#canvas'),ctx=canvas.getContext('2d');
const e={candidate:$('#candidate'),role:$('#role'),number:$('#number'),cnpj:$('#cnpj'),photoInput:$('#photoInput'),uploadBtn:$('#uploadBtn'),removeBgBtn:$('#removeBgBtn'),removeRenanBgBtn:$('#removeRenanBgBtn'),photoStatus:$('#photoStatus'),renanStatus:$('#renanStatus'),download:$('#download'),downloadBoth:$('#downloadBoth'),refresh:$('#refresh'),candScale:$('#candScale'),renanScale:$('#renanScale'),candX:$('#candX'),candY:$('#candY'),renanX:$('#renanX'),renanY:$('#renanY'),previewLabel:$('#previewLabel')};
let format='feed',candidateImg=null,renanImg=null,candidateObjectUrl=null;
const dimensions={feed:[1080,1350],story:[1080,1920]},templateImgs={};

function loadImg(src,cross=true){return new Promise((res,rej)=>{const i=new Image();if(cross)i.crossOrigin='anonymous';i.onload=()=>res(i);i.onerror=rej;i.src=src})}
function sel(){return window.GERADOR_CANDIDATOS[+e.candidate.value]}
function key(){return 'gerador-cnpj:'+sel().slug}
function mask(v){const d=v.replace(/\D/g,'').slice(0,14);return d.replace(/^(\d{2})(\d)/,'$1.$2').replace(/^(\d{2})\.(\d{3})(\d)/,'$1.$2.$3').replace(/\.(\d{3})(\d)/,'.$1/$2').replace(/(\d{4})(\d)/,'$1-$2')}
async function init(){
  window.GERADOR_CANDIDATOS.forEach((c,i)=>{const o=document.createElement('option');o.value=i;o.textContent=`${c.name} — ${c.number}`;e.candidate.appendChild(o)});
  e.candidate.value=Math.max(0,window.GERADOR_CANDIDATOS.findIndex(c=>c.slug==='wagner-jr')); bind();
  templateImgs.feed=await loadImg('./assets/template-feed.jpg',false);templateImgs.story=await loadImg('./assets/template-story.jpg',false);renanImg=await loadImg('./assets/renan.jpg',false);
  await chooseCandidate();
}
function bind(){
 e.candidate.onchange=chooseCandidate;
 ['role','number','cnpj','candScale','renanScale','candX','candY','renanX','renanY'].forEach(k=>e[k].addEventListener('input',()=>{if(k==='cnpj'){e.cnpj.value=mask(e.cnpj.value);localStorage.setItem(key(),e.cnpj.value)}draw()}));
 document.querySelectorAll('.format').forEach(b=>b.onclick=()=>setFormat(b.dataset.format));
 e.uploadBtn.onclick=()=>e.photoInput.click();
 e.photoInput.onchange=async()=>{const f=e.photoInput.files[0];if(!f)return;if(candidateObjectUrl)URL.revokeObjectURL(candidateObjectUrl);candidateObjectUrl=URL.createObjectURL(f);candidateImg=await loadImg(candidateObjectUrl,false);e.photoStatus.textContent='Foto carregada manualmente.';draw()};
 e.removeBgBtn.onclick=()=>removeBg('candidate');e.removeRenanBgBtn.onclick=()=>removeBg('renan');e.refresh.onclick=draw;e.download.onclick=downloadCurrent;
 e.downloadBoth.onclick=async()=>{const old=format;setFormat('feed');await wait(160);downloadCurrent();await wait(350);setFormat('story');await wait(160);downloadCurrent();setFormat(old)};
}
async function chooseCandidate(){
 const c=sel();e.role.value=c.role;e.number.value=c.number;e.cnpj.value=localStorage.getItem(key())||'';candidateImg=null;e.photoStatus.textContent='Tentando carregar foto já existente no site…';
 try{candidateImg=await loadImg(c.photo,true);e.photoStatus.textContent='Foto carregada do site.'}catch(err){
   if(c.fallback){try{candidateImg=await loadImg(c.fallback,false);e.photoStatus.textContent='Foto de teste carregada.'}catch{}}
   if(!candidateImg)e.photoStatus.textContent='Foto não localizada. Clique em “Trocar foto”.';
 }
 reset();draw();
}
function reset(){e.candScale.value=1;e.renanScale.value=1;e.candX.value=0;e.candY.value=0;e.renanX.value=0;e.renanY.value=0}
function setFormat(f){format=f;document.querySelectorAll('.format').forEach(b=>b.classList.toggle('active',b.dataset.format===f));const [w,h]=dimensions[f];canvas.width=w;canvas.height=h;e.previewLabel.textContent=`${f==='feed'?'Feed':'Story'} ${w}×${h}`;draw()}
function cover(image,x,y,w,h,scale=1,dx=0,dy=0){if(!image)return;const ir=image.width/image.height,br=w/h;let dw,dh;if(ir>br){dh=h*scale;dw=dh*ir}else{dw=w*scale;dh=dw/ir}ctx.drawImage(image,x+(w-dw)/2+dx,y+(h-dh)/2+dy,dw,dh)}
function fit(text,max,start,font){let s=start;do{ctx.font=`${s}px ${font}`;if(ctx.measureText(text).width<=max)return s;s-=2}while(s>24);return s}
async function draw(){
 if(!templateImgs[format])return; if(document.fonts)await Promise.allSettled([document.fonts.load('100px Anton'),document.fonts.load('700 40px Oswald')]);
 const c=sel(),[w,h]=dimensions[format];ctx.clearRect(0,0,w,h);ctx.drawImage(templateImgs[format],0,0,w,h);
 ctx.save();
 if(format==='feed'){ctx.beginPath();ctx.roundRect(105,160,860,790,44);ctx.clip();cover(renanImg,490,135,550,770,+e.renanScale.value,+e.renanX.value,+e.renanY.value);cover(candidateImg,20,140,660,820,+e.candScale.value,+e.candX.value,+e.candY.value)}
 else{ctx.beginPath();ctx.roundRect(104,270,850,810,46);ctx.clip();cover(renanImg,510,245,540,780,+e.renanScale.value,+e.renanX.value,+e.renanY.value);cover(candidateImg,10,255,700,850,+e.candScale.value,+e.candX.value,+e.candY.value)}
 ctx.restore();
 let name=c.name.toUpperCase().replace('WAGNER JR.','WAGNER JUNIOR');ctx.textAlign='center';ctx.textBaseline='alphabetic';
 if(format==='feed'){
   ctx.fillStyle='#f6b800';ctx.strokeStyle='rgba(0,0,0,.55)';ctx.lineWidth=4;let s=fit(name,900,110,'Anton');ctx.font=`${s}px Anton`;ctx.strokeText(name,550,905);ctx.fillText(name,550,905);
   ctx.fillStyle='#fff';s=fit(e.number.value,880,220,'Anton');ctx.font=`${s}px Anton`;ctx.fillText(e.number.value,540,1130);
   ctx.fillStyle='#090909';ctx.font='700 46px Oswald';ctx.fillText(e.role.value.toUpperCase(),540,1213);
 }else{
   ctx.fillStyle='#f6b800';ctx.strokeStyle='rgba(0,0,0,.55)';ctx.lineWidth=4;let s=fit(name,900,110,'Anton');ctx.font=`${s}px Anton`;ctx.strokeText(name,540,1238);ctx.fillText(name,540,1238);
   ctx.fillStyle='#fff';s=fit(e.number.value,860,270,'Anton');ctx.font=`${s}px Anton`;ctx.fillText(e.number.value,520,1515);
   ctx.fillStyle='#090909';ctx.font='700 48px Oswald';ctx.fillText(e.role.value.toUpperCase(),540,1605);
 }
 ctx.save();ctx.translate(format==='feed'?50:48,format==='feed'?770:1010);ctx.rotate(-Math.PI/2);ctx.textAlign='center';ctx.fillStyle='#fff';ctx.font='500 18px Oswald';
 ctx.fillText(`ELEIÇÃO 2026 · ${c.name.toUpperCase()} · CNPJ ${e.cnpj.value||'PENDENTE'}`,0,0);ctx.restore();
}
async function removeBg(target){
 const source=target==='candidate'?candidateImg:renanImg,status=target==='candidate'?e.photoStatus:e.renanStatus;if(!source){status.textContent='Carregue uma foto primeiro.';return}
 status.textContent='Carregando removedor de fundo… a primeira vez pode demorar.';
 try{const mod=await import('https://esm.sh/@imgly/background-removal@1.7.0');const blob=await imageBlob(source);const out=await mod.removeBackground(blob,{progress:(k,c,t)=>{if(t)status.textContent=`Removendo fundo: ${Math.round(c/t*100)}%`}});const url=URL.createObjectURL(out),p=await loadImg(url,false);if(target==='candidate')candidateImg=p;else renanImg=p;status.textContent='Fundo removido. Confira o recorte.';draw()}
 catch(err){console.error(err);status.textContent='Não foi possível remover automaticamente. Carregue um PNG já recortado.'}
}
function imageBlob(image){const c=document.createElement('canvas');c.width=image.naturalWidth||image.width;c.height=image.naturalHeight||image.height;c.getContext('2d').drawImage(image,0,0);return new Promise(r=>c.toBlob(r,'image/png',1))}
function downloadCurrent(){draw();const c=sel(),a=document.createElement('a');a.download=`${c.slug}-${format}-${e.number.value}.png`;a.href=canvas.toDataURL('image/png');a.click()}
const wait=ms=>new Promise(r=>setTimeout(r,ms));init();
})();