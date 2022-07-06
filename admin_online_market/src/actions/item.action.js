import axios from 'axios'
import { itemTypes } from '../constants/action.types'
export const getItem = () => async (dispatch, getState) => {
    let res
    try {
        res = await axios.post('http://localhost:8080/item/allitem', {
            page: getState().itemReducers.item.page,
            range: null
        })
    }
    catch (err) {
        console.log(err)
        return
    }
    dispatch(setItem(res.data.data))
    dispatch(setTotalPage(res.data.totalPage))
}
export const setItem = (data) => ({
    type: itemTypes.SET_ITEM,
    data
})
export const setPage = (page) => ({
    type: itemTypes.SET_PAGE,
    page
})
export const setTotalPage = (totalpage) => ({
    type: itemTypes.SET_TOTAL_PAGE,
    totalpage
})
export const shopSetPage = (page) => ({
    type: itemTypes.SHOP_SET_PAGE,
    page
})
export const shopSetTotalPage = (totalpage) => ({
    type: itemTypes.SHOP_SET_TOTAL_PAGE,
    totalpage
})
export const categorySetPage = (page) => ({
    type: itemTypes.CATEGORY_SET_PAGE,
    page
})
export const categorySetTotalPage = (totalpage) => ({
    type: itemTypes.CATEGORY_SET_TOTAL_PAGE,
    totalpage
})
export const producerSetPage = (page) => ({
    type: itemTypes.PRODUCER_SET_PAGE,
    page
})
export const producerSetTotalPage = (totalpage) => ({
    type: itemTypes.PRODUCER_SET_TOTAL_PAGE,
    totalpage
})
export const deleteItem = (id) => async(dispatch, getState) => {
    let res
    try {
        res = await axios.get('http://localhost:8080/admin/deleteitem/' + id)
    }
    catch (err) {
        console.log(err)
        return
    }
    console.log(res)
    dispatch(getItem())
}

export const deleteShop = (id) => async(dispatch, getState) => {
    let res
    try {
        res = await axios.get('http://localhost:8080/admin/deleteshop/' + id)
    }
    catch (err) {
        console.log(err)
        return
    }
    console.log(res)
    dispatch(getShop())
}

export const getCategory = () => async (dispatch, getState) =>  {
    let res
    try {
        res = await axios.get('http://localhost:8080/category/all/' + getState().itemReducers.category.page)
    }
    catch (err) {
        return
    }
    dispatch(setCategory(res.data.data))
    dispatch(categorySetTotalPage(res.data.totalPage))
}

export const getProducer = () => async (dispatch, getState) => {
    let res
    try {
        res = await axios.get('http://localhost:8080/producer/all/' + getState().itemReducers.producer.page)
    }
    catch (err) {
        return
    }
    dispatch(setProducer(res.data.data))
    dispatch(producerSetTotalPage(res.data.totalPage))
}

export const getShop = () => async (dispatch, getState) => {
    let res
    try {
        res = await axios.get('http://localhost:8080/shop/all/' + getState().itemReducers.shop.page)
    }
    catch(err) {
        return
    }
    dispatch(setShop(res.data.data))
    dispatch(shopSetTotalPage(res.data.totalPage))
}

export const setCategory = (data) => ({
    type: itemTypes.SET_CATEGORY_ITEM,
    data
})

export const setProducer = (data) => ({
    type: itemTypes.SET_PRODUCER,
    data
})

export const setShop = (data) => ({
    type: itemTypes.SET_SHOP,
    data
})
export const addCategorySuccess = () =>({
    type: itemTypes.ADD_CATEGORY_SUCCESS
})
export const addCategotyFail = () => ({
    type: itemTypes.ADD_CATEGORY_FAIL
})
export const updateCategorySuccess = () => ({
    type: itemTypes.UPDATE_CATEGORY_SUCCESS
})
export const updateCategoryFail = () => ({
    type: itemTypes.UPDATE_CATEGORY_FAIL
})
export const resetCategory = () => ({
    type: itemTypes.RESET_CATEGORY
})
export const addCategory =  (name) => async (dispatch, getState) => {
    dispatch(resetCategory())
    let res
    try {
        res = await axios.post('http://localhost:8080/admin/addcategory', {
            name: name
        })
    }
    catch(err) {
        dispatch(addCategotyFail())
        return
    } 
    dispatch(addCategorySuccess())
    dispatch(getCategory())
}

