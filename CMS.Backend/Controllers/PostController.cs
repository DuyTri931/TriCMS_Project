using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    [Authorize]
    public class PostController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _env;

        public PostController(ApplicationDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        private void LoadCategoryList(int? selectedId = null)
        {
            ViewBag.CategoryList = new SelectList(
                _context.Categories.ToList(),
                "Id",
                "Name",
                selectedId
            );
        }

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

        public IActionResult Index(int? id)
        {
            var query = _context.Posts
                .Include(p => p.Category)
                .AsQueryable();

            if (id != null)
            {
                query = query.Where(p => p.CategoryId == id);
            }

            var posts = query
                .OrderByDescending(p => p.CreatedDate)
                .ToList();

            return View(posts);
        }

        public IActionResult Details(int id)
        {
            var post = _context.Posts
                .Include(p => p.Category)
                .FirstOrDefault(p => p.Id == id);

            if (post == null)
            {
                return NotFound();
            }

            return View(post);
        }

        [HttpGet]
        public IActionResult Create()
        {
            LoadCategoryList();
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [RequestSizeLimit(104857600)]
        [RequestFormLimits(MultipartBodyLengthLimit = 104857600)]
        public IActionResult Create(Post model, IFormFile? uploadImage)
        {
            ModelState.Remove("ImageUrl");
            ModelState.Remove("Category");

            if (!ModelState.IsValid)
            {
                LoadCategoryList(model.CategoryId);
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

                if (model.CreatedDate == DateTime.MinValue)
                {
                    model.CreatedDate = DateTime.Now;
                }

                _context.Posts.Add(model);
                _context.SaveChanges();

                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex.Message);
                LoadCategoryList(model.CategoryId);
                return View(model);
            }
        }

        [HttpGet]
        public IActionResult Edit(int id)
        {
            var post = _context.Posts.Find(id);

            if (post == null)
            {
                return NotFound();
            }

            LoadCategoryList(post.CategoryId);
            return View(post);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [RequestSizeLimit(104857600)]
        [RequestFormLimits(MultipartBodyLengthLimit = 104857600)]
        public IActionResult Edit(Post model, IFormFile? uploadImage)
        {
            ModelState.Remove("ImageUrl");
            ModelState.Remove("Category");

            if (!ModelState.IsValid)
            {
                LoadCategoryList(model.CategoryId);
                return View(model);
            }

            var post = _context.Posts.FirstOrDefault(p => p.Id == model.Id);

            if (post == null)
            {
                return NotFound();
            }

            try
            {
                post.Title = model.Title;
                post.Content = model.Content;
                post.CategoryId = model.CategoryId;

                if (post.CreatedDate == DateTime.MinValue)
                {
                    post.CreatedDate = DateTime.Now;
                }

                if (uploadImage != null && uploadImage.Length > 0)
                {
                    post.ImageUrl = SaveUploadImage(uploadImage);
                }

                _context.SaveChanges();

                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex.Message);
                LoadCategoryList(model.CategoryId);
                return View(model);
            }
        }

        public IActionResult Delete(int id)
        {
            var post = _context.Posts.Find(id);

            if (post != null)
            {
                _context.Posts.Remove(post);
                _context.SaveChanges();
            }

            return RedirectToAction("Index");
        }
    }
}