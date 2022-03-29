import { createServer } from "http";
import { Server } from "socket.io";
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
    socket.on('sent message', (arg) => io.emit('group chat', arg));
    // socket.on('sent message', (arg) => console.log("MEssage to group emitting!"));

  });
}

export { runSocketServer };
export { io };