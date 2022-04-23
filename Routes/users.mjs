import { User, validateUser } from '../Models/user.mjs';
import express from 'express';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import config from 'config';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
const userRouter = express.Router();


// ========================================
// ======== REGISTER/CREATE USER ==========
// ========================================
// path: '/api/user/create'
userRouter.post('/create', async (req, res) => {
  // First Validate The Request
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
    user = new User(_.assign(_.pick(req.body, ['username', 'password']),
      { _id: new mongoose.Types.ObjectId() }));
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    
    await user.save();
    console.log("User created!")
    const token = jwt.sign({ _id: user._id }, config.get('PrivateKey'));
    
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'username']));
  }
});


// Find one user
userRouter.get('/:id', async (req, res, next) => {
  if (!req.params.id) res.status(401).send('ID input is empty');
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    return res.status(400).send('User doesn\t exist');
  } else {
    res.send(_.pick(user, ['username', '_id']));
}

})

export { userRouter };