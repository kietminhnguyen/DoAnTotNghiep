import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { format, differenceInDays, getDate } from 'date-fns';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class AddChamCongTangCa extends Component {
    //static displayName = AddChamCongTangCa.name;

    constructor(props) {
        super(props);

        this.state = {
            chamcongs: [],
            snackbaropen: false,
            snackbarmsg: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    SnackbarClose = (event) => {
        this.setState({ snackbaropen: false });
    };

    componentDidMount() {
       
    }

    // getdatenow() {
    //     var date = new Date()
    //     var ngay = date.getDate()
    //     var thang = date.getMonth() + 1
    //     var nam = date.getFullYear()
    //     var hientai = ngay + "-" + thang + "-" + nam
    //     var DMY = format(new Date(hientai), 'dd-MM-yyyy')
    //     console.log(DMY)
    // }
    handleSubmit(event) {
        event.preventDefault();
        fetch('https://localhost:44390/api/chamcongs', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // idchamCong:  parseInt(event.target.NhanvienHO.value),
                ngayChamCong: event.target.ChamCongNgay.value,
                gioVao: event.target.ChamCongGioVao.value,
                gioRa: event.target.ChamCongGioRa.value,
                ghiChu: event.target.ChamCongGhiChu.value,
                idnhanVien: parseInt(this.props.idnv)
            })
        })
            .then(res => res.json())
            .then(() => {
               
                this.setState({ snackbaropen: true, snackbarmsg: "Thêm thành công" });
            })

    }

    render() {
        var date = new Date()
        var ngay = date.getDate()
        var thang = date.getMonth() + 1
        var nam = date.getFullYear()
        var hientai = ngay + "-" + thang + "-" + nam
        var DMY = format(new Date(), 'yyyy-MM-dd')
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
                            Chấm công thủ công tăng ca
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row >
                            <Col sm={12} >
                                <Form onSubmit={this.handleSubmit}>
                                    <Row >
                                        <Col>
                                            <Row>
                                                <Col sm={4}>
                                                    <Form.Group controlId="ChamCongNgay">
                                                        <Form.Label>Ngày Chấm Công</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="ChamCongNgay"
                                                            required
                                                            disabled
                                                            defaultValue={DMY}
                                                        />
                                                    </Form.Group>
                                                </Col>

                                                <Col sm={4}>
                                                    <Form.Group controlId="ChamCongHoDem">
                                                        <Form.Label>Họ đệm</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="ChamCongHoDem"
                                                            required
                                                            disabled
                                                            defaultValue={this.props.cchodem}
                                                            placeholder="Họ đệm nhân viên"
                                                        />
                                                    </Form.Group>
                                                </Col>

                                                <Col sm={4}>
                                                <Form.Group controlId="ChamCongTen">
                                                        <Form.Label>Tên</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="ChamCongTen"
                                                            required
                                                            disabled
                                                            defaultValue={this.props.ccten}
                                                            placeholder="Tên nhân viên"
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={6}>
                                                <Form.Group controlId="ChamCongGioVao">
                                                        <Form.Label>Giờ Vào</Form.Label>
                                                        <Form.Control
                                                            type="time"
                                                            name="ChamCongGioVao"
                                                            required
                                                            //defaultValue={this.props.ccgiovao}
                                                            placeholder="Giờ Vào"
                                                        />
                                                    </Form.Group>
                                                </Col>

                                                <Col sm={6}>
                                                <Form.Group controlId="ChamCongGioRa">
                                                        <Form.Label>Giờ Ra</Form.Label>
                                                        <Form.Control
                                                            type="time"
                                                            name="ChamCongGioRa"
                                                            required
                                                            //defaultValue={this.props.ccgiora}
                                                            placeholder="Giờ Ra"
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={12}>
                                                <Form.Group controlId="ChamCongGhiChu">
                                                <Form.Label>Ghi Chú</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="ChamCongGhiChu"
                                                    required
                                                    defaultValue={this.props.ccghichu}
                                                    placeholder="Ghi Chú"
                                                />
                                            </Form.Group>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Form.Group>
                                        <Button variant="info" type="submit">
                                            Chấm Công
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
