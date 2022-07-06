import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LoginRegister from '../components/login.register/login.register'
import * as userActions from '../actions/user.action'
import * as homeActions from '../actions/home.action'
class LoginRegisterContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usernameLogin: '',
            passwordLogin: '',
            email: '',
            username: '',
            fullName: '',
            address: '',
            phone: '',
            password: '',
            confirm: '',
            notificationRegister: '',
            notificationLogin: '',

        }
    }
    componentWillMount() {
        this.props.actions.auth()
    }
    isvalidUsername = (username) => {
        if (username === '')
            return false
        return true
    }
    isvalidFullName = (fullName) => {
        if (fullName === '')
            return false
        return true
    }
    isvalidPassword = (password) => {
        if (password.length < 6)
            return false
        return true
    }
    isvalidConfirm = (password, confirm) => {
        if (confirm != password)
            return false
        return true
    }
    isvalidEmail = (email) => {
        if (email === '' || email.indexOf('@') === -1 || email.indexOf('.') === -1)
            return false
        return true
    }
    registerSubmit = async () => {
        if (!this.isvalidUsername(this.state.username)) {
            this.setState({ notificationRegister: 'Username invalid' })
            return
        } else {
            this.setState({ notificationRegister: '' })
        }
        if (!this.isvalidPassword(this.state.password)) {
            this.setState({ notificationRegister: 'Password invalid' })
            return
        } else {
            this.setState({ notificationRegister: '' })
        }
        if (!this.isvalidConfirm(this.state.password, this.state.confirm)) {
            this.setState({ notificationRegister: 'Confirm invalid' })
            return
        } else {
            this.setState({ notificationRegister: '' })
        }
        if (!this.isvalidEmail(this.state.email)) {
            this.setState({ notificationRegister: "Email invalid" })
            return
        } else {
            this.setState({ notificationRegister: '' })
        }
        if (!this.isvalidFullName(this.state.fullName)) {
            this.setState({ notificationRegister: 'Fullname invalid' })
            return
        } else {
            this.setState({ notificationRegister: '' })
        }
        try {
            await axios.post('http://localhost:8080/user/register', {
                email: this.state.email,
                password: this.state.password,
                username: this.state.username,
                fullName: this.state.fullName,
                address: this.state.address,
                phone_number: this.state.phone
            })
        }
        catch (err) {
            if (err.response.data.msg === "Username already exist")
                this.setState({ notificationRegister: 'Username already exist' })
            else
                this.setState({ notificationRegister: 'Đăng Ký Thất Bại' })
            return
        }
        this.setState({ notificationRegister: 'Đăng Ký Thành Công' })
    }

    loginSubmit = async () => {
        if (!this.isvalidUsername(this.state.usernameLogin)) {
            this.setState({ notificationLogin: "Username invalid" })
            return
        } else {
            this.setState({ notificationLogin: '' })
        }
        let res
        try {
            res = await axios.post('http://localhost:8080/user/login', {
                username: this.state.usernameLogin,
                password: this.state.passwordLogin,
            })
        }
        catch (err) {
            if (err.response !== undefined) {
                this.setState({ notificationLogin: 'Username or password invalid' })
            }
            else {
                this.setState({ notificationLogin: 'Some thing went wrong' })
            }
            return
        }
        this.props.actions.loginSuccess(res.data.user)
        this.props.history.push('/')
    }
    render() {
        return (
            <div>
                <LoginRegister
                    setUsernamelogin={(value) => this.setState({ usernameLogin: value })}
                    setPasswordlogin={(value) => this.setState({ passwordLogin: value })}
                    setEmail={(value) => this.setState({ email: value })}
                    setUsername={(value) => this.setState({ username: value })}
                    setFullName={(value) => this.setState({ fullName: value })}
                    setAddress={(value) => this.setState({ address: value })}
                    setPhone={(value) => this.setState({ phone: value })}
                    notificationRegister={this.state.notificationRegister}
                    notificationLogin={this.state.notificationLogin}
                    setPassword={(value) => this.setState({ password: value })}
                    setConfirm={(value) => this.setState({ confirm: value })}
                    registerSubmit={() => this.registerSubmit()}
                    loginSubmit={() => this.loginSubmit()}
                    islogin={this.props.islogin}
                    logout={() => this.props.actions.logout()}
                    sortType={this.props.sortType}
                    setSortType={(value) => this.props.homeActions.setSortType(value)}
                    setRangeType={(range) => this.props.homeActions.setRangeType(range)}
                    setSearchText={(value) => this.props.homeActions.setSearchText(value)}
                    searchTextSubmit={() => this.props.homeActions.searchTextSubmit()}
                    history={this.props.history}
                />
            </div>
        )

    }
}

const mapStateToProps = state => ({
    islogin: state.userReducers.login.islogin
})

const mapDispatchToProps = dispatch => {
    return ({
        actions: bindActionCreators(userActions, dispatch),
        homeActions: bindActionCreators(homeActions, dispatch)
    })
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginRegisterContainer)