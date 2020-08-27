using System;
using System.Collections.Generic;

namespace HRMO_APIV5.Models
{
    public partial class ChamCong
    {
        public DateTime NgayChamCong { get; set; }
        public int IdnhanVien { get; set; }
        public TimeSpan? GioVao { get; set; }
        public TimeSpan? GioRa { get; set; }
        public int? SoGioLam { get; set; }
        public int? DiTre { get; set; }
        public int? Nghi { get; set; }

        public virtual NhanVien IdnhanVienNavigation { get; set; }
    }
}
