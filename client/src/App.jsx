import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Watches from './pages/Watches';
import WatchDetails from './pages/WatchDetails';
import Ties from './pages/Ties';
import Shoes from './pages/Shoes';
import Belts from './pages/Belts';
import Cart from './pages/Cart';
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
        <Route path='/watch-details/:id' element={<WatchDetails />} />
        <Route path='/ties' element={<Ties />} />
        <Route path='/shoes' element={<Shoes />} />
        <Route path='/Belts' element={<Belts />} />
        <Route path='/cart' element={<Cart />} />
       </Routes>
    </BrowserRouter>
  )
}

export default App
