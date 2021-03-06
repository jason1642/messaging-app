// import logo from './logo.svg';
import './App.css';
import AllRoutes from './components/Routes/Container'
import React, { useState, useEffect } from 'react';
import {
  loginUser,
  verifyUser,
  removeToken
} from './Services/api-helper.ts';
//verifyUser, registerUser, loginUser, removeToken

function App() {

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    verifyUser().then(res=>setCurrentUser(res), (err)=>console.log(err))
  },[])


  useEffect(() => { 
    currentUser ?
      console.log('You are logged in as ' + currentUser.username) :
      console.log('You are not logged in, no account found')
  },[currentUser])

  const handleLogin = async (loginData, navigate) =>
    await loginUser(loginData)
      .then(userData => {
        setCurrentUser(userData);
        if (currentUser) {
          navigate('/');
         window.location.reload();
      }
    return currentUser ? true : false;
      }
      ,err=>undefined)
  
  const handleLogout = () => {
    localStorage.clear();
    setCurrentUser(null)
    removeToken();
    console.log('You are logged out', currentUser)
    window.location.reload();
  }
  
  return (
    <div className="App">
      
      <AllRoutes
        handleLogout={handleLogout}
        currentUser={currentUser}
        handleLogin={handleLogin} />

    </div>
  );
}

export default App;