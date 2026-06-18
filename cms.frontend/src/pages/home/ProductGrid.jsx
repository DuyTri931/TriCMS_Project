import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import productService from "../../services/productService";

function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts();
        setProducts(Array.isArray(data) ? data.slice(0, 6) : []);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="font-weight-bold mb-0">Sản phẩm mới nhất</h4>
        <span className="text-muted small">Dữ liệu lấy từ API /api/Products</span>
      </div>

      {loading ? (
        <div className="text-center text-muted">Đang tải sản phẩm...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-5 bg-light rounded">
          <i className="fas fa-box-open fa-3x text-muted mb-3"></i>
          <p className="text-muted">Không tìm thấy sản phẩm nào phù hợp với tiêu chí của bạn</p>
        </div>
      ) : (
        <div className="row">
          {products.map((item) => (
            <div className="col-md-4 mb-4" key={item.id}>
              <ProductCard item={item} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductGrid;
