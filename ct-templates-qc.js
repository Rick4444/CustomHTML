/* ============================================================
   ct-templates-qc.js
   ⚡ Quick Commerce — Template definitions.
   Add new templates here using the same T['id'] = {...} pattern.
   All templates are auto-registered via CATS in ct-app.js.
   ============================================================ */

T['qc-track'] = {
  title:'Live Order Tracking',
  desc:'Real-time delivery progress shown inside the app while order is in-transit. Rider animation on map strip.',
  tags:['Quick Commerce','Animated','Tracking'],
  trigger:'Order Placed',
  ctEvent:'Track Order Opened',
  ctProps:{order_id:'{{order_id}}',eta_minutes:'{{eta}}'},
  h:480, mh:640,
  html: BASE + CT_BRIDGE.replace('@READYSCRIPT@','') + `
<style>
.track{background:#13161e;border-radius:20px;max-width:370px;width:100%;padding:18px;border:1px solid rgba(255,255,255,.07);animation:slideUp .5s cubic-bezier(.34,1.4,.64,1)}
@keyframes slideUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:none}}
.top-row{display:flex;align-items:center;gap:12px;margin-bottom:16px}
.or-ico{width:44px;height:44px;background:linear-gradient(135deg,rgba(34,200,122,.18),rgba(34,200,122,.06));border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;border:1px solid rgba(34,200,122,.2);flex-shrink:0}
.or-name{font-size:14px;font-weight:700;color:#e4e8f5}
.or-sub{font-size:11px;color:#4e5470;margin-top:2px}
.eta-box{margin-left:auto;background:rgba(34,200,122,.1);color:#22c87a;border:1px solid rgba(34,200,122,.25);font-size:11px;font-weight:700;padding:5px 10px;border-radius:20px;text-align:center;flex-shrink:0}
.eta-n{font-size:20px;font-weight:800;display:block;line-height:1}
.eta-l{font-size:9px;opacity:.8}
.map-strip{height:72px;background:linear-gradient(135deg,#0d1f18,#0a2410);border-radius:12px;margin-bottom:16px;border:1px solid rgba(34,200,122,.12);position:relative;overflow:hidden;display:flex;align-items:center;padding:0 16px}
.map-line-wrap{display:flex;align-items:center;width:100%;gap:8px}
.map-dot{width:10px;height:10px;border-radius:50%}
.map-dot.s{background:#22c87a;box-shadow:0 0 8px #22c87a;flex-shrink:0}
.map-dot.e{background:#ef4444;box-shadow:0 0 8px #ef4444;flex-shrink:0}
.map-road{flex:1;height:2px;background:linear-gradient(90deg,#22c87a40,#635bff40,rgba(255,255,255,.06));border-radius:2px}
.rider-anim{position:absolute;animation:ride 3.5s ease-in-out infinite alternate;font-size:18px}
@keyframes ride{from{left:22%}to{left:62%}}
.steps{position:relative;margin-bottom:16px}
.steps::before{content:'';position:absolute;left:15px;top:15px;bottom:15px;width:2px;background:rgba(255,255,255,.06);z-index:0}
.step{display:flex;align-items:flex-start;gap:12px;margin-bottom:12px;position:relative;z-index:1}
.sc{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0}
.step.done .sc{background:linear-gradient(135deg,#22c87a,#16a372);box-shadow:0 0 10px rgba(34,200,122,.3)}
.step.now .sc{background:linear-gradient(135deg,#635bff,#8a84ff);box-shadow:0 0 10px rgba(99,91,255,.4);animation:pulse 1.5s infinite}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}
.step.pend .sc{background:rgba(255,255,255,.06);border:2px solid rgba(255,255,255,.09)}
.sinfo{padding-top:5px}
.sname{font-size:13px;font-weight:600;color:#e4e8f5;margin-bottom:1px}
.step.pend .sname{color:#4e5470}
.stime{font-size:10px;color:#4e5470}
.btn-map{width:100%;background:linear-gradient(135deg,#22c87a,#16a372);color:#064e3b;border:none;border-radius:11px;padding:12px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;transition:.2s}
.btn-map:hover{transform:translateY(-1px);box-shadow:0 6px 18px rgba(34,200,122,.35)}
</style>
<div class="track inapp-root">
  <div class="top-row">
    <div class="or-ico">🛵</div>
    <div><div class="or-name">Order #{{order_id}}</div><div class="or-sub">4 items · Grocery</div></div>
    <div class="eta-box"><span class="eta-n">8</span><span class="eta-l">min ETA</span></div>
  </div>
  <div class="map-strip">
    <div class="map-line-wrap">
      <div class="map-dot s"></div>
      <div class="map-road"></div>
      <div class="map-dot e"></div>
    </div>
    <div class="rider-anim">🛵</div>
  </div>
  <div class="steps">
    <div class="step done"><div class="sc">✓</div><div class="sinfo"><div class="sname">Order Confirmed</div><div class="stime">2:14 PM</div></div></div>
    <div class="step done"><div class="sc">✓</div><div class="sinfo"><div class="sname">Packed &amp; Ready</div><div class="stime">2:19 PM</div></div></div>
    <div class="step now"><div class="sc">🛵</div><div class="sinfo"><div class="sname">Out for Delivery</div><div class="stime">On the way · 8 min</div></div></div>
    <div class="step pend"><div class="sc">🏠</div><div class="sinfo"><div class="sname">Delivered</div><div class="stime">Estimated ~8 min</div></div></div>
  </div>
  <button class="btn-map" onclick="CT.pushEvent('Track Order Opened',{order_id:'{{order_id}}'});CT.dismiss()">📍 Open Live Tracking</button>
</div>`,
  css:`@keyframes ride {\n  from { left: 22%; }\n  to   { left: 62%; }\n}`,
  js:`document.querySelector('.btn-map').onclick = () => {\n  CT.pushEvent('Track Order Opened', {\n    order_id: '{{order_id}}',\n    source: 'inapp'\n  });\n  CT.dismiss();\n};`
};

