# Joe Music — Frontend

Site estático (HTML/CSS/JS) + painel admin. Deploy na **Netlify**.

## Antes de publicar

1. Faça o deploy do backend (pasta `joe-music-backend`) no Render.
2. Copie a URL pública (ex.: `https://joe-music-api.onrender.com`).
3. Edite os dois arquivos abaixo e cole a URL em `API_BASE`:
   - `js/config.js`      (site público)
   - `admin/config.js`   (painel administrativo)

## Deploy Netlify

- **Drag & drop:** arraste a pasta inteira em https://app.netlify.com/drop
- **Git:** conecte o repositório; a Netlify lê o `netlify.toml` (publish = raiz).

Não há build step — é 100% estático.

## Estrutura

```
index.html         → splash "ENTER"
main.html          → home (destaque + últimas)
albums.html        → lista de álbuns
singles.html       → singles
videos.html        → music videos
admin/             → painel (login em /admin/login.html)
```

## Rodar local

Qualquer servidor estático serve — por exemplo:
```bash
npx serve .
```
Depois abra `http://localhost:3000` (com o backend rodando em outra porta).
