import express from 'express';
import { Room } from '../../Models/room.mjs';
import _ from 'lodash';
import mongoose from 'mongoose';
const messageRouter = express.Router();
// path: /api/message/:roomid
// req will receive message, username, roomId
// Will already have time created
messageRouter.post('/:room_id', async (req, res, next) => {

  console.log(req.params.room_id);
  const room = await Room.findOne({ _id: req.params.room_id });
  !room && res.sendStatus(404).send('CANNOT FIND ROOM');
  room.messages.push(_.assign(_.pick(req.body, ['user', 'message', 'room_id']), { _id: new mongoose.Types.ObjectId() }))
  await room.save();
  res.send(room)

})

export default messageRouter;