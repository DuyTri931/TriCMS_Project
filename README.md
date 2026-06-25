# TriCMS Project - Đồ án Quản lý Cửa Hàng Thể Thao

Đây là đồ án Website quản lý cửa hàng bán đồ thể thao với Backend sử dụng **ASP.NET Core Web API / MVC** và Frontend sử dụng **React.js**.

## Cấu trúc thư mục
- `CMS.Backend/`: Chứa mã nguồn ASP.NET Core (API và MVC Admin).
- `CMS.Data/`: Chứa Entity Framework Core Models và DB Context.
- `cms.frontend/`: Chứa mã nguồn React.js cho người dùng cuối.
- `TriCMS_Solution.sln`: File Solution tổng của dự án Visual Studio.

## Hướng dẫn cài đặt & Khởi chạy dự án

Dự án gồm 2 phần độc lập: **Backend** (API & Admin) và **Frontend** (React App). Bạn cần phải chạy đồng thời cả hai để website hoạt động đầy đủ tính năng.

### 1. Khởi chạy Backend (Visual Studio)

Phần Backend cung cấp API cho React và trang Quản trị (Admin).

**Yêu cầu:** Đã cài đặt Visual Studio 2022 (với workload ASP.NET and web development) và SQL Server LocalDB.

1. Mở file **`TriCMS_Solution.sln`** bằng Visual Studio 2022.
2. Đảm bảo project **`CMS.Backend`** được đặt làm **Startup Project** (Click chuột phải vào project `CMS.Backend` > *Set as Startup Project*).
3. Nhấn phím **`F5`** (hoặc nút Run/Play màu xanh lá) để khởi chạy Backend ở chế độ Debug.
4. Quá trình chạy sẽ tự động mở Swagger hoặc giao diện web. Hãy thu nhỏ cửa sổ trình duyệt đó và để Visual Studio tiếp tục chạy ngầm.

*Lưu ý: API Backend thường sẽ chạy trên cổng `https://localhost:7057` hoặc `https://localhost:7001` (xem trong `Properties/launchSettings.json`). Cổng này đã được cấu hình sẵn trong Frontend.*

### 2. Khởi chạy Frontend (Node.js & React)

Phần Frontend là giao diện dành cho người dùng mua hàng.

**Yêu cầu:** Đã cài đặt Node.js (phiên bản LTS).

1. Mở một cửa sổ Terminal (Command Prompt hoặc PowerShell).
2. Trỏ đường dẫn vào thư mục `cms.frontend`:
   ```bash
   cd path\to\TriCMS_Project\cms.frontend
   ```
3. Cài đặt các thư viện cần thiết (nếu là lần đầu tiên mở dự án):
   ```bash
   npm install
   ```
4. Khởi chạy Frontend:
   ```bash
   npm start
   ```
5. Dự án sẽ tự động mở lên trong trình duyệt tại địa chỉ: **`http://localhost:3000`**

---

## Một số tính năng nổi bật
- **Phân trang (Pagination)** ở trang chủ, cửa hàng và blog.
- **Lọc sản phẩm** theo danh mục và giá cả.
- **Giỏ hàng (Cart)** và quy trình thanh toán Checkout.
- **Giao diện đáp ứng (Responsive)** cho mobile và desktop.

*Được phát triển bởi Lê Duy Trí (2123110070).*
