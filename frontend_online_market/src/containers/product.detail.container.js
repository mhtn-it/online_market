import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ProductDetail from '../components/product.detail/product.detail'
import * as productActions from '../actions/product.action'
import * as homeActions from '../actions/home.action'
import * as userActions from '../actions/user.action'
import Loading from '../components/loading/loading'
class ProductDetailContainer extends Component {
    constructor(props) {
        super(props)

    }
    componentWillMount() {
        this.props.actions.auth()
        this.props.homeActions.getCategory()
        this.props.homeActions.getProducer()
        this.props.productActions.getItemDetail(this.props.match.params.id)
        this.props.productActions.getItemRelated(this.props.match.params.id)
        this.props.productActions.getCommentByIDItem(this.props.match.params.id)
        
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.mproductDetail !== null ) {
            this.props.productActions.getNameCategoryByID(nextProps.mproductDetail.id_category)
            this.props.productActions.getNameProducerByID(nextProps.mproductDetail.id_producer)
            this.props.productActions.getNameShopByID(nextProps.mproductDetail.id_shop)
        }
        if(nextProps.page !== this.props.page) {
            this.props.productActions.getCommentByIDItem(this.props.match.params.id)
        }

    }
    
    render() {
        if(this.props.mproductDetail && this.props.nameCategory && this.props.nameProducer && this.props.nameShop) {
            return (
                <div>
                    <ProductDetail
                        category={this.props.category}
                        producer={this.props.producer}
                        mproductDetail={this.props.mproductDetail}
                        nameCategory={this.props.nameCategory}
                        nameProducer={this.props.nameProducer}
                        islogin={this.props.islogin}
                        setSearchText={(value) => this.props.homeActions.setSearchText(value)}
                        sortType={this.props.sortType}
                        setSortType={(value) => this.props.homeActions.setSortType(value)}
                        searchTextSubmit={() => this.props.homeActions.searchTextSubmit()}
                        itemrelated={this.props.itemrelated}
                        logout={() => this.props.actions.logout()}
                        id_item={this.props.match.params.id}
                        submitComment={(name, comment, id_item) => this.props.productActions.submitComment(name, comment, id_item)}
                        comment={this.props.comment}
                        nameShop={this.props.nameShop}
                        addToCart={(product) => this.props.productActions.addToCart(product)}
                        totalpage={this.props.totalpage}
                        page={this.props.page}
                        backPage={() => this.props.productActions.backPage()}
                        nextPage={() => this.props.productActions.nextPage()}
                        setPage={(page) => this.props.productActions.setPage(page)}
                        history={this.props.history}
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
    category: state.homeReducers.category.data,
    producer: state.homeReducers.producer.data,
    mproductDetail: state.productReducers.product.productDetail,
    nameCategory: state.productReducers.product.nameCategory,
    nameProducer: state.productReducers.product.nameProducer,
    nameShop: state.productReducers.product.nameShop,
    islogin: state.userReducers.login.islogin,
    itemrelated: state.productReducers.product.itemrelated,
    comment: state.productReducers.product.comment,
    totalpage: state.productReducers.product.totalpage,
    page: state.productReducers.product.page,
})
const mapDispatchToProps = dispatch => {
    return ({
        actions: bindActionCreators(userActions, dispatch),
        homeActions: bindActionCreators(homeActions, dispatch),
        productActions: bindActionCreators(productActions, dispatch)
    })
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProductDetailContainer)