import React, { Component } from 'react';

//import axios from 'axios'
import { Modal, Row, Col, Form } from 'react-bootstrap';
import { TextField, Button } from "@material-ui/core";
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import CancelIcon from '@material-ui/icons/Cancel';
import AppCSS from '../../../../AppCSS.css'
import { format, endOfMonth } from 'date-fns'

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

export class AddLapQuyetDinh extends Component {

    constructor(props) {
        super(props);

        this.state = {
            //nhanviens: [],
            // QDHetHan: 'yyyy-MM-dd',
            QDHetHan: '',
            snackbaropen: false,
            snackbarmsg: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    SnackbarClose = (event) => {
        this.setState({ snackbaropen: false });
    };

    handleSubmit(event) {
        event.preventDefault();
        if (
            event.target.QUYETDINHngaylap.value == ''
            || event.target.QUYETDINHngayhieuluc.value == ''
            || isNaN(parseInt(event.target.QUYETDINHtienthuong.value))
            || parseInt(event.target.QUYETDINHtienthuong.value) <= 0
        ) {
            alert("Vui lòng nhập lại!!!")
        }
        else {
            if (window.confirm('Bạn có chắc muốn khen thưởng nhân viên này?')) {
                fetch('https://localhost:44390/api/quyetdinhkts', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        //tenQuyetDinh: event.target.QUYETDINHten.value,
                        ngayLap: event.target.QUYETDINHngaylap.value,
                        hoDem: event.target.QUYETDINHhodem.value,
                        ten: event.target.QUYETDINHtennv.value,
                        idnhanVien: parseInt(event.target.QUYETDINHidnhanvien.value),
                        ngayHieuLuc: event.target.QUYETDINHngayhieuluc.value,
                        ngayHetHieuLuc: event.target.QUYETDINHngayhethieuluc.value,
                        noiDung: event.target.QUYETDINHnoidung.value,
                        soTienThuong: parseInt(event.target.QUYETDINHtienthuong.value),
                        ghiChu: event.target.QUYETDINHghichu.value
                    })
                })
                    .then(res => res.json())
                    .then(() => {
                        this.setState({ snackbaropen: true, snackbarmsg: "Thành công" });
                    })
            }
        }
    }

    handleChange = (event) => {
        const name = event.target.name;
        const values = event.target.value;
        var endMonth = endOfMonth(new Date(values))
        var result = format(new Date(endMonth), 'yyyy-MM-dd')

        this.setState({
            QDHetHan: result
        })
    }

    showModalBody() {
        return (
            <Form onSubmit={this.handleSubmit}>
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
                                    name="QUYETDINHidnhanvien"
                                    size="small"
                                    variant="outlined"
                                    label="ID nhân viên"
                                    defaultValue={this.props.qdidnv}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Col>
                            <Col sm={3} className="mt-3">
                                <StyledKeID
                                    name="QUYETDINHhodem"
                                    size="small"
                                    variant="outlined"
                                    label="Họ đệm"
                                    defaultValue={this.props.qdhodem}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                ></StyledKeID>
                            </Col>
                            <Col sm={2} className="mt-3">
                                <TextField
                                    name="QUYETDINHtennv"
                                    size="small"
                                    variant="outlined"
                                    label="Tên"
                                    defaultValue={this.props.qdtennv}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                ></TextField>
                            </Col>
                            <Col sm={2} className="mt-3">
                                <StyledGioiTinh
                                    name="NhanvienGIOITINH"
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
                                    name="QUYETDINHngaylap"
                                    //size="small"
                                    type="date"
                                    variant="outlined"
                                    label="Ngày lập quyết đinh"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                ></StyledNgay>
                            </Col>
                            <Col sm={3}>
                                <StyledNgay
                                    name="QUYETDINHngayhieuluc"
                                    //size="small"
                                    type="date"
                                    variant="outlined"
                                    label="Ngày hiệu lực"
                                    onChange={(event) => this.handleChange(event)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                ></StyledNgay>
                            </Col>
                            <Col sm={3}>
                                <StyledNgay
                                    name="QUYETDINHngayhethieuluc"
                                    //size="small"
                                    type="date"
                                    variant="outlined"
                                    label="Ngày hết hiệu lực"
                                    value={this.state.QDHetHan}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                ></StyledNgay>
                            </Col>
                        </Row>
                        <Row >
                            <Col sm={6} className="mt-4">
                                <StyledNoiDung
                                    name="QUYETDINHnoidung"
                                    size="small"
                                    variant="outlined"
                                    label="Nội dung"
                                    multiline rows={3}
                                ></StyledNoiDung>
                            </Col>
                            <Col sm={3} className="mt-4">
                                <StyledNgay
                                    name="QUYETDINHtienthuong"
                                    //size="small"
                                    variant="outlined"
                                    label="Số tiền thưởng"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">VND</InputAdornment>,
                                    }}
                                ></StyledNgay>
                            </Col>
                            <Col sm={3} className="mt-4">
                                <StyledNgay
                                    name="QUYETDINHghichu"
                                    //size="small"
                                    variant="outlined"
                                    label="Ghi chú"
                                ></StyledNgay>
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
                            LẬP QUYẾT ĐỊNH KHEN THƯỞNG
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
        )
    }
}
