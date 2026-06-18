import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import categoryProductService from "../../services/categoryProductService";

function CategoryMenu() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryProductService.getAllCategoryProducts();
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Lỗi khi tải danh mục sản phẩm:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const getIcon = (name = "") => {
    const lower = name.toLowerCase();
    if (lower.includes("giày")) return "fa-shoe-prints";
    if (lower.includes("áo")) return "fa-shirt";
    if (lower.includes("bóng")) return "fa-futbol";
    if (lower.includes("găng")) return "fa-hand";
    return "fa-medal";
  };

  return (
    <section className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="font-weight-bold mb-0">Danh mục thể thao</h4>
        <Link to="/shop" className="text-success font-weight-bold">Xem tất cả</Link>
      </div>

      {loading ? (
        <div className="text-center text-muted">Đang nạp danh mục...</div>
      ) : (
        <div className="row">
          {categories.map((cat) => (
            <div className="col-6 col-md-3 col-lg-2 mb-3" key={cat.id}>
              <Link to={`/shop?category=${cat.id}`} className="text-decoration-none text-dark">
                <div className="card border-0 shadow-sm text-center h-100 p-3" style={{ borderRadius: "18px" }}>
                  <div className="mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: "70px", height: "70px", borderRadius: "50%", backgroundColor: "#dcfce7", color: "#166534", fontSize: "28px" }}>
                    <i className={`fas ${getIcon(cat.name)}`}></i>
                  </div>
                  <strong className="small">{cat.name}</strong>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default CategoryMenu;
