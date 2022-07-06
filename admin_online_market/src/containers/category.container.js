import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as itemActions from '../actions/item.action'
import Category from '../components/category/category'
import NavbarContainer from "./navbar.container";
import Slider from "./slider.container";
import * as userActions from "../actions/user.action";
class CategoryContainer extends Component {
    constructor() {
        super()
    }
    async componentWillMount() {
        this.props.itemActions.getCategory()
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
            this.props.itemActions.getCategory();
          }
      }
    render() {
        return (
            <section id="container" className="">
            <NavbarContainer/>
            <Slider/>
            <Category
                category={this.props.category}
                addCategory={(name) => this.props.itemActions.addCategory(name)}
                isadd={this.props.isadd}
                updateCategory={(id, name) => this.props.itemActions.updateCategory(id, name)}
                isupdate={this.props.isupdate}
                page={this.props.page}
                totalpage={this.props.totalpage}
                backPage={() => this.props.itemActions.categoryBackPage()}
                nextPage={() => this.props.itemActions.categoryNextPage()}
                setPage={page => this.props.itemActions.categorySetPage(page)}
            />
            </section>
            
        )
    }
}
const mapStateToProps = state => ({
    category: state.itemReducers.category.data,
    isadd: state.itemReducers.category.isadd,
    isupdate: state.itemReducers.category.isupdate,
    islogin: state.userReducers.user.islogin,
    totalpage: state.itemReducers.category.totalpage,
    page: state.itemReducers.category.page
})

const mapDispatchToProps = dispatch => {
    return ({
        itemActions: bindActionCreators(itemActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch)
    })
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryContainer)