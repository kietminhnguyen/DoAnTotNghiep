import React, { Component } from 'react'
import { Form, Row, Col } from 'react-bootstrap';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
//import ExposureIcon from '@material-ui/icons/Exposure';
//import LockIcon from '@material-ui/icons/Lock';
//import LockOpenIcon from '@material-ui/icons/LockOpen';

import { format, getMonth, getYear } from 'date-fns'
import axios from 'axios';

//import { EditLuongThangModal } from './EditLuongThangModal'
//import { ShowLuongThangModal } from './ShowLuongThangModal'


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
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
        minWidth: 3000,
        border: 1
    },
}))(Table);


export class AppTraCuuLuong extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pbs: [],
            nhanviens: [],
            bangluongs: [],
            cctonghops: [],
            //chonLoaiHD: -1,
            arrayBL: [],
            ThangNamChamCong: 'dd-MM-yyyy',
            chonPB: '',
            addModalShow: false,
            editModalShow: false,
            showModalShow: false
        }
        //this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.loadNV()
        this.loadBangLuong()
        this.loadPB()
    }

    loadNV() {
        fetch('https://localhost:44390/api/nhanviens')
            .then(response => response.json())
            .then(data => {
                this.setState({ nhanviens: data });
            });
    }

    loadBangLuong() {
        fetch('https://localhost:44390/api/bangluongs')
            .then(response => response.json())
            .then(data => {
                this.setState({ bangluongs: data });
            });
    }

    loadPB() {
        fetch('https://localhost:44390/api/phongbans')
            .then(respone => respone.json())
            .then(data => {
                this.setState({ pbs: data })
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

    handleChange = (event) => {
        const name = event.target.name;
        const values = event.target.value;
        var layThang = getMonth(new Date(values)) + 1
        var layNam = getYear(new Date(values))
        var namThang = layNam + "-" + layThang
        var MY = format(new Date(namThang), 'yyyy-MM')

        this.setState({
            //ThangNamChamCong: MY,
            //chonPB: event.target.value
            [name]: values
        })
    }

    selectPB() {
        return <Select className="ml-3"
            name="chonPB"
            value={this.state.chonPB}
            onChange={this.handleChange}>
            {
                this.state.pbs.map(pb => {
                    return (
                        <MenuItem value={pb.idphongBan}>
                            {pb.tenPhongBan}
                        </MenuItem >
                    )
                })}
        </Select>
    }

    getTableData() {
        const { bangluongs, nhanviens } = this.state
        var layThangDaChon = getMonth(new Date(this.state.ThangNamChamCong)) + 1
        var layNamDaChon = getYear(new Date(this.state.ThangNamChamCong))
        const formatter = new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        })

        var flag = false
        for (let i = 0; i < bangluongs.length; i++) {
            if (bangluongs[i].trangThai == 1
                && (layThangDaChon == bangluongs[i].thang
                    && layNamDaChon == bangluongs[i].nam)) {
                flag = true
            }
        }
        if (flag) {
            return bangluongs.map(bl => {
                return nhanviens.map(nv => {
                    if (bl.idnhanVien == nv.idnhanVien
                        //&& ( parseInt(this.state.ThangNamChamCong.substring(6,7)) == bl.thang )
                        //&& ( parseInt(this.state.ThangNamChamCong.substring(0,4)) == bl.nam )
                        && (layThangDaChon == bl.thang)
                        && (layNamDaChon == bl.nam)
                    ) {

                        return (<StyledTableRow>
                            <StyledTableCell align="left">{this.layTenNV(bl.idnhanVien)}</StyledTableCell>
                            <StyledTableCell align="center">{bl.idnhanVien}</StyledTableCell>
                            <StyledTableCell align="center">{bl.heSoChucVu}</StyledTableCell>
                            <StyledTableCell align="center">{bl.heSoChuyenMon}</StyledTableCell>
                            <StyledTableCell align="center">{formatter.format(bl.mucLuong)}</StyledTableCell>
                            <StyledTableCell align="center">{bl.soNgayDiTre}</StyledTableCell>
                            <StyledTableCell align="center">{bl.soNgayDiTreKhongTinhLuong}</StyledTableCell>
                            <StyledTableCell align="center">{bl.soNgayNghi}</StyledTableCell>
                            <StyledTableCell align="center">{bl.soNgayCong}</StyledTableCell>
                            <StyledTableCell align="center">{bl.tongGioTangCa}</StyledTableCell>
                            <StyledTableCell align="center">{formatter.format(bl.tienTangCa)}</StyledTableCell>
                            <StyledTableCell align="center">{formatter.format(bl.tienPhatDiTre)}</StyledTableCell>
                            <StyledTableCell align="center">{formatter.format(bl.tienPhat)}</StyledTableCell>
                            <StyledTableCell align="center">{formatter.format(bl.tienTamUng)}</StyledTableCell>
                            <StyledTableCell align="center">{formatter.format(bl.thueTncn)}</StyledTableCell>
                            <StyledTableCell align="center">{formatter.format(bl.truBh)}</StyledTableCell>
                            <StyledTableCell align="center">{formatter.format(bl.tienThuong)}</StyledTableCell>
                            <StyledTableCell align="center">{formatter.format(730000)}</StyledTableCell>
                            <StyledTableCell align="center">{formatter.format(bl.phuCapKhac)}</StyledTableCell>
                            <StyledTableCell align="center">{formatter.format(bl.tienThucLinh)}</StyledTableCell>
                            <StyledTableCell align="center">IN</StyledTableCell>    
                        </StyledTableRow>)
                    }
                })
            })
        }
        else {
            return (
                <h2 className="display-7">Không có dữ liệu</h2>)
        }
    }

    render() {
        return (
            <div>
                <div className="container text-center">
                    <h1 className="display-7">TRA CỨU LƯƠNG NHÂN VIÊN</h1><hr />
                </div>

                <Form>
                    <Row>
                        {/* <Form.Label className="mt-2 ml-2">Chọn tháng năm:</Form.Label>
                        <Col sm={3}>
                            <Form.Group controlId="ThangNamChamCong">
                                <Form.Control
                                    type="month"
                                    name="ThangNamChamCong"
                                    required
                                    onChange={(event) => this.handleChange(event)}
                                />
                            </Form.Group>
                        </Col> */}

                        {/* <Form.Label className="mt-2">Chọn phòng ban:</Form.Label>
                        <Col sm={3} >
                            <Form.Group controlId="chonPB" className="ml-2">
                                {this.selectPB()}
                            </Form.Group>
                        </Col> */}
                        <Form.Label className="mt-2 ml-4">Chọn tháng năm:</Form.Label>
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
                    <StyledTable>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell align="left">Họ tên</StyledTableCell>
                                <StyledTableCell align="center">Mã nhân viên</StyledTableCell>
                                <StyledTableCell align="center">Hệ số chức vụ</StyledTableCell>
                                <StyledTableCell align="center">Hệ số chuyên môn</StyledTableCell>
                                <StyledTableCell align="center">Mức lương</StyledTableCell>
                                <StyledTableCell align="center">Số ngày đi trễ ˂ 60 phút</StyledTableCell>
                                <StyledTableCell align="center">Số ngày đi trễ ≥ 60 phút</StyledTableCell>
                                <StyledTableCell align="center">Số ngày nghỉ</StyledTableCell>
                                <StyledTableCell align="center">Số ngày công</StyledTableCell>
                                <StyledTableCell align="center">Số giờ tăng ca</StyledTableCell>
                                <StyledTableCell align="center">Tiền tăng ca</StyledTableCell>
                                <StyledTableCell align="center">Tiền phạt đi trễ</StyledTableCell>
                                <StyledTableCell align="center">Tiền phạt kỉ luật</StyledTableCell>
                                <StyledTableCell align="center">Tiền ứng</StyledTableCell>
                                <StyledTableCell align="center">Tiền thuế TNCN</StyledTableCell>
                                <StyledTableCell align="center">Tiền bảo hiểm</StyledTableCell>
                                <StyledTableCell align="center">Tiền khen thưởng</StyledTableCell>
                                <StyledTableCell align="center">Tiền phụ cấp</StyledTableCell>
                                <StyledTableCell align="center">Tiền phụ cấp khác</StyledTableCell>
                                <StyledTableCell align="center">Thực lĩnh</StyledTableCell>
                                <StyledTableCell align="right">Chức năng</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {this.getTableData()}
                        </TableBody>
                    </StyledTable>
                </TableContainer>
            </div>)
    }
}
//export default AppLuongThang