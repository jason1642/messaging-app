import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';

import styled from 'styled-components';
import axios from 'axios';
import { format} from 'fecha';
const baseUrl = process.env.NODE_ENV === 'production' ? 'https://circle-chat1.herokuapp.com' : 'http://localhost:5050';
console.log(process.env.NODE_ENV)
// console.log(process.env['NODE' + '_ENV'])
console.log(process.env)
const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 85%;
  height:100% ;
  max-height: 90%;
  align-items: center;
  overflow-y: scroll;
  justify-content: flex-start;
  box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 0px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 0px;
  @media (max-width: 480px) {
    background-color:#a5c0f7;
    width: 95%;
  }
`;

const MessageRow = styled.div`
  width: 90%;
  /* min-height: 20px; */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-align: left;
  height: auto;
  /* overflow: hidden; */
  display: flex;
  font-size: 18px;
  padding:10px 10px 10px 8px;
  margin: 5px 0;
  border-radius: 15px 15px 15px 5px;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 300;
  background-color: #1982FC;
  opacity: .85;
  align-items: center;
  justify-content: flex-start;



`
// interface AnyObject { [key: string]: any };
// interface CurrentUser { username: string, _id: string}
// interface Iprops {
//   socket: AnyObject,
//   currentUser: CurrentUser
// }
// interface MappedMessage {
//   message: string;
//   sender: any;
//   room_id: string;
//   created_at: Date;
// }
const getMessages = async () => {
  
  const roomData = await axios.get(baseUrl + '/api/room/find-one/62453eb02fe83ee70acd0422' )
  console.log(roomData.data)
  console.log(baseUrl)
  return roomData.data
}
const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 5px;
  text-align: left;
  align-self: flex-start;
  /* background-color: grey; */
  color: black;
`
const TimeStamp = styled.div`
  font-size: 10px;
`;
const Username = styled.div`
  font-size: 12px;
`
const MessageDisplay = ({ socket, currentUser }) => {

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  


  const [allChat, setAllChat] = useState();

  useLayoutEffect(() => {

    getMessages().then((e) => {
      console.log(e)
      setAllChat(e)
    })
    
 
  },[])

  useEffect(() => {
    socket.on('62453eb02fe83ee70acd0422', (arg) => {
      getMessages().then((e) => setAllChat(e))
 
    });
    
  }, [])
  
  useEffect(() => {
    scrollToBottom()
  }, [allChat]);
  // socket.on('group chat', arg => setChatMessage(arg))
  // ==================
  // When chat reaches over 100 messages, only display latest 100
  // ==================
  return (
    <Container>
      <MessageRow>Message Bot: This is the start of the chat!</MessageRow>
     
      {allChat ?
        allChat.messages.slice(0, 100).map((data, num) =>
          <MessageRow key={num}>
            <UserInfoContainer>
              
            <Username>{typeof data.sender == 'object' ? data.sender.username : 'anon'}: </Username>
            <TimeStamp>{format(new Date(data.created_at),  'hh:mma')}</TimeStamp>
            </UserInfoContainer>
              {/* <ReactToolTip delayShow={1000}>{format(new Date(1648597402617),  'hh:mma')}</ReactToolTip> */}
            
            {data.message}
          </MessageRow>)
        : <></>
      }
      <div ref={messagesEndRef}>Latest message</div>
     
    </Container>
  )
}

export default MessageDisplay;
