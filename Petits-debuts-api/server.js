// app.js
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import morgan from 'morgan';
import { sequelize } from './database.js';
import { User, Business, Cart, Order, Product} from './models/index.js';
import router from './Routes/users.js';
import SequelizeStoreInit from 'connect-session-sequelize';


const app = express();

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

app.use(express.json()); // Middleware for parsing JSON bodies from HTTP requests
app.use(morgan("tiny"));

const SequelizeStore = SequelizeStoreInit(session.Store);
const sessionStore = new SequelizeStore({
  db: sequelize
});

// Session middleware
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      sameSite: false,
      secure: false,
      expires: new Date(Date.now() + (365 * 24 * 60 * 60 * 1000)) // 1 year in milliseconds
    }
  })
);
sessionStore.sync();

app.use(router);

// Route to get all business, with associated users
app.get('/business', async (req, res) => {
  try {
    const business = await Business.findAll({
      include: [{ model: User, as: 'user' }],
      order: [['createdAt', 'DESC']]
    });
    res.json(business);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//route to get all products
app.get('/product', async (req, res) => {
  try {
    const product = await Product.findAll({
      include: [{ model: Business, as: 'business' }],
      order: [['createdAt', 'DESC']]
    });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//route to get all orders
app.get('/order', async (req, res) => {
  try {
    const order = await Order.findAll({
      include: [{ model: User, as: 'user' }],
      order: [['createdAt', 'DESC']]
    });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//route to get all carts
app.get('/cart', async (req, res) => {
  try {
    const cart = await Cart.findAll({
      include: [{ model: User, as: 'user' }],
      order: [['createdAt', 'DESC']]
    });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to create a new post

app.post('/business', async (req, res) => {
  try {
    
    // Check if user is logged in
    if (!req.session.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Retrieve the current user from the session
    const currentUser = req.session.user;

    // Create the post with the current user ID
    const business = await Business.create({
      ...req.body,
      userId: currentUser.id
    });

    const businessWithUser = await Business.findOne({
      where: { id: business.id },
      include: [{ model: User, as: 'user' }]
    });

    res.status(201).json(businessWithUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


sequelize.sync({ alter: true })
  .then(() => {
    const port = 3000;
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });
