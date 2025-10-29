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
