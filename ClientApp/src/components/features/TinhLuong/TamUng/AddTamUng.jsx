import React, { Component } from 'react';

import { Modal, Row, Col, Form } from 'react-bootstrap';
import { TextField, Button } from "@material-ui/core";
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import CancelIcon from '@material-ui/icons/Cancel';
import AppCSS from '../../../../AppCSS.css'
import { format, getMonth, getYear, endOfMonth } from 'date-fns';

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

export class AddTamUng extends Component {
    //static displayName = AddChamCongThuCong.name;

    constructor(props) {
        super(props);

        this.state = {
            bangluongs:[],
            nhanviens: [],
            tamungluongs: [],
            TamUngNgay: 'yyyy-MM-dd',
            snackbaropen: false,
            snackbarmsg: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    SnackbarClose = (event) => {
        this.setState(
            { snackbaropen: false });
    };

    componentDidMount() {
        this.loadTU()
        this.loadNV()
        this.loadBangLuong()
    }

    loadBangLuong() {
        fetch('https://localhost:44390/api/bangluongs')
            .then(response => response.json())
            .then(data => {
                this.setState({ bangluongs: data });
            });

    }

    loadTU() {
        fetch('https://localhost:44390/api/tamungluongs')
            .then(respone => respone.json())
            .then(data => {
                this.setState({ tamungluongs: data })
            })
    }

    loadNV() {
        fetch('https://localhost:44390/api/nhanviens')
            .then(response => response.json())
            .then(data => {
                this.setState({ nhanviens: data });
            });
    }

    handleChange = (event) => {
        const name = event.target.name;
        const values = event.target.value;

        var result = format(new Date(values), 'yyyy-MM-dd')

        this.setState({
            TamUngNgay: result
        })
        //console.log(result)
    }

    handleSubmit(event) {
        event.preventDefault();

        var tongTien = 0;
        for (let i = 0; i < this.state.tamungluongs.length; i++) {
            if ((this.state.tamungluongs[i].ngayTamUng.substring(0, 7) == this.state.TamUngNgay.substring(0, 7))
                && parseInt(this.props.idnv) == parseInt(this.state.tamungluongs[i].idnhanVien)
            ) {
                tongTien = tongTien + parseInt(this.state.tamungluongs[i].soTienTamUng)
            }
        }
        //console.log("đã ứng: " + tongTien)
        var layThangTU = getMonth(new Date(event.target.TamUngNgay.value)) + 1
        var layNamTU = getYear(new Date(event.target.TamUngNgay.value))
        // console.log(event.target.TamUngNgay.value);
        // console.log(layThangTU);
        // console.log(layNamTU);

        let flag = false
        // kiểm tra đã đỗ dữ liệu hay chưa
        // nếu đỗ rồi sẽ không được xóa qdKT
        for (let ii = 0; ii < this.state.bangluongs.length; ii++) {
            for (let j = 0; j < this.state.tamungluongs.length; j++) {
                if (this.state.bangluongs[ii].thang == layThangTU
                    && this.state.bangluongs[ii].nam == layNamTU
                    //&& this.state.bangluongs[ii].idnhanVien == this.state.tamungluongs[j].idnhanVien
                ) {
                    flag = true
                }
                else {
                    flag = false
                }
            }
        }
        if (flag) {
            alert("Đã đỗ dữ liệu của tháng này. Không thể tạm ứng nữa!!!")
        }
        else {
            if (tongTien >= 3000000) { // kt tổng tiền ứng có lớn hơn luongCB/2
                alert("Tháng này đã tạm ứng vượt 50% lương cơ bản")
            }
            else {
                tongTien = tongTien + parseInt(event.target.TamUngSOTIEN.value)
                //console.log("thêm: "+tongTien)
                if (tongTien >= 3000000) {
                    alert("Số tiền ứng đã vượt 50% lương cơ bản. VUI LÒNG NHẬP LẠI!")
                } else {
                    //console.log("sum= "+tongTien)
                    axios.post('https://localhost:44390/api/tamungluongs', {
                        ngayTamUng: event.target.TamUngNgay.value,
                        soTienTamUng: event.target.TamUngSOTIEN.value,
                        lyDoTamUng: event.target.TamUngLYDO.value,
                        ghiChu: event.target.TamUngGHICHU.value,
                        idnhanVien: parseInt(this.props.idnv),
                    })
                        .then(response => {
                            //console.log(response)
                            this.setState({ tamungluongs: response.data })
                            alert("Tạm ứng thành công")
                        })
                    ///////////////////////
                }
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
                                    //name="QUYETDINHidnhanvien"
                                    size="small"
                                    variant="outlined"
                                    label="ID nhân viên"
                                    defaultValue={this.props.idnv}
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
                                    defaultValue={this.props.cchodem}
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
                                    defaultValue={this.props.ccten}
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
                                    name="TamUngNgay"
                                    //size="small"
                                    type="date"
                                    variant="outlined"
                                    label="Ngày tạm ứng"
                                    defaultValue={format(new Date(), 'yyyy-MM-dd')}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                ></StyledNgay>
                            </Col>
                            <Col sm={3}>
                                <StyledNgay
                                    name="TamUngSOTIEN"
                                    //size="small"
                                    //type="date"
                                    variant="outlined"
                                    label="Số tiền tạm ứng"
                                    //onChange={(event) => this.handleChange(event)}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">VND</InputAdornment>,
                                    }}
                                ></StyledNgay>
                            </Col>
                            <Col sm={3}></Col>
                        </Row>
                        <Row >
                            <Col sm={6} className="mt-4">
                                <StyledNoiDung
                                    name="TamUngLYDO"
                                    size="small"
                                    variant="outlined"
                                    label="Lý do tạm ứng"
                                    multiline rows={3}
                                ></StyledNoiDung>
                            </Col>
                            <Col sm={6} className="mt-4">
                                <StyledNoiDung
                                    name="TamUngGHICHU"
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
                            TẠM ỨNG LƯƠNG
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
