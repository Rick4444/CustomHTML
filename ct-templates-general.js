/* ============================================================
   ct-templates-general.js
   🎮 General / Gamification — Template definitions.
   Templates: Scratch Card, Spin the Wheel, PiP Landscape,
              PiP Portrait, Carousel, Banner Form Fill
   ============================================================ */

T['gen-scratch'] = {
  title: 'Scratch Card',
  desc: 'Gamified scratch-to-reveal reward card. Drives engagement with lottery-style interaction.',
  tags: ['General', 'Gamification', 'Animated'],
  trigger: 'App Launched',
  ctEvent: 'Scratch Card Revealed',
  ctProps: { reward: '{{reward_value}}', campaign_id: '{{campaign_id}}', revealed: 'true' },
  h: 500, mh: 680,
  html: `<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#09090f;font-family:'Segoe UI',sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:16px}
.card{background:linear-gradient(135deg,#13161e,#1a1e2e);border:1px solid rgba(255,255,255,.08);border-radius:20px;padding:24px;max-width:340px;width:100%;text-align:center;animation:popIn .45s cubic-bezier(.34,1.5,.64,1)}
@keyframes popIn{from{opacity:0;transform:scale(.85)}to{opacity:1;transform:none}}
.badge{display:inline-flex;align-items:center;gap:5px;background:rgba(245,158,11,.12);color:#f59e0b;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;padding:3px 10px;border-radius:20px;border:1px solid rgba(245,158,11,.25);margin-bottom:14px}
h3{font-size:17px;font-weight:700;color:#e4e8f5;margin-bottom:6px}
.sub{font-size:12px;color:#4e5470;margin-bottom:20px;line-height:1.5}
.scratch-wrap{position:relative;width:240px;height:140px;margin:0 auto 20px;border-radius:14px;overflow:hidden;cursor:crosshair}
.scratch-reveal{position:absolute;inset:0;background:linear-gradient(135deg,#1e2a1e,#0a2a0a);display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:14px}
.reward-emoji{font-size:40px;margin-bottom:6px}
.reward-text{font-size:22px;font-weight:800;color:#22c87a}
.reward-sub{font-size:11px;color:#4e5470;margin-top:4px}
canvas{position:absolute;inset:0;border-radius:14px;touch-action:none}
.scratch-hint{font-size:11px;color:#4e5470;margin-bottom:16px;display:flex;align-items:center;justify-content:center;gap:5px}
.progress-bar{height:4px;background:rgba(255,255,255,.06);border-radius:4px;overflow:hidden;margin-bottom:16px}
.progress-fill{height:100%;background:linear-gradient(90deg,#635bff,#22c87a);border-radius:4px;width:0;transition:.3s}
.btn-claim{width:100%;background:linear-gradient(135deg,#22c87a,#16a372);color:#064e3b;border:none;border-radius:11px;padding:13px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;transition:.2s;display:none}
.btn-claim.show{display:block}
.btn-claim:hover{transform:translateY(-1px);box-shadow:0 8px 20px rgba(34,200,122,.35)}
.btn-skip{width:100%;background:transparent;border:none;color:#4e5470;font-size:11px;padding:8px;cursor:pointer;font-family:inherit;margin-top:6px}
</style>
<div class="card">
  <div class="badge">🎁 Special Offer</div>
  <h3>You have a reward!</h3>
  <p class="sub">Scratch to reveal your exclusive prize</p>
  <div class="scratch-wrap">
    <div class="scratch-reveal">
      <div class="reward-emoji">🎉</div>
      <div class="reward-text">₹500 OFF</div>
      <div class="reward-sub">Use code SAVE500</div>
    </div>
    <canvas id="sc" width="240" height="140"></canvas>
  </div>
  <div class="scratch-hint">✏️ Scratch the card above</div>
  <div class="progress-bar"><div class="progress-fill" id="pf"></div></div>
  <button class="btn-claim" id="claimBtn" onclick="CT.pushEvent('Scratch Card Revealed',{reward:'₹500 OFF',campaign_id:'sc_001'});CT.dismiss()">🎉 Claim ₹500 OFF</button>
  <button class="btn-skip" onclick="CT.pushEvent('Scratch Card Dismissed');CT.dismiss()">Not interested</button>
</div>
<script>
const canvas=document.getElementById('sc');
const ctx=canvas.getContext('2d');
let scratching=false,revealed=0;
// Silver scratch surface
const grad=ctx.createLinearGradient(0,0,240,140);
grad.addColorStop(0,'#b8c0cc');grad.addColorStop(.5,'#d4dce8');grad.addColorStop(1,'#a8b0bc');
ctx.fillStyle=grad;ctx.fillRect(0,0,240,140);
// Pattern overlay
ctx.fillStyle='rgba(0,0,0,.08)';
for(let i=0;i<240;i+=8)for(let j=0;j<140;j+=8){if((i+j)%16===0)ctx.fillRect(i,j,4,4);}
// Text on scratch surface
ctx.fillStyle='rgba(80,90,110,.6)';ctx.font='bold 13px Segoe UI';ctx.textAlign='center';
ctx.fillText('SCRATCH HERE',120,65);ctx.font='11px Segoe UI';ctx.fillText('✦  ✦  ✦',120,85);
function getPos(e){const r=canvas.getBoundingClientRect();const t=e.touches?e.touches[0]:e;return{x:t.clientX-r.left,y:t.clientY-r.top};}
function scratch(x,y){ctx.globalCompositeOperation='destination-out';ctx.beginPath();ctx.arc(x,y,22,0,Math.PI*2);ctx.fill();}
function calcRevealed(){const d=ctx.getImageData(0,0,240,140).data;let t=0;for(let i=3;i<d.length;i+=4)if(d[i]<128)t++;return Math.round(t/(240*140)*100);}
canvas.addEventListener('mousedown',e=>{scratching=true;const p=getPos(e);scratch(p.x,p.y);});
canvas.addEventListener('mousemove',e=>{if(!scratching)return;const p=getPos(e);scratch(p.x,p.y);revealed=calcRevealed();document.getElementById('pf').style.width=Math.min(revealed,100)+'%';if(revealed>60){document.getElementById('claimBtn').classList.add('show');document.querySelector('.scratch-hint').style.display='none';}});
canvas.addEventListener('mouseup',()=>scratching=false);
canvas.addEventListener('touchstart',e=>{e.preventDefault();scratching=true;const p=getPos(e);scratch(p.x,p.y);},{passive:false});
canvas.addEventListener('touchmove',e=>{e.preventDefault();if(!scratching)return;const p=getPos(e);scratch(p.x,p.y);revealed=calcRevealed();document.getElementById('pf').style.width=Math.min(revealed,100)+'%';if(revealed>60){document.getElementById('claimBtn').classList.add('show');document.querySelector('.scratch-hint').style.display='none';}},{passive:false});
canvas.addEventListener('touchend',()=>scratching=false);
<\/script>`,
  css: `/* Scratch card — silver overlay cleared by canvas compositing */`,
  js: `// Scratch card reveal tracking\ncanvas.addEventListener('mousemove', e => {\n  if (!scratching) return;\n  scratch(getPos(e));\n  if (calcRevealed() > 60) {\n    CT.pushEvent('Scratch Card Revealed', { reward: '{{reward_value}}' });\n  }\n});`
};

