import React, { useState, useEffect,useLayoutEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ChatDisplay from './ChatDisplay';
import UserInput from './UserInput'
import io from 'socket.io-client';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: grey;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = styled.div`
  
`;
const Title = styled.div`
  
`;




const getMessages = async (roomId) => {
  const roomData = await axios.get(`http://localhost:5050/api/room/find-one/${roomId}`)
  console.log(roomData.data)
  return roomData.data
}



const SubChatRoom = () => {
  const { room_id } = useParams();
  const [roomData, setRoomData] = useState();
  const [socket, setSocket] = useState();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = io(`${window.location.hostname}:8080/`,
      { transports: ["websocket"] });
    
    setSocket(newSocket);
    console.log(socket)
    newSocket && setIsConnected(true)

    return () => 
      newSocket.close();
  }, []);

  useEffect(() => {
    getMessages(room_id).then((e) => setRoomData(e))
    
  }, []);
  useEffect(() => {
    console.log(isConnected);

    
    if (socket) {

      socket.on("connect", () => {

        socket.emit('join chatroom', room_id)
        socket.on(room_id, (arg) => {
          getMessages(room_id).then((e) => setRoomData(e));
        })
 
 
      });
    }
   
    
  }, [socket]);























  // console.log(Object.keys(io.sockets.adapter.rooms[room_id].sockets))
  useEffect(() => {
    // socket && socket.on(room_id, (arg) => {
    //   console.log('LISTENING TO ROOM')
    //   getMessages(room_id).then((e) => setRoomData(e));
    // })
   
  

  }, [socket])




  return ( <Container>
    {
     (roomData && socket) &&  <Main>
        <Title>Welcome to chatroom: {roomData.name}/</Title>
        <ChatDisplay room_id={room_id} socket={socket} roomData={roomData} />
        <UserInput room_id={room_id } socket={socket }roomData={roomData}/>
      </Main>
    }
  </Container>);
}
 
export default SubChatRoom;
