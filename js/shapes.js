// Adds decorative black/white shapes to any page
(function(){
  const svg1 = `<svg viewBox="0 0 200 200"><g fill="none" stroke="#000" stroke-width="18">
    <circle cx="100" cy="100" r="20"/><circle cx="100" cy="100" r="50"/><circle cx="100" cy="100" r="80"/>
  </g></svg>`;
  const svg2 = `<svg viewBox="0 0 200 200"><path fill="#000" d="M100,10 C140,50 160,90 140,140 C170,150 190,190 100,190 C10,190 30,150 60,140 C40,90 60,50 100,10 Z"/></svg>`;
  const svg3 = `<svg viewBox="0 0 200 200"><g fill="#000"><path d="M20,100 L100,20 L180,100 L100,180 Z"/></g></svg>`;
  const wraps = [
    { cls: 'shape tl', html: svg1 },
    { cls: 'shape br', html: svg2 },
    { cls: 'shape tr', html: svg3 },
  ];
  wraps.forEach(w => {
    const d = document.createElement('div');
    d.className = w.cls; d.innerHTML = w.html;
    document.body.appendChild(d);
  });
})();
