import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const Money = sequelize.define('Money', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    
  },
  businessOwner: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
    
  }
});