export const updateCategory =  (id, name) => async (dispatch, getState) => {
    let res
    try {
        res = await axios.post('http://localhost:8080/admin/updatecategory', {
            id: id,
            name: name
        })
    }
    catch(err) {
        dispatch(updateCategoryFail())
        return
    } 
    dispatch(updateCategorySuccess())
    dispatch(getCategory())
}
export const addShopSuccess = () =>({
    type: itemTypes.ADD_SHOP_SUCCESS
})
export const addShopFail = () => ({
    type: itemTypes.ADD_SHOP_FAIL
})
export const updateShopSuccess = () => ({
    type: itemTypes.UPDATE_SHOP_SUCCESS
})
export const updateShopFail = () => ({
    type: itemTypes.UPDATE_SHOP_FAIL
})
export const resetShop = () => ({
    type: itemTypes.RESET_SHOP
})
export const addShop =  (name, address, phone_number, describe, file) => async (dispatch, getState) => {
    dispatch(resetShop())
    let data = new FormData()
    data.append('file', file)
    data.append('describe', describe)
    data.append('name', name)
    data.append('address', address)
    data.append('phone_number', phone_number)

    let res
    try {
        res = await axios.post('http://localhost:8080/admin/addshop', data)
    }
    catch(err) {
        dispatch(addShopFail())
        return
    } 
    dispatch(addShopSuccess())
    dispatch(getShop())
}

export const updateShop =  (id, name, address, phone_number, describe, file) => async (dispatch, getState) => {
    let data = new FormData()
    data.append('id', id)
    data.append('name', name)
    data.append('address', address)
    data.append('phone_number', phone_number)
    data.append('describe', describe)
    data.append('file', file)
    let res
    try {
        res = await axios.post('http://localhost:8080/admin/updateshop', data)
    }
    catch(err) {
        dispatch(updateShopFail())
        return
    } 
    dispatch(updateShopSuccess())
    dispatch(getShop())
}
export const addProducerSuccess = () =>({
    type: itemTypes.ADD_PRODUCER_SUCCESS
})
export const addProducerFail = () => ({
    type: itemTypes.ADD_PRODUCER_FAIL
})
export const updateProducerSuccess = () => ({
    type: itemTypes.UPDATE_PRODUCER_SUCCESS
})
export const updateProducerFail = () => ({
    type: itemTypes.UPDATE_PRODUCER_FAIL
})
export const resetProducer = () => ({
    type: itemTypes.RESET_PRODUCER
})
export const addProducer =  (name) => async (dispatch, getState) => {
    dispatch(resetProducer())
    let res
    try {
        res = await axios.post('http://localhost:8080/admin/addproducer', {
            name: name
        })
    }
    catch(err) {
        dispatch(addProducerFail())
        return
    } 
    dispatch(addProducerSuccess())
    dispatch(getProducer())
}

export const updateProducer =  (id, name) => async (dispatch, getState) => {
    let res
    try {
        res = await axios.post('http://localhost:8080/admin/updateproducer', {
            id: id,
            name: name
        })
    }
    catch(err) {
        dispatch(updateProducerFail())
        return
    } 
    dispatch(updateProducerSuccess())
    dispatch(getProducer())
}
export const backPage = () => (dispatch, getState) => {
    let page = getState().itemReducers.item.page
    if(page > 1) {
        dispatch(setPage(parseInt(page) - 1))
    }
}

export const nextPage = () => (dispatch, getState) => {
    let page = getState().itemReducers.shop.page
    let totalpage = getState().itemReducers.shop.totalpage
    if(page < totalpage) {
        dispatch(setPage(parseInt(page) + 1))
    }
}
export const shopBackPage = () => (dispatch, getState) => {
    let page = getState().itemReducers.item.page
    if(page > 1) {
        dispatch(shopSetPage(parseInt(page) - 1))
    }
}

export const shopNextPage = () => (dispatch, getState) => {
    let page = getState().itemReducers.shop.page
    let totalpage = getState().itemReducers.shop.totalpage
    if(page < totalpage) {
        dispatch(shopSetPage(parseInt(page) + 1))
    }
}
export const categoryBackPage = () => (dispatch, getState) => {
    let page = getState().itemReducers.category.page
    if(page > 1) {
        dispatch(categorySetPage(parseInt(page) - 1))
    }
}