/* ── SPIN THE WHEEL ── */
T['gen-spin'] = {
  title: 'Spin the Wheel',
  desc: 'Gamified prize wheel with CSS animation. Reward segment determined server-side via CleverTap variables.',
  tags: ['General', 'Gamification', 'Interactive'],
  trigger: 'Purchase Completed',
  ctEvent: 'Spin Wheel Completed',
  ctProps: { prize: '{{prize_label}}', segment: '{{winning_segment}}', campaign_id: 'wheel_001' },
  h: 560, mh: 740,
  html: `<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#09090f;font-family:'Segoe UI',sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:16px}
.card{background:linear-gradient(135deg,#13161e,#1a1e2e);border:1px solid rgba(255,255,255,.08);border-radius:20px;padding:22px;max-width:350px;width:100%;text-align:center;animation:zoomIn .45s cubic-bezier(.34,1.5,.64,1)}
@keyframes zoomIn{from{opacity:0;transform:scale(.88)}to{opacity:1;transform:none}}
.badge{display:inline-flex;align-items:center;gap:5px;background:rgba(99,91,255,.12);color:#8a84ff;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;padding:3px 10px;border-radius:20px;border:1px solid rgba(99,91,255,.25);margin-bottom:12px}
h3{font-size:17px;font-weight:700;color:#e4e8f5;margin-bottom:5px}
.sub{font-size:12px;color:#4e5470;margin-bottom:18px}
.wheel-wrap{position:relative;width:240px;height:240px;margin:0 auto 16px}
.pointer{position:absolute;top:-14px;left:50%;transform:translateX(-50%);width:0;height:0;border-left:12px solid transparent;border-right:12px solid transparent;border-top:28px solid #635bff;z-index:10;filter:drop-shadow(0 2px 6px rgba(99,91,255,.6))}
canvas#wheel{border-radius:50%;display:block;box-shadow:0 0 0 4px rgba(99,91,255,.25),0 0 30px rgba(99,91,255,.15)}
.center-dot{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:22px;height:22px;background:linear-gradient(135deg,#635bff,#8a84ff);border-radius:50%;border:3px solid #13161e;z-index:5}
.result-msg{min-height:36px;font-size:14px;font-weight:600;color:#22c87a;margin-bottom:14px;display:flex;align-items:center;justify-content:center;gap:6px}
.btn-spin{width:100%;background:linear-gradient(135deg,#635bff,#8a84ff);color:#fff;border:none;border-radius:11px;padding:13px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;transition:.2s;letter-spacing:.02em}
.btn-spin:hover{transform:translateY(-1px);box-shadow:0 8px 20px rgba(99,91,255,.4)}
.btn-spin:disabled{opacity:.45;cursor:not-allowed;transform:none}
.btn-claim2{width:100%;background:linear-gradient(135deg,#22c87a,#16a372);color:#064e3b;border:none;border-radius:11px;padding:13px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;transition:.2s;display:none;margin-top:8px}
.btn-claim2.show{display:block}
.btn-claim2:hover{transform:translateY(-1px);box-shadow:0 8px 20px rgba(34,200,122,.35)}
</style>
<div class="card">
  <div class="badge">🎡 Lucky Spin</div>
  <h3>Spin &amp; Win!</h3>
  <p class="sub">One free spin — see what prize awaits you!</p>
  <div class="wheel-wrap">
    <div class="pointer"></div>
    <canvas id="wheel" width="240" height="240"></canvas>
    <div class="center-dot"></div>
  </div>
  <div class="result-msg" id="result-msg">🎯 Tap spin to try your luck!</div>
  <button class="btn-spin" id="spinBtn" onclick="spinWheel()">🎡 SPIN NOW</button>
  <button class="btn-claim2" id="claimBtn2" onclick="claimPrize()">🎉 Claim Prize</button>
</div>
<script>
const segments=[
  {label:'₹100 OFF',color:'#635bff'},{label:'Try Again',color:'#2d2b55'},
  {label:'₹500 OFF',color:'#22c87a'},{label:'Free Ship',color:'#1a3a2a'},
  {label:'₹250 OFF',color:'#8b85ff'},{label:'2x Points',color:'#1e3a5f'},
  {label:'₹50 OFF',color:'#4a2d7a'},{label:'Mystery',color:'#0a2a1a'}
];
const canvas=document.getElementById('wheel');
const ctx=canvas.getContext('2d');
const arc=2*Math.PI/segments.length;
let spinning=false,curAngle=0,prize='';
function drawWheel(angle){
  ctx.clearRect(0,0,240,240);
  segments.forEach((seg,i)=>{
    const start=angle+i*arc,end=start+arc;
    ctx.beginPath();ctx.moveTo(120,120);ctx.arc(120,120,115,start,end);ctx.closePath();
    ctx.fillStyle=seg.color;ctx.fill();
    ctx.strokeStyle='rgba(255,255,255,.08)';ctx.lineWidth=1;ctx.stroke();
    ctx.save();ctx.translate(120,120);ctx.rotate(start+arc/2);
    ctx.textAlign='right';ctx.fillStyle='#e4e8f5';ctx.font='bold 11px Segoe UI';
    ctx.fillText(seg.label,105,4);ctx.restore();
  });
}
drawWheel(0);
function spinWheel(){
  if(spinning)return;
  spinning=true;
  document.getElementById('spinBtn').disabled=true;
  document.getElementById('result-msg').textContent='🌀 Spinning...';
  const extra=Math.random()*2*Math.PI;
  const totalSpin=4*2*Math.PI+extra;
  const duration=3500;
  const start=performance.now();
  const startAngle=curAngle;
  function anim(now){
    const elapsed=now-start;
    const progress=Math.min(elapsed/duration,1);
    const ease=1-Math.pow(1-progress,4);
    curAngle=startAngle+totalSpin*ease;
    drawWheel(curAngle);
    if(progress<1){requestAnimationFrame(anim);}
    else{
      const finalAngle=((curAngle%(2*Math.PI))+2*Math.PI)%(2*Math.PI);
      const ptr=(2*Math.PI-finalAngle+2*Math.PI)%(2*Math.PI);
      const idx=Math.floor(ptr/arc)%segments.length;
      prize=segments[idx].label;
      spinning=false;
      document.getElementById('result-msg').innerHTML='🎉 You won: <strong style="color:#22c87a">'+prize+'</strong>!';
      if(prize!=='Try Again'){document.getElementById('claimBtn2').classList.add('show');}
      else{document.getElementById('spinBtn').disabled=false;document.getElementById('spinBtn').textContent='Try Again';}
      CT.pushEvent('Spin Wheel Completed',{prize:prize,campaign_id:'wheel_001'});
    }
  }
  requestAnimationFrame(anim);
}
function claimPrize(){CT.pushEvent('Spin Prize Claimed',{prize:prize});CT.dismiss();}
<\/script>`,
  css: `/* Spin wheel uses canvas arc drawing */`,
  js: `function spinWheel() {\n  // ... animate wheel ...\n  CT.pushEvent('Spin Wheel Completed', { prize: winningSegment, campaign_id: '{{campaign_id}}' });\n}\nfunction claimPrize() {\n  CT.pushEvent('Spin Prize Claimed', { prize: winningSegment });\n  CT.dismiss();\n}`
};

