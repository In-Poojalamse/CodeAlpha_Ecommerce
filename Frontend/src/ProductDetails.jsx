import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from "./CartContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>Product not found</h2>

        <button onClick={() => navigate("/")}>
          Back to Products
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    alert("Product added to cart!");
  };

  return (
    <div className="product-details-page">

      <button
        className="back-button"
        onClick={() => navigate("/")}
      >
        ← Back to Products
      </button>

      <div className="product-details">

        <div className="details-image">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
            />
          ) : (
            <span>📦</span>
          )}
        </div>

        <div className="details-content">

          <h1>{product.name}</h1>

          <p className="details-description">
            {product.description}
          </p>

          <p className="details-price">
            ₹{product.price}
          </p>

          <p className="details-stock">
            Available Stock: {product.stock}
          </p>

          <button
            className="details-cart-button"
            onClick={handleAddToCart}
          >
            🛒 Add to Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;