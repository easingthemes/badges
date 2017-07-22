import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import selectBadges from './selectors';
import {
  getBadges,
} from './actions';

import Table from '../../components/Table/Table';

class Badges extends Component {
  componentDidMount() {
    const match = this.props.match || {};
    const params = match.params || {};
    const id = params.pathwayId || '';

    this.props.handleGetBadges(id);
  }

  render() {

    return (
      <div>
          <Table
            badges={this.props.badges}
            total={this.props.total}
            url="/badge"
          />
      </div>
    );
  }
}

Badges.propTypes = {
  handleGetBadges: PropTypes.func,
  badges: PropTypes.array,
  total: PropTypes.number
};

const mapStateToProps = selectBadges();

function mapDispatchToProps(dispatch) {
  return {
    handleGetBadges: (data) => dispatch(getBadges(data)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Badges);

