import React from "react";
import CategoryProductList from "./components/CategoryProductList";
import BlogCategoryList from "./components/BlogCategoryList";
import PostList from "./components/PostList";
import "./App.css";

function App() {
    return (
        <div className="container mt-5">
            <header className="pb-3 mb-4 border-bottom d-flex justify-content-between align-items-center">
                <span className="fs-4 font-weight-bold text-dark text-uppercase">
                    👗 Fashion Boutique - Hệ Thống Quản Trị Nội Dung & Bán Hàng
                </span>

                <span className="badge badge-success px-3 py-2">
                    Học Phần Chuyên Đề ASP.NET + ReactJS
                </span>
            </header>

            <div className="row">
                {/* CỘT TRÁI */}
                <div className="col-md-4">
                    <CategoryProductList />
                    <BlogCategoryList />
                </div>

                {/* CỘT PHẢI */}
                <div className="col-md-8">
                    <h4 className="mb-4 text-uppercase text-secondary font-weight-bold">
                        Tin tức & Blog thời trang
                    </h4>

                    <PostList />
                </div>
            </div>

            <footer className="pt-3 mt-5 text-muted border-top text-center small">
                <p>
                    © 2026 - Đồ án thực hành phân tầng ASP.NET Core Web API kết hợp ReactJS Client-side
                </p>
            </footer>
        </div>
    );
}

export default App;