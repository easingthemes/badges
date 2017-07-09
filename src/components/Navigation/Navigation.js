import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import "./styles.css";

class Navigation extends Component {


  render() {
    const location = this.props.location || {};
    const pathname = location.pathname;
    const isBadgesPage = pathname.indexOf('badges') > -1;

    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar"
              aria-expanded="false"
              aria-controls="navbar"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/" className="navbar-brand">
              Badges App
            </Link>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li className={isBadgesPage ? 'active' : ''}>
                <Link to="/badges">
                  Badges
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Navigation.propTypes = {
  location: PropTypes.object
};

export default Navigation;
