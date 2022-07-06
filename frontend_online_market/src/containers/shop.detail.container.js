import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ShopDetail from '../components/shop.detail/shop.detail'
import * as shopActions from '../actions/shop.action'
import Loading from '../components/loading/loading'
class ShopDetailContainer extends Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        
    }
    componentWillReceiveProps(nextProps) {

    }
    
    render() {
        if(this.props.mshopDetail) {
            return (
                <div>
                    <ShopDetail
                        mshopDetail={this.props.mshopDetail}
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
    mshopDetail: state.shopReducers.shop.shopDetail,
})
const mapDispatchToProps = dispatch => {
    return ({
        shops: bindActionCreators(shopActions, dispatch),
    })
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ShopDetailContainer)