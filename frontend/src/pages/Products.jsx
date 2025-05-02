import { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  //const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleAddToCart = (productId) => {
    fetch("http://localhost:3000/api/v1/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, quantity: 1 }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data.message))
      .catch((error) => console.error("Error adding to cart:", error));
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="container">
        <h2 className="text-center mb-4">Products</h2>
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">
                    Price: ${product.price.toFixed(2)}
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(product._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
