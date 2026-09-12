gsap.registerPlugin(ScrollTrigger);
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = window.matchMedia('(hover:none),(pointer:coarse)').matches;

/* ============ PRELOADER ============ */
(function preload(){
  const pct = document.querySelector('.pl-pct');
  const frame = document.querySelector('.pl-frame');
  gsap.to('.h,.h2',{width:64,duration:1.4,ease:'power2.inOut'});
  gsap.to('.v,.v2',{height:64,duration:1.4,ease:'power2.inOut'});
  let obj = {v:0};
  gsap.to(obj,{v:100,duration:1.7,ease:'power1.inOut',onUpdate:()=>{pct.textContent=Math.floor(obj.v)+'%';},
    onComplete:()=>{
      const tl = gsap.timeline({onComplete:()=>{document.getElementById('preloader').style.display='none';document.querySelector('.reveal-panel').style.display='none';initHero();}});
      tl.to('#preloader',{opacity:0,duration:.4})
        .to('.reveal-panel',{scaleY:1,duration:.5,ease:'power2.in'},'<')
        .to('.reveal-panel',{scaleY:0,transformOrigin:'top',duration:.6,ease:'power2.out'});
    }});
})();

/* ============ CURSOR ============ */
if(!isTouch){
  const dot = document.getElementById('cursor-dot'), ring = document.getElementById('cursor-ring');
  const xTo = gsap.quickTo(dot,'x',{duration:.1,ease:'power2.out'});
  const yTo = gsap.quickTo(dot,'y',{duration:.1,ease:'power2.out'});
  const rxTo = gsap.quickTo(ring,'x',{duration:.35,ease:'power2.out'});
  const ryTo = gsap.quickTo(ring,'y',{duration:.35,ease:'power2.out'});
  window.addEventListener('mousemove',e=>{xTo(e.clientX);yTo(e.clientY);rxTo(e.clientX);ryTo(e.clientY);});
  document.querySelectorAll('a,button,.wtile,.cat-item,.srow,.pkg').forEach(el=>{
    el.addEventListener('mouseenter',()=>ring.classList.add('big'));
    el.addEventListener('mouseleave',()=>ring.classList.remove('big'));
  });
}

/* ============ NAVBAR ============ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll',()=>{navbar.classList.toggle('scrolled',window.scrollY>40);});

/* ============ HERO ANIMATION ============ */
function initHero(){
  gsap.set('.hero-heading .word',{yPercent:120,opacity:0});
  const tl = gsap.timeline({defaults:{ease:'power3.out'}});
  tl.to('.hero-heading .word',{yPercent:0,opacity:1,duration:1,stagger:0.06})
    .to('.hero-sub',{opacity:1,y:0,duration:.8},'-=.5')
    .to('.hp1',{opacity:1,filter:'blur(0px)',x:0,y:0,duration:1.1,ease:'power3.out'},'-=.9')
    .to('.hp2',{opacity:1,filter:'blur(0px)',x:0,y:0,duration:1.1,ease:'power3.out'},'-=1')
    .to('.hp3',{opacity:1,filter:'blur(0px)',x:0,y:0,duration:1.1,ease:'power3.out'},'-=1')
    .to('.hp4',{opacity:1,filter:'blur(0px)',x:0,y:0,duration:1.1,ease:'power3.out'},'-=1')
    .to('.hero-photo .tag',{opacity:1,y:0,duration:.5,stagger:.1},'-=.6');
  gsap.set('.hero-sub',{opacity:0,y:16});
  gsap.set('.hp1',{x:-60,y:40});
  gsap.set('.hp2',{x:60,y:-30});
  gsap.set('.hp3',{x:-40,y:60});
  gsap.set('.hp4',{x:50,y:50});

  if(!isTouch && !reduced){
    document.getElementById('hero').addEventListener('mousemove',e=>{
      const r = window.innerWidth/2, s = window.innerHeight/2;
      const px=(e.clientX-r)/r, py=(e.clientY-s)/s;
      gsap.to('.hp1',{x:-60+px*-18,y:40+py*-14,duration:.6});
      gsap.to('.hp2',{x:60+px*14,y:-30+py*-10,duration:.6});
      gsap.to('.hp3',{x:-40+px*-12,y:60+py*10,duration:.6});
      gsap.to('.hp4',{x:50+px*16,y:50+py*12,duration:.6});
      gsap.to('.decor',{x:px*10,y:py*10,duration:.8});
    });
  }
}

/* ============ INTRO WORD REVEAL + IMAGE MASK ============ */
gsap.set('#intro-words .word',{y:40,opacity:0});
ScrollTrigger.batch('#intro-words .word',{
  start:'top 85%',
  onEnter:els=>gsap.to(els,{y:0,opacity:1,duration:.8,stagger:.06,ease:'power3.out'})
});
gsap.to('#intro-img',{yPercent:-14,ease:'none',scrollTrigger:{trigger:'#intro',start:'top bottom',end:'bottom top',scrub:true}});

