import React, { Component } from "react";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  
  render() {
    const handleSubmit = e => {
      e.preventDefault();
      this.props.loginSubmit(this.state.username, this.state.password)
    };
    const handleKeypress = e => {
      if (e.keyCode === 'Enter') {
        handleSubmit();
      }
    }
    return (
      <div className="">
        <div className="container">
          <div className="login-form" action="index.html">
            <form className="login-wrap">
              <p className="login-img">
                <i className="icon_lock_alt" />
              </p>
              <center>{this.props.notiLogin ? this.props.notiLogin : ''}</center>
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="icon_profile" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  autoFocus
                  value={this.state.username}
                  onChange={(e) => this.setState({ username: e.target.value })}
                  onKeyPress={handleKeypress}
                />
              </div>
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="icon_key_alt" />
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                  onKeyPress = {handleKeypress}
                />
              </div>
              <label className="checkbox">
                <input type="checkbox" value="remember-me" /> Remember me
                <span className="pull-right">
                  {" "}
                  <a href="#"> Forgot Password?</a>
                </span>
              </label>
              <button className="btn btn-primary btn-lg btn-block" type="submit"
                onClick={handleSubmit}>
                Login
              </button>
              {/* <input type="submit" hidden /> */}
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
