import React, { useState } from 'react';
import { useSelector } from 'react-redux'; // Assuming you're using Redux

const Cart = () => {
  const cart = useSelector(state => state.handleCart); // Assuming your cart state is stored in Redux

  const [cartItems, setCartItems] = useState(cart);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleAdd = (product) => {
    // Logic to add product to cart
    const updatedCart = cartItems.map(item =>
      item.id === product.id ? { ...item, qty: item.qty + 1 } : item
    );
    setCartItems(updatedCart);
  };

  const handleRemove = (product) => {
    // Logic to remove product from cart
    const updatedCart = cartItems.map(item =>
      item.id === product.id && item.qty > 0 ? { ...item, qty: item.qty - 1 } : item
    );
    setCartItems(updatedCart);
  };

  const handleEmptyCart = () => {
    // Logic to empty the cart
    setCartItems([]);
  };

  const handleTotalPrice = () => {
    // Logic to proceed to checkout
    const totalPrice = calculateTotalAmount();
    setTotalPrice(totalPrice);
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.qty * item.price, 0);
  };

  return (
    <div className="container my-5" >
      <h2 className='text-center my-4' style={{fontWeight:700, color:"blue", textDecoration:"underline"}}>CART ITEMS</h2>
      {cartItems.map(product => (
        <div key={product.id} className="container px-4 text-center">
          <div className="row gx-5 m-5" >
            <div className="col-md-4">
              <img src={product.image} alt={product.title} height="200px" width="180px"/>
            </div>
            <div className="col-md-4">
              <h3>{product.title}</h3>
              <p className="lead fw-bold" style={{color:"red"}}>
                {product.qty} x ${product.price} = $ {product.qty * product.price}
              </p>
              <hr />
              <button className="btn btn-outline-dark me-4" onClick={() => handleRemove(product)}>
                <i className='fa fa-minus'></i>
              </button>
              <button className="btn btn-outline-dark" onClick={() => handleAdd(product)}>
                <i className='fa fa-plus'></i>
              </button>
            </div>
          </div>
        </div>
      ))}
      <hr />
      <div className="text-center">
        <button className="btn btn-danger mx-3" onClick={handleEmptyCart}>Empty Cart</button>
        <button className="btn btn-success mx-3" onClick={handleTotalPrice}>Buy Now</button>
        {/* <button className="btn btn-success mx-3" onClick={handleCheckout}>Buy Now</button> */}
      </div>
      {totalPrice !== 0 && (
        <div className="text-center mt-3">
          <p className="lead fw-bold"><i>Total Price:</i> ${totalPrice}</p>
        </div>
      )}
    </div>
  );
};

export default Cart;