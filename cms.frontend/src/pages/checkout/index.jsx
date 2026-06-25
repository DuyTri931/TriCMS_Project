import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getCart, saveCart } from "../../components/cartUtils";
import { formatCurrency } from "../../components/imageHelper";
import orderService from "../../services/orderService";
import authService from "../../services/authService";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [form, setForm] = useState({ customerId: "", fullName: "", phone: "", address: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setCart(getCart());

    const currentCustomer = authService.getCurrentCustomer();
    setCustomer(currentCustomer);

    if (currentCustomer) {
      setForm((prev) => ({
        ...prev,
        customerId: currentCustomer.customerId || "",
        fullName: currentCustomer.fullName || "",
        phone: currentCustomer.phone || "",
        address: currentCustomer.address || "",
      }));
    }
  }, []);

  const total = cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customer && !form.customerId) {
      alert("Bạn nên đăng nhập hoặc nhập CustomerId trước khi đặt hàng.");
      return;
    }

    if (!form.fullName.trim() || !form.phone.trim() || !form.address.trim()) {
      alert("Vui lòng nhập đầy đủ FullName, Phone, Address!");
      return;
    }

    if (cart.length === 0) {
      alert("Giỏ hàng đang trống!");
      return;
    }

    const payload = {
      customerId: Number(form.customerId),
      notes: `${form.notes}\nNgười nhận: ${form.fullName} - ${form.phone} - ${form.address}`,
      cartItems: cart.map((item) => ({ productId: item.id, quantity: item.quantity })),
    };

    try {
      setSubmitting(true);
      const result = await orderService.createOrder(payload);
      alert(result.message || "Đặt hàng thành công!");
      saveCart([]);
      setCart([]);
    } catch (error) {
      alert(error?.response?.data?.message || "Đặt hàng thất bại. Kiểm tra lại API /api/Orders.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Header />
      <main className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="font-weight-bold mb-0">Thanh toán</h2>
          {!customer && (
            <Link to="/login" state={{ from: "/checkout" }} className="btn btn-outline-success">
              Đăng nhập để tự điền thông tin
            </Link>
          )}
        </div>

        {customer && (
          <div className="alert alert-success">
            Đang đặt hàng bằng tài khoản: <strong>{customer.fullName}</strong> - {customer.email}
          </div>
        )}

        <div className="row">
          <div className="col-md-7">
            <form className="card border-0 shadow-sm p-4" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>CustomerId</label>
                <input
                  id="checkoutCustomerId"
                  name="customerId"
                  className="form-control"
                  value={form.customerId}
                  onChange={handleChange}
                  placeholder="Ví dụ: 1"
                  readOnly={!!customer}
                />
              </div>
              <div className="form-group">
                <label>FullName</label>
                <input id="checkoutFullName" name="fullName" className="form-control" value={form.fullName} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input id="checkoutPhone" name="phone" className="form-control" value={form.phone} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input id="checkoutAddress" name="address" className="form-control" value={form.address} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Ghi chú</label>
                <textarea id="checkoutNotes" name="notes" className="form-control" rows="3" value={form.notes} onChange={handleChange}></textarea>
              </div>
              <button className="btn btn-success btn-lg" disabled={submitting}>{submitting ? "Đang gửi..." : "Bấm Đặt Hàng"}</button>
            </form>
          </div>
          <div className="col-md-5">
            <div className="card border-0 shadow-sm p-4">
              <h5 className="font-weight-bold">Tóm tắt đơn hàng</h5>
              {cart.length === 0 && <p className="text-muted">Giỏ hàng đang trống.</p>}
              {cart.map((item) => (
                <div key={item.id} className="d-flex justify-content-between border-bottom py-2">
                  <span>{item.name} x {item.quantity}</span>
                  <strong>{formatCurrency(Number(item.price) * Number(item.quantity))}</strong>
                </div>
              ))}
              <h4 className="mt-3 text-right">Tổng: <span className="text-danger">{formatCurrency(total)}</span></h4>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Checkout;