/* ── PIP LANDSCAPE ── */
T['gen-pip-land'] = {
  title: 'PiP Banner — Landscape',
  desc: 'Wide horizontal PiP overlay for tablet / landscape orientation. Video thumbnail + CTA.',
  tags: ['General', 'PiP', 'Landscape'],
  trigger: 'Content Viewed',
  ctEvent: 'PiP CTA Clicked',
  ctProps: { orientation: 'landscape', content_id: '{{content_id}}', cta: 'Watch Now' },
  h: 380, mh: 500,
  html: `<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#09090f;font-family:'Segoe UI',sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:20px}
.pip-land{background:linear-gradient(135deg,#12141f,#1a1c2e);border:1px solid rgba(255,255,255,.08);border-radius:16px;display:flex;gap:0;overflow:hidden;max-width:520px;width:100%;animation:slideUp .45s cubic-bezier(.34,1.4,.64,1);position:relative}
@keyframes slideUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:none}}
.video-side{width:180px;flex-shrink:0;background:linear-gradient(135deg,#1e1b4b,#2d2060);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;min-height:130px}
.video-side video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.play-overlay2{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.3);z-index:1}
.play-btn2{width:40px;height:40px;background:rgba(255,255,255,.92);border-radius:50%;display:flex;align-items:center;justify-content:center}
.play-btn2::after{content:'';border-left:14px solid #1a1a2e;border-top:8px solid transparent;border-bottom:8px solid transparent;margin-left:3px}
.content-side{flex:1;padding:16px 16px 16px 18px;display:flex;flex-direction:column;justify-content:center}
.live-tag2{display:inline-flex;align-items:center;gap:4px;background:rgba(239,68,68,.14);color:#ef4444;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;padding:2px 7px;border-radius:20px;margin-bottom:7px;border:1px solid rgba(239,68,68,.28);width:fit-content}
.live-tag2::before{content:'';width:5px;height:5px;border-radius:50%;background:#ef4444;animation:blink 1.2s infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.25}}
.show-title{font-size:15px;font-weight:700;color:#e4e8f5;margin-bottom:3px;line-height:1.3}
.show-meta{font-size:11px;color:#4e5470;margin-bottom:10px}
.prog-bar{height:3px;background:rgba(255,255,255,.1);border-radius:3px;margin-bottom:12px}
.prog-fill2{height:100%;width:38%;background:linear-gradient(90deg,#635bff,#8a84ff);border-radius:3px}
.btns{display:flex;gap:8px}
.btn-watch2{background:#635bff;color:#fff;border:none;border-radius:8px;padding:8px 16px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;transition:.2s}
.btn-watch2:hover{background:#5046e5}
.btn-dismiss2{background:transparent;border:1px solid rgba(255,255,255,.12);color:#8b92b0;border-radius:8px;padding:8px 12px;font-size:12px;cursor:pointer;font-family:inherit}
.x3{position:absolute;top:8px;right:8px;background:rgba(255,255,255,.06);border:none;color:#4e5470;width:20px;height:20px;border-radius:50%;cursor:pointer;font-size:11px;display:flex;align-items:center;justify-content:center}
</style>
<div class="pip-land">
  <button class="x3" onclick="CT.dismiss()">✕</button>
  <div class="video-side">
    <video autoplay muted loop playsinline style="width:100%;height:100%;object-fit:cover">
      <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
    </video>
    <div class="play-overlay2"><div class="play-btn2"></div></div>
  </div>
  <div class="content-side">
    <div class="live-tag2">Watching</div>
    <div class="show-title">The Adventures — S2·E5</div>
    <div class="show-meta">38 min remaining · HD</div>
    <div class="prog-bar"><div class="prog-fill2"></div></div>
    <div class="btns">
      <button class="btn-watch2" onclick="CT.pushEvent('PiP CTA Clicked',{orientation:'landscape',cta:'Resume'});CT.dismiss()">▶ Resume</button>
      <button class="btn-dismiss2" onclick="CT.dismiss()">Dismiss</button>
    </div>
  </div>
</div>`,
  css: `/* Landscape PiP — flex row layout */`,
  js: `document.querySelector('.btn-watch2').onclick = () => {\n  CT.pushEvent('PiP CTA Clicked', { orientation: 'landscape', content_id: '{{content_id}}', cta: 'Resume' });\n  CT.dismiss();\n};`
};

