using System.Diagnostics;
using CMS.Backend.Models;
using CMS.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<HomeController> _logger;

        // Tiêm DbContext + Logger
        public HomeController(
            ILogger<HomeController> logger,
            ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        // ==========================
        // Trang Home - Lấy 3 bài viết mới nhất
        // ==========================
        public IActionResult Index()
        {
            var latestPosts = _context.Posts
                .Include(p => p.Category) // lấy kèm danh mục
                .OrderByDescending(p => p.CreatedDate) // mới nhất lên đầu
                .Take(3) // chỉ lấy 3 bài
                .ToList();

            return View(latestPosts);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel
            {
                RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier
            });
        }
    }
}