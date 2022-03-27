import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import {User} from '../Models/user.mjs'
import {validateUser} from '../Models/user.mjs'
import express from 'express';


const authRouter = express.Router(); 


authRouter.post('/', async (req, res) => {

  // Uses mongoose schema with the Joi validator to see if username and
  // password are valid 
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  };


  //  Now find the user by their username
  let user = await User.findOne({ username: req.body.username });
  if (!user) {
      return res.status(400).send('Incorrect username or password.');
  }

   // Then validate the Credentials in MongoDB match
   // those provided in the request
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
        return res.status(400).send('Incorrect email or password.');
    }

    
    const token = jwt.sign({ _id: user._id }, 'PrivateKey');
    res.send(token);



});

export default authRouter;