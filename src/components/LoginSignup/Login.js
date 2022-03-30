import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const navigate = useNavigate;

const Container = styled.div`
  /* border: 1px solid black; */
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-direction:column;
  justify-content: center;
  background-color: grey;
  align-items: center;
`;  
const Title = styled.div`
  font-size: 36px;
  /* margin: 20px 0; */
`;

const Form = styled.form`
  /* border: 1px solid black; */
  background-color: wheat;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  padding: 25px;
  width: 70%;
  height: 70%;

`
const UserInput = styled.input`
  border: 1px solid black;
  margin: 10px 0;
  padding: 10px;
  width: 80%;
`

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