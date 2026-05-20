/* ============================================================
   ct-app.js
   Category registry, T object, highlight, state + all UI fns.
   To add a new category:
     1. Create ct-templates-<name>.js and add T[id] entries
     2. Add a <script> for it in index.html (before ct-app.js)
     3. Add an entry to CATS below
   ============================================================ */

const CATS = [
  { id:'ott',     label:'OTT & Streaming',     icon:'🎬', items:[{id:'ott-pip'},{id:'ott-unlock'},{id:'ott-live'}] },
  { id:'qc',      label:'Quick Commerce',       icon:'⚡', items:[{id:'qc-track'},{id:'qc-slot'},{id:'qc-reorder'}] },
  { id:'gift',    label:'Gifting & Occasions',  icon:'🎁', items:[{id:'gift-remind'},{id:'gift-sameday'},{id:'gift-upsell'}] },
  { id:'auto',    label:'Used Cars & Autos',    icon:'🚗', items:[{id:'auto-listing'},{id:'auto-drop'},{id:'auto-val'}] },
  { id:'ecomm',   label:'E-Commerce',           icon:'🛒', items:[{id:'ec-flash'},{id:'ec-product'},{id:'ec-cart'}] },
  { id:'engage',  label:'Engagement',           icon:'💬', items:[{id:'eg-rate'},{id:'eg-push'},{id:'eg-survey'}] },
  { id:'general', label:'General',              icon:'🎮', items:[{id:'gen-scratch'},{id:'gen-spin'},{id:'gen-pip-land'},{id:'gen-pip-port'},{id:'gen-carousel'},{id:'gen-form'}] },
];

const T = {}; // template registry — populated by ct-templates-*.js files

/* ── HIGHLIGHT ── */
function highlight(code, lang) {
  const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  let s = esc(code);
  if (lang === 'html') {
    s = s.replace(/(&lt;\/?)([\w-]+)/g,'<span class="tk">$1$2</span>')
         .replace(/\s([\w-]+)=/g,' <span class="ta">$1</span>=')
         .replace(/=(['"])([^'"]*?)\1/g,'=<span class="tv">$1$2$1</span>')
         .replace(/(&lt;!--[\s\S]*?--&gt;)/g,'<span class="tc">$1</span>');
  } else if (lang === 'css') {
    s = s.replace(/(\/\*[\s\S]*?\*\/)/g,'<span class="tc">$1</span>')
         .replace(/([a-z-]+)\s*:/g,'<span class="tp">$1</span>:')
         .replace(/:\s*([^;{}\n]+)/g,(_,v)=>': <span class="tv">'+v+'</span>');
  } else {
    s = s.replace(/(\/\/[^\n]*)/g,'<span class="tc">$1</span>')
         .replace(/(\/\*[\s\S]*?\*\/)/g,'<span class="tc">$1</span>')
         .replace(/\b(func|fun|override|class|struct|var|let|val|const|function|return|if|else|for|when|switch|case|import|true|false|null|nil)\b/g,'<span class="tk">$1</span>')
         .replace(/'([^']*)'/g,'<span class="ts">\'$1\'</span>')
         .replace(/"([^"]*)"/g,'<span class="ts">"$1"</span>')
         .replace(/\b(\d+)\b/g,'<span class="tn">$1</span>');
  }
  return s;
}

/* ── STATE ── */
let curId    = 'ott-pip';
let curDev   = 'web';
let curTab   = 'html';
let curRTab  = 'code';
let curCat   = 'all';   // active category filter

/* ── BUILD SIDEBAR ──
   Two-level sidebar:
   • Top: category filter pills (All + one per CATS entry)
   • Below: template list filtered to selected category
─────────────────────────────────────────────────────────── */
function buildSidebar() {
  const sb = document.getElementById('sb');
  let totalTemplates = 0;
  CATS.forEach(c => totalTemplates += c.items.length);
  document.getElementById('nav-count').textContent = totalTemplates + ' Templates';

  sb.innerHTML = `
    <!-- Category filter pills -->
    <div id="cat-pills">
      <div class="cat-pill-label">Categories</div>
      <div class="cat-pills-wrap">
        <button class="cat-pill on" data-cat="all" onclick="setCat('all',this)">
          All <span class="cat-pill-count">${totalTemplates}</span>
        </button>
        ${CATS.map(cat => {
          const count = cat.items.filter(i => T[i.id]).length;
          return `<button class="cat-pill" data-cat="${cat.id}" onclick="setCat('${cat.id}',this)">
            <span>${cat.icon}</span> ${cat.label}
            <span class="cat-pill-count">${count}</span>
          </button>`;
        }).join('')}
      </div>
    </div>
    <div class="sb-div" style="margin-top:4px"></div>
    <!-- Template list -->
    <div id="tpl-list"></div>
  `;

  renderTplList();
}

