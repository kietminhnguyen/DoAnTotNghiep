import React, { Component } from 'react';

import { Modal, Row, Col, Form } from 'react-bootstrap';
import { Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, Input } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import AppCSS from '../../../../AppCSS.css'


const StyledGioiTinh = withStyles((theme) => ({
    root: {
        minWidth: 120
    },
}))(TextField);

const StyledNgay = withStyles((theme) => ({
    root: {
        width: 170
    },
}))(TextField);

const StyledKeID = withStyles((theme) => ({
    root: {
        width: 255
    },
}))(TextField);

const StyledHonNhan = withStyles((theme) => ({
    root: {
        width: 165
    },
}))(TextField);

const StyledTrinhDo = withStyles((theme) => ({
    root: {
        width: 160
    },
}))(TextField);

const StyledQuocTich = withStyles((theme) => ({
    root: {
        width: 125
    },
}))(TextField);

const StyledChoO = withStyles((theme) => ({
    root: {
        width: 315
    },
}))(TextField);

export class ShowTuyenThangModal extends Component {
    //static displayName = EditPhongbanModal.name;

    constructor(props) {
        super(props);
        this.state = {
            pbs: [],
            dts: [],
            daotaos: [],
            cvs: [],
        };
    }


    componentDidMount() {
        this.loadPhongBan()
        this.loadDanToc()
        this.loadDaoTao()
        this.loadChucVu()
    }

    loadPhongBan() {
        fetch('https://localhost:44390/api/phongbans')
            .then(respone => respone.json())
            .then(data => {
                this.setState({ pbs: data })
            })
    }

    loadDanToc() {
        fetch('https://localhost:44390/api/dantocs/')
            .then(respone => respone.json())
            .then(data => {
                this.setState({ dts: data })
            })
    }

    loadDaoTao() {
        fetch('https://localhost:44390/api/trinhdodaotaos/')
            .then(respone => respone.json())
            .then(data => {
                this.setState({ daotaos: data })
            })
    }

    loadChucVu() {
        fetch('https://localhost:44390/api/chucvus/')
            .then(respone => respone.json())
            .then(data => {
                this.setState({ cvs: data })
            })
    }

    layTenDanToc(id) {
        for (let i = 0; i < this.state.dts.length; i++) {
            if (id == this.state.dts[i].iddanToc) {
                id = this.state.dts[i].tenDanToc
            }
        }
        return id
    }

    layTenTrinhDo(id) {
        for (let i = 0; i < this.state.daotaos.length; i++) {
            if (id == this.state.daotaos[i].idtrinhDo) {
                id = this.state.daotaos[i].tenTrinhDo
            }
        }
        return id
    }

    layTenPhongBan(id) {
        for (let i = 0; i < this.state.pbs.length; i++) {
            if (id == this.state.pbs[i].idphongBan) {
                id = this.state.pbs[i].tenPhongBan
            }
        }
        return id
    }

    layTenChucVu(id) {
        for (let i = 0; i < this.state.cvs.length; i++) {
            if (id == this.state.cvs[i].idchucVu) {
                id = this.state.cvs[i].tenChucVu
            }
        }
        return id
    }

