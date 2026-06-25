import React from "react";
import { Link } from "react-router-dom";

function HeroBanner() {
  return (
    <section className="py-5" style={{ background: "linear-gradient(135deg, #052e16 0%, #166534 55%, #f59e0b 100%)" }}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-7 text-white">
                      <span className="badge badge-warning text-dark px-3 py-2 mb-3   ">Bộ sưu tập mùa giải mới</span>
            <h1 className="display-4 font-weight-bold mb-3">Trang bị chuẩn sân cỏ cho mọi trận đấu</h1>
            <p className="lead mb-4">Áo đấu, giày đá bóng, bóng, găng tay thủ môn và phụ kiện thể thao dành cho người yêu bóng đá.</p>
            <Link to="/shop" className="btn btn-light btn-lg font-weight-bold mr-2">Mua ngay</Link>
            <Link to="/blog" className="btn btn-outline-light btn-lg">Xem tin bóng đá</Link>
          </div>
          <div className="col-md-5 mt-4 mt-md-0">
            <div className="bg-white p-3 shadow" style={{ borderRadius: "24px" }}>
              <img
                src="https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=900&q=80"
                alt="Football Store Banner"
                className="img-fluid"
                style={{ borderRadius: "18px", height: "320px", width: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
