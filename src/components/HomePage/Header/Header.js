import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  max-width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: lightsteelblue;
  /* background-color: #25232370; */

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  @media (max-width: 480px){

  }
`;  
const Nav = styled.div`
  height: 100%;
  width: 40%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  @media (max-width: 480px){
    width: 60%;
  }
 
`
const Button = styled(Link)`
  text-decoration: none;

  color: white;
  font-size: 18px;
  height: 100%;
  width: 40%;
  display:flex;
  justify-content: center;
  align-items: center;
  &:hover{
    color: black;
  }
  @media (max-width: 480px) {
    font-size: 14px;
  }
`
const Welcome = styled.div`
  @media (max-width: 480px){
    display: none;
  }
`;
const LogoutButton = styled.button`
text-decoration: none;
  padding: 10px 20px;
  /* background-color: lightblue; */
  /* margin: 0 10px; */
  color: black;
  font-size: 18px;
  &:hover{
    cursor: pointer;
  }
` 

const Header = ({currentUser, handleLogout}) => {
  return (<Container>
    <Button style={{width: "20%"}} to={'/'} >Home</Button>

      <Welcome>
        Welcome, {currentUser ? currentUser.username : 'anon'}
      </Welcome>
    <Nav>
      <Button to='/chat-room/directory'>Chat Rooms</Button>
      {
      currentUser ?
        <LogoutButton  onClick={handleLogout}>Log Out</LogoutButton>
        :
      <><Button to='login'>Log in</Button>
      <Button to='register'>Sign Up</Button></>
    }
    </Nav>
  </Container> );
}
 
export default Header;