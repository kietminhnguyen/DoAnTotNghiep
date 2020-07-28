import React, { Component } from 'react';
import { Modal, Row, Col, Form } from 'react-bootstrap';
import { TextField, Button } from "@material-ui/core";
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import CancelIcon from '@material-ui/icons/Cancel';
import AppCSS from '../../../../AppCSS.css'
import axios from 'axios';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

const StyledGioiTinh = withStyles((theme) => ({
    root: {
        minWidth: 120
    },
}))(TextField);

const StyledNgay = withStyles((theme) => ({
    root: {
        width: 250
    },
}))(TextField);

const StyledKeID = withStyles((theme) => ({
    root: {
        width: 255
    },
}))(TextField);

const StyledNoiDung = withStyles((theme) => ({
    root: {
        width: 535
    },
}))(TextField);

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
            phuCapKhac: event.target.TinhluongTienPHUCAPKHAC.value,
            truBh: this.props.truBh,
            soNgayCong: this.props.soNgayCong,
            soNgayDiTre: this.props.soNgayDiTre,
            soNgayDiTreKhongTinhLuong: this.props.soNgayDiTreKhongTinhLuong,
            soNgayNghi: this.props.soNgayNghi,
            ghiChu: event.target.TinhluongGHICHU.value,
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

    showModalBody() {
        return (
            <Form onSubmit={this.handleSubmitPUT}>
                <Row>
                    <Col sm={12}>
                        <Row className="mt-1">
                            <Col sm={3}>
                                <img
                                    src={this.props.nvpic}
                                    //srcSet={this.state.url}
                                    className="ml-5"
                                    height="100px"
                                    width="100px"
                                />
                            </Col>
                            <Col sm={2} className="mt-3">
                                <TextField
                                    //name="QUYETDINHidnhanvien"
                                    size="small"
                                    variant="outlined"
                                    label="ID nhân viên"
                                    defaultValue={this.props.nvid}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Col>
                            <Col sm={3} className="mt-3">
                                <StyledKeID
                                    //name="QUYETDINHhodem"
                                    size="small"
                                    variant="outlined"
                                    label="Họ đệm"
                                    defaultValue={this.props.nvhodem}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                ></StyledKeID>
                            </Col>
                            <Col sm={2} className="mt-3">
                                <TextField
                                    //name="QUYETDINHtennv"
                                    size="small"
                                    variant="outlined"
                                    label="Tên"
                                    defaultValue={this.props.nvten}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                ></TextField>
                            </Col>
                            <Col sm={2} className="mt-3">
                                <StyledGioiTinh
                                    //name="NhanvienGIOITINH"
                                    size="small"
                                    variant="outlined"
                                    //select
                                    label="Giới tính"
                                    defaultValue={this.props.nvgioitinh}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                ></StyledGioiTinh>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col sm={3}></Col>
                            <Col sm={3}>
                                <StyledNgay
                                    name="TinhluongTienPHUCAPKHAC"
                                    //size="small"
                                    //type="date"
                                    variant="outlined"
                                    label="Số tiền phụ cấp khác"
                                    //onChange={(event) => this.handleChange(event)}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">VND</InputAdornment>,
                                    }}
                                ></StyledNgay>
                            </Col>
                            <Col sm={6}>
                                <StyledNoiDung
                                    name="TinhluongGHICHU"
                                    size="small"
                                    variant="outlined"
                                    label="Ghi chú"
                                    multiline rows={3}
                                ></StyledNoiDung>
                            </Col>
                        </Row>
                        
                    </Col>
                </Row>
                <Row className="mt-4"></Row>
                <hr />
                <Row>
                    <Col sm={2}>
                        <Button
                            className="ml-2"
                            variant="contained"
                            color="primary"
                            type="submit"
                            startIcon={<DoneAllIcon />}
                            onClick={this.props.onHide}
                        >XÁC NHẬN</Button>
                    </Col>
                </Row>
            </Form>
        )
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
                    size="xl"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            CỘNG TIỀN PHỤ CẤP KHÁC
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.showModalBody()}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            className="mr-3"
                            variant="contained"
                            color="inherit"
                            startIcon={<CancelIcon />}
                            onClick={this.props.onHide}
                        >Đóng</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
