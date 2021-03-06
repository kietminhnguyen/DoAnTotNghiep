import React, { Component } from 'react';
import { Modal, Row, Col, Form } from 'react-bootstrap';
import { Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, Input } from "@material-ui/core";
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

const StyledCV = withStyles((theme) => ({
    root: {
        width: 160
    },
}))(TextField);

const StyledKeID = withStyles((theme) => ({
    root: {
        width: 255
    },
}))(TextField);

const StyledNgay = withStyles((theme) => ({
    root: {
        width: 240
    },
}))(TextField);

const StyledNoiDung = withStyles((theme) => ({
    root: {
        width: 440
    },
}))(TextField);
const StyledGhiChu = withStyles((theme) => ({
    root: {
        width: 350
    },
}))(TextField);

export class AddBoNhiemModal extends Component {
    //static displayName = EditPhongbanModal.name;

    constructor(props) {
        super(props);
        this.state = {
            qdbns:[],
            pbs: [],
            dts: [],
            daotaos: [],
            cvs: [],
            snackbaropen: false,
            snackbarmsg: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    SnackbarClose = (event) => {
        this.setState({ snackbaropen: false });
    };

    componentDidMount() {
        this.loadPhongBan()
        this.loadChucVu()
        this.loadQDBN()
    }

    loadPhongBan() {
        fetch('https://localhost:44390/api/phongbans')
            .then(respone => respone.json())
            .then(data => {
                this.setState({ pbs: data })
            })
    }

    loadChucVu() {
        fetch('https://localhost:44390/api/chucvus/')
            .then(respone => respone.json())
            .then(data => {
                this.setState({ cvs: data })
            })
    }

    loadQDBN() {
        fetch('https://localhost:44390/api/quyetdinhbonhiems')
            .then(response => response.json())
            .then(data => {
                this.setState({ qdbns: data });
            });
    }

    layGiaTriMacDinhPhongBan = (id) => {
        if (id == "Phòng kế hoạch") {
            return 2
        }
    }

    themQDBN(event) {
        event.preventDefault();

        axios.post('https://localhost:44390/api/quyetdinhbonhiems', {
            ngayQuyetDinh: event.target.QDBNngaylap.value,
            ngayHieuLuc: event.target.QDBNngayhieuluc.value,
            noiDung: event.target.QDBNnoidung.value,
            ghiChu: event.target.QDBNghichu.value,
            idungVien: this.props.uvid,
        })
            .then(response => {
                this.setState({ qdbns: response.data })
                //alert("Xóa thành công")
            })
            .catch(error => {
                //this.setState({ showError: "Lỗi post dữ liệu" })
                //alert("Xóa không thành công")
            })
    }

    suaUngVien(iduv) {
        axios.put('https://localhost:44390/api/ungviens/' + iduv, {
            idungVien: iduv,
            hoDem: this.props.uvho,
            ten: this.props.uvten,
            tinhTrangHonNhan: this.props.uvtinhtranghonnhan,
            ngaySinh: this.props.uvngaysinh,
            gioiTinh: this.props.uvgioitinh,
            hinhanh: this.props.uvpic,
            diaChiThuongTru: this.props.uvdcthuongtru,
            choOhienTai: this.props.uvchohientai,
            soCmnn: this.props.uvsocmnd,
            ngayCap: this.props.uvngaycap,
            tonGiao: this.props.uvtongiao,
            noiCap: this.props.uvnoicap,
            quocTich: this.props.uvquoctich,
            email: this.props.uvmail,
            soDienThoai: this.props.uvsdt,
            //nganhHoc: event.target.UngvienNganhHoc.value,
            noiDaoTao: "Chờ",
            idtrinhDo: this.props.uvdaotao,
            //xepLoai: event.target.UngvienXepLoai.value,
            iddanToc: this.props.uvdantoc,
            noiSinh: this.props.uvnoisinh,
        })
    }

    handleSubmit(event) {
        if (window.confirm('Bạn có chắc muốn bổ nhiệm ứng viên này?')) {
            this.themQDBN(event)
            this.suaUngVien(this.props.uvid)
            alert("Bổ nhiệm thành công")
            //this.setState({ snackbaropen: true, snackbarmsg: "Thành công" });
        }

    }

    showModalBody() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col sm={12}>
                        <Row className="mt-1">
                            <Col sm={3}>
                                <img src={this.props.uvpic}
                                    className="ml-5"
                                    height="100px"
                                    width="100px"
                                //defaultValue={urlt + this.props.uvhinh}
                                />
                            </Col>
                            <Col sm={2} className="mt-3">
                                <TextField
                                    name="UngvienID"
                                    size="small"
                                    variant="outlined"
                                    label="ID ứng viên"
                                    defaultValue={this.props.uvid}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Col>
                            <Col sm={3} className="mt-3">
                                <StyledKeID
                                    name="UngvienHO"
                                    size="small"
                                    variant="outlined"
                                    label="Họ đệm"
                                    defaultValue={this.props.uvho}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                ></StyledKeID>

                            </Col>
                            <Col sm={2} className="mt-3">
                                <TextField
                                    name="UngvienTEN"
                                    size="small"
                                    variant="outlined"
                                    label="Tên"
                                    defaultValue={this.props.uvten}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                ></TextField>
                            </Col>
                            <Col sm={2} className="mt-3">
                                <StyledGioiTinh
                                    name="UngvienGIOITINH"
                                    size="small"
                                    variant="outlined"
                                    //select
                                    label="Giới tính"
                                    defaultValue={this.props.uvgioitinh}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                >
                                </StyledGioiTinh>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col sm={3}></Col>
                            <Col sm={3}>
                                <StyledNgay
                                    name="QDBNngaylap"
                                    size="small"
                                    type="date"
                                    variant="outlined"
                                    label="Ngày lập quyết định"
                                    //onChange={(event) => this.handleChange(event)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                ></StyledNgay>
                            </Col>
                            <Col sm={3}>
                                <StyledNgay
                                    name="QDBNngayhieuluc"
                                    size="small"
                                    type="date"
                                    variant="outlined"
                                    label="Ngày hiệu lực"
                                    //onChange={(event) => this.handleChange(event)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                ></StyledNgay>
                            </Col>


                        </Row>
                        <Row>
                            <Col sm={3}></Col>
                            <Col sm={5} className="mt-4">
                                <StyledNoiDung
                                    name="QDBNnoidung"
                                    size="small"
                                    type="textarea"
                                    variant="outlined"
                                    label="Nội dung"
                                    multiline rows={3}
                                ></StyledNoiDung>
                            </Col>
                            <Col sm={4} className="mt-4">
                                <StyledGhiChu
                                    name="QDBNghichu"
                                    size="small"
                                    variant="outlined"
                                    label="Ghi chú"
                                    multiline rows={3}
                                ></StyledGhiChu>
                            </Col>
                        </Row>
                    </Col>
                </Row><hr />

                <Row>
                    <Col sm={2}>
                        <Button
                            className="ml-3"
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

                <Modal {...this.props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                           KIẾN NGHỊ BỔ NHIỆM NHÂN SỰ
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