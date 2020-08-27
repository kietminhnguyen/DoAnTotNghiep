using System;
using System.Collections.Generic;

namespace HRMO_APIV5.Models
{
    public partial class PhongBan
    {
        public PhongBan()
        {
            NhanVien = new HashSet<NhanVien>();
        }

        public int IdphongBan { get; set; }
        public string TenPhongBan { get; set; }
        public string TenTruongPhong { get; set; }
        public string MoTa { get; set; }

        public virtual ICollection<NhanVien> NhanVien { get; set; }
    }
}
