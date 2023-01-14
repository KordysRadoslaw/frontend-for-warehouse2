import React, { Component } from "react";

import UserService from "../services/UserService";
import EventBus from "../commons/EventBus";
import { connect } from "react-redux";

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      orders: [],
      uniqueOrdersId: []
    }
  }

  componentDidMount() {
    const { user: currentUser } = this.props

    UserService.getGreetings().then(
      response => {
        this.setState({
          content: response.data.message
        });

      },

      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );


    fetch("http://localhost:8080/api/order/orderList", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'

      },
      body: JSON.stringify({ userId: currentUser.id })
    }).then(
      (res) => res.json()).then(datas => {
        this.setState({
          orders: datas
        })
      },
        error => {
          this.setState({
            uniqueOrdersId:
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString()
          });

          if (error.response && error.response.status === 401) {
            EventBus.dispatch("logout");
          }
        }
      )

  }

  SortOrders() {
    this.state.orders.filter((item) => {
      const duplicates = this.state.uniqueOrdersId.includes(item.orderId);

      if (!duplicates) {
        this.state.uniqueOrdersId.push(item.orderId)

        return true
      }
      return false
    })
  }

  render() {
    this.SortOrders()

    return (
      <div>

        <div className="card bg-light text-dark">
          <h3>{this.state.content}</h3>
        </div>
        <div className="card bg-light text-dark">

          <h4>Your orders:</h4>
          {this.state.uniqueOrdersId.map((item => (
            <h3 key={item}>{item}</h3>
          )))}
        </div>
      </div>
    );
  }

}
function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}
export default connect(mapStateToProps)(User);