import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Shop from "./components/Shop";
import Authentic from "./components/BannerOne";
import AuthenticSecond from "./components/BannerTwo";
import Attributes from "./components/Attributes";
import Explore from "./components/Explore";
import Footer from "./components/Footer";


export default function Layout() {
    return (
        <main>
            <Navigation />
            <Hero />
            <Shop />
            <Authentic />
            <Attributes />
            <AuthenticSecond />
            <Explore />
            <Footer />
            <Outlet />
        </main>
    )
};