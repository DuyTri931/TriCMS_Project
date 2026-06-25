import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import authService from "../../services/authService";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email.trim() || !form.password.trim()) {
      setError("Vui lòng nhập đầy đủ Email và Mật khẩu.");
      return;
    }

    try {
      setLoading(true);
      await authService.login({
        email: form.email.trim(),
        password: form.password,
      });

      const redirectTo = location.state?.from || "/";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || "Đăng nhập thất bại. Kiểm tra Email hoặc Mật khẩu.");
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
            <div className="col-lg-5 col-md-7">
              <div className="card border-0 shadow-lg auth-card">
                <div className="card-body p-4 p-md-5">
                  <div className="text-center mb-4">
                    <div className="auth-icon mb-3">
                      <i className="fas fa-user-shield"></i>
                    </div>
                    <h3 className="font-weight-bold mb-2">Đăng nhập khách hàng</h3>
                    <p className="text-muted mb-0">Vào tài khoản để đặt hàng nhanh hơn.</p>
                  </div>

                  {error && <div className="alert alert-danger">{error}</div>}

                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="font-weight-bold">Email</label>
                      <input
                        id="loginEmail"
                        name="email"
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="Nhập email của bạn"
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label className="font-weight-bold">Mật khẩu</label>
                      <input
                        id="loginPassword"
                        name="password"
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Nhập mật khẩu"
                        value={form.password}
                        onChange={handleChange}
                      />
                    </div>

                    <button className="btn btn-success btn-lg btn-block font-weight-bold" disabled={loading}>
                      {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>
                  </form>

                  <div className="text-center mt-4">
                    <span className="text-muted">Chưa có tài khoản? </span>
                    <Link to="/register" className="font-weight-bold text-success">
                      Đăng ký ngay
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

export default Login;
