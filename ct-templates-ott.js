/* ============================================================
   ct-templates-ott.js
   🎬 OTT & Streaming — Template definitions.
   Add new templates here using the same T['id'] = {...} pattern.
   All templates are auto-registered via CATS in ct-app.js.
   ============================================================ */

T['ott-pip'] = {
  title:'PiP Continue Watching',
  desc:'Picture-in-picture style overlay that nudges users to resume a title they were watching.',
  tags:['OTT','Animated','Video'],
  trigger:'Screen Viewed',
  ctEvent:'Resume Watching',
  ctProps:{content_id:'{{content_id}}',content_type:'Series',resume_at:'42:18'},
  h:420, mh:520,
  html: BASE + CT_BRIDGE.replace('@READYSCRIPT@','') + `
<style>
.pip{background:linear-gradient(135deg,#14142a,#1a1a35);border:1px solid rgba(255,255,255,.09);border-radius:18px;padding:14px;display:flex;gap:13px;align-items:center;max-width:400px;width:100%;position:relative;animation:pipIn .5s cubic-bezier(.34,1.5,.64,1)}
@keyframes pipIn{from{opacity:0;transform:translateY(60px) scale(.9)}to{opacity:1;transform:none}}
.thumb{width:100px;height:62px;border-radius:10px;flex-shrink:0;position:relative;overflow:hidden;cursor:pointer}
.thumb video{width:100%;height:100%;object-fit:cover}
.thumb::after{content:'';position:absolute;inset:0;background:rgba(0,0,0,.25)}
.play-btn{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;z-index:1}
.play-btn span{width:28px;height:28px;background:rgba(255,255,255,.92);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;color:#14142a;padding-left:2px}
.info{flex:1;min-width:0}
.tag{display:inline-flex;align-items:center;gap:4px;background:rgba(239,68,68,.14);color:#ef4444;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;padding:2px 7px;border-radius:20px;margin-bottom:5px;border:1px solid rgba(239,68,68,.28)}
.tag::before{content:'';width:5px;height:5px;border-radius:50%;background:#ef4444;animation:blink 1.2s infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.25}}
.name{font-size:13px;font-weight:600;color:#e4e8f5;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:2px}
.meta{font-size:10px;color:#4e5470;margin-bottom:8px}
.bar{height:3px;background:rgba(255,255,255,.09);border-radius:3px;margin-bottom:9px}
.bar-fill{height:100%;width:0;background:linear-gradient(90deg,#635bff,#8a84ff);border-radius:3px;animation:bFill .9s ease .4s forwards}
@keyframes bFill{to{width:42%}}
.acts{display:flex;gap:7px}
.btn-r{flex:1;background:#635bff;color:#fff;border:none;border-radius:8px;padding:8px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;transition:.2s}
.btn-r:hover{background:#5046e5;transform:translateY(-1px)}
.btn-d{background:transparent;border:1px solid rgba(255,255,255,.12);color:#8b92b0;border-radius:8px;padding:8px 10px;font-size:12px;cursor:pointer;font-family:inherit;transition:.2s}
.btn-d:hover{border-color:rgba(255,255,255,.28)}
.x{position:absolute;top:8px;right:8px;background:rgba(255,255,255,.06);border:none;color:#4e5470;width:20px;height:20px;border-radius:50%;cursor:pointer;font-size:11px;display:flex;align-items:center;justify-content:center;transition:.2s}
.x:hover{background:rgba(255,255,255,.14);color:#e4e8f5}
</style>
<div class="pip inapp-root">
  <button class="x" onclick="CT.dismiss()">✕</button>
  <div class="thumb" onclick="CT.pushEvent('Resume Watching',{content_id:'s01e03',resume_at:'42:18'});CT.dismiss()">
    <video autoplay muted loop playsinline style="width:100%;height:100%;object-fit:cover">
      <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
    </video>
    <div class="play-btn"><span>▶</span></div>
  </div>
  <div class="info">
    <div class="tag">Watching</div>
    <div class="name">The Adventures — S1·E3</div>
    <div class="meta">42 min remaining</div>
    <div class="bar"><div class="bar-fill"></div></div>
    <div class="acts">
      <button class="btn-r" onclick="CT.pushEvent('Resume Watching',{content_id:'s01e03'});CT.dismiss()">▶ Resume</button>
      <button class="btn-d" onclick="CT.dismiss()">Dismiss</button>
    </div>
  </div>
</div>`,
  css:`.pip { animation: pipIn .5s cubic-bezier(.34,1.5,.64,1); }\n@keyframes pipIn {\n  from { opacity:0; transform: translateY(60px) scale(.9); }\n  to   { opacity:1; transform: none; }\n}`,
  js:`// Primary CTA\ndocument.querySelector('.btn-r').addEventListener('click', () => {\n  CT.pushEvent('Resume Watching', {\n    content_id: '{{content_id}}',\n    content_type: 'Series',\n    resume_at: '42:18'\n  });\n  CT.dismiss();\n});\n\n// Dismiss\ndocument.querySelector('.x').addEventListener('click', () => {\n  CT.pushEvent('InApp Dismissed', { template: 'pip_banner' });\n  CT.dismiss();\n});`
};

