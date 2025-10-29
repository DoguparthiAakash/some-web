// API base (settable from index.html for hosted backends)
const API_BASE = window.API_BASE || '';

// Client-side cart fallback (localStorage)
const LOCAL_CART_KEY = 'ishop_cart_v1';

function getLocalCart() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveLocalCart(cart) {
  localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cart));
}

function localAddToCart(product, quantity = 1) {
  const cart = getLocalCart();
  const existing = cart.find((c) => c.product.id === product.id);
  if (existing) existing.quantity += quantity;
  else cart.push({ id: Date.now(), product, quantity });
  saveLocalCart(cart);
  alert(`${product.name} added to cart (offline fallback)`);
}

async function addToCartAPI(productId, quantity = 1, productData) {
  try {
    const res = await fetch(`${API_BASE}/api/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity })
    });
    if (!res.ok) throw new Error('API error');
    const json = await res.json();
    alert('Added to cart');
    return json;
  } catch (err) {
    // fallback to localStorage
    if (productData) localAddToCart(productData, quantity);
    else alert('Failed to add to remote cart and no product metadata available.');
  }
}

// Load products from backend; if that fails (e.g., hosted on GitHub Pages), keep static HTML and wire fallback handlers
async function loadProducts() {
  try {
    const res = await fetch(`${API_BASE}/api/products`);
    if (!res.ok) throw new Error('No API');
    const data = await res.json();
    if (data && data.products && data.products.length) {
      renderProductGrid(data.products);
      return;
    }
  } catch (e) {
    console.log('Backend not available, using static markup/local fallback.', e);
  }
  // Attach fallback listeners to existing static Add to Cart buttons
  attachFallbackListeners();
}

function renderProductGrid(products) {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = '';
  products.forEach((p) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.image || 'https://via.placeholder.com/300x300?text=Product'}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>${p.description || ''}</p>
      <p><strong>$${p.price.toFixed(2)}</strong></p>
      <div class="star-rating">${renderStars(p.rating || 4)}</div>
      <div class="button-group">
        <button class="btn add-to-cart" data-id="${p.id}">Add to Cart</button>
        <button class="btn buy-now">Buy Now</button>
      </div>
    `;
    grid.appendChild(card);
  });
  // attach listeners
  document.querySelectorAll('.add-to-cart').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      const id = parseInt(e.currentTarget.getAttribute('data-id'), 10);
      const product = products.find((x) => x.id === id);
      await addToCartAPI(id, 1, product);
    });
  });
}

function renderStars(n) {
  n = Math.max(0, Math.min(5, Math.round(n)));
  let s = '';
  for (let i = 0; i < n; i++) s += '<span class="star-filled">★</span>';
  for (let i = n; i < 5; i++) s += '<span class="star-empty">☆</span>';
  return s;
}

function attachFallbackListeners() {
  document.querySelectorAll('.add-to-cart').forEach((btn) => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', (e) => {
      // try to read product metadata from DOM
      const card = e.currentTarget.closest('.product-card');
      const name = card.querySelector('h3')?.textContent || 'Product';
      const priceText = card.querySelector('p strong')?.textContent || '$0';
      const price = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;
      const product = { id: Date.now(), name, price };
      localAddToCart(product, 1);
    });
  });
}

function viewCart() {
  // Try remote first
  fetch(`${API_BASE}/api/cart`).then((res) => {
    if (!res.ok) throw new Error('No remote');
    return res.json();
  }).then((json) => {
    const items = json.cart || [];
    if (!items.length) alert('Cart is empty');
    else alert('Cart:\n' + items.map(i => `${i.product.name} x${i.quantity}`).join('\n'));
  }).catch(() => {
    const local = getLocalCart();
    if (!local.length) alert('Cart is empty (local)');
    else alert('Local cart:\n' + local.map(i => `${i.product.name} x${i.quantity}`).join('\n'));
  });
}

function viewProfile() {
  fetch(`${API_BASE}/api/profile`).then((res) => {
    if (!res.ok) throw new Error('No remote');
    return res.json();
  }).then((json) => {
    const p = json.profile;
    alert(`Profile:\nName: ${p.name}\nEmail: ${p.email}`);
  }).catch(() => {
    alert('Profile not available (offline)');
  });
}

// Keep searchProducts behavior (works on dynamically rendered or static cards)
function searchProducts() {
  const searchInput = document
    .getElementById('search-input')
    .value.toLowerCase();
  const productCards = document.querySelectorAll('.product-card');

  // Loop through each product card and check if it matches the search input
  productCards.forEach((card) => {
    const productName = card.querySelector('h3').textContent.toLowerCase();

    // Show or hide the product card based on search input
    if (productName.includes(searchInput)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
});
