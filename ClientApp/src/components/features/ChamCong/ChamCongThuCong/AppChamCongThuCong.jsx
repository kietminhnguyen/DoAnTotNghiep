import React, { Component } from 'react'

import { Form, Row, Col } from 'react-bootstrap'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, ButtonGroup, Button, Select, MenuItem } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AddAlarmIcon from '@material-ui/icons/AddAlarm';
import { format, differenceInDays } from 'date-fns'

import { AddChamCongThuCong } from '../ChamCongThuCong/AddChamCongThuCong';
import { AddChamCongTangCa } from '../ChamCongThuCong/AddChamCongTangCa';


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
        minWidth: 1200,
        //border:true
    },
}))(Table);

export class AppChamCongThuCong extends Component {
    static displayName = AppChamCongThuCong.name;

    constructor(props) {
        super(props);
        this.state = {
            hds: [],
            pbs: [],
            nhanviens: [],
            chonPB: '',

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

    handleChange = (event) => {
        // const name = event.target.name;
        // const values = event.target.value;
        // this.setState({
        //     [name]: values
        // })

        this.setState({
            chonPB: event.target.value
        })
        // console.log(name)
        // console.log(values)
    }

    getNVtoPB = () => {
        // return <select className="ml-1 mt-2" value={this.state.idphongBan} name="idphongBan" onChange={(event)=>this.handleChange(event)}>
        //     {
        //         this.state.pbs.map(pb => {
        //             return (
        //                 <option value={pb.idphongBan}>
        //                     {pb.tenPhongBan}
        //                 </option>
        //             )
        //         })}
        // </select>
        return <Select className="ml-3"
            //open={open}
            //onClose={this.handleCloseSelect}
            //onOpen={this.handleOpenSelect}
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

    showTableData() {
        const { hds, nhanviens, idnv, cchodem, ccten } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false })
        let addModalCloseTangCa = () => this.setState({ addModalShowTangCa: false })

        // var date = new Date()
        // var ngay = date.getDate()
        // var thang = date.getMonth() + 1
        // var nam = date.getFullYear()
        // var hientai = nam + "-" + thang + "-" + ngay
        var DMY = format(new Date(), 'yyyy-MM-dd')

        return nhanviens.map((nv, key) => {
            return hds.map(hd => {
                if (nv.idnhanVien == hd.idnhanVien
                    && nv.trangthaiHdchinhThuc != null
                    && differenceInDays(new Date(hd.ngayHetHan), new Date(DMY)) >= 0
                    && (nv.idphongBan == this.state.chonPB || this.state.chonPB == '')
                ) {
                    return (
                        <StyledTableRow key={nv.idnhanVien}>
                            <StyledTableCell>{key + 1}</StyledTableCell>
                            <StyledTableCell>{nv.hoDem}</StyledTableCell>
                            <StyledTableCell>{nv.ten}</StyledTableCell>
                            <StyledTableCell align="center">{nv.gioiTinh}</StyledTableCell>
                            <StyledTableCell align="center">{nv.soDienThoai}</StyledTableCell>
                            <StyledTableCell align="center">{this.layTenPB(nv.idphongBan)}</StyledTableCell>
                            <StyledTableCell >Còn lại {differenceInDays(new Date(hd.ngayHetHan), new Date(DMY))} ngày</StyledTableCell>
                            <StyledTableCell>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    component="span"
                                    startIcon={<EventAvailableIcon />}
                                    onClick={() => this.setState({
                                        addModalShow: true,
                                        idnv: nv.idnhanVien,
                                        cchodem: nv.hoDem,
                                        ccten: nv.ten,
                                    })}>Chấm Công
                                    </Button>

                                <Button
                                    className="ml-2"
                                    variant="contained"
                                    color="secondary"
                                    component="span"
                                    startIcon={<AddAlarmIcon />}
                                    onClick={() => this.setState({
                                        addModalShowTangCa: true,
                                        idnv: nv.idnhanVien,
                                        cchodem: nv.hoDem,
                                        ccten: nv.ten,
                                    })}>Tăng Ca
                                    </Button>

                                <AddChamCongThuCong
                                    show={this.state.addModalShow}
                                    onHide={addModalClose}
                                    idnv={idnv}
                                    cchodem={cchodem}
                                    ccten={ccten}
                                />

                                <AddChamCongTangCa
                                    show={this.state.addModalShowTangCa}
                                    onHide={addModalCloseTangCa}
                                    idnv={idnv}
                                    cchodem={cchodem}
                                    ccten={ccten}
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
                    <h2 className="display-7">CHẤM CÔNG BỔ SUNG</h2><hr />
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
                                <StyledTableCell align="center">Giới tính</StyledTableCell>
                                <StyledTableCell align="center">Số điện thoại</StyledTableCell>
                                <StyledTableCell align="center">Thuộc phòng ban</StyledTableCell>
                                <StyledTableCell>Hạn hợp đồng</StyledTableCell>
                                <StyledTableCell>Chức năng</StyledTableCell>
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