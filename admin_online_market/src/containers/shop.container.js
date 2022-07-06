import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as itemActions from "../actions/item.action";
import Shop from "../components/shop/shop";
import NavbarContainer from "./navbar.container";
import Slider from "./slider.container";
import * as userActions from "../actions/user.action";
class ShopContainer extends Component {
  constructor() {
    super();
  }
  async componentWillMount() {
    this.props.itemActions.getShop();
    let res = await this.props.userActions.auth();
    if (res === false) this.props.history.push("/login");
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.islogin !== this.props.islogin &&
      nextProps.islogin === false
    ) {
      this.props.history.push("/login");
    }
    if (nextProps.page !== this.props.page) {
      this.props.itemActions.getShop();
    }
  }
  render() {
    return (
      <section id="container" className="">
        <NavbarContainer />
        <Slider />
        <Shop
          shop={this.props.shop}
          isadd={this.props.isadd}
          addShop={(name, address, phone_number, describe, file) => this.props.itemActions.addShop(name, address, phone_number, describe, file)}
          updateShop={(id, name, address, phone_number, describe, file) =>
            this.props.itemActions.updateShop(id, name, address, phone_number, describe, file)
          }
          deleteShop={id => this.props.itemActions.deleteShop(id)}
          isupdate={this.props.isupdate}
          page={this.props.page}
          totalpage={this.props.totalpage}
          backPage={() => this.props.itemActions.shopBackPage()}
          nextPage={() => this.props.itemActions.shopNextPage()}
          setPage={page => this.props.itemActions.shopSetPage(page)}
        />
      </section>
    );
  }
}
const mapStateToProps = state => ({
  shop: state.itemReducers.shop.data,
  isadd: state.itemReducers.shop.isadd,
  isupdate: state.itemReducers.shop.isupdate,
  islogin: state.userReducers.user.islogin,
  totalpage: state.itemReducers.shop.totalpage,
  page: state.itemReducers.shop.page
});

const mapDispatchToProps = dispatch => {
  return {
    itemActions: bindActionCreators(itemActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopContainer);
