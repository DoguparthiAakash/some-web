const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve static frontend (index.html, script.js, style.css)
app.use(express.static(path.join(__dirname)));

// In-memory store for demo purposes
const products = [
  { id: 1, name: 'SleekFit Wireless Earbuds', price: 25.99 },
  { id: 2, name: 'Adjustable Smartphone Stand', price: 10.5 },
  { id: 3, name: 'PowerBoost Portable Charger', price: 19.99 },
  { id: 4, name: 'UltraSlim Wireless Keyboard', price: 30.0 },
  { id: 5, name: 'SoundPro Bluetooth Speaker', price: 40.0 }
];

let cart = [];

// Basic API endpoints
app.get('/api/products', (req, res) => {
  res.json({ success: true, products });
});

app.get('/api/cart', (req, res) => {
  res.json({ success: true, cart });
});

app.post('/api/cart', (req, res) => {
  const { productId, quantity } = req.body;
  if (!productId || !quantity) {
    return res.status(400).json({ success: false, message: 'productId and quantity required' });
  }
  const product = products.find((p) => p.id === productId);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  const existing = cart.find((c) => c.product.id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id: cart.length + 1, product, quantity });
  }
  res.json({ success: true, cart });
});

app.delete('/api/cart/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const before = cart.length;
  cart = cart.filter((c) => c.id !== id);
  if (cart.length === before) {
    return res.status(404).json({ success: false, message: 'Cart item not found' });
  }
  res.json({ success: true, cart });
});

app.get('/api/profile', (req, res) => {
  // Demo profile
  const profile = {
    id: 1,
    name: 'Demo User',
    email: 'user@example.com'
  };
  res.json({ success: true, profile });
});

// Serve UI pages explicitly
app.get(['/','/index.html'], (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/products.html', (req, res) => res.sendFile(path.join(__dirname, 'products.html')));
app.get('/cart.html', (req, res) => res.sendFile(path.join(__dirname, 'cart.html')));
app.get('/profile.html', (req, res) => res.sendFile(path.join(__dirname, 'profile.html')));

// Fallback for other routes: send index for SPA compatibility
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
