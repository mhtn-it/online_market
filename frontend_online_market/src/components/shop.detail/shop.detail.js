import React, { Component } from "react";
import HeaderTop from "../header/header.top";
import HeaderMiddle from "../header/header.middle";
import HeaderBottom from "../header/header.bottom";
import FooterTop from "../footer/footer.top";
import FooterMiddle from "../footer/footer.middle";
import FooterBottom from "../footer/footer.bottom";
import ContentShopDetail from "./content.shop.detail";
class ShopDetail extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <header id="header">
      
          <HeaderMiddle
            islogin={this.props.islogin}
            logout={() => this.props.logout()}
            history={this.props.history}
          />
          <HeaderBottom
            sortType={this.props.sortType}
            setSortType={value => this.props.setSortType(value)}
            setSearchText={value => this.props.setSearchText(value)}
            searchTextSubmit={() => this.props.searchTextSubmit()}
          />
        </header>
        <ContentShopDetail
          mshopDetail={this.props.mshopDetail}
        />
        <footer id="footer">
          <FooterTop />
          <FooterMiddle />
          <FooterBottom />
        </footer>
      </div>
    );
  }
}
export default ShopDetail;
