import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const Order = sequelize.define('Order', {
  order: {
    type: DataTypes.JSON,
    allowNull: false
  },
  
  total: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
    
  
});