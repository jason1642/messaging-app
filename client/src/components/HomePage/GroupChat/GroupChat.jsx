import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import UserInput from './UserInput';
import MessageDisplay  from './MessageDisplay';



const Main = styled.div`
  display: flex;
  height: 80vh;
  max-height: 80vh;
  width:80%;
  margin-top: 12px;
  border-radius: 15px;
  
  padding: 10px;
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 480px){
    width: 100%;
    height: 95vh;
  }

`;
const Header = styled.div`
    width: 85%;

    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.434), 0 6px 20px 0 rgba(0, 0, 0, 0.447);
  border-radius: 15px 15px 0  0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 300;
  color: #59a2f5;
  /* background-color: #59a2f5a3; */
  @media (max-width: 480px){
    width: 95%;

  }
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