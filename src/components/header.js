import React, { Component } from 'react';
import { Link } from 'gatsby';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: {
        open: false,
      },
    };

    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav() {
    const { navigation } = this.state;
    const currentState = navigation.open;

    this.setState({ navigation: { open: !currentState } });
  }

  render() {
    const { navigation } = this.state;
    return (
      <div className="navigation-wrapper">
        <a id="nav-toggle" onClick={this.toggleNav}>
          {navigation.open && <i className="fa fa-times nav-menu-link" />}
          {!navigation.open && <i className="fa fa-bars nav-menu-link" />}
        </a>
        <nav
          role="navigation"
          id="site-nav"
          className={`animated drop ${navigation.open ? 'opened' : 'closed'}`}
        >
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
  }
}

export default Header;
