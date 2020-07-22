import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { format, compareAsc, addMonths } from 'date-fns'
import axios from 'axios';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class EditLuongThangModal extends Component {
    //static displayName = AddPhongbanModal.name;

    constructor(props) {
        super(props);

        this.state = {
            HopdongBD: 'yyyy-MM-dd',
            snackbaropen: false,
            snackbarmsg: ''
        };
        this.handleSubmitPUT = this.handleSubmitPUT.bind(this)
        //this.handleChange = this.handleChange.bind(this)
    }
    SnackbarClose = (event) => {
        this.setState({ snackbaropen: false });
    };

    handleSubmitPUT(event) {
        event.preventDefault();

        axios.put('https://localhost:44390/api/bangluongs/' + this.props.idbangLuong, {
            idbangLuong: this.props.idbangLuong,
            idnhanVien: this.props.idnhanVien,
            thang: this.props.thang,
            nam: this.props.nam,
            mucLuong: this.props.mucLuong,
            tienThuong: this.props.tienThuong,
            //tienThuongLe: this.props.tienThuongLe,
            tienPhatDiTre: this.props.tienPhatDiTre,
            //tienNgayNghi: this.props.tienNgayNghi,
            tongThuNhap: this.props.tongThuNhap,
            tienPhat: this.props.tienPhat,
            tongGioTangCa: this.props.tongGioTangCa,
            tienTangCa: this.props.tienTangCa,
            tienTamUng: this.props.tienTamUng,
            phuCapKhac: this.props.phuCapKhac,
            truBh: this.props.truBh,
            soNgayCong: this.props.soNgayCong,
            soNgayDiTre: this.props.soNgayDiTre,
            soNgayDiTreKhongTinhLuong: this.props.soNgayDiTreKhongTinhLuong,
            soNgayNghi: this.props.soNgayNghi,
            ghiChu: event.target.TinhluongTienPHUCLOI.value,
            heSoChucVu: this.props.heSoChucVu,
            heSoChuyenMon: this.props.heSoChuyenMon,
            trangThai: this.props.trangThai,
            soLuongChiuThue: this.props.soLuongChiuThue,
            thueTncn: this.props.thueTncn,
            tienThucLinh: this.props.tienThucLinh

        })
            .then((data) => {
                //console.log(data)
                alert("Thành công")
            })
            .catch((err) => {
                //console.log(err)
                alert("Không thành công")
            })
    }

    render() {
        return (
            <div className="container">
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={this.state.snackbaropen}
                    autoHideDuration={3000}
                    onClose={this.SnackbarClose}

                    message={<span id="message-id">{this.state.snackbarmsg}</span>}
                    action={[
                        <IconButton key="close" arial-label="Close" color="inherit" onClick={this.SnackbarClose}>
                            x
                    </IconButton>
                    ]}
                />

                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            TÍNH LƯƠNG NHÂN VIÊN
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={12} >
                                <Form onSubmit={this.handleSubmitPUT}>
                                    <Form.Group controlId="BangluongID">
                                        <Form.Label>ID bảng lương</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="BangluongID"
                                            //required
                                            defaultValue={this.props.idbangLuong}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="TinhluongTienPHUCLOI">
                                        <Form.Label>Số tiền</Form.Label>
                                        <Form.Control
                                            type='number'
                                            name="TinhluongTienPHUCLOI"
                                            defaultValue={this.props.ghiChu}
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit" onClick={this.props.onHide}>
                                            XÁC NHẬN
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn btn-block btn-secondary" onClick={this.props.onHide}>Đóng</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
