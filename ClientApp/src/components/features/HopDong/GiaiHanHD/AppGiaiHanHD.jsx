import React, { Component } from 'react'
//import { Button, ButtonToolbar, Table, Form } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, ButtonGroup, Button, Select, MenuItem } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import VisibilityIcon from '@material-ui/icons/Visibility';

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

    // componentDidUpdate() {
    //     //this.loadNV()
    //     this.loadHD()
    // }

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

    handleCloseSelect = () => {
        this.setState({
            setOpen: false
        })
    };

    handleOpenSelect = () => {
        this.setState({
            setOpen: true
        })
    };

    getHDtoLoaiHD = () => {
        // return <select className="ml-3" onChange={this.handleChange}>
        //     {
        //         this.state.loaihds.map(lhd => {
        //             return (
        //                 <option value={lhd.idloaiHd}>
        //                     {lhd.tenHopDong}
        //                 </option>
        //             )
        //         })}
        // </select>
        return <Select className="ml-3"
            onClose={this.handleCloseSelect}
            onOpen={this.handleOpenSelect}
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
        const { hds, hdid, hdky, hdbatdau, hdketthuc, hdghichu, hdloai, hdidnv, nhanviens, nvpb, nvcv, nvid, nvho, nvten, nvgioitinh, nvsdt, nvmail,
            nvtrangthaiHdChinhThuc, nvtinhtranghonnhan, nvngaysinh, nvnoisinh, nvdcthuongtru,
            nvchohientai, nvsocmnd, nvngaycap, nvnoicap, nvtongiao, nvquoctich, nvnganhhoc,
            nvnoidaotao, nvxeploai, nvdantoc, nvdaotao } = this.state

        // var date = new Date()
        // var ngay = date.getDate()
        // var thang = date.getMonth() + 1
        // var nam = date.getFullYear()
        // var DMY = ngay + "-" + thang + "-" + nam
        var DMY = format(new Date(), 'yyyy-MM-dd')
        //console.log("dmy:" + DMY)    
        return nhanviens.map(nv => {
            return hds.map((hd, key) => {
                if (hd.idloaiHd == this.state.chonLoaiHD
                    && nv.idnhanVien == hd.idnhanVien
                    && this.state.chonLoaiHD == 10
                    && differenceInDays(new Date(hd.ngayHetHan), new Date(DMY)) <= 7
                ) { //thử việc
                    if (parseInt(differenceInDays(new Date(hd.ngayHetHan), new Date(DMY))) < 0) {
                        return (
                            <StyledTableRow key={hd.idhopDong}>
                                <StyledTableCell>{key + 1}</StyledTableCell>
                                <StyledTableCell>{this.layTenNV(hd.idnhanVien)}</StyledTableCell>
                                <StyledTableCell>{format(new Date(hd.ngayLapHd), 'dd-MM-yyyy')}</StyledTableCell>
                                <StyledTableCell>{format(new Date(hd.ngayBatDau), 'dd-MM-yyyy')}</StyledTableCell>
                                <StyledTableCell>{format(new Date(hd.ngayHetHan), 'dd-MM-yyyy')}</StyledTableCell>
                                <StyledTableCell>Đã hết hạn</StyledTableCell>

                                <StyledTableCell>

                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        //startIcon={<NoEncryptionIcon />}
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
                                            nvnganhhoc: nv.nganhHoc,
                                            nvnoidaotao: nv.noiDaoTao,
                                            nvxeploai: nv.xepLoai,
                                            nvdantoc: nv.iddanToc,
                                            nvdaotao: nv.idtrinhDo,
                                            nvquoctich: nv.quocTich,
                                            nvcv: nv.idchucVu,
                                            nvtrangthaiHdChinhThuc: nv.trangthaiHdchinhThuc
                                        })}
                                    >Giai hạn
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
                                                nvnganhhoc: nv.nganhHoc,
                                                nvnoidaotao: nv.noiDaoTao,
                                                nvxeploai: nv.xepLoai,
                                                nvdantoc: nv.iddanToc,
                                                nvdaotao: nv.idtrinhDo,
                                                nvquoctich: nv.quocTich,
                                                nvcv: nv.idchucVu,
                                                nvtrangthaiHdChinhThuc: nv.trangthaiHdchinhThuc
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
                                        nvnganhhoc={nvnganhhoc}
                                        nvnoidaotao={nvnoidaotao}
                                        nvxeploai={nvxeploai}
                                        nvdantoc={nvdantoc}
                                        nvdaotao={nvdaotao}
                                        nvngaysinh={nvngaysinh}
                                        nvquoctich={nvquoctich}
                                        nvcv={nvcv}
                                        nvtrangthaiHdChinhThuc={nvtrangthaiHdChinhThuc}
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
                                        nvnganhhoc={nvnganhhoc}
                                        nvnoidaotao={nvnoidaotao}
                                        nvxeploai={nvxeploai}
                                        nvdantoc={nvdantoc}
                                        nvdaotao={nvdaotao}
                                        nvngaysinh={nvngaysinh}
                                        nvquoctich={nvquoctich}
                                        nvcv={nvcv}
                                        nvtrangthaiHdChinhThuc={nvtrangthaiHdChinhThuc}
                                    />
                                </StyledTableCell>

                            </StyledTableRow>)
                    } else if (parseInt(differenceInDays(new Date(hd.ngayHetHan), new Date(DMY))) > 0) {
                        return (
                            <StyledTableRow key={hd.idhopDong}>
                                <StyledTableCell>{key + 1}</StyledTableCell>
                                <StyledTableCell>{this.layTenNV(hd.idnhanVien)}</StyledTableCell>
                                <StyledTableCell>{format(new Date(hd.ngayLapHd), 'dd-MM-yyyy')}</StyledTableCell>
                                <StyledTableCell>{format(new Date(hd.ngayBatDau), 'dd-MM-yyyy')}</StyledTableCell>
                                <StyledTableCell>{format(new Date(hd.ngayHetHan), 'dd-MM-yyyy')}</StyledTableCell>
                                <StyledTableCell>Còn lại {differenceInDays(new Date(hd.ngayHetHan), new Date(DMY))} ngày</StyledTableCell>

                                <StyledTableCell>

                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        //startIcon={<NoEncryptionIcon />}
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
                                            nvnganhhoc: nv.nganhHoc,
                                            nvnoidaotao: nv.noiDaoTao,
                                            nvxeploai: nv.xepLoai,
                                            nvdantoc: nv.iddanToc,
                                            nvdaotao: nv.idtrinhDo,
                                            nvquoctich: nv.quocTich,
                                            nvcv: nv.idchucVu,
                                            nvtrangthaiHdChinhThuc: nv.trangthaiHdchinhThuc
                                        })}
                                    >Giai hạn
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
                                                nvnganhhoc: nv.nganhHoc,
                                                nvnoidaotao: nv.noiDaoTao,
                                                nvxeploai: nv.xepLoai,
                                                nvdantoc: nv.iddanToc,
                                                nvdaotao: nv.idtrinhDo,
                                                nvquoctich: nv.quocTich,
                                                nvcv: nv.idchucVu,
                                                nvtrangthaiHdChinhThuc: nv.trangthaiHdchinhThuc
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
                                        nvnganhhoc={nvnganhhoc}
                                        nvnoidaotao={nvnoidaotao}
                                        nvxeploai={nvxeploai}
                                        nvdantoc={nvdantoc}
                                        nvdaotao={nvdaotao}
                                        nvngaysinh={nvngaysinh}
                                        nvquoctich={nvquoctich}
                                        nvcv={nvcv}
                                        nvtrangthaiHdChinhThuc={nvtrangthaiHdChinhThuc}
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
                                        nvnganhhoc={nvnganhhoc}
                                        nvnoidaotao={nvnoidaotao}
                                        nvxeploai={nvxeploai}
                                        nvdantoc={nvdantoc}
                                        nvdaotao={nvdaotao}
                                        nvngaysinh={nvngaysinh}
                                        nvquoctich={nvquoctich}
                                        nvcv={nvcv}
                                        nvtrangthaiHdChinhThuc={nvtrangthaiHdChinhThuc}
                                    />
                                </StyledTableCell>
                            </StyledTableRow>)
                    }

                }
                else {
                    if (hd.idloaiHd == this.state.chonLoaiHD
                        && nv.idnhanVien == hd.idnhanVien
                        && this.state.chonLoaiHD == 2
                        && differenceInDays(new Date(hd.ngayHetHan), new Date(DMY)) <= 30
                    ) { // chính thức
                        if (parseInt(differenceInDays(new Date(hd.ngayHetHan), new Date(DMY))) < 0) {
                            return (
                                <StyledTableRow key={hd.idhopDong}>
                                    <StyledTableCell>{key + 1}</StyledTableCell>
                                    <StyledTableCell>{this.layTenNV(hd.idnhanVien)}</StyledTableCell>
                                    <StyledTableCell>{format(new Date(hd.ngayLapHd), 'dd-MM-yyyy')}</StyledTableCell>
                                    <StyledTableCell>{format(new Date(hd.ngayBatDau), 'dd-MM-yyyy')}</StyledTableCell>
                                    <StyledTableCell>{format(new Date(hd.ngayHetHan), 'dd-MM-yyyy')}</StyledTableCell>
                                    <StyledTableCell >Đã hết hạn</StyledTableCell>

                                    <StyledTableCell>

                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            //startIcon={<NoEncryptionIcon />}
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
                                                nvnganhhoc: nv.nganhHoc,
                                                nvnoidaotao: nv.noiDaoTao,
                                                nvxeploai: nv.xepLoai,
                                                nvdantoc: nv.iddanToc,
                                                nvdaotao: nv.idtrinhDo,
                                                nvquoctich: nv.quocTich,
                                                nvcv: nv.idchucVu,
                                                nvtrangthaiHdChinhThuc: nv.trangthaiHdchinhThuc
                                            })}
                                        >Giai hạn
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
                                                    nvnganhhoc: nv.nganhHoc,
                                                    nvnoidaotao: nv.noiDaoTao,
                                                    nvxeploai: nv.xepLoai,
                                                    nvdantoc: nv.iddanToc,
                                                    nvdaotao: nv.idtrinhDo,
                                                    nvquoctich: nv.quocTich,
                                                    nvcv: nv.idchucVu,
                                                    nvtrangthaiHdChinhThuc: nv.trangthaiHdchinhThuc
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
                                            nvnganhhoc={nvnganhhoc}
                                            nvnoidaotao={nvnoidaotao}
                                            nvxeploai={nvxeploai}
                                            nvdantoc={nvdantoc}
                                            nvdaotao={nvdaotao}
                                            nvngaysinh={nvngaysinh}
                                            nvquoctich={nvquoctich}
                                            nvcv={nvcv}
                                            nvtrangthaiHdChinhThuc={nvtrangthaiHdChinhThuc}
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
                                            nvnganhhoc={nvnganhhoc}
                                            nvnoidaotao={nvnoidaotao}
                                            nvxeploai={nvxeploai}
                                            nvdantoc={nvdantoc}
                                            nvdaotao={nvdaotao}
                                            nvngaysinh={nvngaysinh}
                                            nvquoctich={nvquoctich}
                                            nvcv={nvcv}
                                            nvtrangthaiHdChinhThuc={nvtrangthaiHdChinhThuc}
                                        />

                                    </StyledTableCell>

                                </StyledTableRow>)
                        } else if (parseInt(differenceInDays(new Date(hd.ngayHetHan), new Date(DMY))) > 0) {
                            return (
                                <StyledTableRow key={hd.idhopDong}>
                                    <StyledTableCell>{key + 1}</StyledTableCell>
                                    <StyledTableCell>{this.layTenNV(hd.idnhanVien)}</StyledTableCell>
                                    <StyledTableCell>{format(new Date(hd.ngayLapHd), 'dd-MM-yyyy')}</StyledTableCell>
                                    <StyledTableCell>{format(new Date(hd.ngayBatDau), 'dd-MM-yyyy')}</StyledTableCell>
                                    <StyledTableCell>{format(new Date(hd.ngayHetHan), 'dd-MM-yyyy')}</StyledTableCell>
                                    <StyledTableCell >Còn lại {differenceInDays(new Date(hd.ngayHetHan), new Date(DMY))} ngày</StyledTableCell>
                                    <StyledTableCell>
                                        
                                    <Button
                                            variant="contained"
                                            color="secondary"
                                            //startIcon={<NoEncryptionIcon />}
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
                                                nvnganhhoc: nv.nganhHoc,
                                                nvnoidaotao: nv.noiDaoTao,
                                                nvxeploai: nv.xepLoai,
                                                nvdantoc: nv.iddanToc,
                                                nvdaotao: nv.idtrinhDo,
                                                nvquoctich: nv.quocTich,
                                                nvcv: nv.idchucVu,
                                                nvtrangthaiHdChinhThuc: nv.trangthaiHdchinhThuc
                                            })}
                                        >Giai hạn
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
                                                    nvnganhhoc: nv.nganhHoc,
                                                    nvnoidaotao: nv.noiDaoTao,
                                                    nvxeploai: nv.xepLoai,
                                                    nvdantoc: nv.iddanToc,
                                                    nvdaotao: nv.idtrinhDo,
                                                    nvquoctich: nv.quocTich,
                                                    nvcv: nv.idchucVu,
                                                    nvtrangthaiHdChinhThuc: nv.trangthaiHdchinhThuc
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
                                                nvnganhhoc={nvnganhhoc}
                                                nvnoidaotao={nvnoidaotao}
                                                nvxeploai={nvxeploai}
                                                nvdantoc={nvdantoc}
                                                nvdaotao={nvdaotao}
                                                nvngaysinh={nvngaysinh}
                                                nvquoctich={nvquoctich}
                                                nvcv={nvcv}
                                                nvtrangthaiHdChinhThuc={nvtrangthaiHdChinhThuc}
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
                                                nvnganhhoc={nvnganhhoc}
                                                nvnoidaotao={nvnoidaotao}
                                                nvxeploai={nvxeploai}
                                                nvdantoc={nvdantoc}
                                                nvdaotao={nvdaotao}
                                                nvngaysinh={nvngaysinh}
                                                nvquoctich={nvquoctich}
                                                nvcv={nvcv}
                                                nvtrangthaiHdChinhThuc={nvtrangthaiHdChinhThuc}
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
                </div>

                <Form.Label>Chọn loại hợp đồng: </Form.Label>
                {this.getHDtoLoaiHD()}

                <TableContainer>
                <StyledTable className="mt-3">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>#</StyledTableCell>
                            <StyledTableCell>Tên nhân viên</StyledTableCell>
                            <StyledTableCell>Ngày ký hợp đồng</StyledTableCell>
                            <StyledTableCell>Ngày bắt đầu</StyledTableCell>
                            <StyledTableCell>Ngày kết thúc</StyledTableCell>
                            <StyledTableCell>Hạn hợp đồng</StyledTableCell>
                            <StyledTableCell>Chức năng</StyledTableCell>
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
