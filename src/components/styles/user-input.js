import styled from 'styled-components';
 
export const Container = styled.form`
width: 100%;

  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 65px;
  max-height: 10%;
  min-height: 10%;
  padding: 8px 0;
  max-height: 10%;
  min-height: 10%;
  border-radius: 0 0 15px 15px;
  background-color: white;
  /* border: 1px solid black; */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.434), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  @media (max-width: 480px){
    width: 95%;

  }
  /* border: 1px solid black; */
`;  

export const TextInput = styled.input`
  width: 60%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-width: 0;
  border-radius: 10px;
  padding: 15px;
  padding-left: 8px;
  font-size: 1.4em;
  @media (max-width: 480px){
    width:60%;
    height: 80%;
    }
  &:focus-within{
    border-width: 0px;
  }
`
export const SubmitButton = styled.input`
  /* height: 100%; */
  padding: 15px 20px;
  margin: 0 10px;
  font-size: 1.6em;
  border-radius: 15px;
  border-width: 0;
  color: white;
  background-color: #4ccf4c;
  @media (max-width: 480px){
    padding: 1px 20px;
    height: 80%;
    font-size: 18px;
  }
  &:hover{
    cursor: pointer;
    color: black;
  }`
export const NewMessageNotification = styled.div`
  
  background-color: grey;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  padding: 5px 14px;
  opacity: 0;
  width: 15%;
  @media (max-width: 480px){
    width: 95%;
    display: none;
  }
`