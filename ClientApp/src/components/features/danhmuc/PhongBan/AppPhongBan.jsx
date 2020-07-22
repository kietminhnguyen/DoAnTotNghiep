import React, { Component } from 'react';
import { Button, ButtonToolbar, Col, Form, Row, Table } from 'react-bootstrap';
import { AddPhongbanModal } from './AddPhongbanModal';
import { EditPhongbanModal } from './EditPhongbanModal';

export class AppPhongBan extends Component {
    //static displayName = AppPhongBan.name;


    constructor(props) {
        super(props);
        this.state = {
            phongbans: [],
            nhanviens: [],
            addModalShow: false,
            editModalShow: false
        }
   }

    componentDidMount() {
        this.refreshLish();
    }

    refreshLish() {
        fetch('https://localhost:44390/api/phongbans')
            .then(response => response.json())
            .then(data => {
                this.setState({ phongbans: data });
            });
    }
    refreshLishNV() {
        fetch('https://localhost:44390/api/nhanviens')
            .then(response => response.json())
            .then(data => {
                this.setState({ nhanviens: data });
            });
    }

    componentDidUpdate() {
        this.refreshLish();
    }


    deletePhongBan(idpb) {
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
            fetch('https://localhost:44390/api/phongbans/' + idpb, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })

        }
        // }
        //////////////////

    }

    render() {

        const { phongbans, pbid, pbname, pbtruong, pbmota } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return (
            <div>
                <div className="container text-center">
                    <h1 className="display-7">QUẢN LÝ PHÒNG BAN</h1><hr />
                </div>

                <ButtonToolbar>
                    <Button variant="primary" onClick={() => this.setState({ addModalShow: true })}
                    >Thêm Mới</Button>
                </ButtonToolbar>

                <Table className="mt-4">
                    <thead className="">
                        <tr>
                            <th>#</th>
                            <th>Tên Phòng Ban</th>
                            <th>Trưởng phòng</th>
                            <th>Mô tả</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {phongbans.map((phongban, key) =>
                            <tr key={phongban.idphongBan}>
                                <td>{key + 1}</td>
                                <td>{phongban.tenPhongBan}</td>
                                <td>{phongban.tenTruongPhong}</td>
                                <td>{phongban.moTa}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="warning"
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                pbid: phongban.idphongBan,
                                                pbname: phongban.tenPhongBan,
                                                pbtruong: phongban.tenTruongPhong,
                                                pbmota: phongban.moTa
                                            })}
                                        ><i className="ik ik-edit-2" />
                                            Sửa </Button>
                                        <Button className="mr-2" variant="danger"
                                            onClick={() => this.deletePhongBan(phongban.idphongBan)}
                                        ><i className="ik ik-trash-2" />
                                            Xóa</Button>



                                        <EditPhongbanModal
                                            show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            pbid={pbid}
                                            pbname={pbname}
                                            pbtruong={pbtruong}
                                            pbmota={pbmota}
                                        />
                                    </ButtonToolbar>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <AddPhongbanModal
                        show={this.state.addModalShow}
                        onHide={addModalClose}
                    />
                </ButtonToolbar>
            </div>
        )
    }
}
