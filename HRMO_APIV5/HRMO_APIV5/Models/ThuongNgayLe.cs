using System;
using System.Collections.Generic;

namespace HRMO_APIV5.Models
{
    public partial class ThuongNgayLe
    {
        public ThuongNgayLe()
        {
            BangLuong = new HashSet<BangLuong>();
        }

        public int IdthuongLe { get; set; }
        public string TenNgayLe { get; set; }
        public int? NgayLe { get; set; }
        public int? ThangLe { get; set; }
        public string GhiChu { get; set; }

        public virtual ICollection<BangLuong> BangLuong { get; set; }
    }
}
