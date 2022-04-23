// socket.on('sent message') -> io emit group chat 

// Front end collects username, message, timestamp, _id

// this middleware will send message to corresponding group chat in mongodb
// front end will have to post to / socket / group /: IdleDeadline

// requests group messages( last 50) send them back via socket emit



const addMessageToMainPublicGroup = (req: any, res: any, next: Function) => {
  

}

export { addMessageToMainPublicGroup };