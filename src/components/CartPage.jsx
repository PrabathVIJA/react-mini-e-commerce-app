import React from "react";
import { MdDeleteForever, MdAdd, MdArrowBack, MdRemove } from "react-icons/md";
export default function CartPage({
  selectedItems,
  deleteHandler,
  incrementHandle,
  hideCart,
  total,
  decrementHandle,
}) {
  return (
    <div className="cart-page-container">
      <div className="cart-page-title">
        <button onClick={hideCart}>
          <MdArrowBack size={24} /> Back
        </button>
        Cart Page
      </div>
      <div className="product-container">
        <div className="selected-products">
          {selectedItems.map((selectedItem) => (
            <div key={selectedItem.id} className="individual-product">
              <p>{selectedItem.title}</p>
              <img src={selectedItem.image} alt={selectedItem.title} />
              <button
                className="delete-button"
                onClick={() => deleteHandler(selectedItem)}
              >
                <MdDeleteForever className="delete-icon" size="1.7em" />
              </button>
              <div>
                <button onClick={() => decrementHandle(selectedItem)}>
                  <MdRemove size="1.5em" />
                </button>
                <span className="total-item-field">
                  {selectedItem.quantity}
                </span>
                <button
                  onClick={() => incrementHandle(selectedItem)}
                  className="increment-button"
                >
                  <MdAdd size="1.5em" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="price-checkout">
          <div>
            <p>Total Price :{total.toFixed(2)}</p>
            <button>CheckOut</button>
          </div>
        </div>
      </div>
    </div>
  );
}