/* ============ WALL TILE PARALLAX + LIGHTBOX ============ */
const tiles = Array.from(document.querySelectorAll('.wtile'));
if(!isTouch){
  tiles.forEach(t=>{
    t.addEventListener('mousemove',e=>{
      const r = t.getBoundingClientRect();
      const dx=(e.clientX-r.left-r.width/2)/r.width, dy=(e.clientY-r.top-r.height/2)/r.height;
      gsap.to(t.querySelector('img'),{x:dx*14,y:dy*14,duration:.4,overwrite:true});
    });
    t.addEventListener('mouseleave',()=>gsap.to(t.querySelector('img'),{x:0,y:0,duration:.5}));
  });
}
const lightbox=document.getElementById('lightbox'), lbImg=document.getElementById('lb-img'), lbCount=document.getElementById('lb-count');
let lbIndex=0;
function openLB(i){lbIndex=i;const src=tiles[i].querySelector('img').src;lbImg.src=src;lbCount.textContent=String(i+1).padStart(2,'0')+' / '+String(tiles.length).padStart(2,'0');lightbox.classList.add('open');}
function closeLB(){lightbox.classList.remove('open');}
tiles.forEach((t,i)=>t.addEventListener('click',()=>openLB(i)));
document.getElementById('lb-close').addEventListener('click',closeLB);
document.getElementById('lb-prev').addEventListener('click',()=>openLB((lbIndex-1+tiles.length)%tiles.length));
document.getElementById('lb-next').addEventListener('click',()=>openLB((lbIndex+1)%tiles.length));
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLB();});
window.addEventListener('keydown',e=>{if(lightbox.classList.contains('open')){if(e.key==='Escape')closeLB();if(e.key==='ArrowRight')openLB((lbIndex+1)%tiles.length);if(e.key==='ArrowLeft')openLB((lbIndex-1+tiles.length)%tiles.length);}});

/* ============ CATEGORY FOLLOW-CURSOR PREVIEW ============ */
const catList = document.getElementById('cat-list');
const preview = document.getElementById('cat-preview');
const previewImgs = preview.querySelectorAll('img');
let pvToggle=0;
if(!isTouch){
  catList.addEventListener('mousemove',e=>{
    preview.style.opacity=1;
    gsap.to(preview,{x:e.clientX,y:e.clientY,duration:.4,ease:'power3.out'});
  });
  catList.addEventListener('mouseleave',()=>{preview.style.opacity=0;});
  document.querySelectorAll('.cat-item').forEach(item=>{
    item.addEventListener('mouseenter',()=>{
      document.querySelectorAll('.cat-item').forEach(i=>i.classList.remove('active'));
      item.classList.add('active');
      const src = item.getAttribute('data-img');
      const next = previewImgs[pvToggle%2], prev = previewImgs[(pvToggle+1)%2];
      next.src = src; 
      gsap.to(next,{opacity:1,duration:.35});
      gsap.to(prev,{opacity:0,duration:.35});
      pvToggle++;
    });
  });
}

/* ============ HORIZONTAL SCROLL GALLERY ============ */
(function(){
  const track = document.getElementById('hscroll-track');
  const items = document.querySelectorAll('.hs-item');
  gsap.set(items,{opacity:0,scale:.85,rotate:(i)=>i%2?4:-4});
  function getScrollAmount(){return -(track.scrollWidth - window.innerWidth + 80);}
  const tween = gsap.to(track,{x:getScrollAmount,ease:'none',
    scrollTrigger:{trigger:'#hscroll',start:'top top',end:()=>'+='+(track.scrollWidth),scrub:1,pin:'#hscroll-pin',invalidateOnRefresh:true}});
  items.forEach((it)=>{
    gsap.to(it,{opacity:1,scale:1,rotate:0,duration:1,ease:'power3.out',
      scrollTrigger:{trigger:it,containerAnimation:tween,start:'left 90%',end:'left 40%',scrub:true}});
  });
})();

/* ============ TEXT MORPH SECTION ============ */
(function(){
  const words=['CAPTURED.','CREATED.','REMEMBERED.'];
  const bgImgs = document.querySelectorAll('#morph-pin .bgimg img');
  const wordEl = document.getElementById('morph-word');
  ScrollTrigger.create({
    trigger:'#morph', start:'top top', end:'bottom bottom', scrub:true, pin:'#morph-pin',
    onUpdate(self){
      const p = self.progress;
      let idx = Math.min(2,Math.floor(p*3));
      if(wordEl.textContent!==words[idx]){
        gsap.to(wordEl,{opacity:0,y:-30,duration:.25,onComplete:()=>{wordEl.textContent=words[idx];gsap.fromTo(wordEl,{opacity:0,y:30},{opacity:1,y:0,duration:.35});}});
        bgImgs.forEach((im,i)=>im.classList.toggle('show',i===idx));
      }
    }
  });
})();

/* ============ SERVICES ROW IMAGE ============ */
document.querySelectorAll('.srow').forEach(row=>{
  const img = row.querySelector('.srow-img img');
  img.src = row.getAttribute('data-img');
});

