import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.form`
    width: 85%;

  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 65px;
  max-height: 10%;
  min-height: 10%;
  padding: 8px 0;
  max-height: 10%;
  min-height: 10%;
  border-radius: 0 0 15px 15px;
  background-color: white;
  /* border: 1px solid black; */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.434), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  @media (max-width: 480px){
    width: 95%;

  }
  /* border: 1px solid black; */
`;  

const TextInput = styled.input`
  width: 60%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-width: 0;
  border-radius: 10px;
  padding-left: 8px;
  font-size: 16px;
  @media (max-width: 480px){
    width:60%;
    height: 80%;
    }
  &:focus-within{
    border-width: 0px;
  }
`
const SubmitButton = styled.input`
  height: 100%;
  padding: 5px 20px;
  margin: 0 10px;
  font-size: 18px;
  border-radius: 15px;
  border-width: 0;
  color: white;
  background-color: #4ccf4c;
  @media (max-width: 480px){
    padding: 1px 20px;
    height: 80%;
    font-size: 18px;
  }
  &:hover{
    cursor: pointer;
    color: black;
  }`
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
  @media (max-width: 480px){
    width: 95%;
    display: none;
  }
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
  },[currentUser])
  const handleChange = (e: any) => {
    setUserInput(e.target.value)
  }

  const sendMessage = (e: any) => {
    e.preventDefault();
    if (socket && userInput.length > 0) {
     
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