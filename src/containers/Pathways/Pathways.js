import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { PROJECT_ID } from '../App/private';
import selectPathways from './selectors';
import {
  getPathways,
} from './actions';

import Table from '../../components/Table/Table';

class Pathways extends Component {
  componentDidMount() {
    if (this.props.match.isExact && this.props.pathways.length === 0) {
      this.props.handleGetPathways(PROJECT_ID);
    }
  }

  render() {
    return (
      <div>
        <Table
          badges={this.props.pathways}
          url="/badges"
        />
      </div>
    );
  }
}

Pathways.propTypes = {
  handleGetPathways: PropTypes.func,
  pathways: PropTypes.array,
  total: PropTypes.number
};

const mapStateToProps = selectPathways();

function mapDispatchToProps(dispatch) {
  return {
    handleGetPathways: (projectId) => dispatch(getPathways(projectId)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Pathways);

