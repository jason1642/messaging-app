import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
`;  
const Nav = styled.div`

`
const Button = styled(Link)`
  text-decoration: none;
  padding: 10px 20px;
  background-color: lightblue;
  margin: 0 10px;
  color: black;
  font-size: 18px;

`
const LogoutButton = styled.button`
text-decoration: none;
  padding: 10px 20px;
  background-color: lightblue;
  margin: 0 10px;
  color: black;
  font-size: 18px;
  &:hover{
    cursor: pointer;
  }
` 
const divStyles = {
  height: "100%",
  display: 'flex',
  justifyContent: "center",
  alignItems: 'center'
}
const Header = ({currentUser, handleLogout}) => {
  return (<Container>
    <Button to={'/'} style={divStyles}>Generic Logo</Button>

      <div>
        Welcome, {currentUser && currentUser.username}
      </div>
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