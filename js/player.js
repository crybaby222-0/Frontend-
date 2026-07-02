// Fixed music player shared across pages
(function() {
  const el = document.createElement('div');
  el.className = 'player';
  el.innerHTML = `
    <div class="cover-mini" id="pl-cover"></div>
    <div class="meta">
      <div class="t" id="pl-title">—</div>
      <div class="s" id="pl-sub"></div>
    </div>
    <button id="pl-toggle" aria-label="Play/Pause">▶</button>
    <div class="progress" id="pl-progress"><div class="bar" id="pl-bar"></div></div>
    <button id="pl-close" aria-label="Fechar">✕</button>
    <audio id="pl-audio" preload="metadata"></audio>
  `;
  document.body.appendChild(el);
  const audio = el.querySelector('#pl-audio');
  const toggle = el.querySelector('#pl-toggle');
  const bar = el.querySelector('#pl-bar');
  const prog = el.querySelector('#pl-progress');

  toggle.onclick = () => {
    if (audio.paused) { audio.play(); toggle.textContent = '❚❚'; }
    else { audio.pause(); toggle.textContent = '▶'; }
  };
  el.querySelector('#pl-close').onclick = () => {
    audio.pause(); el.classList.remove('visible');
  };
  audio.addEventListener('timeupdate', () => {
    if (audio.duration) bar.style.width = (audio.currentTime/audio.duration*100)+'%';
  });
  audio.addEventListener('ended', () => { toggle.textContent = '▶'; });
  prog.onclick = (e) => {
    const r = prog.getBoundingClientRect();
    audio.currentTime = ((e.clientX-r.left)/r.width) * audio.duration;
  };

  window.Player = {
    play({ title, sub, cover, src }) {
      el.querySelector('#pl-title').textContent = title || '—';
      el.querySelector('#pl-sub').textContent = sub || '';
      el.querySelector('#pl-cover').style.backgroundImage = cover ? `url(${cover})` : '';
      audio.src = src;
      audio.play().catch(()=>{});
      toggle.textContent = '❚❚';
      el.classList.add('visible');
    },
    playSnippet(src) {
      audio.src = src;
      audio.play().catch(()=>{});
    }
  };
})();
