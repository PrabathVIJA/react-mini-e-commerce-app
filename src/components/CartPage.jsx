import React from "react";
import { MdDeleteForever, MdAdd } from "react-icons/md";
export default function CartPage({ selectedItems }) {
  return (
    <div className="cart-page-container">
      <div className="cart-page-title">Cart Page</div>
      <div className="product-container">
        <div className="selected-products">
          {selectedItems.map((selectedItem) => (
            <div className="individual-product">
              <p>{selectedItem.title}</p>
              <img src={selectedItem.image} />
              <button className="delete-button">
                <MdDeleteForever className="delete-icon" size="1.7em" />
              </button>
              <div>
                <span className="total-item-field">1</span>
                <button className="increment-button">
                  <MdAdd size="1.5em" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="price-checkout">
          <div>
            <p>Total Price :</p>
            <button>CheckOut</button>
          </div>
        </div>
      </div>
    </div>
  );
}
