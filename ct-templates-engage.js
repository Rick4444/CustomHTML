/* ============================================================
   ct-templates-engage.js
   💬 Engagement — Template definitions.
   Add new templates here using the same T['id'] = {...} pattern.
   All templates are auto-registered via CATS in ct-app.js.
   ============================================================ */

T['eg-rate'] = {
  title:'Star Rating Prompt',
  desc:'Interactive star rating with emoji mood indicator and conditional review input.',
  tags:['Engagement','Interactive','Animated'],
  trigger:'Order Delivered',
  ctEvent:'Rating Submitted',
  ctProps:{rating:'{{rating}}',feedback:'{{feedback}}'},
  h:440, mh:600,
  html: BASE + CT_BRIDGE.replace('@READYSCRIPT@','') + `
<style>
.rc{background:#13161e;border-radius:22px;max-width:345px;width:100%;padding:26px;border:1px solid rgba(255,255,255,.07);text-align:center;animation:popIn .45s cubic-bezier(.34,1.6,.64,1)}
@keyframes popIn{from{opacity:0;transform:scale(.86)}to{opacity:1;transform:none}}
.app-ico{width:60px;height:60px;border-radius:15px;background:linear-gradient(135deg,#635bff,#8a84ff);display:flex;align-items:center;justify-content:center;font-size:26px;margin:0 auto 14px;box-shadow:0 8px 20px rgba(99,91,255,.35)}
h4{font-size:17px;font-weight:700;color:#e4e8f5;margin-bottom:5px}
.rdesc{font-size:12px;color:#4e5470;line-height:1.5;margin-bottom:18px}
.mood{font-size:38px;min-height:46px;margin-bottom:14px;transition:.3s;line-height:1}
.stars3{display:flex;justify-content:center;gap:6px;margin-bottom:18px}
.sb{background:transparent;border:none;font-size:30px;cursor:pointer;transition:.2s;filter:grayscale(1);opacity:.4;padding:2px}
.sb.a{filter:none;opacity:1;transform:scale(1.15);animation:starPop .18s ease}
@keyframes starPop{0%{transform:scale(1.5)}100%{transform:scale(1.15)}}
.fba{display:none;margin-bottom:14px}
.fba.show{display:block}
textarea{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:9px;padding:10px;color:#e4e8f5;font-family:inherit;font-size:12px;resize:none;height:68px;outline:none;transition:.2s}
textarea:focus{border-color:rgba(99,91,255,.5)}
textarea::placeholder{color:#2e3455}
.btn-sub{width:100%;background:#635bff;color:#fff;border:none;border-radius:12px;padding:12px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;margin-bottom:8px;transition:.2s}
.btn-sub:hover{background:#5046e5}
.btn-sub:disabled{opacity:.35;cursor:not-allowed}
.btn-skip3{background:transparent;border:none;color:#4e5470;font-size:11px;cursor:pointer;font-family:inherit}
.ty{display:none;padding:8px 0}
.ty.show{display:block}
</style>
<div class="rc inapp-root">
  <div class="app-ico">⭐</div>
  <h4>How was your experience?</h4>
  <p class="rdesc">Rate us — it takes 10 seconds and helps us improve!</p>
  <div class="mood" id="mood">🤩</div>
  <div class="stars3" id="srow">
    <button class="sb" onclick="rate(1)">★</button><button class="sb" onclick="rate(2)">★</button>
    <button class="sb" onclick="rate(3)">★</button><button class="sb" onclick="rate(4)">★</button>
    <button class="sb a" onclick="rate(5)">★</button>
  </div>
  <div class="fba" id="fba"><textarea id="fb" placeholder="Tell us more... (optional)"></textarea></div>
  <button class="btn-sub" id="sub" onclick="doSub()">Submit Rating</button>
  <button class="btn-skip3" onclick="CT.pushEvent('Rating Skipped');CT.dismiss()">Skip for now</button>
  <div class="ty" id="ty"><div style="font-size:40px;margin-bottom:10px">🎉</div><h4>Thanks for the feedback!</h4><p style="font-size:12px;color:#4e5470;margin-top:6px">Helping us improve your experience.</p></div>
</div>
<script>
const moods=['😤','😕','😐','😊','🤩'];
let cur=5;
document.querySelectorAll('.sb').forEach((b,i)=>b.classList.toggle('a',i<5));
function rate(v){
  cur=v;
  document.querySelectorAll('.sb').forEach((b,i)=>b.classList.toggle('a',i<v));
  document.getElementById('mood').textContent=moods[v-1];
  document.getElementById('fba').classList.toggle('show',v<=3);
}
function doSub(){
  const fb=document.getElementById('fb').value;
  CT.pushEvent('Rating Submitted',{rating:cur,feedback:fb,source:'inapp'});
  ['#srow','#fba','#sub','.btn-skip3','#mood'].forEach(s=>{const e=document.querySelector(s);if(e)e.style.display='none';});
  document.getElementById('ty').classList.add('show');
}
<\/script>`,
  css:`@keyframes popIn {\n  from { opacity:0; transform: scale(.86); }\n  to   { opacity:1; transform: none; }\n}`,
  js:`const moods = ['😤','😕','😐','😊','🤩'];\nlet cur = 5;\nfunction rate(v) {\n  cur = v;\n  document.querySelectorAll('.sb').forEach((b,i) => b.classList.toggle('a', i < v));\n  document.getElementById('mood').textContent = moods[v-1];\n}\nfunction doSub() {\n  CT.pushEvent('Rating Submitted', { rating: cur });\n  CT.dismiss();\n}`
};

