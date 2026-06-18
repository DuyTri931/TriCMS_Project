import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getCart, saveCart } from "../../components/cartUtils";
import { formatCurrency } from "../../components/imageHelper";
import orderService from "../../services/orderService";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({ customerId: "", fullName: "", phone: "", address: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => setCart(getCart()), []);

  const total = cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.phone.trim() || !form.address.trim()) {
      alert("Vui lòng nhập đầy đủ FullName, Phone, Address!");
      return;
    }
    if (!form.customerId) {
      alert("Backend hiện tại yêu cầu CustomerId. Nhập CustomerId đã có trong bảng Customers trước khi đặt hàng.");
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
        <h2 className="font-weight-bold mb-4">Thanh toán</h2>
        <div className="row">
          <div className="col-md-7">
            <form className="card border-0 shadow-sm p-4" onSubmit={handleSubmit}>
              <div className="form-group"><label>CustomerId</label><input name="customerId" className="form-control" value={form.customerId} onChange={handleChange} placeholder="Ví dụ: 1" /></div>
              <div className="form-group"><label>FullName</label><input name="fullName" className="form-control" value={form.fullName} onChange={handleChange} /></div>
              <div className="form-group"><label>Phone</label><input name="phone" className="form-control" value={form.phone} onChange={handleChange} /></div>
              <div className="form-group"><label>Address</label><input name="address" className="form-control" value={form.address} onChange={handleChange} /></div>
              <div className="form-group"><label>Ghi chú</label><textarea name="notes" className="form-control" rows="3" value={form.notes} onChange={handleChange}></textarea></div>
              <button className="btn btn-success btn-lg" disabled={submitting}>{submitting ? "Đang gửi..." : "Bấm Đặt Hàng"}</button>
            </form>
          </div>
          <div className="col-md-5">
            <div className="card border-0 shadow-sm p-4">
              <h5 className="font-weight-bold">Tóm tắt đơn hàng</h5>
              {cart.map((item) => <div key={item.id} className="d-flex justify-content-between border-bottom py-2"><span>{item.name} x {item.quantity}</span><strong>{formatCurrency(Number(item.price) * Number(item.quantity))}</strong></div>)}
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
