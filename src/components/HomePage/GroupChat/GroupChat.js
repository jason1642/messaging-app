import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import UserInput from './UserInput';

const Container = styled.div`
  display: flex;
  height: 80vh;
  width: 70%;
  background-color: white;
  border: 1px solid black;
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
`;



const MessageDisplay = ({ socket }) => {
  const [chatMessage, setChatMessage] = useState();
  socket.on('group chat', arg => setChatMessage(arg))
  return (
    <div>
      THIS IS THE CURRENT CHAT
      {chatMessage}
    </div>
  )
}



const GroupChat = () => {

  const [socket, setSocket] = useState(null);
  const [currentVisibleChat, setCurrentVisibleChat] = useState([]);

  useEffect(() => {
    const newSocket = io(`${window.location.hostname}:5000/`, { transports: ["websocket"], upgrade: false });
    setSocket(newSocket);
    console.log(socket);
 
    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (socket !== null) {
      // socket.on('message', console.log('This message is from io'))
      socket.on('group chat', arg =>  setCurrentVisibleChat(prev => [...prev, arg]))
      socket.on("connect", () => {
        console.log('YOU HAVE BEEN RECONNECTED')
        console.log(socket)
      });
    }
    
  },[socket])
  console.log(socket)

  const sendMessage = (message) => {
    console.log(socket.id);
    if (socket) {
      socket.emit('sent message', message)
      console.log("IF SOCKET STATEMENT")
    }
    console.log(currentVisibleChat)
 
  }
  
  console.log(currentVisibleChat)
  return (<Container>
    <Header>header</Header>
    <Main>
      This is where messages will show up
     
      {/* {currentVisibleChat && currentVisibleChat.map(ele => ele)} */}
      {
        socket && <MessageDisplay socket={socket}/>
      }
      <UserInput sendMessage={sendMessage }/>

    </Main>
  </Container> );
}
 
export default GroupChat;