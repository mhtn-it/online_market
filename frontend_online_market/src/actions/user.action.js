import { userTypes } from '../constants/action.types'
import storeConfig from '../config/storage.config'
import axios from 'axios'

export const loginSuccess = (user) => async (dispatch, getState) => {
    storeConfig.setUser(user)
    dispatch(setLoginSuccess())
    
    let cart = storeConfig.getCart()
    storeConfig.removeCart()
    if(cart !== null) {
        let res
        try {
            res = await axios.post('http://localhost:8080/cart/addtocard', {
                id_user: user.id,
                products: cart
            })
        }
        catch (err) {
            console.log(JSON.stringify(err.response))
            return
        }
    }
}
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
            password: password
        })
    }
    catch (err) {
        dispatch(setLoginFail())
        return false
    }
    dispatch(setLoginSuccess())
    return true
}
export const resetIsLogin = () => ({
    type: userTypes.RESET_IS_LOGIN
})
export const logout = () => (dispatch, getState) => {
    storeConfig.clear()
    dispatch(setLoginFail())
}
export const setUsername = (username) => ({
    type: userTypes.SET_USERNAME_LOGIN,
    username,
})
export const setLoginSuccess = () => ({
    type: userTypes.LOGIN_SUCCESS,
    data: 'login success'
})
export const setLoginFail = () => ({
    type: userTypes.LOGIN_FAIL,
    data: 'login fail'   
})

// export const forgotEmailSuccess = () => ({
//     type: userTypes.FORGOT_EMAIL_SUCCESS
// })
// export const forgotEmailFail = () => ({
//     type: userTypes.FORGOT_EMAIL_FAIL
// })
// export const resetForgotPassword = () => ({
//     type: userTypes.RESET_FORGOT_PASSWORD
// })
// export const setEmailForgotPassword = (email) => ({
//     type: userTypes.SET_EMAIL_FORGOTPASSWORD,
//     email
// })
// export const submitForgotPassword = (email) => async (dispatch, getState) => {
//     let res
//     try {
//         res = await axios.get('http://localhost:8080/user/request/forgotpassword/' +email)
//     }
//     catch (err) {
//         dispatch(forgotEmailFail())
//         return
//     }
//     dispatch(setEmailForgotPassword(res.data.email))    
//     dispatch(forgotEmailSuccess())
// }   
// export const submitOTP = (otp) => async (dispatch, getState) => {
//     let res
//     try {
//         res = await axios.post('http://localhost:8080/user/verify/forgotpassword', {
//             email: getState().userReducers.forgotPassword.email,
//             otp: otp,
//         })
//     }
//     catch (err) {
//         dispatch(verifyOTPFAIL())
//         return
//     }
//     dispatch(verifyOTPSuccess(otp))

// }
// export const verifyOTPSuccess = (otp) => ({
//     type: userTypes.VERIFY_OTP_SUCCESS,
//     otp
// })
// export const verifyOTPFAIL = () => ({
//     type: userTypes.VERIFY_OTP_FAIL
// })

// export const submitEnterNewPassword = (newPassword) => async (dispatch, getState) => {
//     let res
//     try {
//         res = await axios.post('http://localhost:8080/user/forgotpassword', {
//             email: getState().userReducers.forgotPassword.email,
//             otp: getState().userReducers.forgotPassword.otp,
//             newPassword: newPassword
//         })
//     }
//     catch (err) {
//         dispatch(forgotPasswordFail())
//         return
//     }
//     dispatch(forgotPasswordSuccess())
// }

// export const forgotPasswordSuccess = () => ({
//     type: userTypes.FORGOT_PASSWORD_SUCCESS
// })
// export const forgotPasswordFail = () => ({
//     type: userTypes.FORGOT_PASSWORD_FAIL
// })