import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
const baseUrl = process.env.Node_ENV === 'production' ? 'https://circle-chat1.herokuapp.com' : 'http://localhost:5050';

const Container = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  height: 45px;
  padding: 5px 0;
  max-height: 10%; 
  min-height: 10%;
  border-radius: 0 0 15px 15px;
  background-color: white;
  /* border: 1px solid black; */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

`;  

const TextInput = styled.input`
  width: 60%;
  font-size: 16px;
  border-width: 0px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 15px;
  padding-left: 10px;
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
  &:hover{
    cursor: pointer;
  }
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
// interface Socket { [key: string]: any };
// interface CurrentUser { username: string, _id: string } 
// interface Iprops {
//   socket: Socket,
//   currentUser: CurrentUser | undefined,
//   roomData: Socket,
//   room_id: Socket
// }

const UserInput = ({ room_id, roomData, socket, currentUser} ) => {
  const [userInput, setUserInput] = useState('');
 

  useEffect(() => {
  },[currentUser])
  const handleChange = (e) => {
    setUserInput(e.target.value)
  }

  const sendMessage = (e) => {
    e.preventDefault();
  
    if (socket && userInput.length > 0) {

      // if current user is undefined, send message as anon username displays as green
      // ===========================================
      // Send message to specific socket id?
      // ===========================================

      axios.post(baseUrl + '/api/chat_room/message/' + room_id,
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
          },
          {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
          }
      )

      setUserInput('');
    }
  }
  return (<Container onSubmit={sendMessage}>

    {/* <NewMessageNotification >New Message!</NewMessageNotification> */}
    <TextInput
      type={'text'}    
      placeholder={"Send a message"}
      value={userInput}
      onChange={handleChange}
    />
    <SubmitButton
      type="submit"
      value={'Send'}
      />
  </Container> );
}
 
export default UserInput;