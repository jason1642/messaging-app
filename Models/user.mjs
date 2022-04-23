import Joi from 'joi';
import mongoose from 'mongoose';


const User = mongoose.model('User', new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  username: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  }
}));

const validateUser = user => {
  const schema = Joi.object({
    username: Joi.string().min(4).max(50).required(),
    password: Joi.string().min(5).max(255).required()
  })
  return schema.validate(user);
};

export { User, validateUser };
