import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const  Business = sequelize.define('Business', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  picture_url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  service: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  rating: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  location: {
    type: DataTypes.TEXT,
    allowNull: false
  }

});