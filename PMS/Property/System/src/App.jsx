import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Navbar from "./components/Navbar";
import ProjectNavbar from "./Main/ProjectNavbar";
import Footer from "./components/Footer";

import About from "./default/About";
import Home from "./default/Home";
import Post from "./Main/Post";
import Apart from "./buy/Apart";
import Villas from "./buy/Villas";
import Plots from "./buy/Plots";
import Projects from "./Main/Projects";
import ProjectDetails from './Main/ProjectDetails';
import Testimonials from "./Main/Testimonials";
import LandlordDashboard from "./pages/LandlordDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import TenantDashboard from "./pages/TenantDashboard";
import Services from "./default/Services";
import Contact from "./default/Contact";
import Sitemap from "./default/Sitemap";

const Layout = () => {
  const location = useLocation();
  const path = location.pathname;

  const hideNavbar = path.startsWith("/admin"); // ✅ Hide all navbars on admin page
  const showProjectNavbar = path.startsWith("/projects") || path.startsWith("/contact");

  return (
    <>
      {!hideNavbar && (showProjectNavbar ? <ProjectNavbar /> : <Navbar />)}

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/post" element={<Post />} />
          <Route path="/apartment" element={<Apart />} />
          <Route path="/villa" element={<Villas />} />
          <Route path="/plots" element={<Plots />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/landlord" element={<LandlordDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/tenant" element={<TenantDashboard />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sitemap" element={<Sitemap />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
