import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Products from './Products';
import Cart from './Cart';
import Profile from './Profile';
import './App.css';

const App: React.FC = () => (
  <Router>
    <header className="header">
      <div className="logo">iShop</div>
      <nav>
        <Link className="btn" to="/">Home</Link>
        <Link className="btn" to="/products">Products</Link>
        <Link className="btn" to="/cart">Cart</Link>
        <Link className="btn" to="/profile">Profile</Link>
      </nav>
    </header>
    <main className="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </main>
    <footer>
      &copy; 2025 iShop &mdash; Powered by GitHub Pages
    </footer>
  </Router>
);

export default App;
