import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import UserInput from './UserInput';
import MessageDisplay  from './MessageDisplay';



const Main = styled.div`
  display: flex;
  max-height: 80vh;
  width:80%;
  margin-top: 12px;
  border-radius: 15px;
  /* height: 100vh; */
  padding: 10px;
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
  flex-direction: column;
  justify-content: center;
  align-items: center;


`;
const Header = styled.div`
    width: 85%;

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 15px 15px 0  0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 300;
  color: #59a2f5;
  /* background-color: #59a2f5a3; */
` 
const GroupChat = ({ currentUser }) => {
  const [socket, setSocket] = useState(null);


  useEffect(() => {
    const newSocket = io(`${window.location.hostname}:8080/`,
      { transports: ["websocket"] });
    setSocket(newSocket);
 
    return () => 
      newSocket.close();
    
  }, []);





  useEffect(() => {
    console.log(socket);
    if (socket !== null) {
      // socket.on('message', console.log('This message is from io'))
      socket.on("connect", () => {
        console.log('YOU HAVE BEEN RECONNECTED')
        console.log(socket)
      });
    }
    
  }, [socket]);

  
  
  return (
    
    <Main>
      {
        socket && <>
          <Header>Public Chat</Header>

          <MessageDisplay currentUser={currentUser} socket={socket} />
      
          <UserInput currentUser={currentUser} socket={socket} />
        </ >
      }
    </Main>
  );
}
 
export default GroupChat;