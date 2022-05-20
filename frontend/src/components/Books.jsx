/* eslint-disable jsx-quotes */
import React, { useContext } from 'react';
// import Product from './Product';
import BooksContext from './BookContext';
// import './styles/Products.css';

export default function ProductsContainer() {
  const { state } = useContext(BooksContext);
  return (
    <div className="team1-product-container clearfix">
      {state.products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
