using System;
using System.Collections.Generic;

namespace HRMO_APIV5.Models
{
    public partial class LoaiHopDong
    {
        public LoaiHopDong()
        {
            HopDong = new HashSet<HopDong>();
        }

        public int IdloaiHd { get; set; }
        public string TenHopDong { get; set; }

        public virtual ICollection<HopDong> HopDong { get; set; }
    }
}
