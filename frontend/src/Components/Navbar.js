import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link style={{ background: "black" }} to="/" className="title">
        <img
          className="ImageNavbrsixecontrol"
          src="/images/footerlogo.webp"
          alt=""
        />
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="https://revnitro.com/">Home</NavLink>
        </li>
        <li>
          <NavLink to="https://blog.revnitro.com/">Blog</NavLink>
        </li>
        <li>
          <NavLink to="https://revnitro.com/ClassifiedsPage.html">
            Classifieds
          </NavLink>
        </li>
        <li>
          <NavLink to="https://revnitro.com/commingsoon.html">Shop</NavLink>
        </li>
        <li>
          <NavLink to="https://forum.revnitro.com/" target="_blank">
            Forum
          </NavLink>
        </li>
        <li>
          <NavLink className="active" to="/">
            Events
          </NavLink>
        </li>
        <li>
          <NavLink to="https://revnitro.com/team.html">Team</NavLink>
        </li>
        <li>
          <NavLink to="https://forms.revnitro.com/Contact">Contact Us</NavLink>
        </li>
      </ul>
    </nav>
  );
};
