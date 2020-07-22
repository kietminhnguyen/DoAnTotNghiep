import React, { Component } from 'react'
//import { Button, ButtonToolbar, Table, Form } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, ButtonGroup, Button, Select, MenuItem } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import VisibilityIcon from '@material-ui/icons/Visibility';


import { EditNhanVienModal } from './EditNhanVienModal'
import { ShowNhanVienModal } from './ShowNhanVienModal'

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
            pbs: [],
            nhanviens: [],
            chonPB: '',
            addModalShow: false,
            editModalShow: false,
            showModalShow: false,
            setOpen: false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.loadNV()
        this.loadPB()
    }

    componentDidUpdate() {
        this.loadNV()
        //this.loadPB()
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

    xoaNVChuaKyHD(idnv) {
        if (window.confirm('Bạn có chắc muốn xóa?')) {
            fetch('https://localhost:44390/api/nhanviens/' + idnv, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    checkShowButtonXoa(idnv) {
        return this.state.nhanviens.map(nv => {
            if (idnv == nv.idnhanVien && (nv.trangthaiHdthuViec == null && nv.trangthaiHdchinhThuc == null)) {
                return (
                    <Button><DeleteIcon color="secondary"
                        onClick={() => this.xoaNVChuaKyHD(nv.idnhanVien)}
                    /></Button>)
            }
        })
    }

    handleChange(event) {
        this.setState({
            chonPB: event.target.value
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

    getNVtoPB = () => {
        return <Select className="ml-3"
            //open={open}
            onClose={this.handleCloseSelect}
            onOpen={this.handleOpenSelect}
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

    getTableData() {
        const { nhanviens, nvpb, nvcv, nvid, nvho, nvten, nvgioitinh, nvsdt, nvtrangthaiHdthuViec,
            nvmail, nvtinhtranghonnhan, nvngaysinh, nvnoisinh, nvdcthuongtru, nvtrangthaiHdchinhThuc,
            nvchohientai, nvsocmnd, nvngaycap, nvnoicap, nvtongiao, nvquoctich,
            nvnganhhoc, nvnoidaotao, nvxeploai, nvdantoc, nvdaotao } = this.state
        let editModalClose = () => this.setState({ editModalShow: false })
        let showModalClose = () => this.setState({ showModalShow: false })

        return nhanviens.map((nv, key) => {
            if (nv.idphongBan == this.state.chonPB || this.state.chonPB == '') {
                return (
                    <StyledTableRow key={nv.idnhanVien}>
                        <StyledTableCell>{key + 1}</StyledTableCell>
                        <StyledTableCell>{nv.hoDem}</StyledTableCell>
                        <StyledTableCell>{nv.ten}</StyledTableCell>
                        <StyledTableCell align="right">{nv.gioiTinh}</StyledTableCell>
                        <StyledTableCell align="right">{nv.soDienThoai}</StyledTableCell>
                        <StyledTableCell align="right">{this.layTenPB(nv.idphongBan)}</StyledTableCell>
                        <StyledTableCell align="right">
                            <ButtonGroup variant="text">

                                {this.checkShowButtonXoa(nv.idnhanVien)}

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
                                            //nvnguyenquan: nv.nguyenQuan,
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
                                            nvtrangthaiHdthuViec: nv.trangthaiHdthuViec,
                                            nvtrangthaiHdchinhThuc: nv.trangthaiHdchinhThuc
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
                                            //nvnguyenquan: nv.nguyenQuan,
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
                                            nvtrangthaiHdthuViec: nv.trangthaiHdthuViec,
                                            nvtrangthaiHdchinhThuc: nv.trangthaiHdchinhThuc
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
                                nvtrangthaiHdthuViec={nvtrangthaiHdthuViec}
                                nvtrangthaiHdchinhThuc={nvtrangthaiHdchinhThuc}
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
                                nvtrangthaiHdthuViec={nvtrangthaiHdthuViec}
                                nvtrangthaiHdchinhThuc={nvtrangthaiHdchinhThuc}
                            />
                        </StyledTableCell>

                    </StyledTableRow>)
            }
        })
    }

    render() {
        return (
            <div>
                <div className="container text-center">
                    <h1 className="display-7">DANH SÁCH NHÂN VIÊN</h1><hr />
                </div>

                <Form.Label>Chọn phòng ban: </Form.Label>
                {this.getNVtoPB()}

                <TableContainer>
                    <StyledTable className="mt-3">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>#</StyledTableCell>
                                <StyledTableCell>Họ đệm</StyledTableCell>
                                <StyledTableCell>Tên</StyledTableCell>
                                <StyledTableCell align="right">Giới tính</StyledTableCell>
                                <StyledTableCell align="right">Số điện thoại</StyledTableCell>
                                <StyledTableCell align="right">Thuộc phòng ban</StyledTableCell>
                                <StyledTableCell align="center">Chức năng</StyledTableCell>
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
