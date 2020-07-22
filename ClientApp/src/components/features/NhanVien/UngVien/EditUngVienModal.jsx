import React, { Component } from 'react';
import { Modal, Row, Col, Form } from 'react-bootstrap';
import { Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, Input } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';


export class EditUngVienModal extends Component {
    //static displayName = EditPhongbanModal.name;

    constructor(props) {
        super(props);
        this.state = {
            dts: [],
            daotaos: [],

            snackbaropen: false,
            snackbarmsg: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        //this.handleChangeGioiTinh = this.handleChangeGioiTinh.bind(this)
    }

    SnackbarClose = (event) => {
        this.setState({ snackbaropen: false });
    };

    
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

    handleSubmit(event) {
        event.preventDefault();
        //alert(parseInt(event.target.UngvienID.value))
        fetch('https://localhost:44390/api/ungviens/' + event.target.UngvienID.value, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idungVien: event.target.UngvienID.value,
                hoDem: event.target.UngvienHO.value,
                ten: event.target.UngvienTEN.value,
                tinhTrangHonNhan: event.target.UngvienTinhTrangHonNhan.value,
                ngaySinh: event.target.UngvienNgaySinh.value,
                gioiTinh: event.target.UngvienGIOITINH.value,
                //gioiTinh: this.state.chonGioiTinh,
                //hinhanh 
                diaChiThuongTru: event.target.UngvienDiaChi.value,
                choOhienTai: event.target.UngvienChoOHienTai.value,
                soCmnn: event.target.UngvienSoCMNN.value,
                ngayCap: event.target.UngvienNgNgayCapCMMM.value,
                tonGiao: event.target.UngvienTonGiao.value,
                noiCap: event.target.UngvienNoiCap.value,
                quocTich: event.target.UngvienQuocTich.value,
                email: event.target.UngvienEmail.value,
                soDienThoai: event.target.UngvienSDT.value,
                //nganhHoc: event.target.UngvienNganhHoc.value,
                noiDaoTao: null,
                idtrinhDo: parseInt(event.target.UngvienTrinhDoDaoTao.value),
                xepLoai: event.target.UngvienXepLoai.value,
                iddanToc: parseInt(event.target.UngvienDanToc.value),
                noiSinh: event.target.UngvienNoiSinh.value,
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
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Chỉnh sửa thông tin ứng viên
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={12} >
                                <Form onSubmit={this.handleSubmit}>
                                    <Row >
                                        {/* CỘT THỨ 1 */}
                                        <Col sm={3}>

                                            <Form.Group controlId="UngvienID">
                                                <Form.Label>ID ứng viên</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="UngvienID"
                                                    required
                                                    disabled
                                                    defaultValue={this.props.uvid}
                                                    placeholder="ID ứng viên"
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="UngvienHO">
                                                <Form.Label>Họ đệm</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="UngvienHO"
                                                    required
                                                    defaultValue={this.props.uvho}

                                                />
                                            </Form.Group>

                                            <Form.Group controlId="UngvienTEN">
                                                <Form.Label>Tên</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="UngvienTEN"
                                                    required
                                                    defaultValue={this.props.uvten}

                                                />
                                            </Form.Group>

                                            <Form.Group controlId="UngvienSoCMNN">
                                                <Form.Label>Số CMNN</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="UngvienSoCMNN"
                                                    required
                                                    defaultValue={this.props.uvsocmnd}

                                                />
                                            </Form.Group>

                                            <Form.Group controlId="UngvienDanToc">
                                                <Form.Label>Dân Tộc</Form.Label>
                                                <Form.Control as="select" defaultValue={this.props.uvdantoc}>
                                                    {this.state.dts.map(dt =>
                                                        <option key={dt.iddanToc} value={dt.iddanToc}>{dt.tenDanToc}</option>)}
                                                </Form.Control>
                                            </Form.Group>

                                        </Col>

                                        {/* CỘT THỨ 2 */}
                                        <Col sm={3}>

                                            <Form.Group controlId="UngvienNoiSinh">
                                                <Form.Label>Nơi sinh</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="UngvienNoiSinh"
                                                    required
                                                    defaultValue={this.props.uvnoisinh}

                                                />
                                            </Form.Group>

                                            <Form.Group controlId="UngvienNgaySinh">
                                                <Form.Label>Ngày Sinh</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name="UngvienNgaySinh"
                                                    required
                                                    defaultValue={this.props.uvngaysinh}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="UngvienNgNgayCapCMMM">
                                                <Form.Label>Ngày Cấp CMNN</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name="UngvienNgNgayCapCMMM"
                                                    required
                                                    defaultValue={this.props.uvngaycap}

                                                />
                                            </Form.Group>

                                            <Form.Group controlId="UngvienSDT">
                                                <Form.Label>Số điện thoại</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="UngvienSDT"
                                                    required
                                                    defaultValue={this.props.uvsdt}

                                                />
                                            </Form.Group>

                                        </Col>

                                        {/* CỘT THỨ 3 */}
                                        <Col sm={2}>

                                            <Form.Group controlId="UngvienGIOITINH">
                                                {/* <StyledGioiTinh variant="outlined" size="small">
                                                    <InputLabel id="demo-simple-select-outlined-label">Giới tính</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        label="Giới tính"
                                                        name="chonGioiTinh"
                                                        defaultValue={this.props.uvgioitinh}
                                                        value={this.state.chonGioiTinh}
                                                        onChange={this.handleChangeGioiTinh}
                                                    >
                                                        <MenuItem value="Nam">Nam</MenuItem>
                                                        <MenuItem value="Nữ">Nữ</MenuItem>
                                                    </Select>
                                                </StyledGioiTinh> */}
                                                <TextField
                                                    size="small"
                                                    variant="outlined"
                                                    select
                                                    name="UngvienGIOITINH"
                                                    label="Giới tính"
                                                    defaultValue={this.props.uvgioitinh}
                                                >
                                                    <MenuItem value="Nam">Nam</MenuItem>
                                                    <MenuItem value="Nữ">Nữ</MenuItem>
                                                </TextField>

                                            </Form.Group>

                                            <Form.Group controlId="UngvienTonGiao">
                                                <Form.Label>Tôn giáo</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="UngvienTonGiao"
                                                    required
                                                    defaultValue={this.props.uvtongiao}

                                                />
                                            </Form.Group>

                                            <Form.Group controlId="UngvienNoiCap">
                                                <Form.Label>Nơi cấp </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="UngvienNoiCap"
                                                    required
                                                    defaultValue={this.props.uvnoicap}

                                                />
                                            </Form.Group>

                                            <Form.Group controlId="UngvienXepLoai">
                                                <Form.Label>Xếp loại</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="UngvienXepLoai"
                                                    required
                                                    defaultValue={this.props.uvxeploai}

                                                />
                                            </Form.Group>

                                            <Form.Group controlId="UngvienQuocTich">
                                                <Form.Label>Quốc tịch</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="UngvienQuocTich"
                                                    required
                                                    defaultValue={this.props.uvquoctich}

                                                />
                                            </Form.Group>
                                        </Col>

                                        {/* CỘT THỨ 4 */}
                                        <Col sm={4}>

                                            <Form.Group controlId="UngvienDiaChi">
                                                <Form.Label>Địa chỉ thường trú</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="UngvienDiaChi"
                                                    required
                                                    defaultValue={this.props.uvdcthuongtru}

                                                />
                                            </Form.Group>

                                            <Form.Group controlId="UngvienChoOHienTai">
                                                <Form.Label>Chỗ ở hiện tại</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="UngvienChoOHienTai"
                                                    required
                                                    defaultValue={this.props.uvchohientai}

                                                />
                                            </Form.Group>

                                            <Form.Group controlId="UngvienTrinhDoDaoTao">
                                                <Form.Label>Trình độ đào tạo</Form.Label>
                                                <Form.Control as="select" defaultValue={this.props.uvdaotao}>
                                                    {this.state.daotaos.map(dt2 =>
                                                        <option key={dt2.idtrinhDo} value={dt2.idtrinhDo}>{dt2.tenTrinhDo}</option>)}
                                                </Form.Control>
                                            </Form.Group>

                                            {/* <Form.Group controlId="UngvienNoiDaoTao">
                                                <Form.Label>Nơi đào tạo</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="UngvienNoiDaoTao"
                                                    required
                                                    defaultValue={this.props.uvnoidaotao}

                                                />
                                            </Form.Group> */}

                                            <Form.Group controlId="UngvienTinhTrangHonNhan">
                                                <Form.Label>Tình trạng hôn nhân</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="UngvienTinhTrangHonNhan"
                                                    required
                                                    defaultValue={this.props.uvtinhtranghonnhan}

                                                />
                                            </Form.Group>

                                            <Form.Group controlId="UngvienEmail">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="UngvienEmail"
                                                    required
                                                    defaultValue={this.props.uvmail}

                                                />
                                            </Form.Group>

                                        </Col>

                                    </Row>
                                    <Form.Group>
                                        <Button variant="primary" type="submit" onClick={this.props.onHide}>
                                            Sửa ứng viên
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
            </div>
        );
    }
}