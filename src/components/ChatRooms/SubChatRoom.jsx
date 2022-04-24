import React, { useState, useEffect} from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ChatDisplay from './ChatDisplay';
import UserInput from './UserInput'
import io from 'socket.io-client';
const baseUrl = process.env.NODE_ENV === 'production' ? 'https://circle-chat1.herokuapp.com' : 'http://localhost:5050';

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: grey;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  @media (max-width: 480px ){
    width: 100%;
    height: 95vh;
  }
`;

const Main = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 15px;
  margin-top: 15px;
  height: 75%;
  max-height: 80vh;
  @media (max-width: 480px ){
    width: 90%;
  }
  /* border: 1px solid black; */
  /* background-color: black; */
`;
const Title = styled.div`
  background-color:white;
  border-radius: 15px 15px 0  0 ;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 3px 0;
  font-weight: 300;
  font-size: 18px;
`;




const getMessages = async (roomId) => {
  const roomData = await axios.get(`${baseUrl}/api/room/find-one/${roomId}`)
  return roomData.data
}



const SubChatRoom = ({currentUser}) => {
  const { room_id } = useParams();
  const [roomData, setRoomData] = useState();
  const [socket, setSocket] = useState();
  const [isConnected, setIsConnected] = useState(false);





  useEffect(() => {
    const newSocket = io(`${window.location.hostname}:8080/`,
      { transports: ["websocket"] });
    
    setSocket(newSocket);
    newSocket && setIsConnected(true)
    console.log(isConnected)
    return () => 
      newSocket.close();
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getMessages(room_id).then((e) => setRoomData(e))
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {

    if (socket) {

      socket.on("connect", () => {
        socket.emit('join chatroom', room_id)
        socket.on(room_id, (arg) => {
          getMessages(room_id).then((e) => setRoomData(e));
        })
 
 
      });
    }
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return ( <Container>
    {
     (roomData && socket) &&  <Main>
        <Title>Welcome to chatroom: {roomData.name}</Title>
        <ChatDisplay room_id={room_id} socket={socket} roomData={roomData} />
        <UserInput currentUser={currentUser} room_id={room_id } socket={socket }roomData={roomData}/>
      </Main>
    }
  </Container>);
}
 
export default SubChatRoom;
