using System;
using System.Collections.Generic;

namespace HRMO_APIV5.Models
{
    public partial class UngVien
    {
        public UngVien()
        {
            QuyetDinhBoNhiem = new HashSet<QuyetDinhBoNhiem>();
        }

        public int IdungVien { get; set; }
        public string HoDem { get; set; }
        public string Ten { get; set; }
        public string TinhTrangHonNhan { get; set; }
        public DateTime? NgaySinh { get; set; }
        public string GioiTinh { get; set; }
        public string DiaChiThuongTru { get; set; }
        public string ChoOhienTai { get; set; }
        public string SoCmnn { get; set; }
        public DateTime? NgayCap { get; set; }
        public string TonGiao { get; set; }
        public string NoiCap { get; set; }
        public string QuocTich { get; set; }
        public string Email { get; set; }
        public string SoDienThoai { get; set; }
        public string NganhHoc { get; set; }
        public string NoiDaoTao { get; set; }
        public int? IdtrinhDo { get; set; }
        public string XepLoai { get; set; }
        public int? IddanToc { get; set; }
        public string NoiSinh { get; set; }
        public string HinhAnh { get; set; }

        public virtual DanToc IddanTocNavigation { get; set; }
        public virtual TrinhDoDaoTao IdtrinhDoNavigation { get; set; }
        public virtual ICollection<QuyetDinhBoNhiem> QuyetDinhBoNhiem { get; set; }
    }
}
