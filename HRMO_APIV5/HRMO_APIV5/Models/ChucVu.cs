using System;
using System.Collections.Generic;

namespace HRMO_APIV5.Models
{
    public partial class ChucVu
    {
        public ChucVu()
        {
            NhanVien = new HashSet<NhanVien>();
        }

        public int IdchucVu { get; set; }
        public string TenChucVu { get; set; }
        public double? HeSoChucVu { get; set; }
        public string MoTa { get; set; }

        public virtual ICollection<NhanVien> NhanVien { get; set; }
    }
}
