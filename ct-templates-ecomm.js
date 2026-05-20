/* ============================================================
   ct-templates-ecomm.js
   🛒 E-Commerce — Template definitions.
   Add new templates here using the same T['id'] = {...} pattern.
   All templates are auto-registered via CATS in ct-app.js.
   ============================================================ */

T['ec-flash'] = {
  title:'Flash Sale Countdown',
  desc:'Amber urgency timer with deal cards. Live countdown drives click-through urgency.',
  tags:['E-Commerce','Timer','Urgent'],
  trigger:'Home Screen Viewed',
  ctEvent:'Flash Sale CTA Clicked',
  ctProps:{sale_id:'flash_001',discount:'70%'},
  h:510, mh:700,
  html: BASE + CT_BRIDGE.replace('@READYSCRIPT@','') + `
<style>
.sale{background:#13161e;border-radius:20px;max-width:390px;width:100%;border:1px solid rgba(245,158,11,.14);animation:slideUp .45s ease}
@keyframes slideUp{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:none}}
.sale-top{background:linear-gradient(135deg,#78350f,#92400e);padding:16px 18px;border-radius:20px 20px 0 0;position:relative;overflow:hidden}
.sale-top::before{content:'⚡';position:absolute;right:-10px;top:-18px;font-size:76px;opacity:.08}
.sl{font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.12em;color:rgba(253,186,116,.8);margin-bottom:3px}
.st{font-size:20px;font-weight:800;color:#fef3c7;letter-spacing:-.02em}
.ss{font-size:11px;color:rgba(253,186,116,.6);margin-top:3px}
.timer{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding:14px 16px}
.tb{background:rgba(245,158,11,.08);border:1px solid rgba(245,158,11,.2);border-radius:10px;padding:10px 6px;text-align:center}
.tn{font-size:24px;font-weight:800;color:#fbbf24;font-family:monospace;line-height:1;display:block}
.tl{font-size:9px;text-transform:uppercase;letter-spacing:.1em;color:#92400e;margin-top:3px;display:block;font-weight:700}
.deals{padding:0 16px 16px}
.deal{display:flex;align-items:center;gap:10px;padding:10px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:10px;margin-bottom:7px;cursor:pointer;transition:.2s}
.deal:hover{background:rgba(245,158,11,.06);border-color:rgba(245,158,11,.2)}
.de{width:40px;height:40px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:20px}
.dn{font-size:12px;font-weight:600;color:#e4e8f5;margin-bottom:2px}
.dp{display:flex;align-items:center;gap:5px}
.dp-new{font-size:13px;font-weight:700;color:#fbbf24}
.dp-old{font-size:11px;color:#4e5470;text-decoration:line-through}
.dp-d{background:rgba(34,200,122,.1);color:#22c87a;font-size:10px;font-weight:700;padding:1px 6px;border-radius:4px}
.btn-sh{display:block;width:calc(100% - 32px);margin:0 16px 16px;background:linear-gradient(135deg,#f59e0b,#fbbf24);color:#78350f;border:none;border-radius:10px;padding:13px;font-size:13px;font-weight:800;cursor:pointer;font-family:inherit;transition:.2s;text-align:center}
.btn-sh:hover{transform:translateY(-1px);box-shadow:0 8px 20px rgba(245,158,11,.35)}
</style>
<div class="sale inapp-root">
  <div class="sale-top"><div class="sl">⚡ Limited Time</div><div class="st">Flash Sale — 70% OFF</div><div class="ss">Ends tonight at midnight</div></div>
  <div class="timer">
    <div class="tb"><span class="tn" id="h">08</span><span class="tl">Hrs</span></div>
    <div class="tb"><span class="tn" id="m">43</span><span class="tl">Min</span></div>
    <div class="tb"><span class="tn" id="s">21</span><span class="tl">Sec</span></div>
    <div class="tb"><span class="tn">70%</span><span class="tl">Off</span></div>
  </div>
  <div class="deals">
    <div class="deal" onclick="CT.pushEvent('Deal Clicked',{item:'Headphones'})"><div class="de" style="background:rgba(99,91,255,.1)">🎧</div><div><div class="dn">Wireless Headphones XM5</div><div class="dp"><span class="dp-new">₹12,999</span><span class="dp-old">₹34,990</span><span class="dp-d">-63%</span></div></div></div>
    <div class="deal" onclick="CT.pushEvent('Deal Clicked',{item:'Tablet'})"><div class="de" style="background:rgba(59,130,246,.1)">📱</div><div><div class="dn">Galaxy Tab S9 128GB</div><div class="dp"><span class="dp-new">₹29,999</span><span class="dp-old">₹64,990</span><span class="dp-d">-54%</span></div></div></div>
  </div>
  <button class="btn-sh" onclick="CT.pushEvent('Flash Sale CTA Clicked',{sale_id:'flash_001'});CT.dismiss()">⚡ Shop All Flash Deals</button>
</div>
<script>let t=8*3600+43*60+21;setInterval(()=>{t--;document.getElementById('h').textContent=String(Math.floor(t/3600)).padStart(2,'0');document.getElementById('m').textContent=String(Math.floor((t%3600)/60)).padStart(2,'0');document.getElementById('s').textContent=String(t%60).padStart(2,'0');},1000);<\/script>`,
  css:`/* Amber palette + countdown */`,
  js:`let t = 8*3600+43*60+21;\nsetInterval(() => {\n  t--;\n  document.getElementById('h').textContent = String(Math.floor(t/3600)).padStart(2,'0');\n  document.getElementById('m').textContent = String(Math.floor((t%3600)/60)).padStart(2,'0');\n  document.getElementById('s').textContent = String(t%60).padStart(2,'0');\n}, 1000);`
};

