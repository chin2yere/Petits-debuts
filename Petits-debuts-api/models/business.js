import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const  Business = sequelize.define('Business', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});