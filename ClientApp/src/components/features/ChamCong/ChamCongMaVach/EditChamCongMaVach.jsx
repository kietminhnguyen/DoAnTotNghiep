import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { format, differenceInDays, getDate } from 'date-fns';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class EditChamCongMaVach extends Component {
    //static displayName = EditBangChamCong.name;

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

    handleSubmit(event) {
        event.preventDefault();
        // console.log(JSON.stringify({
        //     idchamCong:  parseInt(this.props.idchamcong),
        //     ngayChamCong: event.target.ChamCongNgay.value,
        //     gioVao: event.target.ChamCongGioVao.value,
        //     gioRa: event.target.ChamCongGioRa.value,
        //     soGioLam:null,
        //     ghiChu: event.target.ChamCongGhiChu.value,
        //     idnhanVien: parseInt(event.target.ChamCongIdNhanVien.value)
            
        // }))
        fetch('https://localhost:44390/api/chamcongs/'+parseInt(this.props.idchamcong), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idchamCong:  parseInt(this.props.idchamcong),
                ngayChamCong: event.target.ChamCongNgay.value,
                gioVao: event.target.ChamCongGioVao.value,
                gioRa: event.target.ChamCongGioRa.value,
                soGioLam:0,
                ghiChu: event.target.ChamCongGhiChu.value,
                idnhanVien: parseInt(event.target.ChamCongIdNhanVien.value)
                
            })
        })
        .then(res => res.json())
        .then((result) => {
            alert('ok');
        }, () => {
            this.setState({ snackbaropen: true, snackbarmsg: 'Sửa thành công' });
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
                            Chỉnh sửa chấm công thủ công
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
                                                            type="date"
                                                            name="ChamCongNgay"
                                                            required
                                                            disabled
                                                            defaultValue={this.props.ccngay}
                                                            placeholder="Ngày Chấm Công"
                                                        />
                                                    </Form.Group>
                                                </Col>

                                                <Col sm={4}>
                                                    <Form.Group controlId="ChamCongIdNhanVien">
                                                        <Form.Label>ID Nhân Viên</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="ChamCongIdNhanVien"
                                                            required
                                                            disabled
                                                            defaultValue={this.props.ccidnv}
                                                            placeholder="ID Nhân Viên"
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
                                                            defaultValue={this.props.ccgiovao}
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
                                                            defaultValue={this.props.ccgiora}
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
                                            Sửa Chấm Công
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
