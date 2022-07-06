import React, { Component } from 'react'
class Navbar extends Component {

    render() {
        return (
            <header className="header dark-bg">
                <div className="toggle-nav">
                    <div className="icon-reorder tooltips" data-original-title="Toggle Navigation" data-placement="bottom"><i className="icon_menu"></i></div>
                </div>
                <a href="/" className="logo">Online Market<span className="lite"></span></a>
                <div className="top-nav notification-row">
                    <ul className="nav pull-right top-menu">
                        <li className="dropdown">
                            <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                               
                                <span className="username">Account</span>
                                <b className="caret"></b>
                            </a>
                            <ul className="dropdown-menu extended logout">
                                <div className="log-arrow-up"></div>
                                <li className="eborder-top">
                                    <a href="#"><i className="icon_profile"></i> My Profile</a>
                                </li>
                                <li>
                                    <a href="#"><i className="icon_mail_alt"></i> My Inbox</a>
                                </li>
                                <li>
                                    <a href="#"><i className="icon_clock_alt"></i> Timeline</a>
                                </li>
                                <li>
                                    <a href="#"><i className="icon_chat_alt"></i> Chats</a>
                                </li>
                                <li>
                                    <a onClick={() => this.props.logout()}><i className="icon_key_alt"></i> Log Out</a>
                                </li>
                                <li>
                                    <a href="documentation.html"><i className="icon_key_alt"></i> Documentation</a>
                                </li>
                            </ul>
                        </li>

                    </ul>

                </div>
            </header>
        )
    }

}
export default Navbar