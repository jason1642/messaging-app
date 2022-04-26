import 'dotenv/config';
import express from 'express';
import cors from 'cors';
// import socketRouter from './Routes/socket/socketRouter.mjs';
import { runSocketServer } from './socketServer.mjs';
import connectDatabase from './database.mjs';
import { userRouter } from './Routes/users.mjs';
import authRouter from './Routes/auth.mjs';
import config from 'config';
import roomRouter from './Routes/chats/room.mjs';
import messageRouter from './Routes/chats/message.mjs'
import chatRoomRouter from './Routes/chats/chat-room.mjs';
import http from 'http'
 import axios from 'axios';
import { Server } from "socket.io";

const app = express(); 
const port = process.env.PORT || 5050; 
const server = http.createServer(app)

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://circle-chat1.herokuapp.com' : 'http://localhost:5050';
console.log(process.env.NODE_ENV)
console.log(baseUrl)
const api = axios.create({
  baseURL: baseUrl 
})  


export const io = new Server(server, {
  cors: {
    origin: baseUrl,
    methods: ["GET", "POST"],
    // allowedHeaders: ["my-custom-header"],
    credentials: true
  }
})
server.listen(port, console.log("listening on port " + port));
io.on('connect', (socket) => {
  console.log('A user connected');
  // Public chat only, room chats emit via chat-room router
  socket.on('sent message', async (arg) => {
    await api.post(`/api/chat_room/message/${arg.room_id}`, arg);
  
    
  })
  socket.on('disconnect', (socket) => {
    console.log('A user has disconnected')
  })

  // Simple join chat room via route room_id parameter, see room-chat router
  socket.on('join chatroom', (room) => {
    socket.join(room)
  })
})

if (process.env.NODE_ENV === "production") {
  app.use(express.static("./build"));
}
app.use(express.json());
app.use(cors());
// app.use(socketRouter); 
app.use('/api/user/', userRouter);
app.use('/user/auth', authRouter);
app.use('/api/room', roomRouter);
app.use('/api/message', messageRouter);
app.use('/api/chat_room', chatRoomRouter);



// Connect to mongodb database via mongoose
connectDatabase();





if (!config.get('PrivateKey')) {
  console.error('FATAL ERROR: PrivateKey is not defined.');
  process.exit(1);
}



// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log(err)
  res.status(err.status || 500);
  return res.json({
    message: err.message,
    error: err
  });});