import { Link } from 'react-router-dom'
import React, { useState } from 'react'
function ContentLoginRegister({ setUsernamelogin, setPasswordlogin, setEmail,
    setUsername, setFullName, setAddress, setPhone, setPassword, setConfirm,
    notificationRegister, notificationLogin, registerSubmit, loginSubmit }) {
    const [Login, setLogin] = useState(true);
    const [Register, setRegister] = useState(false);
    function handleLogin() {
        setLogin(true);
        setRegister(false);

    }
    function handleRegister() {
        setRegister(true)
        setLogin(false);

    }
    const handleSubmit = e => {
        e.preventDefault();
        loginSubmit()
    };
    const handleKeypress = e => {
        if (e.keyCode === 'Enter') {
            handleSubmit();
        }
    }
    let xhtmlLogin = '';
    let xhtmlRegister = '';
    if (Login) {
        xhtmlLogin = <div className="login-form">
            <form className='login-content col-sm-6'>
                <h2>Đăng nhập</h2>
                <div className="noti">{notificationLogin}</div>
                <input type="text"
                    placeholder="Tên đăng nhập"
                    onChange={(e) => { setUsernamelogin(e.target.value) }}
                    onKeyPress={handleKeypress}
                />
                <input type="password"
                    placeholder="Mật khẩu"
                    onChange={(e) => { setPasswordlogin(e.target.value) }}
                    onKeyPress={handleKeypress}
                />

                <button
                    className="btn btn-default"
                    onClick={handleSubmit}
                    type = "submit"
                >Đăng nhập</button>
                {/* <div className='forgotpassword'>
                <Link to='/forgotpass/' >Quen Mat Khau?</Link>
            </div> */}

            </form>
        </div>
    }
    if (Register) {
        xhtmlRegister = <div className="signup-form">
            <div className='login-content col-sm-6'>
                <h2>Đăng ký thành viên</h2>
                <div className="noti">{notificationRegister}</div>
                <input type="text"
                    placeholder="Tên đăng nhập"
                    onChange={(e) => { setUsername(e.target.value) }}
                />
                <input type="password"
                    placeholder="Mật khẩu"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input type="password"
                    placeholder="Xác nhận mật khẩu"
                    onChange={(e) => { setConfirm(e.target.value) }}
                />
                <input type="text"
                    placeholder="Họ và tên"
                    onChange={(e) => { setFullName(e.target.value) }}
                />
                <input type="email"
                    placeholder="Email"
                    onChange={(e) => { setEmail(e.target.value) }}
                />
                <input type="text"
                    placeholder="Số điện thoại"
                    onChange={(e) => { setPhone(e.target.value) }}
                />
                <input type="text"
                    placeholder="Địa chỉ"
                    onChange={(e) => { setAddress(e.target.value) }}
                />
                <button
                    className="btn btn-default"
                    onClick={() => registerSubmit()}
                >Đăng ký
                </button>
            </div>
        </div>
    }
    return (
        <section className='homePage'>
            <div className="container login-register">
                <div className='menu-profile'>
                    <ul>
                        <li><button onClick={handleLogin} className='menu-custom btn'>Đăng Nhập</button></li>
                        <li> <button onClick={handleRegister} className='menu-custom btn'>Đăng Ký</button></li>
                    </ul>
                    <hr></hr>
                </div>
                <div>
                    {xhtmlRegister}
                    {xhtmlLogin}
                </div>
            </div>
        </section>
    );
}
export default ContentLoginRegister