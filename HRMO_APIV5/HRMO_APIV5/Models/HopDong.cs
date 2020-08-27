using System;
using System.Collections.Generic;

namespace HRMO_APIV5.Models
{
    public partial class HopDong
    {
        public int IdhopDong { get; set; }
        public DateTime? NgayLapHd { get; set; }
        public DateTime? NgayBatDau { get; set; }
        public DateTime? NgayHetHan { get; set; }
        public string GhiChu { get; set; }
        public int? IdloaiHd { get; set; }
        public int? IdnhanVien { get; set; }

        public virtual LoaiHopDong IdloaiHdNavigation { get; set; }
        public virtual NhanVien IdnhanVienNavigation { get; set; }
    }
}
