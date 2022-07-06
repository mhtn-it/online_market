import { userTypes } from '../constants/action.types'
import { combineReducers } from 'redux'
import { productTypes} from '../constants/action.types'
const product = (state = {productDetail: null, itemrelated: [], comment: [], page: 1, totalpage: null}, action) => {
    switch (action.type) {
        case productTypes.SET_PRODUCT_DETAIL: {
            return {
                ...state,
                productDetail: action.productDetail
            }
        }
        case productTypes.SET_NAME_CATEGORY: {
            return {
                ...state,
                nameCategory: action.name
            }
        }
        case productTypes.SET_NAME_PRODUCER: {
            return {
                ...state,
                nameProducer: action.name
            }
        }
        case productTypes.SET_NAME_SHOP: {
            return {
                ...state, 
                nameShop: action.name
            }
        }
        case productTypes.SET_ITEM_RELATED: {
            return {
                ...state,
                itemrelated: action.itemrelated
            }
        }
        case productTypes.SET_COMMENT: {
            return {
                ...state,
                comment: action.data
            }
        }
        case productTypes.SET_PAGE: {
            return {
                ...state,
                page: action.page
            }
        }
        case productTypes.SET_TOTAL_PAGE: {
            return {
                ...state,
                totalpage: action.totalpage
            }
        }
        default: return state
    }
}
export default combineReducers({
    product,
})