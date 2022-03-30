import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  height: 50px;
  max-height: 10%;
  min-height: 10%;
  border-radius: 0 0 15px 15px;
  background-color: white;
  /* border: 1px solid black; */
`;  

const TextInput = styled.input`
  width: 40%;

`
const SubmitButton = styled.input`
  height: 100%;
  padding: 5px 20px;
  margin: 0 10px;
  font-size: 18px;
  
`
const NewMessageNotification = styled.div`
  
  background-color: grey;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  padding: 5px 14px;
  opacity: 0;
  width: 15%;

`
interface Socket { [key: string]: any };
interface CurrentUser { username: string, _id: string } 
interface Iprops {
  socket: Socket,
  currentUser: CurrentUser | undefined
}

const UserInput = ({ socket, currentUser}: Iprops ) => {
  const [userInput, setUserInput] = useState('');
 

  useEffect(() => {
    console.log(currentUser)
  },[currentUser])
  const handleChange = (e: any) => {
    setUserInput(e.target.value)
    console.log(e.target.value)
  }

  const sendMessage = (e: any) => {
    e.preventDefault();
    console.log(socket);
    if (socket && userInput.length > 0) {
      // currentUser ? {
      //   username: currentUser.username,
      //   _id: currentUser._id,
      //   timestamp: new Date(),
      //   groupId: 0000
      // }
      // send
      // {username, timeSent, ID, groupId if applicable}
      // if current user is undefined, send message as anon with ID == 0000, username then displays as green
      socket.emit('sent message',
        
      currentUser ? {
        sender: currentUser._id,
        username: currentUser.username,
        room_id: '62438ca875ff9eeaf28b987d',
        message: userInput
      } :
        {
          sender: '6242b82f3e8b1daacb71e428',
          username: 'anon',
          room_id: '62438ca875ff9eeaf28b987d',
          message: userInput
        }
      )
      
      setUserInput('');
    }
  }


  console.log("Rendering submission erase userinput")
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