/* ====================================================
   14. E-COMM — PRODUCT
   ==================================================== */
T['ec-product'] = {
  title:'Product Showcase Card',
  desc:'Rich product card with color swatch picker, ratings, wishlist toggle, and add-to-cart.',
  tags:['E-Commerce','Interactive','Animated'],
  trigger:'Product Viewed',
  ctEvent:'Add to Cart',
  ctProps:{product_id:'{{product_id}}',product_name:'Smartwatch Series 10',price:'₹41900'},
  h:520, mh:700,
  html: BASE + CT_BRIDGE.replace('@READYSCRIPT@','') + `
<style>
.pcard{background:#13161e;border-radius:22px;max-width:360px;width:100%;overflow:hidden;border:1px solid rgba(255,255,255,.07);animation:zoomIn .45s cubic-bezier(.34,1.5,.64,1)}
@keyframes zoomIn{from{opacity:0;transform:scale(.9)}to{opacity:1;transform:none}}
.img-sec{height:200px;background:linear-gradient(135deg,#1e1e30,#2d2b55);position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden}
.p-e{font-size:66px;transition:.3s;cursor:pointer}
.p-e:hover{transform:scale(1.1) rotate(5deg)}
.img-dots{position:absolute;bottom:10px;left:50%;transform:translateX(-50%);display:flex;gap:5px}
.idot{width:5px;height:5px;border-radius:50%;background:rgba(255,255,255,.3)}
.idot.a{background:#635bff;width:14px;border-radius:3px}
.wish-btn{position:absolute;top:10px;right:10px;background:rgba(0,0,0,.4);border:none;width:32px;height:32px;border-radius:50%;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:.2s;backdrop-filter:blur(6px)}
.wish-btn:hover{transform:scale(1.1)}
.ntag{position:absolute;top:10px;left:10px;background:#22c87a;color:#064e3b;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;padding:3px 9px;border-radius:20px}
.dets{padding:16px}
.brand2{font-size:10px;font-weight:700;color:#635bff;text-transform:uppercase;letter-spacing:.1em;margin-bottom:3px}
.pname2{font-size:15px;font-weight:700;color:#e4e8f5;margin-bottom:5px;line-height:1.3}
.stars2{display:flex;align-items:center;gap:4px;margin-bottom:10px}
.star2{color:#f59e0b;font-size:11px}
.rtxt{font-size:10px;color:#4e5470}
.colors2{display:flex;gap:5px;margin-bottom:12px;align-items:center}
.clbl{font-size:10px;color:#4e5470;margin-right:3px}
.cdot{width:17px;height:17px;border-radius:50%;cursor:pointer;border:2px solid transparent;transition:.15s}
.cdot.sel{border-color:rgba(255,255,255,.5);transform:scale(1.2)}
.pr2{display:flex;align-items:baseline;gap:7px;margin-bottom:14px}
.pnew2{font-size:21px;font-weight:700;color:#e4e8f5}
.pold2{font-size:12px;color:#4e5470;text-decoration:line-through}
.pdisc{background:rgba(34,200,122,.1);color:#22c87a;font-size:10px;font-weight:700;padding:2px 7px;border-radius:20px;border:1px solid rgba(34,200,122,.2)}
.acts2{display:flex;gap:7px}
.btn-cart2{flex:1;background:#635bff;color:#fff;border:none;border-radius:10px;padding:12px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;transition:.2s}
.btn-cart2:hover{background:#5046e5;transform:translateY(-1px)}
.btn-buy2{flex:1;background:rgba(255,255,255,.06);color:#e4e8f5;border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:12px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;transition:.2s}
</style>
<div class="pcard inapp-root">
  <div class="img-sec">
    <span class="ntag">New</span>
    <button class="wish-btn" onclick="this.textContent=this.textContent=='♡'?'♥':'♡';CT.pushEvent(this.textContent=='♥'?'Wishlist Added':'Wishlist Removed',{product_id:'{{product_id}}'})">♡</button>
    <div class="p-e">⌚</div>
    <div class="img-dots"><div class="idot a"></div><div class="idot"></div><div class="idot"></div></div>
  </div>
  <div class="dets">
    <div class="brand2">SmartWear</div>
    <div class="pname2">Smartwatch Series 10 GPS + Cellular</div>
    <div class="stars2"><span class="star2">★★★★</span><span class="star2" style="opacity:.25">★</span><span class="rtxt">4.2 (1,240 reviews)</span></div>
    <div class="colors2">
      <span class="clbl">Color:</span>
      <div class="cdot sel" style="background:#111" onclick="selColor(this)"></div>
      <div class="cdot" style="background:#f0ebe3" onclick="selColor(this)"></div>
      <div class="cdot" style="background:#e8d5b7" onclick="selColor(this)"></div>
      <div class="cdot" style="background:#2d4a7a" onclick="selColor(this)"></div>
    </div>
    <div class="pr2"><span class="pnew2">₹41,900</span><span class="pold2">₹55,900</span><span class="pdisc">25% OFF</span></div>
    <div class="acts2">
      <button class="btn-cart2" onclick="CT.pushEvent('Add to Cart',{product_id:'{{product_id}}',price:'₹41900'});CT.dismiss()">🛒 Add to Cart</button>
      <button class="btn-buy2" onclick="CT.pushEvent('Buy Now Clicked',{product_id:'{{product_id}}'});CT.dismiss()">Buy Now</button>
    </div>
  </div>
</div>
<script>function selColor(el){document.querySelectorAll('.cdot').forEach(d=>d.classList.remove('sel'));el.classList.add('sel');CT.pushEvent('Color Selected',{color:el.style.background});}<\/script>`,
  css:`@keyframes zoomIn {\n  from { opacity:0; transform: scale(.9); }\n  to   { opacity:1; transform: none; }\n}`,
  js:`document.querySelector('.btn-cart2').onclick = () => {\n  CT.pushEvent('Add to Cart', {\n    product_id: '{{product_id}}',\n    price: '₹41900'\n  });\n  CT.dismiss();\n};\nfunction selColor(el) {\n  document.querySelectorAll('.cdot').forEach(d => d.classList.remove('sel'));\n  el.classList.add('sel');\n  CT.pushEvent('Color Selected', { color: el.style.background });\n}`
};

