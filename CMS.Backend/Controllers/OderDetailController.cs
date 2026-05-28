using CMS.Data.Entities;
using CMS.Data;
using Microsoft.AspNetCore.Mvc;

namespace CMS.Backend.Controllers
{
    public class OrderDetailController : Controller
    {
        private readonly ApplicationDbContext _context;

        // "Tiêm" kết nối vào Controller
        public OrderDetailController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index(int id)
        {
            // Lấy các sản phẩm thuộc đơn hàng
            var data = _context.OrderDetails
                        .Where(x => x.OrderId == id)
                        .ToList();
            // Trả dữ liệu sang View
            return View(data);
        }

        // 1. Hàm GET: Dùng để hiển thị giao diện Form cho nhập
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        // 2. Hàm POST: Dùng để đón dữ liệu từ Form gửi lên và lưu vào SQL
        [HttpPost]
        public IActionResult Create(OrderDetail model)
        {
            // BƯỚC 1: Thêm dữ liệu vào bộ nhớ tạm của Entity Framework
            _context.OrderDetails.Add(model);

            // BƯỚC 2: Ra lệnh cho hệ thống ghi dữ liệu thật sự vào SQL Server
            _context.SaveChanges();

            // Sau khi lưu thành công, tự động quay về trang danh sách
            return RedirectToAction("Index");
        }

        public IActionResult Delete(int id)
        {
            // Bước 1: Tìm đối tượng danh mục trong Database bằng Id
            var orderDetail = _context.OrderDetails.Find(id);

            // Kiểm tra nếu tìm thấy thì mới xóa
            if (orderDetail != null)
            {
                // Bước 2: Lệnh xóa khỏi bộ nhớ tạm (Tracking)
                _context.OrderDetails.Remove(orderDetail);

                // Bước 3: Chốt phiên làm việc, xóa thực sự trong SQL Server
                _context.SaveChanges();
            }

            // Sau khi xóa xong, quay lại trang danh sách để cập nhật giao diện
            return RedirectToAction("Index");
        }

        [HttpGet]
        public IActionResult Edit(int id)
        {
            // Tìm danh mục trong Database theo Id
            var orderDetail = _context.OrderDetails.Find(id);

            if (orderDetail == null) return NotFound();

            return View(orderDetail); // Gửi đối tượng tìm được sang giao diện Edit
        }

        // 2. Hàm POST: Nhận dữ liệu mới từ người dùng và lưu lại
        [HttpPost]
        public IActionResult Edit(OrderDetail model)
        {
            // Lệnh cập nhật đối tượng vào bộ nhớ tạm
            _context.OrderDetails.Update(model);

            // Lưu thay đổi thực sự xuống SQL Server
            _context.SaveChanges();

            // Quay lại trang danh sách để xem kết quả
            return RedirectToAction("Index");
        }
    }
}