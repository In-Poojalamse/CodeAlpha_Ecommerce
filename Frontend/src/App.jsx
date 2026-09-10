import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";
import "./App.css";

function App() {
  const { addToCart, totalItems, totalAmount } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Unable to load products.");
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert("Product added to cart!");
  };

  return (
    <div>
      {/* Navigation */}
      <nav
        style={{
          padding: "15px 30px",
          backgroundColor: "#222",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: 0 }}>My E-Commerce Store</h2>

        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <Link
            to="/"
            style={{
              color: "white",
              textDecoration: "none",
            }}
          >
            Home
          </Link>

          <Link
            to="/cart"
            style={{
              color: "white",
              textDecoration: "none",
            }}
          >
            Cart 🛒 ({totalItems})
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          padding: "50px 30px",
          textAlign: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <h1>Welcome to My E-Commerce Store</h1>

        <p>
          Find the products you love and add them to your cart.
        </p>
      </section>

      {/* Products */}
      <section style={{ padding: "40px 30px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
          Our Products
        </h2>

        {loading && (
          <p style={{ textAlign: "center" }}>
            Loading products...
          </p>
        )}

        {error && (
          <p
            style={{
              textAlign: "center",
              color: "red",
            }}
          >
            {error}
          </p>
        )}

        {!loading && !error && products.length === 0 && (
          <p style={{ textAlign: "center" }}>
            No products available.
          </p>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "25px",
            maxWidth: "1200px",
            margin: "auto",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                backgroundColor: "white",
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "20px",
                textAlign: "center",
                boxShadow:
                  "0 3px 10px rgba(0, 0, 0, 0.08)",
              }}
            >
              <Link
                to={`/products/${product.id}`}
                className="product-link"
              >
                <div
                  style={{
                    height: "200px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <span style={{ fontSize: "70px" }}>
                      📦
                    </span>
                  )}
                </div>

                <h3 style={{ marginTop: "15px" }}>
                  {product.name}
                </h3>
              </Link>

              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                ₹{product.price}
              </p>

              <p>
                Stock: {product.stock}
              </p>

              <button
                onClick={() => handleAddToCart(product)}
                disabled={product.stock <= 0}
                style={{
                  padding: "10px 20px",
                  backgroundColor:
                    product.stock > 0 ? "#222" : "#999",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor:
                    product.stock > 0
                      ? "pointer"
                      : "not-allowed",
                }}
              >
                {product.stock > 0
                  ? "🛒 Add to Cart"
                  : "Out of Stock"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Cart Summary */}
      <section
        style={{
          padding: "30px",
          backgroundColor: "#f5f5f5",
          textAlign: "center",
        }}
      >
        <h2>Cart Summary 🛒</h2>

        <p>Total Items: {totalItems}</p>

        <p>Total Amount: ₹{totalAmount}</p>

        {totalItems > 0 && (
          <Link to="/cart">
            <button
              style={{
                padding: "12px 25px",
                backgroundColor: "#222",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              View Cart
            </button>
          </Link>
        )}
      </section>
    </div>
  );
}

export default App;