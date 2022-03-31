import React, { useState, useEffect, useLayoutEffect } from 'react';
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
  padding:5px;
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
const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: grey; */
  height: 100%;
  padding: 0 5px;
  text-align: left;
  color: black;
`
const TimeStamp = styled.div`
  font-size: 10px;
`;
const Username = styled.div`
  font-size: 12px;
`
const MessageDisplay = ({ socket, currentUser }: Iprops) => {
  
  const [allChat, setAllChat] = useState<AnyObject | undefined>();

  useLayoutEffect(() => {

    getMessages().then((e: any) => setAllChat(e))

  },[])

  useEffect(() => {
    socket.on('group chat', (arg: string) => {
      getMessages().then((e: any) => setAllChat(e))
 
    });
     
  }, [])
  // socket.on('group chat', arg => setChatMessage(arg))
  // ==================
  // When chat reaches over 100 messages, only display latest 100
  // ==================
  return (
    <Container>
      <MessageRow>Message Bot: This isss the start of your chat!</MessageRow>
     
      {allChat ?
        allChat.messages.slice(0, 100).map((data: MappedMessage, num: number) =>
          <MessageRow key={num}>
            <UserInfoContainer>
              
            <Username>{typeof data.sender == 'object' ? data.sender.username : 'anon'}: </Username>
            <TimeStamp>{format(new Date(1648597402617),  'hh:mma')}</TimeStamp>
            </UserInfoContainer>
              {/* <ReactToolTip delayShow={1000}>{format(new Date(1648597402617),  'hh:mma')}</ReactToolTip> */}
            
            {data.message}
          </MessageRow>)
        : <></>
      }
     
    </Container>
  )
}

export default MessageDisplay;
