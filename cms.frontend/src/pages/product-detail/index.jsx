import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { addToCart } from "../../components/cartUtils";
import { formatCurrency, getImageUrl } from "../../components/imageHelper";
import productService from "../../services/productService";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Lỗi khi tải chi tiết sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAdd = () => {
    if (!product) return;
    const stock = Number(product.stockQuantity || 0);
    if (Number(quantity) > stock) {
      alert("Số lượng sản phẩm trong kho không đủ!");
      return;
    }
    const result = addToCart(product, Number(quantity));
    alert(result.message);
  };

  return (
    <div>
      <Header />
      <main className="container my-5">
        {loading ? (
          <div className="text-center text-muted py-5">Đang tải chi tiết sản phẩm...</div>
        ) : !product ? (
          <div className="alert alert-warning">Không tìm thấy sản phẩm.</div>
        ) : (
          <div className="row">
            <div className="col-md-6 mb-4">
              <img src={getImageUrl(product.imageUrl)} alt={product.name} className="img-fluid shadow-sm" style={{ borderRadius: "18px", width: "100%", maxHeight: "520px", objectFit: "cover" }} />
            </div>
            <div className="col-md-6">
              <h2 className="font-weight-bold">{product.name}</h2>
              <p className="text-danger font-weight-bold h4">{formatCurrency(product.price)}</p>
              <p className="text-muted">Tồn kho: {product.stockQuantity} sản phẩm</p>
              <hr />
              <h6 className="font-weight-bold">Mô tả sản phẩm</h6>
              <p style={{ lineHeight: 1.8 }}>{product.description || "Đang cập nhật mô tả sản phẩm."}</p>
              <div className="form-inline mt-4">
                <label className="mr-2 font-weight-bold">Số lượng</label>
                <input className="form-control mr-3" type="number" min="1" max={product.stockQuantity} value={quantity} onChange={(e) => setQuantity(e.target.value)} style={{ width: "100px" }} />
                <button className="btn btn-success btn-lg" onClick={handleAdd}>Thêm vào giỏ hàng</button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default ProductDetail;
