import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../actions/user.action";
import Login from "../components/login/login";
import  { Redirect } from 'react-router-dom'
class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notiLogin: ""
    };
  }
  loginSubmit = async (username, password) => {
    let res;
    try {
      res = await axios.post("http://localhost:8080/admin/login", {
        username: username,
        password: password
      });
    } catch (err) {
      if (err.response !== undefined) {
        if (err.response.data.msg === "no_registration_confirmation")
          this.setState({ notiLogin: "The account has not been activated" });
        else {
          this.setState({ notiLogin: "Username or password invalid" });
        }
      } else {
        this.setState({ notiLogin: "Some thing went wrong" });
      }
      return;
    }
    this.props.userActions.loginSuccess(res.data.user);
    window.location.replace('/')
  };
  render() {
    return (
      <div>
        <Login
          loginSubmit={(username, password) => this.loginSubmit(username, password)}
          notiLogin={this.state.notiLogin}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
    islogin: state.userReducers.user.islogin
});

const mapDispatchToProps = dispatch => {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