    showModalBody() {
        return (
            <Form>
                <Row>
                    <Col sm={12}>
                        <Row className="mt-1">
                            <Col sm={3}>
                                <img src={this.props.nvpic}
                                    className="ml-5"
                                    height="100px"
                                    width="100px"
                                //defaultValue={urlt + this.props.uvhinh}
                                />
                            </Col>
                            <Col sm={2} className="mt-3">
                                <TextField
                                    name="NhanvienID"
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
                                    name="NhanvienHO"
                                    size="small"
                                    variant="outlined"
                                    label="Họ đệm"
                                    defaultValue={this.props.nvho}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                ></StyledKeID>

                            </Col>
                            <Col sm={2} className="mt-3">
                                <TextField
                                    name="NhanvienTEN"
                                    size="small"
                                    variant="outlined"
                                    label="Tên"
                                    defaultValue={this.props.nvten}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                >
                                </TextField>
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
                            <Col sm={3}>
                                <label className="btn btn-link btn-sm ml-5">
                                    <input type="file" hidden name="NhanvienHINH" disabled
                                        onChange={(event) => this.handleChange(event)}></input>
                                </label>
                            </Col>
                            <Col sm={2}>
                                <StyledNgay
                                    name="NhanvienNgaySinh"
                                    size="small"
                                    type="date"
                                    variant="outlined"
                                    label="Ngày sinh"
                                    defaultValue={this.props.nvngaysinh}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                ></StyledNgay>
                            </Col>
                            <Col sm={3}>
                                <StyledKeID
                                    name="NhanvienNoiSinh"
                                    size="small"
                                    variant="outlined"
                                    label="Nơi sinh"
                                    defaultValue={this.props.nvnoisinh}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                ></StyledKeID>
                            </Col>
                            <Col sm={2}>
                                <TextField
                                    name="NhanvienTonGiao"
                                    size="small"
                                    variant="outlined"
                                    label="Tôn giáo"
                                    defaultValue={this.props.nvtongiao}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Col>
                            <Col sm={2}>
                                <StyledGioiTinh
                                    name="NhanvienDanToc"
                                    size="small"
                                    variant="outlined"
                                    //select
                                    label="Dân tộc"
                                    defaultValue={this.layTenDanToc(this.props.nvdantoc)}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                ></StyledGioiTinh>
                            </Col>
                        </Row>
                    </Col>

                    <Col sm={12} className="ml-2">
                        <Row className="mt-4 mb-5">
                            <Col sm={2} >
                                <TextField
                                    name="NhanvienSDT"
                                    size="small"
                                    variant="outlined"
                                    label="Số điện thoại"
                                    defaultValue={this.props.nvsdt}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Col>
                            <Col sm={3} >
                                <StyledKeID
                                    name="NhanvienEmail"
                                    size="small"
                                    variant="outlined"
                                    label="Email"
                                    defaultValue={this.props.nvmail}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                ></StyledKeID>
                            </Col>
                            <Col sm={2} >
                                <StyledHonNhan
                                    name="NhanvienSoCMNN"
                                    size="small"
                                    variant="outlined"
                                    label="Số CMND"
                                    defaultValue={this.props.nvsocmnd}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                ></StyledHonNhan>
                            </Col>
                            <Col sm={2} >
                                <StyledNgay
                                    name="NhanvienNgNgayCapCMMM"
                                    size="small"
                                    type="date"
                                    variant="outlined"
                                    label="Ngày cấp CMND"
                                    defaultValue={this.props.nvngaycap}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                ></StyledNgay>
                            </Col>
                            <Col sm={3} >
                                <TextField
                                    name="NhanvienNoiCap"
                                    size="small"
                                    variant="outlined"
                                    label="Nơi cấp CMND"
                                    defaultValue={this.props.nvnoicap}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Col>
                        </Row>

                        <Row className="mt-4 mb-3">
                            <Col sm={2} >
                                <StyledTrinhDo
                                    name="NhanvienTrinhDoDaoTao"
                                    size="small"
                                    variant="outlined"
                                    //select
                                    label="Trình độ"
                                    defaultValue={this.layTenTrinhDo(this.props.nvdaotao)}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                ></StyledTrinhDo>
                            </Col>
                            <Col sm={3} >
                                <StyledKeID
                                    name="NhanvienPB"
                                    size="small"
                                    variant="outlined"
                                    //select
                                    label="Phòng ban"
                                    defaultValue={this.layTenPhongBan(this.props.nvpb)}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                ></StyledKeID>
                            </Col>
                            <Col sm={3} >
                                <StyledKeID
                                    name="NhanvienCV"
                                    size="small"
                                    variant="outlined"
                                    //select
                                    label="Chức vụ"
                                    defaultValue={this.layTenChucVu(this.props.nvcv)}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                ></StyledKeID>
                            </Col>
                            <Col sm={2} >
                                <StyledHonNhan
                                    name="NhanvienTinhTrangHonNhan"
                                    size="small"
                                    variant="outlined"
                                    label="Tình trạng hôn nhân"
                                    defaultValue={this.props.nvtinhtranghonnhan}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                ></StyledHonNhan>
                            </Col>
                            <Col sm={2} >
                                <StyledQuocTich
                                    name="NhanvienQuocTich"
                                    size="small"
                                    variant="outlined"
                                    label="Quốc tịch"
                                    defaultValue={this.props.nvquoctich}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                ></StyledQuocTich>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row>
                    <Col sm={2}></Col>
                    <Col sm={3}></Col>
                    <Col sm={3} className="mt-4 ml-1">
                        <StyledKeID
                            size="small"
                            name="NhanvienDiaChi"
                            variant="outlined"
                            label="Địa chỉ thường trú"
                            defaultValue={this.props.nvdcthuongtru}
                            InputProps={{
                                readOnly: true,
                            }}
                        ></StyledKeID>

                    </Col>
                    <Col sm={3} className="mt-4 ml-1">
                        <StyledChoO
                            name="NhanvienChoOHienTai"
                            size="small"
                            variant="outlined"
                            label="Chỗ ở hiện tại"
                            defaultValue={this.props.nvchohientai}
                            InputProps={{
                                readOnly: true,
                            }}
                        ></StyledChoO>
                    </Col>
                </Row>

            </Form>
        )
    }

    render() {
        return (
            <div className="container">
                <Modal
                    {...this.props}
                    size="xl"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Thông tin nhân viên
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