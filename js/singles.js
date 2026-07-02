function coverStyle(url){ return url?`background-image:url('${url}')`:''; }
function coverCls(url){ return 'cover'+(url?'':' placeholder'); }
async function load() {
  const list = await API.get('/api/songs?single=1');
  const el = document.getElementById('list');
  if (!list.length) { el.innerHTML = `<div class="empty">Nenhum single ainda.</div>`; return; }
  el.innerHTML = list.map(s => `
    <div class="card" data-snippet="${s.snippet||''}" data-audio="${s.audio||''}" data-title="${s.title}" data-cover="${s.cover||''}">
      <div class="${coverCls(s.cover)}" style="${coverStyle(s.cover)}">
        ${s.audio||s.snippet ? `<button class="preview-btn" onclick="event.stopPropagation();prv(this)">▶</button>`:''}
      </div>
      <div class="info"><h3>${s.title}</h3><small>Single</small></div>
    </div>
  `).join('');
  el.querySelectorAll('.card').forEach(c => {
    c.onmouseenter = () => { if (c.dataset.snippet) Player.playSnippet(c.dataset.snippet); };
    c.onclick = () => { if (c.dataset.audio) Player.play({ title:c.dataset.title, sub:'Single', cover:c.dataset.cover, src:c.dataset.audio }); };
  });
}
function prv(b){ const c=b.closest('.card'); const s=c.dataset.snippet||c.dataset.audio; if(s) Player.playSnippet(s); }
load();
