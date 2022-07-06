import axios from 'axios'
import { productTypes } from '../constants/action.types'
import storeConfig from '../config/storage.config'
export const getItemDetail = (id) => async (dispatch, getState) => {
    let res
    try {
        res = await axios.get('http://localhost:8080/item/' + id)
    }
    catch (err) {
        return
    }
    dispatch(setProductDetail(res.data.data))
}

export const getItemRelated = (id) => async (dispatch, getState) => {
    let res
    try {
        res = await axios.get('http://localhost:8080/item/related/' + id)
    }
    catch (err) {
        return
    }
    dispatch(setItemRelated(res.data.data))
}
export const getNameCategoryByID = (id) => async (dispatch) => {
    let res
    try {
        res = await axios.get('http://localhost:8080/category/name/' + id)
    }
    catch (err) {
        return
    }
    dispatch(setNameCategory(res.data.name))
}
export const getNameProducerByID = (id) => async (dispatch) => {
    let res
    try {
        res = await axios.get('http://localhost:8080/producer/name/' + id)
    }
    catch (err) {
        return
    }

    dispatch(setNameProducer(res.data.name))
}
export const getNameShopByID = (id) => async (dispatch) => {
    let res
    try {
        res = await axios.get('http://localhost:8080/shop/name/' + id)
    }
    catch (err) {
        return
    }

    dispatch(setNameShop(res.data.name))
}
export const setProductDetail = (productDetail) => ({
    type: productTypes.SET_PRODUCT_DETAIL,
    productDetail
})
export const setNameCategory = (name) => ({
    type: productTypes.SET_NAME_CATEGORY,
    name
})
export const setNameProducer = (name) => ({
    type: productTypes.SET_NAME_PRODUCER,
    name
})

export const setItemRelated = (itemrelated) => ({
    type: productTypes.SET_ITEM_RELATED,
    itemrelated
})
export const setNameShop = (name) => ({
    type: productTypes.SET_NAME_SHOP,
    name
})

export const submitComment = (name, comment, id_item) => async (dispatch, getState) => {
    let id = null
    if (storeConfig.getUser() && storeConfig.getUser().id && storeConfig.getUser().id)
        id = storeConfig.getUser().id
    let res
    try {
        res = await axios.post('http://localhost:8080/comment', {
            id_user: id,
            id_item: id_item,
            name: name,
            comment: comment
        })
    }
    catch (err) {
        console.log(JSON.stringify(err.response))
        return
    }
    dispatch(getCommentByIDItem(id_item))
}
export const setTotalPage = (totalpage) => ({
    type: productTypes.SET_TOTAL_PAGE,
    totalpage
})
export const setPage = (page) => ({
    type: productTypes.SET_PAGE,
    page
})
export const backPage = () => (dispatch, getState) => {
    let page = getState().productReducers.product.page
    if(page > 1) {
        dispatch(setPage(parseInt(page) - 1))
    }
}

export const nextPage = () => (dispatch, getState) => {
    let page = getState().productReducers.product.page
    let totalpage = getState().productReducers.product.totalpage
    if(page < totalpage) {
        dispatch(setPage(parseInt(page) + 1))
    }
}
export const getCommentByIDItem = (id) => async (dispatch, getState) => {
    let res
    try {
        res = await axios.post('http://localhost:8080/comment/' + id, {
             id_item: id,
             page: getState().productReducers.product.page
            })
    }
    catch (err) {
        console.log(JSON.stringify(err.response))
        return
    }
    dispatch(setTotalPage(res.data.totalPage))
    dispatch(setComment(res.data.data))
}
export const setComment = (data) => ({
    type: productTypes.SET_COMMENT,
    data
})

export const addToCart = (product) => async (dispatch, getState) => {
    if (getState().userReducers.login.islogin) {
        let res
        try {
            res = await axios.post('http://localhost:8080/cart/addtocard', {
                id_user: storeConfig.getUser().id,
                products: [product]
            })
        }
        catch (err) {
            console.log(JSON.stringify(err.response))
            return
        }
    } else {
        storeConfig.addProductToCart(product)
    }
}
