import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  /* justify-content: center; */
  position: relative;
  flex-direction: column;
  width: 100%;
  height:90% ;
  max-height: 90%;
  /* padding: 10px; */
  background-color: grey;
  overflow-y: scroll;
  border-radius: 15px 15px 0 0 ;
`;

const MessageRow = styled.div`
  /* width: auto; */
  height: 30px;
  border: 1px solid black;
  display: flex;
  font-size: 20px;
  padding:10px;
  margin: 5px 0;
  border-radius: 15px;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 300;
  background-color: #1982FC;
  opacity: .85;
`

const MessageDisplay = ({ socket}) => {
  const [allChat, setAllChat] = useState([]);

  useEffect(() => {
    console.log("CHAT ARRAY HAS BEEN ALTERED")
    console.log(allChat)
  },[allChat])
  
  useEffect(() => {
    console.log("FIRST MESSAGE DISPLAY RENDER")
    socket.on('group chat', arg => setAllChat(prev => [...prev, arg]));
  }, [])
  // socket.on('group chat', arg => setChatMessage(arg))
  return (
    <Container>
      <MessageRow>Message Bot: This is the start of your chat!</MessageRow>
      {/* {console.log("RENDER")} */}
      {allChat.map(text => <MessageRow>anon: {text}</MessageRow>)}
    
    </Container>
  )
}

export default MessageDisplay;