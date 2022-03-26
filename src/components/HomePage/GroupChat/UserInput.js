import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  
`;  

const TextInput = styled.input`


`
const SubmitButton = styled.input`
  padding: 10px 20px;

`
const UserInput = ({sendMessage}) => {
  const [userInput, setUserInput] = useState();

  const handleChange = (e) => {
    setUserInput(e.target.value)
    console.log(e.target.value)
  }
  return (<Container>
    

    <TextInput
      type={'text'}    
      placeholder={"Write a message"}
      value={userInput}
      onChange={handleChange}
    />
    <SubmitButton
      type="submit"
      placeholder='Send'
      onClick={() => sendMessage(userInput)}
      />
  </Container> );
}
 
export default UserInput;