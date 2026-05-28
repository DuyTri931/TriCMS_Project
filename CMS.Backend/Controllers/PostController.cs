using Microsoft.AspNetCore.Mvc;
using CMS.Data;
using CMS.Data.Entities;

namespace CMS.Backend.Controllers
{
    public class PostController : Controller
    {
        private readonly ApplicationDbContext _context;

        // Constructor Injection
        public PostController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Lấy danh sách bài viết từ Database
        public IActionResult Index()
        {
            var posts = _context.Posts.ToList();

            return View(posts);
        }
    }
}