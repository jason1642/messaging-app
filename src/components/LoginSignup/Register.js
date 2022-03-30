import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { registerUser } from '../../Services/api-helper.ts';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;
const Title = styled.h2`

`;
const Form = styled.form`
  background-color: grey;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 70%;

`;

const UserInput = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 80%;
`;

const SubmitButton = styled.input`
  padding: 12px 20px;
  font-size: 18px;
  text-align: center;
  border: 1px solid black;
  border-radius: 15px;
  width: fit-content;
  color: darkslategrey;
  &:hover{
    cursor: pointer;
    background-color: grey;
    color: black;
  }
`;


const Main = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    username: '',
    password: ''
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setUserInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
    
  };
  
  return (<Container>
    <Title>Register Here!</Title>  
    <Form onSubmit={(e) => {
      e.preventDefault();
      registerUser(userInput,navigate);
    }}>
     
      <UserInput
        name='username'
        value={userInput.username}
        type='text'
        onChange={handleChange}
        placeholder='Username' />
      
      <UserInput
        name='password'
        value={userInput.password}
        type='password'
        onChange={handleChange}
        placeholder='Password' />


      <SubmitButton type='submit' placeholder='Submit'/>
    </Form>
  </Container> );
}
 
export default Main;