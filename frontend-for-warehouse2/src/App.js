import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import User from "./components/User";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from './helpers/history';
import EventBus from "./commons/EventBus";
import { ContextProvider, reducer, cartState } from "./components/ContextProvider";
// import { CounterProvider, counterReducer, totalItemCountState } from "./components/ContextProvider2";
import Item from "./components/Item";
import CheckoutCart from "./components/CheckoutCart";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,


    };

    history.listen((location) => {
      props.dispatch(clearMessage());
    });

  }



  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    this.props.dispatch(logout());
    this.setState({
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser } = this.state;


    return (

      <ContextProvider reducer={reducer} cartState={cartState}>
        {/* <CounterProvider counterReducer={counterReducer} totalItemCountState={totalItemCountState}> */}
        <Router history={history}>

          <div>
            <nav className="navbar sticky-top navbar-expand-sm navbar-dark bg-dark">
              <div className="navbar-nav">
                <Link to={"/"} className="navbar-brand fs-4">
                  Warehouse
                </Link>
                <div className="navbar-nav mr-auto">

                  {currentUser && (
                    <li className="nav-item fs-5">
                      <Link to={"/user"} className="nav-link">
                        Resource
                      </Link>
                    </li>
                  )}

                </div>

                {currentUser ? (
                  <div className="navbar-nav ml-auto">
                    <li className="nav-item fs-5">
                      <Link to={"/profile"} className="nav-link">
                        Profile
                      </Link>
                    </li>
                    <li className="nav-item fs-5">
                      <Link to={"/item"} className="nav-link">
                        Store
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={"/checkoutcart"}>
                        <button type="button" className="btn btn-outline-primary cart-button-circle">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16" height="16" fill="white"
                            viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1
                          13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5
                          12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1
                          1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                          </svg>

                          {/* <div className="smaller-cart-button-circle">
                            5
                          </div> */}

                        </button>
                      </Link>
                    </li>
                    <div className="position-absolute top-10 end-0">
                      <li className="nav-item">
                        <a href="/login" className="nav-link fs-5"
                          onClick={this.logOut}>
                          LogOut
                        </a>
                      </li>
                    </div>
                  </div>

                ) : (
                  <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link to={"/login"} className="nav-link fs-5">
                        Login
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to={"/register"} className="nav-link fs-5">
                        Sign Up
                      </Link>
                    </li>
                  </div>

                )}
              </div>
            </nav>


            <div className="container mt-3">
              <Switch>
                <Route exact path={["/", "/register"]} component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/item" component={Item} />
                <Route exact path="/user" component={User} />
                <Route exact path="/checkoutcart" component={CheckoutCart} />
              </Switch>
            </div>
          </div>

        </Router>
        {/* </CounterProvider> */}
      </ContextProvider>
    );

  }

}


function mapStateToProps(state) {
  const { user } = state.auth;

  return {
    user
  };
}



export default connect(mapStateToProps)(App);
