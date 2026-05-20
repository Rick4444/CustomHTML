/* ============================================================
   ct-templates-gift.js
   🎁 Gifting & Occasions — Template definitions.
   Add new templates here using the same T['id'] = {...} pattern.
   All templates are auto-registered via CATS in ct-app.js.
   ============================================================ */

T['gift-remind'] = {
  title:'Occasion Reminder',
  desc:'Personalized reminder for upcoming birthdays and anniversaries with curated gift picks.',
  tags:['Gifting','Personalized','Animated'],
  trigger:'App Launched',
  ctEvent:'Gift Shop Opened',
  ctProps:{occasion:'Birthday',person:'{{contact_name}}',days_to_event:'3'},
  h:500, mh:680,
  html: BASE + CT_BRIDGE.replace('@READYSCRIPT@','') + `
<style>
.card{background:#13161e;border-radius:22px;max-width:370px;width:100%;overflow:hidden;border:1px solid rgba(255,255,255,.07);animation:floatIn .55s cubic-bezier(.34,1.4,.64,1)}
@keyframes floatIn{from{opacity:0;transform:translateY(40px) scale(.94)}to{opacity:1;transform:none}}
.hero{background:linear-gradient(135deg,#2d1432,#3d1a3d,#2e1428);padding:22px;text-align:center;position:relative;overflow:hidden}
.confetti{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;animation:confettiFloat 4s ease-in-out infinite}
@keyframes confettiFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
.av{width:62px;height:62px;border-radius:50%;background:linear-gradient(135deg,#ec4899,#f43f5e);display:flex;align-items:center;justify-content:center;font-size:26px;margin:0 auto 10px;border:3px solid rgba(255,255,255,.15);position:relative;z-index:1}
.occ-type{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#f9a8d4;margin-bottom:4px;position:relative;z-index:1}
.person-name{font-size:18px;font-weight:700;color:#fce7f3;margin-bottom:4px;position:relative;z-index:1}
.days-chip{display:inline-block;background:rgba(244,63,94,.15);color:#f87171;border:1px solid rgba(244,63,94,.3);font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;position:relative;z-index:1}
.body{padding:18px}
.gifts-lbl{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#4e5470;margin-bottom:10px}
.gift-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px}
.gc{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:10px;cursor:pointer;transition:.15s;text-align:center}
.gc:hover{border-color:rgba(244,63,94,.4);background:rgba(244,63,94,.06)}
.gc-emo{font-size:24px;display:block;margin-bottom:5px}
.gc-name{font-size:11px;font-weight:600;color:#e4e8f5;margin-bottom:2px}
.gc-price{font-size:10px;color:#ec4899}
.btn-shop{width:100%;background:linear-gradient(135deg,#ec4899,#f43f5e);color:#fff;border:none;border-radius:12px;padding:13px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;margin-bottom:9px;transition:.2s}
.btn-shop:hover{transform:translateY(-1px);box-shadow:0 8px 20px rgba(244,63,94,.4)}
.btn-later{width:100%;background:transparent;color:#4e5470;border:none;font-size:12px;cursor:pointer;font-family:inherit}
</style>
<div class="card inapp-root">
  <div class="hero">
    <div class="av">👩</div>
    <div class="occ-type">🎂 Birthday Reminder</div>
    <div class="person-name">{{contact_name}}'s Birthday</div>
    <div class="days-chip">in 3 days — May 23</div>
  </div>
  <div class="body">
    <div class="gifts-lbl">Popular gifts for her</div>
    <div class="gift-grid">
      <div class="gc" onclick="CT.pushEvent('Gift Category Selected',{category:'Flowers'})"><span class="gc-emo">💐</span><div class="gc-name">Flowers</div><div class="gc-price">from ₹499</div></div>
      <div class="gc" onclick="CT.pushEvent('Gift Category Selected',{category:'Cake'})"><span class="gc-emo">🎂</span><div class="gc-name">Custom Cake</div><div class="gc-price">from ₹699</div></div>
      <div class="gc" onclick="CT.pushEvent('Gift Category Selected',{category:'Toy'})"><span class="gc-emo">🧸</span><div class="gc-name">Soft Toy</div><div class="gc-price">from ₹299</div></div>
      <div class="gc" onclick="CT.pushEvent('Gift Category Selected',{category:'Chocolate'})"><span class="gc-emo">🍫</span><div class="gc-name">Chocolates</div><div class="gc-price">from ₹399</div></div>
    </div>
    <button class="btn-shop" onclick="CT.pushEvent('Gift Shop Opened',{occasion:'Birthday',person:'{{contact_name}}'});CT.dismiss()">🎁 Shop Gifts Now</button>
    <button class="btn-later" onclick="CT.pushEvent('Occasion Reminder Snoozed');CT.dismiss()">Remind me tomorrow</button>
  </div>
</div>`,
  css:`@keyframes floatIn {\n  from { opacity:0; transform: translateY(40px) scale(.94); }\n  to   { opacity:1; transform: none; }\n}`,
  js:`document.querySelector('.btn-shop').onclick = () => {\n  CT.pushEvent('Gift Shop Opened', {\n    occasion: 'Birthday',\n    person: '{{contact_name}}',\n    days_to_event: 3\n  });\n  CT.dismiss();\n};`
};

