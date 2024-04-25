import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Watches from './pages/Watches';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'


function App() {
 

  return (
      <BrowserRouter>
       <Routes>
        <Route path='/' element={<Layout />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/watches' element={<Watches />} />
       </Routes>
    </BrowserRouter>
  )
}

export default App
