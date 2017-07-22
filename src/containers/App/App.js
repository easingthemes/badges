import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import Home from '../Home';
import Pathways from '../Pathways';
import Badges from '../Badges';
import Badge from '../Badge';

import Header from '../../components/Header';
import "./styles.css";

class App extends Component {
  render() {
    return (
      <div>
        <Header location={this.props.location} />
        <div className="container">
          <Route exact path="/" component={Home}/>
          <Route path="/pathways" component={Pathways} />
          <Route path="/badges/:pathwayId" component={Badges} />
          <Route path="/badge/:badgeId" component={Badge} />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(App);
