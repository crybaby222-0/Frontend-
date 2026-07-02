(function () {
  const BASE = (window.API_BASE || '').replace(/\/$/, '');
  const FIELDS = ['cover', 'audio', 'snippet', 'thumb', 'preview', 'video_file'];

  function abs(u) {
    if (!u || typeof u !== 'string') return u;
    if (/^https?:\/\//i.test(u)) return u;
    if (u.startsWith('/uploads')) return BASE + u;
    return u;
  }
  function normalize(x) {
    if (Array.isArray(x)) return x.map(normalize);
    if (x && typeof x === 'object') {
      for (const k of FIELDS) if (typeof x[k] === 'string') x[k] = abs(x[k]);
      if (Array.isArray(x.tracks)) x.tracks = x.tracks.map(normalize);
    }
    return x;
  }

  window.API = {
    base: BASE,
    url(p) { return BASE + p; },
    asset: abs,
    get(path) { return fetch(BASE + path).then(r => r.json()).then(normalize); },
    post(path, body, isForm) {
      return fetch(BASE + path, {
        method: 'POST',
        headers: isForm ? {} : { 'Content-Type': 'application/json' },
        body: isForm ? body : JSON.stringify(body)
      }).then(r => r.json());
    }
  };
})();
