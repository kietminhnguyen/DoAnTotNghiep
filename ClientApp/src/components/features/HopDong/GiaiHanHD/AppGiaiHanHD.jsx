import React, { Component } from 'react'
//import { Button, ButtonToolbar, Table, Form } from 'react-bootstrap'
import { Form, Col, Row } from 'react-bootstrap'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Select, MenuItem, FormControlLabel, RadioGroup, Radio } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import VisibilityIcon from '@material-ui/icons/Visibility';
import ExtensionIcon from '@material-ui/icons/Extension';

import { format, differenceInDays } from 'date-fns'

import { AddGiaiHanHDModal } from './AddGiaiHanHDModal'
import { ShowGiaiHanHDModal } from './ShowGiaiHanHDModal'


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

export class AppGiaiHanHD extends Component {
    //static displayName = AppPhongBan.name;


    constructor(props) {
        super(props);
        this.state = {
            pbs: [],
            hds: [],
            loaihds: [],
            nhanviens: [],

            chonLoaiHD: '',

            addModalShow: false,
            editModalShow: false,
            showModalShow: false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.loadNV()
        this.loadPB()
        this.loadLoaiHD()
        this.loadHD()
    }

    componentDidUpdate() {
        //this.loadNV()
        this.loadHD()
    }

    loadNV() {
        fetch('https://localhost:44390/api/nhanviens')
            .then(response => response.json())
            .then(data => {
                this.setState({ nhanviens: data });
            });
    }

    loadPB() {
        fetch('https://localhost:44390/api/phongbans')
            .then(respone => respone.json())
            .then(data => {
                this.setState({ pbs: data })
            })
    }

    loadHD() {
        fetch('https://localhost:44390/api/hopdongs')
            .then(respone => respone.json())
            .then(data => {
                this.setState({ hds: data })
            })
    }

    loadLoaiHD() {
        fetch('https://localhost:44390/api/loaihopdongs')
            .then(respone => respone.json())
            .then(data => {
                this.setState({ loaihds: data })
            })
    }

    handleChange(event) {
        this.setState({
            chonLoaiHD: event.target.value
        })
    }

    getHDtoLoaiHD = () => {
        return <Select className="ml-3"
            value={this.state.chonLoaiHD}
            onChange={this.handleChange}>
            {
                this.state.loaihds.map(lhd => {
                    return (
                        <MenuItem value={lhd.idloaiHd}>
                            {lhd.tenHopDong}
                        </MenuItem >
                    )
                })}
        </Select>
    }


    layTenNV = (idNVofHD) => {
        for (let i = 0; i < this.state.nhanviens.length; i++) {
            if (idNVofHD == this.state.nhanviens[i].idnhanVien) {
                idNVofHD = this.state.nhanviens[i].hoDem + " " + this.state.nhanviens[i].ten
            }
        }
        return idNVofHD
    }

    getData = () => {
        let addModalClose = () => this.setState({ addModalShow: false })
        //let editModalClose = () => this.setState({ editModalShow: false })
        let showModalClose = () => this.setState({ showModalShow: false })
        const { hds, hdid, hdky, hdbatdau, hdketthuc, hdghichu, hdloai, hdidnv, nhanviens,
            nvpb, nvcv, nvid, nvho, nvten, nvgioitinh, nvsdt, nvmail, nvhinh, nvtrangthaiHdthuViec,
            nvtrangthaiHdChinhThuc, nvtinhtranghonnhan, nvngaysinh, nvnoisinh,
            nvchohientai, nvsocmnd, nvngaycap, nvnoicap, nvtongiao, nvquoctich,
            nvnoidaotao, nvdantoc, nvdcthuongtru, nvdaotao, nvusername ,nvqdbn } = this.state

        // var date = new Date()
        // var ngay = date.getDate()
        // var thang = date.getMonth() + 1
        // var nam = date.getFullYear()
        // var DMY = ngay + "-" + thang + "-" + nam
        var DMY = format(new Date(), 'yyyy-MM-dd')
        //console.log("dmy:" + DMY)    
        return nhanviens.map(nv => {
            return hds.map(hd => {
                if (hd.idloaiHd == this.state.chonLoaiHD
                    && nv.trangthaiHdchinhThuc != "Đã thôi việc" && nv.trangthaiHdthuViec != "Đã thôi việc"
                    
                    && nv.idnhanVien == hd.idnhanVien
                    && this.state.chonLoaiHD == 10
                    && differenceInDays(new Date(hd.ngayHetHan), new Date(DMY)) <= 7
                ) { //thử việc
                    if (parseInt(differenceInDays(new Date(hd.ngayHetHan), new Date(DMY))) < 0) {
                        return (
                            <StyledTableRow>
                                {/* <StyledTableCell>{key + 1}</StyledTableCell> */}
                                <StyledTableCell>{this.layTenNV(hd.idnhanVien)}</StyledTableCell>
                                <StyledTableCell align="center">{format(new Date(hd.ngayLapHd), 'dd-MM-yyyy')}</StyledTableCell>
                                <StyledTableCell align="center">{format(new Date(hd.ngayBatDau), 'dd-MM-yyyy')}</StyledTableCell>
                                <StyledTableCell align="center">{format(new Date(hd.ngayHetHan), 'dd-MM-yyyy')}</StyledTableCell>
                                <StyledTableCell align="center">Đã hết hạn</StyledTableCell>

                                <StyledTableCell align="right">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<ExtensionIcon />}
                                        onClick={() => this.setState({
                                            addModalShow: true,

                                            //truyền hợp đồng
                                            hdid: hd.idhopDong,
                                            hdky: hd.ngayLapHd,
                                            hdbatdau: hd.ngayBatDau,
                                            hdketthuc: hd.ngayHetHan,
                                            hdghichu: hd.ghiChu,
                                            hdloai: hd.idloaiHd,
                                            hdidnv: hd.idnhanVien,

                                            //truyền nhân viên
                                            nvid: nv.idnhanVien,
                                            nvpb: nv.idphongBan,
                                            nvho: nv.hoDem,
                                            nvten: nv.ten,
                                            nvgioitinh: nv.gioiTinh,
                                            nvsdt: nv.soDienThoai,
                                            nvngaysinh: nv.ngaySinh.substring(0, 10),
                                            nvtinhtranghonnhan: nv.tinhTrangHonNhan,
                                            nvdcthuongtru: nv.diaChiThuongTru,
                                            nvnoisinh: nv.noiSinh,
                                            nvtongiao: nv.tonGiao,
                                            nvchohientai: nv.choOhienTai,
                                            nvsocmnd: nv.soCmnn,
                                            nvngaycap: nv.ngayCap,
                                            nvnoicap: nv.noiCap.substring(0, 10),
                                            nvmail: nv.email,
                                            //nvnganhhoc: nv.nganhHoc,
                                            nvnoidaotao: nv.noiDaoTao,
                                            //nvxeploai: nv.xepLoai,
                                            nvusername: nv.username,
                                            nvdantoc: nv.iddanToc,
                                            nvdaotao: nv.idtrinhDo,
                                            nvquoctich: nv.quocTich,
                                            nvcv: nv.idchucVu,
                                            nvtrangthaiHdChinhThuc: nv.trangthaiHdchinhThuc,
                                            nvhinh: nv.hinhAnh,
                                            nvqdbn: nv.idquyetDinhBn
                                        })}
                                    >Gia hạn
                                        </Button>

                                    <Button>
                                        <VisibilityIcon color="action"
                                            onClick={() => this.setState({
                                                showModalShow: true,

                                                //truyền hợp đồng
                                                hdid: hd.idhopDong,
                                                hdky: hd.ngayLapHd,
                                                hdbatdau: hd.ngayBatDau,
                                                hdketthuc: hd.ngayHetHan,
                                                hdghichu: hd.ghiChu,
                                                hdloai: hd.idloaiHd,
                                                hdidnv: hd.idnhanVien,

                                                //truyền nhân viên
                                                nvid: nv.idnhanVien,
                                                nvpb: nv.idphongBan,
                                                nvho: nv.hoDem,
                                                nvten: nv.ten,
                                                nvgioitinh: nv.gioiTinh,
                                                nvsdt: nv.soDienThoai,
                                                nvngaysinh: nv.ngaySinh.substring(0, 10),
                                                nvtinhtranghonnhan: nv.tinhTrangHonNhan,
                                                nvdcthuongtru: nv.diaChiThuongTru,
                                                nvnoisinh: nv.noiSinh,
                                                nvtongiao: nv.tonGiao,
                                                nvchohientai: nv.choOhienTai,
                                                nvsocmnd: nv.soCmnn,
                                                nvngaycap: nv.ngayCap.substring(0, 10),
                                                nvnoicap: nv.noiCap,
                                                nvmail: nv.email,
                                                //nvnganhhoc: nv.nganhHoc,
                                                nvnoidaotao: nv.noiDaoTao,
                                                //nvxeploai: nv.xepLoai,
                                                nvdantoc: nv.iddanToc,
                                                nvdaotao: nv.idtrinhDo,
                                                nvquoctich: nv.quocTich,
                                                nvcv: nv.idchucVu,
                                                nvtrangthaiHdChinhThuc: nv.trangthaiHdchinhThuc,
                                                nvtrangthaiHdthuViec: nv.trangthaiHdthuViec,
                                                nvhinh: nv.hinhAnh
                                            })}>
                                        </VisibilityIcon>
                                    </Button>

                                    <AddGiaiHanHDModal
                                        show={this.state.addModalShow}
                                        onHide={addModalClose}

                                        //truyền hợp đồng
                                        hdid={hdid}
                                        hdky={hdky}
                                        hdbatdau={hdbatdau}
                                        hdketthuc={hdketthuc}
                                        hdghichu={hdghichu}
                                        hdloai={hdloai}
                                        hdidnv={hdidnv}

                                        //truyền nhân viên
                                        nvid={nvid}
                                        nvpb={nvpb}
                                        nvho={nvho}
                                        nvten={nvten}
                                        nvgioitinh={nvgioitinh}
                                        nvsdt={nvsdt}
                                        nvtinhtranghonnhan={nvtinhtranghonnhan}
                                        nvdcthuongtru={nvdcthuongtru}
                                        nvnoisinh={nvnoisinh}
                                        nvtongiao={nvtongiao}
                                        nvchohientai={nvchohientai}
                                        nvsocmnd={nvsocmnd}
                                        nvngaycap={nvngaycap}
                                        nvnoicap={nvnoicap}
                                        nvmail={nvmail}
                                        //nvnganhhoc={nvnganhhoc}
                                        nvnoidaotao={nvnoidaotao}
                                        //nvxeploai={nvxeploai}
                                        nvusername={nvusername}
                                        nvdantoc={nvdantoc}
                                        nvdaotao={nvdaotao}
                                        nvngaysinh={nvngaysinh}
                                        nvquoctich={nvquoctich}
                                        nvcv={nvcv}
                                        nvtrangthaiHdChinhThuc={nvtrangthaiHdChinhThuc}
                                        nvpic={nvhinh}
                                        nvqdbn={nvqdbn}
                                    />

                                    <ShowGiaiHanHDModal
                                        show={this.state.showModalShow}
                                        onHide={showModalClose}

                                        //truyền hợp đồng
                                        hdid={hdid}
                                        hdky={hdky}
                                        hdbatdau={hdbatdau}
                                        hdketthuc={hdketthuc}
                                        hdghichu={hdghichu}
                                        hdloai={hdloai}
                                        hdidnv={hdidnv}

                                        //truyền nhân viên
                                        nvid={nvid}
                                        nvpb={nvpb}
                                        nvho={nvho}
                                        nvten={nvten}
                                        nvgioitinh={nvgioitinh}
                                        nvsdt={nvsdt}
                                        //nvnguyenquan={nvnguyenquan}
                                        nvtinhtranghonnhan={nvtinhtranghonnhan}
                                        nvdcthuongtru={nvdcthuongtru}
                                        nvnoisinh={nvnoisinh}
                                        nvtongiao={nvtongiao}
                                        nvchohientai={nvchohientai}
                                        nvsocmnd={nvsocmnd}
                                        nvngaycap={nvngaycap}
                                        nvnoicap={nvnoicap}
                                        nvmail={nvmail}
                                        //nvnganhhoc={nvnganhhoc}
                                        nvnoidaotao={nvnoidaotao}
                                        //nvxeploai={nvxeploai}
                                        nvdantoc={nvdantoc}
                                        nvdaotao={nvdaotao}
                                        nvngaysinh={nvngaysinh}
                                        nvquoctich={nvquoctich}
                                        nvcv={nvcv}
                                        nvtrangthaiHdChinhThuc={nvtrangthaiHdChinhThuc}
                                        nvtrangthaiHdthuViec={nvtrangthaiHdthuViec}
                                        nvpic={nvhinh}
                                    />
                                </StyledTableCell>

                            </StyledTableRow>)
                    } else if (parseInt(differenceInDays(new Date(hd.ngayHetHan), new Date(DMY))) > 0) {
                        return (
                            <StyledTableRow >
                                {/* <StyledTableCell>{key + 1}</StyledTableCell> */}
                                <StyledTableCell>{this.layTenNV(hd.idnhanVien)}</StyledTableCell>
                                <StyledTableCell align="center">{format(new Date(hd.ngayLapHd), 'dd-MM-yyyy')}</StyledTableCell>
                                <StyledTableCell align="center">{format(new Date(hd.ngayBatDau), 'dd-MM-yyyy')}</StyledTableCell>
                                <StyledTableCell align="center">{format(new Date(hd.ngayHetHan), 'dd-MM-yyyy')}</StyledTableCell>
                                <StyledTableCell align="center">Còn lại {differenceInDays(new Date(hd.ngayHetHan), new Date(DMY))} ngày</StyledTableCell>

                                <StyledTableCell align="right">

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<ExtensionIcon />}
                                        onClick={() => this.setState({
                                            addModalShow: true,

                                            //truyền hợp đồng
                                            hdid: hd.idhopDong,
                                            hdky: hd.ngayLapHd,
                                            hdbatdau: hd.ngayBatDau,
                                            hdketthuc: hd.ngayHetHan,
                                            hdghichu: hd.ghiChu,
                                            hdloai: hd.idloaiHd,
                                            hdidnv: hd.idnhanVien,

                                            //truyền nhân viên
                                            nvid: nv.idnhanVien,
                                            nvpb: nv.idphongBan,
                                            nvho: nv.hoDem,
                                            nvten: nv.ten,
                                            nvgioitinh: nv.gioiTinh,
                                            nvsdt: nv.soDienThoai,
                                            nvngaysinh: nv.ngaySinh.substring(0, 10),
                                            nvtinhtranghonnhan: nv.tinhTrangHonNhan,
                                            nvdcthuongtru: nv.diaChiThuongTru,
                                            nvnoisinh: nv.noiSinh,
                                            nvtongiao: nv.tonGiao,
                                            nvchohientai: nv.choOhienTai,
                                            nvsocmnd: nv.soCmnn,
                                            nvngaycap: nv.ngayCap,
                                            nvnoicap: nv.noiCap.substring(0, 10),
                                            nvmail: nv.email,
                                            //nvnganhhoc: nv.nganhHoc,
                                            nvnoidaotao: nv.noiDaoTao,
                                            //nvxeploai: nv.xepLoai,
                                            nvusername: nv.username,
                                            nvdantoc: nv.iddanToc,
                                            nvdaotao: nv.idtrinhDo,
                                            nvquoctich: nv.quocTich,
                                            nvcv: nv.idchucVu,
                                            nvtrangthaiHdChinhThuc: nv.trangthaiHdchinhThuc,
                                            nvhinh: nv.hinhAnh,
                                            nvqdbn: nv.idquyetDinhBn
                                        })}
                                    >Gia hạn
                                    </Button>

                                    <Button>
                                        <VisibilityIcon color="action"
                                            onClick={() => this.setState({
                                                showModalShow: true,

                                                //truyền hợp đồng
                                                hdid: hd.idhopDong,
                                                hdky: hd.ngayLapHd,
                                                hdbatdau: hd.ngayBatDau,
                                                hdketthuc: hd.ngayHetHan,
                                                hdghichu: hd.ghiChu,
                                                hdloai: hd.idloaiHd,
                                                hdidnv: hd.idnhanVien,

                                                //truyền nhân viên
                                                nvid: nv.idnhanVien,
                                                nvpb: nv.idphongBan,
                                                nvho: nv.hoDem,
                                                nvten: nv.ten,
                                                nvgioitinh: nv.gioiTinh,
                                                nvsdt: nv.soDienThoai,
                                                nvngaysinh: nv.ngaySinh.substring(0, 10),
                                                nvtinhtranghonnhan: nv.tinhTrangHonNhan,
                                                nvdcthuongtru: nv.diaChiThuongTru,
                                                nvnoisinh: nv.noiSinh,
                                                nvtongiao: nv.tonGiao,
                                                nvchohientai: nv.choOhienTai,
                                                nvsocmnd: nv.soCmnn,
                                                nvngaycap: nv.ngayCap.substring(0, 10),
                                                nvnoicap: nv.noiCap,
                                                nvmail: nv.email,
                                                //nvnganhhoc: nv.nganhHoc,
                                                nvnoidaotao: nv.noiDaoTao,
                                                //nvxeploai: nv.xepLoai,
                                                nvdantoc: nv.iddanToc,
                                                nvdaotao: nv.idtrinhDo,
                                                nvquoctich: nv.quocTich,
                                                nvcv: nv.idchucVu,
                                                nvtrangthaiHdChinhThuc: nv.trangthaiHdchinhThuc,
                                                nvtrangthaiHdthuViec: nv.trangthaiHdthuViec,
                                                nvhinh: nv.hinhAnh
                                            })}>
                                        </VisibilityIcon>
                                    </Button>

                                    <AddGiaiHanHDModal
                                        show={this.state.addModalShow}
                                        onHide={addModalClose}

                                        //truyền hợp đồng
                                        hdid={hdid}
                                        hdky={hdky}
                                        hdbatdau={hdbatdau}
                                        hdketthuc={hdketthuc}
                                        hdghichu={hdghichu}
                                        hdloai={hdloai}
                                        hdidnv={hdidnv}

                                        //truyền nhân viên
                                        nvid={nvid}
                                        nvpb={nvpb}
                                        nvho={nvho}
                                        nvten={nvten}
                                        nvgioitinh={nvgioitinh}
                                        nvsdt={nvsdt}
                                        nvtinhtranghonnhan={nvtinhtranghonnhan}
                                        nvdcthuongtru={nvdcthuongtru}
                                        nvnoisinh={nvnoisinh}
                                        nvtongiao={nvtongiao}
                                        nvchohientai={nvchohientai}
                                        nvsocmnd={nvsocmnd}
                                        nvngaycap={nvngaycap}
                                        nvnoicap={nvnoicap}
                                        nvmail={nvmail}
                                        //nvnganhhoc={nvnganhhoc}
                                        nvnoidaotao={nvnoidaotao}
                                        //nvxeploai={nvxeploai}
                                        nvusername={nvusername}
                                        nvdantoc={nvdantoc}
                                        nvdaotao={nvdaotao}
                                        nvngaysinh={nvngaysinh}
                                        nvquoctich={nvquoctich}
                                        nvcv={nvcv}
                                        nvtrangthaiHdChinhThuc={nvtrangthaiHdChinhThuc}
                                        nvpic={nvhinh}
                                        nvqdbn={nvqdbn}
                                    />

                                    <ShowGiaiHanHDModal
                                        show={this.state.showModalShow}
                                        onHide={showModalClose}

                                        //truyền hợp đồng
                                        hdid={hdid}
                                        hdky={hdky}
                                        hdbatdau={hdbatdau}
                                        hdketthuc={hdketthuc}
                                        hdghichu={hdghichu}
                                        hdloai={hdloai}
                                        hdidnv={hdidnv}

                                        //truyền nhân viên
                                        nvid={nvid}
                                        nvpb={nvpb}
                                        nvho={nvho}
                                        nvten={nvten}
                                        nvgioitinh={nvgioitinh}
                                        nvsdt={nvsdt}
                                        //nvnguyenquan={nvnguyenquan}
                                        nvtinhtranghonnhan={nvtinhtranghonnhan}
                                        nvdcthuongtru={nvdcthuongtru}
                                        nvnoisinh={nvnoisinh}
                                        nvtongiao={nvtongiao}
                                        nvchohientai={nvchohientai}
                                        nvsocmnd={nvsocmnd}
                                        nvngaycap={nvngaycap}
                                        nvnoicap={nvnoicap}
                                        nvmail={nvmail}
                                        //nvnganhhoc={nvnganhhoc}
                                        nvnoidaotao={nvnoidaotao}
                                        //nvxeploai={nvxeploai}
                                        nvdantoc={nvdantoc}
                                        nvdaotao={nvdaotao}
                                        nvngaysinh={nvngaysinh}
                                        nvquoctich={nvquoctich}
                                        nvcv={nvcv}
                                        nvtrangthaiHdChinhThuc={nvtrangthaiHdChinhThuc}
                                        nvtrangthaiHdthuViec={nvtrangthaiHdthuViec}
                                        nvpic={nvhinh}
                                    />
                                </StyledTableCell>
                            </StyledTableRow>)
                    }

                }
                else {
                    if (hd.idloaiHd == this.state.chonLoaiHD
                        && nv.trangthaiHdchinhThuc != "Đã thôi việc" && nv.trangthaiHdthuViec != "Đã thôi việc"
                        && nv.idnhanVien == hd.idnhanVien
                        && this.state.chonLoaiHD == 2
                        && differenceInDays(new Date(hd.ngayHetHan), new Date(DMY)) <= 30
                    ) { // chính thức
                        if (parseInt(differenceInDays(new Date(hd.ngayHetHan), new Date(DMY))) < 0) {
                            return (
                                <StyledTableRow >
                                    {/* <StyledTableCell>{key + 1}</StyledTableCell> */}
                                    <StyledTableCell>{this.layTenNV(hd.idnhanVien)}</StyledTableCell>
                                    <StyledTableCell align="center">{format(new Date(hd.ngayLapHd), 'dd-MM-yyyy')}</StyledTableCell>
                                    <StyledTableCell align="center">{format(new Date(hd.ngayBatDau), 'dd-MM-yyyy')}</StyledTableCell>
                                    <StyledTableCell align="center">{format(new Date(hd.ngayHetHan), 'dd-MM-yyyy')}</StyledTableCell>
                                    <StyledTableCell align="center">Đã hết hạn</StyledTableCell>

                                    <StyledTableCell align="right">

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<ExtensionIcon />}
                                            onClick={() => this.setState({
                                                addModalShow: true,

                                                //truyền hợp đồng
                                                hdid: hd.idhopDong,
                                                hdky: hd.ngayLapHd,
                                                hdbatdau: hd.ngayBatDau,
                                                hdketthuc: hd.ngayHetHan,
                                                hdghichu: hd.ghiChu,
                                                hdloai: hd.idloaiHd,
                                                hdidnv: hd.idnhanVien,

                                                //truyền nhân viên
                                                nvid: nv.idnhanVien,
                                                nvpb: nv.idphongBan,
                                                nvho: nv.hoDem,
                                                nvten: nv.ten,
                                                nvgioitinh: nv.gioiTinh,
                                                nvsdt: nv.soDienThoai,
                                                nvngaysinh: nv.ngaySinh.substring(0, 10),
                                                nvtinhtranghonnhan: nv.tinhTrangHonNhan,
                                                nvdcthuongtru: nv.diaChiThuongTru,
                                                nvnoisinh: nv.noiSinh,
                                                nvtongiao: nv.tonGiao,
                                                nvchohientai: nv.choOhienTai,
                                                nvsocmnd: nv.soCmnn,
                                                nvngaycap: nv.ngayCap,
                                                nvnoicap: nv.noiCap.substring(0, 10),
                                                nvmail: nv.email,
                                                //nvnganhhoc: nv.nganhHoc,
                                                nvnoidaotao: nv.noiDaoTao,
                                                //nvxeploai: nv.xepLoai,
                                                nvusername: nv.username,
                                                nvdantoc: nv.iddanToc,
                                                nvdaotao: nv.idtrinhDo,
                                                nvquoctich: nv.quocTich,
                                                nvcv: nv.idchucVu,
                                                nvtrangthaiHdChinhThuc: nv.trangthaiHdchinhThuc,
                                                nvhinh: nv.hinhAnh,
                                                nvqdbn: nv.idquyetDinhBn
                                            })}
                                        >Gia hạn
                                        </Button>

                                        <Button>
                                            <VisibilityIcon color="action"
                                                onClick={() => this.setState({
                                                    showModalShow: true,

                                                    //truyền hợp đồng
                                                    hdid: hd.idhopDong,
                                                    hdky: hd.ngayLapHd,
                                                    hdbatdau: hd.ngayBatDau,
                                                    hdketthuc: hd.ngayHetHan,
                                                    hdghichu: hd.ghiChu,
                                                    hdloai: hd.idloaiHd,
                                                    hdidnv: hd.idnhanVien,

                                                    //truyền nhân viên
                                                    nvid: nv.idnhanVien,
                                                    nvpb: nv.idphongBan,
                                                    nvho: nv.hoDem,
                                                    nvten: nv.ten,
                                                    nvgioitinh: nv.gioiTinh,
                                                    nvsdt: nv.soDienThoai,
                                                    nvngaysinh: nv.ngaySinh.substring(0, 10),
                                                    nvtinhtranghonnhan: nv.tinhTrangHonNhan,
                                                    nvdcthuongtru: nv.diaChiThuongTru,
                                                    nvnoisinh: nv.noiSinh,
                                                    nvtongiao: nv.tonGiao,
                                                    nvchohientai: nv.choOhienTai,
                                                    nvsocmnd: nv.soCmnn,
                                                    nvngaycap: nv.ngayCap.substring(0, 10),
                                                    nvnoicap: nv.noiCap,
                                                    nvmail: nv.email,
                                                    //nvnganhhoc: nv.nganhHoc,
                                                    nvnoidaotao: nv.noiDaoTao,
                                                    //nvxeploai: nv.xepLoai,
                                                    nvdantoc: nv.iddanToc,
                                                    nvdaotao: nv.idtrinhDo,
                                                    nvquoctich: nv.quocTich,
                                                    nvcv: nv.idchucVu,
                                                    nvtrangthaiHdChinhThuc: nv.trangthaiHdchinhThuc,
                                                    nvtrangthaiHdthuViec: nv.trangthaiHdthuViec,
                                                    nvhinh: nv.hinhAnh
                                                })}>
                                            </VisibilityIcon>
                                        </Button>

                                        <AddGiaiHanHDModal
                                            show={this.state.addModalShow}
                                            onHide={addModalClose}

                                            //truyền hợp đồng
                                            hdid={hdid}
                                            hdky={hdky}
                                            hdbatdau={hdbatdau}
                                            hdketthuc={hdketthuc}
                                            hdghichu={hdghichu}
                                            hdloai={hdloai}
                                            hdidnv={hdidnv}

                                            //truyền nhân viên
                                            nvid={nvid}
                                            nvpb={nvpb}
                                            nvho={nvho}
                                            nvten={nvten}
                                            nvgioitinh={nvgioitinh}
                                            nvsdt={nvsdt}
                                            nvtinhtranghonnhan={nvtinhtranghonnhan}
                                            nvdcthuongtru={nvdcthuongtru}
                                            nvnoisinh={nvnoisinh}
                                            nvtongiao={nvtongiao}
                                            nvchohientai={nvchohientai}
                                            nvsocmnd={nvsocmnd}
                                            nvngaycap={nvngaycap}
                                            nvnoicap={nvnoicap}
                                            nvmail={nvmail}
                                            //nvnganhhoc={nvnganhhoc}
                                            nvnoidaotao={nvnoidaotao}
                                            //nvxeploai={nvxeploai}
                                            nvusername={nvusername}
                                            nvdantoc={nvdantoc}
                                            nvdaotao={nvdaotao}
                                            nvngaysinh={nvngaysinh}
                                            nvquoctich={nvquoctich}
                                            nvcv={nvcv}
                                            nvtrangthaiHdChinhThuc={nvtrangthaiHdChinhThuc}
                                            nvpic={nvhinh}
                                            nvqdbn={nvqdbn}
                                        />

                                        <ShowGiaiHanHDModal
                                            show={this.state.showModalShow}
                                            onHide={showModalClose}

                                            //truyền hợp đồng
                                            hdid={hdid}
                                            hdky={hdky}
                                            hdbatdau={hdbatdau}
                                            hdketthuc={hdketthuc}
                                            hdghichu={hdghichu}
                                            hdloai={hdloai}
                                            hdidnv={hdidnv}

                                            //truyền nhân viên
                                            nvid={nvid}
                                            nvpb={nvpb}
                                            nvho={nvho}
                                            nvten={nvten}
                                            nvgioitinh={nvgioitinh}
                                            nvsdt={nvsdt}
                                            //nvnguyenquan={nvnguyenquan}
                                            nvtinhtranghonnhan={nvtinhtranghonnhan}
                                            nvdcthuongtru={nvdcthuongtru}
                                            nvnoisinh={nvnoisinh}
                                            nvtongiao={nvtongiao}
                                            nvchohientai={nvchohientai}
                                            nvsocmnd={nvsocmnd}
                                            nvngaycap={nvngaycap}
                                            nvnoicap={nvnoicap}
                                            nvmail={nvmail}
                                            //nvnganhhoc={nvnganhhoc}
                                            nvnoidaotao={nvnoidaotao}
                                            //nvxeploai={nvxeploai}
                                            nvdantoc={nvdantoc}
                                            nvdaotao={nvdaotao}
                                            nvngaysinh={nvngaysinh}
                                            nvquoctich={nvquoctich}
                                            nvcv={nvcv}
                                            nvtrangthaiHdChinhThuc={nvtrangthaiHdChinhThuc}
                                            nvtrangthaiHdthuViec={nvtrangthaiHdthuViec}
                                            nvpic={nvhinh}
                                        />

                                    </StyledTableCell>

                                </StyledTableRow>)
                        } else if (parseInt(differenceInDays(new Date(hd.ngayHetHan), new Date(DMY))) > 0) {
                            return (
                                <StyledTableRow >
                                    {/* <StyledTableCell>{key + 1}</StyledTableCell> */}
                                    <StyledTableCell>{this.layTenNV(hd.idnhanVien)}</StyledTableCell>
                                    <StyledTableCell align="center">{format(new Date(hd.ngayLapHd), 'dd-MM-yyyy')}</StyledTableCell>
                                    <StyledTableCell align="center">{format(new Date(hd.ngayBatDau), 'dd-MM-yyyy')}</StyledTableCell>
                                    <StyledTableCell align="center">{format(new Date(hd.ngayHetHan), 'dd-MM-yyyy')}</StyledTableCell>
                                    <StyledTableCell align="center">Còn lại {differenceInDays(new Date(hd.ngayHetHan), new Date(DMY))} ngày</StyledTableCell>
                                    <StyledTableCell align="right">

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<ExtensionIcon />}
                                            onClick={() => this.setState({
                                                addModalShow: true,

                                                //truyền hợp đồng
                                                hdid: hd.idhopDong,
                                                hdky: hd.ngayLapHd,
                                                hdbatdau: hd.ngayBatDau,
                                                hdketthuc: hd.ngayHetHan,
                                                hdghichu: hd.ghiChu,
                                                hdloai: hd.idloaiHd,
                                                hdidnv: hd.idnhanVien,

                                                //truyền nhân viên
                                                nvid: nv.idnhanVien,
                                                nvpb: nv.idphongBan,
                                                nvho: nv.hoDem,
                                                nvten: nv.ten,
                                                nvgioitinh: nv.gioiTinh,
                                                nvsdt: nv.soDienThoai,
                                                nvngaysinh: nv.ngaySinh.substring(0, 10),
                                                nvtinhtranghonnhan: nv.tinhTrangHonNhan,
                                                nvdcthuongtru: nv.diaChiThuongTru,
                                                nvnoisinh: nv.noiSinh,
                                                nvtongiao: nv.tonGiao,
                                                nvchohientai: nv.choOhienTai,
                                                nvsocmnd: nv.soCmnn,
                                                nvngaycap: nv.ngayCap,
                                                nvnoicap: nv.noiCap.substring(0, 10),
                                                nvmail: nv.email,
                                                //nvnganhhoc: nv.nganhHoc,
                                                nvnoidaotao: nv.noiDaoTao,
                                                //nvxeploai: nv.xepLoai,
                                                nvusername: nv.username,
                                                nvdantoc: nv.iddanToc,
                                                nvdaotao: nv.idtrinhDo,
                                                nvquoctich: nv.quocTich,
                                                nvcv: nv.idchucVu,
                                                nvtrangthaiHdChinhThuc: nv.trangthaiHdchinhThuc,
                                                nvhinh: nv.hinhAnh,
                                                nvqdbn: nv.idquyetDinhBn
                                            })}
                                        >Gia hạn
                                        </Button>

                                        <Button>
                                            <VisibilityIcon color="action"
                                                onClick={() => this.setState({
                                                    showModalShow: true,

                                                    //truyền hợp đồng
                                                    hdid: hd.idhopDong,
                                                    hdky: hd.ngayLapHd,
                                                    hdbatdau: hd.ngayBatDau,
                                                    hdketthuc: hd.ngayHetHan,
                                                    hdghichu: hd.ghiChu,
                                                    hdloai: hd.idloaiHd,
                                                    hdidnv: hd.idnhanVien,

                                                    //truyền nhân viên
                                                    nvid: nv.idnhanVien,
                                                    nvpb: nv.idphongBan,
                                                    nvho: nv.hoDem,
                                                    nvten: nv.ten,
                                                    nvgioitinh: nv.gioiTinh,
                                                    nvsdt: nv.soDienThoai,
                                                    nvngaysinh: nv.ngaySinh.substring(0, 10),
                                                    nvtinhtranghonnhan: nv.tinhTrangHonNhan,
                                                    nvdcthuongtru: nv.diaChiThuongTru,
                                                    nvnoisinh: nv.noiSinh,
                                                    nvtongiao: nv.tonGiao,
                                                    nvchohientai: nv.choOhienTai,
                                                    nvsocmnd: nv.soCmnn,
                                                    nvngaycap: nv.ngayCap.substring(0, 10),
                                                    nvnoicap: nv.noiCap,
                                                    nvmail: nv.email,
                                                    //nvnganhhoc: nv.nganhHoc,
                                                    nvnoidaotao: nv.noiDaoTao,
                                                    //nvxeploai: nv.xepLoai,
                                                    nvdantoc: nv.iddanToc,
                                                    nvdaotao: nv.idtrinhDo,
                                                    nvquoctich: nv.quocTich,
                                                    nvcv: nv.idchucVu,
                                                    nvtrangthaiHdChinhThuc: nv.trangthaiHdchinhThuc,
                                                    nvtrangthaiHdthuViec: nv.trangthaiHdthuViec,
                                                    nvhinh: nv.hinhAnh
                                                })}>
                                            </VisibilityIcon>
                                        </Button>

                                        <AddGiaiHanHDModal
                                            show={this.state.addModalShow}
                                            onHide={addModalClose}

                                            //truyền hợp đồng
                                            hdid={hdid}
                                            hdky={hdky}
                                            hdbatdau={hdbatdau}
                                            hdketthuc={hdketthuc}
                                            hdghichu={hdghichu}
                                            hdloai={hdloai}
                                            hdidnv={hdidnv}

                                            //truyền nhân viên
                                            nvid={nvid}
                                            nvpb={nvpb}
                                            nvho={nvho}
                                            nvten={nvten}
                                            nvgioitinh={nvgioitinh}
                                            nvsdt={nvsdt}
                                            nvtinhtranghonnhan={nvtinhtranghonnhan}
                                            nvdcthuongtru={nvdcthuongtru}
                                            nvnoisinh={nvnoisinh}
                                            nvtongiao={nvtongiao}
                                            nvchohientai={nvchohientai}
                                            nvsocmnd={nvsocmnd}
                                            nvngaycap={nvngaycap}
                                            nvnoicap={nvnoicap}
                                            nvmail={nvmail}
                                            //nvnganhhoc={nvnganhhoc}
                                            nvnoidaotao={nvnoidaotao}
                                            //nvxeploai={nvxeploai}
                                            nvusername={nvusername}
                                            nvdantoc={nvdantoc}
                                            nvdaotao={nvdaotao}
                                            nvngaysinh={nvngaysinh}
                                            nvquoctich={nvquoctich}
                                            nvcv={nvcv}
                                            nvtrangthaiHdChinhThuc={nvtrangthaiHdChinhThuc}
                                            nvpic={nvhinh}
                                            nvqdbn={nvqdbn}
                                        />

                                        <ShowGiaiHanHDModal
                                            show={this.state.showModalShow}
                                            onHide={showModalClose}

                                            //truyền hợp đồng
                                            hdid={hdid}
                                            hdky={hdky}
                                            hdbatdau={hdbatdau}
                                            hdketthuc={hdketthuc}
                                            hdghichu={hdghichu}
                                            hdloai={hdloai}
                                            hdidnv={hdidnv}

                                            //truyền nhân viên
                                            nvid={nvid}
                                            nvpb={nvpb}
                                            nvho={nvho}
                                            nvten={nvten}
                                            nvgioitinh={nvgioitinh}
                                            nvsdt={nvsdt}
                                            //nvnguyenquan={nvnguyenquan}
                                            nvtinhtranghonnhan={nvtinhtranghonnhan}
                                            nvdcthuongtru={nvdcthuongtru}
                                            nvnoisinh={nvnoisinh}
                                            nvtongiao={nvtongiao}
                                            nvchohientai={nvchohientai}
                                            nvsocmnd={nvsocmnd}
                                            nvngaycap={nvngaycap}
                                            nvnoicap={nvnoicap}
                                            nvmail={nvmail}
                                            //nvnganhhoc={nvnganhhoc}
                                            nvnoidaotao={nvnoidaotao}
                                            //nvxeploai={nvxeploai}
                                            nvdantoc={nvdantoc}
                                            nvdaotao={nvdaotao}
                                            nvngaysinh={nvngaysinh}
                                            nvquoctich={nvquoctich}
                                            nvcv={nvcv}
                                            nvtrangthaiHdChinhThuc={nvtrangthaiHdChinhThuc}
                                            nvtrangthaiHdthuViec={nvtrangthaiHdthuViec}
                                            nvpic={nvhinh}
                                        />
                                    </StyledTableCell>
                                </StyledTableRow>)
                        }

                    }
                }
            })
        })
    }

    render() {
        //console.log(this.getGiatri())
        return (
            <div>
                <div className="container text-center">
                    <h1 className="display-7">GIA HẠN HỢP ĐỒNG</h1>
                    <h4 className="display-7">Ký hợp đồng chính thức cho nhân viên đã hết hạn hợp đồng thử việc</h4><hr /><hr />
                    {/* <h6 className="display-7">Ký lại hợp đồng cho nhân viên đã thôi việc</h6><hr /><hr /> */}
                </div>

                <Row>
                    <Col sm={6}>
                        <Form.Label>Chọn loại hợp đồng: </Form.Label>
                        {this.getHDtoLoaiHD()}
                    </Col>

                    <Col sm={2}></Col>

                    {/* <Col sm={4}>
                        <label>Chọn xem danh sách </label>
                        <RadioGroup
                            //name="gender1"
                            value={this.state.chonRadio}
                            onChange={this.handleChangeCheck}
                        >
                            <FormControlLabel value="Chưa hủy" control={<Radio />} label="Chưa hủy hợp đồng" />
                            <FormControlLabel value="Đã hủy" control={<Radio />} label="Đã hủy hợp đồng" />
                        </RadioGroup>
                    </Col> */}
                </Row>


                <TableContainer>
                    <StyledTable className="mt-3">
                        <TableHead>
                            <StyledTableRow>
                                {/* <StyledTableCell>#</StyledTableCell> */}
                                <StyledTableCell>Tên nhân viên</StyledTableCell>
                                <StyledTableCell align="center">Ngày ký hợp đồng</StyledTableCell>
                                <StyledTableCell align="center">Ngày bắt đầu</StyledTableCell>
                                <StyledTableCell align="center">Ngày kết thúc</StyledTableCell>
                                <StyledTableCell align="center">Hạn hợp đồng</StyledTableCell>
                                <StyledTableCell align="center">Chức năng</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {this.getData()}
                        </TableBody>
                    </StyledTable>
                </TableContainer>
            </div>
        )
    }
}
