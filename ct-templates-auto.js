/* ============================================================
   ct-templates-auto.js
   🚗 Used Cars & Autos — Template definitions.
   Add new templates here using the same T['id'] = {...} pattern.
   All templates are auto-registered via CATS in ct-app.js.
   ============================================================ */

T['auto-listing'] = {
  title:'New Car Listing Alert',
  desc:'Card for a new listing that matches a saved user search. Car drives into frame.',
  tags:['Autos','Animated','Personalized'],
  trigger:'Search Saved',
  ctEvent:'Listing Viewed',
  ctProps:{listing_id:'{{listing_id}}',make:'Maruti',model:'Swift',year:'2022'},
  h:490, mh:660,
  html: BASE + CT_BRIDGE.replace('@READYSCRIPT@','') + `
<style>
.card{background:#13161e;border-radius:22px;max-width:380px;width:100%;overflow:hidden;border:1px solid rgba(255,255,255,.07);animation:slideUp .5s cubic-bezier(.34,1.4,.64,1)}
@keyframes slideUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:none}}
.car-hero{height:160px;background:linear-gradient(135deg,#0a1628,#0d2040);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
.car-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 80%,rgba(59,130,246,.2),transparent 60%)}
.car-e{font-size:64px;animation:carIn .7s ease .2s both;position:relative;z-index:1}
@keyframes carIn{from{opacity:0;transform:translateX(-80px)}to{opacity:1;transform:none}}
.new-tag{position:absolute;top:12px;left:12px;background:#3b82f6;color:#fff;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;padding:3px 9px;border-radius:5px}
.match-tag{position:absolute;top:12px;right:12px;background:rgba(34,200,122,.15);color:#22c87a;font-size:10px;font-weight:700;padding:3px 9px;border-radius:20px;border:1px solid rgba(34,200,122,.25)}
.body{padding:18px}
.car-name{font-size:17px;font-weight:700;color:#e4e8f5;margin-bottom:4px}
.car-sub{font-size:12px;color:#4e5470;margin-bottom:13px}
.specs{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:13px}
.spec{background:rgba(255,255,255,.04);border-radius:9px;padding:9px 8px;text-align:center}
.sv{font-size:13px;font-weight:700;color:#e4e8f5;display:block}
.sl{font-size:10px;color:#4e5470;margin-top:2px}
.price-row{display:flex;align-items:baseline;gap:9px;margin-bottom:16px}
.price{font-size:22px;font-weight:800;color:#e4e8f5}
.emi{font-size:12px;color:#4e5470}
.emi span{color:#3b82f6;font-weight:600}
.acts{display:grid;grid-template-columns:1fr auto auto;gap:8px}
.btn-v{background:#3b82f6;color:#fff;border:none;border-radius:10px;padding:12px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;transition:.2s}
.btn-v:hover{background:#2563eb}
.btn-ico{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);color:#8b92b0;border-radius:10px;padding:12px 14px;font-size:15px;cursor:pointer;transition:.2s}
.btn-ico:hover{background:rgba(255,255,255,.12);color:#e4e8f5}
</style>
<div class="card inapp-root">
  <div class="car-hero">
    <span class="new-tag">NEW</span><span class="match-tag">✓ Matches Search</span>
    <span class="car-e">🚙</span>
  </div>
  <div class="body">
    <div class="car-name">2022 Maruti Swift ZXi+</div>
    <div class="car-sub">30,400 km · Petrol · Delhi NCR · 1 Owner</div>
    <div class="specs">
      <div class="spec"><span class="sv">30.4K</span><span class="sl">KMs</span></div>
      <div class="spec"><span class="sv">2022</span><span class="sl">Year</span></div>
      <div class="spec"><span class="sv">9.2/10</span><span class="sl">Condition</span></div>
    </div>
    <div class="price-row"><span class="price">₹6.45 L</span><span class="emi">EMI <span>₹12,400/mo</span></span></div>
    <div class="acts">
      <button class="btn-v" onclick="CT.pushEvent('Listing Viewed',{listing_id:'{{listing_id}}',source:'inapp'});CT.dismiss()">View Details</button>
      <button class="btn-ico" onclick="CT.pushEvent('Listing Wishlisted',{listing_id:'{{listing_id}}'})">💛</button>
      <button class="btn-ico" onclick="CT.pushEvent('Listing Shared',{listing_id:'{{listing_id}}'})">📤</button>
    </div>
  </div>
</div>`,
  css:`@keyframes carIn {\n  from { opacity:0; transform: translateX(-80px); }\n  to   { opacity:1; transform: none; }\n}`,
  js:`document.querySelector('.btn-v').onclick = () => {\n  CT.pushEvent('Listing Viewed', {\n    listing_id: '{{listing_id}}',\n    source: 'inapp_banner'\n  });\n  CT.dismiss();\n};`
};