/* ====================================================
   5. QUICK COMMERCE — DELIVERY SLOT
   ==================================================== */
T['qc-slot'] = {
  title:'Delivery Slot Reminder',
  desc:'Urgency nudge to book or confirm a delivery slot before the window expires.',
  tags:['Quick Commerce','Timer','Urgent'],
  trigger:'Cart Viewed',
  ctEvent:'Slot Booked',
  ctProps:{slot_time:'Today 4–5 PM',slot_type:'scheduled'},
  h:440, mh:620,
  html: BASE + CT_BRIDGE.replace('@READYSCRIPT@','') + `
<style>
.card{background:#13161e;border-radius:20px;max-width:370px;width:100%;padding:20px;border:1px solid rgba(245,158,11,.15);animation:slideUp .45s ease}
@keyframes slideUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
.top-row{display:flex;align-items:center;gap:11px;margin-bottom:16px}
.ico{width:42px;height:42px;background:rgba(245,158,11,.1);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;border:1px solid rgba(245,158,11,.2)}
.ttl{font-size:14px;font-weight:700;color:#e4e8f5}
.sub{font-size:11px;color:#4e5470;margin-top:2px}
.timer-box{background:rgba(245,158,11,.07);border:1px solid rgba(245,158,11,.2);border-radius:12px;padding:14px;margin-bottom:16px;display:flex;align-items:center;gap:14px}
.countdown{display:flex;gap:8px}
.cu{text-align:center}
.cn{font-size:26px;font-weight:800;color:#fbbf24;font-family:monospace;line-height:1}
.cl{font-size:9px;text-transform:uppercase;letter-spacing:.08em;color:#92400e;font-weight:700;margin-top:2px}
.csep{font-size:22px;font-weight:700;color:#f59e0b;line-height:1.1;align-self:flex-start;margin-top:2px}
.emsg{font-size:11px;color:#fbbf24;line-height:1.5;margin-left:auto;text-align:right}
.slots{display:flex;flex-direction:column;gap:7px;margin-bottom:16px}
.slot-row{display:flex;align-items:center;gap:10px;padding:10px 12px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:9px;cursor:pointer;transition:.15s}
.slot-row:hover,.slot-row.sel{background:rgba(99,91,255,.08);border-color:rgba(99,91,255,.3)}
.slot-row input{accent-color:#635bff;flex-shrink:0}
.s-info{flex:1}
.s-time{font-size:13px;font-weight:600;color:#e4e8f5}
.s-av{font-size:10px;color:#22c87a}
.s-price{font-size:12px;font-weight:700;color:#635bff}
.btn-book{width:100%;background:#635bff;color:#fff;border:none;border-radius:10px;padding:12px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;transition:.2s}
.btn-book:hover{background:#5046e5;transform:translateY(-1px)}
</style>
<div class="card inapp-root">
  <div class="top-row"><div class="ico">📅</div><div><div class="ttl">Book Delivery Slot</div><div class="sub">3 items · Slot expires soon</div></div></div>
  <div class="timer-box">
    <div class="countdown">
      <div class="cu"><div class="cn" id="sm">23</div><div class="cl">Min</div></div>
      <div class="csep">:</div>
      <div class="cu"><div class="cn" id="ss">47</div><div class="cl">Sec</div></div>
    </div>
    <div class="emsg">⚠️ Preferred slot<br>expires in</div>
  </div>
  <div class="slots">
    <label class="slot-row sel"><input type="radio" name="slot" checked><div class="s-info"><div class="s-time">Today, 4:00 – 5:00 PM</div><div class="s-av">✓ 12 slots left</div></div><div class="s-price">FREE</div></label>
    <label class="slot-row"><input type="radio" name="slot"><div class="s-info"><div class="s-time">Today, 6:00 – 7:00 PM</div><div class="s-av">✓ 8 slots left</div></div><div class="s-price">FREE</div></label>
    <label class="slot-row"><input type="radio" name="slot"><div class="s-info"><div class="s-time">Tomorrow, 10:00 – 11:00 AM</div><div class="s-av">✓ Many available</div></div><div class="s-price">FREE</div></label>
  </div>
  <button class="btn-book" onclick="CT.pushEvent('Slot Booked',{slot:'Today 4-5 PM'});CT.dismiss()">Confirm Slot</button>
</div>
<script>let t=23*60+47;setInterval(()=>{t--;if(t<0)t=0;document.getElementById('sm').textContent=String(Math.floor(t/60)).padStart(2,'0');document.getElementById('ss').textContent=String(t%60).padStart(2,'0');},1000);<\/script>`,
  css:`/* Amber urgency palette + countdown animation */`,
  js:`let t = 23*60+47;\nsetInterval(() => {\n  t--;\n  document.getElementById('sm').textContent = String(Math.floor(t/60)).padStart(2,'0');\n  document.getElementById('ss').textContent = String(t%60).padStart(2,'0');\n}, 1000);\n\ndocument.querySelector('.btn-book').onclick = () => {\n  const slot = document.querySelector('input[name=slot]:checked');\n  CT.pushEvent('Slot Booked', { slot_time: 'Today 4-5 PM' });\n  CT.dismiss();\n};`
};

