import React, { Component } from "react";
import { Link } from "react-router-dom";
class User extends Component {
  constructor() {
    super();
    this.state = {
      name: null,
      id: null,
      noti: null,
      email: "",
      password: "",
      username: "",
      fullName: "",
      address: "",
      phone_number: "",
      currType: "add",
      type: "",
      pagination: [],
    };
  }
  componentWillMount() {
    let tmp = [];
    for (let i = 1; i <= this.props.totalpage; i++) {
      tmp.push(i);
    }
    this.setState({ pagination: tmp });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.totalpage !== this.props.totalpage) {
      let tmp = [];
      for (let i = 1; i <= nextProps.totalpage; i++) {
        tmp.push(i);
      }
      this.setState({ pagination: tmp });
    }
    if (nextProps.isadd === false) {
      this.setState({
        noti: "Add fail"
      });
    } else if (nextProps.isadd === true) {
      this.reset();
    }
    if (nextProps.isupdate === false) {
      this.setState({
        noti: "Update fail"
      });
    } else if (nextProps.isupdate === true) {
      this.reset();
    }
  }
  renderPagination() {
    if (this.state.pagination.length === 0) {
      return null;
    } else {
      return (
        <ul className="pagination pagination-custom col-md-6 offset-md-3">
          <li onClick={() => this.props.backPage()}>
            <a>&laquo;</a>
          </li>
          {this.state.pagination.map((element, index) => {
            if (this.props.page === element) {
              return (
                <li
                  className="active"
                  onClick={() => this.props.setPage(element)}
                >
                  <a>{element}</a>
                </li>
              );
            } else {
              return (
                <li onClick={() => this.props.setPage(element)}>
                  <a>{element}</a>
                </li>
              );
            }
          })}
          <li onClick={() => this.props.nextPage()}>
            <a>&raquo;</a>
          </li>
        </ul>
      );
    }
  }
  isvalidEmail = email => {
    if (
      email.length < 6 ||
      email.indexOf(".") === -1 ||
      email.indexOf("@") === -1
    )
      return false;
    return true;
  };
  isvalidPhone = phone => {
    if (phone.length < 10) return false;
    for (let i = 0; i < phone.length; i++) {
      if (phone.charAt(i) < "0" || phone.charAt(i) > "9") return false;
    }
    return true;
  };

  addUser = () => {
    const {
      email, password, username , fullName, address, phone_number, type
    } = this.state;
    if (!this.isvalidEmail(email)) {
      this.setState({
        noti: "Email invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (password.length < 6) {
      this.setState({
        noti: "Password invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (username.length < 0) {
      this.setState({
        noti: "Username invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (fullName.length < 3) {
      this.setState({
        noti: "Full Name invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (address.length < 3) {
      this.setState({
        noti: "Address invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (!this.isvalidPhone(this.state.phone_number)) {
      this.setState({
        noti: "Phone invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    this.props.addUser(
      email, username , fullName, address, phone_number, type
    );
  };
  updateUser = () => {
    const {
      username, fullName, email, phone_number, address, type
    } = this.state;
    if (!this.isvalidEmail(email)) {
      this.setState({
        noti: "Email invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    // if (password.length < 6) {
    //   this.setState({
    //     noti: "Password invalid"
    //   });
    //   return;
    // } else {
    //   this.setState({
    //     noti: ""
    //   });
    // }
    if (username.length < 3) {
      this.setState({
        noti: "Username invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (fullName.length < 3) {
      this.setState({
        noti: "Full name invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (address.length < 3) {
      this.setState({
        noti: "Address invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (!this.isvalidPhone(this.state.phone_number)) {
      this.setState({
        noti: "Phone invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    this.props.updateUser(
      username, fullName, email, phone_number, address, type
    );
  };
  renderBtn = () => {
    const {
      email,
      username,
      fullName,
      address,
      phone_number,
      type
    } = this.state;
    if (this.state.currType === "add") {
      return (
        <div className="form-group">
          <div className="col-lg-offset-2 col-lg-10">
            <button onClick={() => this.addUser()} className="btn-custom">
              Add
            </button>
            <button disabled className="btn-custom">
              Update
            </button>
            <button onClick={() => this.reset()} className="btn-custom">
              Reset
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="form-group">
          <div className="col-lg-offset-2 col-lg-10">
            <button
              disabled
              onClick={() => this.addUser()}
              className="btn-custom"
            >
              Add
            </button>
            <button onClick={() => this.updateUser()} className="btn-custom">
              Update
            </button>
            <button onClick={() => this.reset()} className="btn-custom">
              Reset
            </button>
          </div>
        </div>
      );
    }
  };
  reset = () => {
    this.setState({
      name: null,
      id: null,
      noti: null,
      email: "",
      password: "",
      username: "",
      fullName: "",
      address: "",
      phone_number: "",
      currType: "add",
      type: ""
    });
  };
  renderPassword = () => {
    if (this.state.currType === "add") {
      return (
        <div className="form-group ">
          <label for="cname" className="control-label col-lg-2">
            Password <span className="required">*</span>
          </label>
          <div className="col-lg-10">
            <input
              value={this.state.password}
              onChange={e => {
                this.setState({
                  password: e.target.value
                });
              }}
              className="form-control"
              id="cname"
              name="fullname"
              minlength="5"
              type="password"
              required
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="form-group ">
          <label for="cname" className="control-label col-lg-2">
            Password <span className="required">*</span>
          </label>
          <div className="col-lg-10">
            <input
              disabled
              value={this.state.password}
              onChange={e => {
                this.setState({
                  password: e.target.value
                });
              }}
              className="form-control"
              id="cname"
              name="fullname"
              minlength="10"
              type="password"
              required
            />
          </div>
        </div>
      );
    }
  };
  renderUsername = () => {
    if (this.state.currType === "add") {
      return (
        <div className="form-group ">
          <label for="cname" className="control-label col-lg-2">
            Username <span className="required">*</span>
          </label>
          <div className="col-lg-10">
            <input
              value={this.state.username}
              onChange={e => {
                this.setState({
                  username: e.target.value
                });
              }}
              className="form-control"
              id="cname"
              name="fullname"
              minlength="5"
              type="text"
              required
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="form-group ">
          <label for="cname" className="control-label col-lg-2">
            Username <span className="required">*</span>
          </label>
          <div className="col-lg-10">
            <input
              disabled
              value={this.state.username}
              onChange={e => {
                this.setState({
                  username: e.target.value
                });
              }}
              className="form-control"
              id="cname"
              name="fullname"
              minlength="5"
              type="text"
              required
            />
          </div>
        </div>
      );
    }
  };
  render() {
    return (
      <section id="main-content">
        <div className="row">
          <div className="col-lg-12">
            <h3 className="page-header">
              <i className="fa fa-table" /> Table
            </h3>
            <ol className="breadcrumb">
              <li>
                <i className="fa fa-home" />
                <Link to="/">Home</Link>
              </li>
              <li>
                <i className="fa fa-table" />Table
              </li>
              <li>
                <i className="fa fa-th-list" />User Manager
              </li>
            </ol>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <section className="panel">
              <header className="panel-heading">Danh sách người dùng</header>
              <table className="table table-striped table-advance table-hover">
                <tbody>
                  <tr>
                    <th>
                      <i className="icon_profile" /> Username
                    </th>
                    <th>
                      <i className="icon_profile" /> Quyền hạn
                    </th>
                    <th>
                      <i className="icon_profile" /> Họ và tên
                    </th>
                    <th>
                      <i className="icon_profile" /> Email
                    </th>
                    <th>
                      <i className="icon_profile" /> Số điện thoại
                    </th>
                    <th>
                      <i className="icon_profile" /> Địa chỉ
                    </th>
                    <th>
                      <i className="icon_cogs" /> Lựa chọn
                    </th>
                  </tr>
                  {this.props.user.map((element, index) => {
                    if(element.type == "0"){
                      return (
                        <tr>
                          <td>{element.username}</td>
                          <td>Admin</td>
                          <td>{element.fullName}</td>
                          <td>{element.email}</td>
                          <td>{element.phone_number}</td>
                          <td>{element.address}</td>
                          <td>
                            <div className="btn-group">
                              <a
                                onClick={() =>
                                  this.setState({
                                    email: element.email,
                                    username: element.username,
                                    fullName: element.fullName,
                                    address: element.address,
                                    phone_number: element.phone_number,
                                    password: element.phone_number,
                                    type: element.type,
                                    currType: "update"
                                  })
                                }
                                className="btn btn-info"
                              >
                                <i className="icon_pencil" />
                              </a>
                              <a
                                onClick={() =>
                                  this.props.deleteUser(element.email)
                                }
                                className="btn btn-danger"
                              >
                                <i className="icon_close_alt2" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                    if(element.type == "1"){
                      return (
                        <tr>
                          <td>{element.username}</td>
                          <td>Salesman</td>
                          <td>{element.fullName}</td>
                          <td>{element.email}</td>
                          <td>{element.phone_number}</td>
                          <td>{element.address}</td>
                          <td>
                            <div className="btn-group">
                              <a
                                onClick={() =>
                                  this.setState({
                                    email: element.email,
                                    username: element.username,
                                    fullName: element.fullName,
                                    address: element.address,
                                    phone_number: element.phone_number,
                                    password: element.phone_number,
                                    type: element.type,
                                    currType: "update"
                                  })
                                }
                                className="btn btn-info"
                              >
                                <i className="icon_pencil" />
                              </a>
                              <a
                                onClick={() =>
                                  this.props.deleteUser(element.email)
                                }
                                className="btn btn-danger"
                              >
                                <i className="icon_close_alt2" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                    return (
                      <tr>
                        <td>{element.username}</td>
                          <td>Khách hàng</td>
                          <td>{element.fullName}</td>
                          <td>{element.email}</td>
                          <td>{element.phone_number}</td>
                          <td>{element.address}</td>
                        <td>
                          <div className="btn-group">
                            <a
                              onClick={() =>
                                this.setState({
                                  email: element.email,
                                  username: element.username,
                                  fullName: element.fullName,
                                  address: element.address,
                                  phone_number: element.phone_number,
                                  password: element.phone_number,
                                  type: element.type,
                                  currType: "update"
                                })
                              }
                              className="btn btn-info"
                            >
                              <i className="icon_pencil" />
                            </a>
                            <a
                              onClick={() =>
                                this.props.deleteUser(element.email)
                              }
                              className="btn btn-danger"
                            >
                              <i className="icon_close_alt2" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                   
                  })}
                </tbody>
              </table>
              {this.renderPagination()}
            </section>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <section className="panel">
              <header className="panel-heading">Thông tin người dùng</header>
              <div className="panel-body">
                <div className="form">
                  <div className="form-validate form-horizontal">
                    {this.renderUsername()}
                    {this.renderPassword()}
                    <div className="form-group ">
                      <label for="cname" className="control-label col-lg-2">
                        Họ và tên <span className="required">*</span>
                      </label>
                      <div className="col-lg-10">
                        <input
                          onChange={e => {
                            this.setState({
                              fullName: e.target.value
                            });
                          }}
                          value={this.state.fullName}
                          className="form-control"
                          id="cname"
                          name="fullname"
                          minlength="5"
                          type="text"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="cname" className="control-label col-lg-2">
                        Email <span className="required">*</span>
                      </label>
                      <div className="col-lg-10">
                        <input
                          onChange={e => {
                            this.setState({
                              email: e.target.value
                            });
                          }}
                          value={this.state.email}
                          className="form-control"
                          id="cname"
                          name="fullname"
                          minlength="5"
                          type="text"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="cname" className="control-label col-lg-2">
                        Số điện thoại <span className="required">*</span>
                      </label>
                      <div className="col-lg-10">
                        <input
                          onChange={e => {
                            this.setState({
                              phone_number: e.target.value
                            });
                          }}
                          value={this.state.phone_number}
                          className="form-control"
                          id="cname"
                          name="fullname"
                          minlength="5"
                          type="text"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="cname" className="control-label col-lg-2">
                        Địa chỉ <span className="required">*</span>
                      </label>
                      <div className="col-lg-10">
                        <input
                          onChange={e => {
                            this.setState({
                              address: e.target.value
                            });
                          }}
                          value={this.state.address}
                          className="form-control"
                          id="cname"
                          name="fullname"
                          minlength="5"
                          type="text"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label for="cname" className="control-label col-lg-2">
                        Quyền hạn <span className="required">*</span>
                      </label>
                      <div className="col-lg-10">
                        <form>
                          <label class="radio-inline">
                            <input
                              // checked={!this.state.type}
                              onClick={() => this.setState({ type: "0" })}
                              type="radio"
                              name="optradio"
                            />Admin
                          </label>
                          <label class="radio-inline">
                            <input
                              // checked={!this.state.type}
                              onClick={() => this.setState({ type: "1" })}
                              type="radio"
                              name="optradio"
                            />Nhân viên bán hàng
                          </label>
                          <label class="radio-inline">
                            <input
                              // checked={!this.state.type}
                              onClick={() => this.setState({ type: "2" })}
                              type="radio"
                              name="optradio"
                            />Khách hàng
                          </label>
                        </form>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-lg-offset-2 col-lg-10">
                        <p>{this.state.noti}</p>
                      </div>
                    </div>
                    {this.renderBtn()}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    );
  }
}
export default User;