/* ── PIP PORTRAIT ── */
T['gen-pip-port'] = {
  title: 'PiP Banner — Portrait',
  desc: 'Compact vertical PiP card for mobile portrait mode. Minimal footprint, max impact.',
  tags: ['General', 'PiP', 'Portrait'],
  trigger: 'App Launched',
  ctEvent: 'PiP CTA Clicked',
  ctProps: { orientation: 'portrait', content_id: '{{content_id}}', position: 'bottom' },
  h: 420, mh: 580,
  html: `<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#09090f;font-family:'Segoe UI',sans-serif;display:flex;align-items:flex-end;justify-content:center;min-height:100vh;padding:16px}
.pip-port{background:linear-gradient(135deg,#12141f,#1c1e30);border:1px solid rgba(255,255,255,.08);border-radius:20px;max-width:360px;width:100%;overflow:hidden;animation:slideFromBottom .45s cubic-bezier(.34,1.4,.64,1);position:relative}
@keyframes slideFromBottom{from{opacity:0;transform:translateY(80px)}to{opacity:1;transform:none}}
.thumb-port{height:160px;background:linear-gradient(135deg,#1e1b4b,#1e3060);position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden}
.thumb-port video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.thumb-overlay{position:absolute;inset:0;background:linear-gradient(to bottom,transparent 40%,rgba(0,0,0,.7) 100%)}
.thumb-play{position:absolute;bottom:14px;left:16px;display:flex;align-items:center;gap:8px;z-index:1}
.play-circle{width:34px;height:34px;background:rgba(255,255,255,.9);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.play-circle::after{content:'';border-left:11px solid #1a1a2e;border-top:6px solid transparent;border-bottom:6px solid transparent;margin-left:2px}
.thumb-title{font-size:12px;font-weight:600;color:#fff;line-height:1.3}
.thumb-meta{font-size:10px;color:rgba(255,255,255,.6);margin-top:1px}
.prog-port{height:2px;background:rgba(255,255,255,.1)}
.prog-port-fill{height:100%;width:45%;background:#635bff}
.body-port{padding:14px 16px 16px}
.ep-badge{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#8a84ff;margin-bottom:4px}
.series-name{font-size:14px;font-weight:700;color:#e4e8f5;margin-bottom:2px}
.series-meta{font-size:11px;color:#4e5470;margin-bottom:12px}
.port-acts{display:flex;gap:8px}
.btn-port-main{flex:1;background:#635bff;color:#fff;border:none;border-radius:9px;padding:11px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;transition:.2s}
.btn-port-main:hover{background:#5046e5;transform:translateY(-1px)}
.btn-port-dismiss{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:#8b92b0;border-radius:9px;padding:11px 14px;font-size:12px;cursor:pointer;font-family:inherit}
.x4{position:absolute;top:8px;right:8px;background:rgba(0,0,0,.4);border:none;color:rgba(255,255,255,.7);width:22px;height:22px;border-radius:50%;cursor:pointer;font-size:11px;display:flex;align-items:center;justify-content:center;z-index:2;backdrop-filter:blur(4px)}
</style>
<div class="pip-port">
  <button class="x4" onclick="CT.dismiss()">✕</button>
  <div class="thumb-port">
    <video autoplay muted loop playsinline>
      <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
    </video>
    <div class="thumb-overlay"></div>
    <div class="thumb-play">
      <div class="play-circle"></div>
      <div><div class="thumb-title">The Lost City</div><div class="thumb-meta">38 min remaining</div></div>
    </div>
  </div>
  <div class="prog-port"><div class="prog-port-fill"></div></div>
  <div class="body-port">
    <div class="ep-badge">Continue Watching</div>
    <div class="series-name">The Lost City</div>
    <div class="series-meta">Season 1 · Episode 4 · HD</div>
    <div class="port-acts">
      <button class="btn-port-main" onclick="CT.pushEvent('PiP CTA Clicked',{orientation:'portrait',cta:'Resume'});CT.dismiss()">▶ Resume</button>
      <button class="btn-port-dismiss" onclick="CT.dismiss()">✕</button>
    </div>
  </div>
</div>`,
  css: `@keyframes slideFromBottom {\n  from { opacity:0; transform: translateY(80px); }\n  to   { opacity:1; transform: none; }\n}`,
  js: `document.querySelector('.btn-port-main').onclick = () => {\n  CT.pushEvent('PiP CTA Clicked', { orientation: 'portrait', content_id: '{{content_id}}' });\n  CT.dismiss();\n};`
};