/* ====================================================
   6. QUICK COMMERCE — REORDER
   ==================================================== */
T['qc-reorder'] = {
  title:'Smart Reorder Nudge',
  desc:'Routine-based reorder prompt with live cart total and individual item add buttons.',
  tags:['Quick Commerce','Reorder','Personalized'],
  trigger:'App Launched',
  ctEvent:'Reorder Initiated',
  ctProps:{items_count:'3',total:'₹199',trigger:'routine'},
  h:440, mh:620,
  html: BASE + CT_BRIDGE.replace('@READYSCRIPT@','') + `
<style>
.card{background:#13161e;border-radius:20px;max-width:370px;width:100%;padding:18px;border:1px solid rgba(255,255,255,.07);animation:bounceIn .55s cubic-bezier(.34,1.6,.64,1)}
@keyframes bounceIn{from{opacity:0;transform:scale(.88)}to{opacity:1;transform:none}}
.chip{display:inline-flex;align-items:center;gap:5px;background:rgba(99,91,255,.12);color:#8a84ff;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;padding:3px 9px;border-radius:20px;border:1px solid rgba(99,91,255,.2);margin-bottom:12px}
h3{font-size:15px;font-weight:700;color:#e4e8f5;margin-bottom:4px}
.sub{font-size:12px;color:#4e5470;margin-bottom:16px}
.items{display:flex;flex-direction:column;gap:8px;margin-bottom:16px}
.ri{display:flex;align-items:center;gap:11px;padding:10px 12px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:10px}
.ri-e{font-size:22px;flex-shrink:0}
.ri-name{font-size:13px;font-weight:600;color:#e4e8f5;margin-bottom:1px}
.ri-meta{font-size:10px;color:#4e5470}
.ri-price{margin-left:auto;font-size:13px;font-weight:700;color:#e4e8f5}
.ri-add{background:#635bff;border:none;color:#fff;width:26px;height:26px;border-radius:7px;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;margin-left:7px;flex-shrink:0;transition:.2s}
.ri-add:hover{background:#5046e5;transform:scale(1.1)}
.total-row{display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:10px 14px;margin-bottom:14px}
.tl{font-size:12px;color:#4e5470}
.tv{font-size:15px;font-weight:700;color:#e4e8f5}
.btn-ro{width:100%;background:linear-gradient(135deg,#635bff,#8a84ff);color:#fff;border:none;border-radius:10px;padding:12px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;transition:.2s;display:flex;align-items:center;justify-content:center;gap:7px}
.btn-ro:hover{transform:translateY(-1px);box-shadow:0 8px 18px rgba(99,91,255,.4)}
</style>
<div class="card inapp-root">
  <div class="chip">🔄 Based on your routine</div>
  <h3>Time to restock?</h3>
  <p class="sub">You usually order these every 2 weeks</p>
  <div class="items">
    <div class="ri"><span class="ri-e">🥛</span><div><div class="ri-name">Full Cream Milk 1L</div><div class="ri-meta">Last ordered 13 days ago</div></div><span class="ri-price">₹68</span><button class="ri-add" onclick="CT.pushEvent('Item Added',{item:'Milk'})">+</button></div>
    <div class="ri"><span class="ri-e">🍞</span><div><div class="ri-name">Brown Bread Loaf</div><div class="ri-meta">Last ordered 12 days ago</div></div><span class="ri-price">₹42</span><button class="ri-add" onclick="CT.pushEvent('Item Added',{item:'Bread'})">+</button></div>
    <div class="ri"><span class="ri-e">🥚</span><div><div class="ri-name">Farm Fresh Eggs (12)</div><div class="ri-meta">Last ordered 14 days ago</div></div><span class="ri-price">₹89</span><button class="ri-add" onclick="CT.pushEvent('Item Added',{item:'Eggs'})">+</button></div>
  </div>
  <div class="total-row"><span class="tl">Cart Total</span><span class="tv">₹199</span></div>
  <button class="btn-ro" onclick="CT.pushEvent('Reorder Initiated',{items:3,total:'₹199'});CT.dismiss()">⚡ Reorder All — ₹199</button>
</div>`,
  css:`@keyframes bounceIn {\n  from { opacity:0; transform: scale(.88); }\n  to   { opacity:1; transform: none; }\n}`,
  js:`document.querySelector('.btn-ro').onclick = () => {\n  CT.pushEvent('Reorder Initiated', {\n    items_count: 3,\n    total: '₹199',\n    trigger: 'routine'\n  });\n  CT.dismiss();\n};`
};

/* ====================================================
   7. GIFTING — OCCASION REMINDER
   ==================================================== */
