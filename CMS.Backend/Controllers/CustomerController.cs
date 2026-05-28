/*
 * Họ và Tên: Trần Thị Kim Quí
 * Mã SV:2123110042
 * Ngày tạo: 15/05/2026
 */
using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;

namespace CMS.Backend.Controllers
{
    public class CustomerController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CustomerController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var data = _context.Customers.ToList();
            return View(data);
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(Customer model, string Password)
        {
            if (ModelState.IsValid)
            {
                var hasher = new PasswordHasher<Customer>();
                model.Password = hasher.HashPassword(model, Password);

                _context.Customers.Add(model);
                _context.SaveChanges();

                return RedirectToAction("Index");
            }

            return View(model);
        }

        public IActionResult Delete(int id)
        {
            var customer = _context.Customers.Find(id);

            if (customer != null)
            {
                _context.Customers.Remove(customer);
                _context.SaveChanges();
            }

            return RedirectToAction("Index");
        }

        [HttpGet]
        public IActionResult Edit(int id)
        {
            var customer = _context.Customers.Find(id);

            if (customer == null) return NotFound();

            return View(customer);
        }

        [HttpPost]
        public IActionResult Edit(Customer model, string Password)
        {
            var existing = _context.Customers.Find(model.Id);
            if (existing == null) return NotFound();

            // cập nhật field thường
            existing.FullName = model.FullName;
            existing.Email = model.Email;
            existing.Phone = model.Phone;
            existing.Address = model.Address;

            if (!string.IsNullOrEmpty(Password))
            {
                var hasher = new PasswordHasher<Customer>();
                existing.Password = hasher.HashPassword(existing, Password);
            }

            _context.SaveChanges();

            return RedirectToAction("Index");
        }
    }
}