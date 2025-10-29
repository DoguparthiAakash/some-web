import React from 'react';

const Cart: React.FC = () => (
  <section className="cart">
    <h2>Your Cart</h2>
    <div id="cart-contents">
      {/* Cart content will be rendered here */}
    </div>
    <button className="btn" id="checkout-btn">Checkout</button>
  </section>
);

export default Cart;
