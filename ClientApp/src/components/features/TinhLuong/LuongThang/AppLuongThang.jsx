import React, { Component } from 'react'
import { Form, Row, Col } from 'react-bootstrap';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, ButtonGroup, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import ExposureIcon from '@material-ui/icons/Exposure';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import { format, differenceInDays, getMonth, getYear } from 'date-fns'
import axios from 'axios';

import { EditLuongThangModal } from './EditLuongThangModal'
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
    },
}))(Table);


export class AppLuongThang extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nhanviens: [],
            bangluongs: [],
            cctonghops: [],
            //chonLoaiHD: -1,
            arrayBL: [],
            ThangNamChamCong: 'dd-MM-yyyy',
            addModalShow: false,
            editModalShow: false,
            showModalShow: false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.loadNV()
        this.loadBangLuong()
    }
    componentDidUpdate() {
        this.loadBangLuong()
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

    layTenNV = (idNVofCC) => {
        for (let i = 0; i < this.state.nhanviens.length; i++) {
            if (idNVofCC == this.state.nhanviens[i].idnhanVien) {
                idNVofCC = this.state.nhanviens[i].hoDem + " " + this.state.nhanviens[i].ten
            }
        }
        return idNVofCC
    }

    // handleChange(event) {
    //     this.setState({
    //         chonLoaiHD: event.target.value
    //     })
    // }

    // getHDtoLoaiHD = () => {
    //     return <select className="ml-3" onChange={this.handleChange}>
    //         {
    //             this.state.loaihds.map(lhd => {
    //                 return (
    //                     <option value={lhd.idloaiHd}>
    //                         {lhd.tenHopDong}
    //                     </option>
    //                 )
    //             })}
    //     </select>
    // }


    // layTenNV = (idNVofHD) => {
    //     for (let i = 0; i < this.state.nhanviens.length; i++) {
    //         if (idNVofHD == this.state.nhanviens[i].idnhanVien) {
    //             idNVofHD = this.state.nhanviens[i].hoDem + " " + this.state.nhanviens[i].ten
    //         }
    //     }
    //     return idNVofHD
    // }

    handleChange = (event) => {
        const name = event.target.name;
        const values = event.target.value;
        var layThang = getMonth(new Date(values)) + 1
        var layNam = getYear(new Date(values))
        var namThang = layNam + "-" + layThang
        var MY = format(new Date(namThang), 'yyyy-MM')
        // console.log("thang: "+layThang)
        // console.log("nam: "+layNam)
        //console.log("thang nam format: " + MY)

        this.setState({
            ThangNamChamCong: MY
        })
    }

    checkButtonThemPhuCap(idbl) {
        var layThangDaChon = getMonth(new Date(this.state.ThangNamChamCong)) + 1
        var layNamDaChon = getYear(new Date(this.state.ThangNamChamCong))
        return this.state.bangluongs.map(bl => {
            return this.state.nhanviens.map(nv => {
                if (idbl == bl.idnhanVien
                    && bl.idnhanVien == nv.idnhanVien
                    && layThangDaChon == parseInt(bl.thang)
                    && layNamDaChon == parseInt(bl.nam)
                    && bl.trangThai == null
                    && bl.phuCapKhac == 0
                ) {
                    return (
                        <Button>
                            <ExposureIcon color="secondary"
                                onClick={() => this.setState({
                                    editModalShow: true,
                                    idbangLuong: bl.idbangLuong,
                                    idnhanVien: bl.idnhanVien,
                                    thang: bl.thang,
                                    nam: bl.nam,
                                    mucLuong: bl.mucLuong,
                                    tienThuong: bl.tienThuong,
                                    tienPhatDiTre: bl.tienPhatDiTre,
                                    //tienThuongLe: bl.tienThuongLe,
                                    tongThuNhap: bl.tongThuNhap,
                                    //tienNgayNghi: bl.tienNgayNghi,
                                    tienPhat: bl.tienPhat,
                                    tongGioTangCa: bl.tongGioTangCa,
                                    tienTangCa: bl.tienTangCa,
                                    tienTamUng: bl.tienTamUng,
                                    phuCapKhac: bl.phuCapKhac,
                                    truBh: bl.truBh,
                                    soNgayCong: bl.soNgayCong,
                                    soNgayDiTre: bl.soNgayDiTre,
                                    soNgayDiTreKhongTinhLuong: bl.soNgayDiTreKhongTinhLuong,
                                    soNgayNghi: bl.soNgayNghi,
                                    ghiChu: bl.ghiChu,
                                    heSoChucVu: bl.heSoChucVu,
                                    heSoChuyenMon: bl.heSoChuyenMon,
                                    trangThai: bl.trangThai,
                                    soLuongChiuThue: bl.soLuongChiuThue,
                                    thueTncn: bl.thueTncn,
                                    tienThucLinh: bl.tienThucLinh,
                                    //idthuongLe: bl.idthuongLe,
                                    nvid: nv.idnhanVien,
                                    nvhodem: nv.hoDem,
                                    nvten: nv.ten,
                                    nvgioitinh: nv.gioiTinh,
                                    nvhinh: nv.hinhAnh
                                })}
                            >
                            </ExposureIcon>
                        </Button>)
                }
                else {
                    if (idbl == bl.idnhanVien
                        && bl.idnhanVien == nv.idnhanVien
                        && layThangDaChon == parseInt(bl.thang)
                        && layNamDaChon == parseInt(bl.nam)
                        && bl.trangThai == null
                        && bl.phuCapKhac != 0
                    ) {
                        return (
                            <Button>
                                <ExposureIcon color="disabled"
                                    onClick={() => this.setState({
                                        editModalShow: true,
                                        idbangLuong: bl.idbangLuong,
                                        idnhanVien: bl.idnhanVien,
                                        thang: bl.thang,
                                        nam: bl.nam,
                                        mucLuong: bl.mucLuong,
                                        tienThuong: bl.tienThuong,
                                        tienPhatDiTre: bl.tienPhatDiTre,
                                        //tienThuongLe: bl.tienThuongLe,
                                        tongThuNhap: bl.tongThuNhap,
                                        //tienNgayNghi: bl.tienNgayNghi,
                                        tienPhat: bl.tienPhat,
                                        tongGioTangCa: bl.tongGioTangCa,
                                        tienTangCa: bl.tienTangCa,
                                        tienTamUng: bl.tienTamUng,
                                        phuCapKhac: bl.phuCapKhac,
                                        truBh: bl.truBh,
                                        soNgayCong: bl.soNgayCong,
                                        soNgayDiTre: bl.soNgayDiTre,
                                        soNgayDiTreKhongTinhLuong: bl.soNgayDiTreKhongTinhLuong,
                                        soNgayNghi: bl.soNgayNghi,
                                        ghiChu: bl.ghiChu,
                                        heSoChucVu: bl.heSoChucVu,
                                        heSoChuyenMon: bl.heSoChuyenMon,
                                        trangThai: bl.trangThai,
                                        soLuongChiuThue: bl.soLuongChiuThue,
                                        thueTncn: bl.thueTncn,
                                        tienThucLinh: bl.tienThucLinh,
                                        //idthuongLe: bl.idthuongLe,
                                        nvid: nv.idnhanVien,
                                        nvhodem: nv.hoDem,
                                        nvten: nv.ten,
                                        nvgioitinh: nv.gioiTinh,
                                        nvhinh: nv.hinhAnh
                                    })}
                                >
                                </ExposureIcon>
                            </Button>)
                    }
                }
            })

        })
    }

    checkShowButtonKhoaLuong() {
        var layThangDaChon = getMonth(new Date(this.state.ThangNamChamCong)) + 1
        var layNamDaChon = getYear(new Date(this.state.ThangNamChamCong))
        for (let i = 0; i < this.state.bangluongs.length; i++) {
            if (this.state.ThangNamChamCong != "dd-MM-yyyy"
                && layThangDaChon == parseInt(this.state.bangluongs[i].thang)
                && layNamDaChon == parseInt(this.state.bangluongs[i].nam)
                && this.state.bangluongs[i].trangThai == null
            ) {
                return (
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<LockIcon />}
                        onClick={() => this.sukienKhoaLuong()}
                    >Khóa bảng lương
                    </Button>)
            }//else Hủy khóa
            else {
                if (this.state.ThangNamChamCong != "dd-MM-yyyy"
                    && layThangDaChon == parseInt(this.state.bangluongs[i].thang)
                    && layNamDaChon == parseInt(this.state.bangluongs[i].nam)
                    && this.state.bangluongs[i].trangThai != null
                ) {
                    return (
                        <Button
                            variant="contained"
                            color="inherit"
                            startIcon={<LockOpenIcon />}
                            onClick={() => this.sukienHuyKhoaLuong()}
                        >Hủy khóa bảng lương
                        </Button>)
                }
            }
        }
    }

    sukienKhoaLuong() {
        //eventt.preventDefault();
        var layThangDaChon = getMonth(new Date(this.state.ThangNamChamCong)) + 1
        var layNamDaChon = getYear(new Date(this.state.ThangNamChamCong))
        var newArrayBLHuy = []
        for (let i = 0; i < this.state.bangluongs.length; i++) {
            if (layThangDaChon == parseInt(this.state.bangluongs[i].thang)
                && layNamDaChon == parseInt(this.state.bangluongs[i].nam)
            ) {
                newArrayBLHuy.push(this.state.bangluongs[i])
            }
        }
        let layIDbl = newArrayBLHuy.map(v => v['idbangLuong'])

        var arrayBL = [] // Mảng CHÍNH
        for (let i = 0; i < layIDbl.length; i++) {
            for (let j = 0; j < this.state.bangluongs.length; j++) {
                if (layIDbl[i] == this.state.bangluongs[j].idbangLuong
                    && layThangDaChon == parseInt(this.state.bangluongs[j].thang)
                    && layNamDaChon == parseInt(this.state.bangluongs[j].nam)
                ) {
                    //console.log("lay: " + layIDbl[i])
                    //console.log("bl: " + this.state.bangluongs[j].idbangLuong)
                    arrayBL.push({
                        idbangLuong: layIDbl[i],
                        idnhanVien: this.state.bangluongs[j].idnhanVien,
                        thang: this.state.bangluongs[j].thang,
                        nam: this.state.bangluongs[j].nam,
                        mucLuong: this.state.bangluongs[j].mucLuong,
                        tienThuong: this.state.bangluongs[j].tienThuong,
                        //tienThuongLe: this.state.bangluongs[j].tienThuongLe,
                        tienPhatDiTre: this.state.bangluongs[j].tienPhatDiTre,
                        //tienNgayNghi: this.state.bangluongs[j].tienNgayNghi,
                        tongThuNhap: this.state.bangluongs[j].tongThuNhap,
                        tienPhat: this.state.bangluongs[j].tienPhat,
                        tongGioTangCa: this.state.bangluongs[j].tongGioTangCa,
                        tienTangCa: this.state.bangluongs[j].tienTangCa,
                        tienTamUng: this.state.bangluongs[j].tienTamUng,
                        phuCapKhac: this.state.bangluongs[j].phuCapKhac,
                        truBh: this.state.bangluongs[j].truBh,
                        soNgayCong: this.state.bangluongs[j].soNgayCong,
                        soNgayDiTre: this.state.bangluongs[j].soNgayDiTre,
                        soNgayDiTreKhongTinhLuong: this.state.bangluongs[j].soNgayDiTreKhongTinhLuong,
                        soNgayNghi: this.state.bangluongs[j].soNgayNghi,
                        tienThucLinh: this.state.bangluongs[j].tienThucLinh,
                        ghiChu: this.state.bangluongs[j].ghiChu,
                        heSoChucVu: this.state.bangluongs[j].heSoChucVu,
                        heSoChuyenMon: this.state.bangluongs[j].heSoChuyenMon,
                        trangThai: 1,
                        soLuongChiuThue: this.state.bangluongs[j].soLuongChiuThue,
                        thueTncn: this.state.bangluongs[j].thueTncn,
                        //idthuongLe: this.state.bangluongs[j].idthuongLe
                    })
                }
            }
        }
        //console.log(arrayBL)
        if (window.confirm('Bạn có chắc muốn khóa?')) {
            axios.put('https://localhost:44390/api/bangluongs/mangput', arrayBL)
                .then(response => {
                    this.setState({ arrayBL: response.data })
                    alert("Khóa thành công")
                })
                .catch(error => {
                    this.setState({ showError: "Lỗi post dữ liệu" })
                    alert("Khóa không thành công")
                })
        }
    }

    sukienHuyKhoaLuong() {
        var layThangDaChon = getMonth(new Date(this.state.ThangNamChamCong)) + 1
        var layNamDaChon = getYear(new Date(this.state.ThangNamChamCong))
        var newArrayBLHuy = []
        for (let i = 0; i < this.state.bangluongs.length; i++) {
            if (layThangDaChon == parseInt(this.state.bangluongs[i].thang)
                && layNamDaChon == parseInt(this.state.bangluongs[i].nam)
            ) {
                newArrayBLHuy.push(this.state.bangluongs[i])
            }
        }
        let layIDbl = newArrayBLHuy.map(v => v['idbangLuong'])

        var arrayBL = [] // Mảng CHÍNH
        for (let i = 0; i < layIDbl.length; i++) {
            for (let j = 0; j < this.state.bangluongs.length; j++) {
                if (layIDbl[i] == this.state.bangluongs[j].idbangLuong
                    && layThangDaChon == parseInt(this.state.bangluongs[j].thang)
                    && layNamDaChon == parseInt(this.state.bangluongs[j].nam)
                ) {
                    arrayBL.push({
                        idbangLuong: layIDbl[i],
                        idnhanVien: this.state.bangluongs[j].idnhanVien,
                        thang: this.state.bangluongs[j].thang,
                        nam: this.state.bangluongs[j].nam,
                        mucLuong: this.state.bangluongs[j].mucLuong,
                        tienThuong: this.state.bangluongs[j].tienThuong,
                        //tienThuongLe: this.state.bangluongs[j].tienThuongLe,
                        tienPhatDiTre: this.state.bangluongs[j].tienPhatDiTre,
                        //tienNgayNghi: this.state.bangluongs[j].tienNgayNghi,
                        tongThuNhap: this.state.bangluongs[j].tongThuNhap,
                        tienPhat: this.state.bangluongs[j].tienPhat,
                        tongGioTangCa: this.state.bangluongs[j].tongGioTangCa,
                        tienTangCa: this.state.bangluongs[j].tienTangCa,
                        tienTamUng: this.state.bangluongs[j].tienTamUng,
                        phuCapKhac: this.state.bangluongs[j].phuCapKhac,
                        truBh: this.state.bangluongs[j].truBh,
                        soNgayCong: this.state.bangluongs[j].soNgayCong,
                        soNgayDiTre: this.state.bangluongs[j].soNgayDiTre,
                        soNgayDiTreKhongTinhLuong: this.state.bangluongs[j].soNgayDiTreKhongTinhLuong,
                        soNgayNghi: this.state.bangluongs[j].soNgayNghi,
                        tienThucLinh: this.state.bangluongs[j].tienThucLinh,
                        ghiChu: this.state.bangluongs[j].ghiChu,
                        heSoChucVu: this.state.bangluongs[j].heSoChucVu,
                        heSoChuyenMon: this.state.bangluongs[j].heSoChuyenMon,
                        trangThai: null,
                        soLuongChiuThue: this.state.bangluongs[j].soLuongChiuThue,
                        thueTncn: this.state.bangluongs[j].thueTncn,
                        //idthuongLe: this.state.bangluongs[j].idthuongLe
                    })
                }
            }
        }
        if (window.confirm('Bạn có chắc muốn hủy?')) {
            axios.put('https://localhost:44390/api/bangluongs/mangput', arrayBL)
                .then(response => {
                    this.setState({ arrayBL: response.data })
                    alert("Hủy khóa thành công")
                })
                .catch(error => {
                    this.setState({ showError: "Lỗi post dữ liệu" })
                    alert("Hủy khóa không thành công")
                })
        }
    }

    getTableData() {
        const { bangluongs, nhanviens, idbangLuong, tienThuong, tongThuNhap, tongGioTangCa, tienPhat, ghiChu,
            tienTangCa, tienTamUng, phuCapKhac, truBh, soNgayCong, soNgayNghi, tienThucLinh, heSoChucVu,
            heSoChuyenMon, idnhanVien, thang, nam, trangThai, mucLuong, soLuongChiuThue, thueTncn,
            tienPhatDiTre, soNgayDiTre, soNgayDiTreKhongTinhLuong,
            nvid, nvten, nvhodem, nvgioitinh, nvhinh } = this.state
        //let addModalClose = () => this.setState({ addModalShow: false })
        let editModalClose = () => this.setState({ editModalShow: false })
        //let showModalClose = () => this.setState({ showModalShow: false })

        var layThangDaChon = getMonth(new Date(this.state.ThangNamChamCong)) + 1
        var layNamDaChon = getYear(new Date(this.state.ThangNamChamCong))

        const formatter = new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        })
        var flag = false
        for (let i = 0; i < bangluongs.length; i++) {
            if ((layThangDaChon == bangluongs[i].thang
                && layNamDaChon == bangluongs[i].nam)
            ) {
                flag = true
            }
        }
        if (flag) {
            return bangluongs.map(bl => {
                return nhanviens.map(nv => {
                    if (bl.idnhanVien == nv.idnhanVien
                        && (layThangDaChon == bl.thang)
                        && (layNamDaChon == bl.nam)
                    ) {
                        return (<StyledTableRow key={bl.thang}>
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
                            
                            <StyledTableCell align="right">

                                {this.checkButtonThemPhuCap(bl.idnhanVien)}

                                <EditLuongThangModal
                                    show={this.state.editModalShow}
                                    onHide={editModalClose}
                                    idbangLuong={idbangLuong}
                                    idnhanVien={idnhanVien}
                                    thang={thang}
                                    nam={nam}
                                    mucLuong={mucLuong}
                                    tienThuong={tienThuong}
                                    //tienThuongLe={tienThuongLe}
                                    tienPhatDiTre={tienPhatDiTre}
                                    tongThuNhap={tongThuNhap}
                                    //tienNgayNghi={tienNgayNghi}
                                    tienPhat={tienPhat}
                                    tongGioTangCa={tongGioTangCa}
                                    tienTangCa={tienTangCa}
                                    tienTamUng={tienTamUng}
                                    phuCapKhac={phuCapKhac}
                                    truBh={truBh}
                                    soNgayCong={soNgayCong}
                                    soNgayDiTre={soNgayDiTre}
                                    soNgayDiTreKhongTinhLuong={soNgayDiTreKhongTinhLuong}
                                    soNgayNghi={soNgayNghi}
                                    ghiChu={ghiChu}
                                    heSoChucVu={heSoChucVu}
                                    heSoChuyenMon={heSoChuyenMon}
                                    trangThai={trangThai}
                                    soLuongChiuThue={soLuongChiuThue}
                                    thueTncn={thueTncn}
                                    tienThucLinh={tienThucLinh}
                                    nvid={nvid}
                                    nvhodem={nvhodem}
                                    nvten={nvten}
                                    nvgioitinh={nvgioitinh}
                                    nvpic={nvhinh}
                                >
                                </EditLuongThangModal>

                            </StyledTableCell>
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
                    <h1 className="display-7">TÍNH LƯƠNG THÁNG</h1><hr />
                </div>

                <Form>
                    <Row>
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

                        <Col sm={3} className="ml-10">
                            {this.checkShowButtonKhoaLuong()}
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