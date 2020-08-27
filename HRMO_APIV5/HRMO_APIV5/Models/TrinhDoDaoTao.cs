using System;
using System.Collections.Generic;

namespace HRMO_APIV5.Models
{
    public partial class TrinhDoDaoTao
    {
        public TrinhDoDaoTao()
        {
            UngVien = new HashSet<UngVien>();
        }

        public int IdtrinhDo { get; set; }
        public string TenTrinhDo { get; set; }
        public double? HeSoChuyenMon { get; set; }

        public virtual ICollection<UngVien> UngVien { get; set; }
    }
}
