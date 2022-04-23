// import Joi from 'joi';
import mongoose from 'mongoose';
import { memberSchema, messageSchema } from './message.mjs';


 
// IF THERE IS AN ISSUE WITH DUPLICATE INDEXES, USE db.collection.dropIndexes()

const Room = mongoose.model('Room', new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  socket_id: {type: String, required: true},
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true,
    maxlength: 24,
    minlength: 5,
    unique: true
  },
  category: {
    type: String,
    required: true,
    default: 'misc'
  },
  messages: {
    type: [messageSchema],
    required: false,
    default: []
  },
  members: {
    type: [memberSchema],
    required: false
  },
  created_at: {
    type: Date,
    default: new Date()
  },
  updated_At: {
    type: Date,
    default: new Date()
  }
}));



// const validateUser = user => {
//   const schema = Joi.object({
//     username: Joi.string().min(5).max(50).required(),
//     password: Joi.string().min(5).max(255).required()
//   })
//   return schema.validate(user)
// };

export { Room };