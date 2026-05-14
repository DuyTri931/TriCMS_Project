/*
 * Sinh Vien: Tong Le Duy Tri
 * Ma SV: 2123110070
 * Ngay Tao: 14/5/2026
 * Version 1.0
 **/
namespace CMS.Data.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public string FullName { get; set; }
        public string Role { get; set; } // Quản trị viên hoặc Biên tập viên
    }
}
