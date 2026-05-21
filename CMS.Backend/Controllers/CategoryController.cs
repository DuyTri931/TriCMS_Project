using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;

namespace CMS.Backend.Controllers
{
    public class CategoryController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CategoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ==========================
        // LIST
        // ==========================
        public IActionResult Index()
        {
            var data = _context.Categories.ToList();
            return View(data);
        }

        // ==========================
        // CREATE (GET)
        // ==========================
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        // ==========================
        // CREATE (POST)
        // ==========================
        [HttpPost]
        public IActionResult Create(Category model)
        {
            if (ModelState.IsValid)
            {
                _context.Categories.Add(model);
                _context.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(model);
        }

        // ==========================
        // DELETE
        // ==========================
        public IActionResult Delete(int id)
        {
            var category = _context.Categories.Find(id);

            if (category != null)
            {
                _context.Categories.Remove(category);
                _context.SaveChanges();
            }

            return RedirectToAction("Index");
        }

        // ==========================
        // EDIT (GET)
        // ==========================
        [HttpGet]
        public IActionResult Edit(int id)
        {
            // Tìm dữ liệu cũ trong DB
            var category = _context.Categories.Find(id);

            if (category == null)
                return NotFound();

            // Đổ dữ liệu lên form
            return View(category);  
        }

        // ==========================
        // EDIT (POST)
        // ==========================
        [HttpPost]
        public IActionResult Edit(Category model)
        {
            if (ModelState.IsValid)
            {
                _context.Categories.Update(model);
                _context.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(model);
        }
    }
}