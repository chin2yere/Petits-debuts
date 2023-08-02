// app.js
import express from "express";
import session from "express-session";
import cors from "cors";
import morgan from "morgan";
import { sequelize } from "./database.js";
import { User, Business, Cart, Order, Product } from "./models/index.js";
import router from "./Routes/users.js";
import SequelizeStoreInit from "connect-session-sequelize";
import { SENDGRID_API_KEY } from "./api_key.js";
import sgMail from "@sendgrid/mail";
import cron from "node-cron";
import { INTEGER } from "sequelize";

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
sgMail.setApiKey(SENDGRID_API_KEY);

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
//end
//route to get all products with associated businesses
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
//end
//route to get all orders with associated users
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
//end
//route to get all carts with associated users
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
//end
//route to access logged in users cart
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
      //if the cart doesn't exist
      // Create a new cart
      const newCart = await Cart.create({
        userId: id,
        cart: cartPlaceHolder,
        total: totalPlaceHolder,
      });
      // Return the cart data in the response
      res.json({ usercart: newCart });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
//end
//route to get logged in user's business
app.post("/mybusiness", async (req, res) => {
  const { id } = req.body;

  try {
    // find all the user's business
    const userBusiness = await Business.findAll({
      where: { userId: id },
      order: [["createdAt", "DESC"]],
    });

    res.json({ userBusiness });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

//end

//route to get each business products
app.post("/mybusiness/product", async (req, res) => {
  const { id } = req.body;

  try {
    // find all the user's business products
    const userBusinessProduct = await Product.findAll({
      where: { businessId: id },
      order: [["createdAt", "DESC"]],
    });

    res.json({ userBusinessProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
//end
//route to create new product for a specified business
app.post("/product/create", async (req, res) => {
  const {
    name,
    category,
    description,
    price,
    quantity,
    service,
    availability,
    idContext,
  } = req.body;

  try {
    // Create a new product
    function returnAvailability(service, availability) {
      if (service) {
        return availability;
      } else {
        return null;
      }
    }

    const newProduct = await Product.create({
      product_name: name,
      category: category,
      description: description,
      price: price,
      total_quantity: quantity,
      picture_url: "/Pictures/food.avif",
      service: service,
      availability: returnAvailability(service, availability),
      likes: {},
      businessId: idContext,
    });

    // Return the product data in the response
    res.json({ newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
//end

//route to create new business for a user
app.post("/business/create", async (req, res) => {
  const { name, location, service, idContext } = req.body;

  try {
    // Create a new business

    const newBusiness = await Business.create({
      name: name,
      picture_url: "/Pictures/business-background.jpeg",
      service: service,
      rating: 4,
      location: location,
      userId: idContext,
    });

    // Return the business data in the response
    res.json({ newBusiness });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
//end
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

    // Return the order data in the response
    res.json({ neworder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
//end
//route to delete cart after purchase
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
//end
//route to update the likes and dislikes of a product
app.post("/likes/update", async (req, res) => {
  const { tempLikes, id } = req.body;

  try {
    // find the product
    const product = await Product.findOne({ where: { id } });
    if (product) {
      const updatedProduct = await product.update({
        likes: tempLikes,
      });
      const response = await Product.findAll({
        include: [{ model: Business, as: "business" }],
        order: [["createdAt", "DESC"]],
      });
      res.json({ response });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
//end
// route to get a logged in user's past orders
app.post("/myorder", async (req, res) => {
  const { id } = req.body;

  try {
    // find all the user's orders
    const userOrder = await Order.findAll({
      where: { userId: id },
      include: [{ model: User, as: "user" }],
      order: [["createdAt", "DESC"]],
    });

    res.json({ userOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
//end
// route to update a user's points upon purchase
app.post("/buyer/topup", async (req, res) => {
  const { buyer, deduction } = req.body;

  try {
    // find the user
    const topupUser = await User.findOne({
      where: { id: buyer },
    });
    if (topupUser) {
      const points = topupUser.money;
      const updatedMoney = await topupUser.update({
        money: points + deduction,
      });
      res.json({ updatedMoney });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
//end
//route to subtract points from a purchaser, distribute the points among
//product owners, and send confirmation email using send box
app.post("/money/update", async (req, res) => {
  const { buyer, deduction, moneyUpdateContext, context } = req.body;

  try {
    // find all the buyer
    const topupUser = await User.findOne({
      where: { id: buyer },
    });
    if (topupUser) {
      const points = topupUser.money;
      const updatedMoney = await topupUser.update({
        money: points - deduction,
      });
      for (const [key, value] of Object.entries(moneyUpdateContext)) {
        const businessOwner = await User.findOne({
          where: { id: key },
        });
        if (businessOwner) {
          const currentMoney = businessOwner.money;
          const updatedBusinessOwnerMoney = await businessOwner.update({
            money: currentMoney + value,
          });
        }
      }
      //this part of the code get's the information on what was actually purchased
      let orderList = "";
      for (const [key, value] of Object.entries(context)) {
        const productName = await Product.findOne({
          where: { id: key },
        });
        orderList += productName.product_name;
        orderList += ", ";
      }

      const msg = {
        to: topupUser.email, // Change to your recipient
        from: "chinyereofformeta@gmail.com", // Change to your verified sender
        subject: "Order Confirmation",
        text: "Thank you for your order. It will be processed immediately",
        html: `<h3>Thank you for your order for ${orderList}.</h3><br><h5>We appreciate you picking us out of the wide variety of platforms out there<br></h5><strong>Please keep an eye out for shipping updates</strong>`,
      };
      const sendEmail = async (msg) => {
        try {
          await sgMail.send(msg);
          console.log("Message sent successfully");
        } catch (error) {
          console.error(error);
          if (error.response) {
            console.error(error.response.body);
          }
        }
      };
      sendEmail(msg);

      res.json({ updatedMoney });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
//end
//end of routes
//node-cron to run at midnight every day
cron.schedule("0 0 * * *", function () {
  const isServiceOrder = (obj) => {
    const firstValue = obj[Object.keys(obj)[0]];
    if (typeof firstValue !== "number") {
      return true;
    } else {
      return false;
    }
  };
  const getAllServiceOrders = async () => {
    try {
      const serviceOrder = await Order.findAll({
        include: [{ model: User, as: "user" }],
        order: [["createdAt", "DESC"]],
      });
      for (let i = 0; i < serviceOrder.length; i++) {
        if (isServiceOrder(serviceOrder[i].order)) {
          for (const [key, value] of Object.entries(serviceOrder[i].order)) {
            const today = new Date();
            const appointment = new Date(value);
            const day = appointment.getUTCDate().toString().padStart(2, "0");
            const month = (appointment.getUTCMonth() + 1)
              .toString()
              .padStart(2, "0");

            if (appointment > today) {
              const product = await Product.findOne({
                where: { id: key },
              });
              const recepient_email = serviceOrder[i].user.email;
              const msg = {
                to: recepient_email, // Change to your recipient
                from: "chinyereofformeta@gmail.com", // Change to your verified sender
                subject: "Appointment Reminder",
                text: "Thank you for your order. It will be processed immediately",
                html: `<h3>This is a reminder of your upcoming appointment with ${product.product_name}.</h3><br><h5>This appointment will take place on the ${day} of ${month}<br></h5><strong>Please take note</strong>`,
              };
              const sendEmail = async (msg) => {
                try {
                  await sgMail.send(msg);
                  console.log("Message sent successfully");
                } catch (error) {
                  console.error(error);
                  if (error.response) {
                    console.error(error.response.body);
                  }
                }
              };
              sendEmail(msg);
            }
          }
        }
      }
    } catch {}
  };
  getAllServiceOrders();
});
//end of node-cron
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
