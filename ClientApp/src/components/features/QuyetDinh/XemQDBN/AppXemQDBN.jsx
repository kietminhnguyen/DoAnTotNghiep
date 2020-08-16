import React, { Component } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, ButtonGroup, Button, Select, MenuItem } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import PrintIcon from '@material-ui/icons/Print';

import { format, getMonth, getYear } from 'date-fns';
import axios from 'axios';

import { EditQuyetDinhKhenThuong } from './EditQuyetDinhKhenThuong';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 17,
    },
    body: {
        fontSize: 16,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const StyledTable = withStyles((theme) => ({
    root: {
        minWidth: 1200
        //border: 1
    },
}))(Table);

export class AppXemQDBN extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nhanviens: [],
            ungviens: [],
            qdbns: [],
            ThangNamQuyetDinh: '',
            addModalShow: false,
            editModalShow: false,
            // showModalShow: false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.loadQDBN()
        this.loadUV()
        this.loadNV()
    }
    componentDidUpdate() {
        this.loadQDBN()
    }

    loadNV() {
        fetch('https://localhost:44390/api/nhanviens')
            .then(response => response.json())
            .then(data => {
                this.setState({ nhanviens: data });
            });
    }

    loadUV() {
        fetch('https://localhost:44390/api/ungviens')
            .then(response => response.json())
            .then(data => {
                this.setState({ ungviens: data });
            });
    }

    loadQDBN() {
        fetch('https://localhost:44390/api/quyetdinhbonhiems')
            .then(response => response.json())
            .then(data => {
                this.setState({ qdbns: data });
            });
    }

    loadBangLuong() {
        fetch('https://localhost:44390/api/bangluongs')
            .then(response => response.json())
            .then(data => {
                this.setState({ bangluongs: data });
            });

    }

    inquyetdinh() {
        window.alert("Chức năng đang hoàn thiện. Vui lòng chờ cập nhật!")
    }

    handleChange = (event) => {
        const name = event.target.name;
        const values = event.target.value;
        var layThang = getMonth(new Date(values)) + 1
        var layNam = getYear(new Date(values))
        var namThang = layNam + "-" + layThang
        var MY = format(new Date(namThang), 'yyyy-MM')
        //console.log("thang: " + namThang)
        // console.log("nam: "+layNam)
        //console.log("thang nam format: " + MY)

        this.setState({
            ThangNamQuyetDinh: MY
        })

    }

    layTenUV = (idUVofQDBN) => {
        for (let i = 0; i < this.state.ungviens.length; i++) {
            if (idUVofQDBN == this.state.ungviens[i].idungVien) {
                idUVofQDBN = this.state.ungviens[i].hoDem + " " + this.state.ungviens[i].ten
            }
        }
        return idUVofQDBN
    }

    // deleteQuyetDinh(idqd) {
    //     //let flag = false
    //     if (window.confirm('Bạn có chắc muốn xóa quyết định này?')) {
    //         axios.delete('https://localhost:44390/api/quyetdinhbonhiems/' + idqd)
    //             .then(response => {
    //                 //this.setState({ arrayBL: response.data })
    //                 alert("Xóa thành công")
    //             })
    //             .catch(error => {
    //                 //this.setState({ showError: "Lỗi post dữ liệu" })
    //                 alert("Xóa không thành công")
    //             })
    //     }
    //     //}
    // }

    // checkBtnXoaQDBN(idqd) { // kt có tồn tại idquyetDinhBn trong bảng NV hay không. Nếu tồn tại sẽ không show
    //     for (let i = 0; i < this.state.nhanviens.length; i++) {
    //         if (idqd == this.state.nhanviens[i].idquyetDinhBn) {
    //             return (
    //                 <Button>
    //                     <DeleteIcon color="secondary"
    //                         onClick={() => this.deleteQuyetDinh(idqd)}>
    //                     </DeleteIcon>
    //                 </Button>
    //             )
    //         }
    //     }
    // }

    getTableData() {
        const { ungviens, qdbns, qdidkt, qdidnv, qdhodem, qdtennv, qdten, qdtienthuong, qdngyathanhlap,
            qdngayhieuluc, qdngayhethieuluc, qdnoidung, qdghichu, nvgioitinh, nvhinh } = this.state;
        let editModalClose = () => this.setState({ editModalShow: false })

        return qdbns.map(qd => {
            return ungviens.map(uv => {
                if (
                    (qd.ngayHieuLuc.substring(0, 7) == this.state.ThangNamQuyetDinh)
                    && qd.idungVien == uv.idungVien
                    || (this.state.ThangNamQuyetDinh == '' && qd.idungVien == uv.idungVien)
                ) {
                    return (
                        <StyledTableRow >
                            {/* <StyledTableCell>{key + 1}</StyledTableCell> */}
                            <StyledTableCell>{this.layTenUV(qd.idungVien)}</StyledTableCell>
                            <StyledTableCell align="center">{format(new Date(qd.ngayQuyetDinh), 'dd-MM-yyyy')}</StyledTableCell>
                            <StyledTableCell align="center">{format(new Date(qd.ngayHieuLuc), 'dd-MM-yyyy')}</StyledTableCell>
                            <StyledTableCell align="center" >{qd.noiDung}</StyledTableCell>
                            <StyledTableCell align="center">{qd.ghiChu}</StyledTableCell>
                            <StyledTableCell align="center">
                                <ButtonGroup variant="text">

                                    {/* {this.checkBtnXoaQDBN(qd.idquyetDinhBn)} */}
                                    
                                    <Button>
                                        <PrintIcon color="inherit"
                                        //onClick={() => this.inquyetdinh()}
                                        ></PrintIcon>
                                    </Button>

                                    <EditQuyetDinhKhenThuong
                                        show={this.state.editModalShow}
                                        onHide={editModalClose}
                                    // qdidkt={qdidkt}
                                    // qdidnv={qdidnv}
                                    // qdhodem={qdhodem}
                                    // qdtennv={qdtennv}
                                    // qdten={qdten}
                                    // qdtienthuong={qdtienthuong}
                                    // qdngyathanhlap={qdngyathanhlap}
                                    // qdngayhieuluc={qdngayhieuluc}
                                    // qdngayhethieuluc={qdngayhethieuluc}
                                    // qdnoidung={qdnoidung}
                                    // qdghichu={qdghichu}
                                    // nvgioitinh={nvgioitinh}
                                    // nvpic={nvhinh}
                                    />
                                </ButtonGroup>
                            </StyledTableCell>
                        </StyledTableRow>)
                }
            })

        })
    }

    render() {

        return (
            <div>
                <div className="container text-center">
                    <h1 className="display-7">DANH SÁCH QUYẾT ĐỊNH BỔ NHIỆM</h1><hr />
                </div>
                <Form>
                    <Row>
                        <Form.Label className="mt-2 ml-2">Chọn tháng năm:</Form.Label>
                        <Col sm={3}>
                            <Form.Group controlId="ThangNamQuyetDinh">
                                <Form.Control
                                    type="month"
                                    name="ThangNamQuyetDinh"
                                    required
                                    onChange={(event) => this.handleChange(event)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>

                <TableContainer>
                    <StyledTable className="mt-3">
                        <TableHead>
                            <StyledTableRow>
                                {/* <StyledTableCell>#</StyledTableCell> */}
                                <StyledTableCell>Họ tên ứng viên</StyledTableCell>
                                <StyledTableCell align="center">Ngày lập</StyledTableCell>
                                <StyledTableCell align="center">Ngày hiệu lực</StyledTableCell>
                                <StyledTableCell align="center">Nội dung </StyledTableCell>
                                <StyledTableCell align="center">Ghi chú</StyledTableCell>
                                <StyledTableCell align="center">Chức năng</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {this.getTableData()}
                        </TableBody>
                    </StyledTable>
                </TableContainer>
            </div>
        )
    }
}