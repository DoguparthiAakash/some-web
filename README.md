iShop demo — Backend added

This repository contains a simple static frontend and a small Express backend added for local development.

How to run (Windows PowerShell):

1. Install dependencies

	npm install

2. Start the server

	npm start

The server listens on port 3000 by default. Open http://localhost:3000 in your browser.

API endpoints (JSON):

- GET /api/products — list demo products
- GET /api/cart — get current cart (in-memory)
- POST /api/cart — add to cart: { productId: number, quantity: number }
- DELETE /api/cart/:id — remove cart item by id
- GET /api/profile — demo user profile

Notes
- This backend is intentionally minimal and stores cart in memory (not persistent). It's suitable for local testing and demos only.

Hosting note — GitHub Pages
--------------------------------
If this site is hosted on GitHub Pages (yourname.github.io or repo.github.io), remember that GitHub Pages only serves static files — it cannot run the `server.js` Node/Express backend. You have a few options:

1) Host the backend elsewhere and point the frontend to it
	- Deploy the `server.js` app to a hosting provider that runs Node (Render, Railway, Fly, Heroku alternatives, or a VPS).
	- After deploying, set `window.API_BASE` in `index.html` (or configure your frontend) to the remote backend URL (for example, `https://my-backend.example.com`).
	- Make sure the backend allows CORS from your GitHub Pages domain (the provided server uses CORS by default).

2) Use serverless functions (Vercel/Netlify)
	- Deploy serverless endpoints and point the frontend to those functions.

3) Static-only fallback (keeps everything on GitHub Pages)
	- The frontend now attempts to call `/api/products`. If that fails (because no backend runs on GitHub Pages), the app will use the static product markup in `index.html` and fall back to a localStorage-based cart. This is suitable for demos with no remote backend.

If you'd like, I can:
- Update the frontend to use a specific remote backend URL and test sample responses, or
- Help deploy the backend to Render/Railway and update `index.html` automatically.

How to point your GitHub Pages frontend to a deployed backend
-----------------------------------------------------------
1) Deploy the backend (`server.js`) to a Node-capable host (Render, Railway, Vercel serverless functions, Fly, etc.). After deployment you'll get a URL such as `https://my-backend.example.com`.

2) Edit `index.html` in this repo (or on GitHub) and set the `meta` tag named `api-base`:

	<meta name="api-base" content="https://my-backend.example.com">

	The frontend reads that meta tag at load time and sets `window.API_BASE` automatically, so no additional JS edits are required.

3) Commit and push the change to the branch used by GitHub Pages (usually `main` for `username.github.io` or `gh-pages` for project pages).

4) Open the GitHub Pages site (https://doguparthiaakash.github.io/some-web/) — the frontend will call your deployed backend at the URL you set, and will still keep the localStorage fallback if the backend is unreachable.

If you'd like, tell me which hosting provider you prefer and I can give step-by-step deployment instructions (I can also create a small `render.yaml`/`vercel.json`/`netlify` configuration depending on the provider).

