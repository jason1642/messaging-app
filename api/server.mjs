import express from 'express';
import cors from 'cors';
import { createServer } from "http";
import { Server } from "socket.io";


const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});
httpServer.listen(port);
app.set('socket.io', io)
app.listen(5050, console.log("listening on port 5050"))
// io.use(cors());
io.on('connect', (socket) => {
  console.log('a user connected3');
  socket.on('sent message', (arg) => socket.emit('group chat', arg));
  // socket.send("this is a messag from socket")



  socket.emit('group chat', 'THIS IS FROM EXPRESS');
});

app.post('/api/group/', async (req, res) => {
  console.log(req.body)
  app.get('socket.io').emit('group chat',req.body.message)

  res.end()
})


















// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log(err)
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });});