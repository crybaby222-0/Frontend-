const TOKEN_KEY = 'joe_admin_token';
const API_BASE = (window.API_BASE || '').replace(/\/$/, '');
function token(){ return localStorage.getItem(TOKEN_KEY); }
function setToken(t){ localStorage.setItem(TOKEN_KEY, t); }
function logout(){ localStorage.removeItem(TOKEN_KEY); location.href='login.html'; }
function requireLogin(){ if(!token()){ location.href='login.html'; } }

async function api(path, opts={}) {
  opts.headers = opts.headers || {};
  if (token()) opts.headers['Authorization'] = 'Bearer ' + token();
  const r = await fetch(API_BASE + path, opts);
  if (r.status === 401) { logout(); return; }
  return r.json();
}
async function apiForm(path, form, method='POST') {
  const fd = new FormData(form);
  const r = await fetch(API_BASE + path, {
    method, headers: { 'Authorization': 'Bearer ' + token() }, body: fd
  });
  if (r.status === 401) { logout(); return; }
  return r.json();
}
function msg(text, isErr){
  const d = document.createElement('div');
  d.className = 'msg' + (isErr?' err':'');
  d.textContent = text;
  document.querySelector('.container').prepend(d);
  setTimeout(()=>d.remove(), 3000);
}
