import React, { Component } from "react";
import PropTypes from 'prop-types';
import TableCustomers from '../Table/TableCustomers';
import TableBadges from '../Table/TableBadges';
import "./styles.css";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invoiceId: 0,
      selectedCustomer: {
        id: -1,
        name: 'None',
      },
      selectedBadges: [],
      selectedBadgesIds: [],
      subTotal: 0,
      discount: 0,
      total: 0,
      showBadges: false,
      showSubmitButton: false,
    };
  }

  getTotal(discount, subTotal) {
    subTotal = subTotal || this.state.subTotal;
    discount = discount || this.state.discount;
    const total = subTotal - (subTotal * discount / 100);
    return Math.round(total * 100) / 100;
  }

  setInvoiceId(invoice) {
    this.setState({
      invoiceId: invoice.id
    });
  }

  setSelectedCustomer(value) {
    let selectedCustomer = {};
    const valueNumber = parseInt(value, 10);

    if (value === 'default') {
      selectedCustomer = {
        id: -1,
        name: 'None',
      };
    } else {
      selectedCustomer = this.props.customers.find(item => item.id === valueNumber);
    }

    this.setState({
      selectedCustomer: selectedCustomer,
      showBadges: true,
      selectedBadges: [],
      selectedBadgesIds: [],
      subTotal: 0,
      total: 0,
    });

    const invoice = {
      customer_id: selectedCustomer.id,
      discount: this.state.discount,
      total: 0,
    };

    this.props.handlePostInvoice(invoice, this.setInvoiceId.bind(this));
  }

  setSelectedBadges(value) {
    const selectedBadges = this.state.selectedBadges;
    const selectedBadgesIds = this.state.selectedBadgesIds;
    let selectedBadge = {};
    let subTotal = 0;
    const valueNumber = parseInt(value, 10);
    const idPosition = selectedBadgesIds.indexOf(valueNumber);

    if (idPosition < 0) {
      selectedBadge = this.props.badges.find(item => item.id === valueNumber);
      selectedBadge.qty = 1;
      selectedBadges.push(selectedBadge);
      selectedBadgesIds.push(selectedBadge.id);
      subTotal = this.state.subTotal + selectedBadge.price;
    } else {
      selectedBadge = selectedBadges[idPosition];
      selectedBadges.splice(idPosition, 1);
      selectedBadgesIds.splice(idPosition, 1);

      subTotal = this.state.subTotal - selectedBadge.price * selectedBadge.qty;
    }

    const subTotalRounded = Math.round(subTotal * 100) / 100;

    this.setState({
      selectedBadges,
      selectedBadgesIds,
      subTotal: subTotalRounded,
      total: this.getTotal(false, subTotalRounded),
      showSubmitButton: true,
    });

    const invoice = {
      total: this.getTotal(false, subTotalRounded)
    };

    this.props.handleUpdateInvoice(this.state.invoiceId, invoice, this.props.handleGetInvoices);
  }

  setDiscount(discount) {
    discount = discount || '0';
    const discountNumber = parseInt(discount, 10);
    this.setState({
      discount: discountNumber,
      total: this.getTotal(discountNumber, false)
    });

    const invoice = {
      discount: discountNumber,
      total: this.getTotal(discountNumber, false)
    };

    this.props.handleUpdateInvoice(this.state.invoiceId, invoice, this.props.handleGetInvoices);
  }

  handleSelectCustomer(event) {
    this.setSelectedCustomer(event.target.value);
  }

  handleSelectBadges(event) {
    this.setSelectedBadges(event.target.value);
  }

  handleSetDiscount(event) {
    this.setDiscount(event.target.value);
  }

  handleQtyChange(qty, badge) {
    const selectedBadges = this.state.selectedBadges;
    const qtyNumber = parseInt(qty, 10);
    let subTotal = 0;

    const updatedBadges = selectedBadges.map((item) => {
      if (item.id === badge.id) {
        item.qty = qtyNumber;
      }

      subTotal = subTotal + item.price * item.qty; // eslint-disable-line

      return item;
    });

    const subTotalRounded = Math.round(subTotal * 100) / 100;

    this.setState({
      selectedBadges: updatedBadges,
      subTotal: subTotalRounded,
      total: this.getTotal(false, subTotalRounded)
    });

    const invoice = {
      total: this.getTotal(false, subTotalRounded)
    };

    this.props.handleUpdateInvoice(this.state.invoiceId, invoice, this.props.handleGetInvoices);
  }

  renderOptionsList(list) {
    return list.map((item) => <option key={item.id} value={item.id}>{item.id + ' - ' + item.name}</option>);
  }

  renderBadges() {
    if (!this.state.showBadges) {
      return (
        <span />
      );
    }

    return (
      <div className="form-group">
        <label>Selected Badges: </label>
        <TableBadges
          badges={this.state.selectedBadges}
          showQty
          subTotal={this.state.subTotal}
          total={this.state.total}
          discount={this.state.discount}
          handleQtyChange={(qty, badge) => this.handleQtyChange(qty, badge)}
        />
      </div>
    );
  }

  renderAddBadges() {
    if (!this.state.showBadges) {
      return (
        <span />
      );
    }

    return (
      <div className="form-group">
        <label htmlFor="badges">Add badges</label>
        <select
          multiple
          className="form-control"
          id="badges"
          value={this.state.selectedBadgesIds}
          onChange={(event) => this.handleSelectBadges(event)}
        >
          {this.renderOptionsList(this.props.badges)}
        </select>
      </div>
    );
  }

  render() {
    const selectedCustomers = [];

    if (this.state.selectedCustomer) {
      selectedCustomers.push(this.state.selectedCustomer);
    }

    return (
      <form>
        <div className="row">
          <div className="col-xs-12 col-md-4">
            <div className="form-group">
              <label htmlFor="customers">Choose customer</label>
              <select
                className="form-control"
                id="customers"
                value={this.state.selectedCustomer.id}
                onChange={(event) => this.handleSelectCustomer(event)}
              >
                <option value="default">
                  Choose customer
                </option>
                {this.renderOptionsList(this.props.customers)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="discount">Set discount (%)</label>
                <input
                  type="tel"
                  className="form-control"
                  id="discount"
                  placeholder="10"
                  onChange={(event) => this.handleSetDiscount(event)}
                />
            </div>
            {this.renderAddBadges()}
          </div>
          <div className="col-xs-12 col-md-8">
            <div className="form-group">
              <TableCustomers customers={selectedCustomers} />
            </div>
            {this.renderBadges()}
          </div>
        </div>
      </form>
    );
  }
}

Form.propTypes = {
  customers: PropTypes.array,
  badges: PropTypes.array,
  handlePostInvoice: PropTypes.func,
  handleUpdateInvoice: PropTypes.func,
};

export default Form;
