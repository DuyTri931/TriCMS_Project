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
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ProductController(ApplicationDbContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        // ================= INDEX =================

        public IActionResult Index()
        {
            var products = _context.Products
                .Include(p => p.CategoryProduct)
                .ToList();

            return View(products);
        }

        // ================= LOAD DANH MỤC =================

        private void LoadCategories(int? selectedId = null)
        {
            ViewBag.Categories = new SelectList(
                _context.CategoriesProducts.ToList(),
                "Id",
                "Name",
                selectedId
            );
        }

        // ================= LƯU ẢNH =================

        private async Task<string?> SaveImageAsync(IFormFile? imageFile)
        {
            if (imageFile == null || imageFile.Length == 0)
            {
                return null; // For Edit where image is optional
            }

            // Giới hạn 10MB
            if (imageFile.Length > 10 * 1024 * 1024)
            {
                throw new Exception($"File ảnh quá lớn ({imageFile.Length / 1024 / 1024}MB). Tối đa là 10MB.");
            }

            var extension = Path.GetExtension(imageFile.FileName).ToLower();

            var allowedExtensions = new[]
            {
                ".jpg", ".jpeg", ".png", ".webp", ".gif", ".jfif"
            };

            if (!allowedExtensions.Contains(extension))
            {
                throw new Exception($"Đuôi file '{extension}' không được hỗ trợ. Chỉ hỗ trợ: .jpg, .jpeg, .png, .webp, .gif, .jfif");
            }

            var wwwRootPath = _webHostEnvironment.WebRootPath;

            if (string.IsNullOrEmpty(wwwRootPath))
            {
                wwwRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            }

            var uploadFolder = Path.Combine(wwwRootPath, "img", "products");

            if (!Directory.Exists(uploadFolder))
            {
                Directory.CreateDirectory(uploadFolder);
            }

            var fileName = Guid.NewGuid().ToString() + extension;
            var filePath = Path.Combine(uploadFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }

            return "/img/products/" + fileName;
        }

        // ================= CREATE =================

        [HttpGet]
        public IActionResult Create()
        {
            LoadCategories();
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [RequestSizeLimit(104857600)]
        [RequestFormLimits(MultipartBodyLengthLimit = 104857600)]
        public async Task<IActionResult> Create(Product model, IFormFile? imageFile)
        {
            ModelState.Remove("ImageUrl");
            ModelState.Remove("CategoryProduct");

            if (imageFile == null || imageFile.Length == 0)
            {
                ModelState.AddModelError("ImageUrl", "Vui lòng chọn ảnh sản phẩm.");
            }

            if (!ModelState.IsValid)
            {
                LoadCategories(model.CategoryProductId);
                return View(model);
            }

            try
            {
                var imageUrl = await SaveImageAsync(imageFile);

                model.ImageUrl = imageUrl;

                _context.Products.Add(model);
                await _context.SaveChangesAsync();

                return RedirectToAction(nameof(Index));
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", "Lỗi khi lưu sản phẩm: " + ex.Message);
                LoadCategories(model.CategoryProductId);
                return View(model);
            }
        }

        // ================= EDIT =================

        [HttpGet]
        public IActionResult Edit(int id)
        {
            var product = _context.Products.Find(id);

            if (product == null)
            {
                return NotFound();
            }

            LoadCategories(product.CategoryProductId);
            return View(product);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [RequestSizeLimit(104857600)]
        [RequestFormLimits(MultipartBodyLengthLimit = 104857600)]
        public async Task<IActionResult> Edit(int id, Product model, IFormFile? imageFile)
        {
            if (id != model.Id)
            {
                return NotFound();
            }

            ModelState.Remove("ImageUrl");
            ModelState.Remove("CategoryProduct");

            if (!ModelState.IsValid)
            {
                LoadCategories(model.CategoryProductId);
                return View(model);
            }

            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            try
            {
                product.Name = model.Name;
                product.Description = model.Description;
                product.Price = model.Price;
                product.StockQuantity = model.StockQuantity;
                product.CategoryProductId = model.CategoryProductId;

                var imageUrl = await SaveImageAsync(imageFile);

                if (!string.IsNullOrEmpty(imageUrl))
                {
                    product.ImageUrl = imageUrl;
                }

                await _context.SaveChangesAsync();

                return RedirectToAction(nameof(Index));
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", "Lỗi khi cập nhật sản phẩm: " + ex.Message);
                LoadCategories(model.CategoryProductId);
                return View(model);
            }
        }

        // ================= DELETE =================

        public async Task<IActionResult> Delete(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product != null)
            {
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
            }

            return RedirectToAction(nameof(Index));
        }
    }
}