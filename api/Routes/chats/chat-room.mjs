import express from 'express';
import {io} from '../../socketServer.mjs'
import { User } from '../../Models/user.mjs';
import { Room } from '../../Models/room.mjs';
import mongoose from 'mongoose';
const chatRoomRouter = express.Router();

chatRoomRouter.post('/message/:room_id', async (req, res, next) => {

  const user = await User.findOne({ _id: req.body.sender });
  const room = await Room.findOne({ _id: req.params.room_id });
  // io.on('connection', (socket) => {
  //   socket.in(req.params.socket_id).emit('We have connection to the chatroom router!')
  // })
  if(!room) return res.status(404).send('CANNOT FIND ROOM');

 
  room.messages.push(
    {
      _id: new mongoose.Types.ObjectId(),
      room_id: req.params.room_id,
      sender: {
        user_id: req.body.sender,
        username: user.username
      },
      message: req.body.message
    })
  
  
  
  
  await room.save().then(() => {
    io.emit(room._id, 'new Message sent to mongodb')
  });
  console.log(req.body.message)
    return res.status(200).send('success')
    // console.log(user.username)


  
})



chatRoomRouter.post('/join/room/:room_id', (req, res, next) => {
  io.on('connection', (socket) => {
    socket.on('join', (room) => {
      socket.join(room);
    })
    console.log('connect to room ', socket)
  })
  return res.send('joining room')
})
export default chatRoomRouter;