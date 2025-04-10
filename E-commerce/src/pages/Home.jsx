import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(res => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      });

    axios.get('https://fakestoreapi.com/products/categories')
      .then(res => setCategories(res.data));
  }, []);

  const handleCategoryFilter = (category) => {
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      axios.get(`https://fakestoreapi.com/products/category/${category}`)
        .then(res => setFilteredProducts(res.data));
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);
    const filtered = products.filter(p =>
      p.title.toLowerCase().includes(value) || p.description.toLowerCase().includes(value)
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Products</h1>

      <div className="homepage-controls">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearch}
          className="homepage-search"
        />
        <select onChange={(e) => handleCategoryFilter(e.target.value)} className="homepage-filter">
          <option value="all">All Categories</option>
          {categories.map((cat, i) => (
            <option value={cat} key={i}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="product-grid">
        {filteredProducts.map(product => (
          <Link to={`/product/${product.id}`} className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} className="product-img" />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
