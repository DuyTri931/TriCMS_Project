import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 pt-5 pb-3">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5 className="font-weight-bold">TriCMS.FootballStore</h5>
            <p className="text-light small mb-0">
              Cửa hàng áo đấu, giày đá bóng, bóng, găng tay thủ môn và phụ kiện thể thao chính hãng.
            </p>
          </div>
          <div className="col-md-4 mb-4">
            <h6 className="font-weight-bold">Liên kết nhanh</h6>
            <p className="mb-1"><Link className="text-light" to="/shop">Cửa hàng</Link></p>
            <p className="mb-1"><Link className="text-light" to="/blog">Tin bóng đá</Link></p>
            <p className="mb-1"><Link className="text-light" to="/cart">Giỏ hàng</Link></p>
          </div>
          <div className="col-md-4 mb-4">
            <h6 className="font-weight-bold">Liên hệ</h6>
            <p className="small mb-1">Hotline: 0909.888.777</p>
            <p className="small mb-1">Email: support@tricmsfootball.vn</p>
            <p className="small mb-0">Địa chỉ: TP. Hồ Chí Minh</p>
          </div>
        </div>
        <div className="border-top border-secondary pt-3 text-center small text-light">
          © 2026 TriCMS.FootballStore - ASP.NET Core API + ReactJS
        </div>
      </div>
    </footer>
  );
}

export default Footer;