/* ====================================================
   15. E-COMM — CART REMINDER
   ==================================================== */
T['ec-cart'] = {
  title:'Abandoned Cart Reminder',
  desc:'Recovery nudge with item preview, stock urgency badge, and direct checkout.',
  tags:['E-Commerce','Recovery','Animated'],
  trigger:'App Launched',
  ctEvent:'Checkout Started',
  ctProps:{cart_value:'₹14,198',items_count:'2',abandoned_hours:'2'},
  h:460, mh:640,
  html: BASE + CT_BRIDGE.replace('@READYSCRIPT@','') + `
<style>
.ct{background:#13161e;border-radius:18px;max-width:375px;width:100%;border:1px solid rgba(255,255,255,.07);overflow:hidden;animation:slideLeft .5s cubic-bezier(.34,1.4,.64,1)}
@keyframes slideLeft{from{opacity:0;transform:translateX(50px)}to{opacity:1;transform:none}}
.ct-top{background:linear-gradient(135deg,#1e1b4b,#1e3a5f);padding:13px 15px;display:flex;align-items:center;gap:10px}
.ct-ico{width:34px;height:34px;background:rgba(99,91,255,.2);border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:16px}
.ctt{font-size:13px;font-weight:700;color:#e4e8f5}
.cts{font-size:10px;color:#4e5470}
.x2{margin-left:auto;background:transparent;border:none;color:#4e5470;font-size:14px;cursor:pointer;width:22px;height:22px;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:.15s}
.x2:hover{background:rgba(255,255,255,.08)}
.items2{padding:14px}
.ci2{display:flex;align-items:center;gap:10px;padding:9px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.05);border-radius:9px;margin-bottom:7px;cursor:pointer;transition:.15s}
.ci2:hover{background:rgba(99,91,255,.06);border-color:rgba(99,91,255,.2)}
.ci-th{width:38px;height:38px;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:18px}
.cin{font-size:12px;font-weight:600;color:#e4e8f5;margin-bottom:1px}
.cim{font-size:10px;color:#4e5470}
.cip{margin-left:auto;font-size:12px;font-weight:700;color:#e4e8f5}
.urg2{margin:0 14px 12px;background:rgba(239,68,68,.07);border:1px solid rgba(239,68,68,.15);border-radius:8px;padding:8px 11px;display:flex;align-items:center;gap:7px;font-size:11px;color:#fca5a5}
.tot2{display:flex;align-items:center;justify-content:space-between;padding:0 14px 12px}
.tl2{font-size:11px;color:#4e5470}
.tv2{font-size:14px;font-weight:700;color:#e4e8f5}
.acts3{display:flex;gap:7px;padding:0 14px 14px}
.btn-ch2{flex:1;background:#635bff;color:#fff;border:none;border-radius:9px;padding:11px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;transition:.2s}
.btn-ch2:hover{background:#5046e5;transform:translateY(-1px)}
.btn-sv{background:rgba(255,255,255,.06);color:#8b92b0;border:1px solid rgba(255,255,255,.08);border-radius:9px;padding:11px 13px;font-size:12px;cursor:pointer;font-family:inherit}
</style>
<div class="ct inapp-root">
  <div class="ct-top"><div class="ct-ico">🛒</div><div><div class="ctt">Your cart misses you!</div><div class="cts">2 items · saved for 24 hrs</div></div><button class="x2" onclick="CT.dismiss()">✕</button></div>
  <div class="items2">
    <div class="ci2"><div class="ci-th" style="background:rgba(99,91,255,.1)">🎧</div><div><div class="cin">Wireless Headphones XM5</div><div class="cim">Black · Qty: 1</div></div><span class="cip">₹12,999</span></div>
    <div class="ci2"><div class="ci-th" style="background:rgba(245,158,11,.1)">📱</div><div><div class="cin">Tablet Case Pro</div><div class="cim">Clear · Qty: 2</div></div><span class="cip">₹1,199</span></div>
  </div>
  <div class="urg2">⏰ Only 3 left in stock for Headphones XM5</div>
  <div class="tot2"><span class="tl2">Cart Total</span><span class="tv2">₹14,198</span></div>
  <div class="acts3">
    <button class="btn-ch2" onclick="CT.pushEvent('Checkout Started',{cart_value:'₹14198',items:2,source:'inapp_cart_reminder'});CT.dismiss()">Checkout Now →</button>
    <button class="btn-sv" onclick="CT.pushEvent('Cart Saved');CT.dismiss()">Save</button>
  </div>
</div>`,
  css:`@keyframes slideLeft {\n  from { opacity:0; transform: translateX(50px); }\n  to   { opacity:1; transform: none; }\n}`,
  js:`document.querySelector('.btn-ch2').onclick = () => {\n  CT.pushEvent('Checkout Started', {\n    cart_value: '₹14198',\n    items_count: 2,\n    source: 'inapp_cart_reminder'\n  });\n  CT.dismiss();\n};`
};

/* ====================================================
   16. ENGAGEMENT — STAR RATING
   ==================================================== */
