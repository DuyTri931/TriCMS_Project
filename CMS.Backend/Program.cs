using Microsoft.EntityFrameworkCore;
using CMS.Data;
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

// ===============================
// 1. ADD SERVICES
// ===============================

// MVC + API Controller
builder.Services.AddControllersWithViews();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Đăng ký DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);

// Cấu hình Cookie Authentication cho trang Admin
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Account/Login";
        options.AccessDeniedPath = "/Account/AccessDenied";
    });

// Cấu hình CORS cho React Client
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins(
                "http://localhost:3000",
                "http://localhost:3001"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// ===============================
// 2. CONFIGURE PIPELINE
// ===============================

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

// Swagger chỉ bật khi chạy Development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Cho phép truy cập file trong wwwroot, ví dụ: /img/abc.jpg
app.UseStaticFiles();

app.UseRouting();

// CORS phải nằm sau UseRouting và trước Authentication/Authorization
app.UseCors("AllowReactApp");

// Đăng nhập Admin
app.UseAuthentication();

// Phân quyền Admin
app.UseAuthorization();

// ===============================
// 3. MAP ROUTES
// ===============================

// Route cho API Controller, ví dụ:
// /api/Categories
// /api/Posts
// /api/Products
app.MapControllers();

// Route cho MVC Admin, ví dụ:
// /Category/Index
// /Post/Index
// /Product/Index
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}"
);

app.Run();