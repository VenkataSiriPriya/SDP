import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import Login from "../forms/Login";

function Navbar() {
  const [isBuyDropdownOpen, setIsBuyDropdownOpen] = useState(false);
  const [isRentDropdownOpen, setIsRentDropdownOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const buyDropdownRef = useRef(null);
  const rentDropdownRef = useRef(null);
  const loginDropdownRef = useRef(null);
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

  const handleSelectProperty = (path) => {
    navigate(path);
    setIsBuyDropdownOpen(false);
    setIsRentDropdownOpen(false);
    setIsLoginDropdownOpen(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      // Check if click is outside all dropdowns
      if (
        buyDropdownRef.current &&
        !buyDropdownRef.current.contains(event.target) &&
        rentDropdownRef.current &&
        !rentDropdownRef.current.contains(event.target) &&
        loginDropdownRef.current &&
        !loginDropdownRef.current.contains(event.target)
      ) {
        setIsBuyDropdownOpen(false);
        setIsRentDropdownOpen(false);
        setIsLoginDropdownOpen(false);
      }
    }

    // Add event listener for click
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="top-bar">
        <div className="logo">PropSync</div>
        <div className="right-section">
          {/* Login Menu */}
          <div className="menu-item" ref={loginDropdownRef}>
            <div
              onClick={() => {
                setIsLoginDropdownOpen(!isLoginDropdownOpen);
                setIsBuyDropdownOpen(false);
                setIsRentDropdownOpen(false);
              }}
            >
              Login 🔻
            </div>
          </div>

          {/* Login Dropdown rendered separately */}
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
        {/* Buy Dropdown */}
        <div className="dropdown-container" ref={buyDropdownRef}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsBuyDropdownOpen(true); // Keep Buy dropdown open when clicked
              setIsRentDropdownOpen(false); // Close Rent dropdown if open
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

        {/* Rent Dropdown */}
        <div className="dropdown-container" ref={rentDropdownRef}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsRentDropdownOpen(true); // Open Rent dropdown
              setIsBuyDropdownOpen(false); // Close Buy dropdown
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

        <a href="#">Sell 🔻</a>
        <a href="#">Home Loans 🔻</a>
        <a href="#">Home Interiors</a>
        <a href="#">MB Advice <span className="new-badge">NEW</span> 🔻</a>
        <a href="#">Help 🔻</a>
      </div>
    </nav>
  );
}

export default Navbar;
