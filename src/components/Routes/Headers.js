import Header from '../HomePage/Header/Header';
import { useRoutes } from 'react-router-dom';

const Headers = () => useRoutes([
  {path: '/', element: <Header />}
])

export default Headers;