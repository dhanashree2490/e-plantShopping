import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping, onRemoveFromCart }) => {
  const cart = useSelector(state => state.cart.items);
  const [setAddedToCart] = useState({});
  //console.log("Cart Items:",cart);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let totalAmount = 0;
    cart.forEach(item => {
        let cost = parseCost(item.cost);
        totalAmount += item.quantity * cost;
    });
    //console.log("Total Amount:",totalAmount);
    return totalAmount;
  };

  const handleContinueShopping = (e) => {
   // console.log("Inside handleContinueShopping");
    onContinueShopping(e);
  };



  const handleIncrement = (item) => {
  //  console.log("Inside handleIncrement");
    dispatch(updateQuantity({name:item.name, quantity:item.quantity+1}));
  };

  const handleDecrement = (item) => {
   // console.log("Inside handleDecrement");
   if(item && item.quantity > 0){
    dispatch(updateQuantity({name:item.name, quantity:item.quantity-1}));
   }
  };

  const handleRemove = (item) => {
   // console.log("Inside handleRemove");
        dispatch(removeItem(item.name));
        onRemoveFromCart(item.name);
  };

  // Calculate total cost based on quantity for an item
  const parseCost = (costString) => {
    if (!costString) return 0; // handle null/undefined
    // Remove all non-digit characters except dot (.)
    const numericString = costString.replace(/[^0-9.]/g, "");
    return parseFloat(numericString) || 0;
  };
  
  const calculateTotalCost = (item) => {
    //console.log("Inside totalCost");
    let totalCost = 0;
    //console.log(item.cost);
    let cost = parseCost(item.cost);

    totalCost = item.quantity * cost;
    return totalCost;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


