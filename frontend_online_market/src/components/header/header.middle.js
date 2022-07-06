import React, { Component } from "react";
import { Link } from "react-router-dom";
import storeConfig from "../../config/storage.config";
class HeaderMiddle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "Account"
    };
  }
  componentWillMount() {
    if (storeConfig.getUser() !== null) {
      this.setState({
        username: storeConfig.getUser().username
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.islogin) {
      this.setState({
        username: "Account"
      });
    } else {
      this.setState({
        username: storeConfig.getUser().username
      });
    }
  }
  handlelogin = () => {
    if (this.props.islogin) {
      return (
        <li className='dropdown'>
          <a className='Setting-item'>
            <i className="fa fa-user dropbtn"></i>
          </a>
          {this.hoverlogin()}
        </li>
        // <li
        //   className="btn-custom"
        //   onClick={() => {
        //     window.location.reload();
        //     this.props.logout();
        //     this.props.history.push("/");
        //   }}
        // >
        //   <a>
        //     Đăng xuất
        //   </a>
        // </li>
      );
    } else {
      return (
        <li>
          <Link to="/login_register">
            Đăng nhập
          </Link>
        </li>
      );
    }
  };
  handleProfile = () => {
    if (this.state.username === "Account") {
      return;
    } else {

      this.props.history.push("/profile/" + this.state.username);
    }
  };
  hoverlogin = () => {
    if (this.props.islogin) {
      return (
        <ul className='sub-menu'>

          <li onClick={() => this.handleProfile()}>
            <Link to={"/"}  >Hồ Sơ </Link>
          </li>

          <li><Link to='/purchase_history' >Đơn Hàng </Link></li>
          <li
            className="btn-custom"
            onClick={() => {
              window.location.reload();
              this.props.logout();
              this.props.history.push("/");
            }}
          >
            <Link to='/'>
              Đăng xuất
            </Link>

          </li>
        </ul>
      );
    }
  }
  render() {
    return (
      <div className="header-middle">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <div className="logo pull-left">
                <a href="/">
                  <span className="logo_icon">ONLINE MARKET</span>
                </a>
              </div>

            </div>
            <div className="col-sm-8">
              <div className="shop-menu pull-right">
                <ul className="nav navbar-nav collapse navbar-collapse">
                    {this.handlelogin()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HeaderMiddle;
