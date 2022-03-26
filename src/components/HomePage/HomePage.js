import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MessageDashboard from './MessageDashboard.js/MessageDashboard';
import GroupChat from './GroupChat/GroupChat';
const Container = styled.div`
  border: 1px solid black;
  background-color: lightblue;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;  


const HomePage = () => {
  return (<Container>
    This is the home page
    <GroupChat />
  </Container> );
}
 
export default HomePage;