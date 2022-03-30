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

  io.on('connect', (socket) => {
    console.log('a user connected3');


    //                                  Not socket.emit
    socket.on('sent message', async(arg) => {
      await api.post(`http://localhost:5050/api/message/room/62438ca875ff9eeaf28b987d`, arg)
        .then((ele) => console.log(ele, 'Successfully sent'),
          err => console.log(err, 'There is an error in sockerServer.mjs'))
      console.log('message sent by ' + arg.username);
      io.emit('group chat', `New message sent at: ${ new Date()}` );
      
  })
    // socket.on('sent message', (arg) => console.log("MEssage to group emitting!"));

  });

  io.on('disconnect', (socket) => {
    console.log('a user disconnected3')
  })
}

export { runSocketServer };
export { io };