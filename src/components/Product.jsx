import React from "react";

function Product({ product, width, height, title }) {
  return (
    <div key={product.id} className="product-card">
      <img
        src={product.image}
        alt={product.title}
        width={width}
        height={height}
      />
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">Price : {product.price}</p>
        <p className="product-rating">Rating : ⭐ {product.rating.rate}/5</p>
      </div>
      <button className="add-to-cart">{title}</button>
    </div>
  );
}

export default Product;