export const categoryNextPage = () => (dispatch, getState) => {
    let page = getState().itemReducers.category.page
    let totalpage = getState().itemReducers.category.totalpage
    if(page < totalpage) {
        dispatch(categorySetPage(parseInt(page) + 1))
    }
}
export const producerBackPage = () => (dispatch, getState) => {
    let page = getState().itemReducers.producer.page
    if(page > 1) {
        dispatch(producerSetPage(parseInt(page) - 1))
    }
}

export const producerNextPage = () => (dispatch, getState) => {
    let page = getState().itemReducers.producer.page
    let totalpage = getState().itemReducers.producer.totalpage
    if(page < totalpage) {
        dispatch(producerSetPage(parseInt(page) + 1))
    }
}
export const billBackPage = () => (dispatch, getState) => {
    let page = getState().itemReducers.bill.page
    if(page > 1) {
        dispatch(billSetPage(parseInt(page) - 1))
    }
}

export const billNextPage = () => (dispatch, getState) => {
    let page = getState().itemReducers.bill.page
    let totalpage = getState().itemReducers.bill.totalpage
    if(page < totalpage) {
        dispatch(billSetPage(parseInt(page) + 1))
    }
}
export const addItemSuccess = () => ({
    type: itemTypes.ADD_ITEM_SUCCESS
})
export const addItemFail = () => ({
    type: itemTypes.ADD_ITEM_FAIL
})
export const updateItemSuccess = () => ({
    type: itemTypes.UPDATE_ITEM_SUCCESS
})
export const updateItemFail = () => ({
    type: itemTypes.UPDATE_ITEM_FAIL
})
export const addItem = (id_category, name, price, release_date, describe, id_producer, id_shop, file) =>
 async (dispatch, getState) => {
    let data = new FormData()
    data.append('file', file)
    data.append('id_category', id_category) 
    data.append('name', name) 
    data.append('price', price)  
    data.append('release_date', release_date)
    data.append('describe', describe)
    data.append('id_producer', id_producer)
    data.append('id_shop', id_shop)
    let res
    try {
        res = await axios.post('http://localhost:8080/admin/additem', data)
    }
    catch(err) {
        dispatch(addItemFail())
        return
    } 
    dispatch(addItemSuccess())
    dispatch(getItem())
}
export const updateItem = (id, name, id_category, price, release_date, describe, id_producer, id_shop, file) => async (dispatch, getState) => {
    let data = new FormData()
    data.append('file', file)
    data.append('id', id)
    data.append('id_category', id_category) 
    data.append('name', name) 
    data.append('price', price)  
    data.append('release_date', release_date)
    data.append('describe', describe)
    data.append('id_producer', id_producer)
    data.append('id_shop', id_shop)
    let res
    try {
        res = await axios.post('http://localhost:8080/admin/updateitem', data)
    }
    catch(err) {
        dispatch(updateItemFail())
        return
    } 
    dispatch(updateItemSuccess())
    dispatch(getItem())
}
export const setBill = (data) => ({
    type: itemTypes.BILL_SET_DATA,
    data
})
export const billSetPage = (page) => ({
    type: itemTypes.BILL_SET_PAGE,
    page
})
export const billSetTotalPage = (totalpage) => ({
    type: itemTypes.BILL_SET_TOTAL_PAGE,
    totalpage
})
export const getBill = (status) => async(dispatch, getState) => {
    let link = "http://localhost:8080/bill/status/99"
    if(status === "0") {
        link = "http://localhost:8080/bill/status/0"
    }
    if(status === "1") {
        link = "http://localhost:8080/bill/status/1"
    }
    let res = null
    try {
       res =  await axios.get(link)
    }
    catch(err) {
        return
    }
    dispatch(setBill(res.data.data))
    dispatch(billSetTotalPage(res.data.totalPage))

}
export const updateIssendSuccess = () => ({
    type: itemTypes.UPDATE_ISSEND_SUCCESS
})
export const updateIssendFail = () => ({
    type: itemTypes.UPDATE_ISSEND_FAIL
})

export const updateIssend = (name,id) => async (dispatch, getState) => {
    let res
    try {
        console.log(typeof name);
        res = await axios.post('http://localhost:8080/bill/updateissend', {
        name: name,
        id:id
        })
    }
    catch(err) {
        
        dispatch(updateIssendFail())
        return
    } 
    dispatch(updateIssendSuccess())
}