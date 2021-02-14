import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <nav>
    <div className="nav-wrapper  blue-grey darken-3">
      <Link to={"/"} className="brand-logo center">
        SMART BOT
      </Link>
      <ul id="nav-mobile" className="left ">
        <li>
          <Link to={"/"}>
            <i class="material-icons">home</i>
          </Link>
        </li>

        <li>
          <Link to={"/about"}>
            <i class="material-icons">flash_on</i>
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Header;
