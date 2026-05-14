/*
 * Sinh Vien: Tong Le Duy Tri
 * Ma SV: 2123110070
 * Ngay Tao: 14/5/2026
 * Version 1.0
 **/
namespace CMS.Data.Entities
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; } // Tên danh mục (vd: Tin Giáo Dục)
        public string Description { get; set; }

        // Quan hệ: Một danh mục có nhiều bài viết
        public virtual ICollection<Post> Posts { get; set; }
    }
}
