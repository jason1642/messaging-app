import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import socketRouter from './Routes/socket/socketRoutes.mjs';
import { runSocketServer } from './socketServer.mjs';
import connectDatabase from './database.mjs';
import { userRouter } from './Routes/users.mjs';
import  authRouter from './Routes/auth.mjs';
import config from 'config';

const app = express();


app.use(express.json());
app.use(cors());
app.use(socketRouter);
app.use('/api/user/create', userRouter);
app.use('/api/user/auth', authRouter);

app.listen(5050, console.log("listening on port 5050"));

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
  res.json({
    message: err.message,
    error: err
  });});