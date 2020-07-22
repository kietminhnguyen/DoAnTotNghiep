import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddChucVuModal } from './AddChucVuModal';
import { EditChucVuModal } from './EditChucVuModal';

export class AppChucVu extends Component {
    //static displayName = AppPhongBan.name;


    constructor(props) {
        super(props);
        this.state = {
            chucvus: [],
            nhanviens: [],
            addModalShow: false,
            editModalShow: false
        }
    }

    componentDidMount() {
        this.refreshLish();
    }

    refreshLish() {
        fetch('https://localhost:44390/api/chucvus')
            .then(response => response.json())
            .then(data => {
                this.setState({ chucvus: data });
            });
    }

    componentDidUpdate() {
        this.refreshLish();
    }


    xoaChucVu(idcv) {
        // let co = false
        // for (let i = 0; i < this.state.nhanviens.length; i++) {
        //     if (parseInt(phongban.idphongBan) == parseInt(this.state.nhanviens[j].idphongBan)) {
        //         co = true
        //     }
        // }
        // if (co == true) {
        //     alert('Không thể xóa vì còn nhân viên trong phòng ban này')
        // }
        // else {
            if (window.confirm('Are your sure!')) {
                fetch('https://localhost:44390/api/chucvus/' + idcv, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })

            }
        // }
        
    }

    render() {

        const { chucvus, cvid, cvten, cvmota } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return (
            <div>
                <div className="container text-center">
                    <h1 className="display-7">QUẢN LÝ CHỨC VỤ</h1><hr />
                </div>

                <ButtonToolbar>
                    <Button variant="primary" onClick={() => this.setState({ addModalShow: true })}
                    >Thêm Mới</Button>
                </ButtonToolbar>
                
                <Table className="mt-4">
                    <thead className="">
                        <tr>
                            <th>#</th>
                            <th>Tên chức vụ</th>
                            <th>Mô tả</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chucvus.map((cv, key) =>
                            <tr key={cv.idchucVu}>
                                <td>{key + 1}</td>
                                <td>{cv.tenChucVu}</td>
                                <td>{cv.moTa}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="warning"
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                cvid: cv.idchucVu,
                                                cvten: cv.tenChucVu,
                                                cvmota: cv.moTa,
                                            })}
                                        ><i className="ik ik-edit-2" />
                                            Sửa </Button>
                                        <Button className="mr-2" variant="danger"
                                            onClick={() => this.xoaChucVu(cv.idchucVu)}
                                        ><i className="ik ik-trash-2" />
                                            Xóa</Button>                         

                                        <EditChucVuModal
                                            show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            cvid={cvid}
                                            cvten={cvten}
                                            cvmota={cvmota}
                                        />
                                    </ButtonToolbar>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <AddChucVuModal
                        show={this.state.addModalShow}
                        onHide={addModalClose}
                    />
                </ButtonToolbar>
            </div>
        )
    }
}
