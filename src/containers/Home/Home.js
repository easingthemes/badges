import React, { Component } from "react";
import { connect } from "react-redux";

import {
  removeBreadcrumbs,
} from '../Breadcrumbs/actions';

class Home extends Component {
  componentDidMount() {
    this.props.handleRemoveBreadcrumbs('Pathways');
  }

  render() {
    return (
      <div>
        Home page
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleRemoveBreadcrumbs: (label) => dispatch(removeBreadcrumbs(label)),
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(Home);
