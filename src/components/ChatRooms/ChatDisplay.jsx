import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { format } from 'fecha';


const Container = styled.div`
  display: flex;
  /* justify-content: center; */
  position: relative;
  flex-direction: column;
  width: 60vw;
  height:80vh ;
  max-height: 90%;
  padding: 20px;
  padding-top: 0;
  background-color: brown;
  overflow-y: scroll;
  border-radius: 15px 15px 0 0 ;
`;

const MessageRow = styled.div`
  /* width: auto; */
  height: 20px;
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
  font-size: 8px;
`;
const Username = styled.div`
  font-size: 10px;
`
const Message = styled.div`
  font-size: 14px;
`




















const ChatDisplay = ({ room_id, roomData, socket }) => {


  return (<Container>
    
    {
      roomData.messages.map((data,i) => 
        <MessageRow key={i}>
          <UserInfoContainer>
          <Username>{typeof data.sender == 'object' ? data.sender.username : 'anon'}: </Username>
            <TimeStamp>{format(new Date(1648597402617), 'hh:mma')}</TimeStamp>
            
        </UserInfoContainer>
        <Message>{data.message}</Message>
        </MessageRow>
      )
    }
qweqw312312312312 chatroom not home page
  </Container>);  
}
 
export default ChatDisplay;