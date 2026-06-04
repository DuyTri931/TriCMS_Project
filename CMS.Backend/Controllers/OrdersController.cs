using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data;
using CMS.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrdersController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// API: Tiếp nhận đơn đặt hàng từ giỏ hàng FrontEnd gửi lên
        /// Đường dẫn: POST https://localhost:xxxx/api/Orders
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] OrderInputDTO input)
        {
            if (input == null)
            {
                return BadRequest(new { message = "Dữ liệu đơn hàng không hợp lệ" });
            }

            if (input.CustomerId <= 0)
            {
                return BadRequest(new { message = "CustomerId không hợp lệ" });
            }

            if (input.CartItems == null || input.CartItems.Count == 0)
            {
                return BadRequest(new { message = "Giỏ hàng đang trống" });
            }

            try
            {
                var customer = await _context.Customers.FindAsync(input.CustomerId);

                if (customer == null)
                {
                    return BadRequest(new { message = "Khách hàng không tồn tại" });
                }

                // Bước 1: Tạo đơn hàng mới
                var newOrder = new Order
                {
                    OrderDate = DateTime.Now,
                    CustomerId = input.CustomerId,
                    Status = 0,
                    Notes = input.Notes
                };

                _context.Orders.Add(newOrder);
                await _context.SaveChangesAsync();

                // Bước 2: Duyệt từng sản phẩm trong giỏ hàng
                foreach (var item in input.CartItems)
                {
                    if (item.ProductId <= 0 || item.Quantity <= 0)
                    {
                        return BadRequest(new { message = "Sản phẩm hoặc số lượng không hợp lệ" });
                    }

                    var product = await _context.Products.FindAsync(item.ProductId);

                    if (product == null)
                    {
                        return BadRequest(new { message = $"Không tìm thấy sản phẩm có ID = {item.ProductId}" });
                    }

                    if (product.StockQuantity < item.Quantity)
                    {
                        return BadRequest(new { message = $"Sản phẩm {product.Name} không đủ hàng trong kho" });
                    }

                    var orderDetail = new OrderDetail
                    {
                        OrderId = newOrder.Id,
                        ProductId = product.Id,
                        Quantity = item.Quantity,
                        UnitPrice = product.Price
                    };

                    _context.OrderDetails.Add(orderDetail);

                    // Bước 3: Trừ số lượng tồn kho
                    product.StockQuantity -= item.Quantity;
                }

                await _context.SaveChangesAsync();

                return StatusCode(201, new
                {
                    message = "Đặt hàng thành công!",
                    orderId = newOrder.Id
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Lỗi xử lý tạo đơn hàng ngầm",
                    detail = ex.Message
                });
            }
        }
    }

    // DTO nhận dữ liệu từ FrontEnd
    public class OrderInputDTO
    {
        public int CustomerId { get; set; }
        public string? Notes { get; set; }

        public List<CartItemDTO> CartItems { get; set; }
    }

    public class CartItemDTO
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}