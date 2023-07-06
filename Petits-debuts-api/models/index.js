import { User } from './user.js';
import { Business } from './business.js';
import { Cart } from './cart.js';
import { Money } from './money.js';
import { Order } from './order.js';
import { Product } from './product.js';

User.hasMany(Business, { as: 'business', foreignKey: 'userId' });
Business.belongsTo(User, { as: 'user', foreignKey: 'userId' });


export { User, Business, Cart, Money, Order, Product };

