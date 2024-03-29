import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";

class Profile extends Component {


  render() {

    const { user: currentUser } = this.props;

    if (!currentUser) {
      
      return <Redirect to="/login" />;
    }
    
    return (
      <div className="card bg-light text-dark">
        <h1>{currentUser.username}</h1>
        <p>
          <strong>Id:</strong> {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        {/* this is for icons, maybe in future I will add */}
        {/* <a href="#"><i className="fa fa-dribbble"></i></a>
        <a href="#"><i className="fa fa-twitter"></i></a>
        <a href="#"><i className="fa fa-linkedin"></i></a>
        <a href="#"><i className="fa fa-facebook"></i></a> */}
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
export default connect(mapStateToProps)(Profile);