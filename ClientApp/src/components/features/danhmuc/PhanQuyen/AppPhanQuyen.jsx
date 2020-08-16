import React, { Component } from 'react'
import axios from 'axios';
import { Form, Col, Row } from 'react-bootstrap'
import {
    TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button,
    Select, MenuItem, FormControlLabel, RadioGroup, Radio
} from '@material-ui/core'
import DeleteIcon from "@material-ui/icons/Delete"
import { withStyles } from '@material-ui/core/styles'
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import { format, differenceInDays } from 'date-fns'


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

export class AppPhanQuyen extends Component {
    //static displayName = AppPhongBan.name;

    constructor(props) {
        super(props);
        this.state = {
            taikhoans: [],
            pbs: [],
            hds: [],
            nvs: [],
            chonPB: '',
            chonRadio: "adminNS",
            // addModalShow: false,
            // editModalShow: false,
            // showModalShow: false
            InModalShow: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeCheck = this.handleChangeCheck.bind(this)
    }

    componentDidMount() {
        this.loadNV()
        this.loadPB()
        this.loadHD()
        this.loadTK()
    }
    componentDidUpdate() {
        this.loadNV()
        //this.loadTK()
    }

    loadTK() {
        fetch('https://localhost:44390/api/taikhoans')
            .then(response => response.json())
            .then(data => {
                this.setState({ taikhoans: data });
            });
    }

    loadHD() {
        fetch('https://localhost:44390/api/hopdongs')
            .then(respone => respone.json())
            .then(data => {
                this.setState({ hds: data })
            })
    }

    loadNV() {
        fetch('https://localhost:44390/api/nhanviens')
            .then(response => response.json())
            .then(data => {
                this.setState({ nvs: data });
            });
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


    //************* Btn Xóa */
    checkBtnXoaTKadminNS(userNV) {
        return this.state.nvs.map(nv => {
            if (userNV == nv.username
                && nv.username == 'adminNS'
            ) {
                return (
                    <Button>
                        <DeleteIcon color="secondary"
                            onClick={() => this.skBtnXoa(nv.username)}
                        ></DeleteIcon>
                    </Button>)
            }
        })
    }

    checkBtnXoaTKadminTC(userNV) {
        return this.state.nvs.map(nv => {
            if (userNV == nv.username
                && nv.username == 'adminTC'
            ) {
                return (
                    <Button>
                        <DeleteIcon color="secondary"
                            onClick={() => this.skBtnXoa(nv.username)}
                        ></DeleteIcon>
                    </Button>)
            }
        })
    }

    checkBtnXoa(userNV) {
        return this.state.nvs.map(nv => {
            if (userNV == nv.username
                && nv.username == 'adminNS'
                && this.state.chonRadio == "adminNS"
            ) {
                return (
                    this.checkBtnXoaTKadminNS(userNV)
                )
            }
            else if (userNV == nv.username
                && nv.username == 'adminTC'
                && this.state.chonRadio == "adminTC"
            ) {
                return (
                    this.checkBtnXoaTKadminTC(userNV)
                )
            }
        })
    }

    skBtnXoa(user) {
        if (window.confirm('Bạn có chắc muốn xóa tài khoản admin này?')) {
            // put NV username    
            let arrayNV = []
            for (let i = 0; i < this.state.nvs.length; i++) {
                if (this.state.nvs[i].username == user) {
                    arrayNV.push({
                        idnhanVien: this.state.nvs[i].idnhanVien,
                        hoDem: this.state.nvs[i].hoDem,
                        ten: this.state.nvs[i].ten,
                        //nguyenQuan: event.target.NhanvienNguyenQuan.value,
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
                        nganhHoc: null,
                        noiDaoTao: this.state.nvs[i].noiDaoTao,/////////
                        //xepLoai: event.target.NhanvienXepLoai.value,
                        username: this.state.nvs[i].idnhanVien,
                        //username: null,
                        idphongBan: this.state.nvs[i].idphongBan,
                        idchucVu: 5,
                        //idquanHeGd
                        ////trangThaiHoSo=> trangthaiHDThuViec, trangthaiHDChinhThuc,
                        trangthaiHdthuViec: this.state.nvs[i].trangthaiHdthuViec,
                        trangthaiHdchinhThuc: this.state.nvs[i].trangthaiHdchinhThuc,
                        iddanToc: this.state.nvs[i].iddanToc,
                        idtrinhDo: this.state.nvs[i].idtrinhDo,
                        idquyetDinhBn: this.state.nvs[i].idquyetDinhBn,
                    })
                }
            }
            //console.log(arrayNV)
            axios.put('https://localhost:44390/api/nhanviens/mangput', arrayNV)
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

    //********** Btn KEY */
    checkBtnKeyAdminNS(idnv) {
        return this.state.nvs.map(nv => {
            if (idnv == nv.idnhanVien
                && nv.username == 'adminNS'
            ) {
                return (
                    <Button disabled>
                        <VpnKeyIcon color="inherit"
                        //onClick={() => this.skBtnKey(nv.idnhanVien)}
                        ></VpnKeyIcon>
                    </Button>)
            }
        })
    }

    checkBtnKeyAdminTC(idnv) {
        return this.state.nvs.map(nv => {
            if (idnv == nv.idnhanVien
                && nv.username == 'adminTC'
            ) {
                return (
                    <Button disabled>
                        <VpnKeyIcon color="inherit"
                        //onClick={() => this.skBtnKey(nv.idnhanVien)}
                        ></VpnKeyIcon>
                    </Button>)
            }
        })
    }

    checkBtnKey(idnv) {
        return this.state.nvs.map(nv => {
            if (idnv == nv.idnhanVien
                && nv.username != 'adminNS'
                && nv.username != 'adminTC') {
                return (
                    <Button>
                        <VpnKeyIcon color="secondary"
                            onClick={() => this.skBtnKey(idnv)}
                        ></VpnKeyIcon>
                    </Button>
                )
            }
            else if (idnv == nv.idnhanVien
                && nv.username == 'adminNS'
                && this.state.chonRadio == "adminNS"
            ) {
                return (
                    this.checkBtnKeyAdminNS(idnv)
                )
            }
            else if (idnv == nv.idnhanVien
                && nv.username == 'adminTC'
                && this.state.chonRadio == "adminTC"
            ) {
                return (
                    this.checkBtnKeyAdminTC(idnv)
                )
            }
        })
    }

    // Kiểm tra nhân viên đã cấp tài khoản hay chưa. 
    // so sánh user trong TK với user trong NV. Nếu trùng là true -> đã cấp tk rồi
    checkTonTaiTK(userNV) {
        for (let i = 0; i < this.state.taikhoans.length; i++) {
            if (this.state.taikhoans[i].username == userNV) {
                return true
            }
        }
        return false
    }

    checkTonTaiTkAdminNS() {
        for (let i = 0; i < this.state.nvs.length; i++) {
            if (this.state.nvs[i].username == 'adminNS') {
                return true
            }
        }
        return false
    }

    checkTonTaiTkAdminTC() {
        for (let i = 0; i < this.state.nvs.length; i++) {
            if (this.state.nvs[i].username == 'adminTC') {
                return true
            }
        }
        return false
    }

    // Xóa TK adminNS adminTC hiện tại   
    skBtnKey = (user) => {
        //console.log(format(new Date(), 'yyyy-MM-dd'));   
        let arrayTK = []
        let arrayNVTK = []
        let arrayTKnew = []
        for (let i = 0; i < this.state.nvs.length; i++) {
            if (this.state.nvs[i].idnhanVien == user
                && this.state.nvs[i].username == null
            ) {
                arrayTKnew.push({
                    //Thêm vào bảng TK
                    username: this.state.nvs[i].idnhanVien,
                    password: 123,
                    mail: format(new Date(), 'yyyy-MM-dd'),
                })
            }
            if (this.state.nvs[i].idnhanVien == user) {
                arrayTK.push({
                    //Thêm vào bảng TK
                    username: 'adminNS',
                    password: 123,
                    mail: format(new Date(), 'yyyy-MM-dd'),
                })

                arrayNVTK.push({
                    // Sửa username trong bảng NV
                    idnhanVien: this.state.nvs[i].idnhanVien,
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
                    username: 'adminNS',
                    idphongBan: 1,
                    idchucVu: 8,
                    //idquanHeGd
                    ////trangThaiHoSo=> 
                    trangthaiHDThuViec: this.state.nvs[i].trangthaiHdthuViec,
                    trangthaiHDChinhThuc: this.state.nvs[i].trangthaiHdchinhThuc,
                    iddanToc: this.state.nvs[i].iddanToc,
                    idtrinhDo: this.state.nvs[i].idtrinhDo,
                    idquyetDinhBn: this.state.nvs[i].idquyetDinhBn,
                })
            }
        }
        //console.log(arrayTK);
        //console.log(arrayNVTK);
        let arrayTK_TC = []
        let arrayNVTK_TC = []
        let arrayTKnew_TC = []
        for (let i = 0; i < this.state.nvs.length; i++) {
            if (this.state.nvs[i].idnhanVien == user
                && this.state.nvs[i].username == null
            ) {
                arrayTKnew_TC.push({
                    //Thêm vào bảng TK
                    username: this.state.nvs[i].idnhanVien,
                    password: 123,
                    mail: format(new Date(), 'yyyy-MM-dd'),
                })
            }
            if (this.state.nvs[i].idnhanVien == user) {
                arrayTK_TC.push({
                    //Thêm vào bảng TK
                    username: 'adminTC',
                    password: 123,
                    mail: format(new Date(), 'yyyy-MM-dd'),
                })

                arrayNVTK_TC.push({
                    // Sửa username trong bảng NV
                    idnhanVien: this.state.nvs[i].idnhanVien,
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
                    username: 'adminTC',
                    idphongBan: 2,
                    idchucVu: 8,
                    //idquanHeGd
                    ////trangThaiHoSo=> 
                    trangthaiHDThuViec: this.state.nvs[i].trangthaiHdthuViec,
                    trangthaiHDChinhThuc: this.state.nvs[i].trangthaiHdchinhThuc,
                    iddanToc: this.state.nvs[i].iddanToc,
                    idtrinhDo: this.state.nvs[i].idtrinhDo,
                    idquyetDinhBn: this.state.nvs[i].idquyetDinhBn,
                })
            }
        }


        let flag = false
        if (this.checkTonTaiTK(user)) {
            flag = true
        }
        else {
            flag = false
        }


        // Đã cấp TK rồi
        // 1. sửa nhanvien có username: adminNS + sửa taikhoan adminNS (không cần nữa do đã có skBtnXoa)
        // 2. sửa nhanvien cần cấp quyền + sửa taikhoan cần cấp quyền
        if (flag) {
            //console.log('Cấp rồi');
            if (this.state.chonRadio == "adminNS") {
                if (this.checkTonTaiTkAdminNS() == true) {
                    alert('Vui lòng xóa tài khoản adminNS cũ trước khi cấp tài khoản mới')
                }
                else {
                    if (window.confirm('Bạn có chắc muốn cấp tài khoản adminNS cho nhân viên này?')) {

                        /////////2. sửa nhanvien cần cấp quyền + sửa taikhoan cần cấp quyền
                        axios.put("https://localhost:44390/api/nhanviens/mangput", arrayNVTK)
                        axios.put("https://localhost:44390/api/taikhoans/mangput", arrayTK)

                        alert("Cấp thành công")
                    }
                }
            }
            else if (this.state.chonRadio == "adminTC") {
                if (this.checkTonTaiTkAdminTC() == true) {
                    alert('Vui lòng xóa tài khoản adminTC cũ trước khi cấp tài khoản mới')
                }
                else {
                    if (window.confirm('Bạn có chắc muốn cấp tài khoản adminTC cho nhân viên này?')) {

                        /////////2. sửa nhanvien cần cấp quyền + sửa taikhoan cần cấp quyền
                        axios.put("https://localhost:44390/api/nhanviens/mangput", arrayNVTK_TC)
                        axios.put("https://localhost:44390/api/taikhoans/mangput", arrayTK_TC)

                        alert("Cấp thành công")
                    }
                }
            }
        }
        // Chưa cấp TK
        else {
            //console.log('Chưa cấp');
            if (this.state.chonRadio == "adminNS") {
                if (this.checkTonTaiTkAdminNS() == true) {
                    alert('Vui lòng xóa tài khoản adminNS cũ trước khi cấp tài khoản mới')
                }
                else {
                    if (window.confirm('Bạn có chắc muốn cấp tài khoản adminNS cho nhân viên này?')) {

                        /////////2. sửa nhanvien cần cấp quyền + sửa taikhoan cần cấp quyền
                        axios.put("https://localhost:44390/api/nhanviens/mangput", arrayNVTK)
                        axios.put("https://localhost:44390/api/taikhoans/mangput", arrayTK)
                        axios.post("https://localhost:44390/api/taikhoans/mangpost", arrayTKnew)

                        alert("Cấp thành công")
                    }
                }
            }
            else if (this.state.chonRadio == "adminTC") {
                if (this.checkTonTaiTkAdminTC() == true) {
                    alert('Vui lòng xóa tài khoản adminTC cũ trước khi cấp tài khoản mới')
                }
                else {
                    if (window.confirm('Bạn có chắc muốn cấp tài khoản adminTC cho nhân viên này?')) {

                        /////////2. sửa nhanvien cần cấp quyền + sửa taikhoan cần cấp quyền
                        axios.put("https://localhost:44390/api/nhanviens/mangput", arrayNVTK_TC)
                        axios.put("https://localhost:44390/api/taikhoans/mangput", arrayTK_TC)
                        axios.post("https://localhost:44390/api/taikhoans/mangpost", arrayTKnew_TC)

                        alert("Cấp thành công")
                    }
                }
            }
        }
    }

    showTableData = () => {

        // const { hdid, hdky, hdbatdau, hdketthuc, nvpb, nvcv, nvid, nvho, nvten, nvgioitinh, nvsdt, nvmail,
        //     nvtrangthaiHdthuViec, nvtinhtranghonnhan, nvngaysinh, nvnoisinh, nvdcthuongtru,
        //     nvchohientai, nvsocmnd, nvngaycap, nvnoicap, nvtongiao, nvquoctich, nvnganhhoc,
        //     nvnoidaotao, nvxeploai, nvdantoc, nvdaotao } = this.state
        // let InModalClose = () => this.setState({ InModalShow: false })

        const { hds, nvs } = this.state
        var DMY = format(new Date(), 'yyyy-MM-dd')
        return hds.map(hd => {
            return nvs.map(nv => {
                if (this.state.chonRadio == "adminNS"
                    && hd.ghiChu == "Ký"
                    && hd.idloaiHd == 2
                    && hd.idnhanVien == nv.idnhanVien
                    && (nv.idphongBan == this.state.chonPB
                        || this.state.chonPB == '')
                    && (parseInt(differenceInDays(new Date(hd.ngayHetHan.substring(0, 10)), new Date(DMY))) > 30)
                ) {
                    return (
                        <StyledTableRow >
                            <StyledTableCell>{this.layTenNV(hd.idnhanVien)}</StyledTableCell>
                            <StyledTableCell>{format(new Date(hd.ngayLapHd), 'dd-MM-yyyy')}</StyledTableCell>
                            <StyledTableCell>{format(new Date(hd.ngayBatDau), 'dd-MM-yyyy')}</StyledTableCell>
                            <StyledTableCell>{format(new Date(hd.ngayHetHan), 'dd-MM-yyyy')}</StyledTableCell>
                            <StyledTableCell>Còn lại {differenceInDays(new Date(hd.ngayHetHan.substring(0, 10)), new Date(DMY))} ngày</StyledTableCell>
                            <StyledTableCell align="center">

                                {this.checkBtnKey(nv.idnhanVien)}

                                {this.checkBtnXoa(nv.username)}

                            </StyledTableCell>

                        </StyledTableRow>)
                }
                else {
                    if (this.state.chonRadio == "adminTC"
                        && hd.ghiChu == "Ký"
                        && hd.idloaiHd == 2
                        && hd.idnhanVien == nv.idnhanVien
                        && (nv.idphongBan == this.state.chonPB
                            || this.state.chonPB == '')
                        && (parseInt(differenceInDays(new Date(hd.ngayHetHan.substring(0, 10)), new Date(DMY))) > 30)
                    ) {
                        return (
                            <StyledTableRow >
                                <StyledTableCell>{this.layTenNV(hd.idnhanVien)}</StyledTableCell>
                                <StyledTableCell>{format(new Date(hd.ngayLapHd), 'dd-MM-yyyy')}</StyledTableCell>
                                <StyledTableCell>{format(new Date(hd.ngayBatDau), 'dd-MM-yyyy')}</StyledTableCell>
                                <StyledTableCell>{format(new Date(hd.ngayHetHan), 'dd-MM-yyyy')}</StyledTableCell>
                                <StyledTableCell>Còn lại {differenceInDays(new Date(hd.ngayHetHan.substring(0, 10)), new Date(DMY))} ngày</StyledTableCell>
                                <StyledTableCell align="center">

                                    {this.checkBtnKey(nv.idnhanVien)}

                                    {this.checkBtnXoa(nv.username)}

                                </StyledTableCell>

                            </StyledTableRow>)
                    }
                }
            })
        })
    }

    render() {
        return (
            <div>
                <div className="container text-center">
                    <h2 className="display-7">DANH SÁCH NHÂN VIÊN ĐÃ KÝ HỢP ĐỒNG</h2>
                    <h5 className="display-7">(Hạn hợp đồng còn hơn 30 ngày)</h5><hr /><hr />
                </div>

                <Row>
                    <Col sm={4}>
                        <label>Chọn cấp quyền cho:</label>
                        <RadioGroup
                            //name="gender1"
                            value={this.state.chonRadio}
                            onChange={this.handleChangeCheck}
                        >
                            <FormControlLabel value="adminNS" control={<Radio />} label="Admin nhân sự" />
                            <FormControlLabel value="adminTC" control={<Radio />} label="Admin tài chính" />
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
                                <StyledTableCell>Chức năng</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {this.showTableData()}

                        </TableBody>
                    </StyledTable>
                </TableContainer>
            </div>
        )
    }
}
