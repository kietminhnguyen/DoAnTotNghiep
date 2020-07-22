import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';


import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';


export class ShowUngVienModal extends Component {
    //static displayName = EditPhongbanModal.name;

    constructor(props) {
        super(props);
        this.state = {
            dts: [],
            daotaos: []
        };
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



    componentDidMount() {
        fetch('https://localhost:44390/api/ungviens')
            .then(respone => respone.json())
            .then(data => {
                this.setState({ pbs: data })
            })
        this.loadDanToc()
        this.loadDaoTao()
    }


    render() {
        return (
            <div className="container">
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Thông tin nhân viên
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={12} >
                                <Form>
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
                                                    disabled
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

                                            {/* <Form.Group controlId="UngvienNganhHoc">
                                                <Form.Label>Ngành học</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="UngvienNganhHoc"
                                                    required
                                                    defaultValue={this.props.uvnganhhoc}

                                                />
                                            </Form.Group> */}

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
                                                <Form.Label>Giới tính</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="UngvienGIOITINH"
                                                    required
                                                    defaultValue={this.props.uvgioitinh}
                                                />
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
                                                    {this.state.daotaos.map(daotao =>
                                                        <option key={daotao.idtrinhDo} value={daotao.idtrinhDo}>{daotao.tenTrinhDo}</option>)}
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