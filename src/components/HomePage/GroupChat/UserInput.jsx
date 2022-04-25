import React, { useState, useEffect } from 'react';
import {Container, TextInput, SubmitButton, NewMessageNotification, } from '../../styles/user-input.js'
// interface Socket { [key: string]: any }; 
// interface CurrentUser { username: string, _id: string } 
// interface Iprops {
//   socket: Socket,
//   currentUser: CurrentUser | undefined
// }

const UserInput = ({ socket, currentUser} ) => {
  const [userInput, setUserInput] = useState('');
 

  useEffect(() => {
  },[currentUser])
  const handleChange = (e) => {
    setUserInput(e.target.value)
  }

  const sendMessage = (e) => {
    
    e.preventDefault();
    if (socket && userInput.length > 0) {
      console.log(socket)
      socket.emit('sent message',
        
      currentUser ? {
        sender: currentUser._id,
        username: currentUser.username,
        room_id: '62453eb02fe83ee70acd0422',
        message: userInput
      } :
        {
          sender: '6242b82f3e8b1daacb71e428',
          username: 'anon',
          room_id: '62453eb02fe83ee70acd0422',
          message: userInput
        }
      )
      setUserInput('');
    }
  }


  return (<Container onSubmit={sendMessage}>

    <NewMessageNotification >New Message!</NewMessageNotification>
    <TextInput
      type={'text'}    
      placeholder={"Write a message"}
      value={userInput}
      onChange={handleChange}
    />
    <SubmitButton
      type="submit"
      placeholder='Send'
      
      />
  </Container> );
}
 
export default UserInput;