function setCat(catId, el) {
  curCat = catId;
  document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('on'));
  el.classList.add('on');
  renderTplList();
}

function renderTplList() {
  const container = document.getElementById('tpl-list');
  const activeCats = curCat === 'all' ? CATS : CATS.filter(c => c.id === curCat);

  let html = '';
  activeCats.forEach(cat => {
    const validItems = cat.items.filter(i => T[i.id]);
    if (!validItems.length) return;
    html += `<div class="sb-sec">
      <div class="sb-head"><span>${cat.icon}</span>${cat.label}</div>
      ${validItems.map(item => {
        const tpl = T[item.id];
        return `<div class="sb-item${item.id === curId ? ' on' : ''}" onclick="load('${item.id}',this)">
          <span class="sb-ico">${cat.icon}</span>
          <span class="sb-lbl">${tpl.title}</span>
          <span class="sb-tag">${tpl.tags[0] || ''}</span>
        </div>`;
      }).join('')}
    </div>
    <div class="sb-div"></div>`;
  });

  container.innerHTML = html || '<div style="padding:16px 12px;font-size:12px;color:var(--t3)">No templates in this category.</div>';
}

/* ── LOAD ── */
function load(id, el) {
  curId = id;
  const tpl = T[id]; if (!tpl) return;
  document.querySelectorAll('.sb-item').forEach(i => i.classList.remove('on'));
  if (el) el.classList.add('on');
  // Scroll sidebar item into view
  if (el) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  document.getElementById('hdr-title').textContent = tpl.title;
  document.getElementById('hdr-desc').textContent  = tpl.desc;
  document.getElementById('hdr-tags').innerHTML = tpl.tags.map(t => {
    const cls = t.includes('CT') || t.includes('CleverTap') ? 'ct'
              : t.includes('Timer') || t.includes('Urgent') ? 'amb' : 'grn';
    return `<span class="htag ${cls}">${t}</span>`;
  }).join('');
  renderPreview();
  renderCode();
  renderEvents();
}

/* ── RENDER PREVIEW ── */
function renderPreview() {
  const tpl = T[curId]; if (!tpl) return;
  const ldr  = document.getElementById('ldr');   ldr.classList.remove('gone');
  const webF = document.getElementById('dev-web');
  const iosF = document.getElementById('dev-ios');
  const andF = document.getElementById('dev-android');
  const stage = document.getElementById('pv-stage');
  const label = document.getElementById('pv-label');

  if (curDev === 'web') {
    webF.style.display = 'flex';
    iosF.style.display = 'none'; andF.style.display = 'none';
    iosF.style.transform = ''; iosF.style.margin = '';
    andF.style.transform = ''; andF.style.margin = '';
    stage.style.background = '';
    label.textContent = 'web · preview';
    const ifr = document.getElementById('ifr-web');
    ifr.style.height = ''; ifr.style.minHeight = '100%';
    ifr.srcdoc = tpl.html;
    ifr.onload = () => ldr.classList.add('gone');

  } else if (curDev === 'ios') {
    webF.style.display = 'none'; andF.style.display = 'none';
    iosF.style.display = 'flex'; iosF.style.flexDirection = 'column';
    stage.style.background = 'radial-gradient(ellipse at 50% 40%,#1e1e28 0%,#090b12 70%)';
    label.textContent = 'iOS · iPhone 17 Pro Max · 393px';
    const ifr = document.getElementById('ifr-ios');
    ifr.style.height = '759px'; ifr.style.minHeight = '759px';
    ifr.srcdoc = tpl.html;
    ifr.onload = () => ldr.classList.add('gone');
    requestAnimationFrame(() => scaleDevice(iosF, 393, 852));

  } else {
    webF.style.display = 'none'; iosF.style.display = 'none';
    andF.style.display = 'flex'; andF.style.flexDirection = 'column';
    stage.style.background = 'radial-gradient(ellipse at 50% 40%,#0e1a1e 0%,#090b12 70%)';
    label.textContent = 'Android · Pixel 8 Pro · 393px';
    const ifr = document.getElementById('ifr-android');
    ifr.style.height = '820px'; ifr.style.minHeight = '820px';
    ifr.srcdoc = tpl.html;
    ifr.onload = () => ldr.classList.add('gone');
    requestAnimationFrame(() => scaleDevice(andF, 393, 896));
  }
}

