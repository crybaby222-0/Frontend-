const modal = document.getElementById('modal');
function closeModal(){ modal.classList.remove('open'); }
function coverStyle(url){ return url?`background-image:url('${url}')`:''; }
function coverCls(url){ return 'cover'+(url?'':' placeholder'); }

async function load() {
  const list = await API.get('/api/albums');
  const el = document.getElementById('list');
  if (!list.length) { el.innerHTML = `<div class="empty">Nenhum álbum ainda.</div>`; return; }
  el.innerHTML = list.map(a => `
    <div class="card" onclick="openAlbum(${a.id})">
      <div class="${coverCls(a.cover)}" style="${coverStyle(a.cover)}"></div>
      <div class="info"><h3>${a.title}</h3><small>${a.year||''}${a.featured?' · Destaque':''}</small></div>
    </div>
  `).join('');
}
async function openAlbum(id) {
  const a = await API.get('/api/albums/'+id);
  document.getElementById('modal-body').innerHTML = `
    <div style="display:flex;gap:1rem;flex-wrap:wrap;align-items:flex-start">
      <div class="${coverCls(a.cover)}" style="${coverStyle(a.cover)};width:180px;height:180px;border-radius:16px;border:2px solid #000"></div>
      <div style="flex:1;min-width:200px">
        <h2>${a.title}</h2>
        <small>${a.year||''}</small>
        <div class="links" style="display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.75rem">
          ${a.spotify?`<a href="${a.spotify}" target="_blank" style="border:2px solid #000;padding:.4rem .8rem;border-radius:999px">Spotify</a>`:''}
          ${a.youtube?`<a href="${a.youtube}" target="_blank" style="border:2px solid #000;padding:.4rem .8rem;border-radius:999px">YouTube</a>`:''}
          ${a.apple?`<a href="${a.apple}" target="_blank" style="border:2px solid #000;padding:.4rem .8rem;border-radius:999px">Apple</a>`:''}
        </div>
      </div>
    </div>
    <ul class="tracklist">
      ${(a.tracks||[]).map((t,i)=>`
        <li>
          <div><strong>${i+1}. ${t.title}</strong>${t.credits?`<div style="font-size:.85rem;opacity:.6">${t.credits}</div>`:''}</div>
          ${t.audio?`<button class="play-btn" onclick='Player.play(${JSON.stringify({title:t.title,sub:a.title,cover:t.cover||a.cover,src:t.audio})})'>▶</button>`:''}
        </li>
        ${t.lyrics?`<li style="border:none"><div class="lyrics">${t.lyrics.replace(/</g,'&lt;')}</div></li>`:''}
      `).join('') || '<li>Sem faixas ainda.</li>'}
    </ul>`;
  modal.classList.add('open');
}
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
load();
