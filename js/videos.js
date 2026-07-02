const modal = document.getElementById('modal');
function closeModal(){ modal.classList.remove('open'); }
function coverStyle(url){ return url?`background-image:url('${url}')`:''; }
function coverCls(url){ return 'cover'+(url?'':' placeholder'); }
function ytId(url){ const m=url.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/); return m?m[1]:null; }

async function load() {
  const list = await API.get('/api/videos');
  const el = document.getElementById('list');
  if (!list.length) { el.innerHTML = `<div class="empty">Nenhum video ainda.</div>`; return; }
  el.innerHTML = list.map(v => `
    <div class="card video-card" data-id="${v.id}">
      <div class="${coverCls(v.thumb)}" style="${coverStyle(v.thumb)};aspect-ratio:16/9">
        ${v.preview?`<video muted loop playsinline preload="none" data-src="${v.preview}" style="display:none"></video>`:''}
      </div>
      <div class="info"><h3>${v.title}</h3><small>${v.playlist||''}</small></div>
    </div>
  `).join('');
  el.querySelectorAll('.video-card').forEach(card => {
    const v = card.querySelector('video');
    if (v) {
      card.addEventListener('mouseenter', () => {
        v.src = v.dataset.src; v.style.display='block'; v.play().catch(()=>{});
      });
      card.addEventListener('mouseleave', () => {
        v.pause(); v.removeAttribute('src'); v.load(); v.style.display='none';
      });
    }
    card.onclick = () => openVideo(list.find(x=>x.id==card.dataset.id));
  });
}
function openVideo(v) {
  let content = '';
  if (v.video_file) content = `<video src="${v.video_file}" controls autoplay style="width:100%;border-radius:12px"></video>`;
  else if (v.youtube_url) { const id = ytId(v.youtube_url);
    content = id ? `<div style="position:relative;padding-top:56.25%"><iframe src="https://www.youtube.com/embed/${id}?autoplay=1" allow="autoplay; encrypted-media" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;border:0;border-radius:12px"></iframe></div>`
                 : `<a href="${v.youtube_url}" target="_blank">Abrir no YouTube</a>`;
  }
  document.getElementById('modal-body').innerHTML = `<h2>${v.title}</h2>${content}`;
  modal.classList.add('open');
}
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
load();
