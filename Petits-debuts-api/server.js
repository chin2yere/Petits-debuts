// app.js
import express from "express";
import session from "express-session";
import cors from "cors";
import morgan from "morgan";
import { sequelize } from "./database.js";
import { User, Business, Cart, Order, Product } from "./models/index.js";
import router from "./Routes/users.js";
import SequelizeStoreInit from "connect-session-sequelize";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

app.use(express.json()); // Middleware for parsing JSON bodies from HTTP requests
app.use(morgan("tiny"));

const SequelizeStore = SequelizeStoreInit(session.Store);
const sessionStore = new SequelizeStore({
  db: sequelize,
});

// Session middleware
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      sameSite: false,
      secure: false,
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year in milliseconds
    },
  })
);
sessionStore.sync();

app.use(router);

// Route to get all business, with associated users
app.get("/business", async (req, res) => {
  try {
    const business = await Business.findAll({
      include: [{ model: User, as: "user" }],
      order: [["createdAt", "DESC"]],
    });
    res.json(business);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//route to get all products
app.get("/product", async (req, res) => {
  try {
    const product = await Product.findAll({
      include: [{ model: Business, as: "business" }],
      order: [["createdAt", "DESC"]],
    });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//route to get all orders
app.get("/order", async (req, res) => {
  try {
    const order = await Order.findAll({
      include: [{ model: User, as: "user" }],
      order: [["createdAt", "DESC"]],
    });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//route to get all carts
app.get("/cart", async (req, res) => {
  try {
    const cart = await Cart.findAll({
      include: [{ model: User, as: "user" }],
      order: [["createdAt", "DESC"]],
    });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//route to access users cart
app.post("/mycart", async (req, res) => {
  const { id } = req.body;
  const cartPlaceHolder = {};
  const totalPlaceHolder = 0.0;

  try {
    // Check if cart already exists
    const existingCart = await Cart.findOne({ where: { userId: id } });

    if (existingCart) {
      res.json({ usercart: existingCart });
    } else if (!existingCart) {
      // Create a new cart
      const newCart = await Cart.create({
        userId: id,
        cart: cartPlaceHolder,
        total: totalPlaceHolder,
      });
      // Return the user data in the response
      res.json({ usercart: newCart });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to create a new business

app.post("/business", async (req, res) => {
  try {
    // Check if user is logged in
    if (!req.session.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Retrieve the current user from the session
    const currentUser = req.session.user;

    // Create the post with the current user ID
    const business = await Business.create({
      ...req.body,
      userId: currentUser.id,
    });

    const businessWithUser = await Business.findOne({
      where: { id: business.id },
      include: [{ model: User, as: "user" }],
    });

    res.status(201).json(businessWithUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// route to post an order
app.post("/order/post", async (req, res) => {
  const { cartContext, totalContext, id } = req.body;

  try {
    // Create a new order
    const neworder = await Order.create({
      order: cartContext,
      total: totalContext,
      userId: id,
    });
    console.log(1);

    // Return the user data in the response
    res.json({ neworder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
////end
//route to delete cart
app.post("/cart/delete", async (req, res) => {
  const { clearCartValue, clearCartValueTotal, id } = req.body;

  try {
    // find the cart
    const existingCart = await Cart.findOne({ where: { userId: id } });
    if (existingCart) {
      const updatedCart = await existingCart.update({
        cart: clearCartValue,
        total: clearCartValueTotal,
        userId: id,
      });
      res.json({ updatedCart });
    } else {
      const newCart = await Cart.create({
        cart: clearCartValue,
        total: clearCartValueTotal,
        userId: id,
      });
      res.json({ newCart });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
//updatelikes

app.post("/likes/update", async (req, res) => {
  const { tempLikes, id } = req.body;

  try {
    // find the product
    const product = await Product.findOne({ where: { id } });
    if (product) {
      const updatedProduct = await product.update({
        likes: tempLikes,
      });
      res.json({ updatedProduct });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

//end

sequelize
  .sync({ alter: true })
  .then(() => {
    const port = 3000;
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
