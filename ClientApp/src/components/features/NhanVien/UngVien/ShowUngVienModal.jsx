import React, { Component } from 'react';
import { Modal, Row, Col, Form } from 'react-bootstrap';
import { Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, Input } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import AppCSS from '../../../../AppCSS.css'

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

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

export class ShowUngVienModal extends Component {
    //static displayName = EditPhongbanModal.name;

    constructor(props) {
        super(props);
        this.state = {
            dts: [],
            daotaos: [],
        }
    }

    componentDidMount() {
        this.loadDanToc()
        this.loadDaoTao()
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

    showModalBody() {
        return (
            <Form>
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
                            <Col sm={3}>
                                <label className="btn btn-link btn-sm ml-5">
                                    <input type="file" hidden name="UngvienHINH" disabled
                                        onChange={(event) => this.handleChange(event)}></input>
                                </label>
                            </Col>
                            <Col sm={2}>
                                <StyledNgay
                                    name="UngvienNgaySinh"
                                    size="small"
                                    type="date"
                                    variant="outlined"
                                    label="Ngày Sinh"
                                    defaultValue={this.props.uvngaysinh}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                ></StyledNgay>
                            </Col>
                            <Col sm={3}>
                                <StyledKeID
                                    name="UngvienNoiSinh"
                                    size="small"
                                    variant="outlined"
                                    label="Nơi sinh"
                                    defaultValue={this.props.uvnoisinh}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                ></StyledKeID>
                            </Col>
                            <Col sm={2}>
                                <TextField
                                    name="UngvienTonGiao"
                                    size="small"
                                    variant="outlined"
                                    label="Tôn giáo"
                                    defaultValue={this.props.uvtongiao}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Col>
                            <Col sm={2}>
                                <StyledGioiTinh
                                    name="UngvienDanToc"
                                    size="small"
                                    variant="outlined"
                                    //select
                                    label="Dân tộc"
                                    defaultValue={this.layTenDanToc(this.props.uvdantoc)}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                ></StyledGioiTinh>
                            </Col>
                        </Row>
                    </Col>

                    <Col sm={12} className="ml-2">
                        <Row className="mt-4">
                            <Col sm={2} >
                                <TextField
                                    name="UngvienSDT"
                                    size="small"
                                    variant="outlined"
                                    label="Số điện thoại"
                                    defaultValue={this.props.uvsdt}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Col>
                            <Col sm={3} >
                                <StyledKeID
                                    name="UngvienEmail"
                                    size="small"
                                    variant="outlined"
                                    label="Email"
                                    defaultValue={this.props.uvmail}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                ></StyledKeID>
                            </Col>
                            <Col sm={2} >
                                <StyledHonNhan
                                    name="UngvienSoCMNN"
                                    size="small"
                                    variant="outlined"
                                    label="Số CMND"
                                    defaultValue={this.props.uvsocmnd}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                ></StyledHonNhan>
                            </Col>
                            <Col sm={2} >
                                <StyledNgay
                                    name="UngvienNgNgayCapCMMM"
                                    size="small"
                                    type="date"
                                    variant="outlined"
                                    label="Ngày cấp CMND"
                                    defaultValue={this.props.uvngaycap}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                ></StyledNgay>
                            </Col>
                            <Col sm={3} >
                                <TextField
                                    name="UngvienNoiCap"
                                    size="small"
                                    variant="outlined"
                                    label="Nơi cấp CMND"
                                    defaultValue={this.props.uvnoicap}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Col>
                        </Row>

                        <Row className="mt-5">
                            <Col sm={2} >
                                <TextField
                                    name="UngvienQuocTich"
                                    size="small"
                                    variant="outlined"
                                    label="Quốc tịch"
                                    defaultValue={this.props.uvquoctich}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Col>
                            <Col sm={3} >
                                <StyledKeID
                                    size="small"
                                    name="UngvienDiaChi"
                                    variant="outlined"
                                    label="Địa chỉ thường trú"
                                    defaultValue={this.props.uvdcthuongtru}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                ></StyledKeID>
                            </Col>
                            <Col sm={3} >
                                <StyledKeID
                                    name="UngvienChoOHienTai"
                                    size="small"
                                    variant="outlined"
                                    label="Chỗ ở hiện tại"
                                    defaultValue={this.props.uvchohientai}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                ></StyledKeID>
                            </Col>
                            <Col sm={2} >
                                <StyledHonNhan
                                    name="UngvienTinhTrangHonNhan"
                                    size="small"
                                    variant="outlined"
                                    label="Tình trạng hôn nhân"
                                    defaultValue={this.props.uvtinhtranghonnhan}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                ></StyledHonNhan>
                            </Col>
                            <Col sm={2} >
                                <StyledGioiTinh className="ml-2"
                                    name="UngvienTrinhDoDaoTao"
                                    size="small"
                                    variant="outlined"
                                    //select
                                    label="Trình độ"
                                    defaultValue={this.layTenTrinhDo(this.props.uvdaotao)}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                ></StyledGioiTinh>
                            </Col>
                        </Row>
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
                            Thông tin ứng viên
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