/* ====================================================
   8. GIFTING — SAME DAY DELIVERY
   ==================================================== */
T['gift-sameday'] = {
  title:'Same-Day Delivery Banner',
  desc:'Urgency banner showing same-day cutoff time for floral and gift deliveries.',
  tags:['Gifting','Timer','Animated'],
  trigger:'Product Viewed',
  ctEvent:'Same Day Order Initiated',
  ctProps:{delivery_type:'same_day',cutoff:'4:00 PM'},
  h:420, mh:600,
  html: BASE + CT_BRIDGE.replace('@READYSCRIPT@','') + `
<style>
.card{background:linear-gradient(135deg,#0a2618,#0d3322);border:1px solid rgba(34,200,122,.15);border-radius:20px;max-width:380px;width:100%;padding:20px;animation:slideRight .5s cubic-bezier(.34,1.4,.64,1)}
@keyframes slideRight{from{opacity:0;transform:translateX(-40px)}to{opacity:1;transform:none}}
.top-row{display:flex;align-items:center;gap:12px;margin-bottom:16px}
.ico{width:48px;height:48px;background:linear-gradient(135deg,rgba(34,200,122,.2),rgba(34,200,122,.06));border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:22px;border:1px solid rgba(34,200,122,.2)}
.ttl{font-size:15px;font-weight:700;color:#e4e8f5}
.sub{font-size:11px;color:#4e5470;margin-top:2px}
.cutoff{background:rgba(34,200,122,.08);border:1px solid rgba(34,200,122,.2);border-radius:12px;padding:14px;margin-bottom:16px;display:flex;align-items:center;gap:14px}
.ct-val{font-size:30px;font-weight:800;color:#22c87a;font-family:monospace;line-height:1}
.ct-lbl{font-size:9px;text-transform:uppercase;letter-spacing:.1em;color:rgba(34,200,122,.6);margin-top:2px}
.co-info{flex:1}
.co-h{font-size:12px;font-weight:600;color:#e4e8f5;margin-bottom:3px}
.co-s{font-size:11px;color:#4e5470;line-height:1.4}
.cats{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:16px}
.cat{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:10px 6px;text-align:center;cursor:pointer;transition:.15s}
.cat:hover{border-color:rgba(34,200,122,.3);background:rgba(34,200,122,.06)}
.cat-e{font-size:20px;display:block;margin-bottom:4px}
.cat-l{font-size:10px;color:#8b92b0}
.btn-od{width:100%;background:linear-gradient(135deg,#22c87a,#16a372);color:#064e3b;border:none;border-radius:12px;padding:13px;font-size:13px;font-weight:800;cursor:pointer;font-family:inherit;transition:.2s;display:flex;align-items:center;justify-content:center;gap:6px}
.btn-od:hover{transform:translateY(-1px);box-shadow:0 8px 20px rgba(34,200,122,.3)}
</style>
<div class="card inapp-root">
  <div class="top-row"><div class="ico">🌸</div><div><div class="ttl">Same-Day Delivery Available</div><div class="sub">Order before cutoff — delivered today</div></div></div>
  <div class="cutoff">
    <div><div class="ct-val" id="ctd">02:47</div><div class="ct-lbl">Time left</div></div>
    <div class="co-info"><div class="co-h">⏰ Order by 4:00 PM today</div><div class="co-s">Delivering within your city by 8 PM</div></div>
  </div>
  <div class="cats">
    <div class="cat" onclick="CT.pushEvent('Category Viewed',{cat:'Flowers'})"><span class="cat-e">💐</span><div class="cat-l">Flowers</div></div>
    <div class="cat" onclick="CT.pushEvent('Category Viewed',{cat:'Cakes'})"><span class="cat-e">🎂</span><div class="cat-l">Cakes</div></div>
    <div class="cat" onclick="CT.pushEvent('Category Viewed',{cat:'Gifts'})"><span class="cat-e">🧸</span><div class="cat-l">Gifts</div></div>
    <div class="cat" onclick="CT.pushEvent('Category Viewed',{cat:'Chocolate'})"><span class="cat-e">🍫</span><div class="cat-l">Choco</div></div>
  </div>
  <button class="btn-od" onclick="CT.pushEvent('Same Day Order Initiated',{cutoff:'4:00 PM'});CT.dismiss()">⚡ Order for Same-Day Delivery</button>
</div>
<script>let t=2*3600+47*60;setInterval(()=>{t--;if(t<0)t=0;const h=Math.floor(t/3600),m=Math.floor((t%3600)/60);document.getElementById('ctd').textContent=String(h).padStart(2,'0')+':'+String(m).padStart(2,'0');},1000);<\/script>`,
  css:`/* Same-day urgency — green palette */`,
  js:`let t = 2*3600 + 47*60;\nsetInterval(() => {\n  t--;\n  const h = Math.floor(t/3600), m = Math.floor((t%3600)/60);\n  document.getElementById('ctd').textContent =\n    String(h).padStart(2,'0') + ':' + String(m).padStart(2,'0');\n}, 1000);`
};

