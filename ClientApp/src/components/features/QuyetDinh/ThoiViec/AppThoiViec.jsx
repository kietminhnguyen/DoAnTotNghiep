import React, { Component } from 'react'
import { Button, ButtonToolbar, Table, Form } from 'react-bootstrap'
import { FormControl, Select, MenuItem } from "@material-ui/core";
import { format, differenceInDays } from 'date-fns'

//import { AddThoiViecModal } from './AddThoiViecModal'
import { ShowThoiViecModal } from './ShowThoiViecModal'

export class AppThoiViec extends Component {
    //static displayName = AppPhongBan.name;


    constructor(props) {
        super(props);
        this.state = {
            pbs: [],
            hds: [],
            loaihds: [],
            nhanviens: [],

            chonLoaiHD: -1,

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
        return <select className="ml-3" onChange={this.handleChange}>
            {
                this.state.loaihds.map(lhd => {
                    return (
                        <option value={lhd.idloaiHd}>
                            {lhd.tenHopDong}
                        </option>
                    )
                })}
        </select>
    }


    layTenNV = (idNVofHD) => {
        for (let i = 0; i < this.state.nhanviens.length; i++) {
            if (idNVofHD == this.state.nhanviens[i].idnhanVien) {
                idNVofHD = this.state.nhanviens[i].hoDem + " " + this.state.nhanviens[i].ten
            }
        }
        return idNVofHD
    }

    xoaHD(idhd, idnv) {
        if (window.confirm('Are you sure!')) {
            fetch('https://localhost:44390/api/hopdongs/' + idhd, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            fetch('https://localhost:44390/api/nhanviens/' + idnv, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    getData = () => {
        //let addModalClose = () => this.setState({ addModalShow: false })
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
        // var hientai = ngay + "-" + thang + "-" + nam
        var DMY = format(new Date(), 'yyyy-MM-dd')

        return nhanviens.map(nv => {
            return hds.map((hd, key) => {
                if (hd.idloaiHd == this.state.chonLoaiHD 
                    && nv.idnhanVien == hd.idnhanVien
                    && this.state.chonLoaiHD == 10) { //thử việc
                    if (parseInt(differenceInDays(new Date(hd.ngayHetHan.substring(0,10)), new Date(DMY))) < 0) {
                        return (
                            <tr key={hd.idhopDong}>
                                <td>{key + 1}</td>
                                <td>{this.layTenNV(hd.idnhanVien)}</td>
                                <td>{format(new Date(hd.ngayLapHd), 'dd-MM-yyyy')}</td>
                                <td>{format(new Date(hd.ngayBatDau), 'dd-MM-yyyy')}</td>
                                <td>{format(new Date(hd.ngayHetHan), 'dd-MM-yyyy')}</td>
                                <td>Đã hết hạn</td>

                                <td>
                                    <ButtonToolbar>

                                        <Button className="mr-2" variant="danger"
                                            onClick={() => this.xoaHD(hd.idhopDong, nv.idnhanVien)}
                                        ><i className="ik ik-trash-2" />
                                            Xóa hợp đồng</Button>

                                        <Button className="mr-2" variant="info"
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
                                            Xem đầy đủ</Button>

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

                                    </ButtonToolbar>
                                </td>
                            </tr>)
                    } else if (parseInt(differenceInDays(new Date(hd.ngayHetHan.substring(0,10)), new Date(DMY))) >= 0) {
                        return (
                            <tr key={hd.idhopDong}>
                                <td>{key + 1}</td>
                                <td>{this.layTenNV(hd.idnhanVien)}</td>
                                <td>{format(new Date(hd.ngayLapHd), 'dd-MM-yyyy')}</td>
                                <td>{format(new Date(hd.ngayBatDau), 'dd-MM-yyyy')}</td>
                                <td>{format(new Date(hd.ngayHetHan), 'dd-MM-yyyy')}</td>
                                <td>Còn lại {differenceInDays(new Date(hd.ngayHetHan.substring(0,10)), new Date(DMY))} ngày</td>
                                <td>
                                    <ButtonToolbar>

                                        <Button className="mr-2" variant="danger"
                                            onClick={() => this.xoaHD(hd.idhopDong, nv.idnhanVien)}
                                        ><i className="ik ik-trash-2" />
                                            Hủy hợp đồng</Button>

                                        <Button className="mr-2" variant="info"
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
                                            Xem đầy đủ</Button>

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

                                    </ButtonToolbar>
                                </td>
                            </tr>)
                    }
                }
                else {//Hợp đồng chính thức
                    if (hd.idloaiHd == this.state.chonLoaiHD 
                        && nv.idnhanVien == hd.idnhanVien
                        && this.state.chonLoaiHD == 2) { //chính thức
                            if (parseInt(differenceInDays(new Date(hd.ngayHetHan), new Date(DMY))) < 0) {
                                return (
                                    <tr key={hd.idhopDong}>
                                        <td>{key + 1}</td>
                                        <td>{this.layTenNV(hd.idnhanVien)}</td>
                                        <td>{format(new Date(hd.ngayLapHd), 'dd-MM-yyyy')}</td>
                                        <td>{format(new Date(hd.ngayBatDau), 'dd-MM-yyyy')}</td>
                                        <td>{format(new Date(hd.ngayHetHan), 'dd-MM-yyyy')}</td>
                                        <td>Đã hết hạn</td>
        
                                        <td>
                                            <ButtonToolbar>
        
                                                <Button className="mr-2" variant="danger"
                                                    onClick={() => this.xoaHD(hd.idhopDong, nv.idnhanVien)}
                                                ><i className="ik ik-trash-2" />
                                                    Xóa hợp đồng</Button>
        
                                                <Button className="mr-2" variant="info"
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
                                                    Xem đầy đủ</Button>
        
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
        
                                            </ButtonToolbar>
                                        </td>
                                    </tr>)
                            } else if (parseInt(differenceInDays(new Date(hd.ngayHetHan), new Date(DMY))) >= 0) {
                                return (
                                    <tr key={hd.idhopDong}>
                                        <td>{key + 1}</td>
                                        <td>{this.layTenNV(hd.idnhanVien)}</td>
                                        <td>{format(new Date(hd.ngayLapHd), 'dd-MM-yyyy')}</td>
                                        <td>{format(new Date(hd.ngayBatDau), 'dd-MM-yyyy')}</td>
                                        <td>{format(new Date(hd.ngayHetHan), 'dd-MM-yyyy')}</td>
                                        <td>Còn lại {differenceInDays(new Date(hd.ngayHetHan), new Date(DMY))} ngày</td>
                                        <td>
                                            <ButtonToolbar>
        
                                                <Button className="mr-2" variant="danger"
                                                    onClick={() => this.xoaHD(hd.idhopDong, nv.idnhanVien)}
                                                ><i className="ik ik-trash-2" />
                                                    Hủy hợp đồng</Button>
        
                                                <Button className="mr-2" variant="info"
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
                                                    Xem đầy đủ</Button>
        
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
        
                                            </ButtonToolbar>
                                        </td>
                                    </tr>)
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
                    <h1 className="display-7">QUYẾT ĐINH THÔI VIỆC</h1><hr/><hr/>
                </div>

                <Form.Label>Chọn loại hợp đồng: </Form.Label>
                {this.getHDtoLoaiHD()}

                <Table className="mt-4">
                    <thead className="">
                        <tr>
                            <th>#</th>
                            <th>Tên nhân viên</th>
                            <th>Ngày ký hợp đồng</th>
                            <th>Ngày bắt đầu</th>
                            <th>Ngày kết thúc</th>
                            <th>Hạn hợp đồng</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getData()}
                    </tbody>
                </Table>
            </div>
        )
    }
}
