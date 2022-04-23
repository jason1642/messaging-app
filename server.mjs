import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import socketRouter from './Routes/socket/socketRouter.mjs';
import { runSocketServer } from './socketServer.mjs';
import connectDatabase from './database.mjs';
import { userRouter } from './Routes/users.mjs';
import  authRouter from './Routes/auth.mjs';
import config from 'config';
import roomRouter from './Routes/chats/room.mjs';
import messageRouter from './Routes/chats/message.mjs'
import chatRoomRouter from './Routes/chats/chat-room.mjs';

const app = express();
const port = process.env.PORT || 5050; 



// var whitelist = [`http://localhost:`, 'https://circle-chat1.herokuapp.com']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }





app.use(express.json());
app.use(cors());
app.use(socketRouter);
app.use('/api/user/', userRouter);
app.use('/user/auth', authRouter);
app.use('/api/room', roomRouter);
app.use('/api/message', messageRouter);
app.use('/api/chat_room', chatRoomRouter);

app.listen(port, console.log("listening on port " + port));

if (!config.get('PrivateKey')) {
  console.error('FATAL ERROR: PrivateKey is not defined.');
  process.exit(1);
}



// RUN SOCKET SERVER ./socketServr.mjs - has io instance
runSocketServer();
// Connect to mongodb database via mongoose
connectDatabase();





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