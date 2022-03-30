import express from 'express';
import { Room } from '../../Models/room.mjs';
import { User } from '../../Models/user.mjs';
import _ from 'lodash';
import mongoose from 'mongoose';

const roomRouter = express.Router();
// path: /api/room

// ==========================================
// Verify socket path/id when the time comes
// ==========================================



  // See ../../Models/room for properties
  // Add verify middleware
  // Members in members array must be unique, and a check must happen here
  // Check if member exists in member array, if true then prompt to remove user from member array
roomRouter.post('/create', async (req, res, next) => {
  // req.body = userId, name, category, 
  const verifyUniqueName = await Room.findOne({ name: req.body.name })
  
  if (!req.body.creator) return res.status(401).json({ 'error': 'must be logged in to create a room' });
  
  if (verifyUniqueName) return res.status(403).send({ 'error': 'That room name is already taken' });
  
  console.log('attempting to create a room');
  const user = await User.findOne({ _id: req.body.creator });
  console.log(user, "just checking user")
  const room = new Room(_.assign(_.pick(req.body,
    ['creator', 'name', 'socket_id', 'category']),
    {
      _id: new mongoose.Types.ObjectId(),
      members: [{
      _id: new mongoose.Types.ObjectId(),
        user_id: '6242b82f3e8b1daacb71e428',
        username: user.username
      }] }));
  // Room.syncIndexes();
  await room.save()
  res.send([room, 'room created']);
});
    
     
roomRouter.get('/find-by-name/:name', async (req, res, next) => {
  if (!req.params.name) res.status(401).send('ID input is empty');
  const room = await Room.findOne({ name: req.params.name });
  if (!room) {
    return res.status(400).send('Room doesn\t exist');
  } else {
    
    return res.send(room);
}
})
  
roomRouter.get('/find-one/:id', async (req, res, next) => {
  if (!req.params.id) res.status(401).send('ID input is empty');
  const room = await Room.findOne({ _id: req.params.id });
  if (!room) {
    return res.status(400).send('Room doesn\t exist');
  } else {
    
    return res.send(room);
}
})



export default roomRouter;

// Find user -> verify name -> verify category -> maybe verify socket ID -> 