/* ====================================================
   2. OTT CONTENT UNLOCK
   ==================================================== */
T['ott-unlock'] = {
  title:'Content Unlock Gate',
  desc:'Premium paywall shown over locked content. Drives subscription upgrades with value-first messaging.',
  tags:['OTT','Paywall','Subscription'],
  trigger:'Content Locked Viewed',
  ctEvent:'Upgrade Plan Clicked',
  ctProps:{plan:'premium',source:'content_gate',content_id:'{{content_id}}'},
  h:520, mh:700,
  html: BASE + CT_BRIDGE.replace('@READYSCRIPT@','') + `
<style>
.modal{background:#13161e;border:1px solid rgba(255,255,255,.08);border-radius:22px;max-width:360px;width:100%;overflow:hidden;animation:zoomIn .45s cubic-bezier(.34,1.4,.64,1)}
@keyframes zoomIn{from{opacity:0;transform:scale(.8) translateY(30px)}to{opacity:1;transform:none}}
.hero{height:130px;background:linear-gradient(135deg,#1a1240,#2d1a5e);position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden}
.hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(99,91,255,.3),transparent 60%)}
.lock-wrap{width:56px;height:56px;background:linear-gradient(135deg,#635bff,#8a84ff);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;z-index:1;box-shadow:0 0 28px rgba(99,91,255,.5);animation:lockPop .6s cubic-bezier(.34,1.8,.64,1) .15s both}
@keyframes lockPop{from{transform:scale(0) rotate(-20deg)}to{transform:none}}
.body{padding:22px}
.plan-tag{display:inline-flex;align-items:center;gap:5px;background:rgba(245,158,11,.12);color:#f59e0b;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;padding:3px 10px;border-radius:20px;border:1px solid rgba(245,158,11,.25);margin-bottom:13px}
h2{font-size:17px;font-weight:700;color:#e4e8f5;margin-bottom:7px}
p.desc{font-size:12px;color:#4e5470;line-height:1.6;margin-bottom:16px}
.perks{display:flex;flex-direction:column;gap:7px;margin-bottom:18px}
.perk{display:flex;align-items:center;gap:8px;font-size:12px;color:#8b92b0}
.ck{width:16px;height:16px;background:rgba(34,200,122,.12);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#22c87a;font-size:9px;flex-shrink:0}
.price-row{display:flex;align-items:baseline;gap:7px;margin-bottom:18px}
.pnew{font-size:26px;font-weight:700;color:#e4e8f5}
.pold{font-size:13px;color:#4e5470;text-decoration:line-through}
.pmo{font-size:11px;color:#4e5470}
.btn-up{width:100%;background:linear-gradient(135deg,#635bff,#8a84ff);color:#fff;border:none;border-radius:12px;padding:13px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;margin-bottom:9px;transition:.2s;letter-spacing:.01em}
.btn-up:hover{transform:translateY(-1px);box-shadow:0 8px 20px rgba(99,91,255,.4)}
.btn-skip{width:100%;background:transparent;color:#4e5470;border:none;padding:7px;font-size:12px;cursor:pointer;font-family:inherit}
.btn-skip:hover{color:#8b92b0}
</style>
<div class="modal inapp-root">
  <div class="hero"><div class="hero-bg"></div><div class="lock-wrap">🔒</div></div>
  <div class="body">
    <div class="plan-tag">★ Premium Only</div>
    <h2>Unlock Full Access</h2>
    <p class="desc">Watch this and thousands of titles in HD &amp; 4K with no ads. Download and watch offline. Cancel anytime.</p>
    <div class="perks">
      <div class="perk"><span class="ck">✓</span>Unlimited HD &amp; 4K streaming</div>
      <div class="perk"><span class="ck">✓</span>Download up to 100 titles offline</div>
      <div class="perk"><span class="ck">✓</span>Watch on 4 screens simultaneously</div>
    </div>
    <div class="price-row"><span class="pold">₹599</span><span class="pnew">₹299</span><span class="pmo">/month</span></div>
    <button class="btn-up" onclick="CT.pushEvent('Upgrade Plan Clicked',{plan:'premium',source:'content_gate'});CT.dismiss()">🔓 Unlock Premium</button>
    <button class="btn-skip" onclick="CT.pushEvent('InApp Dismissed',{template:'content_gate'});CT.dismiss()">Maybe later</button>
  </div>
</div>`,
  css:`@keyframes zoomIn {\n  from { opacity:0; transform: scale(.8) translateY(30px); }\n  to   { opacity:1; transform: none; }\n}`,
  js:`document.querySelector('.btn-up').onclick = () => {\n  CT.pushEvent('Upgrade Plan Clicked', {\n    plan: 'premium',\n    source: 'content_gate',\n    content_id: '{{content_id}}'\n  });\n  CT.dismiss();\n};`
};

/* ====================================================
   3. OTT LIVE EVENT
   ==================================================== */
