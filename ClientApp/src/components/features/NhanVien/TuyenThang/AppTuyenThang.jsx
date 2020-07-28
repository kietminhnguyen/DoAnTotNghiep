import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, ButtonGroup, Button, Select, MenuItem } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility';
import { withStyles } from '@material-ui/core/styles'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { format } from 'date-fns';
//import { EditTuyenThangModal } from './EditTuyenThangModal'
import { ShowTuyenThangModal } from './ShowTuyenThangModal'
import { AddTuyenThangModal } from './AddTuyenThangModal'

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

export class AppTuyenThang extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hopdongs:[],
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
        this.loadHD()
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

    loadHD() {
        fetch('https://localhost:44390/api/hopdongs')
            .then(respone => respone.json())
            .then(data => {
                this.setState({ hopdongs: data })
            })
    }

    handleChange(event) {
        this.setState({
            chonPB: event.target.value
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

    getTableData() {
        const { hopdongs,nhanviens, nvpb, nvcv, nvid, nvho, nvten, nvgioitinh, nvsdt, 
            nvmail, nvtinhtranghonnhan, nvngaysinh, nvnoisinh, nvdcthuongtru, 
            nvchohientai, nvsocmnd, nvngaycap, nvnoicap, nvtongiao, nvquoctich, nvhinh,
            nvnganhhoc, nvnoidaotao, nvxeploai, nvdantoc, nvdaotao } = this.state

        let showModalClose = () => this.setState({ showModalShow: false })

        return nhanviens.map(nv => {
            return hopdongs.map(hd =>{
                if (nv.idphongBan == this.state.chonPB
                    //|| this.state.chonPB == ''
                    && nv.idnhanVien == hd.idnhanVien
                    && hd.ghiChu == "Ký"
                ) {
                    return (<StyledTableRow>
                        {/* <StyledTableCell>{key + 1}</StyledTableCell> */}
                        <StyledTableCell>{nv.hoDem}</StyledTableCell>
                        <StyledTableCell>{nv.ten}</StyledTableCell>
                        <StyledTableCell align="center">{nv.gioiTinh}</StyledTableCell>
                        <StyledTableCell align="center">{format(new Date(nv.ngaySinh), 'dd-MM-yyyy')}</StyledTableCell>
                        <StyledTableCell align="center">{nv.soDienThoai}</StyledTableCell>
                        <StyledTableCell align="right">
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
                                        nvhinh: nv.hinhAnh,
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
                                        //nvtrangthaiHdthuViec: nv.trangthaiHdthuViec,
                                        //nvtrangthaiHdchinhThuc: nv.trangthaiHdchinhThuc
                                    })}>
                                </VisibilityIcon>
                            </Button>
    
                            <ShowTuyenThangModal
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
                                nvnganhhoc={nvnganhhoc}
                                nvnoidaotao={nvnoidaotao}
                                nvxeploai={nvxeploai}
                                nvdantoc={nvdantoc}
                                nvdaotao={nvdaotao}
                                nvngaysinh={nvngaysinh}
                                nvquoctich={nvquoctich}
                                nvcv={nvcv}
                                //nvtrangthaiHdthuViec={nvtrangthaiHdthuViec}
                                //nvtrangthaiHdchinhThuc={nvtrangthaiHdchinhThuc}
                                nvpic={nvhinh}
                            />
                        </StyledTableCell>
                    </StyledTableRow>)
                }
            })
        })
    }

    render() {
        let addModalClose = () => this.setState({ addModalShow: false })
        return (
            <div>
                <div className="container text-center">
                    <h1 className="display-7">DANH SÁCH NHÂN VIÊN</h1><hr />
                </div>


                <Col sm={12}>
                    <Row>
                        <Col sm={8}>
                            <label>Chọn phòng ban: </label>
                            {this.getNVtoPB()}
                        </Col>
                        <Col sm={4}>
                            {/* <label htmlFor="contained-button-file"> */}
                                <Button variant="contained"
                                    color="primary"
                                    component="span"
                                    startIcon={<PersonAddIcon />}
                                    onClick={() => this.setState({ addModalShow: true })}>
                                    Tuyển thêm nhân viên
                                </Button>
                            {/* </label> */}
                            <AddTuyenThangModal
                                show={this.state.addModalShow}
                                onHide={addModalClose}
                            />
                        </Col>
                    </Row>
                </Col>


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
                                <StyledTableCell align="right">Chức năng</StyledTableCell>
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
