import React, { Component } from "react";
import storeConfig from "../../config/storage.config";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
class ContentShopDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentWillMount() {
    }
    componentWillReceiveProps(nextProps) {

    }

    render() {
        return (
            <section>
                <div className="container">
                    <div className="row">
                    
                        <div className="col-sm-12">
                            <div className="product-details">
                                <div className="product-information detail-info">

                                    <h2>{this.props.mproductDetail.name}</h2>

                                    <p>
                                        <b>Địa chỉ:</b> {this.props.mproductDetail.address}
                                    </p>
                                    <p>
                                        <b>Ngày ra mắt: </b>{" "}
                                        {new Date(
                                            this.props.mproductDetail.release_date
                                        ).toDateString("yyyy-MM-dd")}
                                    </p>
                                    <p>
                                        <b>Nhà sản xuất:</b> {this.props.nameProducer}
                                    </p>
                                    <p>
                                        <b>Cửa hàng:</b> {this.props.nameShop}
                                    </p>
                                    <p>
                                        <b>Mô tả:</b> {this.props.describeItem}
                                    </p>

                                </div>
                                <div className="view-product">
                                    <img src={this.props.mproductDetail.img} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        );
    }
}
export default ContentShopDetail;
