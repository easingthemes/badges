import React, { Component } from "react";
import PropTypes from 'prop-types';
import Loader from '../../components/Loader';

class TableBadges extends Component {
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
    const fields = badge.fields || {};
    const status = fields.status || {};
    return (
      <tr key={`badge-${badge.id}`}>
        <td>{badge.id}</td>
        <td>{badge.key}</td>
        <td>{fields.summary}</td>
        <td>{status.name}</td>
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

TableBadges.propTypes = {
  badges: PropTypes.array,
  total: PropTypes.number
};

export default TableBadges;
