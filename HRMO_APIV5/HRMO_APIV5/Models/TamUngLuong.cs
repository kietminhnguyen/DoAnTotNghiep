using System;
using System.Collections.Generic;

namespace HRMO_APIV5.Models
{
    public partial class TamUngLuong
    {
        public int IdtamUng { get; set; }
        public DateTime? NgayTamUng { get; set; }
        public decimal? SoTienTamUng { get; set; }
        public string LyDoTamUng { get; set; }
        public string GhiChu { get; set; }
        public string NguoiChoTamUng { get; set; }
        public int? IdnhanVien { get; set; }

        public virtual NhanVien IdnhanVienNavigation { get; set; }
    }
}
