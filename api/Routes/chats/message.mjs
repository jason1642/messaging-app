import express from 'express';
import { Room } from '../../Models/room.mjs';
import _ from 'lodash';
import mongoose from 'mongoose';
import { User } from '../../Models/user.mjs';
const messageRouter = express.Router();
// path: /api/message/
// req will receive message, username, roomId
// Will already have time created



// request paths should be /room/:room_id /user/user:id for private messaging
// send message to specific room
messageRouter.post('/room/:room_id', async (req, res, next) => {

  const user = await User.findOne({ _id: req.body.sender });
  const room = await Room.findOne({ _id: req.params.room_id });
  console.log(room)
 
  
 
  !room && res.status(404).send('CANNOT FIND ROOM');

  room.messages
    .push(_.assign(_.pick(req.body, ['message']),
      {
        _id: new mongoose.Types.ObjectId(),
        room_id: req.params.room_id,
        sender: {
          user_id: req.body.sender,
          username: user.username
        }
      }))
  await room.save();
  res.status(200).send(room)
  console.log(user.username)

});

// Get all messages from specific room
messageRouter.get('/room/:name', async (req, res, next) => {
  const room = await Room.findOne({ name: req.params.name })
  !room && res.status(404).send("NO ROOM FOUND");
  res.send(room)
})

export default messageRouter;