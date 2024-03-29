import { createServer } from "http";
import 'dotenv/config';
import { Server } from "socket.io";
import express from 'express'
import axios from 'axios';
// import socketIO from 'socket.io'
const app = express()

// const baseUrl = process.env.NODE_ENV === 'production' ? 'https://circle-chat1.herokuapp.com' : 'http://localhost:5050';
const baseUrl =  'https://circle-chat1.herokuapp.com' 

// console.log(process.env.NODE_ENV)
const api = axios.create({
  baseURL: baseUrl 
})  
const port = 8080;
 
const httpServer = createServer(app);




const io = new Server(httpServer, {
  cors: {
    origin: baseUrl,
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});
// console.log(baseUrl, 'the base')
const runSocketServer = () => {
  httpServer.listen(port, console.log("Socket io on port" + port));

  // Home page public chat
  io.on('connection', (socket) => {
    // console.log('A user connected');
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
}

export { runSocketServer, io };