import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/CartPage.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [showPopup, setShowPopup] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleCheckout = () => {
    setShowPopup(true);
    clearCart();
    setTimeout(() => setShowPopup(false), 4000);
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.title} className="cart-img" />
                <div className="cart-info">
                  <h3>{item.title}</h3>
                  <p>${item.price} x {item.quantity}</p>
                  <div className="cart-controls">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    />
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Total: ${total}</h2>
            <button onClick={handleCheckout} className="checkout-btn">Checkout</button>
          </div>
        </>
      )}

      {showPopup && (
        <div className="popup">
          🎉 Order placed successfully!
        </div>
      )}
    </div>
  );
};

export default Cart;
