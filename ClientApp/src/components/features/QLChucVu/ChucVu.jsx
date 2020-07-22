import React, { Component } from 'react';
import { FirebaseConn } from '../firebaseConnect';
import * as firebase from 'firebase';
//import {connect} from 'react-redux';

export class ChucVu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataFirebase: [],
            MACV: '',
            TENCV: '',
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

    //------------show data------------------
    // componentWillMount() {
    //     var connectData = firebase.database().ref('CHUCVU');
    //     connectData.on('value', (cv) => {
    //         var arrayData = [];
    //         cv.forEach(element => {
    //             const key = element.key;
    //             const MACV = element.val().MACV;
    //             const TENCV = element.val().TENCV;
    //             const MOTA = element.val().MOTA;
    //             arrayData.push({
    //                 id: key,
    //                 MACV: MACV,
    //                 TENCV: TENCV,
    //                 MOTA: MOTA
    //             })
    //         });
    //         this.setState({
    //             dataFirebase: arrayData
    //         });
    //     })
    // }

    // getData = () => {
    //     if (this.state.dataFirebase) {
    //         return this.state.dataFirebase.map((value, key) => {
    //             return (
    //                 <ChucVu
    //                     key={key}
    //                     MACV={value.MACV}
    //                     TENCV={value.TENCV}
    //                     MOTA={value.MOTA}
    //                 />
    //             )
    //         })
    //     }
    // }
    componentDidMount() {
        const connectData = firebase.database().ref().child('CHUCVU');
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
                    <th >{value.MACV}</th>
                    <th >{value.TENCV}</th>
                    <th >{value.MOTA}</th>
                    <th >
                        {/* <i className="ik ik-edit-2" data-toggle="modal" data-target="#Modalsua"/>
                    <i className="ik ik-trash-2" onClick={() => this.deleteData(value.MACV)} /> */}
                        <button className="btn btn-danger" onClick={() => this.deleteData(value.MACV)}>Xóa</button>
                        <button className="btn btn-warning" data-toggle="modal" data-target="#Modalsua" >Sửa</button>
                    </th>
                </tr>
            )
        });
        return row;
    }

    //------------Them data-----------------    
    //c1
    // addData = (maCV, tenCV, mota) => {
    //     var connectData = firebase.database().ref('CHUCVU');
    //     var item = {};
    //     item.MACV = maCV;
    //     item.TENCV = tenCV;
    //     item.MOTA = mota;
    //     console.log(item);
    //     connectData.push(item);
    //     alert("Thêm thành công");  
    // }

    //c2
    addData = () => {
        firebase.database().ref('CHUCVU/' + this.state.MACV).set(
            {
                MACV: this.state.MACV,
                TENCV: this.state.TENCV,
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
        var connectData = firebase.database().ref('CHUCVU/' + key);
        connectData.remove()
            .then(function () { })
            .catch(function (error) {
                alert("Remove failed: " + error.message)
            });
    }

    //---------Sua data ---------

    EditData = () => {

        firebase.database().ref('CHUCVU/' + this.state.MACV).set(
            {
                MACV: this.state.MACV,
                TENCV: this.state.TENCV,
                MOTA: this.state.MOTA
            }
        ).then(() => {
            alert("Sửa thành công");
            window.location.reload();
        }).catch((error) => {
            alert("Sửa thất bại");
        });
    }

    //====================================
    render() {
        console.log(FirebaseConn);
        return (
            <div>

                {/*test lay data {this.getData()} */}

                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header"><h2>QUẢN LÝ CHỨC VỤ</h2></div>

                            <div className="card-body">
                                <div className="row">
                                    <div class="col-sm">
                                        <input type="text" placeholder="Tìm kiếm"></input>
                                        <button class="btn btn-info">Tìm kiếm</button>
                                    </div>
                                    <div class="col-sm">                                    
                                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#Modal">Thêm mới</button>
                                    </div>
                                    <div class="col-sm"></div>

                                    {/* <div className="col-md-12">
                                        <input type="text" placeholder="Tìm kiếm"></input>
                                        <button class="btn btn-info">Tìm kiếm</button>
                                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#Modal">Thêm</button>
                                    </div> */}
                                </div>

                                {/* <button type="button" class="btn btn-info" data-toggle="modal" data-target="#Modal">Thêm</button> */}

                            </div>

                            <div className="card-body">
                                <table id="data_table" className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Mã chức vụ</th>
                                            <th>Tên chức vụ</th>
                                            <th>Mô tả</th>
                                            <th>Chức năng</th>
                                            <th className="nosort">&nbsp;</th>
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

                {/* --------- Modal them -------- */}
                <div class="modal fade" id="Modal" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">

                        <div class="modal-content">
                            <div class="modal-header">
                                <div>
                                    <ul class="list-group">
                                        <li class="list-group-item active">
                                            Thêm mới chức vụ
                            </li>
                                    </ul>
                                </div>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div class="modal-body">

                                <div class="container">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="card">
                                                <div className="card-body">
                                                    <form className="forms-sample">
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputMaPhongBan">Mã chức vụ</label>
                                                            {/* <input onChange={(event) => this.isChange(event)} type="text" name="MACV" id="qlnsMaCV" className="form-control" placeholder="Nhập mã chức vụ" /> */}
                                                            <input value={this.state.MACV} onChange={(event) => this.isChange(event)} type="text" name="MACV" id="qlnsMaCV" className="form-control" placeholder="Nhập mã chức vụ" />
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputTenPhongBan">Tên chức vụ</label>
                                                            {/* <input onChange={(event) => this.isChange(event)} type="text" name="TENCV" id="qlnsTenCV" className="form-control" placeholder="Nhập tên chức vụ" /> */}
                                                            <input value={this.state.TENCV} onChange={(event) => this.isChange(event)} type="text" name="TENCV" id="qlnsMaCV" className="form-control" placeholder="Nhập mã chức vụ" />
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputMoTa">Mô Tả</label>
                                                            {/* <textarea onChange={(event) => this.isChange(event)} type="text" name="MOTA" id="qlnsMota" className="form-control" placeholder="Mô tả"></textarea> */}
                                                            <textarea value={this.state.MOTA} onChange={(event) => this.isChange(event)} type="text" name="MOTA" id="qlnsMota" className="form-control" placeholder="Mô tả"></textarea>
                                                        </div>
                                                        {/* <button type="reset" onClick={() => this.addData(this.state.MACV, this.state.TENCV, this.state.MOTA)} class="btn btn-primary">Lưu</button> */}
                                                        <button type="button" onClick={this.addData} class="btn btn-primary">Lưu</button>
                                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* --------- Modal sua -------- */}
                <div class="modal fade" id="Modalsua" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">

                        <div class="modal-content">
                            <div class="modal-header">
                                <div>
                                    <ul class="list-group">
                                        <li class="list-group-item active">
                                            Chỉnh sửa chức vụ
                                        </li>
                                    </ul>
                                </div>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div class="modal-body">

                                <div class="container">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="card">
                                                <div className="card-body">
                                                    <form className="forms-sample">
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputMaPhongBan">Mã chức vụ</label>
                                                            {/* <input onChange={(event) => this.isChange(event)} type="text" name="MACV" id="qlnsMaCV" className="form-control" placeholder="Nhập mã chức vụ" /> */}
                                                            <input onChange={(event) => this.isChange(event)} type="text" name="MACV" id="qlnsMaCV" className="form-control" placeholder="Nhập mã chức vụ" />
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputTenPhongBan">Tên chức vụ</label>
                                                            {/* <input onChange={(event) => this.isChange(event)} type="text" name="TENCV" id="qlnsTenCV" className="form-control" placeholder="Nhập tên chức vụ" /> */}
                                                            <input value={this.state.TENCV} onChange={(event) => this.isChange(event)} type="text" name="TENCV" id="qlnsMaCV" className="form-control" placeholder="Nhập mã chức vụ" />
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputMoTa">Mô Tả</label>
                                                            {/* <textarea onChange={(event) => this.isChange(event)} type="text" name="MOTA" id="qlnsMota" className="form-control" placeholder="Mô tả"></textarea> */}
                                                            <textarea value={this.state.MOTA} onChange={(event) => this.isChange(event)} type="text" name="MOTA" id="qlnsMota" className="form-control" placeholder="Mô tả"></textarea>
                                                        </div>
                                                        {/* <button type="reset" onClick={() => this.addData(this.state.MACV, this.state.TENCV, this.state.MOTA)} class="btn btn-primary">Lưu</button> */}
                                                        <button type="button" onClick={() => this.EditData()} class="btn btn-primary">Sửa</button>
                                                        <button type="reset" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

// //dùng thuộc tính gì trong store thì dùng hàm này truyền vào
// const mapStateToProps = (state, ownProps) => {
//     return {
//         testThoi: state.testConnect
//     }
// }
// //Dùng Reducer nào trong store thì dùng hàm này
// const mapDispatchToProps = (dispatch, ownProps) => {
//     return {
//         addDataStore: () => {
//             dispatch({type:"ADD_DATA"})
//         }
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ChucVu);

//export default ChucVu;