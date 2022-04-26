import express from 'express';
import {io} from '../../server.mjs'

const socketRouter = express.Router();
const app = express();


socketRouter.post('/api/private-message/:room-id', async (req, res) => {
  console.log(req.body, 'this is from the socket router')
  // io.emit('group chat',req.body.message)
  io.on('connection', (socket) => { 
    
    // io.to(socketId).emit(/* ... */);
  })
  res.end()
})

export default socketRouter;


// Creating rooms and assigning socket ids to access them
// Socketio creates a room automatically when a user connects
// 




