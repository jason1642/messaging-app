import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
const baseUrl = 'https://circle-chat1.herokuapp.com'

const Container = styled.div`
  /* height: auto; */
  width: 100%;
  /* max-height: 100vh; */
  padding: 0px 0 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* flex-wrap: wrap; */
  /* background-color: #847e94e6; */

  @media (min-width:1000px){
    
  }
`;  

const Title = styled.h2`
  font-size: 2.9em;
  /* width: 100%; */
  font-weight: 400;

`;
const Main = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  max-width: 1580px;
  @media (max-width: 480px){
    width: 100%;
    justify-content: space-evenly;
    align-items: flex-start;
    flex-direction: row;
    max-height: none;
  }

  /* @media (min-width:1000px){
    padding: 40px;
    height: 100vh;
    flex-direction: row;
    align-items: flex-start;
  } */
`;

const NameNest = styled(Link)`
  /* border: 1px solid black; */
  width: 140px;
  /* margin: 15px; */
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  padding: 15px 15px;
  margin: 20px;
  font-size: 20px;
  font-weight: 300;
  background-color: white;
  text-decoration: none;
  color: black;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  @media (max-width: 480px){
   width : 30%;
   padding: 10px;
   margin: 5px;
   
  }
  @media (min-width:1000px){
    padding: 40px;
    font-size: 40px;
    margin: 10px;
    /* height: 100%; */
    /* width: 100%; */
  }
  &:visited {
    color: black;
  }
  &:hover{
    cursor: pointer;
    color: blue;
  }

`

const NoRoomsError = styled.div`
  display: flex;
  justify-self: center;
  align-self: center;
  margin-bottom: 130px;
  font-size: 40px;
  font-weight: 300;

`;
const Directory = () => {

  const [allRooms, setAllRooms] = useState([])

  useEffect(() => {
    axios.get(`${baseUrl}/api/room/all-names`).then(val => {
      setAllRooms(val.data);
      console.log(val)
    },err=>setAllRooms(undefined))
  },[])

  return (<Container>
    <Title>Chat Room Directory</Title>
    <Main>
      {
        allRooms ? allRooms.map((val, i) =>
          <NameNest
            key={i}
            value={val._id}
            to={`/chat-room/${val._id}`}>{val.name}
          </NameNest>)
          : 
          <NoRoomsError>No available chat rooms</NoRoomsError>
    }
    </Main>
  </Container> );
}
 
export default Directory;