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

export class AppQuyetDinhKhenThuong extends Component {
    static displayName = AppQuyetDinhKhenThuong.name;

    constructor(props) {
        super(props);
        this.state = {
            nhanviens:[],
            quyetdinhkts: [],
            ThangNamQuyetDinh: '',
            addModalShow: false,
            editModalShow: false,
            // showModalShow: false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.loadKhenThuong()
        this.loadNV()
    }
    componentDidUpdate() {
        this.loadKhenThuong()
    }

    loadNV() {
        fetch('https://localhost:44390/api/nhanviens')
            .then(response => response.json())
            .then(data => {
                this.setState({ nhanviens: data });
            });
    }

    loadKhenThuong() {
        fetch('https://localhost:44390/api/quyetdinhkts')
            .then(response => response.json())
            .then(data => {
                this.setState({ quyetdinhkts: data });
            });

    }

    deleteQuyetDinh(idqd) {
        if (window.confirm('Bạn có chắc muốn xóa quyết định này?')) {
            axios.delete('https://localhost:44390/api/quyetdinhkts/' + idqd)
                .then(response => {
                    //this.setState({ arrayBL: response.data })
                    alert("Xóa thành công")
                })
                .catch(error => {
                    //this.setState({ showError: "Lỗi post dữ liệu" })
                    alert("Xóa không thành công")
                })
        }
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
        console.log("thang: " + namThang)
        // console.log("nam: "+layNam)
        console.log("thang nam format: " + MY)

        this.setState({
            ThangNamQuyetDinh: MY
        })

    }

    layTenNV = (idNVofCC) => {
        for (let i = 0; i < this.state.nhanviens.length; i++) {
            if (idNVofCC == this.state.nhanviens[i].idnhanVien) {
                idNVofCC = this.state.nhanviens[i].hoDem + " " + this.state.nhanviens[i].ten
            }
        }
        return idNVofCC
    }

    getTableData() {
        const { quyetdinhkts, qdidkt, qdidnv, qdhodem, qdtennv, qdten, qdtienthuong, qdngyathanhlap,
            qdngayhieuluc, qdngayhethieuluc, qdnoidung, qdghichu } = this.state;
        let editModalClose = () => this.setState({ editModalShow: false })

        const formatter = new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        })

        return quyetdinhkts.map((qd, key) => {
            if ((qd.ngayHetHieuLuc.substring(0, 7) == this.state.ThangNamQuyetDinh)
                || this.state.ThangNamQuyetDinh == ''
            ) {
                return (
                    <StyledTableRow key={qd.idquyetDinhKt}>
                        <StyledTableCell>{key + 1}</StyledTableCell>
                        <StyledTableCell>{this.layTenNV(qd.idnhanVien)}</StyledTableCell>
                        <StyledTableCell align="center">{format(new Date(qd.ngayLap), 'dd-MM-yyyy')}</StyledTableCell>
                        <StyledTableCell align="center">{format(new Date(qd.ngayHieuLuc), 'dd-MM-yyyy')}</StyledTableCell>
                        <StyledTableCell align="center">{format(new Date(qd.ngayHetHieuLuc), 'dd-MM-yyyy')}</StyledTableCell>
                        <StyledTableCell align="center" >{qd.noiDung}</StyledTableCell>
                        <StyledTableCell align="center">{formatter.format(qd.soTienThuong)}</StyledTableCell>
                        <StyledTableCell align="center">
                            <ButtonGroup variant="text">
                                <Button>
                                    <EditIcon color="primary"
                                        onClick={() => this.setState({
                                            editModalShow: true,
                                            qdidkt: qd.idquyetDinhKt,
                                            qdidnv: qd.idnhanVien,
                                            qdhodem: qd.hoDem,
                                            qdtennv: qd.ten,
                                            qdten: qd.tenQuyetDinh,
                                            qdtienthuong: qd.soTienThuong,
                                            qdngyathanhlap: qd.ngayLap.substring(0, 10),
                                            qdngayhieuluc: qd.ngayHieuLuc.substring(0, 10),
                                            qdngayhethieuluc: qd.ngayHetHieuLuc.substring(0, 10),
                                            qdnoidung: qd.noiDung,
                                            qdghichu: qd.ghiChu

                                        })}>
                                    </EditIcon>
                                </Button>

                                <Button>
                                    <DeleteIcon color="secondary"
                                        onClick={() => this.deleteQuyetDinh(qd.idquyetDinhKt)}>
                                    </DeleteIcon>
                                </Button>
                                <Button>
                                    <PrintIcon color="inherit"
                                        onClick={() => this.inquyetdinh()}>
                                    </PrintIcon>
                                </Button>

                                <EditQuyetDinhKhenThuong
                                    show={this.state.editModalShow}
                                    onHide={editModalClose}
                                    qdidkt={qdidkt}
                                    qdidnv={qdidnv}
                                    qdhodem={qdhodem}
                                    qdtennv={qdtennv}
                                    qdten={qdten}
                                    qdtienthuong={qdtienthuong}
                                    qdngyathanhlap={qdngyathanhlap}
                                    qdngayhieuluc={qdngayhieuluc}
                                    qdngayhethieuluc={qdngayhethieuluc}
                                    qdnoidung={qdnoidung}
                                    qdghichu={qdghichu}
                                />
                            </ButtonGroup>
                        </StyledTableCell>
                    </StyledTableRow>)
            }
        })
    }

    render() {
        
        return (
            <div>
                <div className="container text-center">
                    <h1 className="display-7">DANH SÁCH QUYẾT ĐỊNH KHEN THƯỞNG</h1><hr />
                </div>
                <Form>
                    <Row>
                        <Form.Label className="mt-2 ml-2">Chọn tháng năm:</Form.Label>
                        <Col sm={3}>
                            <Form.Group controlId="ThangNamChamCong">
                                <Form.Control
                                    type="month"
                                    name="ThangNamChamCong"
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
                                <StyledTableCell>#</StyledTableCell>
                                <StyledTableCell>Họ tên nhân viên</StyledTableCell>
                                <StyledTableCell align="center">Ngày lập</StyledTableCell>
                                <StyledTableCell align="center">Ngày hiệu lực</StyledTableCell>
                                <StyledTableCell align="center">Ngày hết hạn</StyledTableCell>
                                <StyledTableCell align="center">Nội dung </StyledTableCell>
                                <StyledTableCell align="center">Số tiền thưởng</StyledTableCell>
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