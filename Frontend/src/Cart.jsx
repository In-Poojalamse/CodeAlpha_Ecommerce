import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";

function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalAmount,
  } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "50px",
        }}
      >
        <h1>Your Cart 🛒</h1>

        <p>Your cart is empty.</p>

        <Link to="/">
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#222",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "900px",
        margin: "auto",
      }}
    >
      <h1>Your Cart 🛒</h1>

      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            padding: "20px 0",
            borderBottom: "1px solid #ddd",
          }}
        >
          <div
            style={{
              width: "100px",
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            ) : (
              <span style={{ fontSize: "40px" }}>📦</span>
            )}
          </div>

          <div style={{ flex: 1 }}>
            <h3>{item.name}</h3>

            <p>Price: ₹{item.price}</p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <button onClick={() => decreaseQuantity(item.id)}>
                −
              </button>

              <span>{item.quantity}</span>

              <button onClick={() => increaseQuantity(item.id)}>
                +
              </button>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              style={{
                marginTop: "10px",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </div>

          <strong>
            ₹{Number(item.price) * item.quantity}
          </strong>
        </div>
      ))}

      <div
        style={{
          marginTop: "30px",
          textAlign: "right",
        }}
      >
        <h2>Total: ₹{totalAmount}</h2>

        <Link to="/checkout">
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
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;