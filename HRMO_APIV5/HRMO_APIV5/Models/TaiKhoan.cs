using System;
using System.Collections.Generic;

namespace HRMO_APIV5.Models
{
    public partial class TaiKhoan
    {
        public TaiKhoan()
        {
            NhanVien = new HashSet<NhanVien>();
        }

        public string Username { get; set; }
        public string Password { get; set; }
        public string Mail { get; set; }

        public virtual ICollection<NhanVien> NhanVien { get; set; }
    }
}
