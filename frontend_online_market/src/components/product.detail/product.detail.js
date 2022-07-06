import React, { Component } from "react";
import HeaderTop from "../header/header.top";
import HeaderMiddle from "../header/header.middle";
import HeaderBottom from "../header/header.bottom";
import FooterTop from "../footer/footer.top";
import FooterMiddle from "../footer/footer.middle";
import FooterBottom from "../footer/footer.bottom";
import ContentProductDetail from "./content.product.detail";
class ProductDetail extends Component {
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
        <ContentProductDetail
          category={this.props.category}
          producer={this.props.producer}
          mproductDetail={this.props.mproductDetail}
          nameCategory={this.props.nameCategory}
          nameProducer={this.props.nameProducer}
          itemrelated={this.props.itemrelated}
          islogin={this.props.islogin}
          id_item={this.props.id_item}
          submitComment={(name, id_user, comment, id_item) =>
            this.props.submitComment(name, id_user, comment, id_item)
          }
          comment={this.props.comment}
          nameShop={this.props.nameShop}
          describeItem={this.props.mproductDetail.describe}
          addToCart={product => this.props.addToCart(product)}
          totalpage={this.props.totalpage}
          page={this.props.page}
          backPage={() => this.props.backPage()}
          nextPage={() => this.props.nextPage()}
          setPage={page => this.props.setPage(page)}
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
export default ProductDetail;
