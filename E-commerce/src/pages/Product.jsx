import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProductPage.css';
import { useCart } from '../context/CartContext';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  
   const { addToCart } = useCart();

//    const handleAddToCart = () => {
//   addToCart(product);
// };



  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error('Error fetching product:', err));
  }, [id]);

  const handleAddToCart = () => {
    alert(`🛒 "${product.title}" added to cart!`);
    addToCart(product);
  };

  if (!product) return <div className="loading">Loading product...</div>;

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <img src={product.image} alt={product.title} className="product-detail-img" />

        <div className="product-detail-info">
          <h2 className="product-detail-title">{product.title}</h2>
          <p className="product-detail-desc">{product.description}</p>
          <p className="product-detail-price">${product.price}</p>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;

