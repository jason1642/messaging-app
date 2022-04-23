import React from 'react';
import styled from 'styled-components';
import GroupChat from './GroupChat/GroupChat';
const Container = styled.div`
  /* border: 1px solid black; */
  background-color: #E1C5BA;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;  


const HomePage = ({ currentUser }) => {
  
  


  return (<Container>
    <GroupChat currentUser={currentUser} />
    
  </Container> );
}
 
export default HomePage;