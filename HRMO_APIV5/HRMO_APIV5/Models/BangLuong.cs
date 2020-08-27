using System;
using System.Collections.Generic;

namespace HRMO_APIV5.Models
{
    public partial class BangLuong
    {
        public int IdbangLuong { get; set; }
        public int IdnhanVien { get; set; }
        public int Thang { get; set; }
        public int? Nam { get; set; }
        public decimal? MucLuong { get; set; }
        public decimal? TienThuong { get; set; }
        public decimal? TienPhatDiTre { get; set; }
        public decimal? TongThuNhap { get; set; }
        public decimal? TienPhat { get; set; }
        public int? TongGioTangCa { get; set; }
        public decimal? TienTangCa { get; set; }
        public decimal? TienTamUng { get; set; }
        public decimal? PhuCapKhac { get; set; }
        public decimal? TruBh { get; set; }
        public int? SoNgayCong { get; set; }
        public int? SoNgayDiTre { get; set; }
        public int? SoNgayDiTreKhongTinhLuong { get; set; }
        public int? SoNgayNghi { get; set; }
        public string GhiChu { get; set; }
        public double? HeSoChucVu { get; set; }
        public double? HeSoChuyenMon { get; set; }
        public int? TrangThai { get; set; }
        public decimal? SoLuongChiuThue { get; set; }
        public decimal? ThueTncn { get; set; }
        public decimal? TienThucLinh { get; set; }
        public int? IdthuongLe { get; set; }

        public virtual NhanVien IdnhanVienNavigation { get; set; }
        public virtual ThuongNgayLe IdthuongLeNavigation { get; set; }
    }
}
