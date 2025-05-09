import React from "react";
import { Link } from "react-router-dom";
import "../css/ProjectNavbar.css";

const ProjectNavbar = () => {
  return (
    <nav className="project-navbar">
      <div className="logo">ProySync</div>
      <ul className="project-nav-links">
        <li><Link to="/">Home</Link></li>
        <li>
          <div className="contact-dropdown">
            <button className="contact-button">Contact</button>
            <div className="contact-options">
              <a href="tel:+917337530999">📞 Call Us</a>
              <a href="mailto:psiri2253@gmail.com">✉️ Email Us</a>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default ProjectNavbar;
