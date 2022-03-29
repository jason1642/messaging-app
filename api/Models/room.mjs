import Joi from 'joi';
import mongoose from 'mongoose';

const Room = mongoose.model('Room', new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  socket_id: {type: String, required: true, unique: true},
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    unique: true,
    required: true,
    maxlength: 24,
    minlength: 5
  },
  category: {
    type: String,
    required: true,
    default: 'misc'
  },
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
    default: [],
    unique: true
  }],
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
    default: []
  }]
}));



// const validateUser = user => {
//   const schema = Joi.object({
//     username: Joi.string().min(5).max(50).required(),
//     password: Joi.string().min(5).max(255).required()
//   })
//   return schema.validate(user)
// };

export { Room };