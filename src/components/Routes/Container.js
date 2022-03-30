import MainRoutes from "./MainRoutes";
import { useRoutes } from "react-router-dom";
import Header from "../HomePage/Header/Header";

const Container = ({handleLogin, currentUser, handleLogout}) => <>
  {useRoutes([{
    path: '/', element: <Header handleLogout={handleLogout} currentUser={currentUser} />
    }])}
  <MainRoutes
    currentUser={currentUser}
    handleLogin={handleLogin} />
</>

export default Container;