/* ====================================================
   11. AUTO — PRICE DROP
   ==================================================== */
T['auto-drop'] = {
  title:'Price Drop Alert',
  desc:'Notification when a saved car drops in price — badge animation triggers urgency.',
  tags:['Autos','Price Drop','Animated'],
  trigger:'Wishlist Viewed',
  ctEvent:'Price Drop CTA Clicked',
  ctProps:{listing_id:'{{listing_id}}',old_price:'₹7.9L',new_price:'₹7.2L',savings:'₹70K'},
  h:440, mh:600,
  html: BASE + CT_BRIDGE.replace('@READYSCRIPT@','') + `
<style>
.toast{background:#13161e;border-radius:20px;max-width:370px;width:100%;border:1px solid rgba(34,200,122,.15);padding:18px;animation:dropIn .55s cubic-bezier(.34,1.4,.64,1)}
@keyframes dropIn{from{opacity:0;transform:translateY(-50px) scale(.9)}to{opacity:1;transform:none}}
.top{display:flex;align-items:center;gap:10px;margin-bottom:14px}
.drop-ico{width:40px;height:40px;background:rgba(34,200,122,.12);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:18px;border:1px solid rgba(34,200,122,.2);animation:icoIn .6s cubic-bezier(.34,1.8,.64,1) .3s both}
@keyframes icoIn{from{transform:scale(0)}to{transform:none}}
.at{flex:1}
.at-title{font-size:13px;font-weight:700;color:#e4e8f5}
.at-sub{font-size:11px;color:#4e5470;margin-top:1px}
.saved-b{background:rgba(34,200,122,.1);color:#22c87a;border:1px solid rgba(34,200,122,.2);font-size:10px;font-weight:600;padding:3px 8px;border-radius:20px}
.car-strip{display:flex;align-items:center;gap:12px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:12px;padding:12px;margin-bottom:14px}
.car-e2{font-size:32px}
.ci{flex:1}
.cn{font-size:13px;font-weight:600;color:#e4e8f5;margin-bottom:2px}
.cm{font-size:11px;color:#4e5470}
.pc{text-align:right}
.pnew{font-size:17px;font-weight:800;color:#22c87a}
.pwas{font-size:11px;color:#4e5470;text-decoration:line-through}
.psave{font-size:10px;color:#22c87a;font-weight:700}
.urg{background:rgba(245,158,11,.07);border:1px solid rgba(245,158,11,.2);border-radius:9px;padding:9px 12px;margin-bottom:14px;font-size:11px;color:#fbbf24;display:flex;align-items:center;gap:7px}
.acts{display:flex;gap:8px}
.btn-vn{flex:1;background:linear-gradient(135deg,#22c87a,#16a372);color:#064e3b;border:none;border-radius:10px;padding:11px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;transition:.2s}
.btn-vn:hover{transform:translateY(-1px);box-shadow:0 6px 16px rgba(34,200,122,.3)}
.btn-dis{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);color:#8b92b0;border-radius:10px;padding:11px 14px;font-size:12px;cursor:pointer;font-family:inherit}
</style>
<div class="toast inapp-root">
  <div class="top">
    <div class="drop-ico">📉</div>
    <div class="at"><div class="at-title">Price Dropped on Your Wishlist!</div><div class="at-sub">2020 i20 Sportz · Saved 3 days ago</div></div>
    <div class="saved-b">❤ Saved</div>
  </div>
  <div class="car-strip">
    <span class="car-e2">🚗</span>
    <div class="ci"><div class="cn">2020 i20 Sportz MT</div><div class="cm">42,000 km · Petrol · Mumbai</div></div>
    <div class="pc"><div class="pnew">₹7.2 L</div><div class="pwas">₹7.9 L</div><div class="psave">Save ₹70K</div></div>
  </div>
  <div class="urg">⚠️ 6 people viewed this in the last 24 hours</div>
  <div class="acts">
    <button class="btn-vn" onclick="CT.pushEvent('Price Drop CTA Clicked',{listing_id:'{{listing_id}}',savings:'₹70K'});CT.dismiss()">View &amp; Book Test Drive</button>
    <button class="btn-dis" onclick="CT.pushEvent('Price Drop Dismissed');CT.dismiss()">Dismiss</button>
  </div>
</div>`,
  css:`@keyframes dropIn {\n  from { opacity:0; transform: translateY(-50px) scale(.9); }\n  to   { opacity:1; transform: none; }\n}`,
  js:`document.querySelector('.btn-vn').onclick = () => {\n  CT.pushEvent('Price Drop CTA Clicked', {\n    listing_id: '{{listing_id}}',\n    savings: '₹70K'\n  });\n  CT.dismiss();\n};`
};

