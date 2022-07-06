import React, { Component } from "react";
import { Link } from "react-router-dom";
class Shop extends Component {
  constructor() {
    super();
    this.state = {
      pagination: [],
      shop: null,
      currname: null,
      name: null,
      id: null,
      noti: null,
      currType: 'add',
      address: "",
      phone_number: "",
      describe: "",
      file: null,
      imagePreviewUrl: null,
      certificate: "",
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
    if (nextProps.shop !== null) {
      this.setState({
        imagePreviewUrl: nextProps.shop.certificate
      });
    }
    if (nextProps.isadd === true) {
      this.reset()
    } 
    if(nextProps.isupdate === true) {
      this.reset()
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
  handleChangeImg = certificate => {
    if(certificate === undefined)
      return
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        file: certificate,
        certificate: reader.result
      });
    };
    reader.readAsDataURL(certificate);
  };
  submitAddShop = () => {
    const {
      name, address, phone_number, describe, file
    } = this.state;
    if (name.length <= 0) {
      this.setState({
        noti: "Name invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (address === null) {
      this.setState({
        noti: "Address invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (phone_number === null) {
      this.setState({
        noti: "Phone number invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (file === null) {
      this.setState({
        noti: "File invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    this.props.addShop(
      name,
      address,
      phone_number,
      describe,
      file
    );
  };
  submitUpdateShop = () => {
    const {
      id, 
      name, 
      address, 
      phone_number, 
      describe, 
      file,
      certificate
    } = this.state;
    if (name.length <= 0) {
      this.setState({
        noti: "Name invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (address === null) {
      this.setState({
        noti: "Address invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (phone_number === null) {
      this.setState({
        noti: "Phone number invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (file === null && certificate === '' ) {
      this.setState({
        noti: "File invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    this.props.updateShop(
      id, name, address, phone_number, describe, file
    );
  };
  renderBtn = () => {
    if (this.state.currType === "add") {
      return (
        <div className="form-group">
          <div className="col-lg-offset-2 col-lg-10">
            <button
              onClick={() => this.submitAddShop()}
              className="btn-custom"
              type="submit"
            >
              Add
            </button>
            <button className="btn-custom" disabled type="button">
              Update
            </button>
            <button className="btn-custom" onClick={() => this.reset()}>Reset</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="form-group">
          <div className="col-lg-offset-2 col-lg-10">
            <button className="btn-custom" disabled type="submit">
              Add
            </button>
            <button
              className="btn-custom"
              onClick={() => this.submitUpdateShop()}
              type="button"
            >
              Update
            </button>
            <button className="btn-custom" onClick={() => this.reset()}>Reset</button>
          </div>
        </div>
      );
    }
  };
  reset = () => {
      this.setState({
        shop: null,
        currname: null,
        name: null,
        id: null,
        noti: null,
        currType: 'add',
        address: "",
        phone_number: "",
        describe: "",
        file: null,
        imagePreviewUrl: null,
        certificate: "",
        name: ""
      })
  }
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
                <i className="fa fa-th-list" />Shop Manager
              </li>
            </ol>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <section className="panel">
              <header className="panel-heading">Danh sách Cửa hàng</header>
              <table className="table table-striped table-advance table-hover">
                <tbody>
                  <tr>
                    <th>
                      <i className="icon_profile" /> Name
                    </th>
                    <th>
                      <i className="icon_profile" /> Phone Number
                    </th>
                    <th>
                      <i className="icon_profile" /> Address
                    </th>
                    <th>
                      <i className="icon_profile" /> Describe
                    </th>
                    <th>
                      <i className="icon_cogs" /> Action
                    </th>
                  </tr>
                  {this.props.shop.map((element, index) => {
                    return (
                      <tr>
                        <td>{element.name}</td>
                        <td>{element.phone_number}</td>
                        <td style={{ width: "30%" }}>{element.address}</td>
                        <td style={{ width: "35%" }}>{element.describe}</td>
                        <td>
                          <div className="btn-group">
                            <a
                              onClick={() =>
                                this.setState({
                                  currType: "update",
                                  currname: element.name,
                                  name: element.name,
                                  id: element._id,
                                  certificate: element.certificate,
                                  id: element._id,
                                  address: element.address,
                                  describe: element.describe,
                                  phone_number: element.phone_number,
                                })
                              }
                              className="btn btn-info"
                            >
                              <i className="icon_pencil" />
                            </a>
                            {/* ??? */}
                            <a
                              onClick={() => this.props.deleteShop(element._id)}
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
              <header className="panel-heading">Thông tin sản phẩm</header>
              <div className="panel-body">
                <div className="form" id="form-shop">
                    <div
                      className="form-validate form-horizontal"
                      id="feedback_form"
                      method="get"
                      action=""
                    >
                    <div className="form-group ">
                      <label for="cname" className="control-label col-lg-2">
                        Tên <span className="required">*</span>
                      </label>
                      <div className="col-lg-10">
                        <input
                          onChange={e => {
                            this.setState({
                              name: e.target.value
                            });
                          }}
                          value={this.state.name}
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
                      <label for="cphone" className="control-label col-lg-2">
                        Số điện thoại <span className="required">*</span>
                      </label>
                      <div className="col-lg-10">
                        <input
                          value={this.state.phone_number}
                          onChange={e => {
                            this.setState({
                              phone_number: e.target.value
                            });
                          }}
                          className="form-control"
                          id="cphone"
                          name="phone"
                          minlength="5"
                          type="text"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="cadd" className="control-label col-lg-2">
                        Địa chỉ <span className="required">*</span>
                      </label>
                      <div className="col-lg-10">
                        <input
                          value={this.state.address}
                          onChange={e => {
                            this.setState({
                              address: e.target.value
                            });
                          }}
                          className="form-control"
                          id="cadd"
                          name="add"
                          minlength="5"
                          type="text"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="cdes" className="control-label col-lg-2">
                        Mô tả <span className="required">*</span>
                      </label>
                      <div className="col-lg-10">
                        <textarea
                          value={this.state.describe}
                          onChange={e => {
                            this.setState({
                              describe: e.target.value
                            });
                          }}
                          className="form-control"
                          id="cdes"
                          name="des"
                          minlength="5"
                          type="text"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="cimg" className="control-label col-lg-2">
                        Upload Giấy chứng nhận{" "} <span className="required">*</span>
                      </label>
                      <div className="col-lg-10">
                        <input
                          className="form-control "
                          type="file"
                          id="cimg"
                          name="img"
                          required
                          onChange={e =>
                            this.handleChangeImg(e.target.files[0])
                          }
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="comment" className="control-label col-lg-2">
                        Giấy chứng nhận
                      </label>
                      <div className="col-lg-10">
                        <img
                          src={this.state.certificate}
                          style={{ maxWidth: "300px" }}
                        />
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
export default Shop;
