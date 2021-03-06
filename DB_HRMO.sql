USE [HRMO_NhanSu]
GO
/****** Object:  Table [dbo].[BangLuong]    Script Date: 17/08/2020 10:50:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BangLuong](
	[IDBangLuong] [int] IDENTITY(1,1) NOT NULL,
	[IDNhanVien] [int] NOT NULL,
	[Thang] [int] NOT NULL,
	[Nam] [int] NULL,
	[MucLuong] [decimal](18, 0) NULL,
	[TienThuong] [decimal](18, 0) NULL,
	[TienPhatDiTre] [decimal](18, 0) NULL,
	[TongThuNhap] [decimal](18, 0) NULL,
	[TienPhat] [decimal](18, 0) NULL,
	[TongGioTangCa] [int] NULL,
	[TienTangCa] [decimal](18, 0) NULL,
	[TienTamUng] [decimal](18, 0) NULL,
	[PhuCapKhac] [decimal](18, 0) NULL,
	[TruBH] [decimal](18, 0) NULL,
	[SoNgayCong] [int] NULL,
	[SoNgayDiTre] [int] NULL,
	[SoNgayDiTreKhongTinhLuong] [int] NULL,
	[SoNgayNghi] [int] NULL,
	[GhiChu] [nvarchar](max) NULL,
	[HeSoChucVu] [float] NULL,
	[HeSoChuyenMon] [float] NULL,
	[TrangThai] [int] NULL,
	[SoLuongChiuThue] [decimal](18, 0) NULL,
	[ThueTNCN] [decimal](18, 0) NULL,
	[TienThucLinh] [decimal](18, 0) NULL,
	[IDThuongLe] [int] NULL,
 CONSTRAINT [PK_BangLuong] PRIMARY KEY CLUSTERED 
(
	[IDBangLuong] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ChamCong]    Script Date: 17/08/2020 10:50:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChamCong](
	[NgayChamCong] [date] NOT NULL,
	[IDNhanVien] [int] NOT NULL,
	[GioVao] [time](7) NULL,
	[GioRa] [time](7) NULL,
	[SoGioLam] [int] NULL,
	[DiTre] [int] NULL,
	[Nghi] [int] NULL,
 CONSTRAINT [PK_ChamCong_1] PRIMARY KEY CLUSTERED 
(
	[NgayChamCong] ASC,
	[IDNhanVien] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ChamCongTangCa]    Script Date: 17/08/2020 10:50:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChamCongTangCa](
	[NgayChamCong] [date] NOT NULL,
	[IDNhanVien] [int] NOT NULL,
	[GioVao] [time](7) NULL,
	[GioRa] [time](7) NULL,
	[SoGioTangCa] [int] NULL,
 CONSTRAINT [PK_ChamCongTangCa] PRIMARY KEY CLUSTERED 
(
	[NgayChamCong] ASC,
	[IDNhanVien] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ChucVu]    Script Date: 17/08/2020 10:50:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChucVu](
	[IDChucVu] [int] IDENTITY(1,1) NOT NULL,
	[TenChucVu] [nvarchar](max) NULL,
	[HeSoChucVu] [float] NULL,
	[MoTa] [nvarchar](max) NULL,
 CONSTRAINT [PK_ChucVu] PRIMARY KEY CLUSTERED 
(
	[IDChucVu] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[DanToc]    Script Date: 17/08/2020 10:50:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DanToc](
	[IDDanToc] [int] IDENTITY(1,1) NOT NULL,
	[TenDanToc] [nvarchar](max) NULL,
 CONSTRAINT [PK_DanToc] PRIMARY KEY CLUSTERED 
(
	[IDDanToc] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[HopDong]    Script Date: 17/08/2020 10:50:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HopDong](
	[IDHopDong] [int] IDENTITY(1,1) NOT NULL,
	[NgayLapHD] [date] NULL,
	[NgayBatDau] [date] NULL,
	[NgayHetHan] [date] NULL,
	[GhiChu] [nvarchar](max) NULL,
	[IDLoaiHD] [int] NULL,
	[IDNhanVien] [int] NULL,
 CONSTRAINT [PK_HopDong_1] PRIMARY KEY CLUSTERED 
(
	[IDHopDong] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[LoaiHopDong]    Script Date: 17/08/2020 10:50:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LoaiHopDong](
	[IDLoaiHD] [int] IDENTITY(1,1) NOT NULL,
	[TenHopDong] [nvarchar](max) NULL,
 CONSTRAINT [PK_LoaiHopDong] PRIMARY KEY CLUSTERED 
(
	[IDLoaiHD] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[NhanVien]    Script Date: 17/08/2020 10:50:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[NhanVien](
	[IDNhanVien] [int] IDENTITY(1,1) NOT NULL,
	[HoDem] [nvarchar](max) NULL,
	[Ten] [nvarchar](max) NULL,
	[HinhAnh] [nvarchar](max) NULL,
	[TinhTrangHonNhan] [nvarchar](max) NULL,
	[NgaySinh] [date] NOT NULL,
	[NoiSinh] [nvarchar](max) NULL,
	[GioiTinh] [nvarchar](max) NULL,
	[DiaChiThuongTru] [nvarchar](max) NULL,
	[ChoOHienTai] [nvarchar](max) NULL,
	[SoCMNN] [varchar](50) NULL,
	[NgayCap] [date] NULL,
	[TonGiao] [nvarchar](max) NULL,
	[NoiCap] [nvarchar](max) NULL,
	[QuocTich] [nvarchar](max) NULL,
	[Email] [nvarchar](max) NULL,
	[SoDienThoai] [varchar](50) NULL,
	[NganhHoc] [nvarchar](max) NULL,
	[NoiDaoTao] [nvarchar](max) NULL,
	[XepLoai] [nvarchar](max) NULL,
	[username] [varchar](15) NULL,
	[IDPhongBan] [int] NULL,
	[IDChucVu] [int] NULL,
	[IDQuanHeGD] [int] NULL,
	[IDDanToc] [int] NULL,
	[IDTrinhDo] [int] NULL,
	[IDQuyetDinhBN] [int] NULL,
	[trangthaiHDThuViec] [nvarchar](50) NULL,
	[trangthaiHDChinhThuc] [nvarchar](50) NULL,
 CONSTRAINT [PK_NhanVien] PRIMARY KEY CLUSTERED 
(
	[IDNhanVien] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[PhongBan]    Script Date: 17/08/2020 10:50:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PhongBan](
	[IDPhongBan] [int] IDENTITY(1,1) NOT NULL,
	[TenPhongBan] [nvarchar](max) NULL,
	[TenTruongPhong] [nvarchar](max) NULL,
	[MoTa] [nvarchar](max) NULL,
 CONSTRAINT [PK_PhongBan] PRIMARY KEY CLUSTERED 
(
	[IDPhongBan] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[QuanHeGiaDinh]    Script Date: 17/08/2020 10:50:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[QuanHeGiaDinh](
	[IDQuanHeGD] [int] IDENTITY(1,1) NOT NULL,
	[HoTenCha] [nvarchar](max) NULL,
	[NgheNghiepCha] [nvarchar](max) NULL,
	[NamSinhCha] [date] NULL,
	[HoTenMe] [nvarchar](max) NULL,
	[NgheNghiepMe] [nvarchar](max) NULL,
	[NamSinhMe] [date] NULL,
 CONSTRAINT [PK_QuanHeGiaDinh] PRIMARY KEY CLUSTERED 
(
	[IDQuanHeGD] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[QuyetDinh]    Script Date: 17/08/2020 10:50:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[QuyetDinh](
	[IDQuyetDinh] [int] IDENTITY(1,1) NOT NULL,
	[TenQuyetDinh] [nvarchar](max) NULL,
	[NgayLap] [date] NULL,
	[HoDem] [nvarchar](max) NULL,
	[Ten] [nvarchar](max) NULL,
	[IDNhanVien] [int] NULL,
	[NgayHieuLuc] [date] NULL,
	[NgayHetHieuLuc] [date] NULL,
	[NoiDung] [nvarchar](max) NULL,
	[GhiChu] [nvarchar](max) NULL,
 CONSTRAINT [PK_QuyetDinh] PRIMARY KEY CLUSTERED 
(
	[IDQuyetDinh] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[QuyetDinhBoNhiem]    Script Date: 17/08/2020 10:50:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[QuyetDinhBoNhiem](
	[IDQuyetDinhBN] [int] IDENTITY(1,1) NOT NULL,
	[TenQuyetDinhBN] [nvarchar](max) NULL,
	[NgayQuyetDinh] [date] NULL,
	[NgayHieuLuc] [date] NULL,
	[NoiDung] [nvarchar](max) NULL,
	[GhiChu] [nvarchar](max) NOT NULL,
	[IDUngVien] [int] NULL,
 CONSTRAINT [PK_QuyetDinhBoNhiem] PRIMARY KEY CLUSTERED 
(
	[IDQuyetDinhBN] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[QuyetDinhKL]    Script Date: 17/08/2020 10:50:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[QuyetDinhKL](
	[IDQuyetDinhKL] [int] IDENTITY(1,1) NOT NULL,
	[TenQuyetDinh] [nvarchar](max) NULL,
	[NgayLap] [date] NULL,
	[HoDem] [nvarchar](max) NULL,
	[Ten] [nvarchar](max) NULL,
	[IDNhanVien] [int] NULL,
	[NgayHieuLuc] [date] NULL,
	[NgayHetHieuLuc] [date] NULL,
	[NoiDung] [nvarchar](max) NULL,
	[SoTienPhat] [decimal](18, 0) NULL,
 CONSTRAINT [PK_QuyetDinhKL] PRIMARY KEY CLUSTERED 
(
	[IDQuyetDinhKL] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[QuyetDinhKT]    Script Date: 17/08/2020 10:50:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[QuyetDinhKT](
	[IDQuyetDinhKT] [int] IDENTITY(1,1) NOT NULL,
	[TenQuyetDinh] [nvarchar](max) NULL,
	[NgayLap] [date] NULL,
	[HoDem] [nvarchar](max) NULL,
	[Ten] [nvarchar](max) NULL,
	[IDNhanVien] [int] NULL,
	[NgayHieuLuc] [date] NULL,
	[NgayHetHieuLuc] [date] NULL,
	[NoiDung] [nvarchar](max) NULL,
	[SoTienThuong] [decimal](18, 0) NOT NULL,
	[GhiChu] [nvarchar](max) NULL,
 CONSTRAINT [PK_QuyetDinhKT] PRIMARY KEY CLUSTERED 
(
	[IDQuyetDinhKT] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[TaiKhoan]    Script Date: 17/08/2020 10:50:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[TaiKhoan](
	[username] [varchar](15) NOT NULL,
	[password] [varchar](15) NULL,
	[mail] [varchar](30) NULL,
 CONSTRAINT [PK_TaiKhoan] PRIMARY KEY CLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[TamUngLuong]    Script Date: 17/08/2020 10:50:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TamUngLuong](
	[IDTamUng] [int] IDENTITY(1,1) NOT NULL,
	[NgayTamUng] [date] NULL,
	[SoTienTamUng] [decimal](18, 0) NULL,
	[LyDoTamUng] [nvarchar](max) NULL,
	[GhiChu] [nvarchar](max) NULL,
	[NguoiChoTamUng] [nvarchar](max) NULL,
	[IDNhanVien] [int] NULL,
 CONSTRAINT [PK_TAMUNGLUONG] PRIMARY KEY CLUSTERED 
(
	[IDTamUng] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ThuongNgayLe]    Script Date: 17/08/2020 10:50:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ThuongNgayLe](
	[IDThuongLe] [int] IDENTITY(1,1) NOT NULL,
	[TenNgayLe] [nvarchar](max) NULL,
	[NgayLe] [int] NULL,
	[ThangLe] [int] NULL,
	[GhiChu] [nvarchar](max) NULL,
 CONSTRAINT [PK_ThuongNgayLe] PRIMARY KEY CLUSTERED 
(
	[IDThuongLe] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[TrinhDoDaoTao]    Script Date: 17/08/2020 10:50:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TrinhDoDaoTao](
	[IDTrinhDo] [int] IDENTITY(1,1) NOT NULL,
	[TenTrinhDo] [nvarchar](max) NULL,
	[HeSoChuyenMon] [float] NULL,
 CONSTRAINT [PK_TrinhDoDaoTao] PRIMARY KEY CLUSTERED 
(
	[IDTrinhDo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[UngVien]    Script Date: 17/08/2020 10:50:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[UngVien](
	[IDUngVien] [int] IDENTITY(1,1) NOT NULL,
	[HoDem] [nvarchar](max) NULL,
	[Ten] [nvarchar](max) NULL,
	[TinhTrangHonNhan] [nvarchar](max) NULL,
	[NgaySinh] [date] NULL,
	[GioiTinh] [nvarchar](max) NULL,
	[DiaChiThuongTru] [nvarchar](max) NULL,
	[ChoOHienTai] [nvarchar](max) NULL,
	[SoCMNN] [varchar](50) NULL,
	[NgayCap] [date] NULL,
	[TonGiao] [nvarchar](max) NULL,
	[NoiCap] [nvarchar](max) NULL,
	[QuocTich] [nvarchar](max) NULL,
	[Email] [nvarchar](max) NULL,
	[SoDienThoai] [nvarchar](max) NULL,
	[NganhHoc] [nvarchar](max) NULL,
	[NoiDaoTao] [nvarchar](max) NULL,
	[IDTrinhDo] [int] NULL,
	[XepLoai] [nvarchar](max) NULL,
	[IDDanToc] [int] NULL,
	[NoiSinh] [nvarchar](max) NULL,
	[HinhAnh] [nvarchar](max) NULL,
 CONSTRAINT [PK_UngVien] PRIMARY KEY CLUSTERED 
(
	[IDUngVien] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[BangLuong] ON 

INSERT [dbo].[BangLuong] ([IDBangLuong], [IDNhanVien], [Thang], [Nam], [MucLuong], [TienThuong], [TienPhatDiTre], [TongThuNhap], [TienPhat], [TongGioTangCa], [TienTangCa], [TienTamUng], [PhuCapKhac], [TruBH], [SoNgayCong], [SoNgayDiTre], [SoNgayDiTreKhongTinhLuong], [SoNgayNghi], [GhiChu], [HeSoChucVu], [HeSoChuyenMon], [TrangThai], [SoLuongChiuThue], [ThueTNCN], [TienThucLinh], [IDThuongLe]) VALUES (474, 9, 5, 2020, CAST(6000000 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), CAST(150000 AS Decimal(18, 0)), CAST(12222222 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), 0, CAST(0 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), CAST(1283333 AS Decimal(18, 0)), 25, 3, 1, 1, N'', 0.6, 0.6, 1, CAST(-6077778 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), CAST(10788889 AS Decimal(18, 0)), NULL)
INSERT [dbo].[BangLuong] ([IDBangLuong], [IDNhanVien], [Thang], [Nam], [MucLuong], [TienThuong], [TienPhatDiTre], [TongThuNhap], [TienPhat], [TongGioTangCa], [TienTangCa], [TienTamUng], [PhuCapKhac], [TruBH], [SoNgayCong], [SoNgayDiTre], [SoNgayDiTreKhongTinhLuong], [SoNgayNghi], [GhiChu], [HeSoChucVu], [HeSoChuyenMon], [TrangThai], [SoLuongChiuThue], [ThueTNCN], [TienThucLinh], [IDThuongLe]) VALUES (475, 12, 5, 2020, CAST(6000000 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), CAST(100000 AS Decimal(18, 0)), CAST(11651852 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), 0, CAST(0 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), CAST(100000 AS Decimal(18, 0)), CAST(1223444 AS Decimal(18, 0)), 26, 2, 0, 1, N'', 0.6, 0.4, 1, CAST(-6648148 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), CAST(10332112 AS Decimal(18, 0)), NULL)
INSERT [dbo].[BangLuong] ([IDBangLuong], [IDNhanVien], [Thang], [Nam], [MucLuong], [TienThuong], [TienPhatDiTre], [TongThuNhap], [TienPhat], [TongGioTangCa], [TienTangCa], [TienTamUng], [PhuCapKhac], [TruBH], [SoNgayCong], [SoNgayDiTre], [SoNgayDiTreKhongTinhLuong], [SoNgayNghi], [GhiChu], [HeSoChucVu], [HeSoChuyenMon], [TrangThai], [SoLuongChiuThue], [ThueTNCN], [TienThucLinh], [IDThuongLe]) VALUES (497, 9, 6, 2020, CAST(6000000 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), CAST(200000 AS Decimal(18, 0)), CAST(11244444 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), 0, CAST(0 AS Decimal(18, 0)), CAST(100000 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), CAST(1180667 AS Decimal(18, 0)), 23, 4, 3, 1, N'0', 0.6, 0.6, NULL, CAST(-7055556 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), CAST(9763777 AS Decimal(18, 0)), NULL)
INSERT [dbo].[BangLuong] ([IDBangLuong], [IDNhanVien], [Thang], [Nam], [MucLuong], [TienThuong], [TienPhatDiTre], [TongThuNhap], [TienPhat], [TongGioTangCa], [TienTangCa], [TienTamUng], [PhuCapKhac], [TruBH], [SoNgayCong], [SoNgayDiTre], [SoNgayDiTreKhongTinhLuong], [SoNgayNghi], [GhiChu], [HeSoChucVu], [HeSoChuyenMon], [TrangThai], [SoLuongChiuThue], [ThueTNCN], [TienThucLinh], [IDThuongLe]) VALUES (498, 12, 6, 2020, CAST(6000000 AS Decimal(18, 0)), CAST(700000 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), CAST(11555556 AS Decimal(18, 0)), CAST(200000 AS Decimal(18, 0)), 0, CAST(0 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), CAST(1213333 AS Decimal(18, 0)), 26, 0, 0, 1, N'0', 0.6, 0.4, NULL, CAST(-6744444 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), CAST(10842223 AS Decimal(18, 0)), NULL)
INSERT [dbo].[BangLuong] ([IDBangLuong], [IDNhanVien], [Thang], [Nam], [MucLuong], [TienThuong], [TienPhatDiTre], [TongThuNhap], [TienPhat], [TongGioTangCa], [TienTangCa], [TienTamUng], [PhuCapKhac], [TruBH], [SoNgayCong], [SoNgayDiTre], [SoNgayDiTreKhongTinhLuong], [SoNgayNghi], [GhiChu], [HeSoChucVu], [HeSoChuyenMon], [TrangThai], [SoLuongChiuThue], [ThueTNCN], [TienThucLinh], [IDThuongLe]) VALUES (507, 9, 8, 2020, CAST(6000000 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), CAST(12222222 AS Decimal(18, 0)), CAST(100000 AS Decimal(18, 0)), 2, CAST(80000 AS Decimal(18, 0)), CAST(100000 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), CAST(1283333 AS Decimal(18, 0)), 25, 0, 0, 2, N'0', 0.6, 0.6, NULL, CAST(-6077778 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), CAST(10818889 AS Decimal(18, 0)), NULL)
INSERT [dbo].[BangLuong] ([IDBangLuong], [IDNhanVien], [Thang], [Nam], [MucLuong], [TienThuong], [TienPhatDiTre], [TongThuNhap], [TienPhat], [TongGioTangCa], [TienTangCa], [TienTamUng], [PhuCapKhac], [TruBH], [SoNgayCong], [SoNgayDiTre], [SoNgayDiTreKhongTinhLuong], [SoNgayNghi], [GhiChu], [HeSoChucVu], [HeSoChuyenMon], [TrangThai], [SoLuongChiuThue], [ThueTNCN], [TienThucLinh], [IDThuongLe]) VALUES (508, 12, 8, 2020, CAST(6000000 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), CAST(250000 AS Decimal(18, 0)), CAST(9777778 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), 0, CAST(0 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), CAST(1026667 AS Decimal(18, 0)), 22, 5, 4, 1, N'0', 0.6, 0.4, NULL, CAST(-8522222 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), CAST(8501111 AS Decimal(18, 0)), NULL)
SET IDENTITY_INSERT [dbo].[BangLuong] OFF
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x09410B00 AS Date), 9, CAST(0x0700B864D9450000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 20, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x09410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x0A410B00 AS Date), 9, CAST(0x0700D2D5F1470000 AS Time), CAST(0x07007ABD61930000 AS Time), 9, 35, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x0A410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x0C410B00 AS Date), 9, CAST(0x07005A9426450000 AS Time), CAST(0x0700EE361A930000 AS Time), 9, 15, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x0C410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x0D410B00 AS Date), 9, CAST(0x0700E2525B420000 AS Time), CAST(0x07007ABD61930000 AS Time), 10, -5, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x0D410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x0E410B00 AS Date), 9, CAST(0x0700E2525B420000 AS Time), CAST(0x070012F9FF8A0000 AS Time), 9, -5, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x0E410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x0F410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x0F410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x10410B00 AS Date), 9, CAST(0x0700C258884D0000 AS Time), CAST(0x07001CEDAE920000 AS Time), 8, 75, 1)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x10410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x11410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x11410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x13410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x13410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x14410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x14410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x15410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x15410B00 AS Date), 12, CAST(0x0700FCC373440000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 10, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x16410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x16410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x17410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x17410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x18410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x18410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x1A410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x1A410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x1B410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x1B410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x1C410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x1C410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x1D410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x1D410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x1E410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x1E410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x1F410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x1F410B00 AS Date), 12, CAST(0x070074053F470000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 30, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x21410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x21410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x22410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x22410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x23410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x23410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x24410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x24410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x25410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x25410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x26410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x26410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x28410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x28410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x29410B00 AS Date), 9, CAST(0x0700D2D5F1470000 AS Time), CAST(0x07007ABD61930000 AS Time), 9, 35, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x29410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x2A410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07007ABD61930000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x2A410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x2B410B00 AS Date), 9, CAST(0x07005A9426450000 AS Time), CAST(0x0700EE361A930000 AS Time), 9, 15, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x2B410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x2C410B00 AS Date), 9, CAST(0x0700E2525B420000 AS Time), CAST(0x07007ABD61930000 AS Time), 10, -5, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x2C410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x2D410B00 AS Date), 9, CAST(0x0700E2525B420000 AS Time), CAST(0x070012F9FF8A0000 AS Time), 9, -5, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x2D410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x2F410B00 AS Date), 9, CAST(0x0700C258884D0000 AS Time), CAST(0x07001CEDAE920000 AS Time), 8, 75, 1)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x2F410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x30410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x30410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x31410B00 AS Date), 9, CAST(0x0700B864D9450000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 20, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x31410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x32410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x32410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x33410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x33410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x34410B00 AS Date), 9, CAST(0x0700EEAA934B0000 AS Time), CAST(0x07001CEDAE920000 AS Time), 8, 61, 1)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x34410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x36410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x36410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x37410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x37410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x38410B00 AS Date), 9, CAST(0x0700FCC373440000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 10, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x38410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x39410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x39410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x3A410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x3A410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x3B410B00 AS Date), 9, CAST(0x0700A8E76F4B0000 AS Time), CAST(0x07001CEDAE920000 AS Time), 8, 60, 1)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x3B410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x3D410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x3D410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x3E410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x3E410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x3F410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x3F410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x40410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x40410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x41410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x41410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x42410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x42410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
GO
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x44410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x44410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x45410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x45410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x46410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x46410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x47410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x47410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x48410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x48410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x49410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x49410B00 AS Date), 12, CAST(0x070020293B4E0000 AS Time), CAST(0x07001CEDAE920000 AS Time), 8, 80, 1)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x4B410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x4B410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x4C410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x4C410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x4D410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x4D410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x4E410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x4E410B00 AS Date), 12, CAST(0x0700EEAA934B0000 AS Time), CAST(0x07001CEDAE920000 AS Time), 8, 61, 1)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x4F410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x4F410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x50410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x50410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x52410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x52410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x53410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x53410B00 AS Date), 12, CAST(0x0700B864D9450000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 20, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x54410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x54410B00 AS Date), 12, CAST(0x070074053F470000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 30, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x55410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x56410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x56410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x57410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x57410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x59410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x59410B00 AS Date), 12, CAST(0x0700A8E76F4B0000 AS Time), CAST(0x07001CEDAE920000 AS Time), 8, 60, 1)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x5A410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x5A410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x5B410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x5B410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x5C410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x5C410B00 AS Date), 12, CAST(0x0700A0574A450000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 16, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x5D410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x5D410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x5E410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x5E410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x60410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x60410B00 AS Date), 12, CAST(0x07006488D54C0000 AS Time), CAST(0x07001CEDAE920000 AS Time), 8, 70, 1)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x61410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x61410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x62410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x62410B00 AS Date), 12, CAST(0x07002A7A08440000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 7, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x63410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x63410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x64410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x64410B00 AS Date), 12, CAST(0x0700D2D5F1470000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 35, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x65410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x65410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x66410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x66410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x67410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x67410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x68410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x68410B00 AS Date), 12, CAST(0x070020293B4E0000 AS Time), CAST(0x07001CEDAE920000 AS Time), 8, 80, 1)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x6A410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x6A410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x6B410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x6B410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x6C410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x6C410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x6D410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x6D410B00 AS Date), 12, CAST(0x0700EEAA934B0000 AS Time), CAST(0x07001CEDAE920000 AS Time), 8, 61, 1)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x6E410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x6E410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x6F410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x6F410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x71410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x71410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x72410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x72410B00 AS Date), 12, CAST(0x0700B864D9450000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 20, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x73410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x73410B00 AS Date), 12, CAST(0x070074053F470000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 30, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x74410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x75410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x75410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x76410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x76410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x78410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x78410B00 AS Date), 12, CAST(0x0700A8E76F4B0000 AS Time), CAST(0x07001CEDAE920000 AS Time), 8, 60, 1)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x79410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x79410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x7A410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x7A410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x7B410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x7B410B00 AS Date), 12, CAST(0x0700A0574A450000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 16, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x7C410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x7D410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x7F410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x7F410B00 AS Date), 12, CAST(0x07006488D54C0000 AS Time), CAST(0x07001CEDAE920000 AS Time), 8, 70, 1)
GO
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x80410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x80410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x81410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x81410B00 AS Date), 12, CAST(0x07002A7A08440000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 7, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x82410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x82410B00 AS Date), 12, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x83410B00 AS Date), 9, CAST(0x070040230E430000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 0, 0)
INSERT [dbo].[ChamCong] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioLam], [DiTre], [Nghi]) VALUES (CAST(0x83410B00 AS Date), 12, CAST(0x0700D2D5F1470000 AS Time), CAST(0x07001CEDAE920000 AS Time), 9, 35, 0)
INSERT [dbo].[ChamCongTangCa] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioTangCa]) VALUES (CAST(0x5D410B00 AS Date), 9, CAST(0x070084B1109B0000 AS Time), CAST(0x0700543AD4AB0000 AS Time), 2)
INSERT [dbo].[ChamCongTangCa] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioTangCa]) VALUES (CAST(0x60410B00 AS Date), 9, CAST(0x07001664F49F0000 AS Time), CAST(0x0700E6ECB7B00000 AS Time), 2)
INSERT [dbo].[ChamCongTangCa] ([NgayChamCong], [IDNhanVien], [GioVao], [GioRa], [SoGioTangCa]) VALUES (CAST(0x71410B00 AS Date), 9, CAST(0x070084B1109B0000 AS Time), CAST(0x0700543AD4AB0000 AS Time), 2)
SET IDENTITY_INSERT [dbo].[ChucVu] ON 

INSERT [dbo].[ChucVu] ([IDChucVu], [TenChucVu], [HeSoChucVu], [MoTa]) VALUES (1, N'Nhân viên', 0.3, N'Hệ số chức vụ 0.3')
INSERT [dbo].[ChucVu] ([IDChucVu], [TenChucVu], [HeSoChucVu], [MoTa]) VALUES (2, N'Tổ trưởng', 0.4, N'Hệ số chức vụ 0.4')
INSERT [dbo].[ChucVu] ([IDChucVu], [TenChucVu], [HeSoChucVu], [MoTa]) VALUES (3, N'Phó phòng', 0.5, N'Hệ số chức vụ 0.5')
INSERT [dbo].[ChucVu] ([IDChucVu], [TenChucVu], [HeSoChucVu], [MoTa]) VALUES (4, N'Trưởng phòng', 0.6, N'Hệ số chức vụ 0.6')
INSERT [dbo].[ChucVu] ([IDChucVu], [TenChucVu], [HeSoChucVu], [MoTa]) VALUES (5, N'Phó giám đốc', 0.8, N'Hệ số chức vụ 0.8')
INSERT [dbo].[ChucVu] ([IDChucVu], [TenChucVu], [HeSoChucVu], [MoTa]) VALUES (8, N'Giám đốc', 1, N'Được cấp tài khoản admin')
SET IDENTITY_INSERT [dbo].[ChucVu] OFF
SET IDENTITY_INSERT [dbo].[DanToc] ON 

INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (1, N'Kinh')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (4, N'Chứt')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (5, N'Mường')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (6, N'Thổ')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (7, N'Bố Y')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (8, N'Giáy')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (9, N'Lào')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (10, N'Lự')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (11, N'Nùng')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (12, N'Sán Chay')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (13, N'Tày')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (14, N'Thái')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (15, N'Cờ Lao')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (16, N'La Chí')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (17, N'La Ha')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (18, N'Pu Péo')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (19, N'Ba Na')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (20, N'Brâu')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (21, N'Bru - Vân Kiều')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (22, N'Chơ Ro')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (23, N'Co')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (24, N'Cơ Ho')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (25, N'Cơ Tu')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (26, N'Giẻ Triêng')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (27, N'Hrê')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (28, N'Kháng')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (29, N'Khơ Me')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (30, N'Khơ Mú')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (31, N'Mạ')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (32, N'Mảng')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (33, N'M’Nông')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (34, N'Ơ Đu')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (35, N'Rơ Măm')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (36, N'Tà Ôi')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (37, N'Xinh Mun')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (38, N'Xơ Đăng')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (39, N'X’Tiêng')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (40, N'Dao')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (41, N'H’Mông')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (42, N'Pà Thẻn')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (43, N'Chăm')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (44, N'Chu Ru')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (45, N'Ê Đê')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (46, N'Gia Rai')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (47, N'Ra Glai')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (48, N'Hoa')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (49, N'Ngái')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (50, N'Sán Dìu')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (51, N'Cống')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (52, N'Hà Nhì')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (53, N'La Hủ')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (54, N'Lô Lô')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (55, N'Phù Lá')
INSERT [dbo].[DanToc] ([IDDanToc], [TenDanToc]) VALUES (56, N'Si La')
SET IDENTITY_INSERT [dbo].[DanToc] OFF
SET IDENTITY_INSERT [dbo].[HopDong] ON 

INSERT [dbo].[HopDong] ([IDHopDong], [NgayLapHD], [NgayBatDau], [NgayHetHan], [GhiChu], [IDLoaiHD], [IDNhanVien]) VALUES (57, CAST(0x70410B00 AS Date), CAST(0x70410B00 AS Date), CAST(0xDD420B00 AS Date), N'Ký', 2, 46)
INSERT [dbo].[HopDong] ([IDHopDong], [NgayLapHD], [NgayBatDau], [NgayHetHan], [GhiChu], [IDLoaiHD], [IDNhanVien]) VALUES (58, CAST(0x33410B00 AS Date), CAST(0x33410B00 AS Date), CAST(0xA0420B00 AS Date), N'Ký', 2, 49)
INSERT [dbo].[HopDong] ([IDHopDong], [NgayLapHD], [NgayBatDau], [NgayHetHan], [GhiChu], [IDLoaiHD], [IDNhanVien]) VALUES (60, CAST(0xEF400B00 AS Date), CAST(0xEF400B00 AS Date), CAST(0x5C420B00 AS Date), N'Ký', 2, 12)
INSERT [dbo].[HopDong] ([IDHopDong], [NgayLapHD], [NgayBatDau], [NgayHetHan], [GhiChu], [IDLoaiHD], [IDNhanVien]) VALUES (61, CAST(0xD7400B00 AS Date), CAST(0xD7400B00 AS Date), CAST(0x44420B00 AS Date), N'Hủy', 2, 1054)
INSERT [dbo].[HopDong] ([IDHopDong], [NgayLapHD], [NgayBatDau], [NgayHetHan], [GhiChu], [IDLoaiHD], [IDNhanVien]) VALUES (63, CAST(0x9B400B00 AS Date), CAST(0x9B400B00 AS Date), CAST(0x09420B00 AS Date), N'Hủy', 2, 1058)
INSERT [dbo].[HopDong] ([IDHopDong], [NgayLapHD], [NgayBatDau], [NgayHetHan], [GhiChu], [IDLoaiHD], [IDNhanVien]) VALUES (64, CAST(0xD7400B00 AS Date), CAST(0xD7400B00 AS Date), CAST(0x44420B00 AS Date), N'Ký', 2, 1059)
INSERT [dbo].[HopDong] ([IDHopDong], [NgayLapHD], [NgayBatDau], [NgayHetHan], [GhiChu], [IDLoaiHD], [IDNhanVien]) VALUES (65, CAST(0x08400B00 AS Date), CAST(0x08400B00 AS Date), CAST(0x76410B00 AS Date), N'Ký', 2, 1055)
INSERT [dbo].[HopDong] ([IDHopDong], [NgayLapHD], [NgayBatDau], [NgayHetHan], [GhiChu], [IDLoaiHD], [IDNhanVien]) VALUES (66, CAST(0x953E0B00 AS Date), CAST(0x953E0B00 AS Date), CAST(0x02400B00 AS Date), N'Ký', 2, 1057)
INSERT [dbo].[HopDong] ([IDHopDong], [NgayLapHD], [NgayBatDau], [NgayHetHan], [GhiChu], [IDLoaiHD], [IDNhanVien]) VALUES (70, CAST(0x14410B00 AS Date), CAST(0x14410B00 AS Date), CAST(0x51410B00 AS Date), N'Ký', 10, 1062)
INSERT [dbo].[HopDong] ([IDHopDong], [NgayLapHD], [NgayBatDau], [NgayHetHan], [GhiChu], [IDLoaiHD], [IDNhanVien]) VALUES (71, CAST(0x71410B00 AS Date), CAST(0x71410B00 AS Date), CAST(0xDE420B00 AS Date), N'Ký', 2, 1063)
INSERT [dbo].[HopDong] ([IDHopDong], [NgayLapHD], [NgayBatDau], [NgayHetHan], [GhiChu], [IDLoaiHD], [IDNhanVien]) VALUES (72, CAST(0x6E410B00 AS Date), CAST(0x6E410B00 AS Date), CAST(0xAB410B00 AS Date), N'Ký', 10, 1064)
INSERT [dbo].[HopDong] ([IDHopDong], [NgayLapHD], [NgayBatDau], [NgayHetHan], [GhiChu], [IDLoaiHD], [IDNhanVien]) VALUES (73, CAST(0x70410B00 AS Date), CAST(0x70410B00 AS Date), CAST(0xAD410B00 AS Date), N'Hủy', 10, 1065)
INSERT [dbo].[HopDong] ([IDHopDong], [NgayLapHD], [NgayBatDau], [NgayHetHan], [GhiChu], [IDLoaiHD], [IDNhanVien]) VALUES (74, CAST(0x71410B00 AS Date), CAST(0x71410B00 AS Date), CAST(0xAE410B00 AS Date), N'Hủy', 10, 1066)
SET IDENTITY_INSERT [dbo].[HopDong] OFF
SET IDENTITY_INSERT [dbo].[LoaiHopDong] ON 

INSERT [dbo].[LoaiHopDong] ([IDLoaiHD], [TenHopDong]) VALUES (2, N'Hợp đồng chính thức')
INSERT [dbo].[LoaiHopDong] ([IDLoaiHD], [TenHopDong]) VALUES (10, N'Hợp đồng thử việc')
SET IDENTITY_INSERT [dbo].[LoaiHopDong] OFF
SET IDENTITY_INSERT [dbo].[NhanVien] ON 

INSERT [dbo].[NhanVien] ([IDNhanVien], [HoDem], [Ten], [HinhAnh], [TinhTrangHonNhan], [NgaySinh], [NoiSinh], [GioiTinh], [DiaChiThuongTru], [ChoOHienTai], [SoCMNN], [NgayCap], [TonGiao], [NoiCap], [QuocTich], [Email], [SoDienThoai], [NganhHoc], [NoiDaoTao], [XepLoai], [username], [IDPhongBan], [IDChucVu], [IDQuanHeGD], [IDDanToc], [IDTrinhDo], [IDQuyetDinhBN], [trangthaiHDThuViec], [trangthaiHDChinhThuc]) VALUES (9, N'Nguyễn Hoàng', N'A', NULL, N'Độc thân', CAST(0x9A1D0B00 AS Date), N'Cà Mau', N'Nữ', N'Cà Mau', N'Hồ Chí Minh', N'312345891', CAST(0x55410B00 AS Date), N'Không', N'Cà Mau', N'Việt Nam', N'a@gmail.com', N'0908070605', NULL, N'', NULL, N'9', 1, 4, NULL, 1, 8, NULL, NULL, NULL)
INSERT [dbo].[NhanVien] ([IDNhanVien], [HoDem], [Ten], [HinhAnh], [TinhTrangHonNhan], [NgaySinh], [NoiSinh], [GioiTinh], [DiaChiThuongTru], [ChoOHienTai], [SoCMNN], [NgayCap], [TonGiao], [NoiCap], [QuocTich], [Email], [SoDienThoai], [NganhHoc], [NoiDaoTao], [XepLoai], [username], [IDPhongBan], [IDChucVu], [IDQuanHeGD], [IDDanToc], [IDTrinhDo], [IDQuyetDinhBN], [trangthaiHDThuViec], [trangthaiHDChinhThuc]) VALUES (11, N'Phan Thị', N'Cê', NULL, N'Độc thân', CAST(0x3C1C0B00 AS Date), N'Đồng Nai', N'Nữ', N'Đồng Nai', N'Hồ Chí Minh', N'312345892', CAST(0xA13B0B00 AS Date), N'Không', N'Đồng Nai', N'Việt Nam', N'c@gmail.com', N'0908070605', NULL, NULL, NULL, NULL, 1, 1, NULL, 1, 7, NULL, NULL, NULL)
INSERT [dbo].[NhanVien] ([IDNhanVien], [HoDem], [Ten], [HinhAnh], [TinhTrangHonNhan], [NgaySinh], [NoiSinh], [GioiTinh], [DiaChiThuongTru], [ChoOHienTai], [SoCMNN], [NgayCap], [TonGiao], [NoiCap], [QuocTich], [Email], [SoDienThoai], [NganhHoc], [NoiDaoTao], [XepLoai], [username], [IDPhongBan], [IDChucVu], [IDQuanHeGD], [IDDanToc], [IDTrinhDo], [IDQuyetDinhBN], [trangthaiHDThuViec], [trangthaiHDChinhThuc]) VALUES (12, N'Lê Văn', N'Đê', N'assets/images/nv10.jpg', N'Độc thân', CAST(0xE8170B00 AS Date), N'An Giang', N'Nam', N'An Giang', N'Hà Nội', N'312397424', CAST(0x9B3B0B00 AS Date), N'Không', N'An Giang', N'Việt Nam', N'd@gmail.com', N'0908070606', NULL, NULL, NULL, N'12', 2, 4, NULL, 1, 7, NULL, NULL, N'Đã ký')
INSERT [dbo].[NhanVien] ([IDNhanVien], [HoDem], [Ten], [HinhAnh], [TinhTrangHonNhan], [NgaySinh], [NoiSinh], [GioiTinh], [DiaChiThuongTru], [ChoOHienTai], [SoCMNN], [NgayCap], [TonGiao], [NoiCap], [QuocTich], [Email], [SoDienThoai], [NganhHoc], [NoiDaoTao], [XepLoai], [username], [IDPhongBan], [IDChucVu], [IDQuanHeGD], [IDDanToc], [IDTrinhDo], [IDQuyetDinhBN], [trangthaiHDThuViec], [trangthaiHDChinhThuc]) VALUES (40, N'Nguyễn Văn', N'An', N'assets/images/Test_QuanLyNhanVien.side', N'Độc thân', CAST(0xC4210B00 AS Date), N'Vĩnh Long', N'Nam', N'Tiền Giang', N'Hồ Chí Minh', N'312397427', CAST(0x09410B00 AS Date), N'Không', N'Tiền Giang', N'Việt Nam', N'kiet@gmail.com', N'0964456724', NULL, N'', NULL, NULL, 2, 2, NULL, 5, 8, NULL, NULL, NULL)
INSERT [dbo].[NhanVien] ([IDNhanVien], [HoDem], [Ten], [HinhAnh], [TinhTrangHonNhan], [NgaySinh], [NoiSinh], [GioiTinh], [DiaChiThuongTru], [ChoOHienTai], [SoCMNN], [NgayCap], [TonGiao], [NoiCap], [QuocTich], [Email], [SoDienThoai], [NganhHoc], [NoiDaoTao], [XepLoai], [username], [IDPhongBan], [IDChucVu], [IDQuanHeGD], [IDDanToc], [IDTrinhDo], [IDQuyetDinhBN], [trangthaiHDThuViec], [trangthaiHDChinhThuc]) VALUES (46, N'Huỳnh Hoài ', N'Bảo', N'assets/images/nv12.jpg', N'Độc thân', CAST(0x2C200B00 AS Date), N'Cà Mau', N'Nam', N'Cà Mau', N'Hồ Chí Minh', N'312315894', CAST(0x533A0B00 AS Date), N'Không', N'Cà Mau', N'Việt Nam', N'bao@gmail.com', N'0942589489', NULL, N'', NULL, N'adminNS', 1, 8, NULL, 1, 10, NULL, NULL, N'Đã ký')
INSERT [dbo].[NhanVien] ([IDNhanVien], [HoDem], [Ten], [HinhAnh], [TinhTrangHonNhan], [NgaySinh], [NoiSinh], [GioiTinh], [DiaChiThuongTru], [ChoOHienTai], [SoCMNN], [NgayCap], [TonGiao], [NoiCap], [QuocTich], [Email], [SoDienThoai], [NganhHoc], [NoiDaoTao], [XepLoai], [username], [IDPhongBan], [IDChucVu], [IDQuanHeGD], [IDDanToc], [IDTrinhDo], [IDQuyetDinhBN], [trangthaiHDThuViec], [trangthaiHDChinhThuc]) VALUES (49, N'Lâm Thiên', N'Lập', N'assets/images/nv2.png', N'Đã có gia đình', CAST(0x19220B00 AS Date), N'Cà Mau', N'Nam', N'Cà Mau', N'Hồ Chí Minh', N'312358956', CAST(0x3C3A0B00 AS Date), N'Không', N'Cà Mau', N'Việt Nam', N'lap@gmail.com', N'0919258489', NULL, N'', NULL, N'adminTC', 2, 8, NULL, 1, 10, NULL, NULL, N'Đã ký')
INSERT [dbo].[NhanVien] ([IDNhanVien], [HoDem], [Ten], [HinhAnh], [TinhTrangHonNhan], [NgaySinh], [NoiSinh], [GioiTinh], [DiaChiThuongTru], [ChoOHienTai], [SoCMNN], [NgayCap], [TonGiao], [NoiCap], [QuocTich], [Email], [SoDienThoai], [NganhHoc], [NoiDaoTao], [XepLoai], [username], [IDPhongBan], [IDChucVu], [IDQuanHeGD], [IDDanToc], [IDTrinhDo], [IDQuyetDinhBN], [trangthaiHDThuViec], [trangthaiHDChinhThuc]) VALUES (1054, N'Lê Thị', N'Bê', N'assets/images/nv5.jpg', N'Độc thân', CAST(0xB91D0B00 AS Date), N'Đà Nẵng', N'Nam', N'Đà Nẵng', N'Hồ Chí Minh', N'312348595', CAST(0xBB3B0B00 AS Date), N'Không', N'Đà Nẵng', N'Việt Nam', N'b@gmail.com', N'0908070605', NULL, NULL, NULL, NULL, 5, 4, NULL, 1, 8, NULL, N'Đã thôi việc', N'Đã thôi việc')
INSERT [dbo].[NhanVien] ([IDNhanVien], [HoDem], [Ten], [HinhAnh], [TinhTrangHonNhan], [NgaySinh], [NoiSinh], [GioiTinh], [DiaChiThuongTru], [ChoOHienTai], [SoCMNN], [NgayCap], [TonGiao], [NoiCap], [QuocTich], [Email], [SoDienThoai], [NganhHoc], [NoiDaoTao], [XepLoai], [username], [IDPhongBan], [IDChucVu], [IDQuanHeGD], [IDDanToc], [IDTrinhDo], [IDQuyetDinhBN], [trangthaiHDThuViec], [trangthaiHDChinhThuc]) VALUES (1055, N'Trần Văn', N'E', N'assets/images/nv6.jpg', N'Độc thân', CAST(0x58230B00 AS Date), N'Đồng Nai', N'Nam', N'Đồng Nai', N'Hồ Chí Minh', N'312348596', CAST(0xF13C0B00 AS Date), N'Không', N'Đồng Nai', N'Việt Nam', N'e@gmail.com', N'0911335577', NULL, NULL, NULL, N'1055', 5, 2, NULL, 1, 8, NULL, NULL, N'Đã ký')
INSERT [dbo].[NhanVien] ([IDNhanVien], [HoDem], [Ten], [HinhAnh], [TinhTrangHonNhan], [NgaySinh], [NoiSinh], [GioiTinh], [DiaChiThuongTru], [ChoOHienTai], [SoCMNN], [NgayCap], [TonGiao], [NoiCap], [QuocTich], [Email], [SoDienThoai], [NganhHoc], [NoiDaoTao], [XepLoai], [username], [IDPhongBan], [IDChucVu], [IDQuanHeGD], [IDDanToc], [IDTrinhDo], [IDQuyetDinhBN], [trangthaiHDThuViec], [trangthaiHDChinhThuc]) VALUES (1056, N'Nguyễn Thị', N'Nữ', N'assets/images/nv11.jpg', N'Đã có gia đình', CAST(0x0F180B00 AS Date), N'Bến Tre', N'Nam', N'Bến Tre', N'Hồ Chí Minh', N'312348597', CAST(0xBB3B0B00 AS Date), N'Không', N'Bến Tre', N'Việt Nam', N'ghe@gmail.com', N'0912131415', NULL, N'', NULL, NULL, 99, 4, NULL, 1, 8, NULL, NULL, NULL)
INSERT [dbo].[NhanVien] ([IDNhanVien], [HoDem], [Ten], [HinhAnh], [TinhTrangHonNhan], [NgaySinh], [NoiSinh], [GioiTinh], [DiaChiThuongTru], [ChoOHienTai], [SoCMNN], [NgayCap], [TonGiao], [NoiCap], [QuocTich], [Email], [SoDienThoai], [NganhHoc], [NoiDaoTao], [XepLoai], [username], [IDPhongBan], [IDChucVu], [IDQuanHeGD], [IDDanToc], [IDTrinhDo], [IDQuyetDinhBN], [trangthaiHDThuViec], [trangthaiHDChinhThuc]) VALUES (1057, N'Trần Văn', N'Hắc', N'assets/images/nv6.jpg', N'Độc thân', CAST(0xBC1E0B00 AS Date), N'Hải Phòng', N'Nam', N'Hải Phòng', N'Hồ Chí Minh', N'312348598', CAST(0xE93C0B00 AS Date), N'Không', N'Hải Phòng', N'Việt Nam', N'h@gmail.com', N'0908070606', NULL, NULL, NULL, NULL, 99, 1, NULL, 1, 8, NULL, NULL, N'Đã ký')
INSERT [dbo].[NhanVien] ([IDNhanVien], [HoDem], [Ten], [HinhAnh], [TinhTrangHonNhan], [NgaySinh], [NoiSinh], [GioiTinh], [DiaChiThuongTru], [ChoOHienTai], [SoCMNN], [NgayCap], [TonGiao], [NoiCap], [QuocTich], [Email], [SoDienThoai], [NganhHoc], [NoiDaoTao], [XepLoai], [username], [IDPhongBan], [IDChucVu], [IDQuanHeGD], [IDDanToc], [IDTrinhDo], [IDQuyetDinhBN], [trangthaiHDThuViec], [trangthaiHDChinhThuc]) VALUES (1058, N'Phạm Thị', N'Lờ', N'assets/images/nv13.jpg', N'Đã có gia đình', CAST(0x3E190B00 AS Date), N'Đồng Nai', N'Nữ', N'Đồng Nai', N'Hồ Chí Minh', N'312348599', CAST(0x5B3E0B00 AS Date), N'Không', N'Đồng Nai', N'Việt Nam', N'lo@gmail.com', N'0908070604', NULL, NULL, NULL, NULL, 100, 4, NULL, 1, 7, NULL, N'Đã thôi việc', N'Đã thôi việc')
INSERT [dbo].[NhanVien] ([IDNhanVien], [HoDem], [Ten], [HinhAnh], [TinhTrangHonNhan], [NgaySinh], [NoiSinh], [GioiTinh], [DiaChiThuongTru], [ChoOHienTai], [SoCMNN], [NgayCap], [TonGiao], [NoiCap], [QuocTich], [Email], [SoDienThoai], [NganhHoc], [NoiDaoTao], [XepLoai], [username], [IDPhongBan], [IDChucVu], [IDQuanHeGD], [IDDanToc], [IDTrinhDo], [IDQuyetDinhBN], [trangthaiHDThuViec], [trangthaiHDChinhThuc]) VALUES (1059, N'Đỗ Văn', N'Nờ', N'assets/images/nv4.jpg', N'Độc thân', CAST(0xA5240B00 AS Date), N'Long An', N'Nam', N'Long An', N'Hồ Chí Minh', N'312348510', CAST(0x5C3E0B00 AS Date), N'Không', N'Long An', N'Việt Nam', N'n@gmail.com', N'0962233445', NULL, NULL, NULL, NULL, 100, 1, NULL, 1, 8, NULL, NULL, N'Đã ký')
INSERT [dbo].[NhanVien] ([IDNhanVien], [HoDem], [Ten], [HinhAnh], [TinhTrangHonNhan], [NgaySinh], [NoiSinh], [GioiTinh], [DiaChiThuongTru], [ChoOHienTai], [SoCMNN], [NgayCap], [TonGiao], [NoiCap], [QuocTich], [Email], [SoDienThoai], [NganhHoc], [NoiDaoTao], [XepLoai], [username], [IDPhongBan], [IDChucVu], [IDQuanHeGD], [IDDanToc], [IDTrinhDo], [IDQuyetDinhBN], [trangthaiHDThuViec], [trangthaiHDChinhThuc]) VALUES (1060, N'Bùi Thị', N'Vê', N'assets/images/nv5.jpg', N'Độc thân', CAST(0x241C0B00 AS Date), N'Vĩnh Long', N'Nữ', N'Vĩnh Long', N'Hồ Chí Minh', N'312348511', CAST(0x0D3A0B00 AS Date), N'Không', N'Vĩnh Long', N'Việt Nam', N'v@gmail.com', N'0922334455', NULL, NULL, NULL, NULL, 2, 1, NULL, 1, 8, NULL, NULL, NULL)
INSERT [dbo].[NhanVien] ([IDNhanVien], [HoDem], [Ten], [HinhAnh], [TinhTrangHonNhan], [NgaySinh], [NoiSinh], [GioiTinh], [DiaChiThuongTru], [ChoOHienTai], [SoCMNN], [NgayCap], [TonGiao], [NoiCap], [QuocTich], [Email], [SoDienThoai], [NganhHoc], [NoiDaoTao], [XepLoai], [username], [IDPhongBan], [IDChucVu], [IDQuanHeGD], [IDDanToc], [IDTrinhDo], [IDQuyetDinhBN], [trangthaiHDThuViec], [trangthaiHDChinhThuc]) VALUES (1062, N'Cao Thái', N'Sơn', N'assets/images/nv4.jpg', N'Đã có gia đình', CAST(0x9A1D0B00 AS Date), N'Nghệ An', N'Nam', N'Nghệ An', N'Hồ Chí Minh', N'312348511', CAST(0x32410B00 AS Date), N'Không', N'Nghệ An', N'Việt Nam', N'son@gmail.com', N'0979797979', NULL, N'Bổ nhiệm', NULL, NULL, 100, 1, NULL, 7, 6, 45, N'Đã ký', NULL)
INSERT [dbo].[NhanVien] ([IDNhanVien], [HoDem], [Ten], [HinhAnh], [TinhTrangHonNhan], [NgaySinh], [NoiSinh], [GioiTinh], [DiaChiThuongTru], [ChoOHienTai], [SoCMNN], [NgayCap], [TonGiao], [NoiCap], [QuocTich], [Email], [SoDienThoai], [NganhHoc], [NoiDaoTao], [XepLoai], [username], [IDPhongBan], [IDChucVu], [IDQuanHeGD], [IDDanToc], [IDTrinhDo], [IDQuyetDinhBN], [trangthaiHDThuViec], [trangthaiHDChinhThuc]) VALUES (1063, N'Hồ Ngọc', N'Hà', N'assets/images/nv3.jpg', N'Độc thân', CAST(0x351C0B00 AS Date), N'Đà Nẵng', N'Nữ', N'Nghệ An', N'Hồ Chí Minh', N'312348512', CAST(0x5B410B00 AS Date), N'Không', N'Nghệ An', N'Việt Nam', N'ha@gmail.com', N'0922334451', NULL, N'Bổ nhiệm & gia hạn', NULL, NULL, 5, 1, NULL, 16, 8, 46, NULL, N'Đã ký')
INSERT [dbo].[NhanVien] ([IDNhanVien], [HoDem], [Ten], [HinhAnh], [TinhTrangHonNhan], [NgaySinh], [NoiSinh], [GioiTinh], [DiaChiThuongTru], [ChoOHienTai], [SoCMNN], [NgayCap], [TonGiao], [NoiCap], [QuocTich], [Email], [SoDienThoai], [NganhHoc], [NoiDaoTao], [XepLoai], [username], [IDPhongBan], [IDChucVu], [IDQuanHeGD], [IDDanToc], [IDTrinhDo], [IDQuyetDinhBN], [trangthaiHDThuViec], [trangthaiHDChinhThuc]) VALUES (1064, N'Đàm Vĩnh', N'Hưng', N'assets/images/nv12.jpg', N'Độc thân', CAST(0xFC140B00 AS Date), N'Đà Nẵng', N'Nam', N'Đà Nẵng', N'Hồ Chí Minh', N'312346854', CAST(0xCF350B00 AS Date), N'Không', N'Đà Nẵng', N'Việt Nam', N'hung@gmail.com', N'0923456789', NULL, N'Bổ nhiệm', NULL, NULL, 99, 1, NULL, 1, 8, 47, N'Đã ký', NULL)
INSERT [dbo].[NhanVien] ([IDNhanVien], [HoDem], [Ten], [HinhAnh], [TinhTrangHonNhan], [NgaySinh], [NoiSinh], [GioiTinh], [DiaChiThuongTru], [ChoOHienTai], [SoCMNN], [NgayCap], [TonGiao], [NoiCap], [QuocTich], [Email], [SoDienThoai], [NganhHoc], [NoiDaoTao], [XepLoai], [username], [IDPhongBan], [IDChucVu], [IDQuanHeGD], [IDDanToc], [IDTrinhDo], [IDQuyetDinhBN], [trangthaiHDThuViec], [trangthaiHDChinhThuc]) VALUES (1065, N'Châu Đăng ', N'Khoa', N'assets/images/nv4.jpg', N'Độc thân', CAST(0x9A1D0B00 AS Date), N'Đà Nẵng', N'Nam', N'Đà Nẵng', N'Hồ Chí Minh', N'312395248', CAST(0x47410B00 AS Date), N'Không', N'Đà Nẵng', N'Việt Nam', N'det@gmail.com', N'0922334455', NULL, N'Bổ nhiệm', NULL, NULL, 100, 1, NULL, 8, 7, 49, N'Đã thôi việc', N'Đã thôi việc')
INSERT [dbo].[NhanVien] ([IDNhanVien], [HoDem], [Ten], [HinhAnh], [TinhTrangHonNhan], [NgaySinh], [NoiSinh], [GioiTinh], [DiaChiThuongTru], [ChoOHienTai], [SoCMNN], [NgayCap], [TonGiao], [NoiCap], [QuocTich], [Email], [SoDienThoai], [NganhHoc], [NoiDaoTao], [XepLoai], [username], [IDPhongBan], [IDChucVu], [IDQuanHeGD], [IDDanToc], [IDTrinhDo], [IDQuyetDinhBN], [trangthaiHDThuViec], [trangthaiHDChinhThuc]) VALUES (1066, N'Lê Bảo', N'Bình', N'assets/images/nv4.jpg', N'Đã có gia đình', CAST(0x2D1C0B00 AS Date), N'Cao Bằng', N'Nam', N'Cao Bằng', N'Hồ Chí Minh', N'312397419', CAST(0x46410B00 AS Date), N'Không', N'Cao Bằng', N'Việt Nam', N'son@gmail.com', N'0922334455', NULL, N'Bổ nhiệm', NULL, NULL, 2, 1, NULL, 1, 7, 50, N'Đã thôi việc', N'Đã thôi việc')
SET IDENTITY_INSERT [dbo].[NhanVien] OFF
SET IDENTITY_INSERT [dbo].[PhongBan] ON 

INSERT [dbo].[PhongBan] ([IDPhongBan], [TenPhongBan], [TenTruongPhong], [MoTa]) VALUES (1, N'Phòng nhân sự', NULL, N'Phòng quản lý nhân viên trong công ty')
INSERT [dbo].[PhongBan] ([IDPhongBan], [TenPhongBan], [TenTruongPhong], [MoTa]) VALUES (2, N'Phòng tài chính', NULL, N'Chuyên về lương và các khoản bảo hiểm trong công ty')
INSERT [dbo].[PhongBan] ([IDPhongBan], [TenPhongBan], [TenTruongPhong], [MoTa]) VALUES (5, N'Phòng kinh doanh', NULL, N'Tập trung buôn bán các sản phẩm của công ty')
INSERT [dbo].[PhongBan] ([IDPhongBan], [TenPhongBan], [TenTruongPhong], [MoTa]) VALUES (99, N'Phòng kỹ thuật', NULL, N'Chuyên về kỷ thuật trong công ty')
INSERT [dbo].[PhongBan] ([IDPhongBan], [TenPhongBan], [TenTruongPhong], [MoTa]) VALUES (100, N'Phòng kế hoạch', NULL, N'Chuyên lên các kế hoạch làm việc cho công ty')
SET IDENTITY_INSERT [dbo].[PhongBan] OFF
SET IDENTITY_INSERT [dbo].[QuyetDinhBoNhiem] ON 

INSERT [dbo].[QuyetDinhBoNhiem] ([IDQuyetDinhBN], [TenQuyetDinhBN], [NgayQuyetDinh], [NgayHieuLuc], [NoiDung], [GhiChu], [IDUngVien]) VALUES (44, NULL, CAST(0x70410B00 AS Date), CAST(0x70410B00 AS Date), N'', N'', 31)
INSERT [dbo].[QuyetDinhBoNhiem] ([IDQuyetDinhBN], [TenQuyetDinhBN], [NgayQuyetDinh], [NgayHieuLuc], [NoiDung], [GhiChu], [IDUngVien]) VALUES (45, NULL, CAST(0x9B400B00 AS Date), CAST(0x9B400B00 AS Date), N'', N'', 27)
INSERT [dbo].[QuyetDinhBoNhiem] ([IDQuyetDinhBN], [TenQuyetDinhBN], [NgayQuyetDinh], [NgayHieuLuc], [NoiDung], [GhiChu], [IDUngVien]) VALUES (46, NULL, CAST(0x51410B00 AS Date), CAST(0x51410B00 AS Date), N'', N'', 25)
INSERT [dbo].[QuyetDinhBoNhiem] ([IDQuyetDinhBN], [TenQuyetDinhBN], [NgayQuyetDinh], [NgayHieuLuc], [NoiDung], [GhiChu], [IDUngVien]) VALUES (47, NULL, CAST(0x70410B00 AS Date), CAST(0x70410B00 AS Date), N'', N'', 32)
INSERT [dbo].[QuyetDinhBoNhiem] ([IDQuyetDinhBN], [TenQuyetDinhBN], [NgayQuyetDinh], [NgayHieuLuc], [NoiDung], [GhiChu], [IDUngVien]) VALUES (49, NULL, CAST(0x70410B00 AS Date), CAST(0x70410B00 AS Date), N'', N'', 30)
INSERT [dbo].[QuyetDinhBoNhiem] ([IDQuyetDinhBN], [TenQuyetDinhBN], [NgayQuyetDinh], [NgayHieuLuc], [NoiDung], [GhiChu], [IDUngVien]) VALUES (50, NULL, CAST(0x71410B00 AS Date), CAST(0x71410B00 AS Date), N'', N'', 24)
SET IDENTITY_INSERT [dbo].[QuyetDinhBoNhiem] OFF
SET IDENTITY_INSERT [dbo].[QuyetDinhKL] ON 

INSERT [dbo].[QuyetDinhKL] ([IDQuyetDinhKL], [TenQuyetDinh], [NgayLap], [HoDem], [Ten], [IDNhanVien], [NgayHieuLuc], [NgayHetHieuLuc], [NoiDung], [SoTienPhat]) VALUES (15, NULL, CAST(0x33410B00 AS Date), N'Lê Văn', N'Đê', 12, CAST(0x33410B00 AS Date), CAST(0x45410B00 AS Date), N'', CAST(200000 AS Decimal(18, 0)))
INSERT [dbo].[QuyetDinhKL] ([IDQuyetDinhKL], [TenQuyetDinh], [NgayLap], [HoDem], [Ten], [IDNhanVien], [NgayHieuLuc], [NgayHetHieuLuc], [NoiDung], [SoTienPhat]) VALUES (16, NULL, CAST(0x51410B00 AS Date), N'Lê Văn', N'Đê', 12, CAST(0x51410B00 AS Date), CAST(0x64410B00 AS Date), N'', CAST(200000 AS Decimal(18, 0)))
INSERT [dbo].[QuyetDinhKL] ([IDQuyetDinhKL], [TenQuyetDinh], [NgayLap], [HoDem], [Ten], [IDNhanVien], [NgayHieuLuc], [NgayHetHieuLuc], [NoiDung], [SoTienPhat]) VALUES (17, NULL, CAST(0x71410B00 AS Date), N'Nguyễn Văn', N'A', 9, CAST(0x71410B00 AS Date), CAST(0x83410B00 AS Date), N'đi trễ', CAST(100000 AS Decimal(18, 0)))
INSERT [dbo].[QuyetDinhKL] ([IDQuyetDinhKL], [TenQuyetDinh], [NgayLap], [HoDem], [Ten], [IDNhanVien], [NgayHieuLuc], [NgayHetHieuLuc], [NoiDung], [SoTienPhat]) VALUES (18, NULL, CAST(0x52410B00 AS Date), N'Nguyễn Văn', N'A', 9, CAST(0x52410B00 AS Date), CAST(0x64410B00 AS Date), N'', CAST(100000 AS Decimal(18, 0)))
SET IDENTITY_INSERT [dbo].[QuyetDinhKL] OFF
SET IDENTITY_INSERT [dbo].[QuyetDinhKT] ON 

INSERT [dbo].[QuyetDinhKT] ([IDQuyetDinhKT], [TenQuyetDinh], [NgayLap], [HoDem], [Ten], [IDNhanVien], [NgayHieuLuc], [NgayHetHieuLuc], [NoiDung], [SoTienThuong], [GhiChu]) VALUES (33, NULL, CAST(0x46410B00 AS Date), N'Nguyễn Văn', N'A', 9, CAST(0x47410B00 AS Date), CAST(0x64410B00 AS Date), N'Hoàn thành dự án trước thời hạn', CAST(100000 AS Decimal(18, 0)), N'')
INSERT [dbo].[QuyetDinhKT] ([IDQuyetDinhKT], [TenQuyetDinh], [NgayLap], [HoDem], [Ten], [IDNhanVien], [NgayHieuLuc], [NgayHetHieuLuc], [NoiDung], [SoTienThuong], [GhiChu]) VALUES (35, NULL, CAST(0x63410B00 AS Date), N'Nguyễn Minh', N'Kiệt', 40, CAST(0x63410B00 AS Date), CAST(0x64410B00 AS Date), N'Tích cực', CAST(500000 AS Decimal(18, 0)), N'...')
INSERT [dbo].[QuyetDinhKT] ([IDQuyetDinhKT], [TenQuyetDinh], [NgayLap], [HoDem], [Ten], [IDNhanVien], [NgayHieuLuc], [NgayHetHieuLuc], [NoiDung], [SoTienThuong], [GhiChu]) VALUES (38, NULL, CAST(0x33410B00 AS Date), N'Lê Văn', N'Đê', 12, CAST(0x33410B00 AS Date), CAST(0x45410B00 AS Date), N'', CAST(500000 AS Decimal(18, 0)), N'')
INSERT [dbo].[QuyetDinhKT] ([IDQuyetDinhKT], [TenQuyetDinh], [NgayLap], [HoDem], [Ten], [IDNhanVien], [NgayHieuLuc], [NgayHetHieuLuc], [NoiDung], [SoTienThuong], [GhiChu]) VALUES (39, NULL, CAST(0x33410B00 AS Date), N'Lê Văn', N'Đê', 12, CAST(0x33410B00 AS Date), CAST(0x45410B00 AS Date), N'', CAST(200000 AS Decimal(18, 0)), N'')
INSERT [dbo].[QuyetDinhKT] ([IDQuyetDinhKT], [TenQuyetDinh], [NgayLap], [HoDem], [Ten], [IDNhanVien], [NgayHieuLuc], [NgayHetHieuLuc], [NoiDung], [SoTienThuong], [GhiChu]) VALUES (40, NULL, CAST(0x51410B00 AS Date), N'Lê Văn', N'Đê', 12, CAST(0x51410B00 AS Date), CAST(0x64410B00 AS Date), N'', CAST(100000 AS Decimal(18, 0)), N'')
SET IDENTITY_INSERT [dbo].[QuyetDinhKT] OFF
INSERT [dbo].[TaiKhoan] ([username], [password], [mail]) VALUES (N'1055', N'123', N'2020-08-12')
INSERT [dbo].[TaiKhoan] ([username], [password], [mail]) VALUES (N'12', N'123', N'2020-08-12')
INSERT [dbo].[TaiKhoan] ([username], [password], [mail]) VALUES (N'9', N'123', N'2020-08-12')
INSERT [dbo].[TaiKhoan] ([username], [password], [mail]) VALUES (N'admin', N'123', N'1999-01-01')
INSERT [dbo].[TaiKhoan] ([username], [password], [mail]) VALUES (N'adminNS', N'123', N'2020-08-12')
INSERT [dbo].[TaiKhoan] ([username], [password], [mail]) VALUES (N'adminTC', N'123', N'2020-08-12')
INSERT [dbo].[TaiKhoan] ([username], [password], [mail]) VALUES (N'test', N'123', N'1999-01-01')
SET IDENTITY_INSERT [dbo].[TamUngLuong] ON 

INSERT [dbo].[TamUngLuong] ([IDTamUng], [NgayTamUng], [SoTienTamUng], [LyDoTamUng], [GhiChu], [NguoiChoTamUng], [IDNhanVien]) VALUES (31, CAST(0x46410B00 AS Date), CAST(100000 AS Decimal(18, 0)), NULL, NULL, NULL, 9)
INSERT [dbo].[TamUngLuong] ([IDTamUng], [NgayTamUng], [SoTienTamUng], [LyDoTamUng], [GhiChu], [NguoiChoTamUng], [IDNhanVien]) VALUES (32, CAST(0x47410B00 AS Date), CAST(100000 AS Decimal(18, 0)), NULL, NULL, NULL, 9)
INSERT [dbo].[TamUngLuong] ([IDTamUng], [NgayTamUng], [SoTienTamUng], [LyDoTamUng], [GhiChu], [NguoiChoTamUng], [IDNhanVien]) VALUES (33, CAST(0x59410B00 AS Date), CAST(100000 AS Decimal(18, 0)), N'', N'', NULL, 9)
INSERT [dbo].[TamUngLuong] ([IDTamUng], [NgayTamUng], [SoTienTamUng], [LyDoTamUng], [GhiChu], [NguoiChoTamUng], [IDNhanVien]) VALUES (34, CAST(0x60410B00 AS Date), CAST(100000 AS Decimal(18, 0)), N'Khổ quá', N'....', NULL, 12)
INSERT [dbo].[TamUngLuong] ([IDTamUng], [NgayTamUng], [SoTienTamUng], [LyDoTamUng], [GhiChu], [NguoiChoTamUng], [IDNhanVien]) VALUES (35, CAST(0x60410B00 AS Date), CAST(50000 AS Decimal(18, 0)), N'....', N'..', NULL, 12)
INSERT [dbo].[TamUngLuong] ([IDTamUng], [NgayTamUng], [SoTienTamUng], [LyDoTamUng], [GhiChu], [NguoiChoTamUng], [IDNhanVien]) VALUES (36, CAST(0x60410B00 AS Date), CAST(50000 AS Decimal(18, 0)), N'', N'', NULL, 12)
INSERT [dbo].[TamUngLuong] ([IDTamUng], [NgayTamUng], [SoTienTamUng], [LyDoTamUng], [GhiChu], [NguoiChoTamUng], [IDNhanVien]) VALUES (37, CAST(0x60410B00 AS Date), CAST(30000 AS Decimal(18, 0)), N'', N'', NULL, 9)
INSERT [dbo].[TamUngLuong] ([IDTamUng], [NgayTamUng], [SoTienTamUng], [LyDoTamUng], [GhiChu], [NguoiChoTamUng], [IDNhanVien]) VALUES (38, CAST(0x60410B00 AS Date), CAST(33000 AS Decimal(18, 0)), N'', N'', NULL, 12)
INSERT [dbo].[TamUngLuong] ([IDTamUng], [NgayTamUng], [SoTienTamUng], [LyDoTamUng], [GhiChu], [NguoiChoTamUng], [IDNhanVien]) VALUES (40, CAST(0x28410B00 AS Date), CAST(100000 AS Decimal(18, 0)), NULL, NULL, NULL, 9)
INSERT [dbo].[TamUngLuong] ([IDTamUng], [NgayTamUng], [SoTienTamUng], [LyDoTamUng], [GhiChu], [NguoiChoTamUng], [IDNhanVien]) VALUES (44, CAST(0x71410B00 AS Date), CAST(100000 AS Decimal(18, 0)), N'', N'', NULL, 9)
SET IDENTITY_INSERT [dbo].[TamUngLuong] OFF
SET IDENTITY_INSERT [dbo].[TrinhDoDaoTao] ON 

INSERT [dbo].[TrinhDoDaoTao] ([IDTrinhDo], [TenTrinhDo], [HeSoChuyenMon]) VALUES (6, N'Trung cấp', 0.3)
INSERT [dbo].[TrinhDoDaoTao] ([IDTrinhDo], [TenTrinhDo], [HeSoChuyenMon]) VALUES (7, N'Cao Đẳng', 0.4)
INSERT [dbo].[TrinhDoDaoTao] ([IDTrinhDo], [TenTrinhDo], [HeSoChuyenMon]) VALUES (8, N'Đại Học', 0.6)
INSERT [dbo].[TrinhDoDaoTao] ([IDTrinhDo], [TenTrinhDo], [HeSoChuyenMon]) VALUES (9, N'Thạc sĩ', 0.8)
INSERT [dbo].[TrinhDoDaoTao] ([IDTrinhDo], [TenTrinhDo], [HeSoChuyenMon]) VALUES (10, N'Tiến sĩ', 1)
SET IDENTITY_INSERT [dbo].[TrinhDoDaoTao] OFF
SET IDENTITY_INSERT [dbo].[UngVien] ON 

INSERT [dbo].[UngVien] ([IDUngVien], [HoDem], [Ten], [TinhTrangHonNhan], [NgaySinh], [GioiTinh], [DiaChiThuongTru], [ChoOHienTai], [SoCMNN], [NgayCap], [TonGiao], [NoiCap], [QuocTich], [Email], [SoDienThoai], [NganhHoc], [NoiDaoTao], [IDTrinhDo], [XepLoai], [IDDanToc], [NoiSinh], [HinhAnh]) VALUES (24, N'Lê Bảo', N'Bình', N'Đã có gia đình', CAST(0x2D1C0B00 AS Date), N'Nam', N'Cao Bằng', N'Hồ Chí Minh', N'312397419', CAST(0x46410B00 AS Date), N'Không', N'Cao Bằng', N'Việt Nam', N'son@gmail.com', N'0922334455', NULL, N'Duyệt', 7, NULL, 1, N'Cao Bằng', N'assets/images/nv4.jpg')
INSERT [dbo].[UngVien] ([IDUngVien], [HoDem], [Ten], [TinhTrangHonNhan], [NgaySinh], [GioiTinh], [DiaChiThuongTru], [ChoOHienTai], [SoCMNN], [NgayCap], [TonGiao], [NoiCap], [QuocTich], [Email], [SoDienThoai], [NganhHoc], [NoiDaoTao], [IDTrinhDo], [XepLoai], [IDDanToc], [NoiSinh], [HinhAnh]) VALUES (25, N'Hồ Ngọc', N'Hà', N'Độc thân', CAST(0x351C0B00 AS Date), N'Nữ', N'Nghệ An', N'Hồ Chí Minh', N'312348512', CAST(0x5B410B00 AS Date), N'Không', N'Nghệ An', N'Việt Nam', N'ha@gmail.com', N'0922334451', NULL, N'Duyệt', 8, NULL, 16, N'Đà Nẵng', N'assets/images/nv3.jpg')
INSERT [dbo].[UngVien] ([IDUngVien], [HoDem], [Ten], [TinhTrangHonNhan], [NgaySinh], [GioiTinh], [DiaChiThuongTru], [ChoOHienTai], [SoCMNN], [NgayCap], [TonGiao], [NoiCap], [QuocTich], [Email], [SoDienThoai], [NganhHoc], [NoiDaoTao], [IDTrinhDo], [XepLoai], [IDDanToc], [NoiSinh], [HinhAnh]) VALUES (27, N'Cao Thái', N'Sơn', N'Đã có gia đình', CAST(0x9A1D0B00 AS Date), N'Nam', N'Nghệ An', N'Hồ Chí Minh', N'312348511', CAST(0x32410B00 AS Date), N'Không', N'Nghệ An', N'Việt Nam', N'son@gmail.com', N'0979797979', NULL, N'Duyệt', 6, NULL, 7, N'Nghệ An', N'assets/images/nv4.jpg')
INSERT [dbo].[UngVien] ([IDUngVien], [HoDem], [Ten], [TinhTrangHonNhan], [NgaySinh], [GioiTinh], [DiaChiThuongTru], [ChoOHienTai], [SoCMNN], [NgayCap], [TonGiao], [NoiCap], [QuocTich], [Email], [SoDienThoai], [NganhHoc], [NoiDaoTao], [IDTrinhDo], [XepLoai], [IDDanToc], [NoiSinh], [HinhAnh]) VALUES (29, N'Khổng Tú', N'Quỳnh', N'Độc thân', CAST(0x9B1D0B00 AS Date), N'Nữ', N'Đồng Nai', N'Hồ Chí Minh', N'312348519', CAST(0x4E410B00 AS Date), N'Không', N'Đồng Nai', N'Việt Nam', N'quynh@gmail.com', N'0911223344', NULL, N'Chưa', 7, NULL, 14, N'Đồng Nai', N'assets/images/nv15.jpg')
INSERT [dbo].[UngVien] ([IDUngVien], [HoDem], [Ten], [TinhTrangHonNhan], [NgaySinh], [GioiTinh], [DiaChiThuongTru], [ChoOHienTai], [SoCMNN], [NgayCap], [TonGiao], [NoiCap], [QuocTich], [Email], [SoDienThoai], [NganhHoc], [NoiDaoTao], [IDTrinhDo], [XepLoai], [IDDanToc], [NoiSinh], [HinhAnh]) VALUES (30, N'Châu Đăng ', N'Khoa', N'Độc thân', CAST(0x9A1D0B00 AS Date), N'Nam', N'Đà Nẵng', N'Hồ Chí Minh', N'312395248', CAST(0x47410B00 AS Date), N'Không', N'Đà Nẵng', N'Việt Nam', N'det@gmail.com', N'0922334455', NULL, N'Duyệt', 7, NULL, 8, N'Đà Nẵng', N'assets/images/nv4.jpg')
INSERT [dbo].[UngVien] ([IDUngVien], [HoDem], [Ten], [TinhTrangHonNhan], [NgaySinh], [GioiTinh], [DiaChiThuongTru], [ChoOHienTai], [SoCMNN], [NgayCap], [TonGiao], [NoiCap], [QuocTich], [Email], [SoDienThoai], [NganhHoc], [NoiDaoTao], [IDTrinhDo], [XepLoai], [IDDanToc], [NoiSinh], [HinhAnh]) VALUES (31, N'Trần Minh', N'Tuyến', N'Độc thân', CAST(0xE2210B00 AS Date), N'Nam', N'Long An', N'Hồ Chí Minh', N'301656939', CAST(0x233A0B00 AS Date), N'Không', N'Long An', N'Việt Nam', N'tuyen@gmail.com', N'0974759091', NULL, N'Chưa', 8, NULL, 1, N'Long An', N'assets/images/tuyen.jpg')
INSERT [dbo].[UngVien] ([IDUngVien], [HoDem], [Ten], [TinhTrangHonNhan], [NgaySinh], [GioiTinh], [DiaChiThuongTru], [ChoOHienTai], [SoCMNN], [NgayCap], [TonGiao], [NoiCap], [QuocTich], [Email], [SoDienThoai], [NganhHoc], [NoiDaoTao], [IDTrinhDo], [XepLoai], [IDDanToc], [NoiSinh], [HinhAnh]) VALUES (32, N'Đàm Vĩnh', N'Hưng', N'Độc thân', CAST(0xFC140B00 AS Date), N'Nam', N'Đà Nẵng', N'Hồ Chí Minh', N'312346854', CAST(0xCF350B00 AS Date), N'Không', N'Đà Nẵng', N'Việt Nam', N'hung@gmail.com', N'0923456789', NULL, N'Duyệt', 8, NULL, 1, N'Đà Nẵng', N'assets/images/nv12.jpg')
SET IDENTITY_INSERT [dbo].[UngVien] OFF
ALTER TABLE [dbo].[BangLuong]  WITH CHECK ADD  CONSTRAINT [FK_BangLuong_NhanVien] FOREIGN KEY([IDNhanVien])
REFERENCES [dbo].[NhanVien] ([IDNhanVien])
GO
ALTER TABLE [dbo].[BangLuong] CHECK CONSTRAINT [FK_BangLuong_NhanVien]
GO
ALTER TABLE [dbo].[BangLuong]  WITH CHECK ADD  CONSTRAINT [FK_BangLuong_ThuongNgayLe] FOREIGN KEY([IDThuongLe])
REFERENCES [dbo].[ThuongNgayLe] ([IDThuongLe])
GO
ALTER TABLE [dbo].[BangLuong] CHECK CONSTRAINT [FK_BangLuong_ThuongNgayLe]
GO
ALTER TABLE [dbo].[ChamCong]  WITH CHECK ADD  CONSTRAINT [FK_ChamCong_NhanVien] FOREIGN KEY([IDNhanVien])
REFERENCES [dbo].[NhanVien] ([IDNhanVien])
GO
ALTER TABLE [dbo].[ChamCong] CHECK CONSTRAINT [FK_ChamCong_NhanVien]
GO
ALTER TABLE [dbo].[ChamCongTangCa]  WITH CHECK ADD  CONSTRAINT [FK_ChamCongTangCa_NhanVien] FOREIGN KEY([IDNhanVien])
REFERENCES [dbo].[NhanVien] ([IDNhanVien])
GO
ALTER TABLE [dbo].[ChamCongTangCa] CHECK CONSTRAINT [FK_ChamCongTangCa_NhanVien]
GO
ALTER TABLE [dbo].[HopDong]  WITH CHECK ADD  CONSTRAINT [FK_HopDong_LoaiHopDong] FOREIGN KEY([IDLoaiHD])
REFERENCES [dbo].[LoaiHopDong] ([IDLoaiHD])
GO
ALTER TABLE [dbo].[HopDong] CHECK CONSTRAINT [FK_HopDong_LoaiHopDong]
GO
ALTER TABLE [dbo].[HopDong]  WITH CHECK ADD  CONSTRAINT [FK_HopDong_NhanVien] FOREIGN KEY([IDNhanVien])
REFERENCES [dbo].[NhanVien] ([IDNhanVien])
GO
ALTER TABLE [dbo].[HopDong] CHECK CONSTRAINT [FK_HopDong_NhanVien]
GO
ALTER TABLE [dbo].[NhanVien]  WITH CHECK ADD  CONSTRAINT [FK_NhanVien_ChucVu] FOREIGN KEY([IDChucVu])
REFERENCES [dbo].[ChucVu] ([IDChucVu])
GO
ALTER TABLE [dbo].[NhanVien] CHECK CONSTRAINT [FK_NhanVien_ChucVu]
GO
ALTER TABLE [dbo].[NhanVien]  WITH CHECK ADD  CONSTRAINT [FK_NhanVien_DanToc] FOREIGN KEY([IDDanToc])
REFERENCES [dbo].[DanToc] ([IDDanToc])
GO
ALTER TABLE [dbo].[NhanVien] CHECK CONSTRAINT [FK_NhanVien_DanToc]
GO
ALTER TABLE [dbo].[NhanVien]  WITH CHECK ADD  CONSTRAINT [FK_NhanVien_PhongBan] FOREIGN KEY([IDPhongBan])
REFERENCES [dbo].[PhongBan] ([IDPhongBan])
GO
ALTER TABLE [dbo].[NhanVien] CHECK CONSTRAINT [FK_NhanVien_PhongBan]
GO
ALTER TABLE [dbo].[NhanVien]  WITH CHECK ADD  CONSTRAINT [FK_NhanVien_QuanHeGiaDinh] FOREIGN KEY([IDQuanHeGD])
REFERENCES [dbo].[QuanHeGiaDinh] ([IDQuanHeGD])
GO
ALTER TABLE [dbo].[NhanVien] CHECK CONSTRAINT [FK_NhanVien_QuanHeGiaDinh]
GO
ALTER TABLE [dbo].[NhanVien]  WITH CHECK ADD  CONSTRAINT [FK_NhanVien_QuyetDinhBoNhiem] FOREIGN KEY([IDQuyetDinhBN])
REFERENCES [dbo].[QuyetDinhBoNhiem] ([IDQuyetDinhBN])
GO
ALTER TABLE [dbo].[NhanVien] CHECK CONSTRAINT [FK_NhanVien_QuyetDinhBoNhiem]
GO
ALTER TABLE [dbo].[NhanVien]  WITH CHECK ADD  CONSTRAINT [FK_NhanVien_TaiKhoan] FOREIGN KEY([username])
REFERENCES [dbo].[TaiKhoan] ([username])
GO
ALTER TABLE [dbo].[NhanVien] CHECK CONSTRAINT [FK_NhanVien_TaiKhoan]
GO
ALTER TABLE [dbo].[QuyetDinh]  WITH CHECK ADD  CONSTRAINT [FK_QuyetDinh_NhanVien1] FOREIGN KEY([IDNhanVien])
REFERENCES [dbo].[NhanVien] ([IDNhanVien])
GO
ALTER TABLE [dbo].[QuyetDinh] CHECK CONSTRAINT [FK_QuyetDinh_NhanVien1]
GO
ALTER TABLE [dbo].[QuyetDinhBoNhiem]  WITH CHECK ADD  CONSTRAINT [FK_QuyetDinhBoNhiem_UngVien] FOREIGN KEY([IDUngVien])
REFERENCES [dbo].[UngVien] ([IDUngVien])
GO
ALTER TABLE [dbo].[QuyetDinhBoNhiem] CHECK CONSTRAINT [FK_QuyetDinhBoNhiem_UngVien]
GO
ALTER TABLE [dbo].[QuyetDinhKL]  WITH CHECK ADD  CONSTRAINT [FK_QuyetDinhKL_NhanVien] FOREIGN KEY([IDNhanVien])
REFERENCES [dbo].[NhanVien] ([IDNhanVien])
GO
ALTER TABLE [dbo].[QuyetDinhKL] CHECK CONSTRAINT [FK_QuyetDinhKL_NhanVien]
GO
ALTER TABLE [dbo].[QuyetDinhKT]  WITH CHECK ADD  CONSTRAINT [FK_QuyetDinhKT_NhanVien] FOREIGN KEY([IDNhanVien])
REFERENCES [dbo].[NhanVien] ([IDNhanVien])
GO
ALTER TABLE [dbo].[QuyetDinhKT] CHECK CONSTRAINT [FK_QuyetDinhKT_NhanVien]
GO
ALTER TABLE [dbo].[TamUngLuong]  WITH CHECK ADD  CONSTRAINT [FK_TamUngLuong_NhanVien] FOREIGN KEY([IDNhanVien])
REFERENCES [dbo].[NhanVien] ([IDNhanVien])
GO
ALTER TABLE [dbo].[TamUngLuong] CHECK CONSTRAINT [FK_TamUngLuong_NhanVien]
GO
ALTER TABLE [dbo].[UngVien]  WITH CHECK ADD  CONSTRAINT [FK_UngVien_DanToc] FOREIGN KEY([IDDanToc])
REFERENCES [dbo].[DanToc] ([IDDanToc])
GO
ALTER TABLE [dbo].[UngVien] CHECK CONSTRAINT [FK_UngVien_DanToc]
GO
ALTER TABLE [dbo].[UngVien]  WITH CHECK ADD  CONSTRAINT [FK_UngVien_TrinhDoDaoTao] FOREIGN KEY([IDTrinhDo])
REFERENCES [dbo].[TrinhDoDaoTao] ([IDTrinhDo])
GO
ALTER TABLE [dbo].[UngVien] CHECK CONSTRAINT [FK_UngVien_TrinhDoDaoTao]
GO
