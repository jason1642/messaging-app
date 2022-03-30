import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRoutes, Navigate } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import Register from '../LoginSignup/Register';
import Login from '../LoginSignup/Login'


// Create auth token to navigate user from log in and register pages if logged in already



const MainRoutes = ({handleLogin, currentUser}) => useRoutes([
  { path: '/', element: <HomePage currentUser={currentUser} /> },
  { path: '/register', element: currentUser ? <Navigate to='/' replace /> : <Register /> },
  {path: '/login', element: currentUser ? <Navigate to='/' replace /> : <Login handleLogin={handleLogin} />}
])


 
export default MainRoutes;