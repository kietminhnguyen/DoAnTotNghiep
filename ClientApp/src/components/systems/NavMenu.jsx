import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';

class NavMenu extends Component {
  //static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.state = {
      isLogin: true,
      taikhoans: [],
      tkToken: []
    }

    this.logOut = this.logOut.bind(this);

  }

  componentDidMount() {
    fetch('https://localhost:44390/api/taikhoans')
      .then(response => response.json())
      .then(data => {
        this.setState({ taikhoans: data });
      });
  }

  componentWillMount() {
    if (localStorage && localStorage.getItem('token')) {
      var tkToken = JSON.parse(localStorage.getItem('token'))
      this.setState({
        tkToken: tkToken
      })
    }
  }

  layTk = () => {
    var tk = ''
    for (let i = 0; i < this.state.taikhoans.length; i++) {
      for (let j = 0; j < this.state.tkToken.length; j++) {
        if (this.state.taikhoans[i].username == this.state.tkToken[j].username) {
          tk = this.state.tkToken[j].username
        }
      }
    }
    return tk
  }

  logOut() {
    localStorage.removeItem("token");
    this.setState({
      isLogin: false
    })
  }

  checkTK = () => {
    var tk = ''
    //for (let i = 0; i < this.state.taikhoans.length; i++) {
    for (let j = 0; j < this.state.tkToken.length; j++) {
      if (this.state.tkToken[j].username === "test") {
        return (
          <nav id="main-menu-navigation" className="navigation-main">
            {/* <div className="nav-lavel">Trang chủ</div> */}
            <div className="nav-item">
              <Link to="/home" className="menu-item">Trang chủ</Link>
            </div>
            <div className="nav-item has-sub">
              <a><i className="ik ik-list" /><span>Danh mục</span></a>
              <div className="submenu-content">
                <Link to="/nguoidung" className="menu-item">Người dùng</Link>
                <Link to="/quanlynguoidung" className="menu-item">Quản lý người dùng</Link>
                <Link to="/phanquyen" className="menu-item">Phân quyền</Link>
                <Link to="/phongban" className="menu-item">Phòng ban</Link>
                <Link to="/chucvu" className="menu-item">Chức vụ</Link>
              </div>
            </div>

            <div className="nav-item has-sub">
              <a ><i className="ik ik-list" /><span>Nhân viên</span></a>
              <div className="submenu-content">
                <Link to="/nhanvien" className="menu-item">Hồ sơ nhân viên</Link>
                <Link to="/tuyenthang" className="menu-item">Tuyển thẳng</Link>
                <Link to="/bonhiem" className="menu-item">Bổ nhiệm nhân sự</Link>
                <Link to="/ungvien" className="menu-item">Quản lý ứng viên</Link>
              </div>
            </div>

            <div className="nav-item has-sub">
              <a><i className="ik ik-slash" /><span>Hợp đồng</span></a>
              <div className="submenu-content">
                <Link to="/xemhdchinhthuc" className="menu-item">Xem hợp đồng chính thức</Link>
                <Link to="/hdchinhthuc" className="menu-item">Ký hợp đồng chính thức</Link>
                <Link to="/xemhdthuviec" className="menu-item">Xem hợp đồng thử việc</Link>
                <Link to="/hdthuviec" className="menu-item">Ký hợp đồng thử việc</Link>
                <Link to="/giaihanhd" className="menu-item">Giai hạn hợp đồng</Link>
                <Link to="/thoiviec" className="menu-item">Thôi việc</Link>
              </div>
            </div>

            <div className="nav-item has-sub">
              <a><i className="ik ik-award" /><span>Quyết định</span></a>
              <div className="submenu-content">

                <Link to="/lapquyetdinh" className="menu-item">Lập quyết định</Link>
                <Link to="/quyetdinhkhenthuong" className="menu-item">Xem QD khen thưởng</Link>
                <Link to="/quyetdinhkiluat" className="menu-item">Xem QD kỷ luật</Link>
                <Link to="/xemqdbn" className="menu-item">Xem QD bổ nhiệm</Link>

              </div>
            </div>

            <div className="nav-item has-sub">
              <a><i className="ik ik-list" /><span>Chấm công</span></a>
              <div className="submenu-content">
                <Link to="/bangchamcong" className="menu-item">Tra cứu ngày công</Link>
                <Link to="/chamcongmavach" className="menu-item">Chấm công mã vạch</Link>
                <Link to="/chamcongbosung" className="menu-item">Chấm công bổ sung</Link>
                <Link to="/dodulieu" className="menu-item">Đỗ dữ liệu chấm công</Link>
              </div>
            </div>

            <div className="nav-item has-sub">
              <a><i className="ik ik-list" /><span>Tính lương</span></a>
              <div className="submenu-content">
                <Link to="/tamungluong" className="menu-item">Tạm ứng lương</Link>
                <Link to="/luongthang" className="menu-item">Tính lương tháng</Link>
                <Link to="/tracuuluong" className="menu-item">Tra cứu lương</Link>
                <Link to="/tracuutamung" className="menu-item">Tra cứu tạm ứng</Link>
              </div>
            </div>
          </nav>
        )
      }
      else {
        if (this.state.tkToken[j].username === "admin") {
          return (
            <nav id="main-menu-navigation" className="navigation-main">
              {/* <div className="nav-lavel">Trang chủ</div> */}
              <div className="nav-item">
                <Link to="/home" className="menu-item">Trang chủ</Link>
              </div>
              <div className="nav-item has-sub">
                <a><i className="ik ik-list" /><span>Danh mục</span></a>
                <div className="submenu-content">
                  <Link to="/nguoidung" className="menu-item">Người dùng</Link>
                  <Link to="/quanlynguoidung" className="menu-item">Quản lý người dùng</Link>
                  <Link to="/phanquyen" className="menu-item">Phân quyền</Link>
                  <Link to="/phongban" className="menu-item">Phòng ban</Link>
                  <Link to="/chucvu" className="menu-item">Chức vụ</Link>
                </div>
              </div>
            </nav>
          )
        }
        else {
          if (this.state.tkToken[j].username === "adminNS") {
            return (
              <nav id="main-menu-navigation" className="navigation-main">
                {/* <div className="nav-lavel">Trang chủ</div> */}
                <div className="nav-item">
                  <Link to="/home" className="menu-item">Trang chủ</Link>
                </div>
                <div className="nav-item has-sub">
                  <a><i className="ik ik-list" /><span>Danh mục</span></a>
                  <div className="submenu-content">
                    <Link to="/nguoidung" className="menu-item">Người dùng</Link>
                    {/* <Link to="/phongban" className="menu-item">Phòng ban</Link>
                <Link to="/chucvu" className="menu-item">Chức vụ</Link> */}
                  </div>
                </div>

                <div className="nav-item has-sub">
                  <a ><i className="ik ik-list" /><span>Nhân viên</span></a>
                  <div className="submenu-content">
                    <Link to="/nhanvien" className="menu-item">Hồ sơ nhân viên</Link>
                    <Link to="/tuyenthang" className="menu-item">Tuyển thẳng</Link>
                    <Link to="/bonhiem" className="menu-item">Bổ nhiệm nhân sự</Link>
                    <Link to="/ungvien" className="menu-item">Quản lý ứng viên</Link>
                  </div>
                </div>

                <div className="nav-item has-sub">
                  <a><i className="ik ik-slash" /><span>Hợp đồng</span></a>
                  <div className="submenu-content">
                    <Link to="/xemhdchinhthuc" className="menu-item">Xem hợp đồng chính thức</Link>
                    <Link to="/hdchinhthuc" className="menu-item">Ký hợp đồng chính thức</Link>
                    <Link to="/xemhdthuviec" className="menu-item">Xem hợp đồng thử việc</Link>
                    <Link to="/hdthuviec" className="menu-item">Ký hợp đồng thử việc</Link>
                    <Link to="/giaihanhd" className="menu-item">Giai hạn hợp đồng</Link>
                    <Link to="/thoiviec" className="menu-item">Thôi việc</Link>
                  </div>
                </div>

              </nav>
            )
          }
          else {
            if (this.state.tkToken[j].username === "adminTC") {
              return (
                <nav id="main-menu-navigation" className="navigation-main">
                  {/* <div className="nav-lavel">Trang chủ</div> */}
                  <div className="nav-item">
                    <Link to="/home" className="menu-item">Trang chủ</Link>
                  </div>
                  <div className="nav-item has-sub">
                    <a><i className="ik ik-list" /><span>Danh mục</span></a>
                    <div className="submenu-content">
                      <Link to="/nguoidung" className="menu-item">Người dùng</Link>
                      {/* <Link to="/phongban" className="menu-item">Phòng ban</Link>
                    <Link to="/chucvu" className="menu-item">Chức vụ</Link> */}
                    </div>
                  </div>

                  <div className="nav-item has-sub">
                    <a><i className="ik ik-award" /><span>Quyết định</span></a>
                    <div className="submenu-content">

                      <Link to="/lapquyetdinh" className="menu-item">Lập quyết định</Link>
                      <Link to="/quyetdinhkhenthuong" className="menu-item">Xem QD khen thưởng</Link>
                      <Link to="/quyetdinhkiluat" className="menu-item">Xem QD kỷ luật</Link>
                      <Link to="/xemqdbn" className="menu-item">Xem QD bổ nhiệm</Link>

                    </div>
                  </div>

                  <div className="nav-item has-sub">
                    <a><i className="ik ik-list" /><span>Chấm công</span></a>
                    <div className="submenu-content">
                      <Link to="/bangchamcong" className="menu-item">Tra cứu ngày công</Link>
                      <Link to="/chamcongmavach" className="menu-item">Chấm công mã vạch</Link>
                      <Link to="/chamcongbosung" className="menu-item">Chấm công bổ sung</Link>
                      <Link to="/dodulieu" className="menu-item">Đỗ dữ liệu chấm công</Link>
                    </div>
                  </div>

                  <div className="nav-item has-sub">
                    <a><i className="ik ik-list" /><span>Tính lương</span></a>
                    <div className="submenu-content">
                      <Link to="/tamungluong" className="menu-item">Tạm ứng lương</Link>
                      <Link to="/luongthang" className="menu-item">Tính lương tháng</Link>
                      <Link to="/tracuuluong" className="menu-item">Tra cứu lương</Link>
                      <Link to="/tracuutamung" className="menu-item">Tra cứu tạm ứng</Link>
                    </div>
                  </div>
                </nav>
              )
            }
            else {
              return (
                <nav id="main-menu-navigation" className="navigation-main">
                  {/* <div className="nav-lavel">Trang chủ</div> */}
                  <div className="nav-item">
                    <Link to="/home" className="menu-item">Trang chủ</Link>
                  </div>
                  <div className="nav-item has-sub">
                    <a><i className="ik ik-list" /><span>Danh mục</span></a>
                    <div className="submenu-content">
                      <Link to="/nguoidung" className="menu-item">Người dùng</Link>
                      {/* <Link to="/phongban" className="menu-item">Phòng ban</Link>
                <Link to="/chucvu" className="menu-item">Chức vụ</Link> */}
                    </div>
                  </div>

                  <div className="nav-item has-sub">
                    <a><i className="ik ik-list" /><span>Chấm công</span></a>
                    <div className="submenu-content">
                      <Link to="/bangchamcongNV" className="menu-item">Tra cứu ngày công</Link>
                      {/* <Link to="/chamcongmavach" className="menu-item">Chấm công mã vạch</Link>
                <Link to="/chamcongbosung" className="menu-item">Chấm công bổ sung</Link>
                <Link to="/dodulieu" className="menu-item">Đỗ dữ liệu chấm công</Link> */}
                    </div>
                  </div>

                  <div className="nav-item has-sub">
                    <a><i className="ik ik-list" /><span>Tính lương</span></a>
                    <div className="submenu-content">
                      {/* <Link to="/tamungluong" className="menu-item">Tạm ứng lương</Link>
                <Link to="/luongthang" className="menu-item">Tính lương tháng</Link> */}
                      <Link to="/tracuuluongNV" className="menu-item">Tra cứu lương</Link>
                      <Link to="/tracuutamungNV" className="menu-item">Tra cứu tạm ứng</Link>
                    </div>
                  </div>
                </nav>
              )
            }
          }
        }
      
      }
    }
    //}
    return tk
  }

  render() {
    if (!this.state.isLogin) {
      return <Redirect to="/login" />
    }
    return (
      <div className="wrapper">
        <header className="header-top" header-theme="blue">
          <div className="container-fluid">
            <div className="d-flex justify-content-between">
              <div className="top-menu d-flex align-items-center">
                <button type="button" className="btn-icon mobile-nav-toggle d-lg-none"><span /></button>
              </div>
              <div className="top-menu d-flex align-items-center">

                <div className="dropdown">
                  <a className="dropdown-toggle" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img className="avatar" src="assets/images/user.png" />{this.layTk()}</a>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                    <Link className="dropdown-item" to="/nguoidung">
                      <i className="ik ik-user dropdown-icon" />Thông tin</Link>

                    <a className="dropdown-item"
                      onClick={this.logOut} ><i className="ik ik-power dropdown-icon" /> Đăng xuất</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="page-wrap">
          <div className="app-sidebar colored">
            <div className="sidebar-header">
              <a className="header-brand" href="index.html">
                <div className="logo-img">
                  <img src="assets/images/brand-white.svg" className="header-brand-img" alt="lavalite" />
                </div>
                <span className="text">HRMO</span>
              </a>
              <button type="button" className="nav-toggle"><i data-toggle="expanded" className="ik ik-toggle-right toggle-icon" /></button>
              <button id="sidebarClose" className="nav-close"><i className="ik ik-x" /></button>
            </div>
            <div className="sidebar-content">
              <div className="nav-container">
                {/*=============================================================================================================== */}
                {this.checkTK()}
                {/*=================================================================================================================*/}
              </div>
            </div>
          </div>
          <div className="main-content">
            <div className="container-fluid">
              <Container>
                {this.props.children}
              </Container>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NavMenu;