function scaleDevice(el, devW, devH) {
  const s   = document.getElementById('pv-stage');
  const pad = 28;
  const scale = Math.min((s.clientWidth - pad * 2) / devW, (s.clientHeight - pad * 2) / devH, 1);
  el.style.transform   = `scale(${scale})`;
  const dW = devW * scale, dH = devH * scale;
  el.style.marginLeft   = `${(dW - devW) / 2}px`;
  el.style.marginRight  = `${(dW - devW) / 2}px`;
  el.style.marginTop    = `${(dH - devH) / 2}px`;
  el.style.marginBottom = `${(dH - devH) / 2}px`;
}

/* ── RENDER CODE ── */
function renderCode() {
  const tpl = T[curId]; if (!tpl) return;
  const src = curTab === 'html' ? tpl.html
            : curTab === 'css'  ? (tpl.css  || '/* styles are inline in the HTML template */')
            : curTab === 'js'   ? (tpl.js   || '// no separate JS file')
            : curTab === 'ios'  ? iosCode(tpl)
            : androidCode(tpl);
  document.getElementById('cpre').innerHTML = highlight(src, curTab);
}

/* ── RENDER EVENTS ── */
function renderEvents() {
  const tpl = T[curId]; if (!tpl) return;
  const props = Object.entries(tpl.ctProps || {})
    .map(([k, v]) => `<div class="ev-row"><span class="ev-key">${k}</span><span class="ev-val">"${v}"</span></div>`)
    .join('');
  document.getElementById('event-pane').innerHTML = `
    <div class="ev-label">Trigger Event</div>
    <div class="ev-trigger">🎯&nbsp;App raises <strong>${tpl.trigger || 'App Launched'}</strong> → InApp shown</div>
    <div class="ev-label">Primary CTA Event</div>
    <div class="ev-card">
      <div class="ev-name">${tpl.ctEvent || 'CTA Clicked'}</div>
      <div class="ev-props">${props}</div>
    </div>
    <div class="ev-label">CleverTap JS Call</div>
    <div class="ev-card" style="background:var(--bg)">
      <pre style="font-family:var(--fm);font-size:11px;color:var(--t2);white-space:pre-wrap;line-height:1.7"><span class="tk">CT</span>.<span class="ta">pushEvent</span>(<span class="ts">"${tpl.ctEvent || 'CTA Clicked'}"</span>, ${JSON.stringify(tpl.ctProps || {}, null, 2)});</pre>
    </div>`;
}

/* ── CONTROLS ── */
function setDev(d) {
  curDev = d;
  const map = { web: 'web', ios: 'ios', android: 'and' };
  ['web','ios','and'].forEach(x => document.getElementById('dpill-' + x).classList.toggle('on', map[d] === x));
  renderPreview();
}

function setRTab(t) {
  curRTab = t;
  ['code','events','howto'].forEach(x => document.getElementById('rtab-' + x).classList.toggle('on', x === t));
  ['code','event','howto'].forEach(x => document.getElementById(x + '-pane').classList.toggle('show', x === t.replace('events','event')));
  document.getElementById('lang-row').classList.toggle('show', t === 'code');
}

function setTab(t) {
  curTab = t;
  ['html','css','js','ios','and'].forEach(x => document.getElementById('ct-' + x).classList.toggle('on', x === t));
  renderCode();
}

function doCopy() {
  const tpl  = T[curId];
  const text = curRTab === 'code'
    ? (curTab === 'ios' ? iosCode(tpl) : curTab === 'and' ? androidCode(tpl) : (tpl[curTab] || tpl.html))
    : tpl.html;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('copy-btn');
    btn.classList.add('ok');
    btn.textContent = '✓ Copied!';
    setTimeout(() => {
      btn.classList.remove('ok');
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:11px;height:11px"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Copy`;
    }, 2000);
  });
}

function closeGuide() { document.getElementById('ag').classList.remove('show'); }

let isLight = false;
function toggleTheme() {
  isLight = !isLight;
  document.body.classList.toggle('light', isLight);
  document.getElementById('thlbl').textContent = isLight ? 'Dark' : 'Light';
}

/* ── INIT ── */
buildSidebar();
load('ott-pip', null);
window.addEventListener('resize', () => {
  if      (curDev === 'ios')     scaleDevice(document.getElementById('dev-ios'),     393, 852);
  else if (curDev === 'android') scaleDevice(document.getElementById('dev-android'), 393, 896);
});
