import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { format, compareAsc, addMonths } from 'date-fns'

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class AddHDThuViecModal extends Component {
    //static displayName = AddPhongbanModal.name;

    constructor(props) {
        super(props);

        this.state = {
            hds: [],
            HopdongBD: 'yyyy-MM-dd',
            snackbaropen: false,
            snackbarmsg: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    SnackbarClose = (event) => {
        this.setState({ snackbaropen: false });
    };

    refreshLishHD() {
        fetch('https://localhost:44390/api/hopdongs')
            .then(respone => respone.json())
            .then(data => {
                this.setState({ hds: data })
            })
    }

    componentDidMount() {
        this.refreshLishHD()
    }

    handleChange = (event) => {
        const name = event.target.name;
        const values = event.target.value;
        //console.log("ban dau: " + name)
        //console.log("value bd: " + values)

        var tang2thang = addMonths(new Date(values), 2)
        //console.log("tang 2 thang: " + tang2thang)

        var result = format(new Date(tang2thang), 'yyyy-MM-dd')
        //console.log("format lai: " + result)

        this.setState({
            HopdongBD: result
        })

    }


    handleSubmit(event) {
        event.preventDefault();
        
        var ktKyVaBatDau = compareAsc(
            new Date(event.target.HopdongBD.value),
            new Date(event.target.HopdongKY.value)
        )//=> -1 -> ngày bắt đầu làm < ngày ký
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
            fetch('https://localhost:44390/api/hopdongs', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ngayLapHd: event.target.HopdongKY.value,
                    ngayBatDau: event.target.HopdongBD.value,
                    ngayHetHan: event.target.HopdongKT.value,
                    ghiChu: event.target.HopdongGHICHU.value,
                    idloaiHd: 10,
                    idnhanVien: parseInt(event.target.NhanvienID.value),
                })
            })
                .then(res1 => res1.json())
                .then((result1) => {
                    //alert(result1);
                }, () => {
                    this.setState({ snackbaropen: true, snackbarmsg: 'Sửa thành công' })
                })
            fetch('https://localhost:44390/api/nhanviens/' + parseInt(event.target.NhanvienID.value), {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idnhanVien: parseInt(event.target.NhanvienID.value),
                    hoDem: this.props.nvho,
                    ten: this.props.nvten,
                    nguyenQuan: this.props.nvnguyenquan,
                    tinhTrangHonNhan: this.props.nvtinhtranghonnhan,
                    ngaySinh: this.props.nvngaysinh,
                    noiSinh: this.props.nvnoisinh,
                    gioiTinh: this.props.nvgioitinh,
                    //hinhAnh
                    diaChiThuongTru: this.props.nvdcthuongtru,
                    choOhienTai: this.props.nvchohientai,
                    soCmnn: this.props.nvsocmnd,
                    ngayCap: this.props.nvngaycap,
                    tonGiao: this.props.nvtongiao,
                    noiCap: this.props.nvnoicap,
                    quocTich: this.props.nvquoctich,
                    email: this.props.nvmail,
                    soDienThoai: this.props.nvsdt,
                    nganhHoc: this.props.nvnganhhoc,
                    noiDaoTao: this.props.nvnoidaotao,
                    xepLoai: this.props.nvxeploai,
                    //username
                    idphongBan: this.props.nvpb,
                    idchucVu: this.props.nvcv,
                    //idquanHeGd
                    trangthaiHdthuViec: "Đã ký",
                    iddanToc: this.props.nvdantoc,
                    idtrinhDo: this.props.nvdaotao,
                    //idquyetDinhBn
                    //nvdaotao: this.props.nvdaotao,


                })
            }).then(res => res.json())
                .then((result) => {
                    //alert(result);
                }, () => {
                    this.setState({ snackbaropen: true, snackbarmsg: 'Sửa thành công' })
                })
        }

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
                            LẬP HỢP ĐỒNG THỬ VIỆC
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={12} >
                                <Form onSubmit={this.handleSubmit}>
                                    <Row>
                                        <Col sm={6}>

                                            <Form.Group controlId="NhanvienID">
                                                <Form.Label>ID nhân viên</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="NhanvienID"
                                                    required
                                                    disabled
                                                    defaultValue={this.props.nvid}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="HopdongBD">
                                                <Form.Label>Thử việc từ ngày</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name="HopdongBD"
                                                    required
                                                    onChange={(event) => this.handleChange(event)}
                                                />
                                            </Form.Group>

                                        </Col>
                                        <Col sm={6}>

                                            <Form.Group controlId="NhanvHopdongKY">
                                                <Form.Label>Ngày lập hợp đồng</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name="HopdongKY"
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="HopdongKT">
                                                <Form.Label>Kết thúc ngày</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name="HopdongKT"
                                                    disabled
                                                    // value={format(new Date (this.state.HopdongBD), 'dd/MM/yyyy')}
                                                    value={this.state.HopdongBD}
                                                />
                                            </Form.Group>

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={12}>

                                            <Form.Group controlId="HopdongGHICHU">
                                                <Form.Label>Ghi chú</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="HopdongGHICHU"
                                                />
                                            </Form.Group>

                                        </Col>
                                    </Row>
                                    <Form.Group>
                                        <Button variant="primary" type="submit" onClick={this.props.onHide}>
                                            Xác nhận
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
