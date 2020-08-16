import React, { Component } from 'react'
import { Form, Col } from 'react-bootstrap'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, ButtonGroup, Button, Select, MenuItem } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GavelIcon from '@material-ui/icons/Gavel';

import { format, differenceInDays } from 'date-fns'

import { AddLapQuyetDinh } from '../LapQuyetDinh/AddLapQuyetDinh';
import { AddLapQuyetDinhKiLuat } from '../LapQuyetDinh/AddLapQuyetDinhKiLuat';


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

export class AppLapQuyetDinh extends Component {
    static displayName = AppLapQuyetDinh.name;

    constructor(props) {
        super(props);
        this.state = {
            hds: [],
            pbs: [],
            nhanviens: [],
            chonPB: '',
            addModalShow: false,
            addModalShow1: false,
            setOpen: false
            // editModalShow: false,
            // showModalShow: false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.loadNV()
        this.loadPB()
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

    // Đã ký hợp đồng
    // Vẫn còn đi làm
    getTableData() {
        const { hds, nhanviens, qdidnv, qdtennv, qdhodem, nvgioitinh, nvhinh,
            qdngayhieuluc, qdtienphat, qdten, qdsoqd, qdngayhethieuluc, qdnoidung } = this.state;
        let addModalClose1 = () => this.setState({ addModalShow1: false })
        let addModalClose = () => this.setState({ addModalShow: false })
        var DMY = format(new Date(), 'yyyy-MM-dd')
        return nhanviens.map(nv => {
            return hds.map(hd => {
                if (nv.username != "adminNS" && nv.username != "adminTC"
                    && nv.idphongBan == this.state.chonPB
                    //|| this.state.chonPB == '')
                    && nv.trangthaiHdchinhThuc != null
                    && (hd.idloaiHd == 2
                        && hd.idnhanVien == nv.idnhanVien
                        && (parseInt(differenceInDays(new Date(hd.ngayHetHan.substring(0, 10)), new Date(DMY))) > 0)
                        && hd.ghiChu == "Ký")
                ) {
                    return (
                        <StyledTableRow>
                            {/* <StyledTableCell>{key + 1}</StyledTableCell> */}
                            <StyledTableCell>{nv.hoDem}</StyledTableCell>
                            <StyledTableCell>{nv.ten}</StyledTableCell>
                            <StyledTableCell align="center">{nv.gioiTinh}</StyledTableCell>
                            <StyledTableCell align="center">{nv.soDienThoai}</StyledTableCell>
                            <StyledTableCell align="center">{nv.choOhienTai}</StyledTableCell>
                            <StyledTableCell align="right">

                                <Button
                                    variant="contained"
                                    color="primary"
                                    //component="span"
                                    startIcon={<CardGiftcardIcon />}
                                    onClick={() => this.setState({
                                        addModalShow: true,
                                        qdidnv: nv.idnhanVien,
                                        qdhodem: nv.hoDem,
                                        qdtennv: nv.ten,
                                        nvgioitinh: nv.gioiTinh,
                                        nvhinh: nv.hinhAnh
                                    })}
                                >Khen Thưởng
                                    </Button>

                                <Button
                                    className="ml-2"
                                    variant="contained"
                                    color="secondary"
                                    //component="span"
                                    startIcon={<GavelIcon />}
                                    onClick={() => this.setState({
                                        addModalShow1: true,
                                        qdidnv: nv.idnhanVien,
                                        qdhodem: nv.hoDem,
                                        qdtennv: nv.ten,
                                        nvgioitinh: nv.gioiTinh,
                                        nvhinh: nv.hinhAnh
                                    })}
                                > Kỉ Luật
                                    </Button>

                                <AddLapQuyetDinh
                                    show={this.state.addModalShow}
                                    onHide={addModalClose}
                                    qdidnv={qdidnv}
                                    qdhodem={qdhodem}
                                    qdtennv={qdtennv}
                                    nvgioitinh={nvgioitinh}
                                    nvpic={nvhinh}
                                />
                                <AddLapQuyetDinhKiLuat
                                    show={this.state.addModalShow1}
                                    onHide={addModalClose1}
                                    qdidnv={qdidnv}
                                    qdhodem={qdhodem}
                                    qdtennv={qdtennv}
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

        return (
            <div>
                <div className="container text-center">
                    <h1 className="display-7">LẬP QUYẾT ĐỊNH</h1>
                    <h5 className="display-7">KHEN THƯỞNG  -  KỶ LUẬT</h5><hr />
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
                                <StyledTableCell align="center">Địa Chỉ</StyledTableCell>
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