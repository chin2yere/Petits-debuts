import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { User, Business, Cart, Order, Product } from './models/index.js';
import { sequelize } from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const userData = JSON.parse(fs.readFileSync(path.resolve(__dirname, './seeders/users.json'), 'utf8'));
const businessData = JSON.parse(fs.readFileSync(path.resolve(__dirname, './seeders/business.json'), 'utf8'));
const cartData = JSON.parse(fs.readFileSync(path.resolve(__dirname, './seeders/cart.json'), 'utf8'));
const orderData = JSON.parse(fs.readFileSync(path.resolve(__dirname, './seeders/order.json'), 'utf8'));
const productData = JSON.parse(fs.readFileSync(path.resolve(__dirname, './seeders/product.json'), 'utf8'));
//const businessData = JSON.parse(fs.readFileSync(path.resolve(__dirname, './seeders/business.json'), 'utf8'));

const seedDatabase = async () => {
  try {
    // Sync all models that aren't already in the database
    await sequelize.sync({ alter: true });

    // Then seed the User and Post data
    await User.bulkCreate(userData);
    console.log('User data has been seeded!');

    await Business.bulkCreate(businessData);
    console.log('Business data has been seeded!');

    await Cart.bulkCreate(cartData);
    console.log('Cart data has been seeded!');

    await Order.bulkCreate(orderData);
    console.log('Order data has been seeded!');

    await Product.bulkCreate(productData);
    console.log('Product data has been seeded!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();