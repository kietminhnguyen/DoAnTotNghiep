import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import NavMenu from './NavMenu';
import { Home } from '../features/Home';

// import  {ChucVu}  from '../features/QLChucVu/ChucVu';
//import { User } from "../features/danhmuc/NguoiDung/AppHDChinhThuc";
//import AppChucVu from '../features/QLChucVu/AppChucVu';
import { AppPhongBan } from '../features/danhmuc/PhongBan/AppPhongBan'
import { AppChucVu } from '../features/danhmuc/chucvu/AppChucVu'
import { AppNguoiDung } from '../features/danhmuc/NguoiDung/AppNguoiDung'

import { AppTuyenThang } from '../features/NhanVien/TuyenThang/AppTuyenThang'
import { AppNhanVien } from '../features/NhanVien/NV/AppNhanVien'
import { AppUngVien } from '../features/NhanVien/UngVien/AppUngVien'
import { AppBoNhiem } from '../features/NhanVien/BoNhiem/AppBoNhiem'

import { AppHDThuViec } from '../features/HopDong/KyThuViec/AppHDThuViec'
import { AppHDChinhThuc } from '../features/HopDong/KyChinhThuc/AppHDChinhThuc'
import { AppGiaiHanHD } from '../features/HopDong/GiaiHanHD/AppGiaiHanHD'
import { AppXemHDThuViec } from '../features/HopDong/XemHDThuViec/AppXemHDThuViec'
import { AppXemHDChinhThuc } from '../features/HopDong/XemHDChinhThuc/AppXemHDChinhThuc'

import { AppThoiViec } from '../features/QuyetDinh/ThoiViec/AppThoiViec'
import { AppLapQuyetDinh } from '../features/QuyetDinh/LapQuyetDinh/AppLapQuyetDinh'
import { AppQuyetDinhKiLuat } from '../features/QuyetDinh/KiLuat/AppQuyetDinhKiLuat'
import { AppQuyetDinhKhenThuong } from '../features/QuyetDinh/KhenThuong/AppQuyetDinhKhenThuong'
import { AppXemQDBN } from '../features/QuyetDinh/XemQDBN/AppXemQDBN'


import { AppBangChamCong } from '../features/ChamCong/BangChamCong/AppBangChamCong'
import { AppChamCongMaVach } from '../features/ChamCong/ChamCongMaVach/AppChamCongMaVach'
import { AppChamCongThuCong } from '../features/ChamCong/ChamCongThuCong/AppChamCongThuCong'
import { AppDoDuLieu } from '../features/ChamCong/DoDuLieu/AppDoDuLieu'

import { AppTamUng } from '../features/TinhLuong/TamUng/AppTamUng'
import { AppLuongThang } from '../features/TinhLuong/LuongThang/AppLuongThang'
import { AppTraCuuLuong } from '../features/TinhLuong/TraCuuLuong/AppTraCuuLuong'
import { AppTraCuuTamUng } from '../features/TinhLuong/TraCuuTamUng/AppTraCuuTamUng'

export class Layout extends Component {


  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let isLogin = true;
    if (token == null) {
      isLogin = false;
    }

    this.state = { isLogin }
  }


  render() {

    if (!this.state.isLogin) {
      return <Redirect to="/login" />
    }
    return (
      <div>
        <NavMenu>
          < Route path='/home' component={Home} />
          < Route path='/phongban' component={AppPhongBan} />
          < Route path='/chucvu' component={AppChucVu} />
          < Route path='/nguoidung' component={AppNguoiDung} />

          < Route path='/nhanvien' component={AppNhanVien} />
          < Route path='/tuyenthang' component={AppTuyenThang} />
          < Route path='/bonhiem' component={AppBoNhiem} />
          < Route path='/ungvien' component={AppUngVien} />

          < Route path='/hdthuviec' component={AppHDThuViec} />
          < Route path='/hdchinhthuc' component={AppHDChinhThuc} />
          < Route path='/giaihanhd' component={AppGiaiHanHD} />
          < Route path='/xemhdthuviec' component={AppXemHDThuViec} />
          < Route path='/xemhdchinhthuc' component={AppXemHDChinhThuc} />

          < Route path='/thoiviec' component={AppThoiViec} />
          < Route path='/lapquyetdinh' component={AppLapQuyetDinh} />
          < Route path='/quyetdinhkiluat' component={AppQuyetDinhKiLuat} />
          < Route path='/quyetdinhkhenthuong' component={AppQuyetDinhKhenThuong} />
          < Route path='/xemqdbn' component={AppXemQDBN} />
          

          < Route path='/bangchamcong' component={AppBangChamCong} />
          < Route path='/chamcongmavach' component={AppChamCongMaVach} />
          < Route path='/chamcongbosung' component={AppChamCongThuCong} />
          < Route path='/dodulieu' component={AppDoDuLieu} />
          
          < Route path='/tamungluong' component={AppTamUng} />
          < Route path='/luongthang' component={AppLuongThang} />
          < Route path='/tracuuluong' component={AppTraCuuLuong} />
          < Route path='/tracuutamung' component={AppTraCuuTamUng} />
          
        </NavMenu>


      </div>
    );
  }
}

export default Layout;