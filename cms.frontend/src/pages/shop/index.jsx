import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import productService from "../../services/productService";
import categoryProductService from "../../services/categoryProductService";
import Pagination from "../../components/Pagination";

function Shop() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const categoryParam = searchParams.get("category") || "";
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setActiveCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productData, categoryData] = await Promise.all([
          productService.getAllProducts(),
          categoryProductService.getAllCategoryProducts(),
        ]);
        setProducts(Array.isArray(productData) ? productData : []);
        setCategories(Array.isArray(categoryData) ? categoryData : []);
      } catch (error) {
        console.error("Lỗi khi tải trang shop:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchKeyword = !keyword || item.name?.toLowerCase().includes(keyword.toLowerCase());
      const matchCategory = !activeCategory || String(item.categoryProductId) === String(activeCategory);
      const price = Number(item.price || 0);
      const matchMin = !minPrice || price >= Number(minPrice);
      const matchMax = !maxPrice || price <= Number(maxPrice);
      return matchKeyword && matchCategory && matchMin && matchMax;
    });
  }, [products, keyword, activeCategory, minPrice, maxPrice]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [keyword, activeCategory, minPrice, maxPrice]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <Header />
      <section className="bg-light py-4 border-bottom">
        <div className="container">
          <h2 className="font-weight-bold mb-1">Cửa hàng bóng đá</h2>
          <p className="text-muted mb-0">Lọc áo đấu, giày đá bóng, bóng và phụ kiện thể thao.</p>
        </div>
      </section>

      <main className="container my-5">
        <div className="row">
          <aside className="col-md-3 mb-4">
            <div className="card border-0 shadow-sm p-3 mb-3">
              <h6 className="font-weight-bold">Danh mục</h6>
              <button className={`btn btn-sm text-left mb-2 ${!activeCategory ? "btn-success" : "btn-outline-secondary"}`} onClick={() => setActiveCategory("")}>Tất cả</button>
              {categories.map((cat) => (
                <button key={cat.id} className={`btn btn-sm text-left mb-2 ${String(activeCategory) === String(cat.id) ? "btn-success" : "btn-outline-secondary"}`} onClick={() => setActiveCategory(String(cat.id))}>{cat.name}</button>
              ))}
            </div>
            <div className="card border-0 shadow-sm p-3">
              <h6 className="font-weight-bold">Khoảng giá</h6>
              <input className="form-control form-control-sm mb-2" type="number" placeholder="Giá thấp nhất" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
              <input className="form-control form-control-sm" type="number" placeholder="Giá cao nhất" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
            </div>
          </aside>

          <section className="col-md-9">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="font-weight-bold mb-0">Danh sách sản phẩm</h5>
              <span className="text-muted small">Tìm thấy {filteredProducts.length} sản phẩm</span>
            </div>

            {loading ? (
              <div className="text-center text-muted py-5">Đang tải sản phẩm...</div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-5 bg-light rounded">
                <i className="fas fa-search fa-3x text-muted mb-3"></i>
                <h5>Không tìm thấy sản phẩm nào phù hợp với tiêu chí của bạn</h5>
              </div>
            ) : (
              <>
                <div className="row">
                  {currentProducts.map((item) => (
                    <div className="col-md-4 mb-4" key={item.id}>
                      <ProductCard item={item} />
                    </div>
                  ))}
                </div>
                {totalPages > 1 && (
                  <Pagination 
                    currentPage={currentPage} 
                    totalPages={totalPages} 
                    onPageChange={setCurrentPage} 
                  />
                )}
              </>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Shop;
