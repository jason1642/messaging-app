import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
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
    <div style={divStyles}>Generic Logo</div>

      <div>
        Welcome, {currentUser && currentUser.username}
      </div>
    <Nav>{
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