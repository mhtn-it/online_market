import { userTypes } from '../constants/action.types'
import { combineReducers } from 'redux'
import { shopTypes} from '../constants/action.types'
const shop = (state = {shopDetail: null}, action) => {
    switch (action.type) {
        case shopTypes.SET_SHOP_DETAIL: {
            return {
                ...state,
                shopDetail: action.shopDetail
            }
        }
        default: return state
    }
}
export default combineReducers({
    shop,
})