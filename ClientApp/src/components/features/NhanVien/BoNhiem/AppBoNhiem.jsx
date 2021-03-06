import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import { format } from 'date-fns';

import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@material-ui/core'
import SchoolIcon from '@material-ui/icons/School';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { withStyles } from '@material-ui/core/styles'


import { AddXacNhanBnModal } from './AddXacNhanBnModal'
import { ShowBoNhiemModal } from './ShowBoNhiemModal'

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
        //border:true
    },
}))(Table);

export class AppBoNhiem extends Component {
    //static displayName = AppPhongBan.name;


    constructor(props) {
        super(props);
        this.state = {
            //pbs: [],
            qdbns: [],
            ungviens: [],
            addModalShow: false,
            editModalShow: false,
            showModalShow: false
        }
    }

    componentDidMount() {
        this.loadUV();
        this.loadQDBN()
    }
    componentDidUpdate() {
        this.loadUV();
    }

    loadUV() {
        fetch('https://localhost:44390/api/ungviens')
            .then(response => response.json())
            .then(data => {
                this.setState({ ungviens: data });
            });
    }

    loadQDBN() {
        fetch('https://localhost:44390/api/quyetdinhbonhiems')
            .then(response => response.json())
            .then(data => {
                this.setState({ qdbns: data });
            });
    }

    // deleteNhanVien(iduv) {
    //     if (window.confirm('Bạn có chắc muốn xóa?')) {
    //         fetch('https://localhost:44390/api/ungviens/' + iduv, {
    //             method: 'DELETE',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'
    //             }
    //         })

    //     }
    // }

