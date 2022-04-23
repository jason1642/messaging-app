import { createServer } from "http";
import { Server } from "socket.io";
import axios from 'axios';
const baseUrl = process.env.NODE_ENV === 'production' ? 'https://circle-chat1.herokuapp.com' : 'http://localhost:5050';

const api = axios.create({
  baseUrl: baseUrl
})
const port = process.env.PORT || 8080;

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: baseUrl,
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

const runSocketServer = () => {
  httpServer.listen(port, console.log("Socket io on port" + port));

  // Home page public chat
  io.on('connect', (socket) => {
    // console.log('A user connected');
    // Public chat only, room chats emit via chat-room router
    socket.on('sent message', async (arg) => {
      await api.post(`${baseUrl}/api/chat_room/message/${arg.room_id}`, arg);
    
      
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