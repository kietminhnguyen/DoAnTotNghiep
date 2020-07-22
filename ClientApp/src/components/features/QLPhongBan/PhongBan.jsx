import React, { Component } from 'react';
import { FirebaseConn } from '../firebaseConnect';
import * as firebase from 'firebase';

export class PhongBan extends Component {
    static displayName = PhongBan.name;

    constructor(props) {
        super(props);
        this.state = {
            dataFirebase: [],
            MAPHONG: '',
            TENPHONG: '',
            THUOCPHONGBAN: '',
            TRUONGPHONG: '',
            SDT: '',
            MOTA: ''
        }
    }

    isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name);
        console.log(value);
        this.setState({
            [name]: value
        })

    }

    //---------show data
    componentDidMount() {
        const connectData = firebase.database().ref().child('PHONGBAN');
        connectData.on('value', snap => {
            this.setState({
                dataFirebase: Object.values(snap.val()),
            })
        });
    }

    mappingData = () => {
        const row = this.state.dataFirebase.map((value, index) => {
            return (
                <tr key={index}>
                    <th >{index + 1}</th>
                    <th >{value.MAPHONG}</th>
                    <th >{value.TENPHONG}</th>
                    <th >{value.THUOCPHONGBAN}</th>
                    <th >{value.TRUONGPHONG}</th>
                    <th >{value.SDT}</th>
                    <th >{value.MOTA}</th>
                    <th >
                        <button className="btn btn-danger" onClick={() => this.deleteData(value.MAPHONG)}>Xóa</button>
                        <button className="btn btn-warning" data-toggle="modal" data-target="#myModalsua" >Sửa</button>
                    </th>
                </tr>
            )
        });
        return row;
    }

    //------------Them data-----------------    
    addData = () => {
        firebase.database().ref('PHONGBAN/' + this.state.MAPHONG).set(
            {
                MAPHONG: this.state.MAPHONG,
                TENPHONG: this.state.TENPHONG,
                THUOCPHONGBAN: this.state.THUOCPHONGBAN,
                TRUONGPHONG: this.state.TRUONGPHONG,
                SDT: this.state.SDT,
                MOTA: this.state.MOTA
            }
        ).then(() => {
            alert("Thêm thành công");
            window.location.reload();
        }).catch((error) => {
            alert("Thêm thất bại");
        });
    }

    //-----------Xoa data---------------
    deleteData(key) {
        var connectData = firebase.database().ref('PHONGBAN/' + key);
        connectData.remove()
            .then(function () { })
            .catch(function (error) {
                alert("Remove failed: " + error.message)
            });
    }

    //------------Sua data-----------------    
    editData = () => {
        firebase.database().ref('PHONGBAN/' + this.state.MAPHONG).set(
            {
                MAPHONG: this.state.MAPHONG,
                TENPHONG: this.state.TENPHONG,
                THUOCPHONGBAN: this.state.THUOCPHONGBAN,
                TRUONGPHONG: this.state.TRUONGPHONG,
                SDT: this.state.SDT,
                MOTA: this.state.MOTA
            }
        ).then(() => {
            alert("Sửa thành công");
            window.location.reload();
        }).catch((error) => {
            alert("Sửa thất bại");
        });
    }


    render() {
        console.log(FirebaseConn);
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header"><h2>QUẢN LÝ PHÒNG BAN</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div class="col-sm">
                                        <input type="text" placeholder="Tìm kiếm"></input>
                                        <button class="btn btn-info">Tìm kiếm</button>
                                    </div>
                                    <div class="col-sm">
                                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">Thêm mới</button>
                                    </div>
                                    <div class="col-sm"></div>
                                </div>
                            </div>
                            <div className="card-body">
                                <table id="data_table" className="table" border="0">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th className="nosort">Mã Phòng Ban</th>
                                            <th>Tên Phòng Ban</th>
                                            <th>Thuộc Phòng Ban</th>
                                            <th>Trưởng Phòng</th>
                                            <th>Số Điện Thoại</th>
                                            <th>Mô Tả</th>
                                            <th className="nosort">Chức Năng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.mappingData()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Them Modal */}
                <div>
                    <div className="modal" id="myModal">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                {/* Modal Header */}
                                <div className="modal-header">
                                    <h4 className="modal-title">Thêm mới phòng ban</h4>
                                    <button type="button" className="close" data-dismiss="modal">×</button>
                                </div>
                                {/* Modal body */}
                                <div className="modal-body">
                                    <div class="container">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="card">
                                                    {/* <div className="card-header"><h3>Thêm mới/ chỉnh sữa phòng ban</h3></div> */}
                                                    <div className="card-body">
                                                        <form className="forms-sample">
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputMaPhongBan">Mã Phòng Ban</label>

                                                                <input value={this.state.MAPHONG} onChange={(event) => this.isChange(event)} name="MAPHONG" type="text" className="form-control" placeholder="Nhập mã phòng ban" />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputTenPhongBan">Tên Phòng Ban</label>
                                                                <input value={this.state.TENPHONG} onChange={(event) => this.isChange(event)} name="TENPHONG" type="text" className="form-control" placeholder="Nhập tên phòng ban" />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputThuocPhongBan">Thuộc Phòng Ban</label>
                                                                <input value={this.state.THUOCPHONGBAN} onChange={(event) => this.isChange(event)} name="THUOCPHONGBAN" type="text" className="form-control" placeholder="Thuộc Phòng Ban" />
                                                                {/* <div>
                                                                    <select name="thuoc cong ty" className="form-control">
                                                                        <option value="Phong kinh doanh">Phòng Kinh Doanh</option>
                                                                        <option value="Phong tai vụ">Phòng Tài Vụ</option>
                                                                        <option value="Phòng nhân sự">Phòng Nhân Sự</option>
                                                                    </select>
                                                                </div> */}
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputTruongPhong">Trưởng Phòng</label>
                                                                <input value={this.state.TRUONGPHONG} onChange={(event) => this.isChange(event)} name="TRUONGPHONG" type="text" className="form-control" placeholder="Nhập tên trưởng phòng" />
                                                                {/* <div>
                                                                    <select name="TruongPhong" className="form-control">
                                                                        <option value="NguyenVanA">Nguyễn Văn A</option>
                                                                        <option value="TranThiB">Trần Thị B</option>
                                                                        <option value="CaoVanC">Cao Văn C</option>
                                                                    </select>
                                                                </div> */}
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputSoDienThoaiPB">Số Điện Thoại Phòng Ban</label>
                                                                <input value={this.state.SDT} onChange={(event) => this.isChange(event)} name="SDT" type="tel" className="form-control" placeholder="Nhập số điện thoại" />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputMoTa">Mô Tả</label>
                                                                <textarea value={this.state.MOTA} onChange={(event) => this.isChange(event)} name="MOTA" className="form-control" placeholder="Nhập mô tả"></textarea>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                {/* Modal footer */}
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" onClick={this.addData} >Lưu</button>
                                    <button type="button" className="btn btn-danger" data-dismiss="modal">Đóng</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sua Modal */}

                    <div className="modal" id="myModalsua">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                {/* Modal Header */}
                                <div className="modal-header">
                                    <h4 className="modal-title">Chỉnh sữa phòng ban</h4>
                                    <button type="button" className="close" data-dismiss="modal">×</button>
                                </div>
                                {/* Modal body */}
                                <div className="modal-body">
                                    <div class="container">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="card">
                                                    {/* <div className="card-header"><h3>Thêm mới/ chỉnh sữa phòng ban</h3></div> */}
                                                    <div className="card-body">
                                                        <form className="forms-sample">
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputMaPhongBan">Mã Phòng Ban</label>

                                                                <input value={this.state.MAPHONG} onChange={(event) => this.isChange(event)} name="MAPHONG" type="text" className="form-control" placeholder="Nhập mã phòng ban" />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputTenPhongBan">Tên Phòng Ban</label>
                                                                <input value={this.state.TENPHONG} onChange={(event) => this.isChange(event)} name="TENPHONG" type="text" className="form-control" placeholder="Tên Phòng Ban" />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputThuocPhongBan">Thuộc Phòng Ban</label>
                                                                <input value={this.state.THUOCPHONGBAN} onChange={(event) => this.isChange(event)} name="THUOCPHONGBAN" type="text" className="form-control" placeholder="Thuộc Phòng Ban" />
                                                                {/* <div>
                                                                    <select name="thuoc cong ty" className="form-control">
                                                                        <option value="Phong kinh doanh">Phòng Kinh Doanh</option>
                                                                        <option value="Phong tai vụ">Phòng Tài Vụ</option>
                                                                        <option value="Phòng nhân sự">Phòng Nhân Sự</option>
                                                                    </select>
                                                                </div> */}
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputTruongPhong">Trưởng Phòng</label>
                                                                <input value={this.state.TRUONGPHONG} onChange={(event) => this.isChange(event)} name="TRUONGPHONG" type="text" className="form-control" placeholder="Tên Trường Phòng" />
                                                                {/* <div>
                                                                    <select name="TruongPhong" className="form-control">
                                                                        <option value="NguyenVanA">Nguyễn Văn A</option>
                                                                        <option value="TranThiB">Trần Thị B</option>
                                                                        <option value="CaoVanC">Cao Văn C</option>
                                                                    </select>
                                                                </div> */}
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputSoDienThoaiPB">Số Điện Thoại Phòng Ban</label>
                                                                <input value={this.state.SDT} onChange={(event) => this.isChange(event)} name="SDT" type="tel" className="form-control" placeholder="Số Điện Thoại Phòng Ban" />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputMoTa">Mô Tả</label>
                                                                <textarea value={this.state.MOTA} onChange={(event) => this.isChange(event)} name="MOTA" className="form-control" placeholder="Mô tả"></textarea>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                {/* Modal footer */}
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" onClick={this.editData} >Lưu</button>
                                    <button type="button" className="btn btn-danger" data-dismiss="modal">Đóng</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        );
    }

}