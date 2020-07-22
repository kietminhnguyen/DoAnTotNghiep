import React, { Component } from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';


export class EditNhanVienModal extends Component {
    //static displayName = EditPhongbanModal.name;

    constructor(props) {
        super(props);
        this.state = {
            pbs: [],
            dts: [],
            daotaos: [],
            cvs: [],
            snackbaropen: false,
            snackbarmsg: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
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

    componentDidMount() {
        this.loadPhongBan()
        this.loadDanToc()
        this.loadDaoTao()
        this.loadChucVu()
    }

    SnackbarClose = (event) => {
        this.setState({ snackbaropen: false });
    };

    handleSubmit(event) {
        event.preventDefault();
        //alert(this.props.nvtrangthaiHdthuViec)
        fetch('https://localhost:44390/api/nhanviens/' + event.target.NhanvienID.value, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idnhanVien: parseInt(event.target.NhanvienID.value),
                hoDem: event.target.NhanvienHO.value,
                ten: event.target.NhanvienTEN.value,
                //nguyenQuan: event.target.NhanvienNguyenQuan.value,
                tinhTrangHonNhan: event.target.NhanvienTinhTrangHonNhan.value,
                ngaySinh: event.target.NhanvienNgaySinh.value,
                noiSinh: event.target.NhanvienNoiSinh.value,
                gioiTinh: event.target.NhanvienGIOITINH.value,
                //hinhanh
                diaChiThuongTru: event.target.NhanvienDiaChi.value,
                choOhienTai: event.target.NhanvienChoOHienTai.value,
                soCmnn: event.target.NhanvienSoCMNN.value,
                ngayCap: event.target.NhanvienNgNgayCapCMMM.value,
                tonGiao: event.target.NhanvienTonGiao.value,
                noiCap: event.target.NhanvienNoiCap.value,
                quocTich: event.target.NhanvienQuocTich.value,
                email: event.target.NhanvienEmail.value,
                soDienThoai: event.target.NhanvienSDT.value,
                nganhHoc: null,
                noiDaoTao: event.target.NhanvienNoiDaoTao.value,/////////
                xepLoai: event.target.NhanvienXepLoai.value,
                //username
                idphongBan: parseInt(event.target.NhanvienPB.value),
                idchucVu: parseInt(event.target.NhanvienCV.value),
                //idquanHeGd
                ////trangThaiHoSo=> trangthaiHDThuViec, trangthaiHDChinhThuc,
                trangthaiHdthuViec: this.props.nvtrangthaiHdthuViec,
                trangthaiHdchinhThuc: this.props.nvtrangthaiHdchinhThuc,
                iddanToc: parseInt(event.target.NhanvienDanToc.value),
                idtrinhDo: parseInt(event.target.NhanvienTrinhDoDaoTao.value),
                //idquyetDinhBn
            })
        })

            .then(res => res.json())
            .then((result) => {
                alert(result);
            }, () => {
                this.setState({ snackbaropen: true, snackbarmsg: 'Sửa thành công' })
            })
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
                    //show={this.props.show}
                    {...this.props}
                    size="xl"
                    //aria-labelledby="example-modal-sizes-title-lg"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title >
                            Chỉnh sửa thông tin nhân viên
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row >
                            <Col sm={12} >
                                <Form onSubmit={this.handleSubmit}>
                                    <Row >

                                        <Col sm={3}>
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

                                            <Form.Group controlId="NhanvienPB">
                                                <Form.Label>Thuộc phòng ban</Form.Label>
                                                <Form.Control as="select" defaultValue={this.props.nvpb}>
                                                    {this.state.pbs.map(pb =>
                                                        <option key={pb.idphongBan} value={pb.idphongBan}>{pb.tenPhongBan}</option>)}
                                                </Form.Control>
                                            </Form.Group>

                                            <Form.Group controlId="NhanvienCV">
                                                <Form.Label>Chức vụ</Form.Label>
                                                <Form.Control as="select" defaultValue={this.props.nvcv}>
                                                    {this.state.cvs.map(cv =>
                                                        <option key={cv.idchucVu} value={cv.idchucVu}>{cv.tenChucVu}</option>)}
                                                </Form.Control>
                                            </Form.Group>

                                            <Form.Group controlId="NhanvienSoCMNN">
                                                <Form.Label>Số CMNN</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="NhanvienSoCMNN"
                                                    //disabled
                                                    required
                                                    defaultValue={this.props.nvsocmnd}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="NhanvienDanToc">
                                                <Form.Label>Dân Tộc</Form.Label>
                                                <Form.Control as="select" defaultValue={this.props.nvdantoc}>
                                                    {this.state.dts.map(dt =>
                                                        <option key={dt.iddanToc} value={dt.iddanToc}>{dt.tenDanToc}</option>)}
                                                </Form.Control>
                                            </Form.Group>

