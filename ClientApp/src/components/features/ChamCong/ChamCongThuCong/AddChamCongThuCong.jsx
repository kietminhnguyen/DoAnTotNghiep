import React, { Component } from 'react';
import { Modal, Row, Col, Form } from 'react-bootstrap';
import { TextField, Button } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import CancelIcon from '@material-ui/icons/Cancel';
import AppCSS from '../../../../AppCSS.css'
import { getMonth, getYear } from 'date-fns'


import { format} from 'date-fns';
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

const StyledRow3 = withStyles((theme) => ({
    root: {
        width: 250
    },
}))(TextField);

export class AddChamCongThuCong extends Component {
    //static displayName = AddChamCongThuCong.name;

    constructor(props) {
        super(props);

        this.state = {
            bangluongs:[],
            cvs: [],
            pbs: [],
            nhanviens: [],
            chamcongs: [],
            ChamCongNgay: 'yyyy-MM-dd',
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
        this.loadCC()
        this.loadNV()
        this.loadPhongBan()
        this.loadChucVu()
        this.loadBangLuong()
    }

    loadBangLuong() {
        fetch('https://localhost:44390/api/bangluongs')
            .then(response => response.json())
            .then(data => {
                this.setState({ bangluongs: data });
            });

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

    loadCC() {
        fetch('https://localhost:44390/api/chamcongs')
            .then(respone => respone.json())
            .then(data => {
                this.setState({ chamcongs: data })
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
            ChamCongNgay: result
        })
        //console.log(result)
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

    handleSubmit(event) {
        event.preventDefault();
        // console.log(event.target.ChamCongNgay.value)
        // console.log(event.target.ChamCongGioVao.value)
        // console.log(event.target.ChamCongGioRa.value)
        // console.log(parseInt(this.props.idnv))
        let co = false
        for (let i = 0; i < this.state.chamcongs.length; i++) {
            //for(let j=0; j< this.state.nhanviens.length; j++){
            if (this.state.chamcongs[i].ngayChamCong.substring(0, 10) == this.state.ChamCongNgay
                && parseInt(this.props.idnv) == parseInt(this.state.chamcongs[i].idnhanVien)) {
                co = true
            }
        }

        var layThangCC = getMonth(new Date(event.target.ChamCongNgay.value)) + 1
        var layNamCC = getYear(new Date(event.target.ChamCongNgay.value))
        // console.log(event.target.QUYETDINHngayhethieuluc.value);
        // console.log(layThangQD);
        // console.log(layNamQD);

        let flag = false
        // kiểm tra đã đỗ dữ liệu hay chưa
        // nếu đỗ rồi sẽ không được xóa qdKT
        for (let i = 0; i < this.state.bangluongs.length; i++) {
            for (let j = 0; j < this.state.chamcongs.length; j++) {
                if (this.state.bangluongs[i].thang == layThangCC
                    && this.state.bangluongs[i].nam == layNamCC
                    //&& this.state.bangluongs[i].idnhanVien == this.state.quyetdinhkts[j].idnhanVien
                ) {
                    flag = true
                }
                else {
                    flag = false
                }
            }
        }
        if (flag) {
            alert("Đã đỗ dữ liệu của tháng này. Không thể chấm công nữa!!!")
        }
        else{
            if (co) {
                alert("Ngày này đã chấm công")
            } else {
                axios.post('https://localhost:44390/api/chamcongs', {
                    ngayChamCong: event.target.ChamCongNgay.value,
                    idnhanVien: parseInt(this.props.idnv),
                    gioVao: event.target.ChamCongGioVao.value,
                    gioRa: event.target.ChamCongGioRa.value,
                    //ghiChu: event.target.ChamCongGhiChu.value,
    
                })
                    .then(response => {
                        //console.log(response)
                        this.setState({ chamcongs: response.data })
                        alert("Chấm công bổ sung thành công")
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
                                    //name="ChamCongID"
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
                                    //name="QUYETDINHngaylap"
                                    size="small"
                                    variant="outlined"
                                    label="Số điện thoại"
                                    defaultValue={this.props.nvsdt}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                ></StyledNgay>
                            </Col>
                            <Col sm={3}>
                                <StyledNgay
                                    //name="QUYETDINHngayhieuluc"
                                    size="small"
                                    variant="outlined"
                                    label="Thuộc phòng ban"
                                    defaultValue={this.layTenPhongBan(this.props.nvpb)}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                ></StyledNgay>
                            </Col>
                            <Col sm={3}>
                                <StyledNgay
                                    //name="QUYETDINHngayhethieuluc"
                                    size="small"
                                    variant="outlined"
                                    label="Chức vụ"
                                    defaultValue={this.layTenChucVu(this.props.nvcv)}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                ></StyledNgay>
                            </Col>
                        </Row>

                        <Row >
                            <Col sm={2}></Col>
                            <Col sm={3} className="mt-4">
                                <StyledRow3
                                    type="date"
                                    name="ChamCongNgay"
                                    //size="small"
                                    variant="outlined"
                                    label="Ngày chấm công"
                                    onChange={(event) => this.handleChange(event)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                ></StyledRow3>
                            </Col>
                            <Col sm={3} className="mt-4">
                                <StyledRow3
                                    type="time"
                                    name="ChamCongGioVao"
                                    //size="small"
                                    variant="outlined"
                                    label="Giờ vào"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                ></StyledRow3>
                            </Col>
                            <Col sm={3} className="mt-4">
                                <StyledRow3
                                    type="time"
                                    name="ChamCongGioRa"
                                    //size="small"
                                    variant="outlined"
                                    label="Giờ ra"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                ></StyledRow3>
                            </Col>
                            <Col sm={1}></Col>
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
                            CHẤM CÔNG BỔ SUNG
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
