import React from 'react';
import { Link } from 'gatsby';

const Header = () => (
  <div className="navigation-wrapper">
    <nav role="navigation" id="site-nav" className="animated drop closed">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/#about">About</Link>
        </li>
        <li>
          <Link to="/#work">Work</Link>
        </li>
        <li>
          <Link to="/#contact">Contact</Link>
        </li>
      </ul>
    </nav>
  </div>
);

export default Header;
