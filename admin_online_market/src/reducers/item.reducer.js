import { itemTypes } from '../constants/action.types'
import { combineReducers } from 'redux'
const category = (state = { data: [], page: 1, totalpage: null }, action) => {
    switch (action.type) {
        case itemTypes.SET_CATEGORY_ITEM: {
            return {
                ...state,
                data: action.data
            }
        }
        case itemTypes.ADD_CATEGORY_SUCCESS: {
            return {
                ...state,
                isadd: true
            }
        }
        case itemTypes.ADD_CATEGORY_FAIL: {
            return {
                ...state,
                isadd: false
            }
        }
        case itemTypes.UPDATE_CATEGORY_SUCCESS: {
            return {
                ...state,
                isupdate: true
            }
        }
        case itemTypes.UPDATE_CATEGORY_FAIL: {
            return {
                ...state,
                isupdate: false
            }
        }
        case itemTypes.RESET_CATEGORY: {
            return {
                ...state,
                isadd: null,
                isupdate: null
            }
        }
        case itemTypes.CATEGORY_SET_PAGE: {
            return {
                ...state,
                page: action.page
            }
        }
        case itemTypes.CATEGORY_SET_TOTAL_PAGE: {
            return {
                ...state,
                totalpage: action.totalpage
            }
        }
        case itemTypes.UPDATE_ISSEND_SUCCESS: {
            return {
                ...state,
                isupdate: true
            }
        }
        case itemTypes.UPDATE_ISSEND_FAIL: {
            return {
                ...state,
                isupdate: false
            }
        }
        default: return state
    }
}
const producer = (state = { data: [], page: 1, totalpage: null }, action) => {
    switch (action.type) {
        case itemTypes.SET_PRODUCER: {
            return {
                ...state,
                data: action.data
            }
        }
        case itemTypes.ADD_PRODUCER_SUCCESS: {
            return {
                ...state,
                isadd: true
            }
        }
        case itemTypes.ADD_PRODUCER_FAIL: {
            return {
                ...state,
                isadd: false
            }
        }
        case itemTypes.UPDATE_PRODUCER_SUCCESS: {
            return {
                ...state,
                isupdate: true
            }
        }
        case itemTypes.UPDATE_PRODUCER_FAIL: {
            return {
                ...state,
                isupdate: false
            }
        }
        case itemTypes.RESET_PRODUCER: {
            return {
                ...state,
                isadd: null,
                isupdate: null
            }
        }
        case itemTypes.PRODUCER_SET_PAGE: {
            return {
                ...state,
                page: action.page
            }
        }
        case itemTypes.PRODUCER_SET_TOTAL_PAGE: {
            return {
                ...state,
                totalpage: action.totalpage
            }
        }
        default: return state
    }
}
const shop = (state = {data: [], page: 1, totalpage: null}, action) => {
    switch(action.type) {
        case itemTypes.SET_SHOP: {
            return {
                ...state,
                data: action.data
            }
        }
        case itemTypes.ADD_SHOP_SUCCESS: {
            return {
                ...state,
                isadd: true
            }
        }
        case itemTypes.ADD_SHOP_FAIL: {
            return {
                ...state,
                isadd: false
            }
        }
        case itemTypes.UPDATE_SHOP_SUCCESS: {
            return {
                ...state,
                isupdate: true
            }
        }
        case itemTypes.UPDATE_SHOP_FAIL: {
            return {
                ...state,
                isupdate: false
            }
        }
        case itemTypes.RESET_SHOP: {
            return {
                ...state,
                isadd: null,
                isupdate: null
            }
        }
        case itemTypes.SHOP_SET_PAGE: {
            return {
                ...state,
                page: action.page
            }
        }
        case itemTypes.SHOP_SET_TOTAL_PAGE: {
            return {
                ...state,
                totalpage: action.totalpage
            }
        }
        default: return state
    }
}
const bill = (state = { data: [], page: 1, totalpage: null}, action) => {
    switch(action.type) {
        case itemTypes.BILL_SET_PAGE: {
            return {
                ...state,
                page: action.page
            }
        }
        case itemTypes.BILL_SET_TOTAL_PAGE: {
            return {
                ...state,
                totalpage: action.totalpage
            }
        }
        case itemTypes.BILL_SET_DATA: {
            return {
                ...state,
                data: action.data
            }
        }
        default: return state
    }
}
const item = (state = {
    data: [], page: 1, totalpage: null
}, action) => {
    switch(action.type){
        case itemTypes.SET_ITEM: {
            return {
                ...state, 
                data: action.data
            }
        }
        case itemTypes.SET_PAGE: {
            return {
                ...state,
                page: action.page
            }
        }
        case itemTypes.SET_TOTAL_PAGE: {
            return {
                ...state,
                totalpage: action.totalpage
            }
        }
        case itemTypes.ADD_ITEM_SUCCESS: {
            return {
                ...state,
                isadd: true
            }
        }
        case itemTypes.ADD_ITEM_FAIL: {
            return {
                ...state,
                isadd: false
            }
        }
        case itemTypes.UPDATE_ITEM_SUCCESS: {
            return {
                ...state,
                isupdate: true
            }
        }
        case itemTypes.UPDATE_ITEM_FAIL: {
            return {
                ...state,
                isupdate: false
            }
        }
        case itemTypes.RESET_ITEM: {
            return {
                ...state,
                isadd: null,
                isupdate: null
            }
        }
        default: return state
    }
}
export default combineReducers({
    category,
    producer,
    item, 
    shop,
    bill
})