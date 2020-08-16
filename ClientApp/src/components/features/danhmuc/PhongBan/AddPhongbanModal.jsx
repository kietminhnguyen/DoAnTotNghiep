import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';


import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class AddPhongbanModal extends Component {
    //static displayName = AddPhongbanModal.name;

    constructor(props) {
        super(props);

        this.state = { snackbaropen: false, snackbarmsg: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    SnackbarClose = (event) => {
        this.setState({ snackbaropen: false });
    };

    handleSubmit(event) {
        event.preventDefault();
        //alert(event.target.PhongbanTEN.value)
        fetch('https://localhost:44390/api/phongbans', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                //id : null,
                tenPhongBan: event.target.PhongbanTEN.value,
                //tenTruongPhong: event.target.PhongbanTRUONG.value,
                moTa: event.target.PhongbanMOTA.value
            })
        })
            .then(res => res.json())
            .then(() => {
                //alert('thanh cong');
                this.setState({ snackbaropen: true, snackbarmsg: "Thêm thành công" });
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
                            Thêm mới phòng ban
                </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="PhongbanTEN">
                                        <Form.Label>Tên phòng ban</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="PhongbanTEN"
                                            required
                                            placeholder="Tên phòng ban"
                                        />
                                    </Form.Group>
                                    {/* <Form.Group controlId="PhongbanTRUONG">
                                        <Form.Label>Tên trưởng phòng</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="PhongbanTRUONG"
                                            required
                                            placeholder="Tên trưởng phòng"
                                        />
                                    </Form.Group> */}
                                    <Form.Group controlId="PhongbanMOTA">
                                        <Form.Label>Mô tả</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="PhongbanMOTA"
                                            required
                                            placeholder="Mô tả"
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit" >
                                            Thêm phòng ban mới
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
