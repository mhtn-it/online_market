import React, { Component } from 'react'
import HeaderTop from '../header/header.top'
import HeaderMiddle from '../header/header.middle'
import HeaderBottom from '../header/header.bottom'
import ContentHome from './content.home'
import Footer from '../footer/footer.middle'
const Home = ({ islogin, logout, category,
    producer, item, totalpage, backPage,
    nextPage, setPage, page, sortType, setSortType,
    setRangeType, title, setTitle, setBranch, branch, 
    setSearchText, shop, setIDBranch, branchClick, history,
    searchTextSubmit, addToCart }) => (
        <div>
            <header id="header">
                <HeaderMiddle
                    islogin={islogin}
                    logout={() => logout()}
                    history={history}
                />
                <HeaderBottom
                    sortType={sortType}
                    setSortType={(value) => setSortType(value)}
                    setSearchText={(value) => setSearchText(value)}
                    searchTextSubmit={() =>searchTextSubmit()}
                />
            </header>
            <ContentHome
                category={category}
                producer={producer}
                item={item}
                totalpage={totalpage}
                backPage={() => backPage()}
                nextPage={() => nextPage()}
                setPage={(page) => setPage(page)}
                page={page}
                setRangeType={(range) => setRangeType(range)}
                title={title}
                setTitle={(title) => setTitle(title)}
                setBranch={(branch) => setBranch(branch)}
                branch={branch}
                shop={shop}
                setIDBranch={(id) => setIDBranch(id)}
                branchClick={(branch, id) => branchClick(branch, id)}
                addToCart={(product) => addToCart(product)}
            />
            <footer id="footer">
                <Footer />
            </footer>
        </div>

    )

export default Home
