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
        this.refreshLish()
        this.loadPB()
        this.loadHD()
    }

    refreshLish() {
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

    getTableData() {
        const { hds, nhanviens, qdid, qdidnv, qdngyathanhlap, qdtienthuong, qdnguoiky, qdsoqd, qdhodem,
            qdngayhieuluc, qdtienphat, qdten, qdtennv, qdngayhethieuluc, qdnoidung, qdghichu } = this.state;
        let addModalClose1 = () => this.setState({ addModalShow1: false })
        let addModalClose = () => this.setState({ addModalShow: false })
        var DMY = format(new Date(), 'yyyy-MM-dd')
        return nhanviens.map((nv, key) => {
            return hds.map(hd => {
                if ((nv.idphongBan == this.state.chonPB || this.state.chonPB == '')
                    && nv.trangthaiHdchinhThuc != null
                    && (hd.idloaiHd == 2
                        && hd.idnhanVien == nv.idnhanVien
                        && (parseInt(differenceInDays(new Date(hd.ngayHetHan.substring(0, 10)), new Date(DMY))) > 0))
                ) {
                    return (
                        <StyledTableRow key={nv.idnhanVien}>
                            <StyledTableCell>{key + 1}</StyledTableCell>
                            <StyledTableCell>{nv.hoDem}</StyledTableCell>
                            <StyledTableCell>{nv.ten}</StyledTableCell>
                            <StyledTableCell>{nv.gioiTinh}</StyledTableCell>
                            <StyledTableCell>{nv.soDienThoai}</StyledTableCell>
                            <StyledTableCell>{nv.choOhienTai}</StyledTableCell>
                            <StyledTableCell >
                                <ButtonGroup variant="outlined">
                                    <Col sm={6}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            component="span"
                                            startIcon={<CardGiftcardIcon />}
                                            onClick={() => this.setState({
                                                addModalShow: true,
                                                qdidnv: nv.idnhanVien,
                                                qdhodem: nv.hoDem,
                                                qdtennv: nv.ten,
                                            })}
                                        >Khen Thưởng
                                    </Button>
                                    </Col>

                                    <Col sm={5}>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            component="span"
                                            startIcon={<GavelIcon />}
                                            onClick={() => this.setState({
                                                addModalShow1: true,
                                                qdidnv: nv.idnhanVien,
                                                qdhodem: nv.hoDem,
                                                qdtennv: nv.ten,
                                            })}
                                        > Kỉ Luật
                                    </Button>
                                    </Col>

                                    <AddLapQuyetDinh
                                        show={this.state.addModalShow}
                                        onHide={addModalClose}
                                        qdidnv={qdidnv}
                                        qdhodem={qdhodem}
                                        qdtennv={qdtennv}
                                    />
                                    <AddLapQuyetDinhKiLuat
                                        show={this.state.addModalShow1}
                                        onHide={addModalClose1}
                                        qdidnv={qdidnv}
                                        qdhodem={qdhodem}
                                        qdtennv={qdtennv}
                                    />

                                </ButtonGroup>
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
                    <h1 className="display-7">LẬP QUYẾT ĐỊNH</h1><hr />
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
                                <StyledTableCell>Địa Chỉ</StyledTableCell>
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