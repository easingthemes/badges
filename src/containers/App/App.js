import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import { getBadges } from '../Badges/actions';

import Badges from '../Badges';

import Header from '../../components/Header';
import "./styles.css";

class App extends Component {
  componentDidMount() {
    this.props.handleGetBadges();
  }

  render() {
    return (
      <div>
        <Header location={this.props.location} />
        <div className="container">
            <Switch>
                <Route path="/badges" component={Badges} />
            </Switch>
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
    handleGetBadges: (data) => dispatch(getBadges(data)),
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(App);
