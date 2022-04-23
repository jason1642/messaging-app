import React, { useState } from 'react';
import styled from 'styled-components';
import { registerUser } from '../../Services/api-helper.ts';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  height: 90vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: #E1C5BA; */
  @media (max-width: 480px){
    justify-content: flex-start;
    padding-top: 40px;
  }
`;
const Title = styled.div`
  font-weight: 400;
  font-size: 1.8em;
  color: #faf8f9;
  @media (max-width: 480px){
    font-size: 40px;
  }
`;
const Form = styled.form`
  background-color: #96A4CE;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 25px;
  width: 70%;
  height: 70%;
  border-radius: 15px;
  @media (max-width: 480px){
    padding: 15px;
    width: 85%;
  }
`;

const UserInput = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 80%;
  border-width: 0;

  border-radius: 15px;
  &:focus-within{
    border-width: 0px;
  }
  @media (max-width: 480px){
    justify-content: flex-start;
    width: 95%;
    
  }
`;

const SubmitButton = styled.input`
  padding: 12px 20px;
  font-size: 18px;
  text-align: center;
  border: 1px solid black;
  border-radius: 15px;
  width: fit-content;
  border-width: 0;
  margin: 15px 0 ;
  color: darkslategrey;
  &:hover{
    cursor: pointer;
    background-color: #4C70B2;
    color: white;
  }
  @media (max-width: 480px){
    justify-content: flex-start;
    /* width: 95%; */
    padding: 12px 30px;
    font-size: 22px; 
  }
`;


const Main = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    username: '',
    password: ''
  });
  // const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setUserInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
    
  };
  
  return (<Container>
    
    <Form onSubmit={(e) => {
      e.preventDefault();
      registerUser(userInput,navigate);
    }}>
      <Title>Register Here!</Title>  
      <div>
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


      <SubmitButton type='submit' placeholder='Submit' />
      </div>
    </Form>

  </Container> );
}
 
export default Main;