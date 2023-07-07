import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const Product = sequelize.define('Product', {
  product_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    
  },
  total_quantity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  picture_url: {
    type: DataTypes.STRING,
    allowNull: false,
    
  },
  service: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    
  },
  availability: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
    
  }
});