T['ott-live'] = {
  title:'Live Event Alert',
  desc:'Real-time broadcast notification with viewer count, pulse animation, and one-tap join.',
  tags:['OTT','Live','Animated'],
  trigger:'App Launched',
  ctEvent:'Live Stream Joined',
  ctProps:{event_name:'WWDC Keynote',channel:'TechChannel',event_id:'ev_001'},
  h:460, mh:620,
  html: BASE + CT_BRIDGE.replace('@READYSCRIPT@','') + `
<style>
.card{background:#13161e;border-radius:20px;max-width:380px;width:100%;overflow:hidden;border:1px solid rgba(255,255,255,.07);animation:slideDown .5s cubic-bezier(.34,1.4,.64,1)}
@keyframes slideDown{from{opacity:0;transform:translateY(-40px)}to{opacity:1;transform:none}}
.hero{height:150px;background:linear-gradient(135deg,#1a0608,#2e0a0a);position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden}
.hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(239,68,68,.3),transparent 55%)}
.pulse{width:72px;height:72px;border-radius:50%;background:rgba(239,68,68,.1);border:2px solid rgba(239,68,68,.2);display:flex;align-items:center;justify-content:center;position:relative}
.pulse::before,.pulse::after{content:'';position:absolute;border-radius:50%;border:2px solid rgba(239,68,68,.15);animation:ripple 2.2s infinite}
.pulse::before{inset:-12px;animation-delay:.3s}
.pulse::after{inset:-24px}
@keyframes ripple{0%{opacity:.8;transform:scale(.85)}100%{opacity:0;transform:scale(1.3)}}
.pulse-ico{font-size:28px;position:relative;z-index:1}
.live-tag{position:absolute;top:12px;left:12px;background:#ef4444;color:#fff;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;padding:3px 8px;border-radius:5px;display:flex;align-items:center;gap:4px}
.ldot{width:5px;height:5px;border-radius:50%;background:#fff;animation:blink 1s infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.25}}
.vcnt{position:absolute;top:12px;right:12px;background:rgba(0,0,0,.5);color:#8b92b0;font-size:10px;padding:3px 9px;border-radius:20px;display:flex;align-items:center;gap:4px;backdrop-filter:blur(6px)}
.vdot{width:5px;height:5px;border-radius:50%;background:#22c87a;animation:blink 1.5s infinite}
.content{padding:18px}
.ch-row{display:flex;align-items:center;gap:10px;margin-bottom:11px}
.av{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#ef4444,#dc2626);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff;flex-shrink:0}
.cn{font-size:12px;font-weight:600;color:#e4e8f5}
.cm{font-size:10px;color:#4e5470}
h3{font-size:14px;font-weight:600;color:#e4e8f5;line-height:1.4;margin-bottom:8px}
.tags{display:flex;gap:5px;margin-bottom:14px;flex-wrap:wrap}
.tg{font-size:10px;color:#8b92b0;background:rgba(255,255,255,.06);padding:2px 7px;border-radius:20px}
.acts{display:grid;grid-template-columns:1fr auto;gap:7px}
.btn-w{background:#ef4444;color:#fff;border:none;border-radius:9px;padding:11px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;transition:.2s}
.btn-w:hover{background:#dc2626}
.btn-rm{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);color:#8b92b0;border-radius:9px;padding:11px 13px;font-size:14px;cursor:pointer;font-family:inherit}
</style>
<div class="card inapp-root">
  <div class="hero">
    <div class="live-tag"><span class="ldot"></span>LIVE</div>
    <div class="vcnt"><span class="vdot"></span>14.2K watching</div>
    <div class="pulse"><span class="pulse-ico">🎙</span></div>
  </div>
  <div class="content">
    <div class="ch-row">
      <div class="av">TC</div>
      <div><div class="cn">TechChannel Live ✓</div><div class="cm">Started 23 min ago</div></div>
    </div>
    <h3>Annual Developer Keynote — New Platform Features Reveal</h3>
    <div class="tags"><span class="tg">#Tech</span><span class="tg">#Keynote</span><span class="tg">#Developer</span></div>
    <div class="acts">
      <button class="btn-w" onclick="CT.pushEvent('Live Stream Joined',{event_id:'ev_001',source:'inapp'});CT.dismiss()">▶ Watch Live Now</button>
      <button class="btn-rm" onclick="CT.pushEvent('Live Reminder Set',{event_id:'ev_001'});CT.dismiss()">🔔</button>
    </div>
  </div>
</div>`,
  css:`@keyframes ripple {\n  0%   { opacity:.8; transform: scale(.85); }\n  100% { opacity:0;  transform: scale(1.3); }\n}`,
  js:`document.querySelector('.btn-w').onclick = () => {\n  CT.pushEvent('Live Stream Joined', {\n    event_id: '{{event_id}}',\n    source: 'inapp_banner'\n  });\n  CT.dismiss();\n};`
};

/* ====================================================
   4. QUICK COMMERCE — LIVE ORDER TRACKING
   ==================================================== */
