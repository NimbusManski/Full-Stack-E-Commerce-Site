import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Watches from "./pages/Watches";
import WatchDetails from "./pages/WatchDetails";
import Ties from "./pages/Ties";
import TieDetails from "./pages/TieDetails";
import Shoes from "./pages/Shoes";
import ShoeDetails from "./pages/ShoeDetails";
import Belts from "./pages/Belts";
import BeltDetails from "./pages/BeltDetails";
import Cart from "./pages/Cart";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/watches" element={<Watches />} />
          <Route path="/watch-details/:id" element={<WatchDetails />} />
          <Route path="/belt-details/:id" element={<BeltDetails />} />
          <Route path="/ties" element={<Ties />} />
          <Route path="/tie-details/:id" element={<TieDetails />} />
          <Route path="/shoes" element={<Shoes />} />
          <Route path="/shoe-details/:id" element={<ShoeDetails />} />
          <Route path="/belts" element={<Belts />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
