using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace HRMO_APIV5.Models
{
    public partial class HRMO_NhanSuContext : DbContext
    {
        ////public HRMO_NhanSuContext()
        ////{
        ////}

        public HRMO_NhanSuContext(DbContextOptions<HRMO_NhanSuContext> options)
            : base(options)
        {
        }

        public virtual DbSet<BangLuong> BangLuong { get; set; }
        public virtual DbSet<ChamCong> ChamCong { get; set; }
        public virtual DbSet<ChamCongTangCa> ChamCongTangCa { get; set; }
        public virtual DbSet<ChucVu> ChucVu { get; set; }
        public virtual DbSet<DanToc> DanToc { get; set; }
        public virtual DbSet<HopDong> HopDong { get; set; }
        public virtual DbSet<LoaiHopDong> LoaiHopDong { get; set; }
        public virtual DbSet<NhanVien> NhanVien { get; set; }
        public virtual DbSet<PhongBan> PhongBan { get; set; }
        public virtual DbSet<QuanHeGiaDinh> QuanHeGiaDinh { get; set; }
        public virtual DbSet<QuyetDinh> QuyetDinh { get; set; }
        public virtual DbSet<QuyetDinhBoNhiem> QuyetDinhBoNhiem { get; set; }
        public virtual DbSet<QuyetDinhKl> QuyetDinhKl { get; set; }
        public virtual DbSet<QuyetDinhKt> QuyetDinhKt { get; set; }
        public virtual DbSet<TaiKhoan> TaiKhoan { get; set; }
        public virtual DbSet<TamUngLuong> TamUngLuong { get; set; }
        public virtual DbSet<ThuongNgayLe> ThuongNgayLe { get; set; }
        public virtual DbSet<TrinhDoDaoTao> TrinhDoDaoTao { get; set; }
        public virtual DbSet<UngVien> UngVien { get; set; }

//        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//        {
//            if (!optionsBuilder.IsConfigured)
//            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
//                optionsBuilder.UseSqlServer("Server=ADMIN\\SQLEXPRESS;Database=HRMO_NhanSu;Integrated Security=True");
//            }
//        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BangLuong>(entity =>
            {
                entity.HasKey(e => e.IdbangLuong);

                entity.Property(e => e.IdbangLuong).HasColumnName("IDBangLuong");

                entity.Property(e => e.IdnhanVien).HasColumnName("IDNhanVien");

                entity.Property(e => e.IdthuongLe).HasColumnName("IDThuongLe");

                entity.Property(e => e.MucLuong).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.PhuCapKhac).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.SoLuongChiuThue).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.ThueTncn)
                    .HasColumnName("ThueTNCN")
                    .HasColumnType("decimal(18, 0)");

                entity.Property(e => e.TienPhat).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.TienPhatDiTre).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.TienTamUng).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.TienTangCa).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.TienThucLinh).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.TienThuong).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.TongThuNhap).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.TruBh)
                    .HasColumnName("TruBH")
                    .HasColumnType("decimal(18, 0)");

                entity.HasOne(d => d.IdnhanVienNavigation)
                    .WithMany(p => p.BangLuong)
                    .HasForeignKey(d => d.IdnhanVien)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BangLuong_NhanVien");

                entity.HasOne(d => d.IdthuongLeNavigation)
                    .WithMany(p => p.BangLuong)
                    .HasForeignKey(d => d.IdthuongLe)
                    .HasConstraintName("FK_BangLuong_ThuongNgayLe");
            });

            modelBuilder.Entity<ChamCong>(entity =>
            {
                entity.HasKey(e => new { e.NgayChamCong, e.IdnhanVien })
                    .HasName("PK_ChamCong_1");

                entity.Property(e => e.NgayChamCong).HasColumnType("date");

                entity.Property(e => e.IdnhanVien).HasColumnName("IDNhanVien");

                entity.HasOne(d => d.IdnhanVienNavigation)
                    .WithMany(p => p.ChamCong)
                    .HasForeignKey(d => d.IdnhanVien)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ChamCong_NhanVien");
            });

            modelBuilder.Entity<ChamCongTangCa>(entity =>
            {
                entity.HasKey(e => new { e.NgayChamCong, e.IdnhanVien });

                entity.Property(e => e.NgayChamCong).HasColumnType("date");

                entity.Property(e => e.IdnhanVien).HasColumnName("IDNhanVien");

                entity.HasOne(d => d.IdnhanVienNavigation)
                    .WithMany(p => p.ChamCongTangCa)
                    .HasForeignKey(d => d.IdnhanVien)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ChamCongTangCa_NhanVien");
            });

            modelBuilder.Entity<ChucVu>(entity =>
            {
                entity.HasKey(e => e.IdchucVu);

                entity.Property(e => e.IdchucVu).HasColumnName("IDChucVu");
            });

            modelBuilder.Entity<DanToc>(entity =>
            {
                entity.HasKey(e => e.IddanToc);

                entity.Property(e => e.IddanToc).HasColumnName("IDDanToc");
            });

            modelBuilder.Entity<HopDong>(entity =>
            {
                entity.HasKey(e => e.IdhopDong)
                    .HasName("PK_HopDong_1");

                entity.Property(e => e.IdhopDong).HasColumnName("IDHopDong");

                entity.Property(e => e.IdloaiHd).HasColumnName("IDLoaiHD");

                entity.Property(e => e.IdnhanVien).HasColumnName("IDNhanVien");

                entity.Property(e => e.NgayBatDau).HasColumnType("date");

                entity.Property(e => e.NgayHetHan).HasColumnType("date");

                entity.Property(e => e.NgayLapHd)
                    .HasColumnName("NgayLapHD")
                    .HasColumnType("date");

                entity.HasOne(d => d.IdloaiHdNavigation)
                    .WithMany(p => p.HopDong)
                    .HasForeignKey(d => d.IdloaiHd)
                    .HasConstraintName("FK_HopDong_LoaiHopDong");

                entity.HasOne(d => d.IdnhanVienNavigation)
                    .WithMany(p => p.HopDong)
                    .HasForeignKey(d => d.IdnhanVien)
                    .HasConstraintName("FK_HopDong_NhanVien");
            });

            modelBuilder.Entity<LoaiHopDong>(entity =>
            {
                entity.HasKey(e => e.IdloaiHd);

                entity.Property(e => e.IdloaiHd).HasColumnName("IDLoaiHD");
            });

            modelBuilder.Entity<NhanVien>(entity =>
            {
                entity.HasKey(e => e.IdnhanVien);

                entity.Property(e => e.IdnhanVien).HasColumnName("IDNhanVien");

                entity.Property(e => e.ChoOhienTai).HasColumnName("ChoOHienTai");

                entity.Property(e => e.IdchucVu).HasColumnName("IDChucVu");

                entity.Property(e => e.IddanToc).HasColumnName("IDDanToc");

                entity.Property(e => e.IdphongBan).HasColumnName("IDPhongBan");

                entity.Property(e => e.IdquanHeGd).HasColumnName("IDQuanHeGD");

                entity.Property(e => e.IdquyetDinhBn).HasColumnName("IDQuyetDinhBN");

                entity.Property(e => e.IdtrinhDo).HasColumnName("IDTrinhDo");

                entity.Property(e => e.NgayCap).HasColumnType("date");

                entity.Property(e => e.NgaySinh).HasColumnType("date");

                entity.Property(e => e.SoCmnn)
                    .HasColumnName("SoCMNN")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SoDienThoai)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.TrangthaiHdchinhThuc)
                    .HasColumnName("trangthaiHDChinhThuc")
                    .HasMaxLength(50);

                entity.Property(e => e.TrangthaiHdthuViec)
                    .HasColumnName("trangthaiHDThuViec")
                    .HasMaxLength(50);

                entity.Property(e => e.Username)
                    .HasColumnName("username")
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdchucVuNavigation)
                    .WithMany(p => p.NhanVien)
                    .HasForeignKey(d => d.IdchucVu)
                    .HasConstraintName("FK_NhanVien_ChucVu");

                entity.HasOne(d => d.IddanTocNavigation)
                    .WithMany(p => p.NhanVien)
                    .HasForeignKey(d => d.IddanToc)
                    .HasConstraintName("FK_NhanVien_DanToc");

                entity.HasOne(d => d.IdphongBanNavigation)
                    .WithMany(p => p.NhanVien)
                    .HasForeignKey(d => d.IdphongBan)
                    .HasConstraintName("FK_NhanVien_PhongBan");

                entity.HasOne(d => d.IdquanHeGdNavigation)
                    .WithMany(p => p.NhanVien)
                    .HasForeignKey(d => d.IdquanHeGd)
                    .HasConstraintName("FK_NhanVien_QuanHeGiaDinh");

                entity.HasOne(d => d.IdquyetDinhBnNavigation)
                    .WithMany(p => p.NhanVien)
                    .HasForeignKey(d => d.IdquyetDinhBn)
                    .HasConstraintName("FK_NhanVien_QuyetDinhBoNhiem");

                entity.HasOne(d => d.UsernameNavigation)
                    .WithMany(p => p.NhanVien)
                    .HasForeignKey(d => d.Username)
                    .HasConstraintName("FK_NhanVien_TaiKhoan");
            });

            modelBuilder.Entity<PhongBan>(entity =>
            {
                entity.HasKey(e => e.IdphongBan);

                entity.Property(e => e.IdphongBan).HasColumnName("IDPhongBan");
            });

            modelBuilder.Entity<QuanHeGiaDinh>(entity =>
            {
                entity.HasKey(e => e.IdquanHeGd);

                entity.Property(e => e.IdquanHeGd).HasColumnName("IDQuanHeGD");

                entity.Property(e => e.NamSinhCha).HasColumnType("date");

                entity.Property(e => e.NamSinhMe).HasColumnType("date");
            });

            modelBuilder.Entity<QuyetDinh>(entity =>
            {
                entity.HasKey(e => e.IdquyetDinh);

                entity.Property(e => e.IdquyetDinh).HasColumnName("IDQuyetDinh");

                entity.Property(e => e.IdnhanVien).HasColumnName("IDNhanVien");

                entity.Property(e => e.NgayHetHieuLuc).HasColumnType("date");

                entity.Property(e => e.NgayHieuLuc).HasColumnType("date");

                entity.Property(e => e.NgayLap).HasColumnType("date");

                entity.HasOne(d => d.IdnhanVienNavigation)
                    .WithMany(p => p.QuyetDinh)
                    .HasForeignKey(d => d.IdnhanVien)
                    .HasConstraintName("FK_QuyetDinh_NhanVien1");
            });

            modelBuilder.Entity<QuyetDinhBoNhiem>(entity =>
            {
                entity.HasKey(e => e.IdquyetDinhBn);

                entity.Property(e => e.IdquyetDinhBn).HasColumnName("IDQuyetDinhBN");

                entity.Property(e => e.GhiChu).IsRequired();

                entity.Property(e => e.IdungVien).HasColumnName("IDUngVien");

                entity.Property(e => e.NgayHieuLuc).HasColumnType("date");

                entity.Property(e => e.NgayQuyetDinh).HasColumnType("date");

                entity.Property(e => e.TenQuyetDinhBn).HasColumnName("TenQuyetDinhBN");

                entity.HasOne(d => d.IdungVienNavigation)
                    .WithMany(p => p.QuyetDinhBoNhiem)
                    .HasForeignKey(d => d.IdungVien)
                    .HasConstraintName("FK_QuyetDinhBoNhiem_UngVien");
            });

            modelBuilder.Entity<QuyetDinhKl>(entity =>
            {
                entity.HasKey(e => e.IdquyetDinhKl);

                entity.ToTable("QuyetDinhKL");

                entity.Property(e => e.IdquyetDinhKl).HasColumnName("IDQuyetDinhKL");

                entity.Property(e => e.IdnhanVien).HasColumnName("IDNhanVien");

                entity.Property(e => e.NgayHetHieuLuc).HasColumnType("date");

                entity.Property(e => e.NgayHieuLuc).HasColumnType("date");

                entity.Property(e => e.NgayLap).HasColumnType("date");

                entity.Property(e => e.SoTienPhat).HasColumnType("decimal(18, 0)");

                entity.HasOne(d => d.IdnhanVienNavigation)
                    .WithMany(p => p.QuyetDinhKl)
                    .HasForeignKey(d => d.IdnhanVien)
                    .HasConstraintName("FK_QuyetDinhKL_NhanVien");
            });

            modelBuilder.Entity<QuyetDinhKt>(entity =>
            {
                entity.HasKey(e => e.IdquyetDinhKt);

                entity.ToTable("QuyetDinhKT");

                entity.Property(e => e.IdquyetDinhKt).HasColumnName("IDQuyetDinhKT");

                entity.Property(e => e.IdnhanVien).HasColumnName("IDNhanVien");

                entity.Property(e => e.NgayHetHieuLuc).HasColumnType("date");

                entity.Property(e => e.NgayHieuLuc).HasColumnType("date");

                entity.Property(e => e.NgayLap).HasColumnType("date");

                entity.Property(e => e.SoTienThuong).HasColumnType("decimal(18, 0)");

                entity.HasOne(d => d.IdnhanVienNavigation)
                    .WithMany(p => p.QuyetDinhKt)
                    .HasForeignKey(d => d.IdnhanVien)
                    .HasConstraintName("FK_QuyetDinhKT_NhanVien");
            });

            modelBuilder.Entity<TaiKhoan>(entity =>
            {
                entity.HasKey(e => e.Username);

                entity.Property(e => e.Username)
                    .HasColumnName("username")
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.Mail)
                    .HasColumnName("mail")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .HasColumnName("password")
                    .HasMaxLength(15)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TamUngLuong>(entity =>
            {
                entity.HasKey(e => e.IdtamUng)
                    .HasName("PK_TAMUNGLUONG");

                entity.Property(e => e.IdtamUng).HasColumnName("IDTamUng");

                entity.Property(e => e.IdnhanVien).HasColumnName("IDNhanVien");

                entity.Property(e => e.NgayTamUng).HasColumnType("date");

                entity.Property(e => e.SoTienTamUng).HasColumnType("decimal(18, 0)");

                entity.HasOne(d => d.IdnhanVienNavigation)
                    .WithMany(p => p.TamUngLuong)
                    .HasForeignKey(d => d.IdnhanVien)
                    .HasConstraintName("FK_TamUngLuong_NhanVien");
            });

            modelBuilder.Entity<ThuongNgayLe>(entity =>
            {
                entity.HasKey(e => e.IdthuongLe);

                entity.Property(e => e.IdthuongLe).HasColumnName("IDThuongLe");
            });

            modelBuilder.Entity<TrinhDoDaoTao>(entity =>
            {
                entity.HasKey(e => e.IdtrinhDo);

                entity.Property(e => e.IdtrinhDo).HasColumnName("IDTrinhDo");
            });

            modelBuilder.Entity<UngVien>(entity =>
            {
                entity.HasKey(e => e.IdungVien);

                entity.Property(e => e.IdungVien).HasColumnName("IDUngVien");

                entity.Property(e => e.ChoOhienTai).HasColumnName("ChoOHienTai");

                entity.Property(e => e.IddanToc).HasColumnName("IDDanToc");

                entity.Property(e => e.IdtrinhDo).HasColumnName("IDTrinhDo");

                entity.Property(e => e.NgayCap).HasColumnType("date");

                entity.Property(e => e.NgaySinh).HasColumnType("date");

                entity.Property(e => e.SoCmnn)
                    .HasColumnName("SoCMNN")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.IddanTocNavigation)
                    .WithMany(p => p.UngVien)
                    .HasForeignKey(d => d.IddanToc)
                    .HasConstraintName("FK_UngVien_DanToc");

                entity.HasOne(d => d.IdtrinhDoNavigation)
                    .WithMany(p => p.UngVien)
                    .HasForeignKey(d => d.IdtrinhDo)
                    .HasConstraintName("FK_UngVien_TrinhDoDaoTao");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
