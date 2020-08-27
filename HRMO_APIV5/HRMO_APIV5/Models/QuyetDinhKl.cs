using System;
using System.Collections.Generic;

namespace HRMO_APIV5.Models
{
    public partial class QuyetDinhKl
    {
        public int IdquyetDinhKl { get; set; }
        public string TenQuyetDinh { get; set; }
        public DateTime? NgayLap { get; set; }
        public string HoDem { get; set; }
        public string Ten { get; set; }
        public int? IdnhanVien { get; set; }
        public DateTime? NgayHieuLuc { get; set; }
        public DateTime? NgayHetHieuLuc { get; set; }
        public string NoiDung { get; set; }
        public decimal? SoTienPhat { get; set; }

        public virtual NhanVien IdnhanVienNavigation { get; set; }
    }
}
