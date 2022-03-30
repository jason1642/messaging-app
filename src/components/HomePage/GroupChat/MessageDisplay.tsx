import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ReactToolTip from 'react-tooltip';
import { format, parse } from 'fecha';

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
interface AnyObject { [key: string]: any };
interface CurrentUser { username: string, _id: string}
interface Iprops {
  socket: AnyObject,
  currentUser: CurrentUser
}
interface MappedMessage {
  message: string;
  sender: any;
  room_id: string;
  created_at: Date;
}
const getMessages = async () => {
  const roomData = await axios.get('http://localhost:5050/api/room/find-by-name/public-room')
  console.log(roomData.data)
  return roomData.data
}

const MessageDisplay = ({ socket, currentUser }: Iprops) => {
  
  // If adding timestamps, allchat will be array of objects instead of strings
  const [allChat, setAllChat] = useState<AnyObject | undefined>();
  const [newMessage, setNewMessage] = useState<number>(0);

  useEffect(() => {
    // console.log(allChat)
    getMessages().then((e: any) => setAllChat(e))
    // console.log("fetching new messages")
  },[])


  // Unknown bug - console.log(allchat) always returns empty array within 
  // socket function before and after adding message
  useEffect(() => {
    // Change arg: string to arg: {username: string, _id: string, timestamp: date}
    socket.on('group chat', (arg: string) => {
      getMessages().then((e: any) => setAllChat(e))
      console.log(allChat)
    });
     

  }, [])
  // socket.on('group chat', arg => setChatMessage(arg))
  return (
    <Container>
      <MessageRow>Message Bot: This is the start of your chat!</MessageRow>
      {console.log(allChat)}
      {allChat ?
        allChat.messages.map((data: MappedMessage, num: number) =>
          <MessageRow data-tip={'time-stamp'} key={num}>
            <ReactToolTip>{format(new Date(1648597402617),  'dddd MMMM Do, hh:mma')}</ReactToolTip>
            {typeof data.sender == 'object' ? data.sender.username : 'anon'}: 
            {data.message}
          </MessageRow>)
        : <></>
      }
     
    </Container>
  )
}

export default MessageDisplay;
