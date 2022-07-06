import axios from 'axios'
import { userTypes } from '../constants/action.types'
import storeConfig from '../config/store.config'
export const setUser = (data) => ({
    type: userTypes.SET_USER,
    data
})
export const getUser = () => async (dispatch, getState) => {
    let res
    try {
        res = await axios.get('http://localhost:8080/admin/getAllUser/' + getState().userReducers.user.page)
    }
    catch (err) {
        console.log(err)
        return
    }
    dispatch(setUser(res.data.data))
    dispatch(setTotalPage(res.data.totalPage))

}
export const setTotalPage = (totalpage) => ({
    type: userTypes.SET_TOTAL_PAGE,
    totalpage
})
export const setPage = (page) => ({
    type: userTypes.SET_PAGE,
    page
})
export const nextPage = () => (dispatch, getState) => {
    let page = getState().userReducers.user.page
    let totalpage = getState().userReducers.user.totalpage
    if(page < totalpage) {
        dispatch(setPage(parseInt(page) + 1))
    }
}
export const backPage = () => (dispatch, getState) => {
    let page = getState().userReducers.user.page
    if(page > 1) {
        dispatch(setPage(parseInt(page) - 1))
    }
}

export const deleteUser = (username) => async (dispatch, getState) => {
    let res
    try {
        res = await axios.post('http://localhost:8080/admin/deleteuser/',{
            username: username
        })
    }
    catch (err) {
        console.log(err)
        return
    }
    dispatch(getUser())
}
export const addUserSuccess = () => ({
    type: userTypes.ADD_USER_SUCCESS
})
export const addUserFail = () => ({
    type: userTypes.ADD_USER_FAIL
})
export const updateUserSuccess = () => ({
    type: userTypes.UPDATE_USER_SUCCESS
})
export const updateUserFail = () => ({
    type: userTypes.UPDATE_USER_FAIL
})
export const resetUser = () => ({
    type: userTypes.RESET_USER
})
export const addUser = (email, password, username , fullName, address, phone_number, type) => async (dispatch, getState) => {
    dispatch(resetUser())
    let res
    try {
        res = await axios.post('http://localhost:8080/admin/adduser', {
            email: email,
            username: username,
            fullName: fullName,
            password: password,
            address: address,
            phone_number: phone_number,
            type: type
        })
    }
    catch (err) {
        console.log(err)
        dispatch(addUserFail())
        return
    }
    dispatch(addUserSuccess())
    dispatch(getUser())
}
export const updateUser = (username, fullName, email, phone_number, address, type) => async (dispatch, getState) => {
    let res
    try {
        res = await axios.post('http://localhost:8080/admin/updateuser', {
            email: email,
            username: username,
            fullName: fullName,
            address: address,
            phone_number: phone_number,
            type: type
        })
    }
    catch (err) {
        console.log(err)
        dispatch(updateUserFail())
        return
    }
    dispatch(updateUserSuccess())
    dispatch(getUser())
}
export const loginSuccess = (user) => async (dispatch, getState) => {
// export const loginSuccess = (token, user) => async (dispatch, getState) => {
    storeConfig.setUser(user)
    // storeConfig.setToken(token)
    dispatch(setLoginSuccess())
}
export const setLoginSuccess = () => ({
    type: userTypes.LOGIN_SUCCESS,
    data: 'login success'
})
export const setLoginFail = () => ({
    type: userTypes.LOGIN_FAIL,
    data: 'login fail'   
})
export const auth = () => async (dispatch, getState)  => {
    if(storeConfig.getUser() === null){
        dispatch(setLoginFail())
        return false
    }
    let username = storeConfig.getUser().username
    let password = storeConfig.getUser().password
    let res
    try {
        res = await axios.post('http://localhost:8080/auth', {
            username: username,
            password: password,
        })
    }
    catch (err) {
        dispatch(setLoginFail())
        return false
    }
    dispatch(setLoginSuccess())
    return true
}
export const logout = () => (dispatch, getState) => {
    console.log('logout ')
    storeConfig.clear()
    dispatch(setLoginFail())
}