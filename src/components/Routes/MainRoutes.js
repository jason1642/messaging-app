import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRoutes, Navigate } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import Register from '../LoginSignup/Register';
import Login from '../LoginSignup/Login'
import Directory from '../ChatRooms/Directory';
import SubChatRoom from '../ChatRooms/SubChatRoom';
import GroupChat from '../HomePage/GroupChat/GroupChat';


// Create auth token to navigate user from log in and register pages if logged in already



const MainRoutes = ({handleLogin, currentUser}) => useRoutes([
  { path: '/', element: <GroupChat currentUser={currentUser} /> },
  { path: '/chat-room/directory', element: <Directory /> },
  { path: '/chat-room/:room_id', element: <SubChatRoom currentUser={currentUser}/>},
  { path: '/register', element: currentUser ? <Navigate to='/' replace /> : <Register /> },
  {path: '/login', element: currentUser ? <Navigate to='/' replace /> : <Login handleLogin={handleLogin} />}
])


 
export default MainRoutes;