/* ============ STATS COUNTER ============ */
document.querySelectorAll('.stat-num').forEach(el=>{
  const target = parseInt(el.getAttribute('data-target'));
  const suffix = el.getAttribute('data-suffix')||'+';
  ScrollTrigger.create({trigger:el,start:'top 85%',once:true,onEnter:()=>{
    let obj={v:0};
    gsap.to(obj,{v:target,duration:1.8,ease:'power2.out',onUpdate:()=>{
      let val = Math.floor(obj.v);
      el.textContent = (target>999 ? Math.floor(val/1000)+ 'K' : val) + (target>999?'+':'+');
    }});
  }});
});

/* ============ REVEAL MASK ============ */
gsap.to('#reveal-mask',{scaleX:0,transformOrigin:'right',ease:'none',
  scrollTrigger:{trigger:'#reveal',start:'top 70%',end:'bottom 40%',scrub:true}});

/* ============ TESTIMONIALS ============ */
const testimonials=[
  {img:'https://picsum.photos/seed/2mp-t1/700/900',quote:"2M Pictures didn't just document our wedding — they somehow captured the feeling of the whole day, in every frame.",meta:'RIYA & ARJUN — WEDDING'},
  {img:'https://picsum.photos/seed/2mp-t2/700/900',quote:'Our portrait session felt like a conversation, not a photoshoot. The gallery they delivered still surprises us.',meta:'MEERA K. — PORTRAIT'},
  {img:'https://picsum.photos/seed/2mp-t3/700/900',quote:'From the outdoor shoot to the final album, everything felt considered, calm, and quietly beautiful.',meta:'DEV & SANA — PRE-WEDDING'},
  {img:'https://picsum.photos/seed/2mp-t4/700/900',quote:'They found moments at our event we didn’t even know were happening. That’s a rare eye.',meta:'THE MALHOTRA FAMILY — EVENT'}
];
let tIndex=0;
function renderTesti(dir){
  const t=testimonials[tIndex];
  const img=document.getElementById('testi-img');
  gsap.to(img,{x: dir==='next'?-40:40, opacity:0, duration:.3, onComplete:()=>{
    img.src=t.img;
    gsap.fromTo(img,{x:dir==='next'?40:-40,opacity:0},{x:0,opacity:1,duration:.4});
  }});
  gsap.to('#testi-quote',{y:-16,opacity:0,duration:.25,onComplete:()=>{
    document.getElementById('testi-quote').textContent=t.quote;
    document.getElementById('testi-meta').textContent=t.meta;
    gsap.fromTo('#testi-quote',{y:16,opacity:0},{y:0,opacity:1,duration:.4});
    gsap.fromTo('#testi-meta',{y:16,opacity:0},{y:0,opacity:1,duration:.4,delay:.05});
  }});
  document.getElementById('testi-count').textContent = String(tIndex+1).padStart(2,'0')+' / '+String(testimonials.length).padStart(2,'0');
}
document.getElementById('testi-next').addEventListener('click',()=>{tIndex=(tIndex+1)%testimonials.length;renderTesti('next');});
document.getElementById('testi-prev').addEventListener('click',()=>{tIndex=(tIndex-1+testimonials.length)%testimonials.length;renderTesti('prev');});

/* ============ CTA ARROW LOOP ============ */
if(!reduced){
  gsap.to('#cta-arrow',{x:14,duration:1.1,ease:'power1.inOut',yoyo:true,repeat:-1});
}

/* ============ MAGNETIC BUTTONS ============ */
if(!isTouch){
  document.querySelectorAll('.cta-btn,.submit-btn,.nav-book').forEach(btn=>{
    btn.addEventListener('mousemove',e=>{
      const r=btn.getBoundingClientRect();
      const x=(e.clientX-r.left-r.width/2)*.3, y=(e.clientY-r.top-r.height/2)*.3;
      gsap.to(btn,{x,y,duration:.3});
    });
    btn.addEventListener('mouseleave',()=>gsap.to(btn,{x:0,y:0,duration:.4,ease:'elastic.out(1,.4)'}));
  });
}

/* ============ FORM ============ */
document.querySelectorAll('.field input,.field textarea,.field select').forEach(inp=>{
  inp.addEventListener('focus',()=>inp.closest('.field').classList.add('focused'));
  inp.addEventListener('blur',()=>{if(!inp.value)inp.closest('.field').classList.remove('focused');});
});
document.getElementById('booking-form').addEventListener('submit',e=>{
  e.preventDefault();
  const overlay=document.getElementById('success-overlay');
  overlay.classList.add('open');
  const path = overlay.querySelector('path');
  gsap.fromTo(path,{strokeDashoffset:60},{strokeDashoffset:0,duration:.6,delay:.2,ease:'power2.out'});
  e.target.reset();
  document.querySelectorAll('.field').forEach(f=>f.classList.remove('focused'));
  setTimeout(()=>overlay.classList.remove('open'),2600);
});

/* refresh ScrollTrigger after fonts/images settle */
window.addEventListener('load',()=>ScrollTrigger.refresh());