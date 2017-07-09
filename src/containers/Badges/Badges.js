import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import selectBadges from './selectors';
import {
  getBadges,
} from './actions';

import TableBadges from '../../components/Table/TableBadges';

class Badges extends Component {
  componentDidMount() {
    const badges = this.props.badges || [];

    if (badges.length === 0) {
      this.props.handleGetBadges();
    }
  }

  render() {
    return (
      <div>
        <TableBadges
          badges={this.props.badges}
          total={this.props.total}
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