    getTableData() {
        const { qdbns, ungviens, uvid, uvho, uvten, uvgioitinh, uvsdt, uvhinh,
            uvmail, uvtinhtranghonnhan, uvngaysinh, uvnoisinh, uvdcthuongtru,
            uvchohientai, uvsocmnd, uvngaycap, uvnoicap, uvtongiao, uvquoctich,
            uvnganhhoc, uvnoidaotao, uvxeploai, uvdantoc, uvdaotao,
            bnid, bnngaylap, bnngayhieuluc, bnnoidung, bnghichu, bniduv } = this.state
        //let addModalClose = () => this.setState({ addModalShow: false })
        let editModalClose = () => this.setState({ editModalShow: false })
        let showModalClose = () => this.setState({ showModalShow: false })

        return ungviens.map(uv => {
            return qdbns.map(bn => {
                if (uv.noiDaoTao == "Chờ"
                    && uv.idungVien == bn.idungVien
                ) {
                    return (
                        <StyledTableRow >
                            {/* <StyledTableCell>{key + 1}</StyledTableCell> */}
                            <StyledTableCell>{uv.hoDem}</StyledTableCell>
                            <StyledTableCell>{uv.ten}</StyledTableCell>
                            <StyledTableCell align="center">{uv.gioiTinh}</StyledTableCell>
                            <StyledTableCell align="center">{format(new Date(uv.ngaySinh), 'dd-MM-yyyy')}</StyledTableCell>
                            <StyledTableCell align="center">{uv.soDienThoai}</StyledTableCell>

                            <StyledTableCell align="right">

                                <Button variant="contained"
                                    color="primary"
                                    //component="span"
                                    startIcon={<SchoolIcon />}
                                    onClick={() => this.setState({
                                        editModalShow: true,

                                        //QD BN
                                        bnid: bn.idquyetDinhBn,
                                        bnngaylap: bn.ngayQuyetDinh.substring(0, 10),
                                        bnngayhieuluc: bn.ngayHieuLuc.substring(0, 10),
                                        bnnoidung: bn.noiDung,
                                        bnghichu: bn.ghiChu,
                                        bniduv: bn.idungVien,

                                        //ứng viên
                                        uvid: uv.idungVien,
                                        uvho: uv.hoDem,
                                        uvten: uv.ten,
                                        uvgioitinh: uv.gioiTinh,
                                        uvsdt: uv.soDienThoai,
                                        uvnguyenquan: uv.nguyenQuan,
                                        uvngaysinh: uv.ngaySinh.substring(0, 10),
                                        uvtinhtranghonnhan: uv.tinhTrangHonNhan,
                                        uvdcthuongtru: uv.diaChiThuongTru,
                                        uvnoisinh: uv.noiSinh,
                                        uvtongiao: uv.tonGiao,
                                        uvchohientai: uv.choOhienTai,
                                        uvsocmnd: uv.soCmnn,
                                        uvngaycap: uv.ngayCap.substring(0, 10),
                                        uvnoicap: uv.noiCap,
                                        uvmail: uv.email,
                                        uvnganhhoc: uv.nganhHoc,
                                        uvnoidaotao: uv.noiDaoTao,
                                        uvxeploai: uv.xepLoai,
                                        uvdantoc: uv.iddanToc,
                                        uvdaotao: uv.idtrinhDo,
                                        uvquoctich: uv.quocTich,
                                        uvhinh: uv.hinhAnh,
                                    })}>
                                    Xác nhận</Button>


                                <Button>
                                    <VisibilityIcon color="action"
                                        onClick={() => this.setState({
                                            showModalShow: true,
                                            uvid: uv.idungVien,
                                            uvho: uv.hoDem,
                                            uvten: uv.ten,
                                            uvgioitinh: uv.gioiTinh,
                                            uvsdt: uv.soDienThoai,
                                            uvnguyenquan: uv.nguyenQuan,
                                            uvngaysinh: uv.ngaySinh.substring(0, 10),
                                            uvtinhtranghonnhan: uv.tinhTrangHonNhan,
                                            uvdcthuongtru: uv.diaChiThuongTru,
                                            uvnoisinh: uv.noiSinh,
                                            uvtongiao: uv.tonGiao,
                                            uvchohientai: uv.choOhienTai,
                                            uvsocmnd: uv.soCmnn,
                                            uvngaycap: uv.ngayCap.substring(0, 10),
                                            uvnoicap: uv.noiCap,
                                            uvmail: uv.email,
                                            uvnganhhoc: uv.nganhHoc,
                                            uvnoidaotao: uv.noiDaoTao,
                                            uvxeploai: uv.xepLoai,
                                            uvdantoc: uv.iddanToc,
                                            uvdaotao: uv.idtrinhDo,
                                            uvquoctich: uv.quocTich,
                                            uvhinh: uv.hinhAnh,
                                        })}>
                                    </VisibilityIcon>
                                </Button>

                                <AddXacNhanBnModal
                                    show={this.state.editModalShow}
                                    onHide={editModalClose}
                                    uvid={uvid}
                                    uvho={uvho}
                                    uvten={uvten}
                                    uvgioitinh={uvgioitinh}
                                    uvsdt={uvsdt}
                                    uvtinhtranghonnhan={uvtinhtranghonnhan}
                                    uvdcthuongtru={uvdcthuongtru}
                                    uvnoisinh={uvnoisinh}
                                    uvtongiao={uvtongiao}
                                    uvchohientai={uvchohientai}
                                    uvsocmnd={uvsocmnd}
                                    uvngaycap={uvngaycap}
                                    uvnoicap={uvnoicap}
                                    uvmail={uvmail}
                                    uvnganhhoc={uvnganhhoc}
                                    uvnoidaotao={uvnoidaotao}
                                    uvxeploai={uvxeploai}
                                    uvdantoc={uvdantoc}
                                    uvdaotao={uvdaotao}
                                    uvngaysinh={uvngaysinh}
                                    uvquoctich={uvquoctich}
                                    uvpic={uvhinh}
                                    bnid={bnid}
                                    bnngaylap={bnngaylap}
                                    bnngayhieuluc={bnngayhieuluc}
                                    bnnoidung={bnnoidung}
                                    bnghichu={bnghichu}
                                    bniduv={bniduv}
                                />
                                <ShowBoNhiemModal
                                    show={this.state.showModalShow}
                                    onHide={showModalClose}
                                    uvid={uvid}
                                    uvho={uvho}
                                    uvten={uvten}
                                    uvgioitinh={uvgioitinh}
                                    uvsdt={uvsdt}
                                    uvtinhtranghonnhan={uvtinhtranghonnhan}
                                    uvdcthuongtru={uvdcthuongtru}
                                    uvnoisinh={uvnoisinh}
                                    uvtongiao={uvtongiao}
                                    uvchohientai={uvchohientai}
                                    uvsocmnd={uvsocmnd}
                                    uvngaycap={uvngaycap}
                                    uvnoicap={uvnoicap}
                                    uvmail={uvmail}
                                    uvnganhhoc={uvnganhhoc}
                                    uvnoidaotao={uvnoidaotao}
                                    uvxeploai={uvxeploai}
                                    uvdantoc={uvdantoc}
                                    uvdaotao={uvdaotao}
                                    uvngaysinh={uvngaysinh}
                                    uvquoctich={uvquoctich}
                                    uvpic={uvhinh}
                                    bnid={bnid}
                                    bnngaylap={bnngaylap}
                                    bnngayhieuluc={bnngayhieuluc}
                                    bnnoidung={bnnoidung}
                                    bnghichu={bnghichu}
                                    bniduv={bniduv}
                                />

                            </StyledTableCell>
                        </StyledTableRow>)
                }
            })
        })
    }

    render() {
        return (
            <div>
                <div className="container text-center">
                    <h2 className="display-7">DANH SÁCH ỨNG VIÊN</h2>
                    <h4 className="display-7">ĐƯỢC KIẾN NGHỊ BỔ NHIỆM</h4><hr /><hr />
                </div>



                <TableContainer>
                    <StyledTable className="mt-3">
                        <TableHead>
                            <StyledTableRow>
                                {/* <StyledTableCell>#</StyledTableCell> */}
                                <StyledTableCell>Họ đệm</StyledTableCell>
                                <StyledTableCell>Tên</StyledTableCell>
                                <StyledTableCell align="center">Giới tính</StyledTableCell>
                                <StyledTableCell align="center">Ngày sinh</StyledTableCell>
                                <StyledTableCell align="center">Số điện thoại</StyledTableCell>
                                <StyledTableCell align="center">Chức năng</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {this.getTableData()}
                        </TableBody>
                    </StyledTable>
                </TableContainer>
            </div>
        )
    }
}
