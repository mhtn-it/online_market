import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import axios from 'axios'
import Home from '../components/home/home'
import * as userActions from '../actions/user.action'
import * as homeActions from '../actions/home.action'
import * as productActions from '../actions/product.action'
import Loading from '../components/loading/loading'
import {sortTypes} from '../constants/action.types'
import localStore from '../config/storage.config'
class HomeContainer extends React.Component {
    constructor(props) {
        super(props)

    }
    componentWillMount() {
        this.props.actions.auth()
        this.props.homeActions.getCategory()
        this.props.homeActions.getProducer()
        this.props.homeActions.getItem()
        this.props.homeActions.getShop()
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.page !== this.props.page) {
            this.props.homeActions.getItem()
        }
    }
    
    render() {
        const {category, producer, item, totalpage} = this.props
        if(category !== null && producer !== null && item !== null && totalpage !== null) {
            return (
                <div>
                    <Home
                        islogin={this.props.islogin}
                        logout={() => this.props.actions.logout()}
                        category={this.props.category}
                        producer={this.props.producer}
                        item={this.props.item}
                        totalpage={this.props.totalpage}
                        backPage={() => this.props.homeActions.backPage()}
                        nextPage={() => this.props.homeActions.nextPage()}
                        setPage={(page) => this.props.homeActions.setPage(page)}
                        page={this.props.page}
                        sortType={this.props.sortType}
                        setSortType={(value) => this.props.homeActions.setSortType(value)}
                        setRangeType={(range) => this.props.homeActions.setRangeType(range)}
                        title={this.props.title}
                        setTitle={(title) => this.props.homeActions.setTitle(title)}
                        setBranch={(branch) => this.props.homeActions.setBranch(branch)}
                        branch={this.props.branch}
                        setSearchText={(value) => this.props.homeActions.setSearchText(value)}
                        shop={this.props.shop}
                        setIDBranch={(id) => this.props.homeActions.setIDBranch(id)}
                        branchClick={(branch, id) => this.props.homeActions.branchClick(branch, id)}
                        history={this.props.history}
                        searchTextSubmit={() => this.props.homeActions.searchTextSubmit()}
                        addToCart={(product) => this.props.productActions.addToCart(product)}
                    />
                </div>
            )
        }
        else {
            return (
                <Loading/>
            )
        }
    }
}
const mapStateToProps = state => ({
    islogin: state.userReducers.login.islogin,
    category: state.homeReducers.category.data,
    producer: state.homeReducers.producer.data,
    shop: state.homeReducers.shop.data,
    item: state.homeReducers.item.data, 
    totalpage: state.homeReducers.item.totalpage,
    page: state.homeReducers.item.page, 
    sortType: state.homeReducers.item.sortType,
    title: state.homeReducers.item.title,
    branch: state.homeReducers.item.branch
})

const mapDispatchToProps = dispatch =>{
    return ({
        actions: bindActionCreators(userActions, dispatch),
        homeActions: bindActionCreators(homeActions, dispatch),
        productActions: bindActionCreators(productActions, dispatch)
    })
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeContainer)