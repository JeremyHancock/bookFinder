import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function Navbar() {
  return (
    <nav className='navbar'>
      <Link className={
        window.location.pathname === "/"
          ? "nav-link active"
          : "nav-link"
      }
        to="/"> Search</Link>
      <Link className={
        window.location.pathname === "/books"
          ? "nav-link active"
          : "nav-link"
      }
        to="/books">Saved</Link>
    </nav>
  );
}

export default Navbar;
