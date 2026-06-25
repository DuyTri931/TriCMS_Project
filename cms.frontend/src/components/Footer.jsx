import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer-section bg-dark text-white mt-5">
            <div className="container py-5">
                <div className="row">
                    {/* Cột 1: Giới thiệu cửa hàng */}
                    <div className="col-lg-4 col-md-6 mb-4">
                        <h4 className="font-weight-bold mb-3">
                            TriCMS<span style={{ color: "#22c55e" }}>.FootballStore</span>
                        </h4>

                        <p className="text-light" style={{ lineHeight: "1.8" }}>
                            Cửa hàng chuyên cung cấp áo đấu, giày đá bóng, bóng đá,
                            găng tay thủ môn và phụ kiện thể thao chính hãng, phù hợp cho
                            cầu thủ phong trào, học sinh, sinh viên và người yêu bóng đá.
                        </p>

                        <div className="mt-3">
                            <span className="badge badge-success mr-2 p-2">Chính hãng</span>
                            <span className="badge badge-warning mr-2 p-2">Giá tốt</span>
                            <span className="badge badge-info p-2">Giao nhanh</span>
                        </div>
                    </div>

                    {/* Cột 2: Liên kết nhanh */}
                    <div className="col-lg-2 col-md-6 mb-4">
                        <h5 className="font-weight-bold mb-3">Liên kết nhanh</h5>

                        <ul className="list-unstyled footer-links">
                            <li className="mb-2">
                                <Link to="/" className="text-light text-decoration-none">
                                    Trang chủ
                                </Link>
                            </li>

                            <li className="mb-2">
                                <Link to="/shop" className="text-light text-decoration-none">
                                    Cửa hàng
                                </Link>
                            </li>

                            <li className="mb-2">
                                <Link to="/blog" className="text-light text-decoration-none">
                                    Tin bóng đá
                                </Link>
                            </li>

                            <li className="mb-2">
                                <Link to="/cart" className="text-light text-decoration-none">
                                    Giỏ hàng
                                </Link>
                            </li>

                            <li className="mb-2">
                                <Link
                                    to="/checkout"
                                    className="text-light text-decoration-none"
                                >
                                    Thanh toán
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Cột 3: Danh mục sản phẩm */}
                    <div className="col-lg-3 col-md-6 mb-4">
                        <h5 className="font-weight-bold mb-3">Danh mục nổi bật</h5>

                        <ul className="list-unstyled">
                            <li className="mb-2">⚽ Áo đấu bóng đá</li>
                            <li className="mb-2">👟 Giày đá bóng</li>
                            <li className="mb-2">🥅 Găng tay thủ môn</li>
                            <li className="mb-2">🏆 Bóng đá chính hãng</li>
                            <li className="mb-2">🎒 Phụ kiện thể thao</li>
                        </ul>
                    </div>

                    {/* Cột 4: Liên hệ và chính sách */}
                    <div className="col-lg-3 col-md-6 mb-4">
                        <h5 className="font-weight-bold mb-3">Liên hệ</h5>

                        <p className="mb-2">
                            <i className="fas fa-phone-alt mr-2 text-success"></i>
                            Hotline: 0909.888.777
                        </p>

                        <p className="mb-2">
                            <i className="fas fa-envelope mr-2 text-success"></i>
                            Email: support@tricmsfootball.vn
                        </p>

                        <p className="mb-2">
                            <i className="fas fa-map-marker-alt mr-2 text-success"></i>
                            Địa chỉ:thành phố thủ đức ,quận 9
                        </p>

                        <hr className="border-secondary" />

                        <h6 className="font-weight-bold mb-2">Chính sách hỗ trợ</h6>

                        <p className="mb-1">✔ Đổi trả trong 7 ngày</p>
                        <p className="mb-1">✔ Tư vấn chọn size miễn phí</p>
                        <p className="mb-1">✔ Hỗ trợ kiểm tra hàng khi nhận</p>

                        <div className="mt-3">
                            <a href="https://facebook.com" className="text-light mr-3">
                                <i className="fab fa-facebook fa-lg"></i>
                            </a>

                            <a href="https://instagram.com" className="text-light mr-3">
                                <i className="fab fa-instagram fa-lg"></i>
                            </a>

                            <a href="https://tiktok.com" className="text-light">
                                <i className="fab fa-tiktok fa-lg"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <hr className="border-secondary" />

                <div className="row align-items-center">
                    <div className="col-md-6 text-center text-md-left mb-2 mb-md-0">
                        <small>
                            © 2026 TriCMS FootballStore - ASP.NET Core API + ReactJS
                        </small>
                    </div>

                    <div className="col-md-6 text-center text-md-right">
                        <small>
                            Website đồ án môn ASP.NET Core MVC/API kết hợp ReactJS
                        </small>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;