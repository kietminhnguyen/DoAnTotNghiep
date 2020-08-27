using System;
using System.Collections.Generic;

namespace HRMO_APIV5.Models
{
    public partial class QuyetDinhKt
    {
        public int IdquyetDinhKt { get; set; }
        public string TenQuyetDinh { get; set; }
        public DateTime? NgayLap { get; set; }
        public string HoDem { get; set; }
        public string Ten { get; set; }
        public int? IdnhanVien { get; set; }
        public DateTime? NgayHieuLuc { get; set; }
        public DateTime? NgayHetHieuLuc { get; set; }
        public string NoiDung { get; set; }
        public decimal SoTienThuong { get; set; }
        public string GhiChu { get; set; }

        public virtual NhanVien IdnhanVienNavigation { get; set; }
    }
}
