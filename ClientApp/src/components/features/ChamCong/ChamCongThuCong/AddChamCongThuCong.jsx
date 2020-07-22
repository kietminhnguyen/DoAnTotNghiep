import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { format, differenceInDays, getDate, compareAsc, addMonths } from 'date-fns';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class AddChamCongThuCong extends Component {
    //static displayName = AddChamCongThuCong.name;

    constructor(props) {
        super(props);

        this.state = {
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

    handleSubmit(event) {
        event.preventDefault();
        console.log(event.target.ChamCongNgay.value)
        console.log(event.target.ChamCongGioVao.value)
        console.log(event.target.ChamCongGioRa.value)
        console.log(parseInt(this.props.idnv))
        let co = false
        for (let i = 0; i < this.state.chamcongs.length; i++) {
            //for(let j=0; j< this.state.nhanviens.length; j++){
            if (this.state.chamcongs[i].ngayChamCong.substring(0, 10) == this.state.ChamCongNgay
                && parseInt(this.props.idnv) == parseInt(this.state.chamcongs[i].idnhanVien)) {
                co = true
            }
        }
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
                            Chấm công thủ công
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
                                                            onChange={(event) => this.handleChange(event)}
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
                                                    <Form.Group controlId="ChamCongGioVao">
                                                        <Form.Label>Giờ vào</Form.Label>
                                                        <Form.Control
                                                            type="time"
                                                            name="ChamCongGioVao"
                                                            required

                                                        />
                                                    </Form.Group>
                                                </Col>

                                                <Col sm={6}>
                                                    <Form.Group controlId="ChamCongGioRa">
                                                        <Form.Label>Giờ ra</Form.Label>
                                                        <Form.Control
                                                            type="time"
                                                            name="ChamCongGioRa"
                                                            required

                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            {/* <Row>
                                                <Col sm={12}>
                                                    <Form.Group controlId="ChamCongGhiChu">
                                                        <Form.Label>Ghi Chú</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="ChamCongGhiChu"

                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row> */}
                                        </Col>
                                    </Row>
                                    <Form.Group>
                                        <Button variant="info" type="submit" onClick={this.props.onHide}>
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
