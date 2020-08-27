using System;
using System.Collections.Generic;

namespace HRMO_APIV5.Models
{
    public partial class QuanHeGiaDinh
    {
        public QuanHeGiaDinh()
        {
            NhanVien = new HashSet<NhanVien>();
        }

        public int IdquanHeGd { get; set; }
        public string HoTenCha { get; set; }
        public string NgheNghiepCha { get; set; }
        public DateTime? NamSinhCha { get; set; }
        public string HoTenMe { get; set; }
        public string NgheNghiepMe { get; set; }
        public DateTime? NamSinhMe { get; set; }

        public virtual ICollection<NhanVien> NhanVien { get; set; }
    }
}
