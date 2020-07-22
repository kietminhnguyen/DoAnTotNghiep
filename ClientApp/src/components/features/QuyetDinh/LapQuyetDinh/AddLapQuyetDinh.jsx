import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { format, endOfMonth, addMonths } from 'date-fns'

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class AddLapQuyetDinh extends Component {
    //static displayName = AddKhenThuong.name;

    constructor(props) {
        super(props);

        this.state = {
            nhanviens: [],
            QDHetHan: 'yyyy-MM-dd',
            snackbaropen: false,
            snackbarmsg: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    SnackbarClose = (event) => {
        this.setState({ snackbaropen: false });
    };

    handleSubmit(event) {
        event.preventDefault();
        //alert(event.target.PhongbanTEN.value)
        fetch('https://localhost:44390/api/quyetdinhkts', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tenQuyetDinh: event.target.QUYETDINHten.value,
                ngayLap: event.target.QUYETDINHngaylap.value,
                hoDem: event.target.QUYETDINHhodem.value,
                ten: event.target.QUYETDINHtennv.value,
                idnhanVien: parseInt(event.target.QUYETDINHidnhanvien.value),
                ngayHieuLuc: event.target.QUYETDINHngayhieuluc.value,
                ngayHetHieuLuc: event.target.QUYETDINHngayhethieuluc.value,
                noiDung: event.target.QUYETDINHnoidung.value,
                soTienThuong: parseInt(event.target.QUYETDINHtienthuong.value),
                ghiChu: event.target.QUYETDINHghichu.value
            })
        })
            .then(res => res.json())
            .then(() => {
                //alert('thanh cong');
                this.setState({ snackbaropen: true, snackbarmsg: "Thêm thành công" });
            })
    }

    handleChange = (event) => {
        const name = event.target.name;
        const values = event.target.value;
        var endMonth = endOfMonth(new Date(values))
        var result = format(new Date(endMonth), 'yyyy-MM-dd')

        this.setState({
            QDHetHan: result
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
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Khen thưởng nhân viên
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row >
                            <Col sm={12} >
                                <Form onSubmit={this.handleSubmit}>
                                    <Row >
                                        <Col>
                                            {/* Hàng Thứ 1 */}
                                            <Row>
                                                <Col sm={4}>
                                                    <Form.Group controlId="QUYETDINHidnhanvien">
                                                        <Form.Label>ID Nhân Viên</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="QUYETDINHidnhanvien"
                                                            required
                                                            disabled
                                                            defaultValue={this.props.qdidnv}
                                                            placeholder="ID Nhân Viên"

                                                        />
                                                    </Form.Group>
                                                </Col>

                                                <Col sm={4}>
                                                    <Form.Group controlId="QUYETDINHhodem">
                                                        <Form.Label>Họ Đệm</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="QUYETDINHhodem"
                                                            required
                                                            disabled
                                                            defaultValue={this.props.qdhodem}
                                                            placeholder="Họ Đệm"
                                                        />
                                                    </Form.Group>
                                                </Col>

                                                <Col sm={4}>
                                                    <Form.Group controlId="QUYETDINHtennv">
                                                        <Form.Label>Tên</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="QUYETDINHtennv"
                                                            required
                                                            disabled
                                                            defaultValue={this.props.qdtennv}
                                                            placeholder="Tên nhân viên"

                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            {/* Hàng Thứ 2 */}
                                            <Row>
                                                <Col sm={6}>
                                                    <Form.Group controlId="QUYETDINHten">
                                                        <Form.Label>Tên quyết định khen thưởng</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="QUYETDINHten"
                                                            required
                                                            //={this.props.qdten}
                                                            placeholder="Tên quyết định"
                                                        />
                                                    </Form.Group>
                                                </Col>

                                                <Col sm={6}>
                                                    <Form.Group controlId="QUYETDINHtienthuong">
                                                        <Form.Label>Số Tiền Thưởng</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="QUYETDINHtienthuong"
                                                            required
                                                            //={this.props.qdtienthuong}
                                                            placeholder="Số Tiền Thưởng"
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            {/* Hàng Thứ 3 */}
                                            <Row>
                                                <Col sm={4}>
                                                    <Form.Group controlId="QUYETDINHngaylap">
                                                        <Form.Label>Ngày Lập</Form.Label>
                                                        <Form.Control
                                                            type="date"
                                                            name="QUYETDINHngaylap"
                                                            required
                                                            //={this.props.qdngyathanhlap}

                                                        />
                                                    </Form.Group>
                                                </Col>

                                                <Col sm={4}>
                                                    <Form.Group controlId="QUYETDINHngayhieuluc">
                                                        <Form.Label>Ngày Hiệu Lực</Form.Label>
                                                        <Form.Control
                                                            type="date"
                                                            name="QUYETDINHngayhieuluc"
                                                            required
                                                            //={this.props.qdngayhieuluc}
                                                            onChange={(event) => this.handleChange(event)}
                                                        />
                                                    </Form.Group>
                                                </Col>

                                                <Col sm={4}>
                                                    <Form.Group controlId="QUYETDINHngayhethieuluc">
                                                        <Form.Label>Ngày Hết Hiệu Lực</Form.Label>
                                                        <Form.Control
                                                            type="date"
                                                            name="QUYETDINHngayhethieuluc"
                                                            required
                                                            disabled
                                                            //={this.props.qdngayhethieuluc}
                                                            value={this.state.QDHetHan}
                                                        />
                                                    </Form.Group>

                                                </Col>
                                            </Row>


                                            <Row>
                                                <Col sm={6}>
                                                    <Form.Group controlId="QUYETDINHnoidung">
                                                        <Form.Label>Nội Dung Quyết Định </Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="QUYETDINHnoidung"
                                                            required
                                                            //={this.props.qdnoidung}
                                                            placeholder="Nội Dung Quyết Định"
                                                        />
                                                    </Form.Group>
                                                </Col>

                                                <Col sm={6}>
                                                    <Form.Group controlId="QUYETDINHghichu">
                                                        <Form.Label>Ghi Chú</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="QUYETDINHghichu"
                                                            //required
                                                            //={this.props.qdghichu}
                                                            placeholder="Ghi Chú"
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
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
        )
    }
}
