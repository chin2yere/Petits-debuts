import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const Money = sequelize.define('Money', {
  points: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});