import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as itemActions from "../actions/item.action";
import Producer from "../components/producer/producer";
import NavbarContainer from "./navbar.container";
import Slider from "./slider.container";
import * as userActions from "../actions/user.action";
class ProducerContainer extends Component {
  constructor() {
    super();
  }
  async componentWillMount() {
    this.props.itemActions.getProducer();
    let res = await this.props.userActions.auth()
        if (res === false)
            this.props.history.push('/login')
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.islogin !== this.props.islogin &&
      nextProps.islogin === false
    ) {
      this.props.history.push("/login");
    }
    if (nextProps.page !== this.props.page) {
      this.props.itemActions.getProducer();
    }
  }
  render() {
    return (
      <section id="container" className="">
        <NavbarContainer />
        <Slider />
        <Producer
          producer={this.props.producer}
          isadd={this.props.isadd}
          addProducer={name => this.props.itemActions.addProducer(name)}
          updateProducer={(id, name) =>
            this.props.itemActions.updateProducer(id, name)
          }
          isupdate={this.props.isupdate}
          page={this.props.page}
          totalpage={this.props.totalpage}
          backPage={() => this.props.itemActions.producerBackPage()}
          nextPage={() => this.props.itemActions.producerNextPage()}
          setPage={page => this.props.itemActions.producerSetPage(page)}
        />
      </section>
    );
  }
}
const mapStateToProps = state => ({
  producer: state.itemReducers.producer.data,
  isadd: state.itemReducers.producer.isadd,
  isupdate: state.itemReducers.producer.isupdate,
  totalpage: state.itemReducers.producer.totalpage,
  page: state.itemReducers.producer.page,
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
)(ProducerContainer);
