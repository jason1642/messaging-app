import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  max-height: 100vh;
`;  

const Title = styled.h2`
  
`;
const Main = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-height: 100vh;
`;

const NameNest = styled(Link)`
  border: 1px solid black;
  max-width: 35%;
  padding: 15px 15px;
  text-decoration: none;

  &:hover{
    cursor: pointer;
    color: blue;
  }

`
const Directory = () => {

  const [allRooms, setAllRooms] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5050/api/room/all-names').then(val => {
      setAllRooms(val.data);
    },err=>alert('Could not find any rooms.'))
  },[])

  return (<Container>
    <Title>DIRECTORY</Title>
    <Main>
      {
        allRooms && allRooms.map((val, i) =>
          <NameNest
            key={i}
            value={val._id}
            to={`/chat-room/${val._id}`}>{val.name}
          </NameNest>)
    }
    </Main>
  </Container> );
}
 
export default Directory;