/* ====================================================
   12. AUTO — VALUATION
   ==================================================== */
T['auto-val'] = {
  title:'Sell Your Car CTA',
  desc:'Instant valuation prompt for sell-side users — drives lead generation for dealer marketplace.',
  tags:['Autos','Lead Gen','Interactive'],
  trigger:'App Launched',
  ctEvent:'Valuation Requested',
  ctProps:{reg_number:'{{reg_number}}',city:'{{city}}'},
  h:470, mh:650,
  html: BASE + CT_BRIDGE.replace('@READYSCRIPT@','') + `
<style>
.card{background:#13161e;border-radius:22px;max-width:370px;width:100%;padding:22px;border:1px solid rgba(255,255,255,.07);animation:fadeUp .45s ease}
@keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
.hero-c{text-align:center;margin-bottom:20px}
.car-big{font-size:48px;display:block;margin-bottom:10px;animation:bounce .8s ease infinite alternate}
@keyframes bounce{from{transform:translateY(0)}to{transform:translateY(-8px)}}
h3{font-size:17px;font-weight:700;color:#e4e8f5;margin-bottom:6px}
.sub2{font-size:12px;color:#4e5470;line-height:1.5;margin-bottom:16px}
.range-preview{background:linear-gradient(135deg,rgba(245,158,11,.08),rgba(245,158,11,.03));border:1px solid rgba(245,158,11,.2);border-radius:12px;padding:14px;margin-bottom:16px;display:flex;align-items:center;gap:12px}
.range-ico{font-size:22px}
.range-info{flex:1}
.range-lbl{font-size:10px;color:#f59e0b;font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin-bottom:3px}
.range-val{font-size:18px;font-weight:800;color:#fbbf24}
.range-sub{font-size:10px;color:#4e5470;margin-top:2px}
.trust{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:16px}
.ti{background:rgba(255,255,255,.03);border-radius:9px;padding:9px 6px;text-align:center}
.tn{font-size:14px;font-weight:700;color:#e4e8f5;display:block}
.tl{font-size:9px;color:#4e5470;margin-top:2px}
.reg-row{display:flex;gap:8px;margin-bottom:14px}
input[type=text]{flex:1;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:9px;padding:11px 14px;color:#e4e8f5;font-family:inherit;font-size:13px;outline:none;transition:.2s;letter-spacing:.04em}
input:focus{border-color:rgba(245,158,11,.5);background:rgba(245,158,11,.05)}
input::placeholder{color:#2e3455}
.btn-val{background:linear-gradient(135deg,#f5a623,#fbbf24);color:#78350f;border:none;border-radius:9px;padding:11px 16px;font-size:13px;font-weight:800;cursor:pointer;font-family:inherit;transition:.2s;flex-shrink:0}
.btn-val:hover{transform:translateY(-1px)}
.disc{font-size:10px;color:#2e3455;text-align:center;line-height:1.5}
</style>
<div class="card inapp-root">
  <div class="hero-c">
    <span class="car-big">🚘</span>
    <h3>Get Your Car's Best Price</h3>
    <p class="sub2">Sell at the best price. Free inspection. Instant payment. Thousands of dealers competing for your car.</p>
  </div>
  <div class="range-preview">
    <span class="range-ico">💰</span>
    <div class="range-info">
      <div class="range-lbl">Estimated Range (your city)</div>
      <div class="range-val">₹3.2L – ₹4.8L</div>
      <div class="range-sub">Based on recent similar sales</div>
    </div>
  </div>
  <div class="trust">
    <div class="ti"><span class="tn">10K+</span><span class="tl">Dealers</span></div>
    <div class="ti"><span class="tn">48hr</span><span class="tl">Payment</span></div>
    <div class="ti"><span class="tn">Free</span><span class="tl">Inspection</span></div>
  </div>
  <div class="reg-row">
    <input type="text" id="reg-inp" placeholder="Enter Reg. No. e.g. DL01AB1234" maxlength="10">
    <button class="btn-val" onclick="doVal()">Get Price</button>
  </div>
  <div class="disc">Free valuation · No obligation · Certified dealers only</div>
</div>
<script>
function doVal(){
  const r=document.getElementById('reg-inp').value;
  CT.pushEvent('Valuation Requested',{reg_number:r,source:'inapp'});
  CT.dismiss();
}
<\/script>`,
  css:`@keyframes bounce {\n  from { transform: translateY(0); }\n  to   { transform: translateY(-8px); }\n}`,
  js:`function doVal() {\n  const reg = document.getElementById('reg-inp').value;\n  CT.pushEvent('Valuation Requested', {\n    reg_number: reg,\n    source: 'inapp'\n  });\n  CT.dismiss();\n}`
};

/* ====================================================
   13. E-COMM — FLASH SALE
   ==================================================== */