/* ── CAROUSEL ── */
T['gen-carousel'] = {
  title: 'Carousel Banner',
  desc: 'Multi-slide swipeable carousel InApp. Each slide has its own CTA and tracks individual clicks.',
  tags: ['General', 'Carousel', 'Interactive'],
  trigger: 'Home Screen Viewed',
  ctEvent: 'Carousel Slide Clicked',
  ctProps: { slide_index: '{{slide_index}}', slide_title: '{{slide_title}}', campaign_id: 'carousel_001' },
  h: 460, mh: 620,
  html: `<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#09090f;font-family:'Segoe UI',sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:16px}
.carousel-wrap{background:#13161e;border:1px solid rgba(255,255,255,.08);border-radius:20px;max-width:370px;width:100%;overflow:hidden;animation:slideUp .45s cubic-bezier(.34,1.4,.64,1)}
@keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:none}}
.header{padding:14px 16px 0;display:flex;align-items:center;justify-content:space-between}
.header-title{font-size:13px;font-weight:700;color:#e4e8f5}
.header-dots{display:flex;gap:4px}
.hdot{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.2);transition:.3s;cursor:pointer}
.hdot.on{background:#635bff;width:16px;border-radius:3px}
.x5{background:rgba(255,255,255,.06);border:none;color:#4e5470;width:22px;height:22px;border-radius:50%;cursor:pointer;font-size:11px;display:flex;align-items:center;justify-content:center}
.slides-viewport{overflow:hidden}
.slides-track{display:flex;transition:transform .4s cubic-bezier(.4,0,.2,1)}
.slide{min-width:100%;padding:14px 16px 18px}
.slide-hero{height:140px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:48px;margin-bottom:12px;position:relative;overflow:hidden}
.slide-badge{position:absolute;top:8px;left:8px;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;padding:2px 8px;border-radius:20px}
.slide-title{font-size:15px;font-weight:700;color:#e4e8f5;margin-bottom:4px}
.slide-desc{font-size:12px;color:#4e5470;line-height:1.5;margin-bottom:12px}
.slide-btn{width:100%;border:none;border-radius:10px;padding:12px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;transition:.2s}
.slide-btn:hover{transform:translateY(-1px)}
.nav-row{display:flex;align-items:center;justify-content:space-between;padding:0 16px 14px}
.nav-btn2{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);color:#8b92b0;border-radius:8px;padding:7px 14px;font-size:12px;cursor:pointer;font-family:inherit;transition:.2s}
.nav-btn2:hover{background:rgba(255,255,255,.1);color:#e4e8f5}
.nav-btn2:disabled{opacity:.3;cursor:not-allowed}
.slide-count{font-size:11px;color:#4e5470}
</style>
<div class="carousel-wrap">
  <div class="header">
    <div class="header-title">✨ For You</div>
    <div style="display:flex;align-items:center;gap:8px">
      <div class="header-dots" id="hdots">
        <div class="hdot on"></div><div class="hdot"></div><div class="hdot"></div>
      </div>
      <button class="x5" onclick="CT.dismiss()">✕</button>
    </div>
  </div>
  <div class="slides-viewport">
    <div class="slides-track" id="track">
      <div class="slide">
        <div class="slide-hero" style="background:linear-gradient(135deg,#1e1b4b,#312e81)">
          🎬<div class="slide-badge" style="background:rgba(239,68,68,.2);color:#ef4444">LIVE</div>
        </div>
        <div class="slide-title">Watch Live Events</div>
        <div class="slide-desc">Stream live sports, concerts and exclusive shows in HD. Never miss a moment.</div>
        <button class="slide-btn" style="background:#635bff;color:#fff" onclick="ctaClick(0,'Watch Live Events','Watch Now')">▶ Watch Now</button>
      </div>
      <div class="slide">
        <div class="slide-hero" style="background:linear-gradient(135deg,#064e3b,#065f46)">
          💰<div class="slide-badge" style="background:rgba(34,200,122,.15);color:#22c87a">50% OFF</div>
        </div>
        <div class="slide-title">Exclusive Member Deals</div>
        <div class="slide-desc">Premium members unlock deals up to 50% off on top categories. Limited time only.</div>
        <button class="slide-btn" style="background:#22c87a;color:#064e3b" onclick="ctaClick(1,'Exclusive Member Deals','Shop Now')">🛒 Shop Now</button>
      </div>
      <div class="slide">
        <div class="slide-hero" style="background:linear-gradient(135deg,#7c2d12,#92400e)">
          🔔<div class="slide-badge" style="background:rgba(245,158,11,.15);color:#f59e0b">NEW</div>
        </div>
        <div class="slide-title">Enable Notifications</div>
        <div class="slide-desc">Get personalised alerts for content you love. Stay ahead with real-time updates.</div>
        <button class="slide-btn" style="background:#f59e0b;color:#78350f" onclick="ctaClick(2,'Enable Notifications','Allow')">🔔 Allow Notifications</button>
      </div>
    </div>
  </div>
  <div class="nav-row">
    <button class="nav-btn2" id="prevBtn" onclick="goSlide(-1)" disabled>← Prev</button>
    <span class="slide-count" id="sc">1 / 3</span>
    <button class="nav-btn2" id="nextBtn" onclick="goSlide(1)">Next →</button>
  </div>
</div>
<script>
let cur2=0;const total=3;
function goSlide(d){
  cur2=Math.max(0,Math.min(total-1,cur2+d));
  document.getElementById('track').style.transform=\`translateX(\${-cur2*100}%)\`;
  document.getElementById('sc').textContent=(cur2+1)+' / '+total;
  document.getElementById('prevBtn').disabled=cur2===0;
  document.getElementById('nextBtn').disabled=cur2===total-1;
  document.querySelectorAll('.hdot').forEach((d,i)=>d.classList.toggle('on',i===cur2));
  CT.pushEvent('Carousel Slide Viewed',{slide_index:cur2,campaign_id:'carousel_001'});
}
function ctaClick(idx,title,cta){
  CT.pushEvent('Carousel Slide Clicked',{slide_index:idx,slide_title:title,cta:cta,campaign_id:'carousel_001'});
  CT.dismiss();
}
// touch swipe
let tx=0;
const vp=document.querySelector('.slides-viewport');
vp.addEventListener('touchstart',e=>tx=e.touches[0].clientX,{passive:true});
vp.addEventListener('touchend',e=>{const diff=tx-e.changedTouches[0].clientX;if(Math.abs(diff)>40)goSlide(diff>0?1:-1);},{passive:true});
<\/script>`,
  css: `/* Carousel — transform translateX for slide movement */`,
  js: `function goSlide(direction) {\n  currentSlide = Math.max(0, Math.min(total-1, currentSlide + direction));\n  track.style.transform = \`translateX(\${-currentSlide * 100}%)\`;\n  CT.pushEvent('Carousel Slide Viewed', { slide_index: currentSlide });\n}\nfunction ctaClick(idx, title, cta) {\n  CT.pushEvent('Carousel Slide Clicked', { slide_index: idx, slide_title: title, cta });\n  CT.dismiss();\n}`
};

