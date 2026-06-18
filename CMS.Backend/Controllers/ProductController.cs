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
        private readonly IWebHostEnvironment _env;

        public ProductController(ApplicationDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // ================= INDEX =================
        public IActionResult Index()
        {
            var data = _context.Products
                .Include(p => p.CategoryProduct)
                .OrderByDescending(p => p.Id)
                .ToList();

            return View(data);
        }

        // ================= CREATE - GET =================
        [HttpGet]
        public IActionResult Create()
        {
            LoadCategories();
            return View();
        }

        // ================= CREATE - POST =================
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Product model, IFormFile? uploadImage)
        {
            ModelState.Remove("ImageUrl");
            ModelState.Remove("CategoryProduct");

            if (!ModelState.IsValid)
            {
                LoadCategories(model.CategoryProductId);
                return View(model);
            }

            try
            {
                if (uploadImage != null && uploadImage.Length > 0)
                {
                    model.ImageUrl = SaveUploadImage(uploadImage);
                }
                else
                {
                    model.ImageUrl = "/uploads/default.jpg";
                }

                _context.Products.Add(model);
                _context.SaveChanges();

                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex.Message);
                LoadCategories(model.CategoryProductId);
                return View(model);
            }
        }

        // ================= EDIT - GET =================
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

        // ================= EDIT - POST =================
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(Product model, IFormFile? uploadImage)
        {
            ModelState.Remove("ImageUrl");
            ModelState.Remove("CategoryProduct");

            if (!ModelState.IsValid)
            {
                LoadCategories(model.CategoryProductId);
                return View(model);
            }

            var product = _context.Products.FirstOrDefault(p => p.Id == model.Id);

            if (product == null)
            {
                return NotFound();
            }

            try
            {
                product.Name = model.Name;
                product.Price = model.Price;
                product.StockQuantity = model.StockQuantity;
                product.Description = model.Description;
                product.CategoryProductId = model.CategoryProductId;

                if (uploadImage != null && uploadImage.Length > 0)
                {
                    product.ImageUrl = SaveUploadImage(uploadImage);
                }

                _context.SaveChanges();

                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex.Message);
                LoadCategories(model.CategoryProductId);
                return View(model);
            }
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

        // ================= HELPER: LOAD CATEGORY =================
        private void LoadCategories(int? selectedId = null)
        {
            ViewBag.Categories = new SelectList(
                _context.CategoriesProducts.ToList(),
                "Id",
                "Name",
                selectedId
            );
        }

        // ================= HELPER: SAVE IMAGE =================
        private string SaveUploadImage(IFormFile uploadImage)
        {
            string webRootPath = _env.WebRootPath;

            if (string.IsNullOrEmpty(webRootPath))
            {
                webRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            }

            string uploadsFolder = Path.Combine(webRootPath, "uploads");

            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            string extension = Path.GetExtension(uploadImage.FileName).ToLower();

            string[] allowedExtensions =
            {
                ".jpg", ".jpeg", ".png", ".gif", ".webp"
            };

            if (!allowedExtensions.Contains(extension))
            {
                throw new Exception("Chỉ được upload ảnh có định dạng .jpg, .jpeg, .png, .gif, .webp");
            }

            string fileName = Guid.NewGuid().ToString() + extension;
            string filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                uploadImage.CopyTo(stream);
            }

            return "/uploads/" + fileName;
        }
    }
}