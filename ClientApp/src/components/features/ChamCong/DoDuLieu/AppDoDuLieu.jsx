import React, { Component } from 'react'
import axios from 'axios';
import { format, getMonth, getYear, differenceInDays } from 'date-fns';
import { Form, Row, Col } from 'react-bootstrap'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, ButtonGroup, Button, Select, MenuItem } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import NoEncryptionIcon from '@material-ui/icons/NoEncryption';
import ArchiveIcon from '@material-ui/icons/Archive';
import { functions } from 'firebase';

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
    },
}))(Table);

export class AppDoDuLieu extends Component {
    //static displayName = AppDoDuLieu.name;

    constructor(props) {
        super(props);
        this.state = {
            qdKhenThuongs: [],
            qdKiLuats: [],
            nhanviens: [],
            chamcongs: [],
            cctonghops: [],
            tamungluongs: [],
            arrayBL: [],
            idNhanVienCCvaCCTH: '',
            bangluongs: [],
            pbs: [],
            hds: [],
            ThangNamChamCong: '',

            showError: '',
            editModalShow: false,
            snackbaropen: false,
            snackbarmsg: ''
        }
        //this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        //this.handleSubmitHuy = this.handleSubmitHuy.bind(this)
    }

    SnackbarClose = (event) => {
        this.setState({ snackbaropen: false });
    }

    componentDidMount() {
        this.loadChamCong()
        this.loadTamUng()
        this.loadBangLuong()
        this.loadNV()
        this.loadPB()
        this.loadQDKhenThuong()
        this.loadQDKiLuat()
        this.loadHD()
    }
    componentDidUpdate() {
        this.loadBangLuong()
    }

    loadQDKhenThuong() {
        axios.get('https://localhost:44390/api/quyetdinhkts')
            .then(response => {
                //console.log(response)
                this.setState({ qdKhenThuongs: response.data })
            })
            .catch(error => {
                //console.log(error)
                this.setState({ showError: "Lỗi lấy dữ liệu" })
                console.log(this.state.showError)
            })
    }

    loadQDKiLuat() {
        axios.get('https://localhost:44390/api/quyetdinhkls')
            .then(response => {
                //console.log(response)
                this.setState({ qdKiLuats: response.data })
            })
            .catch(error => {
                //console.log(error)
                this.setState({ showError: "Lỗi lấy dữ liệu" })
                console.log(this.state.showError)
            })
    }

    loadChamCong() {
        // fetch('https://localhost:44390/api/chamcongs')
        //     .then(response => response.json())
        //     .then(data => {
        //         this.setState({ chamcongs: data });
        //     });
        axios.get('https://localhost:44390/api/chamcongs')
            .then(response => {
                //console.log(response)
                this.setState({ chamcongs: response.data })
            })
            .catch(error => {
                //console.log(error)
                this.setState({ showError: "Lỗi lấy dữ liệu" })
                console.log(this.state.showError)
            })
    }

    loadTamUng() {
        fetch('https://localhost:44390/api/tamungluongs')
            .then(response => response.json())
            .then(data => {
                this.setState({ tamungluongs: data });
            });
    }

