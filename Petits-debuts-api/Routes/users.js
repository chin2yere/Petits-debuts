import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
import { Op } from 'sequelize';
import cors from 'cors';

const router = express.Router();
//route for post
router.get('/user', async (req, res) => {
    try {
      const user = await User.findAll({
        //include: [{ model: User, as: 'user' }],
        order: [['createdAt', 'DESC']]
      });
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// Route for user registration
router.post('/users', async (req, res) => {
  console.log(req);
  const { username, email, password, address, businessOwner, location } = req.body;
  //console.log('Received registration request:', { name, email, password, address, businessOwner, location });


  try {
    // Check if username or email already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ name: username }, { email }]
      }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    // Encrypt the password
    

    // Create a new user
    const newUser = await User.create({ name:username, email,  password, address, businessOwner, location });

    // Set the user in the session
    req.session.user = newUser;

    // Return the user data in the response
    res.json({ user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route for user login
router.post('/users/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
      // Find the user by username
      
      
      const user = await User.findOne( {name :username  });
      
  
      if (!user) {
        
        return res.status(401).json({ error: 'Invalid username' });

      }
  
      // Compare the password
      //const isValidPassword = await bcrypt.compare(password, user.password);
      const isValidPassword = password === user.password;
  
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      // Set the user in the session if using session middleware
      req.session.user = user; // Assuming session middleware is properly configured
  
      // Return the user data in the response
      res.json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Login failed. Please try again.' });
    }
  });
  

export default router;