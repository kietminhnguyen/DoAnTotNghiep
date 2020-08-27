import React, { Component } from 'react'
//import { Button, ButtonToolbar, Table, Form } from 'react-bootstrap'
import axios from 'axios';
import { Form, Col, Row } from 'react-bootstrap'
import {
    TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
    ButtonGroup, Button, Select, MenuItem, FormControlLabel, RadioGroup, Radio
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import VisibilityIcon from '@material-ui/icons/Visibility';
import PrintIcon from '@material-ui/icons/Print';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { format } from 'date-fns'

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import { EditNhanVienModal } from './EditNhanVienModal'
import { ShowNhanVienModal } from './ShowNhanVienModal'
import { InNhanVienModal } from './InNhanVienModal'

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
        //border: "1"
    },
}))(Table);

export class AppNhanVien extends Component {
    //static displayName = AppPhongBan.name;


    constructor(props) {
        super(props);
        this.state = {
            taikhoans: [],
            qdbns: [],
            hopdongs: [],
            pbs: [],
            nhanviens: [],
            ungviens: [],
            chonPB: 2,
            chonRadio: "Chưa ký",

            snackbaropen: false,
            snackbarmsg: '',

            addModalShow: false,
            editModalShow: false,
            showModalShow: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeCheck = this.handleChangeCheck.bind(this)
    }

    SnackbarClose = (event) => {
        this.setState({ snackbaropen: false });
    };

    componentDidMount() {
        this.loadNV()
        this.loadPB()
        this.loadHD()
        this.loadQDBN()
        this.loadUV()
        this.loadTK()
    }

    componentDidUpdate() {
        //this.loadNV()
        //this.loadPB()
    }

    loadTK() {
        fetch('https://localhost:44390/api/taikhoans')
            .then(response => response.json())
            .then(data => {
                this.setState({ taikhoans: data });
            });
    }

    loadUV() {
        fetch('https://localhost:44390/api/ungviens')
            .then(response => response.json())
            .then(data => {
                this.setState({ ungviens: data });
            });
    }

    loadNV() {
        // axios.get('https://localhost:44390/api/nhanviens')
        // .then(response => {
        //     //console.log(response)
        //     this.setState({ nhanviens: response.data })
        // })
        // .catch(error => {
        //     //console.log(error)
        //     //this.setState({ showError: "Lỗi lấy dữ liệu" })
        //     //console.log(this.state.showError)
        // })
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
                this.setState({ hopdongs: data })
            })
    }

    loadQDBN() {
        fetch('https://localhost:44390/api/quyetdinhbonhiems')
            .then(respone => respone.json())
            .then(data => {
                this.setState({ qdbns: data })
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

    getNVtoPB = () => {
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

    layTenPB = (idPBofNV) => {
        for (let i = 0; i < this.state.pbs.length; i++) {
            if (idPBofNV == this.state.pbs[i].idphongBan) {
                idPBofNV = this.state.pbs[i].tenPhongBan
            }
        }
        return idPBofNV
    }


    /****** Xóa nv chưa ký hđ *************************************************/
    xoaNV(idnv) { // Xóa nv chưa ký hđ chính thức
        //if (window.confirm('Bạn có chắc muốn xóa?')) {
            fetch('https://localhost:44390/api/nhanviens/' + idnv, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            //alert("Xóa thành công")
            //.then(() => {
                //alert('thanh cong');
                this.setState({ snackbaropen: true, snackbarmsg: "Xóa thành công" });
            //})
        //}
    }

    xoaNVvaQDBNsuaUV(idnv, idqd, iduv) { // Xóa nv chưa ký hđ thử việc
        if (window.confirm('Bạn có chắc muốn xóa?')) {
            fetch('https://localhost:44390/api/nhanviens/' + idnv, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            axios.delete('https://localhost:44390/api/quyetdinhbonhiems/' + idqd)

            var arrayUV = []
            for (let i = 0; i < this.state.ungviens.length; i++) {
                if (this.state.ungviens[i].idungVien == iduv) {
                    arrayUV.push({
                        idungVien: iduv,
                        hoDem: this.state.ungviens[i].hoDem,
                        ten: this.state.ungviens[i].ten,
                        tinhTrangHonNhan: this.state.ungviens[i].tinhTrangHonNhan,
                        ngaySinh: this.state.ungviens[i].ngaySinh,
                        gioiTinh: this.state.ungviens[i].gioiTinh,
                        hinhAnh: this.state.ungviens[i].hinhAnh,
                        diaChiThuongTru: this.state.ungviens[i].diaChiThuongTru,
                        choOhienTai: this.state.ungviens[i].choOhienTai,
                        soCmnn: this.state.ungviens[i].soCmnn,
                        ngayCap: this.state.ungviens[i].ngayCap,
                        tonGiao: this.state.ungviens[i].tonGiao,
                        noiCap: this.state.ungviens[i].noiCap,
                        quocTich: this.state.ungviens[i].quocTich,
                        email: this.state.ungviens[i].email,
                        soDienThoai: this.state.ungviens[i].soDienThoai,
                        //nganhHoc: event.target.UngvienNganhHoc.value,
                        noiDaoTao: "Chưa",
                        idtrinhDo: this.state.ungviens[i].idtrinhDo,
                        //xepLoai: event.target.UngvienXepLoai.value,
                        iddanToc: this.state.ungviens[i].iddanToc,
                        noiSinh: this.state.ungviens[i].noiSinh,
                    })
                }
            }
            axios.put('https://localhost:44390/api/ungviens/mangput', arrayUV)
            alert("Xóa thành công")
        }
    }

    checkBtnXoaChuaKy(idnv) {
        return this.state.nhanviens.map(nv => {
            if (idnv == nv.idnhanVien  /// Xóa nv chưa ký hợp đồng CHÍNH THỨC
                && (nv.trangthaiHdthuViec == null && nv.trangthaiHdchinhThuc == null)
                && nv.noiDaoTao != "Bổ nhiệm"
            ) {
                return (
                    <Button><DeleteIcon color="secondary"
                        onClick={() => this.xoaNV(nv.idnhanVien)}
                    /></Button>)
            }
            else { /// Xóa nv chưa ký hợp đồng THỬ VIỆC. xóa nv & xóa qdbn & sửa trạng thái uv thành "Chưa"
                return this.state.qdbns.map(qd => {
                    return this.state.ungviens.map(uv => {
                        if (idnv == nv.idnhanVien
                            && nv.noiDaoTao == "Bổ nhiệm"
                            && (nv.trangthaiHdthuViec == null && nv.trangthaiHdchinhThuc == null)
                            && nv.idquyetDinhBn == qd.idquyetDinhBn
                            && uv.idungVien == qd.idungVien
                        ) {
                            return (
                                <Button><DeleteIcon color="secondary"
                                    onClick={() => this.xoaNVvaQDBNsuaUV(nv.idnhanVien,
                                        qd.idquyetDinhBn, uv.idungVien)}
                                /></Button>)
                        }
                    })
                })
            }
        })
    }
    //**************************************************************************** */

    /* Xóa nv đã ký hd chính thức mà đã thôi việc *****************************/
    xoaHD(idhd, idnv) {/// bỏ do đã có xóa hđ bên màn hình xem hd
        if (window.confirm('Bạn có chắc muốn xóa hợp đồng của nhân viên này?')) {
            axios.delete('https://localhost:44390/api/hopdongs/' + idhd)

            var arrayNV = []
            for (let i = 0; i < this.state.nhanviens.length; i++) {
                if (this.state.nhanviens[i].idnhanVien == idnv) {
                    arrayNV.push({
                        idnhanVien: idnv,
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
                        //nganhHoc: event.target.NhanvienNganhHoc.value,
                        noiDaoTao: this.state.nhanviens[i].noiDaoTao,
                        //xepLoai: this.props.,
                        //username
                        idphongBan: this.state.nhanviens[i].idphongBan,
                        idchucVu: this.state.nhanviens[i].idchucVu,
                        //idquanHeGd
                        ////trangThaiHoSo=> 
                        trangthaiHDThuViec: "Đã xóa hđ",
                        trangthaiHDChinhThuc: "Đã xóa hđ",
                        iddanToc: this.state.nhanviens[i].iddanToc,
                        idtrinhDo: this.state.nhanviens[i].idtrinhDo,
                        idquyetDinhBn: this.state.nhanviens[i].idquyetDinhBn,
                    })
                }
            }
            axios.put('https://localhost:44390/api/nhanviens/mangput', arrayNV)
            alert("Xóa thành công")
        }
    }

    xoaNVxoaQDBNxoaUV(idnv, idqd, iduv) { // nv thử việc này đã bị thôi việc
        if (window.confirm('Bạn có chắc muốn xóa?')) {
            // fetch('https://localhost:44390/api/nhanviens/' + idnv, {
            //     method: 'DELETE',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     }
            // })
            axios.delete('https://localhost:44390/api/nhanviens/' + idnv)

            axios.delete('https://localhost:44390/api/quyetdinhbonhiems/' + idqd)

            axios.delete('https://localhost:44390/api/ungviens/' + iduv)

            alert("Xóa thành công")
        }
    }

    xoaNVdaThoiViec(idnv) { // Xóa bangLuong, chamCong, chamCongTangCa, quyetDinhKl, quyetDinhKt, tamUngLuong
        
    }

    // Bỏ do dính nhiều khóa ngoại
    checkBtnXoaNV(idnv) {
        return this.state.nhanviens.map(nv => {
            if (idnv == nv.idnhanVien  /// hợp đồng CHÍNH THỨC
                && nv.noiDaoTao != "Bổ nhiệm"
                && (nv.trangthaiHdthuViec == "Đã xóa hđ" && nv.trangthaiHdchinhThuc == "Đã xóa hđ")
            ) {
                return (
                    <Button><DeleteIcon color="secondary"
                        onClick={() => this.xoaNV(nv.idnhanVien)}
                    /></Button>)
            }
            else { /// Xóa nv chưa ký hợp đồng THỬ VIỆC. xóa nv & xóa qdbn & sửa trạng thái uv thành "Chưa"
                return this.state.qdbns.map(qd => {
                    return this.state.ungviens.map(uv => {
                        if (idnv == nv.idnhanVien
                            && nv.noiDaoTao == "Bổ nhiệm"
                            && (nv.trangthaiHdthuViec == "Đã xóa hđ" && nv.trangthaiHdchinhThuc == "Đã xóa hđ")
                            && nv.idquyetDinhBn == qd.idquyetDinhBn
                            && uv.idungVien == qd.idungVien
                        ) {
                            return (
                                <Button><DeleteIcon color="secondary"
                                    onClick={() => this.xoaNVvaQDBNsuaUV(nv.idnhanVien,
                                        qd.idquyetDinhBn, uv.idungVien)}
                                /></Button>)
                        }
                    })
                })
            }

            // else { /// Xóa nv chưa ký hợp đồng THỬ VIỆC. xóa nv & xóa qdbn & sửa trạng thái uv thành "Chưa"
            //     //return this.state.qdbns.map(qd => {
            //     //return this.state.ungviens.map(uv => {
            //     if (idnv == nv.idnhanVien  /// hợp đồng THỬ VIỆC
            //         && nv.noiDaoTao == "Bổ nhiệm"
            //         && (nv.trangthaiHdthuViec == "Đã xóa hđ" && nv.trangthaiHdchinhThuc == "Đã xóa hđ")
            //     ) {
            //         return (
            //             <Button><DeleteIcon color="secondary"
            //                 onClick={() => this.xoaNV(nv.idnhanVien)}
            //             /></Button>)
            //     }
            //     //})
            //     //})
            // }
        })
    }

    //********* Btn KEY */
    skBtnKey = (idnvtk) => {
        //console.log(format(new Date(), 'yyyy-MM-dd'));   
        let arrayTK = []
        let arrayNVTK = []
        for (let i = 0; i < this.state.nhanviens.length; i++) {
            if (this.state.nhanviens[i].idnhanVien == idnvtk) {
                arrayTK.push({
                    //Thêm vào bảng TK
                    username: this.state.nhanviens[i].idnhanVien,
                    password: 123,
                    mail: format(new Date(), 'yyyy-MM-dd'),
                })

                arrayNVTK.push({
                    // Sửa username trong bảng NV
                    idnhanVien: this.state.nhanviens[i].idnhanVien,
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
                    //nganhHoc: event.target.NhanvienNganhHoc.value,
                    noiDaoTao: this.state.nhanviens[i].noiDaoTao,
                    //xepLoai: this.props.,
                    username: this.state.nhanviens[i].idnhanVien,
                    idphongBan: this.state.nhanviens[i].idphongBan,
                    idchucVu: this.state.nhanviens[i].idchucVu,
                    //idquanHeGd
                    ////trangThaiHoSo=> 
                    trangthaiHDThuViec: this.state.nhanviens[i].trangthaiHdthuViec,
                    trangthaiHDChinhThuc: this.state.nhanviens[i].trangthaiHdchinhThuc,
                    iddanToc: this.state.nhanviens[i].iddanToc,
                    idtrinhDo: this.state.nhanviens[i].idtrinhDo,
                    idquyetDinhBn: this.state.nhanviens[i].idquyetDinhBn,
                })
            }
        }
        //console.log(arrayTK);
        //console.log(arrayTK);
        if (window.confirm('Bạn có chắc muốn cấp tài khoản cho nhân viên này?')) {
            /////////post taikhoan + put nv

            axios.post("https://localhost:44390/api/taikhoans/mangpost", arrayTK)
            axios.put("https://localhost:44390/api/nhanviens/mangput", arrayNVTK)
                .then(response => {
                    //this.setState({ arrayBL: response.data })
                    alert("Cấp thành công")
                })
                .catch(error => {
                    //this.setState({ showError: "Lỗi post dữ liệu" })
                    //alert("Xóa không thành công")
                })
        }
    }

    checkHDChinhThuc(idnv) {
        // nếu là hd chính thức sẽ đc show btnKey
        for (let i = 0; i < this.state.hopdongs.length; i++) {
            if (this.state.hopdongs[i].idloaiHd == 2
                && parseInt(this.state.hopdongs[i].idnhanVien)  == idnv
            ) {
                return true
            }
            else {
                return false
            }
        }
    }

    checkBtnKey(idnv) {

        return this.state.nhanviens.map(nv => {
            if (idnv == nv.idnhanVien 
                && nv.username == null 
                //&& flag == true
            ) {
                //idnv = nv.idnhanVien
                return (
                    <Button>
                        <VpnKeyIcon color="secondary"
                            onClick={() => this.skBtnKey(nv.idnhanVien)}
                        ></VpnKeyIcon>
                    </Button>
                )
            }
        })
    }

    getTableData() {
        const { hopdongs, nhanviens, nvpb, nvcv, nvid, nvho, nvten, nvgioitinh, nvsdt, nvthuviec,
            nvmail, nvtinhtranghonnhan, nvngaysinh, nvnoisinh, nvdcthuongtru, nvchinhthuc,
            nvchohientai, nvsocmnd, nvngaycap, nvnoicap, nvtongiao, nvquoctich, nvhinh,
            nvnoidaotao, nvdantoc, nvdaotao, nvusername, nvqdbn } = this.state
        let editModalClose = () => this.setState({ editModalShow: false })
        let showModalClose = () => this.setState({ showModalShow: false })
        let inModalClose = () => this.setState({ inModalShow: false })

        return nhanviens.map(nv => {
            if (nv.username != "adminNS" && nv.username != "adminTC") {
                if (this.state.chonRadio == "Chưa ký" // xem ds nv chưa ký hd
                    && nv.idphongBan == this.state.chonPB
                    //|| this.state.chonPB == '')
                    && nv.trangthaiHdthuViec == null
                    && nv.trangthaiHdchinhThuc == null
                ) {
                    return (
                        <StyledTableRow >
                            {/* <StyledTableCell>{key + 1}</StyledTableCell> */}
                            <StyledTableCell>{nv.hoDem}</StyledTableCell>
                            <StyledTableCell>{nv.ten}</StyledTableCell>
                            <StyledTableCell align="center">{nv.gioiTinh}</StyledTableCell>
                            <StyledTableCell align="center">{nv.soDienThoai}</StyledTableCell>
                            <StyledTableCell align="center">{this.layTenPB(nv.idphongBan)}</StyledTableCell>
                            <StyledTableCell align="right">
                                <ButtonGroup variant="text">

                                    {this.checkBtnXoaChuaKy(nv.idnhanVien)}

                                    <Button>
                                        <EditIcon color="primary"
                                            onClick={() => this.setState({
                                                editModalShow: true,
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
                                                nvusername: nv.username,
                                                nvdantoc: nv.iddanToc,
                                                nvdaotao: nv.idtrinhDo,
                                                nvquoctich: nv.quocTich,
                                                nvcv: nv.idchucVu,
                                                nvthuviec: nv.trangthaiHdthuViec,
                                                nvchinhthuc: nv.trangthaiHdchinhThuc,
                                                nvhinh: nv.hinhAnh,
                                                nvqdbn: nv.idquyetDinhBn,
                                            })}>
                                        </EditIcon>
                                    </Button>

                                    <Button>
                                        <VisibilityIcon color="action"
                                            onClick={() => this.setState({
                                                showModalShow: true,
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
                                                nvthuviec: nv.trangthaiHdthuViec,
                                                nvchinhthuc: nv.trangthaiHdchinhThuc,
                                                nvhinh: nv.hinhAnh,
                                            })}>
                                        </VisibilityIcon>
                                    </Button>

                                </ButtonGroup>
                                <EditNhanVienModal
                                    show={this.state.editModalShow}
                                    onHide={editModalClose}
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
                                    nvthuviec={nvthuviec}
                                    nvchinhthuc={nvchinhthuc}
                                    nvpic={nvhinh}
                                    nvqdbn={nvqdbn}
                                />
                                <ShowNhanVienModal
                                    show={this.state.showModalShow}
                                    onHide={showModalClose}
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
                                    nvthuviec={nvthuviec}
                                    nvchinhthuc={nvchinhthuc}
                                    nvpic={nvhinh}
                                />
                            </StyledTableCell>

                        </StyledTableRow>
                    )
                }
                /*================================================================================================*/
                else {//// xem ds nv đã thôi việc mà đã xóa hđ (trang thai nv "Đã xóa hđ")
                    if (nv.idphongBan == this.state.chonPB
                        && this.state.chonRadio == "Thôi việc"
                        && nv.trangthaiHdchinhThuc == "Đã xóa hđ"
                        && nv.trangthaiHdthuViec == "Đã xóa hđ") {
                        return (
                            <StyledTableRow >
                                {/* <StyledTableCell>{key + 1}</StyledTableCell> */}
                                <StyledTableCell>{nv.hoDem}</StyledTableCell>
                                <StyledTableCell>{nv.ten}</StyledTableCell>
                                <StyledTableCell align="center">{nv.gioiTinh}</StyledTableCell>
                                <StyledTableCell align="center">{nv.soDienThoai}</StyledTableCell>
                                <StyledTableCell align="center">{this.layTenPB(nv.idphongBan)}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <ButtonGroup variant="text">

                                        {/* {this.checkBtnXoaNV(nv.idnhanVien)} */} 

                                        <Button>
                                            <VisibilityIcon color="action"
                                                onClick={() => this.setState({
                                                    showModalShow: true,
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
                                                    nvthuviec: nv.trangthaiHdthuViec,
                                                    nvchinhthuc: nv.trangthaiHdchinhThuc,
                                                    nvhinh: nv.hinhAnh,
                                                })}>
                                            </VisibilityIcon>
                                        </Button>
                                    </ButtonGroup>

                                    <ShowNhanVienModal
                                        show={this.state.showModalShow}
                                        onHide={showModalClose}
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
                                        nvthuviec={nvthuviec}
                                        nvchinhthuc={nvchinhthuc}
                                        nvpic={nvhinh}
                                    />
                                </StyledTableCell>
                            </StyledTableRow>
                        )
                    }
                    /*================================================================================================*/
                    else {
                        return hopdongs.map(hd => { // Đã ký hd rồi thì k thể xóa nv mà chỉ được Hủy hợp đồng
                            if (nv.idphongBan == this.state.chonPB
                                //|| this.state.chonPB == '')
                                && this.state.chonRadio == "Đã ký"
                                && nv.idnhanVien == hd.idnhanVien
                                && hd.ghiChu == "Ký"
                            ) {
                                return (
                                    <StyledTableRow >
                                        {/* <StyledTableCell>{key + 1}</StyledTableCell> */}
                                        <StyledTableCell>{nv.hoDem}</StyledTableCell>
                                        <StyledTableCell>{nv.ten}</StyledTableCell>
                                        <StyledTableCell align="center">{nv.gioiTinh}</StyledTableCell>
                                        <StyledTableCell align="center">{nv.soDienThoai}</StyledTableCell>
                                        <StyledTableCell align="center">{this.layTenPB(nv.idphongBan)}</StyledTableCell>
                                        <StyledTableCell align="right">
                                            <ButtonGroup variant="text">

                                                {this.checkBtnKey(nv.idnhanVien)}
                                                
                                                <Button>
                                                    <EditIcon color="primary"
                                                        onClick={() => this.setState({
                                                            editModalShow: true,
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
                                                            nvusername: nv.username,
                                                            nvdantoc: nv.iddanToc,
                                                            nvdaotao: nv.idtrinhDo,
                                                            nvquoctich: nv.quocTich,
                                                            nvcv: nv.idchucVu,
                                                            nvthuviec: nv.trangthaiHdthuViec,
                                                            nvchinhthuc: nv.trangthaiHdchinhThuc,
                                                            nvhinh: nv.hinhAnh,
                                                            nvqdbn: nv.idquyetDinhBn,
                                                        })}>
                                                    </EditIcon>
                                                </Button>

                                                <Button>
                                                    <VisibilityIcon color="action"
                                                        onClick={() => this.setState({
                                                            showModalShow: true,
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
                                                            nvthuviec: nv.trangthaiHdthuViec,
                                                            nvchinhthuc: nv.trangthaiHdchinhThuc,
                                                            nvhinh: nv.hinhAnh,
                                                        })}>
                                                    </VisibilityIcon>
                                                </Button>

                                                <Button>
                                                    <PrintIcon color="inherit"
                                                        onClick={() => this.setState({
                                                            inModalShow: true,
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
                                                            // nvnganhhoc: nv.nganhHoc,
                                                            nvnoidaotao: nv.noiDaoTao,
                                                            // nvxeploai: nv.xepLoai,
                                                            nvdantoc: nv.iddanToc,
                                                            nvdaotao: nv.idtrinhDo,
                                                            nvquoctich: nv.quocTich,
                                                            nvcv: nv.idchucVu,
                                                        })}
                                                    >
                                                    </PrintIcon>
                                                </Button>

                                            </ButtonGroup>
                                            <InNhanVienModal
                                                show={this.state.inModalShow}
                                                onHide={inModalClose}
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
                                                // nvnganhhoc={nvnganhhoc}
                                                nvnoidaotao={nvnoidaotao}
                                                // nvxeploai={nvxeploai}
                                                nvdantoc={nvdantoc}
                                                nvdaotao={nvdaotao}
                                                nvngaysinh={nvngaysinh}
                                                nvquoctich={nvquoctich}
                                            />
                                            <EditNhanVienModal
                                                show={this.state.editModalShow}
                                                onHide={editModalClose}
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
                                                nvthuviec={nvthuviec}
                                                nvchinhthuc={nvchinhthuc}
                                                nvpic={nvhinh}
                                                nvqdbn={nvqdbn}
                                            />
                                            <ShowNhanVienModal
                                                show={this.state.showModalShow}
                                                onHide={showModalClose}
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
                                                nvthuviec={nvthuviec}
                                                nvchinhthuc={nvchinhthuc}
                                                nvpic={nvhinh}
                                            />
                                        </StyledTableCell>

                                    </StyledTableRow>
                                )
                            }
                            /*================================================================================================*/
                            else {
                                if (nv.idphongBan == this.state.chonPB //// xem ds nv đã thôi việc
                                    && this.state.chonRadio == "Thôi việc"
                                    && nv.idnhanVien == hd.idnhanVien
                                    && hd.ghiChu == "Hủy"
                                ) {
                                    return (
                                        <StyledTableRow >
                                            {/* <StyledTableCell>{key + 1}</StyledTableCell> */}
                                            <StyledTableCell>{nv.hoDem}</StyledTableCell>
                                            <StyledTableCell>{nv.ten}</StyledTableCell>
                                            <StyledTableCell align="center">{nv.gioiTinh}</StyledTableCell>
                                            <StyledTableCell align="center">{nv.soDienThoai}</StyledTableCell>
                                            <StyledTableCell align="center">{this.layTenPB(nv.idphongBan)}</StyledTableCell>
                                            <StyledTableCell align="right">
                                                <ButtonGroup variant="text">

                                                    {/* {this.checkBtnXoaNV(nv.idnhanVien)} */}

                                                    <Button>
                                                        <VisibilityIcon color="action"
                                                            onClick={() => this.setState({
                                                                showModalShow: true,
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
                                                                nvthuviec: nv.trangthaiHdthuViec,
                                                                nvchinhthuc: nv.trangthaiHdchinhThuc,
                                                                nvhinh: nv.hinhAnh,
                                                            })}>
                                                        </VisibilityIcon>
                                                    </Button>

                                                </ButtonGroup>

                                                <ShowNhanVienModal
                                                    show={this.state.showModalShow}
                                                    onHide={showModalClose}
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
                                                    nvthuviec={nvthuviec}
                                                    nvchinhthuc={nvchinhthuc}
                                                    nvpic={nvhinh}
                                                />
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    )
                                }
                            }
                        })
                    }
                }
            }
        })
    }

    render() {
        return (
            <div>
                <div className="container text-center">
                    <h1 className="display-7">DANH SÁCH NHÂN VIÊN</h1><hr />
                </div>

                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={this.state.snackbaropen}
                    autoHideDuration={3000}
                    onClose={this.SnackbarClose}
                    message={<span id="message-id">{this.state.snackbarmsg}</span>}
                    action={[
                        <IconButton key="close" arial-label="Close" color="inherit" onClick={this.SnackbarClose}>
                            x
                        </IconButton>
                    ]}
                />

                <Row>
                    <Col sm={4}>
                        <label>Xem danh sách nhân viên </label>
                        <RadioGroup
                            value={this.state.chonRadio}
                            onChange={this.handleChangeCheck}
                        >
                            <FormControlLabel value="Đã ký" control={<Radio />} label="Đã ký hợp đồng" />
                            <FormControlLabel value="Chưa ký" control={<Radio />} label="Chưa ký hợp đồng" />
                            <FormControlLabel value="Thôi việc" control={<Radio />} label="Đã thôi việc" />
                        </RadioGroup>
                    </Col>
                    <Col sm={4}></Col>
                    <Col sm={4}>
                        <Form.Label>Chọn phòng ban: </Form.Label>
                        {this.getNVtoPB()}
                    </Col>
                </Row>

                <TableContainer>
                    <StyledTable className="mt-3">
                        <TableHead>
                            <StyledTableRow>
                                {/* <StyledTableCell>#</StyledTableCell> */}
                                <StyledTableCell>Họ đệm</StyledTableCell>
                                <StyledTableCell>Tên</StyledTableCell>
                                <StyledTableCell align="center">Giới tính</StyledTableCell>
                                <StyledTableCell align="center">Số điện thoại</StyledTableCell>
                                <StyledTableCell align="center">Thuộc phòng ban</StyledTableCell>
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
