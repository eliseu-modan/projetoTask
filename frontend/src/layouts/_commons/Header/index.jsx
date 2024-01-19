import React from "react";
import { NavLink } from "react-router-dom";

import "./index.css";

const Header = () => {
  return (
    <nav className="navbarWrapper center">
      <div className="navbarInner center">
        <div className="navLeft">
          <NavLink to="/">
            {/* <img src={logo} alt="logo" className="brand" /> */}
          </NavLink>
        </div>
        <div className="navRight center">
          {/* <img src={logo} alt="logo" className="brand2" /> */}
        </div>
      </div>
    </nav>
  );
};
export default Header;
