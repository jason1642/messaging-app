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
  background-color: red;
  margin: 0 10px;
  font-size: 18px;

`
const divStyles = {
  height: "100%",
  display: 'flex',
  justifyContent: "center",
  alignItems: 'center'
}
const Header = () => {
  return (<Container>
    <div style={divStyles}>Generic Logo</div>
    <Nav>
      <Button to='register'>Sign Up</Button>
    </Nav>
  </Container> );
}
 
export default Header;