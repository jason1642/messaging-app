import Joi from 'joi';
import mongoose from 'mongoose';

const Message = mongoose.model('Message', new mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 450
  },
  updated_At: {
    type: Date
  },
  room_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  }
}));



// const validateUser = message => {
//   const schema = Joi.object({
//     username: Joi.string().min(5).max(50).required(),
//     message: Joi.string().min(1).max(450).required(),
//     userId: 
//   })
//   return schema.validate(user)
// };

export { Message };