import React, { Component } from 'react';

import { Modal, Row, Col, Form } from 'react-bootstrap';
import { Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, Input } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import AppCSS from '../../../../AppCSS.css'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

const StyledGioiTinh = withStyles((theme) => ({
    root: {
        minWidth: 120
    },
}))(TextField);

const StyledNgay = withStyles((theme) => ({
    root: {
        width: 170
    },
}))(TextField);

const StyledKeID = withStyles((theme) => ({
    root: {
        width: 255
    },
}))(TextField);

const StyledHonNhan = withStyles((theme) => ({
    root: {
        width: 165
    },
}))(TextField);

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);


export class AddUngVienModal extends Component {
    //static displayName = AddPhongbanModal.name;

    constructor(props) {
        super(props);

        this.state = {
            url: "",
            dts: [],
            daotaos: [],

            snackbaropen: false,
            snackbarmsg: '',
            UngvienHO: null,
            UngvienTEN: null,
            UngvienEmail: null,

            formErrors: {
                UngvienHO: "*",
                UngvienTEN: "*",
                UngvienEmail: "*",
                UngvienSoCMNN: "*",
                UngvienSDT: "*",
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeValid = this.handleChangeValid.bind(this)
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

    layGiaTriMacDinhDanToc = (iddantoc) => {
        if (iddantoc == "Kinh") {
            return 1
        }
    }

    layGiaTriMacDinhTrinhDo = (iddaotao) => {
        if (iddaotao == "Đại học") {
            return 8
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        //console.log("b: " + event.target.UngvienTEN.value)
        if (this.state.formErrors.UngvienTEN == "" // nếu không đỏ sẽ post đc
            && this.state.formErrors.UngvienHO == ""
            && this.state.formErrors.UngvienEmail == ""

            && event.target.UngvienTEN.value != "" // gõ đúng hết sau đó nhấn đóng
            && event.target.UngvienHO.value != ""
            && event.target.UngvienEmail.value != ""
            //&& event.target.UngvienSoCMNN.value != ""
            //&& event.target.UngvienSDT.value != ""
        ) {
            // fetch('https://localhost:44390/api/ungviens/', {
            //     method: 'POST',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         ////id : null,                
            //         hoDem: event.target.UngvienHO.value,
            //         ten: event.target.UngvienTEN.value,
            //         //tinhTrangHonNhan: event.target.UngvienTinhTrangHonNhan.value,
            //         ngaySinh: event.target.UngvienNgaySinh.value,
            //         gioiTinh: event.target.UngvienGIOITINH.value,
            //         ////hinhanh 
            //         diaChiThuongTru: event.target.UngvienDiaChi.value,
            //         //choOhienTai: event.target.UngvienChoOHienTai.value,
            //         //soCmnn: event.target.UngvienSoCMNN.value,
            //         //ngayCap: event.target.UngvienNgNgayCapCMMM.value,
            //         tonGiao: event.target.UngvienTonGiao.value,
            //         //noiCap: event.target.UngvienNoiCap.value,
            //         //quocTich: event.target.UngvienQuocTich.value,
            //         //email: event.target.UngvienEmail.value,
            //         //soDienThoai: event.target.UngvienSDT.value,
            //         ////nganhHoc: event.target.UngvienNganhHoc.value,
            //         noiDaoTao: null,
            //         //idtrinhDo: parseInt(event.target.UngvienTrinhDoDaoTao.value),
            //         //xepLoai: event.target.UngvienXepLoai.value,
            //         iddanToc: parseInt(event.target.UngvienDanToc.value),
            //         //noiSinh: event.target.UngvienNoiSinh.value,
            //     })
            // })
            //     .then(res => res.json())
            //     .then(() => {
            //         //alert('thanh cong');
            //         this.setState({ snackbaropen: true, snackbarmsg: "Thêm thành công" });
            //     })
            // 

            alert("Thành công ")
            this.resetForm()

        } else {
            alert("VUI LÒNG KIỂM TRA LẠI!!!")
            console.log("formEr HO: " + this.state.formErrors.UngvienHO)
        }
        
    }

    //true mở - false đóng
    checkHideModal() {
        //for(let i=0; i<this.state.length; i++)
        if (this.state.formErrors.UngvienTEN == "" // không đỏ sẽ đóng
            && this.state.formErrors.UngvienHO == ""
            && this.state.formErrors.UngvienEmail == ""
            //&& this.state.formErrors.UngvienSoCMNN == ""
            //&& this.state.formErrors.UngvienSDT == ""
        ) {
            return this.props.onHide //flase đóng modal
        }
        else {
            if (
                (this.state.UngvienTEN != null// sau khi gõ đúng hết mà nhấn đóng
                || this.state.UngvienHO != null //thì mở lại modal và không gõ gì rồi nhấn submit sẽ vẫn giữ modal 
                || this.state.UngvienEmail != null)
                //&& this.state.formErrors.UngvienSoCMNN != "*"
                //&& this.state.formErrors.UngvienSDT != "*"
                //)
            ) {
                return true // giữ modal
            }
        }
    }

    resetForm = () => {
        this.setState({
            formErrors: {
                UngvienHO: "*",
                UngvienTEN: "*",
                UngvienEmail: "*",
                UngvienSoCMNN: "*",
                UngvienSDT: "*",
            }
        })
    }

    handleChange = (event) => {
        const url = "assets/images/";
        const name = event.target.name;
        const values = event.target.value;
        var result = url + values.substring(12, 100)

        this.setState({
            url: result
        })
    }

    handleChangeValid = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
        const sdtRegex = /^\d{10,10}$/;
        const cmndRegex = /^\d{9,12}$/;
        switch (name) {
            case "UngvienTEN":
                formErrors.UngvienTEN = value.length < 1 ? "Tên chưa hợp lệ" : "";
                break;
            case "UngvienHO":
                formErrors.UngvienHO = value.length < 2 ? "Họ đệm chưa hợp lệ" : "";
                break;
            case "UngvienEmail":
                formErrors.UngvienEmail = emailRegex.test(value) ? "" : "Email chưa hợp lệ";
                break;
            case "UngvienSoCMNN":
                formErrors.UngvienSoCMNN = cmndRegex.test(value) ? "" : "Số CMND chưa hợp lệ";
                break;
            case "UngvienSDT":
                formErrors.UngvienSDT = sdtRegex.test(value) ? "" : "Số điện thoại chưa hợp lệ";
                break;
            default:
                break;
        }

        this.setState({
            formErrors,
            [name]: value
        }, () => console.log(this.state.formErrors))
    }

    checkErrorHo() {
        if (this.state.formErrors.UngvienHO != "" && this.state.formErrors.UngvienHO != "*") {
            return true
        }
        return false
    }
    checkErrorTen() {
        if (this.state.formErrors.UngvienTEN != "" && this.state.formErrors.UngvienTEN != "*") {
            return true
        }
        return false
    }
    checkErrorEmail() {
        if (this.state.formErrors.UngvienEmail != "" && this.state.formErrors.UngvienEmail != "*") {
            return true
        }
        return false
    }

    showModalBody() {
        const urlt = "assets/images/"
        const { formErrors } = this.state;
        return (
            <Form onSubmit={this.handleSubmit} noValidate>
                <Row>
                    <Col sm={12}>
                        <Row className="mt-1">
                            <Col sm={3}>
                                <img src={this.state.url}
                                    className="ml-5"
                                    height="100px"
                                    width="100px"
                                //defaultValue={urlt + this.props.uvhinh}
                                />
                            </Col>
                            <Col sm={2} className="mt-3">
                                <TextField
                                    name="UngvienID"
                                    size="small"
                                    variant="outlined"
                                    label="ID ứng viên"
                                    disabled
                                    defaultValue={this.props.uvid}
                                />
                            </Col>
                            <Col sm={3} className="mt-3">
                                <StyledKeID
                                    name="UngvienHO"
                                    size="small"
                                    variant="outlined"
                                    label="Họ đệm"
                                    error={this.checkErrorHo()}
                                    onChange={this.handleChangeValid}
                                //defaultValue={this.props.uvho}
                                ></StyledKeID>
                                {formErrors.UngvienHO.length > 0 && (
                                    <p><span className="errorMessage">{formErrors.UngvienHO}</span></p>
                                )}
                            </Col>
                            <Col sm={2} className="mt-3">
                                <TextField
                                    name="UngvienTEN"
                                    size="small"
                                    variant="outlined"
                                    label="Tên"
                                    error={this.checkErrorTen()}
                                    onChange={this.handleChangeValid}
                                //defaultValue={this.props.uvten}
                                >
                                </TextField>
                                {formErrors.UngvienTEN.length > 0 && (
                                    <p><span className="errorMessage">{formErrors.UngvienTEN}</span></p>
                                )}
                            </Col>
                            <Col sm={2} className="mt-3">
                                <StyledGioiTinh
                                    name="UngvienGIOITINH"
                                    size="small"
                                    variant="outlined"
                                    select
                                    label="Giới tính"
                                    defaultValue="Nam"
                                >
                                    <MenuItem value="Nam">Nam</MenuItem>
                                    <MenuItem value="Nữ">Nữ</MenuItem>
                                </StyledGioiTinh>
                            </Col>
                        </Row>

                        <Row className="mb-5">
                            <Col sm={3}>
                                <label className="btn btn-link btn-sm ml-5">
                                    CHỌN HÌNH<input type="file" hidden
                                        onChange={(event) => this.handleChange(event)}></input>
                                </label>
                            </Col>
                            <Col sm={2}>
                                <StyledNgay
                                    name="UngvienNgaySinh"
                                    size="small"
                                    type="date"
                                    variant="outlined"
                                    label="Ngày Sinh"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                ></StyledNgay>
                            </Col>
                            <Col sm={3}>
                                <StyledKeID
                                    name="UngvienNoiSinh"
                                    size="small"
                                    variant="outlined"
                                    label="Nơi sinh"
                                //defaultValue={this.props.uvnoisinh}
                                ></StyledKeID>
                            </Col>
                            <Col sm={2}>
                                <TextField
                                    name="UngvienTonGiao"
                                    size="small"
                                    variant="outlined"
                                    label="Tôn giáo"
                                //defaultValue={this.props.uvtongiao}
                                />
                            </Col>
                            <Col sm={2}>
                                <StyledGioiTinh
                                    name="UngvienDanToc"
                                    size="small"
                                    variant="outlined"
                                    select
                                    label="Dân tộc"
                                    defaultValue={this.layGiaTriMacDinhDanToc("Kinh")}
                                >
                                    {
                                        this.state.dts.map(dt =>
                                            <MenuItem value={dt.iddanToc}>{dt.tenDanToc}</MenuItem>)
                                    }
                                </StyledGioiTinh>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Col sm={12}>
                    <Row className="mb-5">
                        <Col sm={2}>
                            <TextField
                                name="UngvienSDT"
                                size="small"
                                variant="outlined"
                                label="Số điện thoại"
                            //defaultValue={this.props.uvsdt}
                            ></TextField>
                        </Col>
                        <Col sm={3} >
                            <StyledKeID
                                name="UngvienEmail"
                                size="small"
                                variant="outlined"
                                label="Email"
                                error={this.checkErrorEmail()}
                                onChange={this.handleChangeValid}
                                defaultValue={this.props.uvmail}
                            ></StyledKeID>
                            {formErrors.UngvienEmail.length > 0 && (
                                <p><span className="errorMessage">{formErrors.UngvienEmail}</span></p>
                            )}
                        </Col>
                        <Col sm={2}>
                            <StyledHonNhan
                                name="UngvienSoCMNN"
                                size="small"
                                variant="outlined"
                                label="Số CMND"
                            //defaultValue={this.props.uvsocmnd}
                            ></StyledHonNhan>
                        </Col>
                        <Col sm={2}>
                            <StyledNgay
                                name="UngvienNgNgayCapCMMM"
                                size="small"
                                type="date"
                                variant="outlined"
                                label="Ngày cấp CMND"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            ></StyledNgay>
                        </Col>
                        <Col sm={3}>
                            <TextField
                                name="UngvienNoiCap"
                                size="small"
                                variant="outlined"
                                label="Nơi cấp CMND"
                            //defaultValue={this.props.uvnoicap}
                            />
                        </Col>
                    </Row>

                    <Row className="">
                        <Col sm={2}>
                            <TextField
                                name="UngvienQuocTich"
                                size="small"
                                variant="outlined"
                                label="Quốc tịch"
                            //defaultValue={this.props.uvquoctich}
                            />
                        </Col>
                        <Col sm={3}>
                            <StyledKeID
                                size="small"
                                name="UngvienDiaChi"
                                variant="outlined"
                                label="Địa chỉ thường trú"
                            //defaultValue={this.props.uvdcthuongtru}
                            ></StyledKeID>
                        </Col>
                        <Col sm={3}>
                            <StyledKeID
                                name="UngvienChoOHienTai"
                                size="small"
                                variant="outlined"
                                label="Chỗ ở hiện tại"
                            //defaultValue={this.props.uvchohientai}
                            ></StyledKeID>
                        </Col>
                        <Col sm={2}>
                            <StyledHonNhan
                                name="UngvienTinhTrangHonNhan"
                                size="small"
                                variant="outlined"
                                label="Tình trạng hôn nhân"
                                defaultValue={this.props.uvtinhtranghonnhan}
                            ></StyledHonNhan>
                        </Col>
                        <Col sm={2}>
                            <StyledGioiTinh className="ml-2"
                                name="UngvienTrinhDoDaoTao"
                                size="small"
                                variant="outlined"
                                select
                                label="Trình độ"
                                defaultValue={this.layGiaTriMacDinhTrinhDo("Đại học")}
                            >
                                {
                                    this.state.daotaos.map(dt =>
                                        <MenuItem value={dt.idtrinhDo}>{dt.tenTrinhDo}</MenuItem>)
                                }
                            </StyledGioiTinh>
                        </Col>
                    </Row>
                </Col>

                <Button
                    variant="primary"
                    type="submit"
                    onClick={this.checkHideModal()}
                >XÁC NHẬN
                </Button>
            </Form>)
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
                    size="xl"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered >
                    <Modal.Header closeButton >
                        <Modal.Title id="contained-modal-title-vcenter">
                            Thêm mới ứng viên
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        {this.showModalBody()}

                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn btn-block btn-secondary" onClick={this.props.onHide}>Đóng</Button>
                        
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
