import React, { Component } from 'react';
import axios from 'axios'
import { Modal, Row, Col, Form } from 'react-bootstrap';
import { TextField, Button } from "@material-ui/core";
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import CancelIcon from '@material-ui/icons/Cancel';
import AppCSS from '../../../../AppCSS.css'
//import { format, endOfMonth } from 'date-fns'

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

export class EditQuyetDinhKiLuat extends Component {
    static displayName = EditQuyetDinhKiLuat.name;

    constructor(props) {
        super(props);

        this.state = {
            //quyetdinhkls: [],
            snackbaropen: false,
            snackbarmsg: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        //this.handleChange = this.handleChange.bind(this)
    }
    SnackbarClose = (event) => {
        this.setState({ snackbaropen: false });
    };

    // handleChange = (event) => {
    //     const name = event.target.name;
    //     const values = event.target.value;
    //     var endMonth = endOfMonth(new Date(values))
    //     var result = format(new Date(endMonth), 'yyyy-MM-dd')

    //     this.setState({
    //         QDHetHan: result
    //     })
    // }

    handleSubmit(event) {
        event.preventDefault();
        if (
            isNaN(parseInt(event.target.QUYETDINHtienphat.value))
            || parseInt(event.target.QUYETDINHtienphat.value) <= 0
        ) {
            alert("Số tiền không hợp lệ")
        }
        else {
            if (window.confirm('Bạn có chắc muốn sửa kỷ luật nhân viên này?')) {
                axios.put('https://localhost:44390/api/quyetdinhkls/' + parseInt(this.props.qdidkl), {
                    idquyetDinhKl: parseInt(this.props.qdidkl),
                    //tenQuyetDinh: event.target.QUYETDINHten.value,
                    ngayLap: event.target.QUYETDINHngaylap.value,
                    hoDem: this.props.qdhodem,
                    ten: this.props.qdtennv,
                    idnhanVien: this.props.qdidnv,
                    ngayHieuLuc: event.target.QUYETDINHngayhieuluc.value,
                    ngayHetHieuLuc: event.target.QUYETDINHngayhethieuluc.value,
                    noiDung: event.target.QUYETDINHnoidung.value,
                    soTienPhat: parseInt(event.target.QUYETDINHtienphat.value),
                    //ghiChu: event.target.QUYETDINHghichu.value
                })
                    .then(response => {
                        //this.setState({ arrayBL: response.data })
                        //alert("Xóa thành công")
                        this.setState({ snackbaropen: true, snackbarmsg: "Thành công" });
                    })
                    .catch(error => {
                        //this.setState({ showError: "Lỗi post dữ liệu" })
                        alert("Không thành công")
                    })
            }
        }


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
                                    defaultValue={this.props.qdngyathanhlap}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        readOnly: true,
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
                                    //onChange={(event) => this.handleChange(event)}
                                    defaultValue={this.props.qdngayhieuluc}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        readOnly: true,
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
                                    //value={this.state.QDHetHan}
                                    defaultValue={this.props.qdngayhethieuluc}
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
                                    defaultValue={this.props.qdnoidung}
                                    multiline rows={3}
                                ></StyledNoiDung>
                            </Col>
                            <Col sm={3} className="mt-4">
                                <StyledNgay
                                    name="QUYETDINHtienphat"
                                    //size="small"
                                    variant="outlined"
                                    label="Số tiền phạt"
                                    defaultValue={this.props.qdtienphat}
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
                                    defaultValue={this.props.qdghichu}
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
                            CHỈNH SỬA KỶ LUẬT
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
