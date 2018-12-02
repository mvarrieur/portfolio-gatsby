import React from 'react';

const Footer = () => (
  <div className="footer-wrapper">
    <footer role="contentinfo" className="entry-wrapper">
      <span>
        &copy;
        {` ${new Date().getFullYear()} Michael Varrieur`}
      </span>
      <div className="social-icons">
        <a
          href="https://twitter.com/mvarrieur"
          title="Michael Varrieur on Twitter"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa fa-twitter-square fa-2x" />
        </a>
        <a
          href="https://github.com/mvarrieur"
          title="Michael Varrieur on Github"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa fa-github-square fa-2x" />
        </a>
      </div>
    </footer>
  </div>
);

export default Footer;
