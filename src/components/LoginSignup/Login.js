import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const navigate = useNavigate;

const Container = styled.div`
  /* border: 1px solid black; */
  height: 90vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #E1C5BA;
  align-items: center;
`;  
const Title = styled.div`
   font-weight: 400;
  font-size: 1.8em;
  color: #faf8f9;
`;

const Form = styled.form`
  /* border: 1px solid black; */
  background-color: #96A4CE;
  display: flex;
  border-radius: 15px;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  padding: 25px;
  width: 70%;
  height: 70%;

`
const UserInput = styled.input`
   margin: 10px 0;
  padding: 10px;
  width: 80%;
  border-width: 0;

  border-radius: 15px;
  &:focus-within{
    border-width: 0px;
  }
`

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
`;

const Login = ({handleLogin}) => {
  const [userInput, setUserInput] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e) => {
    setUserInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
    
  };
  return (<Container>
    
    <Form
      onSubmit={async e => {
        e.preventDefault();
        await handleLogin(userInput, navigate).then(
          (res) => {
            console.log('Log in successful!', res);

          },
          err => alert("Cannot log in, please try again.")
        )

      }}>
      <Title>Log In</Title>
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
      <SubmitButton type='submit' placeholder='Submit'/>
      </div>
    </Form>



  </Container> );
}
 
export default Login;