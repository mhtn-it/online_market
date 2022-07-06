import React, { Component } from 'react'
import {Link} from 'react-router-dom'
class Slider extends Component {
    render() {
        return (
                <div id="sidebar" className="nav-collapse">
                    <ul className="sidebar-menu">
                        {/* <li className="active"> */}
                        <li>
                            <a className="" href="/">
                                <i className="icon_house_alt"></i>
                                <span>Dashboard</span>
                            </a>
                        </li>
                        <li className="sub-menu">
                            <a href="javascript:" className=""> 
                                <i className="icon_document_alt"></i>
                                <span>Quản Lý</span>
                                <span className="menu-arrow arrow_carrot-right"></span>
                            </a>
                            <ul className="sub">
                                <li><a className="" href="/itemmanager">Sản Phẩm </a></li>
                                <li><a className="" href="/categorymanager">Thể Loại</a></li>
                                <li><a className="" href="/producermanager">Nhà Sản Xuất</a></li>
                                <li><a className="" href="/shopmanager">Cửa Hàng</a></li>
                                <li><a className="" href="/usermanager">Người Dùng</a></li>
                             
                            </ul>
                        </li>
                        <li>
                            <a className="" href="/billmanager">
                                <i className="icon_desktop"></i>
                                <span>Đơn Hàng</span>
                            </a>
                        </li>
                        <li>
                            <a className="" href="/statistical">
                                <i className="icon_genius"></i>
                                <span>Thống Kê</span>
                            </a>
                        </li>
                    </ul>
      </div>
        )
    }
}
export default Slider