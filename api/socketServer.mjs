import { createServer } from "http";
import { Server } from "socket.io";
import axios from 'axios';
const api = axios.create({
  baseUrl: 'http://localhost:5050'
})
const port = process.env.PORT || 8080;

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});





const runSocketServer = () => {
  httpServer.listen(port, console.log("Socket io on port" + port));


  // Home page public chat
  io.on('connect', (socket) => {
    console.log('a user connected3');
    //                                  Not socket.emit
    socket.on('sent message', async (arg) => {
      console.log(arg)
      await api.post(`http://localhost:5050/api/message/room/${arg.room_id}`, arg)
        .then((ele) => console.log(ele, 'Successfully sent'),
          err => console.log(err, 'There is an error in sockerServer.mjs'))
      console.log('message sent by ' + arg.username);
      io.emit('group chat', `New message sent at: ${ new Date()}` );
      
    })
    socket.on('disconnect', (socket) => {
      console.log('a user disconnected3')
    })


    


    socket.on('join chatroom', (room) => {
      socket.join(room)
      console.log(socket.rooms)

      socket.on(room, () => {
        console.log('message13')
      })
      socket.emit(room, 'NEW MESSAGE')
 
    })
  })
}

export { runSocketServer };
export { io };