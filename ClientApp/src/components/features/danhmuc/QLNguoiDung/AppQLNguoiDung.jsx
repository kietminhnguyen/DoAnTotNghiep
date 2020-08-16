import React, { Component } from 'react'
//import { Row, Col, Form } from 'react-bootstrap'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, ButtonGroup, Button, Select, MenuItem } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
//import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { format, getMonth, getYear } from 'date-fns';
import axios from 'axios';

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
        minWidth: 600
        //border: 1
    },
}))(Table);

export class AppQLNguoiDung extends Component {

    constructor(props) {
        super(props);
        this.state = {
            taikhoans: [],
            nhanviens: [],

            addModalShow: false,
            editModalShow: false,
            InModalShow: false
            // showModalShow: false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.loadNV()
        this.loadTK()
    }
    componentDidUpdate() {
        this.loadTK()
    }

    loadNV() {
        fetch('https://localhost:44390/api/nhanviens')
            .then(response => response.json())
            .then(data => {
                this.setState({ nhanviens: data });
            });
    }

    loadTK() {
        fetch('https://localhost:44390/api/taikhoans')
            .then(response => response.json())
            .then(data => {
                this.setState({ taikhoans: data });
            });
    }

    // Xóa TK + put NV username
    deleteTK(user) {
        if (window.confirm('Bạn có chắc muốn xóa tài khoản này?')) {
            // put NV username    
            let arrayNV = []
            for (let i = 0; i < this.state.nhanviens.length; i++) {
                if (this.state.nhanviens[i].username == user) {
                    arrayNV.push({
                        idnhanVien: this.state.nhanviens[i].idnhanVien,
                        hoDem: this.state.nhanviens[i].hoDem,
                        ten: this.state.nhanviens[i].ten,
                        //nguyenQuan: event.target.NhanvienNguyenQuan.value,
                        tinhTrangHonNhan: this.state.nhanviens[i].tinhTrangHonNhan,
                        ngaySinh: this.state.nhanviens[i].ngaySinh,
                        noiSinh: this.state.nhanviens[i].noiSinh,
                        gioiTinh: this.state.nhanviens[i].gioiTinh,
                        hinhAnh: this.state.nhanviens[i].hinhAnh,
                        diaChiThuongTru: this.state.nhanviens[i].diaChiThuongTru,
                        choOhienTai: this.state.nhanviens[i].choOhienTai,
                        soCmnn: this.state.nhanviens[i].soCmnn,
                        ngayCap: this.state.nhanviens[i].ngayCap,
                        tonGiao: this.state.nhanviens[i].tonGiao,
                        noiCap: this.state.nhanviens[i].noiCap,
                        quocTich: this.state.nhanviens[i].quocTich,
                        email: this.state.nhanviens[i].email,
                        soDienThoai: this.state.nhanviens[i].soDienThoai,
                        nganhHoc: null,
                        noiDaoTao: this.state.nhanviens[i].noiDaoTao,/////////
                        //xepLoai: event.target.NhanvienXepLoai.value,
                        username: null,
                        idphongBan: this.state.nhanviens[i].idphongBan,
                        idchucVu: this.state.nhanviens[i].idchucVu,
                        //idquanHeGd
                        ////trangThaiHoSo=> trangthaiHDThuViec, trangthaiHDChinhThuc,
                        trangthaiHdthuViec: this.state.nhanviens[i].trangthaiHdthuViec,
                        trangthaiHdchinhThuc: this.state.nhanviens[i].trangthaiHdchinhThuc,
                        iddanToc: this.state.nhanviens[i].iddanToc,
                        idtrinhDo: this.state.nhanviens[i].idtrinhDo,
                        idquyetDinhBn: this.state.nhanviens[i].idquyetDinhBn,
                    })
                }
            }
            //console.log(arrayNV)
            axios.put('https://localhost:44390/api/nhanviens/mangput', arrayNV)

            //Xóa TK
            axios.delete('https://localhost:44390/api/taikhoans/' + user)
                .then(response => {
                    //this.setState({ arrayBL: response.data })
                    alert("Xóa thành công")
                })
                .catch(error => {
                    //this.setState({ showError: "Lỗi post dữ liệu" })
                    //alert("Xóa không thành công")
                })
        }
    }

    handleChange = (event) => {

    }

    layTenNV = (id) => {
        for (let i = 0; i < this.state.nhanviens.length; i++) {
            if (id == this.state.nhanviens[i].username) {
                id = this.state.nhanviens[i].hoDem + " " + this.state.nhanviens[i].ten
            }
        }
        return id
    }

    checkButtonXoa(user) {
        // return this.state.taikhoans.map(tk => {
        if (user != "adminNS" && user != "adminTC") {
            return (
                <Button>
                    <DeleteIcon color="secondary"
                        onClick={() => this.deleteTK(user)}
                    ></DeleteIcon>
                </Button>
            )
        }
        //})
    }

    getTableData() {
        const { nhanviens, taikhoans } = this.state;
        let editModalClose = () => this.setState({ editModalShow: false })
        let InModalClose = () => this.setState({ InModalShow: false })

        return taikhoans.map(tk => {
            return nhanviens.map(nv => {
                if (tk.username == nv.username) {
                    return (
                        <StyledTableRow>
                            {/* <StyledTableCell>{key + 1}</StyledTableCell> */}
                            <StyledTableCell align="left">{tk.username}</StyledTableCell>
                            <StyledTableCell align="center">{format(new Date(tk.mail), 'dd-MM-yyyy')}</StyledTableCell>
                            <StyledTableCell align="center">{this.layTenNV(tk.username)}</StyledTableCell>
                            <StyledTableCell align="center">
                                <ButtonGroup variant="text">
                                    {
                                        this.checkButtonXoa(tk.username)
                                    }

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
                    <h1 className="display-7">DANH SÁCH TÀI KHOẢN</h1><hr />
                </div>

                {/* <Button variant="contained"
                    color="primary"
                    component="span"
                    startIcon={<AccountCircleIcon />}
                >Thêm tài khoản
                </Button> */}

                <TableContainer>
                    <StyledTable className="mt-4">
                        <TableHead>
                            <StyledTableRow>
                                {/* <StyledTableCell>#</StyledTableCell> */}
                                <StyledTableCell align="left">Tài khoản</StyledTableCell>
                                <StyledTableCell align="center">Ngày tạo</StyledTableCell>
                                <StyledTableCell align="center">Họ tên nhân viên</StyledTableCell>
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