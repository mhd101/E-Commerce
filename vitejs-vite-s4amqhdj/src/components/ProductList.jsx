import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/shopCart/productSlice';
import { addToCart } from '../features/shopCart/cartSlice';

const ProductList = () => {
  const { items: product, status } = useSelector((state) => state.products)

  const dispatch = useDispatch()

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [status]);

  if (status === 'loading') return <p>Loading Products...</p>
  if (status === 'failed') return <p>Failed to load products !!</p>

  return (
    <>
      <Navbar />
      <div className="product-list">
        {product.products?.map(p => (
          <div className="product-card" key={p.id}>
            <img src={p.image} alt={p.title} />
            <h2>{p.title.length > 20 ? `${p.title.slice(0, 20)}...` : p.title}</h2>
            <p>Price: ${p.price}</p>
            <button onClick={() => dispatch(addToCart(p))}>Add to Cart</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductList;
