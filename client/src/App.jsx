import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Layout from './Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import { UserContextProvider } from './components/UserContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
 

  return (
    <UserContextProvider>
      <BrowserRouter>
       <Routes>
        <Route path='/' element={<Layout />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
       </Routes>
    </BrowserRouter>
    </UserContextProvider>
  )
}

export default App
