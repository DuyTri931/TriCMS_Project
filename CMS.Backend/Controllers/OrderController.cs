using CMS.Data.Entities;
using CMS.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace CMS.Backend.Controllers
{
    public class OrderController : Controller
    {
        private readonly ApplicationDbContext _context;

        // "Tiêm" kết nối vào Controller
        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }
        public IActionResult Order(int id)
        {
            return View(id);
        }

        public IActionResult Index()
        {
            // Lấy dữ liệu THẬT từ bảng Orders trong SQL
            var data = _context.Orders.ToList();
            return View(data);
        }

        // 1. Hàm GET: Dùng để hiển thị giao diện Form cho nhập
        [HttpGet]
        public IActionResult Create()
        {
            ViewBag.Customers = _context.Customers.ToList();

            return View();
        }

        // 2. Hàm POST: Dùng để đón dữ liệu từ Form gửi lên và lưu vào SQL
        [HttpPost]
        public IActionResult Create(Order model)
        {
            if (!ModelState.IsValid)
            {
                ViewBag.Customers = _context.Customers.ToList();
                return View(model);
            }
            // BƯỚC 1: Thêm dữ liệu vào bộ nhớ tạm của Entity Framework
            _context.Orders.Add(model);

            // BƯỚC 2: Ra lệnh cho hệ thống ghi dữ liệu thật sự vào SQL Server
            _context.SaveChanges();

            // Sau khi lưu thành công, tự động quay về trang danh sách
            return RedirectToAction("Index");
        }

        public IActionResult Delete(int id)
        {
            // Bước 1: Tìm đối tượng danh mục trong Database bằng Id
            var order = _context.Orders.Find(id);

            // Kiểm tra nếu tìm thấy thì mới xóa
            if (order != null)
            {
                // Bước 2: Lệnh xóa khỏi bộ nhớ tạm (Tracking)
                _context.Orders.Remove(order);

                // Bước 3: Chốt phiên làm việc, xóa thực sự trong SQL Server
                _context.SaveChanges();
            }

            // Sau khi xóa xong, quay lại trang danh sách để cập nhật giao diện
            return RedirectToAction("Index");
        }

        [HttpGet]
        public IActionResult Edit(int id)
        {
            // 1. Lấy order trước
            var order = _context.Orders.Find(id);
            if (order == null) return NotFound();

            // 2. Sau đó mới tạo dropdown
            ViewBag.Customers = new SelectList(
                _context.Customers,
                "Id",
                "FullName",
                order.CustomerId // ✔ selected value
            );

            return View(order);
        }

        // 2. Hàm POST: Nhận dữ liệu mới từ người dùng và lưu lại
        [HttpPost]
        public IActionResult Edit(Order model)
        {
            if (!ModelState.IsValid)
            {
                ViewBag.Customers = new SelectList(
                    _context.Customers,
                    "Id",
                    "FullName",
                    model.CustomerId
                );
                return View(model);
            }

            _context.Orders.Update(model);
            _context.SaveChanges();

            return RedirectToAction("Index");
        }
    }
}