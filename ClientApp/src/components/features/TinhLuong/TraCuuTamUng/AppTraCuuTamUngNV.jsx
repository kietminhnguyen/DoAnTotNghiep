import React, { Component } from 'react'
import { Form, Row, Col } from 'react-bootstrap';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import PrintIcon from '@material-ui/icons/Print';
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
        minWidth: 600,
        border: 1
    },
}))(Table);


export class AppTraCuuTamUngNV extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tkToken:[],
            tamungs: [],
            pbs: [],
            nhanviens: [],
            bangluongs: [],
            cctonghops: [],
            arrayBL: [],
            //ThangNamChamCong: 'dd-MM-yyyy',
            chonNgay:'',
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
        this.loadTamUng()
    }

    componentWillMount() {
        if (localStorage && localStorage.getItem('token')) {
            var tkToken = JSON.parse(localStorage.getItem('token'))
            this.setState({
                tkToken: tkToken
            })
        }
    }

    loadTamUng() {
        fetch('https://localhost:44390/api/tamungluongs')
            .then(response => response.json())
            .then(data => {
                this.setState({ tamungs: data });
            });
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
        // var layThang = getMonth(new Date(values)) + 1
        // var layNam = getYear(new Date(values))
        // var namThang = layNam + "-" + layThang
        // var MY = format(new Date(namThang), 'yyyy-MM')

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

    checkToken(idnv) { // kiểm tra tk đăng nhập vào có trùng với idCC. Nếu trùng sẽ show thông tin về ... của nv đó
        let check = false;
        for (let j = 0; j < this.state.tkToken.length; j++) {
            if (this.state.tkToken[j].username == idnv) {
                return check = true
            }
        }
        return check = false
    }

    getTableData() {
        const { tamungs, bangluongs, nhanviens } = this.state
        //var layThangDaChon = getMonth(new Date(this.state.ThangNamChamCong)) + 1
        //var layNamDaChon = getYear(new Date(this.state.ThangNamChamCong))
        const formatter = new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        })

        // var flag = false
        // for (let i = 0; i < bangluongs.length; i++) {
        //     if (bangluongs[i].trangThai == 1
        //         && (layThangDaChon == bangluongs[i].thang
        //             && layNamDaChon == bangluongs[i].nam)) {
        //         flag = true
        //     }
        // }
        // if (flag) {
        return tamungs.map(tu => {
            //return nhanviens.map(nv => {
            if (
                //bl.idnhanVien == nv.idnhanVien
                //&& ( parseInt(this.state.ThangNamChamCong.substring(6,7)) == bl.thang )
                //&& ( parseInt(this.state.ThangNamChamCong.substring(0,4)) == bl.nam )
                //(layThangDaChon == tu.ngayTamUng.substring(5, 7))
                //&& (layNamDaChon == tu.ngayTamUng.substring(0, 4))
                tu.ngayTamUng.substring(0, 10) == this.state.chonNgay && this.checkToken(tu.idnhanVien)
            ) {

                return (<StyledTableRow>
                    <StyledTableCell align="left">{this.layTenNV(tu.idnhanVien)}</StyledTableCell>
                    <StyledTableCell align="center">{format(new Date(tu.ngayTamUng), 'dd-MM-yyyy')}</StyledTableCell>
                    <StyledTableCell align="center">{formatter.format(tu.soTienTamUng)}</StyledTableCell>
                    <StyledTableCell align="center">{tu.lyDoTamUng}</StyledTableCell>
                    <StyledTableCell align="center">{tu.ghiChu}</StyledTableCell>

                    <StyledTableCell align="center">
                        <Button>
                            <PrintIcon color="inherit"

                            ></PrintIcon>
                        </Button>
                    </StyledTableCell>
                </StyledTableRow>)
            }
            //})
        })
        // }
        // else {
        //     return (
        //         <h2 className="display-7">Không có dữ liệu</h2>)
        // }
    }

    render() {
        return (
            <div>
                <div className="container text-center">
                    <h1 className="display-7">TRA CỨU TẠM ỨNG LƯƠNG</h1><hr />
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
                        <Form.Label className="mt-2 ml-4">Chọn ngày:</Form.Label>
                        <Col sm={3}>
                            <Form.Group controlId="chonNgay">
                                <Form.Control
                                    type="date"
                                    name="chonNgay"
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
                                <StyledTableCell align="center">Ngày tạm ứng</StyledTableCell>
                                <StyledTableCell align="center">Số tiền tạm ứng</StyledTableCell>
                                <StyledTableCell align="center">Lý do</StyledTableCell>
                                <StyledTableCell align="center">Ghi chú</StyledTableCell>
                                <StyledTableCell align="center">Chức năng</StyledTableCell>
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