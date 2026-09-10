\# 🛒 CodeAlpha E-commerce Store



A full-stack e-commerce web application developed as part of the \*\*CodeAlpha Full Stack Development Internship\*\*.



The application provides a complete shopping experience including product browsing, product details, cart management, user registration and login, and order processing with data stored in a MySQL database.



\## ✨ Features



\* 🛍️ Product listing and browsing

\* 🔎 Product details page

\* 🛒 Add products to cart

\* ➕ Increase/decrease cart quantity

\* ❌ Remove products from cart

\* 💰 Automatic cart total calculation

\* 👤 User registration

\* 🔐 User login

\* 📦 Order processing

\* 🗄️ MySQL database integration

\* 🔗 REST API based backend

\* 📱 Responsive user interface



\## 🛠️ Tech Stack



\### Frontend



\* React.js

\* JavaScript

\* HTML5

\* CSS3

\* Vite

\* React Router



\### Backend



\* Node.js

\* Express.js

\* REST APIs



\### Database



\* MySQL



\### Tools



\* Visual Studio Code

\* Git

\* GitHub

\* MySQL Workbench

\* Postman



\## 📂 Project Structure



```text

CodeAlpha\_Ecommerce/

│

├── Backend/

│   ├── config/

│   │   └── db.js

│   ├── package.json

│   └── server.js

│

├── Frontend/

│   ├── public/

│   ├── src/

│   │   ├── App.jsx

│   │   ├── Cart.jsx

│   │   ├── CartContext.jsx

│   │   ├── Checkout.jsx

│   │   ├── Login.jsx

│   │   ├── ProductDetails.jsx

│   │   ├── Register.jsx

│   │   └── main.jsx

│   ├── package.json

│   └── vite.config.js

│

└── .gitignore

```



\## ⚙️ Installation \& Setup



\### 1. Clone the repository



```bash

git clone https://github.com/In-Poojalamse/CodeAlpha\_Ecommerce.git

cd CodeAlpha\_Ecommerce

```



\### 2. Backend Setup



```bash

cd Backend

npm install

```



Create a `.env` file inside the `Backend` folder and configure your MySQL database details:



```env

DB\_HOST=localhost

DB\_USER=your\_mysql\_username

DB\_PASSWORD=your\_mysql\_password

DB\_NAME=your\_database\_name

PORT=5000

```



Start the backend:



```bash

node server.js

```



The backend will run on:



```text

http://localhost:5000

```



\### 3. Frontend Setup



Open another terminal:



```bash

cd Frontend

npm install

npm run dev

```



The frontend will run on the Vite development server, usually:



```text

http://localhost:5173

```



\## 🔗 Main API Endpoints



| Method | Endpoint              | Description           |

| ------ | --------------------- | --------------------- |

| GET    | `/api/products`       | Get all products      |

| GET    | `/api/products/:id`   | Get product by ID     |

| POST   | `/api/products`       | Add a product         |

| PUT    | `/api/products/:id`   | Update a product      |

| DELETE | `/api/products/:id`   | Delete a product      |

| POST   | `/api/users/register` | Register a user       |

| POST   | `/api/users/login`    | Login user            |

| POST   | `/api/orders`         | Create an order       |

| GET    | `/api/orders`         | Get all orders        |

| GET    | `/api/orders/:id`     | Get order by ID       |

| POST   | `/api/order-items`    | Add items to an order |



\## 🗄️ Database



The application uses \*\*MySQL\*\* to store:



\* Users

\* Products

\* Orders

\* Order items



The backend communicates with MySQL through the Node.js/Express application.



\## 🛒 Application Flow



```text

User

&#x20;↓

Browse Products

&#x20;↓

View Product Details

&#x20;↓

Add to Cart

&#x20;↓

Review Cart

&#x20;↓

Checkout

&#x20;↓

Create Order

&#x20;↓

Store Order \& Order Items in MySQL

```



\## 🎯 Internship Task



This project was developed for:



\*\*CodeAlpha – Full Stack Development Internship\*\*



\### Completed Task



\*\*Task 1 – Simple E-commerce Store\*\*



The implementation covers product listings, product details, shopping cart, user registration/login, database integration, and order processing.



\## 🚀 Future Enhancements



\* JWT-based authentication

\* Password hashing

\* Online payment integration

\* Product search and filtering

\* Admin dashboard

\* Order history for users

\* Stock management

\* Deployment to a cloud platform



\## 👩‍💻 Developer



\*\*Pooja Ashok Lamse\*\*



GitHub: \[In-Poojalamse](https://github.com/In-Poojalamse)



\---



⭐ If you find this project useful, consider giving the repository a star!



