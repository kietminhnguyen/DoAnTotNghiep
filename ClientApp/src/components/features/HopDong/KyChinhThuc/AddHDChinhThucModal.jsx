import React, { Component } from 'react';

import axios from 'axios'
import { Modal, Row, Col, Form } from 'react-bootstrap';
import { TextField, Button} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import CancelIcon from '@material-ui/icons/Cancel';
import AppCSS from '../../../../AppCSS.css'
import { format, compareAsc, addMonths } from 'date-fns'

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

export class AddHDChinhThucModal extends Component {
    //static displayName = AddPhongbanModal.name;

    constructor(props) {
        super(props);

        this.state = {
            hds: [],
            HopdongBD: '',
            snackbaropen: false,
            snackbarmsg: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    SnackbarClose = (event) => {
        this.setState({ snackbaropen: false });
    };

    loadHD() {
        fetch('https://localhost:44390/api/hopdongs')
            .then(respone => respone.json())
            .then(data => {
                this.setState({ hds: data })
            })
    }

    componentDidMount() {
        this.loadHD()
    }

    handleSubmit(event) {
        event.preventDefault();

        //this.themHDThuViec(event)
        //this.updateTrangThaiHopDong(this.props.nvid)
        var ktKyVaBatDau = compareAsc(
            new Date(event.target.HopdongBD.value),
            new Date(event.target.HopdongKY.value)
        )// Nếu ngày bắt đầu làm trước ngày ký =>  = -1 
        let co = false
        for (let i = 0; i < this.state.hds.length; i++) {
            if (parseInt(this.state.hds[i].idnhanVien) == parseInt(event.target.NhanvienID.value)) {
                co = true
            }
        }
        if (co == true) {
            alert('Nhân viên này đã ký hợp đồng')
        }
        else if (ktKyVaBatDau == -1) {
            alert('Ngày chưa hợp lệ')
        } else {

            axios.post('https://localhost:44390/api/hopdongs', {
                ngayLapHd: event.target.HopdongKY.value,
                ngayBatDau: event.target.HopdongBD.value,
                ngayHetHan: event.target.HopdongKT.value,
                ghiChu: "Ký",
                idloaiHd: 2,
                idnhanVien: parseInt(event.target.NhanvienID.value),
            })
            axios.put('https://localhost:44390/api/nhanviens/' + parseInt(event.target.NhanvienID.value), {
                idnhanVien: parseInt(event.target.NhanvienID.value),
                hoDem: this.props.nvho,
                ten: this.props.nvten,
                //nguyenQuan: this.props.nvnguyenquan,
                tinhTrangHonNhan: this.props.nvtinhtranghonnhan,
                ngaySinh: this.props.nvngaysinh,
                noiSinh: this.props.nvnoisinh,
                gioiTinh: this.props.nvgioitinh,
                hinhAnh: this.props.nvpic,
                diaChiThuongTru: this.props.nvdcthuongtru,
                choOhienTai: this.props.nvchohientai,
                soCmnn: this.props.nvsocmnd,
                ngayCap: this.props.nvngaycap,
                tonGiao: this.props.nvtongiao,
                noiCap: this.props.nvnoicap,
                quocTich: this.props.nvquoctich,
                email: this.props.nvmail,
                soDienThoai: this.props.nvsdt,
                //nganhHoc: this.props.nvnganhhoc,
                noiDaoTao: this.props.nvnoidaotao,
                //xepLoai: this.props.nvxeploai,
                //username
                idphongBan: this.props.nvpb,
                idchucVu: this.props.nvcv,
                //idquanHeGd
                //trangthaiHdthuViec: "Đã ký",
                trangthaiHdchinhThuc: "Đã ký",
                iddanToc: this.props.nvdantoc,
                idtrinhDo: this.props.nvdaotao,
                //idquyetDinhBn
            })
            alert("Thành công")
        }
    }

    handleChange = (event) => {
        const name = event.target.name;
        const values = event.target.value;

        var tang12thang = addMonths(new Date(values), 12)

        var result = format(new Date(tang12thang), 'yyyy-MM-dd')

        this.setState({
            HopdongBD: result
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
                        <Row>
                            <Col sm={3}></Col>
                            <Col sm={3}>
                                <StyledNgay
                                    name="HopdongKY"
                                    //size="small"
                                    type="date"
                                    variant="outlined"
                                    label="Ngày lập hợp đồng"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                ></StyledNgay>
                            </Col>
                            <Col sm={3}>
                                <StyledNgay
                                    name="HopdongBD"
                                    //size="small"
                                    type="date"
                                    variant="outlined"
                                    label="Bắt đầu làm từ ngày"
                                    onChange={(event) => this.handleChange(event)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                ></StyledNgay>
                            </Col>
                            <Col sm={3}>
                                <StyledNgay
                                    name="HopdongKT"
                                    //size="small"
                                    type="date"
                                    variant="outlined"
                                    label="Kết thúc ngày"
                                    value={this.state.HopdongBD}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                ></StyledNgay>
                            </Col>
                        </Row>
                    </Col>
                </Row>
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
                            LẬP HỢP ĐỒNG CHÍNH THỨC
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
