import { useState, useEffect } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/cart")
      .then((response) => response.json())
      .then((data) => setCart(data))
      .catch((error) => console.error("Error fetching cart:", error));
  }, []);

  const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="container">
        <h2 className="text-center mb-4">Cart</h2>
        {cart.length === 0 ? (
          <p className="text-center">Your cart is empty</p>
        ) : (
          <>
            <div className="row">
              {cart.map((item) => (
                <div key={item.productId} className="col-md-12 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">Quantity: {item.quantity}</p>
                      <p className="card-text">
                        Price: ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <h4 className="text-center mt-4">Total: ${total.toFixed(2)}</h4>
          </>
        )}
      </div>
    </div>
  );
}
