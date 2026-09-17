const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mysql = require("mysql2/promise");

const app = express();

app.use(cors());
app.use(express.json());

// ===============================
// MYSQL DATABASE CONNECTION
// ===============================

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

console.log("Database configured as:", process.env.DB_NAME);

// ===============================
// TEST DATABASE CONNECTION
// ===============================

async function testDatabaseConnection() {
  try {
    const connection = await db.getConnection();

    console.log("MySQL Database Connected Successfully");

    connection.release();
  } catch (error) {
    console.error("Database Connection Failed:", error.message);
  }
}

testDatabaseConnection();

// ===============================
// HOME ROUTE
// ===============================

app.get("/", (req, res) => {
  res.send("E-commerce Backend is Running!");
});

// ===============================
// USER APIs
// ===============================

// REGISTER USER
app.post("/api/users/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const [result] = await db.execute(
      `INSERT INTO users
       (name, email, password, role)
       VALUES (?, ?, ?, ?)`,
      [name, email, password, role]
    );

    res.status(201).json({
      message: "User registered successfully",
      userId: result.insertId,
    });
  } catch (error) {
    console.error("Register Error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// LOGIN USER
app.post("/api/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const [users] = await db.execute(
      `SELECT * FROM users
       WHERE email = ? AND password = ?`,
      [email, password]
    );

    if (users.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      message: "Login successful",
      user: users[0],
    });
  } catch (error) {
    console.error("Login Error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// ===============================
// PRODUCT APIs
// ===============================

// GET ALL PRODUCTS
app.get("/api/products", async (req, res) => {
  try {
    const [products] = await db.execute(
      "SELECT * FROM products ORDER BY id"
    );

    res.status(200).json(products);
  } catch (error) {
    console.error("Get Products Error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// GET SINGLE PRODUCT
app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [products] = await db.execute(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );

    if (products.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(products[0]);
  } catch (error) {
    console.error("Get Product Error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// ADD PRODUCT
app.post("/api/products", async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      image,
    } = req.body;

    if (
      !name ||
      price === undefined ||
      stock === undefined
    ) {
      return res.status(400).json({
        message: "Name, price and stock are required",
      });
    }

    const [result] = await db.execute(
      `INSERT INTO products
       (name, description, price, stock, image)
       VALUES (?, ?, ?, ?, ?)`,
      [
        name,
        description || null,
        price,
        stock,
        image || null,
      ]
    );

    res.status(201).json({
      message: "Product added successfully",
      productId: result.insertId,
    });
  } catch (error) {
    console.error("Add Product Error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// UPDATE PRODUCT
app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      price,
      stock,
      image,
    } = req.body;

    const [result] = await db.execute(
      `UPDATE products
       SET name = ?,
           description = ?,
           price = ?,
           stock = ?,
           image = ?
       WHERE id = ?`,
      [
        name,
        description || null,
        price,
        stock,
        image || null,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error("Update Product Error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// DELETE PRODUCT
app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.execute(
      "DELETE FROM products WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete Product Error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// ===============================
// ORDER APIs
// ===============================

// CREATE ORDER
app.post("/api/orders", async (req, res) => {
  try {
    const {
      user_id,
      total_amount,
      status,
    } = req.body;

    if (
      !user_id ||
      total_amount === undefined ||
      !status
    ) {
      return res.status(400).json({
        message:
          "user_id, total_amount and status are required",
      });
    }

    const [result] = await db.execute(
      `INSERT INTO orders
       (user_id, total_amount, status, created_at)
       VALUES (?, ?, ?, NOW())`,
      [
        user_id,
        total_amount,
        status,
      ]
    );

    res.status(201).json({
      message: "Order created successfully",
      orderId: result.insertId,
    });
  } catch (error) {
    console.error("Create Order Error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// GET ALL ORDERS
app.get("/api/orders", async (req, res) => {
  try {
    const [orders] = await db.execute(
      `SELECT
        orders.id,
        orders.user_id,
        users.name AS user_name,
        orders.total_amount,
        orders.status,
        orders.created_at
       FROM orders
       INNER JOIN users
       ON orders.user_id = users.id
       ORDER BY orders.id`
    );

    res.status(200).json(orders);
  } catch (error) {
    console.error("Get Orders Error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// GET SINGLE ORDER
app.get("/api/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [orders] = await db.execute(
      `SELECT
        orders.id,
        orders.user_id,
        users.name AS user_name,
        orders.total_amount,
        orders.status,
        orders.created_at
       FROM orders
       INNER JOIN users
       ON orders.user_id = users.id
       WHERE orders.id = ?`,
      [id]
    );

    if (orders.length === 0) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json(orders[0]);
  } catch (error) {
    console.error("Get Order Error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// UPDATE ORDER STATUS
app.put("/api/orders/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
      });
    }

    const [result] = await db.execute(
      `UPDATE orders
       SET status = ?
       WHERE id = ?`,
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      message: "Order status updated successfully",
    });
  } catch (error) {
    console.error(
      "Update Order Status Error:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
});

// ===============================
// ORDER ITEM APIs
// ===============================

// ADD ORDER ITEM
app.post("/api/order-items", async (req, res) => {
  try {
    const {
      order_id,
      product_id,
      quantity,
      price,
    } = req.body;

    if (
      !order_id ||
      !product_id ||
      quantity === undefined ||
      price === undefined
    ) {
      return res.status(400).json({
        message:
          "order_id, product_id, quantity and price are required",
      });
    }

    const [result] = await db.execute(
      `INSERT INTO order_item
       (order_id, product_id, quantity, price)
       VALUES (?, ?, ?, ?)`,
      [
        order_id,
        product_id,
        quantity,
        price,
      ]
    );

    res.status(201).json({
      message: "Order item added successfully",
      orderItemId: result.insertId,
    });
  } catch (error) {
    console.error(
      "Add Order Item Error:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
});

// GET ORDER ITEMS
app.get("/api/orders/:orderId/items", async (req, res) => {
  try {
    const { orderId } = req.params;

    const [items] = await db.execute(
      `SELECT
        order_item.id,
        order_item.order_id,
        order_item.product_id,
        products.name AS product_name,
        order_item.quantity,
        order_item.price
       FROM order_item
       INNER JOIN products
       ON order_item.product_id = products.id
       WHERE order_item.order_id = ?
       ORDER BY order_item.id`,
      [orderId]
    );

    res.status(200).json(items);
  } catch (error) {
    console.error(
      "Get Order Items Error:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
});

// DELETE ORDER ITEM
app.delete("/api/order-items/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.execute(
      "DELETE FROM order_item WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Order item not found",
      });
    }

    res.status(200).json({
      message: "Order item deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete Order Item Error:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
});

// ===============================
// HEALTH CHECK
// ===============================

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "E-commerce Backend is healthy",
  });
});

// ===============================
// START SERVER
// ===============================

// Render provides PORT automatically.
// Local development uses 5000 if PORT is not set.

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on 0.0.0.0:${PORT}`);
});