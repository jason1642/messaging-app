import React, { useState } from 'react';
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
  /* background-color: #E1C5BA; */
  align-items: center;
  @media (max-width: 480px){
    justify-content: flex-start;
    padding-top: 40px;
  }
`;  
const Title = styled.div`
   font-weight: 400;
  font-size: 4.5em;
  color: #faf8f9;
  @media (max-width: 480px){
    font-size: 40px;
  }
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
  height: 50%;
  @media (max-width: 480px){
    padding: 15px;
    width: 85%;
  }

`
const UserInput = styled.input`
   margin: 10px 0;
  padding: 20px;
  width: 80%;
  border-width: 0;
  font-size: 1.4em;
  border-radius: 15px;
  &:focus-within{
    border-width: 0px;
  }
  @media (max-width: 480px){
    justify-content: flex-start;
    width: 95%;
    
  }
`

const SubmitButton = styled.input`
  padding: 13px 20px;
  font-size: 1.6em;

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