    loadBangLuong() {
        axios.get('https://localhost:44390/api/bangluongs')
            .then(response => {
                //console.log(response)
                this.setState({ bangluongs: response.data })
            })
            .catch(error => {
                //console.log(error)
                this.setState({ showError: "Lỗi lấy dữ liệu" })
                console.log(this.state.showError)
            })
        // fetch('https://localhost:44390/api/bangluongs')
        //     .then(response => response.json())
        //     .then(data => {
        //         this.setState({ bangluongs: data });
        //     });
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

    layTenNV = (idNVofCC) => {
        for (let i = 0; i < this.state.nhanviens.length; i++) {
            if (idNVofCC == this.state.nhanviens[i].idnhanVien) {
                idNVofCC = this.state.nhanviens[i].hoDem + " " + this.state.nhanviens[i].ten
            }
        }
        return idNVofCC
    }

    layTenPB = (idPBofNV) => {
        for (let i = 0; i < this.state.pbs.length; i++) {
            if (idPBofNV == this.state.pbs[i].idphongBan) {
                idPBofNV = this.state.pbs[i].tenPhongBan
            }
        }
        return idPBofNV
    }

    loadHD() {
        fetch('https://localhost:44390/api/hopdongs')
            .then(respone => respone.json())
            .then(data => {
                this.setState({ hds: data })
            })
    }

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

    handleSubmitDo() {
        //event.preventDefault();
        var layThangDaChon = getMonth(new Date(this.state.ThangNamChamCong)) + 1
        var layNamDaChon = getYear(new Date(this.state.ThangNamChamCong))
        
        //////////////////////// lấy data của bảng chấm công để post ///////////////////
        var newArrayChamCong = []
        //////check nv còn hợp đồng
        // var date = new Date()
        // var ngay = date.getDate()
        // var thang = date.getMonth() + 1
        // var nam = date.getFullYear()
        // var hientai = nam + "-" + thang + "-" + ngay
        var DMY = format(new Date(), 'yyyy-MM-dd')
        for (let i = 0; i < this.state.chamcongs.length; i++) {
            for (let x = 0; x < this.state.nhanviens.length; x++) {
                for (let y = 0; y < this.state.hds.length; y++) {
                    var layThangChamCong = getMonth(new Date(this.state.chamcongs[i].ngayChamCong)) + 1
                    var layNamChamCong = getYear(new Date(this.state.chamcongs[i].ngayChamCong))
                    if ((layThangDaChon == layThangChamCong)
                        && (layNamDaChon == layNamChamCong)

                        && ((this.state.nhanviens[x].idnhanVien == this.state.hds[y].idnhanVien)
                            && (this.state.chamcongs[i].idnhanVien == this.state.hds[y].idnhanVien)
                            && (differenceInDays(new Date(this.state.hds[y].ngayHetHan.substring(0, 10)), new Date(DMY)) >= 0)) // check nv còn hợp đồng
                    ) {
                        newArrayChamCong.push(this.state.chamcongs[i])
                    }
                }
            }
        }
        let layIDnv = newArrayChamCong.map(v => v['idnhanVien'])
        let layIDnvKhongTrung = Array.from(new Set(layIDnv))
        //console.log("Các idnv BL: " + layIDnvKhongTrung)////////////\\\\\\\\\\\\

        ////////******************************** FINAL ************************************************/
        var arrayBL = [] // Mảng CHÍNH
        for (let t = 0; t < layIDnvKhongTrung.length; t++) {
            //console.log("t= " + layIDnvKhongTrung[t]) //show mảng idnv trong table chấm công theo tháng năm đã chọn mà không trùng lặp idnv
            arrayBL.push({
                idnhanVien: parseInt(layIDnvKhongTrung[t]),
                thang: parseInt(layThangDaChon),
                nam: parseInt(layNamDaChon),
                mucLuong: 6000000,
                tienThuong: 0,
                tienPhatDiTre: 0,
                tongThuNhap:0,
                tienPhat: 0,
                tongGioTangCa:0,
                tienTangCa:0,
                tienTamUng: 0,
                phuCapKhac: 0,
                truBh: 0,
                soNgayCong: 0,
                soNgayDiTre:0,
                soNgayDiTreKhongTinhLuong:0,
                soNgayNghi: 0,
                tienThucLinh: 0,
                ghiChu: '0',
                heSoChucVu: 0,
                heSoChuyenMon: 0,
                soLuongChiuThue: 0,
                thueTncn: 0,
            })
        }

        if (window.confirm('Bạn có chắc muốn Đỗ dữ liệu?')) {
            axios.post('https://localhost:44390/api/bangluongs/mang', arrayBL)
                .then(response => {
                    this.setState({ arrayBL: response.data })
                    alert("Đỗ dữ liệu thành công")
                })
                .catch(error => {
                    this.setState({ showError: "Lỗi post dữ liệu" })
                    alert("Đỗ dữ liệu không thành công")
                })
        }
    }

    handleSubmitDoTamUng() {
        //event.preventDefault();
        var layThangDaChon = getMonth(new Date(this.state.ThangNamChamCong)) + 1
        var layNamDaChon = getYear(new Date(this.state.ThangNamChamCong))
        var arrayTongHopTAMUNG = [
            {
                "idnhanVien": 12,
                "soTienTamUng": 40,
                "ngayTamUng": "2020-07"
            }, {
                "idnhanVien": 13,
                "soTienTamUng": 70,
                "ngayTamUng": "2020-07"
            }, {
                "idnhanVien": 9,
                "soTienTamUng": 100,
                "ngayTamUng": "2020-06"
            }
        ];

        ////////******************************** FINAL ************************************************/
        var arrayBL = [] // Mảng CHÍNH

        for (let i = 0; i < arrayTongHopTAMUNG.length; i++) {
            for (let j = 0; j < this.state.bangluongs.length; j++) {
                if (
                    arrayTongHopTAMUNG[i].idnhanVien == this.state.bangluongs[j].idnhanVien
                    && layThangDaChon == this.state.bangluongs[j].thang
                    && layNamDaChon == this.state.bangluongs[j].nam
                    && layThangDaChon == parseInt(arrayTongHopTAMUNG[i].ngayTamUng.substring(5, 7))
                    && layNamDaChon == parseInt(arrayTongHopTAMUNG[i].ngayTamUng.substring(0, 4))
                ) {
                    //console.log(this.state.bangluongs[j])
                    arrayBL.push({
                        idbangLuong: this.state.bangluongs[j].idbangLuong,
                        idnhanVien: arrayTongHopTAMUNG[i].idnhanVien,
                        thang: layThangDaChon,
                        nam: layNamDaChon,
                        mucLuong: 6000000,
                        tienThuong: this.state.bangluongs[j].tienThuong,
                        //tienThuongLe: 0,
                        tienNgayNghi: this.state.bangluongs[j].tienNgayNghi,
                        tienPhat: this.state.bangluongs[j].tienPhat,
                        tienTamUng: arrayTongHopTAMUNG[i].soTienTamUng,
                        phuCapKhac: this.state.bangluongs[j].phuCapKhac,
                        truBh: this.state.bangluongs[j].truBh,
                        soNgayCong: this.state.bangluongs[j].soNgayCong,
                        soNgayNghi: this.state.bangluongs[j].soNgayNghi,
                        tienThucLinh: this.state.bangluongs[j].tienThucLinh,
                        ghiChu: "Đã đỗ",
                        heSoChucVu: this.state.bangluongs[j].heSoChucVu,
                        heSoChuyenMon: this.state.bangluongs[j].heSoChuyenMon,
                        soLuongChiuThue: this.state.bangluongs[j].soLuongChiuThue,
                        thueTncn: this.state.bangluongs[j].thueTncn
                    })

                }
            }

        }
        console.log(arrayBL)

        if (window.confirm('Bạn có chắc muốn Đỗ dữ liệu?')) {
            axios.put('https://localhost:44390/api/bangluongs/mangput', arrayBL)
                .then(response => {
                    //this.setState({ arrayBL: response.data })
                    alert("Đỗ dữ liệu thành công")
                })
                .catch(error => {
                    //this.setState({ showError: "Lỗi post dữ liệu" })
                    alert("Đỗ dữ liệu không thành công")
                })
        }

    }

    handleSubmitHuy() {
        //eventt.preventDefault();
        var layThangDaChon = getMonth(new Date(this.state.ThangNamChamCong)) + 1
        var layNamDaChon = getYear(new Date(this.state.ThangNamChamCong))
        var newArrayBLHuy = []
        for (let i = 0; i < this.state.bangluongs.length; i++) {
            if (layThangDaChon == parseInt(this.state.bangluongs[i].thang)
                && layNamDaChon == parseInt(this.state.bangluongs[i].nam)) {

                newArrayBLHuy.push(this.state.bangluongs[i])
            }
        }
        let layIDbl = newArrayBLHuy.map(v => v['idbangLuong'])

        if (window.confirm('Bạn có chắc muốn Hủy?')) {
            for (let i = 0; i < layIDbl.length; i++) {
                //console.log(layIDbl[i])
                axios.delete('https://localhost:44390/api/bangluongs/' + layIDbl[i])
            }
        }
        alert("Hủy thành công")
    }

    showButtonHuyDoDuLieu() {
        var layThangDaChon = getMonth(new Date(this.state.ThangNamChamCong)) + 1
        var layNamDaChon = getYear(new Date(this.state.ThangNamChamCong))

        let co = false
        for (let x = 0; x < this.state.bangluongs.length; x++) {
            for (let y = 0; y < this.state.chamcongs.length; y++) {
                if (this.state.ThangNamChamCong != ''
                    && layThangDaChon == this.state.bangluongs[x].thang
                    && layNamDaChon == this.state.bangluongs[x].nam
                    && (this.state.chamcongs[y].idnhanVien == this.state.bangluongs[x].idnhanVien)
                ) {
                    co = true; // tháng/năm chấm công trùng vs tháng/năm trong bảng lương
                }
            }
        }

        if (co == true && layThangDaChon != '') {
            return (
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<NoEncryptionIcon />}
                    onClick={() => this.handleSubmitHuy()}
                >Hủy đỗ dữ liệu
                </Button>
            )

        } else {
            if (co == false && layThangDaChon != '') {
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<ArchiveIcon />}
                        onClick={() => this.handleSubmitDo()}
                    >Đỗ dữ liệu
                    </Button>)
            }
        }
    }

    checkShowButtonHuyDoDuLieu() {
        var flag = false
        var layThangDaChon = getMonth(new Date(this.state.ThangNamChamCong)) + 1
        var layNamDaChon = getYear(new Date(this.state.ThangNamChamCong))
        for (let i = 0; i < this.state.chamcongs.length; i++) {
            if (
                //(layThangDaChon == getMonth( new Date(this.state.chamcongs[i].ngayChamCong)))
                //&& (layNamDaChon == getYear( new Date(this.state.chamcongs[i].ngayChamCong)))
                layThangDaChon == parseInt(this.state.chamcongs[i].ngayChamCong.substring(5, 7))
                && layNamDaChon == parseInt(this.state.chamcongs[i].ngayChamCong.substring(0, 4))
            ) {
                flag = true
            }
        }

        if (flag) {
            return (
                <Col sm={3} className="ml-10">
                    {this.showButtonHuyDoDuLieu()}
                </Col>
            )
        }
    }

    checkShow3Button() {
        var flag = false
        var layThangDaChon = getMonth(new Date(this.state.ThangNamChamCong)) + 1
        var layNamDaChon = getYear(new Date(this.state.ThangNamChamCong))
        for (let i = 0; i < this.state.bangluongs.length; i++) {
            if (
                layThangDaChon == parseInt(this.state.bangluongs[i].thang)
                && layNamDaChon == parseInt(this.state.bangluongs[i].nam)
                && this.state.bangluongs[i].ghiChu == null
            ) {
                //flag = true
                return (
                    <Row>
                        <Button className={'ml-4'}
                            variant="contained"
                            color="primary"
                            startIcon={<ArchiveIcon />}
                            onClick={() => this.handleSubmitDoTamUng()}
                        >Đỗ dữ liệu tạm ứng
                        </Button>

                        <Button className={'ml-4'}
                            variant="contained"
                            color="primary"
                            startIcon={<ArchiveIcon />}
                        //onClick={() => this.handleSubmitDoTamUng()}
                        >Đỗ dữ liệu khen thưởng
                        </Button>

                        <Button className={"ml-4"}
                            variant="contained"
                            color="primary"
                            startIcon={<ArchiveIcon />}
                        //onClick={() => this.handleSubmitDoTamUng()}
                        >Đỗ dữ liệu kỷ luật
                        </Button>
                    </Row>)
            }
            // else {
            //     if (
            //         layThangDaChon == parseInt(this.state.bangluongs[i].thang)
            //         && layNamDaChon == parseInt(this.state.bangluongs[i].nam)
            //         && this.state.bangluongs[i].ghiChu == "Đã đỗ"
            //     ) {
            //         return (
            //             <Row>
            //                 <Button className={'ml-4'}
            //                     variant="contained"
            //                     color="inherit"
            //                     startIcon={<ArchiveIcon />}
            //                     onClick={() => this.handleSubmitDoTamUng()}
            //                 >Đỗ dữ liệu tạm ứng
            //             </Button>

            //                 <Button className={'ml-4'}
            //                     variant="contained"
            //                     color="inherit"
            //                     startIcon={<ArchiveIcon />}
            //                 //onClick={() => this.handleSubmitDoTamUng()}
            //                 >Đỗ dữ liệu khen thưởng
            //             </Button>

            //                 <Button className={"ml-4"}
            //                     variant="contained"
            //                     color="inherit"
            //                     startIcon={<ArchiveIcon />}
            //                 //onClick={() => this.handleSubmitDoTamUng()}
            //                 >Đỗ dữ liệu kỷ luật
            //             </Button>
            //             </Row>)
            //     }
            // }
        }



        if (flag) {

        }
        else {

        }
    }

    showTableData() {
        var flag = false
        var layThangDaChon = getMonth(new Date(this.state.ThangNamChamCong)) + 1
        var layNamDaChon = getYear(new Date(this.state.ThangNamChamCong))
        for (let i = 0; i < this.state.chamcongs.length; i++) {
            if (
                //(layThangDaChon == getMonth( new Date(this.state.chamcongs[i].ngayChamCong)))
                //&& (layNamDaChon == getYear( new Date(this.state.chamcongs[i].ngayChamCong)))
                layThangDaChon == parseInt(this.state.chamcongs[i].ngayChamCong.substring(5, 7))
                && layNamDaChon == parseInt(this.state.chamcongs[i].ngayChamCong.substring(0, 4))
            ) {
                flag = true
            }
        }

        if (!flag) {
            return (
                <h2 className="display-7">Không có dữ liệu</h2>
            )
        }

        // const { nhanviens, chamcongs} = this.state;
        // return chamcongs.map((cc, key1) => {
        //     return nhanviens.map(nv => {
        //         if (cc.idnhanVien == nv.idnhanVien
        //             && (cc.ngayChamCong.substring(0, 7) == this.state.ThangNamChamCong)) {
        //             return (
        //                 <StyledTableRow key={cc.idchamCong}>
        //                     <StyledTableCell>{key1 + 1}</StyledTableCell>
        //                     <StyledTableCell>{this.layTenNV(cc.idnhanVien)}</StyledTableCell>
        //                     <StyledTableCell>{cc.idnhanVien}</StyledTableCell>
        //                     <StyledTableCell>{this.layTenPB(nv.idphongBan)}</StyledTableCell>
        //                     <StyledTableCell>{format(new Date(cc.ngayChamCong), 'dd-MM-yyyy')}</StyledTableCell>
        //                     <StyledTableCell>{cc.gioVao.substring(0, 5)}</StyledTableCell>
        //                     <StyledTableCell>{cc.gioRa.substring(0, 5)}</StyledTableCell>
        //                     <StyledTableCell>{cc.soGioLam}</StyledTableCell>
        //                 </StyledTableRow>)
        //         }
        //     })
        // })
    }


    render() {
        return (
            <div>
                <div className="container text-center">
                    <h1 className="display-7">ĐỖ DỮ LIỆU CHẤM CÔNG</h1><hr />
                </div>

                <Form>
                    <Row>
                        <Form.Label className="mt-2 ml-4">Chọn tháng năm:</Form.Label>
                        <Col sm={3}>
                            <Form.Group controlId="ThangNamChamCong">
                                <Form.Control
                                    type="month"
                                    name="ThangNamChamCong"
                                    //required
                                    onChange={(event) => this.handleChange(event)}
                                />
                            </Form.Group>
                        </Col>
                        {this.checkShowButtonHuyDoDuLieu()}

                    </Row>

                    {/* {this.checkShow3Button()} */}

                </Form>
                <hr />
                <div className="container text-center">
                    {this.showTableData()}
                </div>

                {/* <TableContainer>
                    <StyledTable className="mt-3">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>#</StyledTableCell>
                                <StyledTableCell>Tên Nhân Viên</StyledTableCell>
                                <StyledTableCell>ID Nhân Viên</StyledTableCell>
                                <StyledTableCell>Thuộc phòng ban</StyledTableCell>
                                <StyledTableCell>Ngày Chấm Công</StyledTableCell>
                                <StyledTableCell>Giờ Vào</StyledTableCell>
                                <StyledTableCell>Giờ Ra</StyledTableCell>
                                <StyledTableCell>Số Giờ Làm</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {this.showTableData()}
                        </TableBody>
                    </StyledTable>
                </TableContainer> */}

            </div >
        )
    }
}