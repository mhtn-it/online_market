import axios from 'axios'
import { shopTypes } from '../constants/action.types'
import storeConfig from '../config/storage.config'
export const getShopDetail = (id) => async (dispatch, getState) => {
    let res
    try {
        res = await axios.get('http://localhost:8080/shop/' + id)
    }
    catch (err) {
        return
    }
    dispatch(setShopDetail(res.data.data))
}
export const setShopDetail = (shopDetail) => ({
    type: shopTypes.SET_SHOP_DETAIL,
    shopDetail
})