                                            <Form.Group controlId="NhanvienTrinhDoDaoTao">
                                                <Form.Label>Trình độ đào tạo</Form.Label>
                                                <Form.Control as="select" defaultValue={this.props.nvdaotao}>
                                                    {this.state.daotaos.map(dt2 =>
                                                        <option key={dt2.idtrinhDo} value={dt2.idtrinhDo}>{dt2.tenTrinhDo}</option>)}
                                                </Form.Control>
                                            </Form.Group>

                                        </Col>



                                        <Col sm={3}>
                                            <Form.Group controlId="NhanvienHO">
                                                <Form.Label>Họ đệm</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="NhanvienHO"
                                                    //disabled
                                                    required
                                                    defaultValue={this.props.nvho}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="NhanvienNgaySinh">
                                                <Form.Label>Ngày Sinh</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name="NhanvienNgaySinh"
                                                    //disabled
                                                    required
                                                    defaultValue={this.props.nvngaysinh}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="NhanvienGIOITINH">
                                                <Form.Label>Giới tính</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="NhanvienGIOITINH"
                                                    //disabled
                                                    required
                                                    defaultValue={this.props.nvgioitinh}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="NhanvienNgNgayCapCMMM">
                                                <Form.Label>Ngày Cấp CMNN</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name="NhanvienNgNgayCapCMMM"
                                                    //disabled
                                                    required
                                                    defaultValue={this.props.nvngaycap}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="NhanvienSDT">
                                                <Form.Label>Số điện thoại</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="NhanvienSDT"
                                                    //disabled
                                                    required
                                                    defaultValue={this.props.nvsdt}
                                                />
                                            </Form.Group>

                                        </Col>

                      
                                        <Col sm={2}>
                                            <Form.Group controlId="NhanvienTEN">
                                                <Form.Label>Tên</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="NhanvienTEN"
                                                    //disabled
                                                    required
                                                    defaultValue={this.props.nvten}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="NhanvienTonGiao">
                                                <Form.Label>Tôn giáo</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="NhanvienTonGiao"
                                                    //disabled
                                                    required
                                                    defaultValue={this.props.nvtongiao}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="NhanvienNoiCap">
                                                <Form.Label>Nơi cấp </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="NhanvienNoiCap"
                                                    //disabled
                                                    required
                                                    defaultValue={this.props.nvnoicap}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="NhanvienXepLoai">
                                                <Form.Label>Xếp loại</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="NhanvienXepLoai"
                                                    //disabled
                                                    required
                                                    defaultValue={this.props.nvxeploai}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="NhanvienQuocTich">
                                                <Form.Label>Quốc tịch</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="NhanvienQuocTich"
                                                    //disabled
                                                    required
                                                    defaultValue={this.props.nvquoctich}
                                                />

                                            </Form.Group>
                                        </Col>

                                        

                                        <Col sm={4}>
                                            <Form.Group controlId="NhanvienDiaChi">
                                                <Form.Label>Địa chỉ thường trú</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="NhanvienDiaChi"
                                                    //disabled
                                                    required
                                                    defaultValue={this.props.nvdcthuongtru}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="NhanvienChoOHienTai">
                                                <Form.Label>Chỗ ở hiện tại</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="NhanvienChoOHienTai"
                                                    //disabled
                                                    required
                                                    defaultValue={this.props.nvchohientai}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="NhanvienEmail">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="NhanvienEmail"
                                                    //disabled
                                                    required
                                                    defaultValue={this.props.nvmail}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="NhanvienNoiSinh">
                                                <Form.Label>Nơi sinh</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="NhanvienNoiSinh"
                                                    //disabled
                                                    required
                                                    defaultValue={this.props.nvnoisinh}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="NhanvienTinhTrangHonNhan">
                                                <Form.Label>Tình trạng hôn nhân</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="NhanvienTinhTrangHonNhan"
                                                    //disabled
                                                    required
                                                    defaultValue={this.props.nvtinhtranghonnhan}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="NhanvienNoiDaoTao">
                                                <Form.Label>Trạng thái bổ nhiệm</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="NhanvienNoiDaoTao"
                                                    disabled
                                                    required
                                                    defaultValue={this.props.nvnoidaotao}
                                                />
                                            </Form.Group>

                                        </Col>

                                    </Row>
                                    <Form.Group>
                                        <Button variant="primary" type="submit" onClick={this.props.onHide}>
                                            XÁC NHẬN
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Đóng</Button>
                    </Modal.Footer>
                </Modal>
            </div >
        );
    }
}