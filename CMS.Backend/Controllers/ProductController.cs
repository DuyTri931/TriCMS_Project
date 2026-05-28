using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    public class ProductController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ProductController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ================= INDEX =================
        public IActionResult Index()
        {
            var data = _context.Products.ToList();
            return View(data);
        }

        // ================= CREATE =================
        [HttpGet]
        public IActionResult Create()
        {
            LoadCategories();
            return View();
        }

        [HttpPost]
        public IActionResult Create(Product model, IFormFile uploadImage)
        {
            if (uploadImage != null && uploadImage.Length > 0)
            {
                // 1. Định nghĩa đường dẫn lưu file: wwwroot/uploads
                string folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");

                // Tạo thư mục nếu chưa tồn tại
                if (!Directory.Exists(folder)) Directory.CreateDirectory(folder);

                // 2. Tạo tên file duy nhất để không bị đè dữ liệu
                string fileName = Guid.NewGuid().ToString() + Path.GetExtension(uploadImage.FileName);
                string filePath = Path.Combine(folder, fileName);

                // 3. Chép file vào thư mục
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    uploadImage.CopyTo(stream);
                }

                // 4. Lưu đường dẫn vào CSDL để sau này hiển thị
                model.ImageUrl = "/uploads/" + fileName;
            }

            _context.Products.Add(model);
            _context.SaveChanges();

            return RedirectToAction("Index");
        }

        // ================= EDIT =================
        [HttpGet]
        public IActionResult Edit(int id)
        {
            var product = _context.Products.Find(id);
            if (product == null) return NotFound();

            LoadCategories(product.CategoryProductId);
            return View(product);
        }

        [HttpPost]
        public IActionResult Edit(Product model, IFormFile uploadImage)
        {
            // Bước 1: Kiểm tra xem người dùng có chọn file ảnh mới không
            if (uploadImage != null && uploadImage.Length > 0)
            {
                // Thực hiện quy trình upload giống như trang Create
                string folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
                if (!Directory.Exists(folder)) Directory.CreateDirectory(folder);

                string fileName = Guid.NewGuid().ToString() + Path.GetExtension(uploadImage.FileName);
                string filePath = Path.Combine(folder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    uploadImage.CopyTo(stream);
                }

                // Cập nhật đường dẫn ảnh mới vào model
                model.ImageUrl = "/uploads/" + fileName;
            }
            else
            {
                // Bước quan trọng: Nếu không upload ảnh mới, chúng ta phải giữ lại ảnh cũ
                // Chúng ta cần lấy lại giá trị ImageUrl từ Database để tránh bị ghi đè thành rỗng
                var oldPost = _context.Posts.AsNoTracking().FirstOrDefault(p => p.Id == model.Id);
                if (oldPost != null && string.IsNullOrEmpty(model.ImageUrl))
                {
                    model.ImageUrl = oldPost.ImageUrl;
                }
            }

            _context.Products.Update(model);
            _context.SaveChanges();

            return RedirectToAction("Index");
        }

        // ================= DELETE =================
        public IActionResult Delete(int id)
        {
            var product = _context.Products.Find(id);

            if (product != null)
            {
                _context.Products.Remove(product);
                _context.SaveChanges();
            }

            return RedirectToAction("Index");
        }

        // ================= HELPER =================
        private void LoadCategories(int? selectedId = null)
        {
            ViewBag.Categories = new SelectList(
                _context.CategoriesProducts,
                "Id",
                "Name",
                selectedId
            );
        }
    }
}