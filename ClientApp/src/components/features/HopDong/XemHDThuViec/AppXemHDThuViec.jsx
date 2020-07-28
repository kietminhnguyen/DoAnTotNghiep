import React, { Component } from 'react'
import axios from 'axios';
import { Form, Col, Row } from 'react-bootstrap'
import {
    TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
    Button, Select, MenuItem, FormControlLabel, RadioGroup, Radio
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import VisibilityIcon from '@material-ui/icons/Visibility';

import { format, differenceInDays, getDate } from 'date-fns'

//import { ShowXemHDThuViecModal } from './ShowXemHDThuViecModal'

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
        minWidth: 600,
    },
}))(Table);


export class AppXemHDThuViec extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hds: [],
            nvs: [],
            pbs: [],
            chonPB: '',
            chonRadio: "Chưa hủy",
            // addModalShow: false,
            // editModalShow: false,
            // showModalShow: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeCheck = this.handleChangeCheck.bind(this)
    }

    componentDidMount() {
        this.loadNV()
        this.loadPB()
        this.loadHD()
    }

    componentDidUpdate(){
        this.loadHD()
    }

    loadNV() {
        fetch('https://localhost:44390/api/nhanviens')
            .then(response => response.json())
            .then(data => {
                this.setState({ nvs: data });
            });
    }

    loadHD() {
        fetch('https://localhost:44390/api/hopdongs')
            .then(respone => respone.json())
            .then(data => {
                this.setState({ hds: data })
            })
    }

    loadPB() {
        fetch('https://localhost:44390/api/phongbans')
            .then(respone => respone.json())
            .then(data => {
                this.setState({ pbs: data })
            })
    }

    handleChange(event) {
        this.setState({
            chonPB: event.target.value
        })
    }

    handleChangeCheck(event) {
        this.setState({
            chonRadio: event.target.value
        })
    }

    selectPB = () => {
        return <Select className="ml-3"
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

    layTenNV = (idNVofHD) => {
        for (let i = 0; i < this.state.nvs.length; i++) {
            if (idNVofHD == this.state.nvs[i].idnhanVien) {
                idNVofHD = this.state.nvs[i].hoDem + " " + this.state.nvs[i].ten
            }
        }
        return idNVofHD
    }

    xoaHD(idhd, idnv) {
        if (window.confirm('Bạn có chắc muốn xóa hợp đồng của nhân viên này?')) {
            axios.delete('https://localhost:44390/api/hopdongs/' + idhd)

            var arrayNV = []
            for (let i = 0; i < this.state.nvs.length; i++) {
                if (this.state.nvs[i].idnhanVien == idnv) {
                    arrayNV.push({
                        idnhanVien: idnv,
                        hoDem: this.state.nvs[i].hoDem,
                        ten: this.state.nvs[i].ten,
                        tinhTrangHonNhan: this.state.nvs[i].tinhTrangHonNhan,
                        ngaySinh: this.state.nvs[i].ngaySinh,
                        noiSinh: this.state.nvs[i].noiSinh,
                        gioiTinh: this.state.nvs[i].gioiTinh,
                        hinhAnh: this.state.nvs[i].hinhAnh,
                        diaChiThuongTru: this.state.nvs[i].diaChiThuongTru,
                        choOhienTai: this.state.nvs[i].choOhienTai,
                        soCmnn: this.state.nvs[i].soCmnn,
                        ngayCap: this.state.nvs[i].ngayCap,
                        tonGiao: this.state.nvs[i].tonGiao,
                        noiCap: this.state.nvs[i].noiCap,
                        quocTich: this.state.nvs[i].quocTich,
                        email: this.state.nvs[i].email,
                        soDienThoai: this.state.nvs[i].soDienThoai,
                        //nganhHoc: event.target.NhanvienNganhHoc.value,
                        noiDaoTao: this.state.nvs[i].noiDaoTao,
                        //xepLoai: this.props.,
                        //username
                        idphongBan: this.state.nvs[i].idphongBan,
                        idchucVu: this.state.nvs[i].idchucVu,
                        //idquanHeGd
                        ////trangThaiHoSo=> 
                        trangthaiHDThuViec: "Đã xóa hđ",
                        trangthaiHDChinhThuc: "Đã xóa hđ",
                        iddanToc: this.state.nvs[i].iddanToc,
                        idtrinhDo: this.state.nvs[i].idtrinhDo,
                        idquyetDinhBn: this.state.nvs[i].idquyetDinhBn,
                    })
                }
            }
            axios.put('https://localhost:44390/api/nhanviens/mangput', arrayNV)
            alert("Xóa thành công")
        }
    }

    checkBtnXoaHD(idnv) {
        return this.state.nvs.map(nv => {
            return this.state.hds.map(hd => {
                if (idnv == nv.idnhanVien  /// hợp đồng CHÍNH THỨC
                    && (nv.trangthaiHdthuViec == "Đã thôi việc" && nv.trangthaiHdchinhThuc == "Đã thôi việc")
                    && nv.noiDaoTao == "Bổ nhiệm"
                    && idnv == hd.idnhanVien
                    && hd.idloaiHd == 10
                    && hd.ghiChu == "Hủy"
                ) {
                    return (
                        <Button><DeleteIcon color="secondary"
                            onClick={() => this.xoaHD(hd.idhopDong, nv.idnhanVien)}
                        /></Button>)
                }
            })
        })
    }

    showDataTable = () => {
        const { hds, nvs } = this.state
        //let addModalClose = () => this.setState({ addModalShow: false })
        //let editModalClose = () => this.setState({ editModalShow: false })
        //let showModalClose = () => this.setState({ showModalShow: false })
        // var date = new Date()
        // var ngay = date.getDate()
        // var thang = date.getMonth()+1
        // var nam = date.getFullYear()
        // var hientai = ngay + "-" + thang + "-" + nam
        var DMY = format(new Date(), 'yyyy-MM-dd')
        //console.log(DMY)
        return hds.map(hd => {
            return nvs.map(nv => {
                if (this.state.chonRadio == "Chưa hủy"
                    && hd.ghiChu == "Ký"
                ) {
                    if (hd.idloaiHd == 10
                        && hd.idnhanVien == nv.idnhanVien
                        && (nv.idphongBan == this.state.chonPB || this.state.chonPB == '')
                        && (parseInt(differenceInDays(new Date(hd.ngayHetHan.substring(0, 10)), new Date(DMY))) < 0)
                    ) {
                        return (
                            <StyledTableRow>
                                {/* <StyledTableCell>{index +1}</StyledTableCell> */}
                                <StyledTableCell>{this.layTenNV(hd.idnhanVien)}</StyledTableCell>
                                <StyledTableCell>{format(new Date(hd.ngayLapHd), 'dd-MM-yyyy')}</StyledTableCell>
                                <StyledTableCell>{format(new Date(hd.ngayBatDau), 'dd-MM-yyyy')}</StyledTableCell>
                                <StyledTableCell>{format(new Date(hd.ngayHetHan), 'dd-MM-yyyy')}</StyledTableCell>
                                <StyledTableCell >Đã hết hạn</StyledTableCell>
                            </StyledTableRow>)
                    }
                    else if (hd.idloaiHd == 10
                        && hd.idnhanVien == nv.idnhanVien
                        && (nv.idphongBan == this.state.chonPB || this.state.chonPB == '')
                        && (parseInt(differenceInDays(new Date(hd.ngayHetHan.substring(0, 10)), new Date(DMY))) > 0)
                    ) {
                        return (
                            <StyledTableRow>
                                {/* <StyledTableCell>{index + 1}</StyledTableCell> */}
                                <StyledTableCell>{this.layTenNV(hd.idnhanVien)}</StyledTableCell>
                                <StyledTableCell>{format(new Date(hd.ngayLapHd), 'dd-MM-yyyy')}</StyledTableCell>
                                <StyledTableCell>{format(new Date(hd.ngayBatDau), 'dd-MM-yyyy')}</StyledTableCell>
                                <StyledTableCell>{format(new Date(hd.ngayHetHan), 'dd-MM-yyyy')}</StyledTableCell>
                                <StyledTableCell>Còn lại {differenceInDays(new Date(hd.ngayHetHan.substring(0, 10)), new Date(DMY))} ngày</StyledTableCell>
                            </StyledTableRow>)
                    }
                } ////////// Click Radio Đã hủy hđ
                else {
                    if (this.state.chonRadio == "Đã hủy"
                        && hd.ghiChu == "Hủy"
                    ) {
                        if (hd.idloaiHd == 10
                            && hd.idnhanVien == nv.idnhanVien
                            && (nv.idphongBan == this.state.chonPB || this.state.chonPB == '')
                            && (parseInt(differenceInDays(new Date(hd.ngayHetHan.substring(0, 10)), new Date(DMY))) < 0)
                        ) {
                            return (
                                <StyledTableRow>
                                    {/* <StyledTableCell>{index +1}</StyledTableCell> */}
                                    <StyledTableCell>{this.layTenNV(hd.idnhanVien)}</StyledTableCell>
                                    <StyledTableCell>{format(new Date(hd.ngayLapHd), 'dd-MM-yyyy')}</StyledTableCell>
                                    <StyledTableCell>{format(new Date(hd.ngayBatDau), 'dd-MM-yyyy')}</StyledTableCell>
                                    <StyledTableCell>{format(new Date(hd.ngayHetHan), 'dd-MM-yyyy')}</StyledTableCell>
                                    <StyledTableCell >Đã hết hạn</StyledTableCell>
                                    <StyledTableCell >{this.checkBtnXoaHD(nv.idnhanVien)}</StyledTableCell>
                                </StyledTableRow>)
                        }
                        else if (hd.idloaiHd == 10
                            && hd.idnhanVien == nv.idnhanVien
                            && (nv.idphongBan == this.state.chonPB || this.state.chonPB == '')
                            && (parseInt(differenceInDays(new Date(hd.ngayHetHan.substring(0, 10)), new Date(DMY))) > 0)
                        ) {
                            return (
                                <StyledTableRow>
                                    {/* <StyledTableCell>{index + 1}</StyledTableCell> */}
                                    <StyledTableCell>{this.layTenNV(hd.idnhanVien)}</StyledTableCell>
                                    <StyledTableCell>{format(new Date(hd.ngayLapHd), 'dd-MM-yyyy')}</StyledTableCell>
                                    <StyledTableCell>{format(new Date(hd.ngayBatDau), 'dd-MM-yyyy')}</StyledTableCell>
                                    <StyledTableCell>{format(new Date(hd.ngayHetHan), 'dd-MM-yyyy')}</StyledTableCell>
                                    <StyledTableCell>Còn lại {differenceInDays(new Date(hd.ngayHetHan.substring(0, 10)), new Date(DMY))} ngày</StyledTableCell>
                                    <StyledTableCell >{this.checkBtnXoaHD(nv.idnhanVien)}</StyledTableCell>
                                </StyledTableRow>)
                        }
                    }
                }

            })
        })
    }

    render() {
        return (
            <div>
                <div className="container text-center">
                    <h2 className="display-7">DANH SÁCH HỢP ĐỒNG THỬ VIỆC</h2><hr />
                </div>

                <Row>
                    <Col sm={4}>
                        <label>Chọn xem danh sách nhân viên</label>
                        <RadioGroup
                            //name="gender1"
                            value={this.state.chonRadio}
                            onChange={this.handleChangeCheck}
                        >
                            <FormControlLabel value="Chưa hủy" control={<Radio />} label="Chưa hủy hợp đồng" />
                            <FormControlLabel value="Đã hủy" control={<Radio />} label="Đã hủy hợp đồng" />
                        </RadioGroup>
                    </Col>
                    <Col sm={4}></Col>
                    <Col sm={4}>
                        <Form.Label>Chọn phòng ban: </Form.Label>
                        {this.selectPB()}
                    </Col>
                </Row>

                <TableContainer>
                    <StyledTable className="mt-3">
                        <TableHead>
                            <StyledTableRow>
                                {/* <StyledTableCell>#</StyledTableCell> */}
                                <StyledTableCell>Họ tên nhân viên</StyledTableCell>
                                <StyledTableCell>Ngày ký hợp đồng</StyledTableCell>
                                <StyledTableCell>Ngày bắt đầu</StyledTableCell>
                                <StyledTableCell>Ngày kết thúc</StyledTableCell>
                                <StyledTableCell>Hạn hợp đồng</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {this.showDataTable()}
                        </TableBody>
                    </StyledTable>
                </TableContainer>
            </div>)
    }
}
