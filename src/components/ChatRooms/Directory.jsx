import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
const baseUrl = process.env.Node_ENV === 'production' ? 'https://circle-chat1.herokuapp.com' : 'http://localhost:5050';

const Container = styled.div`
  height: 100vh;
  width: 100%;
  max-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #847e94e6;
`;  

const Title = styled.h2`
  font-size: 1.5em;
  /* width: 100%; */
  font-weight: 300;

`;
const Main = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  max-height: 100vh;
  justify-content: space-around;
  align-items: space-evenly;
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
  font-size: 20px;
  font-weight: 300;
  background-color: white;
  text-decoration: none;
  color: black;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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