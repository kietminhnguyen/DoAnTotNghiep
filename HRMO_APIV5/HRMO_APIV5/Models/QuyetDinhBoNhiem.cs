using System;
using System.Collections.Generic;

namespace HRMO_APIV5.Models
{
    public partial class QuyetDinhBoNhiem
    {
        public QuyetDinhBoNhiem()
        {
            NhanVien = new HashSet<NhanVien>();
        }

        public int IdquyetDinhBn { get; set; }
        public string TenQuyetDinhBn { get; set; }
        public DateTime? NgayQuyetDinh { get; set; }
        public DateTime? NgayHieuLuc { get; set; }
        public string NoiDung { get; set; }
        public string GhiChu { get; set; }
        public int? IdungVien { get; set; }

        public virtual UngVien IdungVienNavigation { get; set; }
        public virtual ICollection<NhanVien> NhanVien { get; set; }
    }
}
