using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CMS.Backend.Controllers
{
    public class UserController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly PasswordHasher<User> _hasher = new PasswordHasher<User>();

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ================= INDEX =================
        public IActionResult Index()
        {
            var data = _context.Users.ToList();
            return View(data);
        }

        // ================= CREATE =================
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(User model, string password)
        {
            if (string.IsNullOrEmpty(password))
            {
                ModelState.AddModelError("", "Password không được để trống");
                return View(model);
            }

            // HASH PASSWORD
            model.PasswordHash = _hasher.HashPassword(model, password);

            _context.Users.Add(model);
            _context.SaveChanges();

            return RedirectToAction("Index");
        }

        // ================= DELETE =================
        public IActionResult Delete(int id)
        {
            var user = _context.Users.Find(id);

            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }

            return RedirectToAction("Index");
        }

        // ================= EDIT =================
        [HttpGet]
        public IActionResult Edit(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null) return NotFound();

            return View(user);
        }

        [HttpPost]
        public IActionResult Edit(User model, string newPassword)
        {
            var user = _context.Users.Find(model.Id);
            if (user == null) return NotFound();

            // update field thường
            user.Username = model.Username;

            // nếu có password mới → hash
            if (!string.IsNullOrEmpty(newPassword))
            {
                user.PasswordHash = _hasher.HashPassword(user, newPassword);
            }

            _context.SaveChanges();

            return RedirectToAction("Index");
        }
    }
}