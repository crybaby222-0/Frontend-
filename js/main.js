function coverStyle(url) { return url ? `background-image:url('${url}')` : ''; }
function coverCls(url) { return 'cover' + (url ? '' : ' placeholder'); }

async function loadHome() {
  const featured = await API.get('/api/albums/featured');
  const slot = document.getElementById('featured-slot');
  if (featured) {
    slot.innerHTML = `<div class="featured">
      <div class="cover" style="${coverStyle(featured.cover)}"></div>
      <div>
        <div style="opacity:.6">Álbum em destaque</div>
        <h2>${featured.title}</h2>
        <small>${featured.year||''}</small>
        <div class="links">
          ${featured.spotify?`<a href="${featured.spotify}" target="_blank">Spotify</a>`:''}
          ${featured.youtube?`<a href="${featured.youtube}" target="_blank">YouTube</a>`:''}
          ${featured.apple?`<a href="${featured.apple}" target="_blank">Apple Music</a>`:''}
          <a href="albums.html">Ver álbuns →</a>
        </div>
      </div>
    </div>`;
  } else {
    slot.innerHTML = `<div class="empty">Nenhum álbum em destaque ainda.</div>`;
  }
  const songs = await API.get('/api/songs');
  const grid = document.getElementById('latest');
  if (!songs.length) { grid.innerHTML = `<div class="empty">Nenhuma música cadastrada.</div>`; return; }
  grid.innerHTML = songs.slice(0,8).map(s => `
    <div class="card" data-snippet="${s.snippet||''}" data-audio="${s.audio||''}" data-title="${s.title}" data-cover="${s.cover||''}" data-sub="${s.album_title||'Single'}">
      <div class="${coverCls(s.cover)}" style="${coverStyle(s.cover)}">
        ${s.audio||s.snippet ? `<button class="preview-btn" onclick="event.stopPropagation();previewSnippet(this)">▶</button>`:''}
      </div>
      <div class="info"><h3>${s.title}</h3><small>${s.album_title||'Single'}</small></div>
    </div>
  `).join('');
  grid.querySelectorAll('.card').forEach(c => {
    c.onmouseenter = () => { if (c.dataset.snippet) Player.playSnippet(c.dataset.snippet); };
    c.onclick = () => {
      if (c.dataset.audio) Player.play({ title: c.dataset.title, sub: c.dataset.sub, cover: c.dataset.cover, src: c.dataset.audio });
    };
  });
}
function previewSnippet(btn) {
  const card = btn.closest('.card');
  const src = card.dataset.snippet || card.dataset.audio;
  if (src) Player.playSnippet(src);
}
loadHome();
