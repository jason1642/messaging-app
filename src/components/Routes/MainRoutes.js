import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRoutes, Navigate } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import Register from '../LoginSignup/Register'

const authenticated = false;
// Create auth token to navigate user from log in and register pages if logged in already



const MainRoutes = () => useRoutes([
  { path: '/', element: <HomePage /> },
  { path: '/register', element: authenticated ? <Navigate to='/' replace /> : <Register /> },
  // {path: '/user/login', element: <Login />}
])


 
export default MainRoutes;