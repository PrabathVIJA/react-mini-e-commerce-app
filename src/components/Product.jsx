import React from "react";

function Product({
  product,
  width,
  height,
  title,
  modalHandler,
  cartItemHandler,
  isInCart,
}) {
  return (
    <div key={product.id} className="product-card">
      <img
        src={product.image}
        alt={product.title}
        width={width}
        height={height}
        onClick={() => modalHandler(product.image)}
      />
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">Price : {product.price}</p>
        <p className="product-rating">Rating : ⭐ {product.rating.rate}/5</p>
      </div>
      <button
        className="add-to-cart"
        onClick={() => cartItemHandler(product)}
        disabled={isInCart}
      >
        {isInCart ? "Added" : title}
      </button>
    </div>
  );
}

export default Product;
