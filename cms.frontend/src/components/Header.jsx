import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getCartCount } from "./cartUtils";
import authService from "../services/authService";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const updateCount = () => setCartCount(getCartCount());
    updateCount();
    window.addEventListener("storage", updateCount);
    window.addEventListener("cartChanged", updateCount);
    return () => {
      window.removeEventListener("storage", updateCount);
      window.removeEventListener("cartChanged", updateCount);
    };
  }, []);

  useEffect(() => {
    const updateCustomer = () => setCustomer(authService.getCurrentCustomer());
    updateCustomer();
    window.addEventListener("storage", updateCustomer);
    window.addEventListener("authChanged", updateCustomer);
    return () => {
      window.removeEventListener("storage", updateCustomer);
      window.removeEventListener("authChanged", updateCustomer);
    };
  }, []);

  const isActive = (path) =>
    location.pathname === path ? "active font-weight-bold text-success" : "text-dark";

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = keyword.trim();
    if (!q) return;
    navigate(`/shop?keyword=${encodeURIComponent(q)}`);
  };

  const handleLogout = () => {
    authService.logout();
    navigate("/");
  };

  return (
    <header className="main-header-wrapper bg-white shadow-sm sticky-top">
      <div className="top-bar bg-dark py-2 text-white" style={{ fontSize: "13px" }}>
        <div className="container d-flex justify-content-between align-items-center">
          <div>
            <span className="mr-3">
              <i className="fas fa-phone-alt mr-1"></i> Hotline: 0909.888.777
            </span>
            <span>
              <i className="fas fa-envelope mr-1"></i> support@tricmsfootball.vn
            </span>
          </div>

          <div>
            {customer ? (
              <>
                <span className="text-white mr-3">
                  <i className="fas fa-user-circle mr-1"></i>
                  Xin chào, <strong>{customer.fullName}</strong>
                </span>
                <button className="btn btn-sm btn-outline-light" onClick={handleLogout}>
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white mr-3 text-decoration-none">
                  Đăng nhập
                </Link>
                <Link to="/register" className="text-white text-decoration-none">
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="main-header py-3 border-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-3 col-6">
              <Link to="/" className="text-decoration-none">
                <h3 className="font-weight-bold m-0" style={{ color: "#14532d", letterSpacing: "1px" }}>
                  TriCMS<span style={{ color: "#f59e0b" }}>.Football</span>
                </h3>
              </Link>
            </div>

            <div className="col-md-6 d-none d-md-block">
              <form className="input-group" onSubmit={handleSearchSubmit}>
                <input
                  id="searchKeyword"
                  name="keyword"
                  type="text"
                  className="form-control border-right-0"
                  placeholder="Tìm áo đấu, giày đá bóng, găng tay thủ môn..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  style={{ borderRadius: "24px 0 0 24px", fontSize: "14px" }}
                />
                <div className="input-group-append">
                  <button
                    className="btn text-white border-left-0 px-4"
                    type="submit"
                    style={{ borderRadius: "0 24px 24px 0", backgroundColor: "#16a34a", borderColor: "#16a34a" }}
                  >
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </form>
            </div>

            <div className="col-md-3 col-6 text-right">
              <Link to="/cart" className="btn position-relative p-2" style={{ color: "#14532d", fontSize: "24px" }}>
                <i className="fas fa-shopping-cart"></i>
                <span className="badge badge-pill position-absolute" style={{ top: 0, right: 0, backgroundColor: "#ef4444", color: "#fff", fontSize: "11px", padding: "4px 6px" }}>
                  {cartCount}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="main-navigation bg-white py-2">
        <div className="container">
          <nav className="navbar navbar-expand p-0">
            <ul className="navbar-nav w-100">
              <li className="nav-item mr-4">
                <Link to="/" className={`nav-link p-0 text-decoration-none ${isActive("/")}`}>Trang chủ</Link>
              </li>
              <li className="nav-item mr-4">
                <Link to="/shop" className={`nav-link p-0 text-decoration-none ${isActive("/shop")}`}>Cửa hàng</Link>
              </li>
              <li className="nav-item mr-4">
                <Link to="/blog" className={`nav-link p-0 text-decoration-none ${isActive("/blog")}`}>Tin bóng đá</Link>
              </li>
              <li className="nav-item mr-4">
                <Link to="/cart" className={`nav-link p-0 text-decoration-none ${isActive("/cart")}`}>Giỏ hàng</Link>
              </li>
              <li className="nav-item">
                <Link to="/checkout" className={`nav-link p-0 text-decoration-none ${isActive("/checkout")}`}>Thanh toán</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