/* ====================================================
   17. ENGAGEMENT — PUSH OPT-IN
   ==================================================== */
T['eg-push'] = {
  title:'Push Notification Opt-In',
  desc:'Value-first push permission request. Uses window.CleverTap.promptPushPermission() for native Android prompt.',
  tags:['Engagement','Push','CleverTap Native'],
  trigger:'App Launched',
  ctEvent:'Push Permission Granted',
  ctProps:{source:'inapp_push_optin'},
  h:520, mh:720,
  html: BASE + CT_BRIDGE.replace('@READYSCRIPT@','') + `
<style>
.pc{background:#13161e;border-radius:22px;max-width:355px;width:100%;padding:26px;border:1px solid rgba(255,255,255,.07);text-align:center;position:relative;overflow:hidden;animation:fadeUp .4s ease}
@keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
.bell-wrap{width:68px;height:68px;background:linear-gradient(135deg,rgba(99,91,255,.15),rgba(99,91,255,.05));border:1px solid rgba(99,91,255,.2);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;position:relative;animation:bellRing .8s ease .5s}
@keyframes bellRing{0%,100%{transform:rotate(0)}25%{transform:rotate(12deg)}75%{transform:rotate(-12deg)}}
.bell-txt{font-size:26px}
.nb2{position:absolute;top:2px;right:2px;width:17px;height:17px;background:#ef4444;border-radius:50%;border:2px solid #13161e;display:flex;align-items:center;justify-content:center;font-size:8px;color:#fff;font-weight:700}
h4b{font-size:17px;font-weight:700;color:#e4e8f5;margin-bottom:7px;display:block}
.pdesc{font-size:12px;color:#4e5470;line-height:1.6;margin-bottom:18px}
.perks2{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-bottom:18px;text-align:left}
.pk{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:9px;padding:10px;display:flex;align-items:flex-start;gap:7px}
.pk-e{font-size:14px}
.pk-t{font-size:11px;font-weight:600;color:#c4cadf;display:block;margin-bottom:2px}
.pk-s{font-size:10px;color:#4e5470;line-height:1.3}
.notif-prev{background:#1a1d2e;border:1px solid rgba(255,255,255,.08);border-radius:9px;padding:11px;margin-bottom:18px;display:flex;align-items:center;gap:9px;text-align:left}
.np-ico{width:30px;height:30px;background:linear-gradient(135deg,#635bff,#8a84ff);border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:14px}
.np-t{font-size:11px;font-weight:600;color:#e4e8f5;margin-bottom:1px}
.np-b{font-size:10px;color:#4e5470}
.np-time{margin-left:auto;font-size:9px;color:#2e3455}
.btn-allow{width:100%;background:linear-gradient(135deg,#635bff,#8a84ff);color:#fff;border:none;border-radius:12px;padding:13px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;margin-bottom:9px;transition:.2s}
.btn-allow:hover{transform:translateY(-1px);box-shadow:0 8px 20px rgba(99,91,255,.4)}
.btn-deny2{width:100%;background:transparent;color:#4e5470;border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:11px;font-size:12px;cursor:pointer;font-family:inherit;transition:.2s}
.trust2{display:flex;align-items:center;justify-content:center;gap:5px;margin-top:11px;font-size:10px;color:#2e3455}
</style>
<div class="pc inapp-root">
  <div class="bell-wrap"><span class="bell-txt">🔔</span><div class="nb2">3</div></div>
  <h4b>Stay in the Loop</h4b>
  <p class="pdesc">Enable notifications for personalized picks, live alerts &amp; exclusive deals — always relevant, never spammy.</p>
  <div class="perks2">
    <div class="pk"><span class="pk-e">🎬</span><div><span class="pk-t">New Releases</span><span class="pk-s">First to know</span></div></div>
    <div class="pk"><span class="pk-e">📡</span><div><span class="pk-t">Live Events</span><span class="pk-s">Matches &amp; premieres</span></div></div>
    <div class="pk"><span class="pk-e">💰</span><div><span class="pk-t">Deals</span><span class="pk-s">Member-only offers</span></div></div>
    <div class="pk"><span class="pk-e">⏸</span><div><span class="pk-t">Reminders</span><span class="pk-s">Resume watching</span></div></div>
  </div>
  <div class="notif-prev">
    <div class="np-ico">⭐</div>
    <div><div class="np-t">New arrival just for you 🔥</div><div class="np-b">Something you'll love is waiting!</div></div>
    <span class="np-time">now</span>
  </div>
  <button class="btn-allow" onclick="doAllow()">🔔 Allow Notifications</button>
  <button class="btn-deny2" onclick="CT.pushEvent('Push Permission Denied');CT.dismiss()">No thanks, I'll miss out</button>
  <div class="trust2">🔒 No spam · Unsubscribe anytime</div>
</div>
<script>
function doAllow(){
  if(window.CleverTap){
    window.CleverTap.promptPushPermission(true);
  } else if(window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers.clevertap){
    window.webkit.messageHandlers.clevertap.postMessage({action:'requestPushPermission'});
  }
  CT.pushEvent('Push Permission Granted',{source:'inapp_push_optin'});
  CT.dismiss();
}
<\/script>`,
  css:`@keyframes bellRing {\n  0%,100% { transform: rotate(0); }\n  25%     { transform: rotate(12deg); }\n  75%     { transform: rotate(-12deg); }\n}`,
  js:`function doAllow() {\n  // Android: native push permission prompt\n  if (window.CleverTap) {\n    window.CleverTap.promptPushPermission(true);\n  }\n  // iOS: handled via webkit message handler\n  else if (window.webkit?.messageHandlers?.clevertap) {\n    window.webkit.messageHandlers.clevertap.postMessage({\n      action: 'requestPushPermission'\n    });\n  }\n  CT.pushEvent('Push Permission Granted', { source: 'inapp' });\n  CT.dismiss();\n}`
};

