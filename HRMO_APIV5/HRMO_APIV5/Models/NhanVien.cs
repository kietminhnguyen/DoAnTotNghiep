using System;
using System.Collections.Generic;

namespace HRMO_APIV5.Models
{
    public partial class NhanVien
    {
        public NhanVien()
        {
            BangLuong = new HashSet<BangLuong>();
            ChamCong = new HashSet<ChamCong>();
            ChamCongTangCa = new HashSet<ChamCongTangCa>();
            HopDong = new HashSet<HopDong>();
            QuyetDinh = new HashSet<QuyetDinh>();
            QuyetDinhKl = new HashSet<QuyetDinhKl>();
            QuyetDinhKt = new HashSet<QuyetDinhKt>();
            TamUngLuong = new HashSet<TamUngLuong>();
        }

        public int IdnhanVien { get; set; }
        public string HoDem { get; set; }
        public string Ten { get; set; }
        public string HinhAnh { get; set; }
        public string TinhTrangHonNhan { get; set; }
        public DateTime NgaySinh { get; set; }
        public string NoiSinh { get; set; }
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
        public string XepLoai { get; set; }
        public string Username { get; set; }
        public int? IdphongBan { get; set; }
        public int? IdchucVu { get; set; }
        public int? IdquanHeGd { get; set; }
        public int? IddanToc { get; set; }
        public int? IdtrinhDo { get; set; }
        public int? IdquyetDinhBn { get; set; }
        public string TrangthaiHdthuViec { get; set; }
        public string TrangthaiHdchinhThuc { get; set; }

        public virtual ChucVu IdchucVuNavigation { get; set; }
        public virtual DanToc IddanTocNavigation { get; set; }
        public virtual PhongBan IdphongBanNavigation { get; set; }
        public virtual QuanHeGiaDinh IdquanHeGdNavigation { get; set; }
        public virtual QuyetDinhBoNhiem IdquyetDinhBnNavigation { get; set; }
        public virtual TaiKhoan UsernameNavigation { get; set; }
        public virtual ICollection<BangLuong> BangLuong { get; set; }
        public virtual ICollection<ChamCong> ChamCong { get; set; }
        public virtual ICollection<ChamCongTangCa> ChamCongTangCa { get; set; }
        public virtual ICollection<HopDong> HopDong { get; set; }
        public virtual ICollection<QuyetDinh> QuyetDinh { get; set; }
        public virtual ICollection<QuyetDinhKl> QuyetDinhKl { get; set; }
        public virtual ICollection<QuyetDinhKt> QuyetDinhKt { get; set; }
        public virtual ICollection<TamUngLuong> TamUngLuong { get; set; }
    }
}
