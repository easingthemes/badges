import React, { Component } from "react";
import PropTypes from 'prop-types';

import Navigation from '../Navigation';

import "./styles.css";

class Header extends Component {
  render() {
    return (
      <div>
        <Navigation { ...this.props } />
      </div>
    );
  }
}

Header.propTypes = {
  location: PropTypes.object
};

export default Header;