/* ====================================================
   18. ENGAGEMENT — NPS SURVEY
   ==================================================== */
T['eg-survey'] = {
  title:'NPS Quick Survey',
  desc:'3-step NPS survey with progress bar, conditional follow-up, and multi-choice options.',
  tags:['Engagement','Survey','Multi-step'],
  trigger:'Order Delivered',
  ctEvent:'NPS Survey Submitted',
  ctProps:{nps_score:'{{nps}}',category:'{{category}}'},
  h:460, mh:640,
  html: BASE + CT_BRIDGE.replace('@READYSCRIPT@','') + `
<style>
.sv{background:#13161e;border-radius:22px;max-width:375px;width:100%;border:1px solid rgba(255,255,255,.07);overflow:hidden;animation:slideUp .4s ease}
@keyframes slideUp{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:none}}
.sv-top{padding:18px;border-bottom:1px solid rgba(255,255,255,.06);display:flex;align-items:center;gap:11px}
.sv-ico{width:36px;height:36px;background:rgba(99,91,255,.15);border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:16px}
.sv-t{font-size:13px;font-weight:700;color:#e4e8f5}
.sv-m{font-size:10px;color:#4e5470}
.prog{height:2px;background:rgba(255,255,255,.06)}
.pf{height:100%;background:#635bff;transition:.4s}
.sv-body{padding:20px}
.step{display:none}.step.a{display:block}
.ql{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#635bff;margin-bottom:7px}
.qt{font-size:14px;font-weight:600;color:#e4e8f5;line-height:1.4;margin-bottom:16px}
.nps2{display:flex;gap:4px;justify-content:center;flex-wrap:wrap;margin-bottom:7px}
.nps2 label{cursor:pointer}
.nps2 input{display:none}
.nb{width:28px;height:28px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#4e5470;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);cursor:pointer;transition:.15s}
.nps2 input:checked+.nb{background:#635bff;color:#fff;border-color:#635bff}
.nps2 label:hover .nb{background:rgba(99,91,255,.2);color:#e4e8f5}
.nls{display:flex;justify-content:space-between;font-size:9px;color:#4e5470;margin-bottom:16px}
.choices{display:flex;flex-direction:column;gap:7px;margin-bottom:16px}
.ch2{display:flex;align-items:center;gap:9px;padding:10px 12px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:9px;cursor:pointer;transition:.15s;font-size:12px;color:#8b92b0}
.ch2:hover{background:rgba(99,91,255,.08);border-color:rgba(99,91,255,.25);color:#e4e8f5}
.ch2 input{accent-color:#635bff}
textarea{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:9px;padding:10px;color:#e4e8f5;font-family:inherit;font-size:12px;resize:none;height:76px;outline:none;margin-bottom:16px}
textarea::placeholder{color:#2e3455}
.brow{display:flex;justify-content:flex-end;gap:7px}
.bn{background:#635bff;color:#fff;border:none;border-radius:9px;padding:9px 20px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;transition:.2s}
.bn:hover{background:#5046e5}
.bb{background:rgba(255,255,255,.06);color:#8b92b0;border:1px solid rgba(255,255,255,.08);border-radius:9px;padding:9px 14px;font-size:12px;cursor:pointer;font-family:inherit}
.done2{text-align:center;padding:8px 0}
.done2 .b2{font-size:42px;margin-bottom:12px}
</style>
<div class="sv inapp-root">
  <div class="sv-top"><div class="sv-ico">📋</div><div><div class="sv-t">Quick Feedback</div><div class="sv-m">3 questions · 1 min</div></div></div>
  <div class="prog"><div class="pf" id="pg" style="width:33%"></div></div>
  <div class="sv-body">
    <div class="step a" id="s1">
      <div class="ql">Question 1 of 3</div>
      <div class="qt">How likely are you to recommend us?</div>
      <div class="nps2"><label><input type="radio" name="nps"><div class="nb">0</div></label><label><input type="radio" name="nps"><div class="nb">1</div></label><label><input type="radio" name="nps"><div class="nb">2</div></label><label><input type="radio" name="nps"><div class="nb">3</div></label><label><input type="radio" name="nps"><div class="nb">4</div></label><label><input type="radio" name="nps"><div class="nb">5</div></label><label><input type="radio" name="nps"><div class="nb">6</div></label><label><input type="radio" name="nps"><div class="nb">7</div></label><label><input type="radio" name="nps"><div class="nb">8</div></label><label><input type="radio" name="nps"><div class="nb">9</div></label><label><input type="radio" name="nps"><div class="nb">10</div></label></div>
      <div class="nls"><span>Not likely</span><span>Very likely</span></div>
      <div class="brow"><button class="bn" onclick="go(2)">Next →</button></div>
    </div>
    <div class="step" id="s2">
      <div class="ql">Question 2 of 3</div>
      <div class="qt">What do you use the app for most?</div>
      <div class="choices">
        <label class="ch2"><input type="radio" name="use">Streaming &amp; Entertainment</label>
        <label class="ch2"><input type="radio" name="use">Shopping &amp; Deals</label>
        <label class="ch2"><input type="radio" name="use">Tracking Orders</label>
        <label class="ch2"><input type="radio" name="use">Discovering New Content</label>
      </div>
      <div class="brow"><button class="bb" onclick="go(1)">← Back</button><button class="bn" onclick="go(3)">Next →</button></div>
    </div>
    <div class="step" id="s3">
      <div class="ql">Question 3 of 3</div>
      <div class="qt">Any suggestions to improve your experience?</div>
      <textarea id="fb2" placeholder="Type your thoughts..."></textarea>
      <div class="brow"><button class="bb" onclick="go(2)">← Back</button><button class="bn" onclick="doSurvey()">Submit ✓</button></div>
    </div>
    <div class="step" id="s4">
      <div class="done2"><div class="b2">🙌</div><div style="font-size:15px;font-weight:700;color:#e4e8f5;margin-bottom:7px">Thanks so much!</div><div style="font-size:12px;color:#4e5470;line-height:1.6">Your feedback has been submitted and will help us improve.</div></div>
    </div>
  </div>
</div>
<script>
const pcts=[33,66,100,100];
function go(n){document.querySelectorAll('.step').forEach(s=>s.classList.remove('a'));document.getElementById('s'+n).classList.add('a');document.getElementById('pg').style.width=pcts[n-1]+'%';}
function doSurvey(){
  const nps=document.querySelector('input[name=nps]:checked')?.value||'';
  const cat=document.querySelector('input[name=use]:checked')?.nextSibling?.textContent?.trim()||'';
  CT.pushEvent('NPS Survey Submitted',{nps_score:nps,category:cat});
  go(4);
}
<\/script>`,
  css:`/* Multi-step survey with progress bar */`,
  js:`const pcts = [33, 66, 100, 100];\nfunction go(n) {\n  document.querySelectorAll('.step').forEach(s => s.classList.remove('a'));\n  document.getElementById('s'+n).classList.add('a');\n  document.getElementById('pg').style.width = pcts[n-1] + '%';\n}\nfunction doSurvey() {\n  const nps = document.querySelector('input[name=nps]:checked')?.value || '';\n  CT.pushEvent('NPS Survey Submitted', { nps_score: nps });\n  go(4);\n}`
};
