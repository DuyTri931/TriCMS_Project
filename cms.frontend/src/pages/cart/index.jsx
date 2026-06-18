import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { formatCurrency, getImageUrl } from "../../components/imageHelper";
import { getCart, saveCart } from "../../components/cartUtils";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => setCart(getCart()), []);

  const updateQuantity = (id, quantity) => {
    const nextCart = cart.map((item) => {
      if (item.id !== id) return item;
      const nextQuantity = Math.max(1, Number(quantity));
      if (item.stockQuantity > 0 && nextQuantity > item.stockQuantity) {
        alert("Số lượng sản phẩm trong kho không đủ!");
        return item;
      }
      return { ...item, quantity: nextQuantity };
    });
    setCart(nextCart);
    saveCart(nextCart);
  };

  const removeItem = (id) => {
    const nextCart = cart.filter((item) => item.id !== id);
    setCart(nextCart);
    saveCart(nextCart);
  };

  const total = cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0);

  return (
    <div>
      <Header />
      <main className="container my-5">
        <h2 className="font-weight-bold mb-4">Giỏ hàng</h2>
        {cart.length === 0 ? (
          <div className="text-center py-5 bg-light rounded">
            <i className="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
            <h5>Giỏ hàng đang trống</h5>
            <Link to="/shop" className="btn btn-success mt-3">Tiếp tục mua hàng</Link>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered bg-white">
              <thead className="thead-dark"><tr><th>Sản phẩm</th><th>Giá</th><th>Số lượng</th><th>Thành tiền</th><th></th></tr></thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td><img src={getImageUrl(item.imageUrl)} alt={item.name} style={{ width: 70, height: 70, objectFit: "cover", borderRadius: 8 }} /> <strong className="ml-2">{item.name}</strong></td>
                    <td>{formatCurrency(item.price)}</td>
                    <td><input type="number" min="1" className="form-control" style={{ width: 90 }} value={item.quantity} onChange={(e) => updateQuantity(item.id, e.target.value)} /></td>
                    <td className="font-weight-bold text-danger">{formatCurrency(Number(item.price) * Number(item.quantity))}</td>
                    <td><button className="btn btn-sm btn-outline-danger" onClick={() => removeItem(item.id)}>Xóa</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right">
              <h4>Tổng tiền: <span className="text-danger font-weight-bold">{formatCurrency(total)}</span></h4>
              <Link to="/checkout" className="btn btn-success btn-lg mt-2">Thanh toán</Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Cart;
