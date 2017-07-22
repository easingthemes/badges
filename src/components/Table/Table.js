import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Loader from '../../components/Loader';

class Table extends Component {
  renderRowHeader() {
    return (
      <thead>
        <tr key="badge-header">
          <th>#id</th>
          <th>key</th>
          <th>name</th>
          <th>status</th>
        </tr>
      </thead>
    );
  }

  renderRow(badge) {
    return (
      <tr key={`badge-${badge.id}`}>
        <td>{badge.id}</td>
        <td>
          <Link to={`${this.props.url}/${badge.key}`}>
            {badge.key}
          </Link>
        </td>
        <td>{badge.name || badge.summary}</td>
        <td>{badge.status}</td>
      </tr>
    );
  }

  renderRowFooter() {
    if (typeof this.props.total !== 'number' && !this.props.total) {
      return (
        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tfoot>
      );
    }

    return (
      <tfoot>
        <tr>
          <td><strong>Total</strong></td>
          <td></td>
          <td></td>
          <td><strong>{this.props.total}</strong></td>
        </tr>
      </tfoot>
    );
  }

  renderRows(badges) {
    return badges.map(badge => {
      return this.renderRow(badge)
    });
  }

  renderTable(badges) {
      if (badges.length === 0) {
        return (
          <div>No data</div>
        );
      }

      return (
        <table className="table">
          {this.renderRowHeader()}
          <tbody>
            {this.renderRows(badges)}
          </tbody>
          {this.renderRowFooter()}
        </table>
      );
    }

  render() {
    const badges = this.props.badges || [];

    if (badges.length === 0) {
      return (
        <Loader />
      );
    }

    return (
      <div>
        {this.renderTable(badges)}
      </div>
    );
  }
}

Table.propTypes = {
  badges: PropTypes.array,
  total: PropTypes.number,
  url: PropTypes.string
};

export default Table;
