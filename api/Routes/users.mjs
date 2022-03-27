import { User, validateUser } from '../Models/user.mjs';
import express from 'express';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import config from 'config';
import jwt from 'jsonwebtoken';
const userRouter = express.Router();

// path: '/user/create'
userRouter.post('/', async (req, res) => {
  // First Validate The Request
  console.log("attempting to create a user")
  const { error } = validateUser(req.body);
  if (error) {
      return res.status(400).send(error.details[0].message);
  }

  // Check if this user already exisits
  let user = await User.findOne({ username: req.body.username });
  if (user) {
      return res.status(400).send('That user already exisits!');
  } else {
      // Insert the new user if they do not exist yet
      user = new User(_.pick(req.body, ['username', 'password']));
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    
    await user.save();
    console.log("User created!")
    const token = jwt.sign({ _id: user._id }, config.get('PrivateKey'));
    console.log(token);
    res.header('x-auth-token', token);
    res.send(_.pick(user, ['_id', 'username']));
  }
});

export { userRouter };