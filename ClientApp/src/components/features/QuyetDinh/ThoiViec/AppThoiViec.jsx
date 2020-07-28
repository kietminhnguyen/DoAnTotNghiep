import React, { Component } from 'react'
import axios from 'axios';
import { Form, Col } from 'react-bootstrap'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, ButtonGroup, Button, Select, MenuItem } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { format, differenceInDays } from 'date-fns'

//import { AddThoiViecModal } from './AddThoiViecModal'
import { ShowThoiViecModal } from './ShowThoiViecModal'

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
        width: 1100,
    },
}))(Table);

export class AppThoiViec extends Component {

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

    selectPB = () => {
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

    // Hủy hợp đồng sẽ đổi  
    //  + ghiChu trong bảng HopDong thành "Hủy"
    //  + 2 trangthai trong bảng NhanVien sẽ thành Null
    huyHD(idhd, idnv) {
        var arrayHD = []
        for (let j = 0; j < this.state.hds.length; j++) {
            if (this.state.hds[j].idhopDong == idhd) {
                //console.log(idhd)
                arrayHD.push({
                    idhopDong: parseInt(this.state.hds[j].idhopDong),
                    ngayLapHd: this.state.hds[j].ngayLapHd,
                    ngayBatDau: this.state.hds[j].ngayBatDau,
                    ngayHetHan: this.state.hds[j].ngayHetHan,
                    ghiChu: "Hủy",
                    idloaiHd: parseInt(this.state.hds[j].idloaiHd),
                    idnhanVien: parseInt(this.state.hds[j].idnhanVien)
                })
            }
        }

        var arrayNV = []
        for (let i = 0; i < this.state.nhanviens.length; i++) {
            if (this.state.nhanviens[i].idnhanVien == idnv) {
                //console.log(idnv)
                arrayNV.push({
                    idnhanVien: parseInt(this.state.nhanviens[i].idnhanVien),
                    hoDem: this.state.nhanviens[i].hoDem,
                    ten: this.state.nhanviens[i].ten,
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
                    noiDaoTao: this.state.nhanviens[i].noiDaoTao,/////////
                    //username
                    idphongBan: parseInt(this.state.nhanviens[i].idphongBan),
                    idchucVu: parseInt(this.state.nhanviens[i].idchucVu),
                    trangthaiHdthuViec: "Đã thôi việc",
                    trangthaiHdchinhThuc: "Đã thôi việc",
                    iddanToc: parseInt(this.state.nhanviens[i].iddanToc),
                    idtrinhDo: parseInt(this.state.nhanviens[i].idtrinhDo),
                    idquyetDinhBn: parseInt(this.state.nhanviens[i].idquyetDinhBn)
                })
            }
        }
        //console.log(arrayHD)
        //console.log(arrayNV)

        if (window.confirm('Bạn có chắc muốn hủy?')) {
            axios.put('https://localhost:44390/api/hopdongs/mangput', arrayHD)
            axios.put('https://localhost:44390/api/nhanviens/mangput', arrayNV)
                .then(response => {
                    this.setState({ arrayBL: response.data })
                    alert("Thành công")
                })
                .catch(error => {
                    this.setState({ showError: "Lỗi post dữ liệu" })
                    alert("Không thành công")
                })
        }
        //alert("Thành công")
    }

    getData = () => {
        //let addModalClose = () => this.setState({ addModalShow: false })
        //let editModalClose = () => this.setState({ editModalShow: false })
        let showModalClose = () => this.setState({ showModalShow: false })
        const { hds, hdid, hdky, hdbatdau, hdketthuc, hdghichu, hdloai, hdidnv,
            nhanviens, nvpb, nvcv, nvid, nvho, nvten, nvgioitinh, nvsdt,
            nvmail, nvtinhtranghonnhan, nvngaysinh, nvnoisinh, nvdcthuongtru,
            nvchohientai, nvsocmnd, nvngaycap, nvnoicap, nvtongiao, nvquoctich, nvhinh,
            nvthuviec, nvchinhthuc, nvnoidaotao, nvdantoc, nvdaotao } = this.state

        // var date = new Date()
        // var ngay = date.getDate()
        // var thang = date.getMonth() + 1
        // var nam = date.getFullYear()
        // var hientai = ngay + "-" + thang + "-" + nam
        var DMY = format(new Date(), 'yyyy-MM-dd')

        return nhanviens.map(nv => {
            return hds.map(hd => {
                if (hd.idloaiHd == this.state.chonLoaiHD
                    && nv.idnhanVien == hd.idnhanVien
                    && this.state.chonLoaiHD == 10
                    && hd.ghiChu == "Ký") { //thử việc
                    if (parseInt(differenceInDays(new Date(hd.ngayHetHan.substring(0, 10)), new Date(DMY))) < 0
                    ) {
                        return (
                            <StyledTableRow >
                                {/* <td>{key + 1}</td> */}
                                <StyledTableCell>{this.layTenNV(hd.idnhanVien)}</StyledTableCell>
                                <StyledTableCell align="center">{format(new Date(hd.ngayLapHd), 'dd-MM-yyyy')}</StyledTableCell>
                                <StyledTableCell align="center">{format(new Date(hd.ngayBatDau), 'dd-MM-yyyy')}</StyledTableCell>
                                <StyledTableCell align="center">{format(new Date(hd.ngayHetHan), 'dd-MM-yyyy')}</StyledTableCell>
                                <StyledTableCell align="center">Đã hết hạn</StyledTableCell>

                                <StyledTableCell align="center">

                                    <Button variant="contained"
                                        color="primary"
                                        //component="span"
                                        startIcon={<DeleteForeverIcon />}
                                        onClick={() => this.huyHD(hd.idhopDong, nv.idnhanVien)}
                                    > Hủy hợp đồng</Button>


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
                                                nvchinhthuc: nv.trangthaiHdchinhThuc,
                                                nvthuviec: nv.trangthaiHdthuViec,
                                                nvhinh: nv.hinhAnh
                                            })}>

                                        </VisibilityIcon>
                                    </Button>

                                    <ShowThoiViecModal
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
                                        nvchinhthuc={nvchinhthuc}
                                        nvthuviec={nvthuviec}
                                        nvpic={nvhinh}
                                    />
                                </StyledTableCell>

                            </StyledTableRow >)
                    } else if (
                        parseInt(differenceInDays(new Date(hd.ngayHetHan.substring(0, 10)), new Date(DMY))) >= 0
                    ) {
                        return (
                            <StyledTableRow>
                                {/* <td>{key + 1}</td> */}
                                <StyledTableCell>{this.layTenNV(hd.idnhanVien)}</StyledTableCell>
                                <StyledTableCell align="center">{format(new Date(hd.ngayLapHd), 'dd-MM-yyyy')}</StyledTableCell>
                                <StyledTableCell align="center">{format(new Date(hd.ngayBatDau), 'dd-MM-yyyy')}</StyledTableCell>
                                <StyledTableCell align="center">{format(new Date(hd.ngayHetHan), 'dd-MM-yyyy')}</StyledTableCell>
                                <StyledTableCell align="center">Còn lại {differenceInDays(new Date(hd.ngayHetHan.substring(0, 10)), new Date(DMY))} ngày</StyledTableCell>

                                <StyledTableCell align="center">

                                    <Button variant="contained"
                                        color="primary"
                                        //component="span"
                                        startIcon={<DeleteForeverIcon />}
                                        onClick={() => this.huyHD(hd.idhopDong, nv.idnhanVien)}
                                    > Hủy hợp đồng</Button>


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
                                                nvchinhthuc: nv.trangthaiHdchinhThuc,
                                                nvthuviec: nv.trangthaiHdthuViec,
                                                nvhinh: nv.hinhAnh
                                            })}>

                                        </VisibilityIcon>
                                    </Button>

                                    <ShowThoiViecModal
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
                                        nvchinhthuc={nvchinhthuc}
                                        nvthuviec={nvthuviec}
                                        nvpic={nvhinh}
                                    />
                                </StyledTableCell>

                            </StyledTableRow>)
                    }
                }
                else {//Hợp đồng chính thức
                    if (hd.idloaiHd == this.state.chonLoaiHD
                        && nv.idnhanVien == hd.idnhanVien
                        && this.state.chonLoaiHD == 2
                        && hd.ghiChu == "Ký") { //chính thức
                        if (parseInt(differenceInDays(new Date(hd.ngayHetHan), new Date(DMY))) < 0
                        ) {
                            return (
                                <StyledTableRow>
                                    {/* <StyledTableCell>{key + 1}</StyledTableCell> */}
                                    <StyledTableCell>{this.layTenNV(hd.idnhanVien)}</StyledTableCell>
                                    <StyledTableCell align="center">{format(new Date(hd.ngayLapHd), 'dd-MM-yyyy')}</StyledTableCell>
                                    <StyledTableCell align="center">{format(new Date(hd.ngayBatDau), 'dd-MM-yyyy')}</StyledTableCell>
                                    <StyledTableCell align="center">{format(new Date(hd.ngayHetHan), 'dd-MM-yyyy')}</StyledTableCell>
                                    <StyledTableCell align="center">Đã hết hạn</StyledTableCell>

                                    <StyledTableCell align="center">

                                        <Button variant="contained"
                                            color="primary"
                                            //component="span"
                                            startIcon={<DeleteForeverIcon />}
                                            onClick={() => this.huyHD(hd.idhopDong, nv.idnhanVien)}
                                        > Hủy hợp đồng</Button>

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
                                                    nvchinhthuc: nv.trangthaiHdchinhThuc,
                                                    nvthuviec: nv.trangthaiHdthuViec,
                                                    nvhinh: nv.hinhAnh
                                                })}>

                                            </VisibilityIcon>
                                        </Button>

                                        <ShowThoiViecModal
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
                                            nvchinhthuc={nvchinhthuc}
                                            nvthuviec={nvthuviec}
                                            nvpic={nvhinh}
                                        />
                                    </StyledTableCell>

                                </StyledTableRow>)
                        } else if (
                            parseInt(differenceInDays(new Date(hd.ngayHetHan), new Date(DMY))) >= 0
                        ) {
                            return (
                                <StyledTableRow>
                                    {/* <StyledTableCell>{key + 1}</StyledTableCell> */}
                                    <StyledTableCell>{this.layTenNV(hd.idnhanVien)}</StyledTableCell>
                                    <StyledTableCell align="center">{format(new Date(hd.ngayLapHd), 'dd-MM-yyyy')}</StyledTableCell>
                                    <StyledTableCell align="center">{format(new Date(hd.ngayBatDau), 'dd-MM-yyyy')}</StyledTableCell>
                                    <StyledTableCell align="center">{format(new Date(hd.ngayHetHan), 'dd-MM-yyyy')}</StyledTableCell>
                                    <StyledTableCell align="center">Còn lại {differenceInDays(new Date(hd.ngayHetHan), new Date(DMY))} ngày</StyledTableCell>

                                    <StyledTableCell align="center">

                                        <Button variant="contained"
                                            color="primary"
                                            //component="span"
                                            startIcon={<DeleteForeverIcon />}
                                            onClick={() => this.huyHD(hd.idhopDong, nv.idnhanVien)}
                                        > Hủy hợp đồng</Button>


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
                                                    nvchinhthuc: nv.trangthaiHdchinhThuc,
                                                    nvthuviec: nv.trangthaiHdthuViec,
                                                    nvhinh: nv.hinhAnh
                                                })}>

                                            </VisibilityIcon>
                                        </Button>

                                        <ShowThoiViecModal
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
                                            nvchinhthuc={nvchinhthuc}
                                            nvthuviec={nvthuviec}
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
        return (
            <div>
                <div className="container text-center">
                    <h1 className="display-7">QUYẾT ĐINH THÔI VIỆC</h1><hr /><hr />
                </div>

                <Form.Label>Chọn loại hợp đồng: </Form.Label>
                {this.selectPB()}

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
