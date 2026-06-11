import React from "react";
import CategoryProductList from "./components/CategoryProductList";
import ProductList from "./components/ProductList";
import CategoryList from "./components/CategoryList";
import PostList from "./components/PostList";
import "./App.css";

function App() {
    return (
        <div className="container mt-5">
            <header className="pb-3 mb-4 border-bottom">
                <span className="fs-4 font-weight-bold text-dark text-uppercase">
                    👗 FASHION BOUTIQUE - THỜI TRANG CÔNG SỞ & DẠ HỘI
                </span>
            </header>

            {/* PHẦN SẢN PHẨM */}
            <div className="row">
                <div className="col-md-4">
                    <CategoryProductList />
                </div>

                <div className="col-md-8">
                    <h4 className="mb-4 text-uppercase text-secondary font-weight-bold">
                        Bộ sưu tập mới nhất
                    </h4>

                    <ProductList />
                </div>
            </div>

            <hr className="my-5" />

            {/* PHẦN TIN TỨC / BLOG */}
            <div className="row">
                <div className="col-md-4">
                    <CategoryList />
                </div>

                <div className="col-md-8">
                    <h4 className="mb-4 text-uppercase text-secondary font-weight-bold">
                        Tin tức & Blog thời trang
                    </h4>

                    <PostList />
                </div>
            </div>
        </div>
    );
}

export default App;