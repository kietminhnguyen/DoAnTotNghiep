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
            //bangluongs: [],
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
        //this.loadBangLuong()
    }
    componentDidUpdate() {
        this.loadQDBN()
    }

    loadUV() {
        fetch('https://localhost:44390/api/ungviens')
            .then(response => response.json())
            .then(data => {
                this.setState({ ungviens: data });
            });
    }

    loadQDBN(){
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

    deleteQuyetDinh(idqd) {
        let flag = false
        // kiểm tra đã đỗ dữ liệu hay chưa
        // nếu đỗ rồi sẽ không được xóa qdKT
        // for (let i = 0; i < this.state.bangluongs.length; i++) {
        //     for (let j = 0; j < this.state.quyetdinhkts.length; j++) {
        //         if (this.state.bangluongs[i].thang == this.state.quyetdinhkts[j].ngayHieuLuc.substring(5, 7)
        //             && this.state.bangluongs[i].nam == this.state.quyetdinhkts[j].ngayHieuLuc.substring(0, 4)
        //             && this.state.bangluongs[i].idnhanVien == this.state.quyetdinhkts[j].idnhanVien
        //         ) {
        //             flag = true
        //         }
        //     }
        // }
        // if (flag) {
        //     alert("Đã khóa bảng lương không thể xóa")
        // }
        // else {
            if (window.confirm('Bạn có chắc muốn xóa quyết định này?')) {
                axios.delete('https://localhost:44390/api/quyetdinhbonhiems/' + idqd)
                    .then(response => {
                        //this.setState({ arrayBL: response.data })
                        alert("Xóa thành công")
                    })
                    .catch(error => {
                        //this.setState({ showError: "Lỗi post dữ liệu" })
                        alert("Xóa không thành công")
                    })
            }
        //}
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

    getTableData() {
        const { ungviens, qdbns, qdidkt, qdidnv, qdhodem, qdtennv, qdten, qdtienthuong, qdngyathanhlap,
            qdngayhieuluc, qdngayhethieuluc, qdnoidung, qdghichu, nvgioitinh, nvhinh } = this.state;
        let editModalClose = () => this.setState({ editModalShow: false })

        return qdbns.map(qd => {
            return ungviens.map(uv => {
                if ((qd.ngayHieuLuc.substring(0, 7) == this.state.ThangNamQuyetDinh)
                    && qd.idungVien == uv.idungVien
                    //|| this.state.ThangNamQuyetDinh == ''
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
                                    {/* <Button>
                                        <EditIcon color="primary"
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                // qdidkt: qd.idquyetDinhKt,
                                                // qdidnv: qd.idnhanVien,
                                                // qdhodem: qd.hoDem,
                                                // qdtennv: qd.ten,
                                                // qdten: qd.tenQuyetDinh,
                                                // qdtienthuong: qd.soTienThuong,
                                                // qdngyathanhlap: qd.ngayLap.substring(0, 10),
                                                // qdngayhieuluc: qd.ngayHieuLuc.substring(0, 10),
                                                // qdngayhethieuluc: qd.ngayHetHieuLuc.substring(0, 10),
                                                // qdnoidung: qd.noiDung,
                                                // qdghichu: qd.ghiChu,
                                                // nvgioitinh: nv.gioiTinh,
                                                // nvhinh: nv.hinhAnh
                                            })}>
                                        </EditIcon>
                                    </Button> */}

                                    <Button>
                                        <DeleteIcon color="secondary"
                                            onClick={() => this.deleteQuyetDinh(qd.idquyetDinhBn)}>
                                        </DeleteIcon>
                                    </Button>
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