/* ====================================================
   9. GIFTING — GIFT UPSELL
   ==================================================== */
T['gift-upsell'] = {
  title:'Gift Add-On Upsell',
  desc:'Post-selection upsell for add-ons like message cards, packaging, and combo treats.',
  tags:['Gifting','Upsell','Interactive'],
  trigger:'Product Added to Cart',
  ctEvent:'Add-On Added',
  ctProps:{addon_name:'Message Card',addon_price:'₹49',parent_product:'Rose Bouquet'},
  h:480, mh:660,
  html: BASE + CT_BRIDGE.replace('@READYSCRIPT@','') + `
<style>
.card{background:#13161e;border-radius:22px;max-width:370px;width:100%;padding:20px;border:1px solid rgba(255,255,255,.07);animation:popIn .45s cubic-bezier(.34,1.6,.64,1)}
@keyframes popIn{from{opacity:0;transform:scale(.88) translateY(20px)}to{opacity:1;transform:none}}
.sel-item{display:flex;align-items:center;gap:11px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:12px;padding:12px;margin-bottom:16px}
.si-e{font-size:28px}
.si-name{font-size:13px;font-weight:600;color:#e4e8f5}
.si-price{font-size:12px;color:#22c87a;margin-top:2px}
.chk{margin-left:auto;background:rgba(34,200,122,.12);border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;color:#22c87a;font-size:14px;border:1px solid rgba(34,200,122,.25)}
.upsell-lbl{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.09em;color:#4e5470;margin-bottom:10px}
.addons{display:flex;flex-direction:column;gap:8px;margin-bottom:16px}
.addon{display:flex;align-items:center;gap:11px;padding:11px 13px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:10px;cursor:pointer;transition:.15s}
.addon:hover{border-color:rgba(236,72,153,.35);background:rgba(236,72,153,.06)}
.addon.sel{border-color:rgba(236,72,153,.5);background:rgba(236,72,153,.08)}
.ad-e{font-size:20px}
.ad-name{font-size:13px;font-weight:600;color:#e4e8f5;flex:1}
.ad-price{font-size:12px;font-weight:700;color:#ec4899}
.ad-chk{width:18px;height:18px;border-radius:5px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;font-size:10px;color:#ec4899;transition:.15s}
.addon.sel .ad-chk{background:#ec4899;border-color:#ec4899;color:#fff}
.tot-strip{display:flex;align-items:center;justify-content:space-between;background:rgba(236,72,153,.06);border:1px solid rgba(236,72,153,.15);border-radius:10px;padding:10px 14px;margin-bottom:14px}
.tot-lbl{font-size:12px;color:#f9a8d4}
.tot-val{font-size:15px;font-weight:700;color:#fce7f3}
.btn-add{width:100%;background:linear-gradient(135deg,#ec4899,#f43f5e);color:#fff;border:none;border-radius:12px;padding:13px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;transition:.2s}
.btn-add:hover{transform:translateY(-1px);box-shadow:0 8px 20px rgba(244,63,94,.35)}
.btn-skip2{width:100%;background:transparent;border:none;color:#4e5470;font-size:12px;padding:8px;cursor:pointer;font-family:inherit;margin-top:6px}
</style>
<div class="card inapp-root">
  <div class="sel-item"><span class="si-e">💐</span><div><div class="si-name">Premium Rose Bouquet</div><div class="si-price">₹999 added to cart</div></div><div class="chk">✓</div></div>
  <div class="upsell-lbl">🎀 Make it extra special</div>
  <div class="addons">
    <div class="addon" onclick="toggleAddon(this,'Message Card',49)"><span class="ad-e">💌</span><span class="ad-name">Personalised Card</span><span class="ad-price">+₹49</span><div class="ad-chk">✓</div></div>
    <div class="addon" onclick="toggleAddon(this,'Gift Wrapping',99)"><span class="ad-e">🎀</span><span class="ad-name">Premium Wrapping</span><span class="ad-price">+₹99</span><div class="ad-chk">✓</div></div>
    <div class="addon" onclick="toggleAddon(this,'Chocolate Box',449)"><span class="ad-e">🍫</span><span class="ad-name">Chocolate Box (16 pc)</span><span class="ad-price">+₹449</span><div class="ad-chk">✓</div></div>
  </div>
  <div class="tot-strip"><span class="tot-lbl">Cart Total</span><span class="tot-val" id="tot">₹999</span></div>
  <button class="btn-add" onclick="checkout()">Add Selected &amp; Checkout</button>
  <button class="btn-skip2" onclick="CT.dismiss()">No thanks, skip</button>
</div>
<script>
const prices=[49,99,449];
function toggleAddon(el,name,price){
  el.classList.toggle('sel');
  CT.pushEvent(el.classList.contains('sel')?'Add-On Added':'Add-On Removed',{addon_name:name,addon_price:price});
  let base=999;
  document.querySelectorAll('.addon').forEach((a,i)=>{if(a.classList.contains('sel'))base+=prices[i];});
  document.getElementById('tot').textContent='₹'+base;
}
function checkout(){CT.pushEvent('Checkout Initiated',{source:'upsell_modal'});CT.dismiss();}
<\/script>`,
  css:`/* Gift upsell — pink palette */`,
  js:`const prices = [49, 99, 449];\nfunction toggleAddon(el, name, price) {\n  el.classList.toggle('sel');\n  CT.pushEvent(el.classList.contains('sel') ? 'Add-On Added' : 'Add-On Removed', {\n    addon_name: name, addon_price: price\n  });\n  recalcTotal();\n}\nfunction recalcTotal() {\n  let base = 999;\n  document.querySelectorAll('.addon').forEach((a, i) => {\n    if (a.classList.contains('sel')) base += prices[i];\n  });\n  document.getElementById('tot').textContent = '₹' + base;\n}`
};

/* ====================================================
   10. AUTO — NEW LISTING
   ==================================================== */
