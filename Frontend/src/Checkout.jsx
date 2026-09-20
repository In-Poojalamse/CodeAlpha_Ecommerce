
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";

function Checkout() {
  const { cart, totalAmount } = useContext(CartContext);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert("Please fill all details.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      setPlacingOrder(true);

      // Create order
      const orderResponse = await fetch(
        "https://pooja-codealpha-ecommerce-backend.onrender.com/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: 1,
            total_amount: totalAmount,
            status: "Pending",
          }),
        }
      );

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(
          orderData.message || "Failed to create order"
        );
      }

      const createdOrderId = orderData.orderId;

      // Add cart products to order_item table
      for (const item of cart) {
        const itemResponse = await fetch(
          "https://pooja-codealpha-ecommerce-backend.onrender.com/api/order-items",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              order_id: createdOrderId,
              product_id: item.id,
              quantity: item.quantity,
              price: Number(item.price),
            }),
          }
        );

        const itemData = await itemResponse.json();

        if (!itemResponse.ok) {
          throw new Error(
            itemData.message || "Failed to save order item"
          );
        }
      }

      setOrderId(createdOrderId);
      setOrderPlaced(true);
    } catch (error) {
      console.error("Order Error:", error);
      alert("Unable to place order. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "50px",
        }}
      >
        <h1>Your Cart is Empty 🛒</h1>

        <p>Please add products before checkout.</p>

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

  if (orderPlaced) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "80px 20px",
        }}
      >
        <h1>🎉 Order Placed Successfully!</h1>

        <p>Thank you for your order, {name}.</p>

        <p>
          Your Order ID: <strong>#{orderId}</strong>
        </p>

        <p>
          Total Amount: <strong>₹{totalAmount}</strong>
        </p>

        <Link to="/">
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
        maxWidth: "1000px",
        margin: "auto",
      }}
    >
      <h1>Checkout</h1>

      <p>Complete your order below.</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
          marginTop: "30px",
        }}
      >
        {/* Customer Details */}

        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "25px",
          }}
        >
          <h2>Customer Details</h2>

          <form onSubmit={handlePlaceOrder}>
            <label>Name</label>

            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
              style={{
                width: "100%",
                padding: "10px",
                margin: "8px 0 20px",
                boxSizing: "border-box",
              }}
            />

            <label>Phone</label>

            <input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Enter phone number"
              style={{
                width: "100%",
                padding: "10px",
                margin: "8px 0 20px",
                boxSizing: "border-box",
              }}
            />

            <label>Address</label>

            <textarea
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Enter delivery address"
              rows="5"
              style={{
                width: "100%",
                padding: "10px",
                margin: "8px 0 20px",
                boxSizing: "border-box",
              }}
            />

            <button
              type="submit"
              disabled={placingOrder}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: placingOrder ? "#999" : "#222",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: placingOrder ? "not-allowed" : "pointer",
                fontSize: "16px",
              }}
            >
              {placingOrder ? "Placing Order..." : "Place Order"}
            </button>
          </form>
        </div>

        {/* Order Summary */}

        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "25px",
          }}
        >
          <h2>Order Summary 🛒</h2>

          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <div>
                <strong>{item.name}</strong>

                <p style={{ margin: "5px 0" }}>
                  Quantity: {item.quantity}
                </p>
              </div>

              <strong>
                ₹{Number(item.price) * item.quantity}
              </strong>
            </div>
          ))}

          <h2
            style={{
              textAlign: "right",
              marginTop: "25px",
            }}
          >
            Total: ₹{totalAmount}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

