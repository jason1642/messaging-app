import express from 'express';
import {io} from '../../socketServer.mjs'

const socketRouter = express.Router();
const app = express();


socketRouter.post('/api/group/', async (req, res) => {
  console.log(req.body, 'this is from the socket router')
  // io.emit('group chat',req.body.message)

  res.end()
})

export default socketRouter;