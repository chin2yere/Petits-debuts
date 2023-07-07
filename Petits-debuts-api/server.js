// app.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { sequelize } from './database.js';
import { User, Business } from './models/index.js';

const app = express();

app.use(cors())
app.use(express.json()); // Middleware for parsing JSON bodies from HTTP requests
app.use(morgan())

sequelize.sync({ alter: true })
  .then(() => {
    const port = 3001;
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });