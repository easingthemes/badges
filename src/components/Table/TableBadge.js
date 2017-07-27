import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import j2m from 'jira2md';
import Loader from '../../components/Loader';

class TableBadge extends Component {
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
        <td>
          <Link to={`${this.props.url}/${badge.key}`}>
            {badge.key}
          </Link>
        </td>
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
        <div>No subtasks</div>
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

  renderCustomField(field, title) {
    if (!field || field.length === 0) {
      return(
        <span />
      );
    }

    return(
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{title}</h3>
        </div>
        <div className="panel-body">
          <ReactMarkdown source={j2m.to_markdown(field)} />
        </div>
      </div>
    );
  }

  render() {
    const badge = this.props.badge;
    const fields = badge.fields || {};
    const subTasks = fields.subtasks;
    const description = fields.description || '';

    if (!fields.summary) {
      return (
        <Loader />
      );
    }

    return (
      <div>
        <h2>
          <span>{fields.summary}</span> <span className="label label-success">{fields.status.name}</span>
        </h2>
        {this.renderCustomField(description, 'Description')}
        {this.renderTable(subTasks)}
      </div>
    );
  }
}

TableBadge.propTypes = {
  badge: PropTypes.object,
  total: PropTypes.number
};

export default TableBadge;
