using System.Linq;
using CMS.Data.Entities;
using CMS.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    public class OrderDetailController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<OrderDetailController> _logger;

        // "Tiêm" kết nối vào Controller
        public OrderDetailController(ApplicationDbContext context, ILogger<OrderDetailController> logger)
        {
            _context = context;
            _logger = logger;
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
        public IActionResult Create(int? orderId = null)
        {
            ViewBag.Products = new SelectList(_context.Products, "Id", "Name");
            ViewBag.OrderId = orderId;
            return View();
        }

        // 2. Hàm POST: Dùng để đón dữ liệu từ Form gửi lên và lưu vào SQL
        [HttpPost]
        public IActionResult Create(OrderDetail model)
        {
            // Basic model binding / value validation
            if (!ModelState.IsValid)
            {
                ViewBag.Products = new SelectList(_context.Products, "Id", "Name", model.ProductId);
                return View(model);
            }

            if (model.ProductId <= 0)
            {
                ModelState.AddModelError(nameof(model.ProductId), "ProductId is required.");
                ViewBag.Products = new SelectList(_context.Products, "Id", "Name", model.ProductId);
                return View(model);
            }

            if (!_context.Products.Any(p => p.Id == model.ProductId))
            {
                ModelState.AddModelError(nameof(model.ProductId), "Selected product does not exist.");
                ViewBag.Products = new SelectList(_context.Products, "Id", "Name", model.ProductId);
                return View(model);
            }

            if (model.OrderId <= 0 || !_context.Orders.Any(o => o.Id == model.OrderId))
            {
                ModelState.AddModelError(nameof(model.OrderId), "Associated order does not exist.");
                ViewBag.Products = new SelectList(_context.Products, "Id", "Name", model.ProductId);
                return View(model);
            }

            _context.OrderDetails.Add(model);

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateException ex)
            {
                // Log helpful context for diagnosis and surface a friendly error
                _logger.LogError(ex, "Failed saving OrderDetail. ProductId={ProductId} OrderId={OrderId} Quantity={Quantity} UnitPrice={UnitPrice}",
                    model.ProductId, model.OrderId, model.Quantity, model.UnitPrice);

                ModelState.AddModelError(string.Empty, "Unable to save order detail. Please verify selected product and try again.");
                ViewBag.Products = new SelectList(_context.Products, "Id", "Name", model.ProductId);
                return View(model);
            }

            // Sau khi lưu thành công, tự động quay về trang danh sách
            return RedirectToAction("Index", new { id = model.OrderId });
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

                // Go back to the order's detail list
                return RedirectToAction("Index", new { id = orderDetail.OrderId });
            }

            // If not found, go to global orders list
            return RedirectToAction("Index", "Order");
        }

        [HttpGet]
        public IActionResult Edit(int id)
        {
            // Tìm danh mục trong Database theo Id
            var orderDetail = _context.OrderDetails.Find(id);

            if (orderDetail == null) return NotFound();

            ViewBag.Products = new SelectList(_context.Products, "Id", "Name", orderDetail.ProductId);
            return View(orderDetail); // Gửi đối tượng tìm được sang giao diện Edit
        }

        // 2. Hàm POST: Nhận dữ liệu mới từ người dùng và lưu lại
        [HttpPost]
        public IActionResult Edit(OrderDetail model)
        {
            if (!ModelState.IsValid)
            {
                ViewBag.Products = new SelectList(_context.Products, "Id", "Name", model.ProductId);
                return View(model);
            }

            if (model.ProductId <= 0 || !_context.Products.Any(p => p.Id == model.ProductId))
            {
                ModelState.AddModelError(nameof(model.ProductId), "Selected product does not exist.");
                ViewBag.Products = new SelectList(_context.Products, "Id", "Name", model.ProductId);
                return View(model);
            }

            if (model.OrderId <= 0 || !_context.Orders.Any(o => o.Id == model.OrderId))
            {
                ModelState.AddModelError(nameof(model.OrderId), "Associated order does not exist.");
                ViewBag.Products = new SelectList(_context.Products, "Id", "Name", model.ProductId);
                return View(model);
            }

            _context.OrderDetails.Update(model);

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateException ex)
            {
                _logger.LogError(ex, "Failed updating OrderDetail. Id={Id} ProductId={ProductId} OrderId={OrderId}", model.Id, model.ProductId, model.OrderId);
                ModelState.AddModelError(string.Empty, "Unable to update order detail. Please verify values and try again.");
                ViewBag.Products = new SelectList(_context.Products, "Id", "Name", model.ProductId);
                return View(model);
            }

            // Quay lại trang danh sách để xem kết quả
            return RedirectToAction("Index", new { id = model.OrderId });
        }
    }
}