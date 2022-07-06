import React, { Component } from 'react'
import HeaderTop from '../header/header.top'
import HeaderMiddle from '../header/header.middle'
import HeaderBottom from '../header/header.bottom'
import FooterTop from '../footer/footer.top'
import FooterMiddle from '../footer/footer.middle'
import FooterBottom from '../footer/footer.bottom'
import ContentLoginRegister from './content.login.register'
const Home = ({ setUsernamelogin, setPasswordlogin, setEmail,
    setUsername, setFullName, setAddress, setPhone, setPassword, setConfirm,
    notificationRegister,notificationLogin, registerSubmit, 
     loginSubmit, islogin, logout, sortType, setSortType, setSearchText,
     searchTextSubmit, history}) => (
        <div>
            <header id="header">
                <HeaderMiddle
                    islogin={islogin}
                    logout={() => logout}
                    history={history}
                    />
            </header>
            <ContentLoginRegister
                setUsernamelogin={(value) => setUsernamelogin(value)}
                setPasswordlogin={(value) => setPasswordlogin(value)}
                setEmail={(value) => setEmail(value)}
                setUsername={(value) => setUsername(value)}
                setFullName={(value) => setFullName(value)}
                setAddress={(value) => setAddress(value)}
                setPhone={(value) => setPhone(value)}
                setPassword={(value) => setPassword(value)}
                setConfirm={(value) => setConfirm(value)}
                notificationRegister={notificationRegister}
                notificationLogin={notificationLogin}
                registerSubmit={() => registerSubmit()}
                loginSubmit={() => loginSubmit()}
            />
            <footer id="footer">
                <FooterTop />
                <FooterMiddle />
                <FooterBottom />
            </footer>
        </div>

    )

export default Home