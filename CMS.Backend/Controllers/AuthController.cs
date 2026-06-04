using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;

namespace CMS.Backend.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/Auth/CustomerRegister
        [HttpPost("CustomerRegister")]
        public IActionResult CustomerRegister([FromBody] CustomerRegisterRequest request)
        {
            if (request == null)
            {
                return BadRequest(new { message = "Dữ liệu không hợp lệ" });
            }

            if (string.IsNullOrEmpty(request.FullName) ||
                string.IsNullOrEmpty(request.Email) ||
                string.IsNullOrEmpty(request.Password))
            {
                return BadRequest(new { message = "Vui lòng nhập đầy đủ họ tên, email và mật khẩu" });
            }

            var emailExists = _context.Customers
                .Any(c => c.Email == request.Email);

            if (emailExists)
            {
                return BadRequest(new { message = "Email đã tồn tại" });
            }

            var customer = new Customer
            {
                FullName = request.FullName,
                Email = request.Email,
                Password = request.Password,
                Phone = request.Phone,
                Address = request.Address
            };

            _context.Customers.Add(customer);
            _context.SaveChanges();

            return Ok(new
            {
                message = "Đăng ký thành công",
                customerId = customer.Id,
                fullName = customer.FullName,
                email = customer.Email,
                phone = customer.Phone,
                address = customer.Address
            });
        }

        // POST: api/Auth/CustomerLogin
        [HttpPost("CustomerLogin")]
        public IActionResult CustomerLogin([FromBody] CustomerLoginRequest request)
        {
            if (request == null)
            {
                return BadRequest(new { message = "Dữ liệu không hợp lệ" });
            }

            var customer = _context.Customers
                .FirstOrDefault(c => c.Email == request.Email && c.Password == request.Password);

            if (customer == null)
            {
                return Unauthorized(new { message = "Email hoặc mật khẩu không đúng" });
            }

            return Ok(new
            {
                message = "Đăng nhập thành công",
                customerId = customer.Id,
                fullName = customer.FullName,
                email = customer.Email,
                phone = customer.Phone,
                address = customer.Address
            });
        }
    }

    public class CustomerRegisterRequest
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public string? Phone { get; set; }
        public string? Address { get; set; }
    }

    public class CustomerLoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}