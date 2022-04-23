import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import {User} from '../Models/user.mjs'
import {validateUser} from '../Models/user.mjs'
import express from 'express';
const authRouter = express.Router(); 

// Use to login user, 
// path: /user/auth  - Possibly change to /auth/login
authRouter.post('/', async (req, res) => {
  // First use mongoose schema with Joi validator to see if username and
  // password are valid input, not valid matching password
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  };

  //  Now find the user by their username
  let user = await User.findOne({ username: req.body.username });

  if (!user) {
      return res.status(400).send('Incorrect username or password.');
  }

  // Then validate the Credentials in MongoDB match those provided in the request.
  // Will return false if password was not encrypted during creation despite matching.
  // Shall not accept matching unencrpyted password for security reasons.
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Incorrect email or password.');
    
  // If verified, return a jwt, and user id & username
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.send({ token, user: _.pick(user, ['_id', 'username']) });

});

authRouter.get('/verify', async(req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(403);
  
  jwt.verify(token, process.env.TOKEN_SECRET,
    async (err, user) => {
      err && res.status(403)
      try { return await User.findOne({ _id: user._id }).then(user=>res.send(user))} catch (err) {return res.status(404).send('user not found')}
      
    }  
  );
  
})


export default authRouter;