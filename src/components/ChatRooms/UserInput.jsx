import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Container, TextInput, SubmitButton,} from '../styles/user-input'

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://circle-chat1.herokuapp.com' : 'http://localhost:5050';


// const NewMessageNotification = styled.div`
  
//   background-color: grey;
//   align-self: center;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 50px;
//   padding: 5px 14px;
//   opacity: 0;
//   width: 15%;

// `
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
    // console.log(socket)
  },[currentUser])
  const handleChange = (e) => {
    setUserInput(e.target.value)
  }

  const sendMessage = async (e) => {
    e.preventDefault();
        // console.log(socket)

    if (socket && userInput.length > 0) {

      // if current user is undefined, send message as anon username displays as green
      // ===========================================
      // Send message to specific socket id?
      // ===========================================
      await axios.post(baseUrl + '/api/chat_room/message/' + room_id,
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