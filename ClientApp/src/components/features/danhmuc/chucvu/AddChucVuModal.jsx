import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';


import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class AddChucVuModal extends Component {
    //static displayName = AddChucvuModal.name;

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
        //alert(event.target.ChucvuTEN.value)
        fetch('https://localhost:44390/api/Chucvus', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                //id : null,
                tenChucVu: event.target.ChucvuTEN.value,
                heSoChucVu: event.target.ChucvuHESO.value,
                moTa: event.target.ChucvuMOTA.value
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
                            Thêm mới chức vụ
                </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="ChucvuTEN">
                                        <Form.Label>Tên chức vụ</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="ChucvuTEN"
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="ChucvuHESO">
                                        <Form.Label>Hệ số chức vụ</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="ChucvuHESO"
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="ChucvuMOTA">
                                        <Form.Label>Mô tả</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="ChucvuMOTA"
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit" >
                                            Xác nhận
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
