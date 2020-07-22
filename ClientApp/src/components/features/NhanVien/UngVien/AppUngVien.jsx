import React, { Component } from 'react'

import { Row, Col } from 'react-bootstrap'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, ButtonGroup, Button, Select, MenuItem } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import VisibilityIcon from '@material-ui/icons/Visibility';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import { format } from 'date-fns';

import { AddUngVienModal } from './AddUngVienModal'
import { EditUngVienModal } from './EditUngVienModal'
import { ShowUngVienModal } from './ShowUngVienModal'


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


export class AppUngVien extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            //pbs: [],
            ungviens: [],
            addModalShow: false,
            editModalShow: false,
            showModalShow: false
        }
    }

    componentDidMount() {
        this.loadUV();
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

    deleteNhanVien(iduv) {
        if (window.confirm('Bạn có chắc muốn xóa?')) {
            fetch('https://localhost:44390/api/ungviens/' + iduv, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })

        }
    }

    getTableData() {
        const { ungviens, uvid, uvho, uvten, uvgioitinh, uvsdt,
            uvmail, uvtinhtranghonnhan, uvngaysinh, uvnoisinh, uvdcthuongtru,
            uvchohientai, uvsocmnd, uvngaycap, uvnoicap, uvtongiao, uvquoctich,
            uvnganhhoc, uvnoidaotao, uvxeploai, uvdantoc, uvdaotao } = this.state

        let editModalClose = () => this.setState({ editModalShow: false })
        let showModalClose = () => this.setState({ showModalShow: false })

        return ungviens.map((uv, key) => {
            return (
                <StyledTableRow key={uv.idungVien}>
                    <StyledTableCell>{key + 1}</StyledTableCell>
                    <StyledTableCell>{uv.hoDem}</StyledTableCell>
                    <StyledTableCell>{uv.ten}</StyledTableCell>
                    <StyledTableCell>{uv.gioiTinh}</StyledTableCell>
                    <StyledTableCell>{format(new Date(uv.ngaySinh), 'dd-MM-yyyy')}</StyledTableCell>
                    <StyledTableCell>{uv.soDienThoai}</StyledTableCell>

                    <StyledTableCell align="right">
                        <ButtonGroup variant="text">
                            <Button>
                                <EditIcon color="primary"
                                    onClick={() => this.setState({
                                        editModalShow: true,
                                        uvid: uv.idungVien,
                                        // uvpb: uv.idphongBan,
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
                                    })}>
                                </EditIcon>
                            </Button>

                            <Button>
                                <DeleteIcon color="secondary"
                                    onClick={() => this.deleteNhanVien(uv.idungVien)}>
                                </DeleteIcon>
                            </Button>

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
                                    })}>
                                </VisibilityIcon>
                            </Button>

                            <EditUngVienModal
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

                            />
                            <ShowUngVienModal
                                show={this.state.showModalShow}
                                onHide={showModalClose}
                                uvid={uvid}
                                // uvpb={uvpb}
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
                            />
                        </ButtonGroup>
                    </StyledTableCell>
                </StyledTableRow>)

        })

    }

    render() {

        let addModalClose = () => this.setState({ addModalShow: false })

        return (
            <div>
                <div className="container text-center">
                    <h1 className="display-7">QUẢN LÝ ỨNG VIÊN</h1><hr />
                </div>
                <ButtonGroup >
                    <Col sm={12}>
                        <label htmlFor="contained-button-file">
                            <Button variant="contained"
                                color="primary"
                                component="span"
                                startIcon={<PersonAddIcon />}
                                onClick={() => this.setState({ addModalShow: true })}>
                                Thêm ứng viên
                                </Button>
                        </label>
                    </Col>


                    <AddUngVienModal
                        show={this.state.addModalShow}
                        onHide={addModalClose}
                    />

                </ButtonGroup>

                <TableContainer>
                    <StyledTable className="mt-3">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>#</StyledTableCell>
                                <StyledTableCell>Họ đệm</StyledTableCell>
                                <StyledTableCell>Tên</StyledTableCell>
                                <StyledTableCell>Giới tính</StyledTableCell>
                                <StyledTableCell>Ngày sinh</StyledTableCell>
                                <StyledTableCell>Số điện thoại</StyledTableCell>
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
