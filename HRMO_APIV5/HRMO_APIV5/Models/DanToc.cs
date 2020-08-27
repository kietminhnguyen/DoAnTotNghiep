using System;
using System.Collections.Generic;

namespace HRMO_APIV5.Models
{
    public partial class DanToc
    {
        public DanToc()
        {
            NhanVien = new HashSet<NhanVien>();
            UngVien = new HashSet<UngVien>();
        }

        public int IddanToc { get; set; }
        public string TenDanToc { get; set; }

        public virtual ICollection<NhanVien> NhanVien { get; set; }
        public virtual ICollection<UngVien> UngVien { get; set; }
    }
}
