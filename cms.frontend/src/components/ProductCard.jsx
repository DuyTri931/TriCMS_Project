import React from "react";
import { Link } from "react-router-dom";
import { addToCart } from "./cartUtils";
import { formatCurrency, getImageUrl } from "./imageHelper";

function ProductCard({ item }) {
  const handleAddToCart = () => {
    const result = addToCart(item, 1);
    alert(result.message);
  };

  return (
    <div className="card h-100 shadow-sm border-0 product-card-hover" style={{ borderRadius: "14px", overflow: "hidden", transition: "0.3s" }}>
      <div className="position-relative overflow-hidden" style={{ height: "250px", backgroundColor: "#f8fafc" }}>
        <img
          src={getImageUrl(item.imageUrl)}
          className="card-img-top w-100 h-100"
          alt={item.name}
          style={{ objectFit: "cover", transition: "transform 0.5s" }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
        {Number(item.stockQuantity) <= 5 && (
          <span className="badge badge-danger position-absolute px-2 py-1" style={{ top: "12px", left: "12px" }}>
            Còn {item.stockQuantity} sản phẩm
          </span>
        )}
      </div>

      <div className="card-body d-flex flex-column p-3">
        <h6 className="card-title font-weight-bold text-dark text-truncate mb-1" title={item.name}>{item.name}</h6>
        <p className="card-text text-muted small mb-1">Tồn kho: {item.stockQuantity ?? 0}</p>
        <p className="card-text font-weight-bold text-danger mb-3" style={{ fontSize: "17px" }}>{formatCurrency(item.price)}</p>
        <div className="mt-auto pt-2 border-top d-flex justify-content-between">
          <Link to={`/product/${item.id}`} className="btn btn-sm btn-outline-success font-weight-bold px-3" style={{ borderRadius: "20px", flexGrow: 1 }}>
            Chi tiết
          </Link>
          <button className="btn btn-sm text-white font-weight-bold px-3 ml-2" style={{ borderRadius: "20px", backgroundColor: "#16a34a", flexGrow: 1 }} onClick={handleAddToCart}>
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
