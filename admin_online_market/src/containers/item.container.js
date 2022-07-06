import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as itemActions from "../actions/item.action";
import Item from "../components/item/item";
import NavbarContainer from "./navbar.container";
import Slider from "./slider.container";
import * as userActions from "../actions/user.action";
class ItemContainer extends Component {
  async componentWillMount() {
    this.props.itemActions.getCategory();
    this.props.itemActions.getProducer();
    this.props.itemActions.getItem();
    this.props.itemActions.getShop();
    let res = await this.props.userActions.auth();
    if (res === false) this.props.history.push("/login");
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.page !== this.props.page) {
      this.props.itemActions.getItem();
    }
    if (
      nextProps.islogin !== this.props.islogin &&
      nextProps.islogin === false
    ) {
      this.props.history.push("/login");
    }
  }
  render() {
    return (
      <section id="container" className="">
        <NavbarContainer />
        <Slider />
        <Item
          item={this.props.item}
          totalpage={this.props.totalpage}
          page={this.props.page}
          category={this.props.category}
          producer={this.props.producer}
          shop={this.props.shop}
          deleteItem={id => this.props.itemActions.deleteItem(id)}
          backPage={() => this.props.itemActions.backPage()}
          nextPage={() => this.props.itemActions.nextPage()}
          setPage={page => this.props.itemActions.setPage(page)}
          isadd={this.props.isadd}
          isupdate={this.props.isupdate}
          addItem={(
            id_category, name, price, release_date, describe, id_producer, id_shop, file
          ) =>
            this.props.itemActions.addItem(
              id_category, name, price, release_date, describe, id_producer, id_shop, file
            )
          }
          updateItem={(
            id, name, id_category, price, release_date, describe, id_producer, id_shop, file
          ) =>
            this.props.itemActions.updateItem(
              id, name, id_category, price, release_date, describe, id_producer, id_shop, file
            )
          }
        />
      </section>
    );
  }
}
const mapStateToProps = state => ({
  item: state.itemReducers.item.data,
  totalpage: state.itemReducers.item.totalpage,
  page: state.itemReducers.item.page,
  category: state.itemReducers.category.data,
  producer: state.itemReducers.producer.data,
  shop: state.itemReducers.shop.data,
  isadd: state.itemReducers.item.isadd,
  isupdate: state.itemReducers.item.isupdate,
  islogin: state.userReducers.user.islogin
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
)(ItemContainer);
