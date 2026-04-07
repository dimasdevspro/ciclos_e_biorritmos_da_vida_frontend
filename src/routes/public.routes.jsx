import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sobre from "../pages/Sobre";
import Home from "../pages/Home";
import Privacidade from "../pages/Privace";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PublicRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/privacidade" element={<Privacidade />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
