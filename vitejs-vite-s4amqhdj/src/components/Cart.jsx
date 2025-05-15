import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, updateTempQuantity } from '../features/shopCart/cartSlice';

const Cart = () => {
  const { items: cartItems, tempItems, totalPrice } = useSelector(state => state.cart)

  useSelector(state => console.log(state))

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id))
  }

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateTempQuantity({id, quantity}))
  }

  return (
    <div className="wrapper">
      <div className="cart-page-container">
        <div className="cart-container">
          <h2>Your Cart</h2>
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt="Product Image" />
              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p>Price: ${item.price}</p>
                <div>
                  {/* <input type="number" min="1" value={tempItems.find(tempitem => tempitem.id === item.id?.quantity || item.quantity)}
                    onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                  /> */}
                  {/* <button>Add</button> */}
                  <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <p>Total Price: ${totalPrice}</p>
          </div>
          <button className="back-button" onClick={() => navigate("/")}>Back to Shopping</button>
          <button className="check-button">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
