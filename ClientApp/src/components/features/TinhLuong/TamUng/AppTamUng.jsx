import React, { Component } from 'react'
import { Form, } from 'react-bootstrap'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, ButtonGroup, Button, Select, MenuItem } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import LocalAtmIcon from '@material-ui/icons/LocalAtm';

import { format, differenceInDays, getMonth } from 'date-fns'

import { AddTamUng } from '../TamUng/AddTamUng';

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

export class AppTamUng extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hds: [],
            pbs: [],
            nhanviens: [],
            tamungluongs: [],
            idphongBan: "",

            addModalShow: false,
            addModalShowTangCa: false,
            // showModalShow: false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.loadNV()
        this.loadHD()
        this.loadPB()
        this.loadTU()
    }
    componentDidUpdate() {
        this.loadTU()
    }

    loadNV() {
        fetch('https://localhost:44390/api/nhanviens')
            .then(response => response.json())
            .then(data => {
                this.setState({ nhanviens: data });
            });
    }

    loadHD() {
        fetch('https://localhost:44390/api/hopdongs')
            .then(respone => respone.json())
            .then(data => {
                this.setState({ hds: data })
            })
    }

    loadPB() {
        fetch('https://localhost:44390/api/phongbans')
            .then(respone => respone.json())
            .then(data => {
                this.setState({ pbs: data })
            })
    }

    loadTU() {
        fetch('https://localhost:44390/api/tamungluongs')
            .then(respone => respone.json())
            .then(data => {
                this.setState({ tamungluongs: data })
            })
    }

    handleChange = (event) => {
        const name = event.target.name;
        const values = event.target.value;
        this.setState({
            [name]: values
        })
    }

    getNVtoPB = () => {
        return <Select className="ml-1 mt-2"
            name="idphongBan"
            value={this.state.idphongBan}
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

    checkTongTienUng(idnvTamUng) {
        let tongTien = 0;
        let layThangHienTai = getMonth(new Date()) + 1
        for (let i = 0; i < this.state.tamungluongs.length; i++) {
            if (idnvTamUng == parseInt(this.state.tamungluongs[i].idnhanVien)
                && layThangHienTai == parseInt(this.state.tamungluongs[i].ngayTamUng.substring(5, 7))
            ) {
                tongTien = tongTien + this.state.tamungluongs[i].soTienTamUng
            }
        }
        return tongTien
    }

    layTenNV = (idNVofNV) => {
        for (let i = 0; i < this.state.nhanviens.length; i++) {
            if (idNVofNV == this.state.nhanviens[i].idnhanVien) {
                idNVofNV = this.state.nhanviens[i].hoDem + " " + this.state.nhanviens[i].ten
            }
        }
        return idNVofNV
    }

    showTableData() {
        const { hds, nhanviens, idnv, cchodem, ccten, nvgioitinh, nvhinh } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false })
        //let addModalCloseTangCa = () => this.setState({ addModalShowTangCa: false })

        var DMY = format(new Date(), 'yyyy-MM-dd')
        const formatter = new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        })

        return nhanviens.map(nv => {
            return hds.map(hd => {
                if (nv.idnhanVien == hd.idnhanVien
                    && nv.trangthaiHdchinhThuc == 'Đã ký' //kt có phải là nv chính thức
                    && differenceInDays(new Date(hd.ngayHetHan), new Date(DMY)) > 30 //kt hd chính thức còn hạn
                    && (nv.idphongBan == this.state.idphongBan || this.state.idphongBan == "")
                    && nv.username != "adminNS" && nv.username != "adminTC"
                ) {
                    return (
                        <StyledTableRow>
                            {/* <StyledTableCell>{key + 1}</StyledTableCell> */}
                            <StyledTableCell>{this.layTenNV(nv.idnhanVien)}</StyledTableCell>
                            <StyledTableCell align="center">{nv.gioiTinh}</StyledTableCell>
                            <StyledTableCell align="center">{nv.soDienThoai}</StyledTableCell>
                            <StyledTableCell align="center">{this.layTenPB(nv.idphongBan)}</StyledTableCell>
                            <StyledTableCell align="center">Còn {differenceInDays(new Date(hd.ngayHetHan), new Date(DMY))} ngày</StyledTableCell>
                            {/* <StyledTableCell>{this.checkTongTienUng(nv.idnhanVien)}</StyledTableCell> */}
                            <StyledTableCell align="center">{formatter.format(this.checkTongTienUng(nv.idnhanVien))}</StyledTableCell>

                            <StyledTableCell>
                            
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<LocalAtmIcon />}
                                    onClick={() => this.setState({
                                        addModalShow: true,
                                        idnv: nv.idnhanVien,
                                        cchodem: nv.hoDem,
                                        ccten: nv.ten,
                                        nvgioitinh: nv.gioiTinh,
                                        nvhinh: nv.hinhAnh
                                    })}>Tạm ứng
                                </Button>

                                    <AddTamUng
                                    show={this.state.addModalShow}
                                    onHide={addModalClose}
                                    idnv={idnv}
                                    cchodem={cchodem}
                                    ccten={ccten}
                                    nvgioitinh={nvgioitinh}
                                    nvpic={nvhinh}
                                />

                            </StyledTableCell>
                        </StyledTableRow>)
                }
            })
        })
    }

    render() {
        // console.log(getMonth(new Date(2020,7,14)))
        return (
            <div>
                <div className="container text-center">
                    <h2 className="display-7">TẠM ỨNG LƯƠNG</h2><hr />
                </div>

                <Form.Label>Chọn phòng ban: </Form.Label>
                {this.getNVtoPB()}

                <TableContainer>
                <StyledTable className="mt-3">
                    <TableHead>
                        <StyledTableRow>
                            {/* <StyledTableCell>#</StyledTableCell> */}
                            <StyledTableCell>Họ Tên</StyledTableCell>
                            <StyledTableCell>Giới tính</StyledTableCell>
                            <StyledTableCell>Số điện thoại</StyledTableCell>
                            <StyledTableCell>Thuộc phòng ban</StyledTableCell>
                            <StyledTableCell>Hạn hợp đồng</StyledTableCell>
                            <StyledTableCell>Tháng này đã ứng</StyledTableCell>
                            <StyledTableCell align="center">Chức năng</StyledTableCell>
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