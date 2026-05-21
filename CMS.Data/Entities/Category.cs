/*
 * Sinh Vien: Tong Le Duy Tri
 * Ma SV: 2123110070
 * Ngay Tao: 14/5/2026
 * Version 1.0
 **/
using System.Collections.Generic;

namespace CMS.Data.Entities
{
    public class Category
    {
        public int Id { get; set; }

        // Tên danh mục
        public string Name { get; set; }

        public string Description { get; set; }

        // Quan hệ 1-N
        public virtual ICollection<Post> Posts { get; set; }
            = new List<Post>();
    }
}