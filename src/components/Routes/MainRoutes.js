import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRoutes } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';

const MainRoutes = () => useRoutes([
  {path: '/', element: <HomePage />}
])


 
export default MainRoutes;