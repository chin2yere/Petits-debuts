import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const Cart = sequelize.define('Cart', {
  cart: {
    type: DataTypes.JSON,
    allowNull: false
  },
  total: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
});