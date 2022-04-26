# Generic Messaging App

This project was developed using the MERN stack

## Installation

```
npm install
npm run start
npm run front-end
```
                

### `Socket.IO`
This site uses socket.io for websockets. 
#### Client Side Usage
```jsx
 import io from 'socket.io-client';
 
 const GroupChat = (props) => {
  useEffect(() => {
    const [socket, setSocket] = useState(null);
    const url = window.location.hostname === 'localhost' ? 'http://localhost:5050' : 'https://circle-chat1.herokuapp.com'
    const newSocket = io(url, { transports: ["websocket"] });
    setSocket(newSocket);
    return (<></>) }
```

#### Server Side Connection
```js
import { Server } from "socket.io";
// Issue where NODE_ENV is set to production during development. When running locally, change the === to !==
const baseUrl = process.env.NODE_ENV === 'production' ? 'https://circle-chat1.herokuapp.com' : 'http://localhost:5050';

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
 
})
```


### `dotenv variables`
#### For database
```
MONGODB_USERNAME=
MONGODB_PASSWORD=
```



### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### References

##### Socket connection documentation
https://devcenter.heroku.com/articles/node-websockets
https://github.com/socketio/socket.io#readme

##### Authentication and Encrpytion
https://github.com/kelektiv/node.bcrypt.js#readme
https://github.com/auth0/node-jsonwebtoken#readme

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)


### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

Application Author: Jason Cruz
