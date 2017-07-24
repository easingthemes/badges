import React, { Component } from "react";
import PropTypes from 'prop-types';

import "./styles.css";

class Breadcrumbs extends Component {
  renderBreadcrumb(label, isLast) {
    if (isLast) {
      return(
        <span key={`breadcrumb-${label}`} className="breadcrumb-item active"> {label}</span>
      );
    }

    return(
      <a key={`breadcrumb-${label}`} className="breadcrumb-item" href="">{label} /</a>
    );
  }

  renderBreadcrumbs(breadcrumbs) {
    const count = breadcrumbs.length;
    return breadcrumbs.map((breadcrumb, i) => this.renderBreadcrumb(breadcrumb, i === count - 1));
  }

  render() {
    return (
      <nav className="breadcrumb">
        {this.renderBreadcrumbs(this.props.breadcrumbs)}
      </nav>
    );
  }
}

Breadcrumbs.propTypes = {
  breadcrumbs: PropTypes.array
};

export default Breadcrumbs;
