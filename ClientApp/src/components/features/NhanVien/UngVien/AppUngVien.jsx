import React, { Component } from 'react'

import axios from 'axios';
import { Row, Col } from 'react-bootstrap'
import {TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, RadioGroup, FormControlLabel, Radio} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import VisibilityIcon from '@material-ui/icons/Visibility';
import SchoolIcon from '@material-ui/icons/School';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
//import PrintIcon from '@material-ui/icons/Print';
import { format } from 'date-fns';

import { AddUngVienModal } from './AddUngVienModal'
import { EditUngVienModal } from './EditUngVienModal'
import { ShowUngVienModal } from './ShowUngVienModal'
import { AddBoNhiemModal } from './AddBoNhiemModal'

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
            qdbns: [],
            ungviens: [],
            //nhanviens: [],
            chon: "Chưa",

            addModalBoNhiemShow: false,
            addModalShow: false,
            editModalShow: false,
            showModalShow: false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.loadUV();
        this.loadQDBN()
        //this.loadNV()
    }

    componentDidUpdate() {
        //this.loadUV();
        //this.loadQDBN()
    }

    loadUV() {
        fetch('https://localhost:44390/api/ungviens')
            .then(response => response.json())
            .then(data => {
                this.setState({ ungviens: data });
            });
    }

    // loadNV() {
    //     fetch('https://localhost:44390/api/nhanviens')
    //         .then(response => response.json())
    //         .then(data => {
    //             this.setState({ nhanviens: data });
    //         });
    // }

    loadQDBN() {
        fetch('https://localhost:44390/api/quyetdinhbonhiems')
            .then(response => response.json())
            .then(data => {
                this.setState({ qdbns: data });
            });
    }

    handleChange(event) {
        this.setState({
            chon: event.target.value
        })
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

    suaChoToChua(iduv) {
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
    }

    xoaQDBN(idbn) {
        var flag = false
        for (let i = 0; i < this.state.qdbns.length; i++) {
            for (let j = 0; j < this.state.ungviens.length; j++) {
                if (this.state.qdbns[i].idungVien == this.state.ungviens[j].idungVien) {
                    flag = true
                }
            }
        }
        if (flag == true) {
            fetch('https://localhost:44390/api/quyetdinhbonhiems/' + idbn, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    xoaUvChoDuyet(iduv, idbn) {
        if (window.confirm('Bạn có chắc muốn xóa kiến nghị này?')) {
            this.suaChoToChua(iduv)
            this.xoaQDBN(idbn)
            alert("Thành công")
        }

    }

    // Chưa: (TrangThai: chưa) những uv vừa mới thêm vào. Có thể xóa hoàn toàn. 4 nút 
    //  + Click "Bổ nhiệm": sẽ thêm QDBN. Đưa qua "Bổ nhiệm nhân sự"

    // Chờ: (TrangThai: chờ) Đc đẩy xuống từ "Chưa". 2 nút xóa & xem
    // + Click "Xóa": là xóa QDBN  khi chưa đc duyệt và sửa TrangThai: chờ => đẩy lên "Chờ"

    // Duyệt: (TrangThai: duyệt) Khi "Bổ nhiệm nhân sự Xác Nhận". 1 nút Xem
    getTableData() {
        const { qdbns, ungviens, uvid, uvho, uvten, uvgioitinh, uvsdt, uvhinh,
            uvmail, uvtinhtranghonnhan, uvngaysinh, uvnoisinh, uvdcthuongtru,
            uvchohientai, uvsocmnd, uvngaycap, uvnoicap, uvtongiao, uvquoctich,
            uvnganhhoc, uvnoidaotao, uvxeploai, uvdantoc, uvdaotao } = this.state

        let editModalClose = () => this.setState({ editModalShow: false })
        let showModalClose = () => this.setState({ showModalShow: false })
        let addModalBoNhiemClose = () => this.setState({ addModalBoNhiemShow: false })
        return ungviens.map(uv => {
            if (uv.noiDaoTao == this.state.chon
                && this.state.chon == "Chưa"
            ) {
                return (
                    <StyledTableRow>
                        {/* <StyledTableCell>{key + 1}</StyledTableCell> */}
                        <StyledTableCell>{uv.hoDem}</StyledTableCell>
                        <StyledTableCell >{uv.ten}</StyledTableCell>
                        <StyledTableCell align="center">{uv.gioiTinh}</StyledTableCell>
                        <StyledTableCell align="center">{format(new Date(uv.ngaySinh), 'dd-MM-yyyy')}</StyledTableCell>
                        <StyledTableCell align="center">{uv.soDienThoai}</StyledTableCell>

                        <StyledTableCell align="right">

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
                                        uvhinh: uv.hinhAnh,
                                    })}>
                                </EditIcon>
                            </Button>

                            <Button>
                                <DeleteIcon color="secondary"
                                    onClick={() => this.deleteNhanVien(uv.idungVien)}
                                ></DeleteIcon>
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
                                        uvhinh: uv.hinhAnh,
                                    })}>
                                </VisibilityIcon>
                            </Button>

                            <Button variant="contained"
                                color="primary"
                                startIcon={<SchoolIcon />}
                                onClick={() => this.setState({
                                    addModalBoNhiemShow: true,
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
                                    //uvnganhhoc: uv.nganhHoc,
                                    uvnoidaotao: uv.noiDaoTao,
                                    //uvxeploai: uv.xepLoai,
                                    uvdantoc: uv.iddanToc,
                                    uvdaotao: uv.idtrinhDo,
                                    uvquoctich: uv.quocTich,
                                    uvhinh: uv.hinhAnh,
                                })}
                            >Bổ nhiệm</Button>

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
                                //uvnganhhoc={uvnganhhoc}
                                uvnoidaotao={uvnoidaotao}
                                //uvxeploai={uvxeploai}
                                uvdantoc={uvdantoc}
                                uvdaotao={uvdaotao}
                                uvngaysinh={uvngaysinh}
                                uvquoctich={uvquoctich}
                                uvpic={uvhinh}
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
                                //uvnganhhoc={uvnganhhoc}
                                uvnoidaotao={uvnoidaotao}
                                //uvxeploai={uvxeploai}
                                uvdantoc={uvdantoc}
                                uvdaotao={uvdaotao}
                                uvngaysinh={uvngaysinh}
                                uvquoctich={uvquoctich}
                                uvpic={uvhinh}
                            />
                            <AddBoNhiemModal
                                show={this.state.addModalBoNhiemShow}
                                onHide={addModalBoNhiemClose}
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
                                //uvnganhhoc={uvnganhhoc}
                                uvnoidaotao={uvnoidaotao}
                                //uvxeploai={uvxeploai}
                                uvdantoc={uvdantoc}
                                uvdaotao={uvdaotao}
                                uvngaysinh={uvngaysinh}
                                uvquoctich={uvquoctich}
                                uvpic={uvhinh}
                            />

                        </StyledTableCell>

                    </StyledTableRow>)
            }
            else {//////
                return qdbns.map(bn => {
                    if (uv.idungVien == bn.idungVien
                        && uv.noiDaoTao == this.state.chon
                        && this.state.chon == "Chờ"
                    ) {
                        return (
                            <StyledTableRow >
                                {/* <StyledTableCell>{key + 1}</StyledTableCell> */}
                                <StyledTableCell>{uv.hoDem}</StyledTableCell>
                                <StyledTableCell>{uv.ten}</StyledTableCell>
                                <StyledTableCell align="center">{uv.gioiTinh}</StyledTableCell>
                                <StyledTableCell align="center">{format(new Date(uv.ngaySinh), 'dd-MM-yyyy')}</StyledTableCell>
                                <StyledTableCell align="center">{uv.soDienThoai}</StyledTableCell>

                                <StyledTableCell align="center">
                                    <Button>
                                        <DeleteIcon color="secondary"
                                            onClick={() => this.xoaUvChoDuyet(uv.idungVien, bn.idquyetDinhBn)}
                                        ></DeleteIcon>
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
                                                uvhinh: uv.hinhAnh,
                                            })}>
                                        </VisibilityIcon>
                                    </Button>

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
                                        uvpic={uvhinh}
                                    />

                                </StyledTableCell>
                            </StyledTableRow>)

                    }
                    else {  /////

                        if (uv.idungVien == bn.idungVien
                            && uv.noiDaoTao == this.state.chon
                            && this.state.chon == "Duyệt"
                        ) {
                            return (
                                <StyledTableRow >
                                    {/* <StyledTableCell>{key + 1}</StyledTableCell> */}
                                    <StyledTableCell>{uv.hoDem}</StyledTableCell>
                                    <StyledTableCell>{uv.ten}</StyledTableCell>
                                    <StyledTableCell align="center">{uv.gioiTinh}</StyledTableCell>
                                    <StyledTableCell align="center">{format(new Date(uv.ngaySinh), 'dd-MM-yyyy')}</StyledTableCell>
                                    <StyledTableCell align="center">{uv.soDienThoai}</StyledTableCell>

                                    <StyledTableCell align="center">

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
                                            uvpic={uvhinh}
                                        />

                                    </StyledTableCell>
                                </StyledTableRow>)

                        }
                    }
                })

            }
        })
    }

    render() {

        let addModalClose = () => this.setState({ addModalShow: false })

        return (
            <div>
                <div className="container text-center">
                    <h1 className="display-7">QUẢN LÝ ỨNG VIÊN</h1><hr />
                </div>
                <Col sm={12}>
                    <Row>
                        <Col sm={9}>
                            <label>Xem danh sách ứng viên </label>
                            <RadioGroup
                                name="gender1"
                                value={this.state.chon}
                                onChange={this.handleChange}
                            >
                                <FormControlLabel value="Chưa" control={<Radio />} label="Chưa bổ nhiệm" />
                                <FormControlLabel value="Chờ" control={<Radio />} label="Đang chờ phê duyệt" />
                                <FormControlLabel value="Duyệt" control={<Radio />} label="Đã duyệt kiến nghị" />
                            </RadioGroup>
                        </Col>
                        <Col sm={3}>
                            <Button variant="contained"
                                color="primary"
                                component="span"
                                startIcon={<PersonAddIcon />}
                                onClick={() => this.setState({ addModalShow: true })}
                            >Thêm ứng viên
                            </Button>
                        </Col>
                    </Row>

                    <AddUngVienModal
                        show={this.state.addModalShow}
                        onHide={addModalClose}
                    />
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
