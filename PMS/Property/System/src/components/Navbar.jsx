import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import Login from "../forms/Login";

function Navbar() {
  const [isBuyDropdownOpen, setIsBuyDropdownOpen] = useState(false);
  const [isRentDropdownOpen, setIsRentDropdownOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const [isHelpDropdownOpen, setIsHelpDropdownOpen] = useState(false);
  const buyDropdownRef = useRef(null);
  const rentDropdownRef = useRef(null);
  const loginDropdownRef = useRef(null);
  const helpDropdownRef = useRef(null);
  const navigate = useNavigate();

  const propertyOptions = [
    { name: "Apartments", path: "/apartment" },
    { name: "Villas", path: "/villa" },
    { name: "Plots", path: "/plots" },
  ];

  const rentOptions = [
    { name: "Flats for Rent", path: "/rent/flats" },
    { name: "Villas for Rent", path: "/rent/villas" },
    { name: "PG & Co-Living", path: "/rent/pg" },
    { name: "Commercial for Rent", path: "/rent/commercial" },
  ];

  // Help options (corrected here)
  const helpOptions = [
    { name: "FAQ", path: "/faq" },
    { name: "Contact Support", path: "/contact-support" },
    { name: "User Guide", path: "/user-guide" },
  ];

  const handleSelectProperty = (path) => {
    navigate(path);
    setIsBuyDropdownOpen(false);
    setIsRentDropdownOpen(false);
    setIsLoginDropdownOpen(false);
    setIsHelpDropdownOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        buyDropdownRef.current &&
        !buyDropdownRef.current.contains(event.target) &&
        rentDropdownRef.current &&
        !rentDropdownRef.current.contains(event.target) &&
        loginDropdownRef.current &&
        !loginDropdownRef.current.contains(event.target) &&
        helpDropdownRef.current &&
        !helpDropdownRef.current.contains(event.target)
      ) {
        setIsBuyDropdownOpen(false);
        setIsRentDropdownOpen(false);
        setIsLoginDropdownOpen(false);
        setIsHelpDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="top-bar">
        <div className="logo">PropSync</div>
        <div className="right-section">
          <div className="menu-item" ref={loginDropdownRef}>
            <div
              onClick={() => {
                setIsLoginDropdownOpen(!isLoginDropdownOpen);
                setIsBuyDropdownOpen(false);
                setIsRentDropdownOpen(false);
                setIsHelpDropdownOpen(false);
              }}
            >
              Login 🔻
            </div>
          </div>

          {isLoginDropdownOpen && (
            <div className="login-popup-overlay" ref={loginDropdownRef}>
              <Login show={isLoginDropdownOpen} />
            </div>
          )}

          <button className="post-property-btn">
            Post Property <span className="free-badge">FREE</span>
          </button>
        </div>
      </div>

      <div className="bottom-bar">
        <div className="dropdown-container" ref={buyDropdownRef}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsBuyDropdownOpen(true);
              setIsRentDropdownOpen(false);
              setIsHelpDropdownOpen(false);
            }}
          >
            Buy 🔻
          </a>
          {isBuyDropdownOpen && (
            <div className="dropdown">
              {propertyOptions.map((option, index) => (
                <div
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleSelectProperty(option.path)}
                >
                  {option.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="dropdown-container" ref={rentDropdownRef}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsRentDropdownOpen(true);
              setIsBuyDropdownOpen(false);
              setIsHelpDropdownOpen(false);
            }}
          >
            Rent 🔻
          </a>
          {isRentDropdownOpen && (
            <div className="dropdown">
              {rentOptions.map((option, index) => (
                <div
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleSelectProperty(option.path)}
                >
                  {option.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="dropdown-container" ref={helpDropdownRef}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsHelpDropdownOpen(true);
              setIsRentDropdownOpen(false);
              setIsBuyDropdownOpen(false);
            }}
          >
            Help 🔻
          </a>
          {isHelpDropdownOpen && (
            <div className="dropdown">
              {helpOptions.map((option, index) => (
                <div
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleSelectProperty(option.path)}
                >
                  {option.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
