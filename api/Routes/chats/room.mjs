import express from 'express';
import { Room } from '../../Models/room.mjs';
import { User } from '../../Models/user.mjs';
import _ from 'lodash';
import mongoose from 'mongoose';
const roomRouter = express.Router();

  // See ../../Models/room for properties
  // Add verify middleware
roomRouter.post('/create', async (req, res, next) => {
  // req.body = userId, name, category, 
  if (!req.body.creator) res.status(401).send('Cannot create room');
  console.log('attempting to create a room');
  const user = await User.findOne({ _id: req.body.creator });
  console.log(user)
  const room = new Room(_.assign(_.pick(req.body, ['creator', 'name', 'socket_id']), {_id: new mongoose.Types.ObjectId()}));
  await room.save()
  res.status(200).send([room, 'room created']);
});



export default roomRouter;

// Find user -> verify name -> verify category -> maybe verify socket ID -> 