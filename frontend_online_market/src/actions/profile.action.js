import axios from 'axios'
import storeConfig from '../config/storage.config'
import { profileTypes } from '../constants/action.types'
export const auth = () => async (dispatch, getState) => {
    if(storeConfig.getUser() === null){
        dispatch(setAuthFail())
        return false
    }
    const user = storeConfig.getUser()
    try {
        await axios.post('http://localhost:8080/auth', {
            username: user.username,
            password: user.password,
        })
    }
    catch (err) {
        dispatch(setAuthFail())
        return false
    }
    dispatch(setAuthSuccess())
    return true
}
export const setAuthSuccess = () => ({
    type: profileTypes.SET_AUTH_LOGIN_SUCCESS
})
export const setAuthFail = () => ({
    type: profileTypes.SET_AUTH_LOGIN_FAIL
})

export const setUpdateInforSuccess = () => ({
    type:  profileTypes.UPDATE_INFOR_USER_SUCCESS
})
export const setUpdateInforFail = () => ({
    type:  profileTypes.UPDATE_INFOR_USER_FAIL
})
export const resetProfile = () => ({
    type:  profileTypes.RESET_PROFILE
})
export const updateInfor = (username, fullName, email, address, phone_number ) => async (dispatch, getState) => {
    let res
    try {
            res =  await axios.post('http://localhost:8080/user/updateinfor', {
            email: email,
            username: username,
            fullName: fullName,
            address: address,
            phone_number: phone_number
        })
    }
    catch (err) {
        console.log(err)
        dispatch(setUpdateInforFail())  
        return false
    }
    storeConfig.clear()
    storeConfig.setUser(res.data.user)
    dispatch(setUpdateInforSuccess())
    return true
}