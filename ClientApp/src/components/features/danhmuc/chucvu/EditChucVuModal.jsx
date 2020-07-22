import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';


import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';


export class EditChucVuModal extends Component {
    //static displayName = EditchucvuModal.name;

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
        //alert(event.target.chucvuID.value)
        fetch('https://localhost:44390/api/chucvus/' + event.target.chucvuID.value, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idchucVu: parseInt(event.target.chucvuID.value),
                tenChucVu: event.target.chucvuTEN.value,
                moTa: event.target.chucvuMOTA.value
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
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Chỉnh sửa chức vụ
                </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6} >
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="chucvuID">
                                        <Form.Label>ID chức vụ</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="chucvuID"
                                            required
                                            disabled
                                            defaultValue={this.props.cvid}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="chucvuTEN">
                                        <Form.Label>Tên chức vụ</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="chucvuTEN"
                                            required
                                            defaultValue={this.props.cvten}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="chucvuMOTA">
                                        <Form.Label>Mô tả</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="chucvuMOTA"
                                            required
                                            defaultValue={this.props.cvmota}
                                        />
                                    </Form.Group>
                            
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Xác nhận sửa
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