/* ── BANNER FORM FILL ── */
T['gen-form'] = {
  title: 'Banner Form Fill',
  desc: 'Lead capture form inside an InApp banner. Collects name, phone and submits to CleverTap profile.',
  tags: ['General', 'Form', 'Lead Gen'],
  trigger: 'App Launched',
  ctEvent: 'Form Submitted',
  ctProps: { form_name: 'InApp Lead Form', name: '{{input_name}}', phone: '{{input_phone}}', source: 'inapp_banner' },
  h: 500, mh: 680,
  html: `<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#09090f;font-family:'Segoe UI',sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:16px}
.form-card{background:#13161e;border:1px solid rgba(255,255,255,.08);border-radius:20px;max-width:360px;width:100%;overflow:hidden;animation:zoomIn .45s cubic-bezier(.34,1.5,.64,1)}
@keyframes zoomIn{from{opacity:0;transform:scale(.88)}to{opacity:1;transform:none}}
.form-hero{height:100px;background:linear-gradient(135deg,#1e1b4b,#312e81,#1e3a5f);display:flex;align-items:center;justify-content:center;gap:14px;position:relative}
.hero-icon{font-size:36px;animation:bounce .8s ease infinite alternate}
@keyframes bounce{from{transform:translateY(0)}to{transform:translateY(-8px)}}
.hero-text{text-align:left}
.hero-title{font-size:16px;font-weight:700;color:#fff;margin-bottom:3px}
.hero-sub{font-size:11px;color:rgba(255,255,255,.6)}
.form-body{padding:20px}
.offer-strip{background:rgba(245,158,11,.08);border:1px solid rgba(245,158,11,.2);border-radius:10px;padding:10px 14px;margin-bottom:16px;display:flex;align-items:center;gap:8px;font-size:12px;color:#fbbf24}
.form-group{margin-bottom:12px}
label{font-size:11px;font-weight:600;color:#8b92b0;display:block;margin-bottom:5px;letter-spacing:.03em}
input[type=text],input[type=tel],select{width:100%;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:9px;padding:11px 14px;color:#e4e8f5;font-family:inherit;font-size:13px;outline:none;transition:.2s;appearance:none}
input:focus,select:focus{border-color:rgba(99,91,255,.5);background:rgba(99,91,255,.06)}
input::placeholder{color:#2e3455}
select{color:#8b92b0;cursor:pointer}
select option{background:#13161e;color:#e4e8f5}
.consent-row{display:flex;align-items:flex-start;gap:9px;margin-bottom:16px}
.consent-row input[type=checkbox]{width:14px;height:14px;margin-top:1px;accent-color:#635bff;flex-shrink:0;cursor:pointer}
.consent-row label{font-size:11px;color:#4e5470;line-height:1.4;cursor:pointer}
.consent-row label span{color:#8a84ff}
.btn-submit2{width:100%;background:linear-gradient(135deg,#635bff,#8a84ff);color:#fff;border:none;border-radius:11px;padding:13px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;transition:.2s;margin-bottom:9px;letter-spacing:.02em}
.btn-submit2:hover{transform:translateY(-1px);box-shadow:0 8px 20px rgba(99,91,255,.4)}
.btn-submit2:disabled{opacity:.4;cursor:not-allowed;transform:none}
.btn-close2{width:100%;background:transparent;border:none;color:#4e5470;font-size:11px;padding:6px;cursor:pointer;font-family:inherit}
.success-msg{display:none;text-align:center;padding:16px 0}
.success-msg .big{font-size:44px;margin-bottom:12px}
</style>
<div class="form-card">
  <div class="form-hero">
    <div class="hero-icon">🎯</div>
    <div class="hero-text"><div class="hero-title">Unlock Exclusive Access</div><div class="hero-sub">Fill in details to claim your offer</div></div>
  </div>
  <div class="form-body" id="formBody">
    <div class="offer-strip">🎁 Complete this form and get <strong style="color:#fbbf24;margin-left:4px">₹500 cashback</strong></div>
    <div class="form-group">
      <label>Full Name</label>
      <input type="text" id="inp-name" placeholder="Enter your full name">
    </div>
    <div class="form-group">
      <label>Mobile Number</label>
      <input type="tel" id="inp-phone" placeholder="+91 98765 43210" maxlength="15">
    </div>
    <div class="form-group">
      <label>Interested In</label>
      <select id="inp-interest">
        <option value="">Select category</option>
        <option>Premium Streaming</option>
        <option>Shopping Deals</option>
        <option>Food Delivery</option>
        <option>Travel Booking</option>
      </select>
    </div>
    <div class="consent-row">
      <input type="checkbox" id="consent" checked>
      <label for="consent">I agree to receive promotional communications. <span>Privacy Policy</span></label>
    </div>
    <button class="btn-submit2" id="subBtn2" onclick="submitForm()">Submit &amp; Claim Offer →</button>
    <button class="btn-close2" onclick="CT.pushEvent('Form Dismissed');CT.dismiss()">Maybe later</button>
  </div>
  <div class="success-msg" id="successMsg">
    <div class="big">🎉</div>
    <div style="font-size:16px;font-weight:700;color:#e4e8f5;margin-bottom:8px">You're all set!</div>
    <div style="font-size:12px;color:#4e5470;line-height:1.6;padding:0 8px">Your cashback has been credited. Check your account within 24 hours.</div>
  </div>
</div>
<script>
function submitForm(){
  const name=document.getElementById('inp-name').value.trim();
  const phone=document.getElementById('inp-phone').value.trim();
  const interest=document.getElementById('inp-interest').value;
  if(!name||!phone){alert('Please fill in your name and phone number.');return;}
  // Push profile update + event to CleverTap
  CT.pushProfile({'Name':name,'Phone':phone,'Interest':interest});
  CT.pushEvent('Form Submitted',{form_name:'InApp Lead Form',name:name,phone:phone,interest:interest,source:'inapp_banner'});
  document.getElementById('formBody').style.display='none';
  document.getElementById('successMsg').style.display='block';
  setTimeout(()=>CT.dismiss(),2500);
}
<\/script>`,
  css: `/* Form banner — standard input styling */`,
  js: `function submitForm() {\n  const name = document.getElementById('inp-name').value;\n  const phone = document.getElementById('inp-phone').value;\n  // Push profile update to CleverTap\n  CT.pushProfile({ Name: name, Phone: phone });\n  CT.pushEvent('Form Submitted', {\n    form_name: 'InApp Lead Form',\n    name, phone, source: 'inapp_banner'\n  });\n  CT.dismiss();\n}`
};
