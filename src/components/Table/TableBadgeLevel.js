import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import j2m from 'jira2md';
import Loader from '../../components/Loader';
import "./styles.css";

class TableBadge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: 0,
      knowledge: 0,
      evidence: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    const badge = nextProps.badge;
    const fields = badge.fields || {};

    if (fields.summary) {
       this.setState({
         isLoaded: this.state.isLoaded + 1
       });
    }
  }

  componentDidUpdate() {
    if (this.knowledge && this.state.isLoaded === 1) {
      this.addEvents('knowledge');
      this.addEvents('evidence');
      this.setState({
        isLoaded: this.state.isLoaded + 1
      });
    }
  }

  addEvents(group) {
    const items = this[group].getElementsByTagName('li');
    const itemsTotal = items.length;

    const handleClick = (event) => {
      let progress;
      const newState = {};
      const currentProgress = this.state[group];

      if (event.target.classList.contains('checked')) {
        event.target.classList.remove('checked');
        progress = currentProgress - 100 / itemsTotal;
      } else {
        event.target.classList.add('checked');
        progress = currentProgress + 100 / itemsTotal;
      }

      newState[group] = progress;

      this.setState(newState);
    };

    for (let i = 0; i < items.length; i ++) {
      items[i].removeEventListener('click', handleClick, false);
      items[i].addEventListener('click', handleClick, false);
    }
  }

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

  renderCustomFields(fields) {
    if (!fields) {
      return(
        <span />
      );
    }

    return(
      <div className="row">
        <div
          className="col-lg-6"
          ref={(knowledge) => { this.knowledge = knowledge; }}
        >
          {this.renderCustomField(fields.customfield_20003, 'Acceptance Criteria')}
        </div>
        <div
          className="col-lg-6"
          ref={(evidence) => { this.evidence = evidence; }}
        >
          {this.renderCustomField(fields.customfield_20816, 'Evidence')}
        </div>
      </div>
    );
  }

  renderCustomFieldValue(field, title) {
    if (!field || !field.value) {
      return(
        <span />
      );
    }

    return(
      <div>{title}: {field.value}</div>
    );
  }

  renderProgress(title, item, color) {
    const progress = Math.round(this.state[item]);

    return(
      <div>
        <h3>{title}</h3>
        <div className="progress">
          <div
            className={`progress-bar progress-bar-${color}`}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{width: `${progress}%`}}>
            {progress}%
          </div>
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
        <div>
          {this.renderCustomFieldValue(fields.customfield_20001, 'Badge level')}
          {this.renderCustomFieldValue(fields.customfield_20002, 'Available from')}
        </div>
        {this.renderProgress('Knowledge', 'knowledge', 'info')}
        {this.renderProgress('Evidence', 'evidence', 'success')}
        <div className="badge__items">
          {this.renderCustomFields(fields)}
        </div>
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
