import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import authService from "../../services/authService";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.fullName.trim() || !form.email.trim() || !form.password.trim()) {
      return "Vui lòng nhập đầy đủ Họ tên, Email và Mật khẩu.";
    }

    if (form.password.length < 6) {
      return "Mật khẩu nên có ít nhất 6 ký tự.";
    }

    if (form.password !== form.confirmPassword) {
      return "Mật khẩu nhập lại không khớp.";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const message = validateForm();
    if (message) {
      setError(message);
      return;
    }

    const payload = {
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      password: form.password,
      phone: form.phone.trim(),
      address: form.address.trim(),
    };

    try {
      setLoading(true);
      await authService.register(payload);
      setSuccess("Đăng ký thành công! Bạn có thể đăng nhập ngay.");

      setTimeout(() => {
        navigate("/login");
      }, 900);
    } catch (err) {
      setError(err?.response?.data?.message || "Đăng ký thất bại. Email có thể đã tồn tại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />

      <main className="auth-page py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <div className="card border-0 shadow-lg auth-card">
                <div className="card-body p-4 p-md-5">
                  <div className="text-center mb-4">
                    <div className="auth-icon mb-3">
                      <i className="fas fa-futbol"></i>
                    </div>
                    <h3 className="font-weight-bold mb-2">Đăng ký khách hàng</h3>
                    <p className="text-muted mb-0">Tạo tài khoản để mua đồ bóng đá nhanh hơn.</p>
                  </div>

                  {error && <div className="alert alert-danger">{error}</div>}
                  {success && <div className="alert alert-success">{success}</div>}

                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="font-weight-bold">Họ tên</label>
                      <input
                        id="registerFullName"
                        name="fullName"
                        type="text"
                        className="form-control"
                        placeholder="Nhập họ tên"
                        value={form.fullName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label className="font-weight-bold">Email</label>
                      <input
                        id="registerEmail"
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="Nhập email"
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label className="font-weight-bold">Số điện thoại</label>
                        <input
                          id="registerPhone"
                          name="phone"
                          type="text"
                          className="form-control"
                          placeholder="0909xxxxxx"
                          value={form.phone}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group col-md-6">
                        <label className="font-weight-bold">Địa chỉ</label>
                        <input
                          id="registerAddress"
                          name="address"
                          type="text"
                          className="form-control"
                          placeholder="TP. Hồ Chí Minh"
                          value={form.address}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label className="font-weight-bold">Mật khẩu</label>
                        <input
                          id="registerPassword"
                          name="password"
                          type="password"
                          className="form-control"
                          placeholder="Ít nhất 6 ký tự"
                          value={form.password}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group col-md-6">
                        <label className="font-weight-bold">Nhập lại mật khẩu</label>
                        <input
                          id="registerConfirmPassword"
                          name="confirmPassword"
                          type="password"
                          className="form-control"
                          placeholder="Nhập lại mật khẩu"
                          value={form.confirmPassword}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <button className="btn btn-success btn-lg btn-block font-weight-bold" disabled={loading}>
                      {loading ? "Đang đăng ký..." : "Đăng ký"}
                    </button>
                  </form>

                  <div className="text-center mt-4">
                    <span className="text-muted">Đã có tài khoản? </span>
                    <Link to="/login" className="font-weight-bold text-success">
                      Đăng nhập
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Register;
