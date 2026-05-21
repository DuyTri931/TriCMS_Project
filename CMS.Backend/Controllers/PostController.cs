using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        // Hiển thị tất cả bài viết
        public IActionResult Index()
        {
            var posts = _context.Posts
                        .Include(p => p.Category)
                        .OrderByDescending(p => p.CreatedDate)
                        .ToList();

            return View(posts);
        }

        // Lọc bài viết theo CategoryId
        public IActionResult ListByCategory(int? id)
        {
            if (id == null)
            {
                return BadRequest("Vui lòng cung cấp mã danh mục.");
            }

            var posts = _context.Posts
                        .Where(p => p.CategoryId == id)
                        .OrderByDescending(p => p.CreatedDate)
                        .Include(p => p.Category)
                        .ToList();

            return View("Index", posts);
        }

        // GET: Post/Details/5
        public IActionResult Details(int id)
        {
            // 1. Truy vấn bài viết theo ID
            // Sử dụng Include để lấy kèm thông tin Category
            var post = _context.Posts
                .Include(p => p.Category)
                .FirstOrDefault(p => p.Id == id);

            // 2. Kiểm tra nếu không tìm thấy
            if (post == null)
            {
                return NotFound();
            }

            // 3. Trả dữ liệu sang View
            return View(post);
        }
    }
}