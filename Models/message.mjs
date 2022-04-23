import Joi from 'joi';
import mongoose from 'mongoose';
import {User} from './user.mjs'
 
const senderSchema = new mongoose.Schema({
  user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: {
      type: String
    }
  
});  
     
const messageSchema = new mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId},
  sender: senderSchema,
  message: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 450
  },
  created_at: {
    type: Date,
    default: new Date()
  },
  updated_At: {
    type: Date,
    default: new Date()
  },
  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  }
})
 
const memberSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  user: senderSchema,
  username: String
})

export {
  messageSchema,
  memberSchema
};