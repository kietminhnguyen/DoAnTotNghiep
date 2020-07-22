import React, { Component } from 'react'
//import { Button, ButtonToolbar, Table, Form } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, ButtonGroup, Button, Select, MenuItem } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import VisibilityIcon from '@material-ui/icons/Visibility';

import { AddHDChinhThucModal } from './AddHDChinhThucModal'
import { ShowHDChinhThucModal } from './ShowHDChinhThucModal'

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

export class AppHDChinhThuc extends Component {
    //static displayName = AppPhongBan.name;


    constructor(props) {
        super(props);
        this.state = {
            pbs: [],
            hds: [],
            nhanviens: [],
            chonPB: '',
            addModalShow: false,
            editModalShow: false,
            showModalShow: false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.loadNV()
        this.loadPB()
        //this.loadHD()
    }

    // componentDidUpdate() {
    //     this.loadNV()
    //     //this.loadHD()
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

    selectPB = () => {
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

    showButtonKy(idnv) {
        return this.state.nhanviens.map(nv => {
            if (nv.trangthaiHdchinhThuc == null
                && nv.noiDaoTao == null
                && idnv == nv.idnhanVien
            ) {
                return (
                    <Button
                        variant="contained"
                        color="secondary"
                        //startIcon={<NoEncryptionIcon />}
                        onClick={() => this.setState({
                            addModalShow: true,
                            nvid: nv.idnhanVien,
                            nvpb: nv.idphongBan,
                            nvho: nv.hoDem,
                            nvten: nv.ten,
                            nvgioitinh: nv.gioiTinh,
                            nvsdt: nv.soDienThoai,
                            //nvnguyenquan: nv.nguyenQuan,
                            nvngaysinh: nv.ngaySinh,
                            nvtinhtranghonnhan: nv.tinhTrangHonNhan,
                            nvdcthuongtru: nv.diaChiThuongTru,
                            nvnoisinh: nv.noiSinh,
                            nvtongiao: nv.tonGiao,
                            nvchohientai: nv.choOhienTai,
                            nvsocmnd: nv.soCmnn,
                            nvngaycap: nv.ngayCap,
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
                        })}
                    >Ký hợp đồng
                    </Button>)
            }
        })
    }

    getData = () => {
        let addModalClose = () => this.setState({ addModalShow: false })
        let showModalClose = () => this.setState({ showModalShow: false })
        const { nhanviens, nvpb, nvcv, nvid, nvho, nvten, nvgioitinh, nvsdt, nvmail,
            nvtrangthaiHdChinhThuc, nvtinhtranghonnhan, nvngaysinh, nvnoisinh, nvdcthuongtru,
            nvchohientai, nvsocmnd, nvngaycap, nvnoicap, nvtongiao, nvquoctich, nvnganhhoc,
            nvnoidaotao, nvxeploai, nvdantoc, nvdaotao } = this.state
        return nhanviens.map((nv, key) => {
            if (nv.noiDaoTao == null
                && (nv.idphongBan == this.state.chonPB || this.state.chonPB == '')
                ) {
                return (
                    <StyledTableRow key={nv.idnhanVien}>
                        <StyledTableCell>{key + 1}</StyledTableCell>
                        <StyledTableCell>{nv.hoDem}</StyledTableCell>
                        <StyledTableCell>{nv.ten}</StyledTableCell>
                        <StyledTableCell align="center">{nv.gioiTinh}</StyledTableCell>
                        <StyledTableCell align="right">{nv.soDienThoai}</StyledTableCell>
                        <StyledTableCell align="center">{nv.trangthaiHdchinhThuc}</StyledTableCell>
                        <StyledTableCell align="right">

                            {this.showButtonKy(nv.idnhanVien)}

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
                                        nvtrangthaiHdChinhThuc: nv.trangthaiHdchinhThuc
                                    })}>
                                </VisibilityIcon>
                            </Button>


                            <AddHDChinhThucModal
                                show={this.state.addModalShow}
                                onHide={addModalClose}
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

                            <ShowHDChinhThucModal
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
                                nvtrangthaiHdChinhThuc={nvtrangthaiHdChinhThuc}
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
                    <h1 className="display-7">KÝ HỢP ĐỒNG CHÍNH THỨC</h1>
                    <h4 className="display-7">Danh sách nhân viên chưa ký hợp đồng</h4><hr /><hr />
                </div>

                <Form.Label>Chọn phòng ban: </Form.Label>
                {this.selectPB()}

                <TableContainer>
                <StyledTable className="mt-3">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>#</StyledTableCell>
                            <StyledTableCell>Họ đệm</StyledTableCell>
                            <StyledTableCell>Tên</StyledTableCell>
                            <StyledTableCell>Giới tính</StyledTableCell>
                            <StyledTableCell>Số điện thoại</StyledTableCell>
                            <StyledTableCell>Trạng thái</StyledTableCell>
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
