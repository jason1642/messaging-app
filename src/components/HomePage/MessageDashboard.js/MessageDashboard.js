import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GroupChat from '../GroupChat/GroupChat';

const Container = styled.div`
  height: 80vh;
  width: 70%;
  border: 1px solid black;
  background-color: wheat;

`;  

const MessageDashboard = () => {
  return (<Container>
    This is the dashboard
    <GroupChat />
  </Container> );
}
 
export default MessageDashboard;