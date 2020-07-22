import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { format, getMonth, getYear } from 'date-fns';

import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class AddTamUng extends Component {
    //static displayName = AddChamCongThuCong.name;

    constructor(props) {
        super(props);

        this.state = {
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
                tongTien= tongTien + parseInt(this.state.tamungluongs[i].soTienTamUng)
            }
        }
        console.log("đã ứng: "+tongTien)
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
                    idnhanVien: parseInt(this.props.idnv),
                    soTienTamUng: event.target.TamUngSOTIEN.value,
                    lyDoTamUng: event.target.TamUngLYDO.value,
                    ghiChu: event.target.ChamCongGhiChu.value,
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
                            Tạm ứng lương
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
                                                    <Form.Group controlId="TamUngNgay">
                                                        <Form.Label>Ngày Tạm Ứng</Form.Label>
                                                        <Form.Control
                                                            type="date"
                                                            name="TamUngNgay"
                                                            required
                                                            disabled
                                                            defaultValue={format(new Date(), 'yyyy-MM-dd')}
                                                            //onChange={(event) => this.handleChange(event)}
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

                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={6}>
                                                    <Form.Group controlId="TamUngSOTIEN">
                                                        <Form.Label>Số tiền</Form.Label>
                                                        <Form.Control
                                                            type='text'
                                                            name="TamUngSOTIEN"
                                                            required

                                                        />
                                                    </Form.Group>
                                                </Col>

                                                <Col sm={6}>
                                                    <Form.Group controlId="TamUngLYDO">
                                                        <Form.Label>Lý do</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="TamUngLYDO"
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
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Form.Group>
                                        <Button variant="info" type="submit" onClick={this.props.onHide}>
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
