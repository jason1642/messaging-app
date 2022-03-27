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
const UserInput = ({socket}) => {
  const [userInput, setUserInput] = useState('');

  const handleChange = (e) => {
    setUserInput(e.target.value)
    console.log(e.target.value)
  }

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(socket);
    if (socket) {
      socket.emit('sent message', userInput);
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