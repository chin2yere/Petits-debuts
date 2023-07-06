import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('chinyeredatabase', 'chin2yere', 'AdAeZe189$$1', {
  host: 'localhost',
  dialect: 'postgres'
});