using System;
using System.Collections.Generic;

namespace HRMO_APIV5.Models
{
    public partial class ChamCongTangCa
    {
        public DateTime NgayChamCong { get; set; }
        public int IdnhanVien { get; set; }
        public TimeSpan? GioVao { get; set; }
        public TimeSpan? GioRa { get; set; }
        public int? SoGioTangCa { get; set; }

        public virtual NhanVien IdnhanVienNavigation { get; set; }
    }
}
