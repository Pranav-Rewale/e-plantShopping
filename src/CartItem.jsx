import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {

  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // ✅ Calculate total cart amount
  const calculateTotalAmount = () => {
    let total = 0;

    cart.forEach((item) => {
      const price = parseFloat(item.cost.substring(1));
      total += price * item.quantity;
    });

    return total.toFixed(2);
  };

  // ✅ Calculate individual item total
  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.substring(1));
    return (price * item.quantity).toFixed(2);
  };

  // ✅ Continue shopping
  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  // ✅ Checkout (dummy)
  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  // ✅ Increase quantity
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        amount: item.quantity + 1,
      })
    );
  };

  // ✅ Decrease quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          amount: item.quantity - 1,
        })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // ✅ Remove item completely
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container">

      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <h3>Cart is empty</h3>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={index} className="cart-item">

              <img src={item.image} alt={item.name} width="100" />

              <div>
                <h3>{item.name}</h3>
                <p>{item.cost}</p>

                <div>
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <span style={{ margin: '10px' }}>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)}>+</button>
                </div>

                <p>Subtotal: ${calculateTotalCost(item)}</p>

                <button onClick={() => handleRemove(item)}>
                  Remove
                </button>
              </div>

            </div>
          ))}

          <h2>Total: ${calculateTotalAmount()}</h2>

          <button onClick={handleContinueShopping}>
            Continue Shopping
          </button>

          <button onClick={handleCheckoutShopping}>
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default CartItem;