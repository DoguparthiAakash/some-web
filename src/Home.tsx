import React from 'react';

const Home: React.FC = () => (
  <section className="banner">
    <div className="banner-text">
      <h1>Welcome to iShop</h1>
      <p>Discover the best products, manage your cart, and view your profile—all in one place.</p>
      <div style={{ margin: '24px 0' }}>
        <a className="btn" href="/products">Browse Products</a>
        <a className="btn" href="/cart">View Cart</a>
        <a className="btn" href="/profile">Your Profile</a>
      </div>
      <p style={{ fontSize: '1rem', color: '#eaf6ff', opacity: 0.8 }}>Fast, simple, and secure shopping experience.</p>
    </div>
  </section>
);

export default Home;
