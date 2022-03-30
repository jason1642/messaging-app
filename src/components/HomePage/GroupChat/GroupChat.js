import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import UserInput from './UserInput';
import MessageDisplay  from './MessageDisplay';

const Container = styled.div`
  display: flex;
  height:75vh;
  width: 70%;
  background-color: white;
  /* border: 1px solid black; */
  padding: 15px;
  flex-direction: column;

`;  
const Header = styled.div`
  height: 10%;
  width: 100%;
  background-color: grey;
` 
const Main = styled.div`
  display: flex;
  flex-direction: column;
  background-color: purple;
  height: 100%;
  
`;







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

  
  
  return (<Container>
    <Header>header </Header>
    <Main >
      {
        socket && <><MessageDisplay currentUser={currentUser} socket={socket} />
      
          <UserInput currentUser={currentUser} socket={socket} /></ >
      }
    </Main>
  </Container> );
}
 
export default GroupChat;