import React, { Component } from 'react'
//import { Button, ButtonToolbar, Table, Form } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, ButtonGroup, Button, Select, MenuItem } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import VisibilityIcon from '@material-ui/icons/Visibility';
import MenuBookIcon from '@material-ui/icons/MenuBook';

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
    }

    componentDidUpdate() {
        this.loadNV()
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

    handleChange(event) {
        this.setState({
            chonPB: event.target.value
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

    showButtonKy(idnv) {
        return this.state.nhanviens.map(nv => {
            if (nv.trangthaiHdchinhThuc == null
                && nv.noiDaoTao != "Bổ nhiệm"
                && idnv == nv.idnhanVien
            ) {
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<MenuBookIcon />}
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
                            //nvnganhhoc: nv.nganhHoc,
                            nvnoidaotao: nv.noiDaoTao,
                            //nvxeploai: nv.xepLoai,
                            nvdantoc: nv.iddanToc,
                            nvdaotao: nv.idtrinhDo,
                            nvquoctich: nv.quocTich,
                            nvcv: nv.idchucVu,
                            nvchinhthuc: nv.trangthaiHdchinhThuc,
                            nvhinh: nv.hinhAnh
                        })}
                    >Ký hợp đồng
                    </Button>)
            }
        })
    }

    getData = () => {
        let addModalClose = () => this.setState({ addModalShow: false })
        let showModalClose = () => this.setState({ showModalShow: false })
        const { nhanviens, nvpb, nvcv, nvid, nvho, nvten, nvgioitinh, nvsdt, nvmail, nvhinh,
            nvchinhthuc, nvtinhtranghonnhan, nvngaysinh, nvnoisinh, nvdcthuongtru,
            nvchohientai, nvsocmnd, nvngaycap, nvnoicap, nvtongiao, nvquoctich,
            nvnoidaotao, nvdantoc, nvdaotao } = this.state
        return nhanviens.map(nv => {
            if (nv.noiDaoTao != "Bổ nhiệm"
                && nv.idphongBan == this.state.chonPB
                //|| this.state.chonPB == '')
            ) {
                return (
                    <StyledTableRow>
                        {/* <StyledTableCell>{key + 1}</StyledTableCell> */}
                        <StyledTableCell>{nv.hoDem}</StyledTableCell>
                        <StyledTableCell>{nv.ten}</StyledTableCell>
                        <StyledTableCell align="center">{nv.gioiTinh}</StyledTableCell>
                        <StyledTableCell align="center">{nv.soDienThoai}</StyledTableCell>
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
                                        //nvnganhhoc: nv.nganhHoc,
                                        nvnoidaotao: nv.noiDaoTao,
                                        //nvxeploai: nv.xepLoai,
                                        nvdantoc: nv.iddanToc,
                                        nvdaotao: nv.idtrinhDo,
                                        nvquoctich: nv.quocTich,
                                        nvcv: nv.idchucVu,
                                        nvchinhthuc: nv.trangthaiHdchinhThuc,
                                        nvhinh: nv.hinhAnh
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
                                //nvnganhhoc={nvnganhhoc}
                                nvnoidaotao={nvnoidaotao}
                                //nvxeploai={nvxeploai}
                                nvdantoc={nvdantoc}
                                nvdaotao={nvdaotao}
                                nvngaysinh={nvngaysinh}
                                nvquoctich={nvquoctich}
                                nvcv={nvcv}
                                nvchinhthuc={nvchinhthuc}
                                nvpic={nvhinh}
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
                                //nvnganhhoc={nvnganhhoc}
                                nvnoidaotao={nvnoidaotao}
                                //nvxeploai={nvxeploai}
                                nvdantoc={nvdantoc}
                                nvdaotao={nvdaotao}
                                nvngaysinh={nvngaysinh}
                                nvquoctich={nvquoctich}
                                nvcv={nvcv}
                                nvchinhthuc={nvchinhthuc}
                                nvpic={nvhinh}
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
                                {/* <StyledTableCell>#</StyledTableCell> */}
                                <StyledTableCell>Họ đệm</StyledTableCell>
                                <StyledTableCell>Tên</StyledTableCell>
                                <StyledTableCell align="center">Giới tính</StyledTableCell>
                                <StyledTableCell align="center">Số điện thoại</StyledTableCell>
                                <StyledTableCell align="center">Trạng thái</StyledTableCell>
                                <StyledTableCell align="right">Chức năng</StyledTableCell>
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
