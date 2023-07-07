import { User } from './user.js';
import { Business } from './business.js';
import { Cart } from './cart.js';
import { Order } from './order.js';
import { Product } from './product.js';

User.hasMany(Business, { as: 'business', foreignKey: 'userId' });
Business.belongsTo(User, { as: 'user', foreignKey: 'userId'});

User.hasOne(Cart, { as: 'cart', foreignKey: 'userId' });
Cart.belongsTo(User, { as: 'user', foreignKey: 'userId'});

User.hasMany(Order, { as: 'order', foreignKey: 'userId' });
Order.belongsTo(User, { as: 'user', foreignKey: 'userId'});

Business.hasMany(Product, { as: 'product', foreignKey: 'businessId' });
Product.belongsTo(Business, { as: 'business', foreignKey: 'businessId' });






export { User, Business, Cart,  Order, Product };

