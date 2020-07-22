import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, ButtonGroup, Button, Select, MenuItem } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import VisibilityIcon from '@material-ui/icons/Visibility';

import { format, differenceInDays } from 'date-fns'

//import { ShowXemHDThuViecModal } from './ShowXemHDThuViecModal'


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

export class AppXemHDChinhThuc extends Component {
    //static displayName = AppPhongBan.name;

    constructor(props) {
        super(props);
            this.state = {  
            pbs: [],
            hds: [],
            nvs: [],
            chonPB: '',
            // addModalShow: false,
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

    loadHD() {
        fetch('https://localhost:44390/api/hopdongs')
            .then(respone => respone.json())
            .then(data => {
                this.setState({ hds: data })
            })
    }

    loadNV() {
        fetch('https://localhost:44390/api/nhanviens')
            .then(response => response.json())
            .then(data => {
                this.setState({ nvs: data });
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

    layTenNV = (idNVofHD) => {
        for (let i = 0; i < this.state.nvs.length; i++) {
            if (idNVofHD == this.state.nvs[i].idnhanVien) {
                idNVofHD = this.state.nvs[i].hoDem + " " + this.state.nvs[i].ten
            }
        }
        return idNVofHD
    }

    showTableDate = () => {

        const { hds, hdid, hdky, hdbatdau, hdketthuc, nvs, nvpb, nvcv, nvid, nvho, nvten, nvgioitinh, nvsdt, nvmail,
            nvtrangthaiHdthuViec, nvtinhtranghonnhan, nvngaysinh, nvnoisinh, nvdcthuongtru,
            nvchohientai, nvsocmnd, nvngaycap, nvnoicap, nvtongiao, nvquoctich, nvnganhhoc,
            nvnoidaotao, nvxeploai, nvdantoc, nvdaotao } = this.state
        //let addModalClose = () => this.setState({ addModalShow: false })
        //let editModalClose = () => this.setState({ editModalShow: false })
        //let showModalClose = () => this.setState({ showModalShow: false })
        // var date = new Date()
        // var ngay = date.getDate()
        // var thang = date.getMonth()+1
        // var nam = date.getFullYear()
        // var hientai = nam  + "-" + thang  + "-" + ngay

        var DMY = format(new Date(), 'yyyy-MM-dd')
        //console.log(DMY)
        //console.log(differenceInDays(new Date('2020-07-14'), new Date(DMY) ) )
       
        
        return hds.map((hd, key) => {
            return nvs.map(nv =>{
                if (hd.idloaiHd == 2
                    && hd.idnhanVien == nv.idnhanVien
                    && (nv.idphongBan == this.state.chonPB || this.state.chonPB == '')
                    && ( parseInt( differenceInDays(new Date(hd.ngayHetHan.substring(0,10)), new Date(DMY)) ) <0) 
                    ) {
                    return (
                        <StyledTableRow key={hd.idhopDong}>
                            <StyledTableCell>{key + 1}</StyledTableCell>
                            <StyledTableCell>{this.layTenNV(hd.idnhanVien)}</StyledTableCell>
                            <StyledTableCell>{format(new Date(hd.ngayLapHd),'dd-MM-yyyy')}</StyledTableCell>
                            <StyledTableCell>{format(new Date(hd.ngayBatDau),'dd-MM-yyyy')}</StyledTableCell>
                            <StyledTableCell>{format(new Date(hd.ngayHetHan),'dd-MM-yyyy')}</StyledTableCell>
                            <StyledTableCell >Đã hết hạn</StyledTableCell>
                        </StyledTableRow>)}
                else if(hd.idloaiHd == 2 
                    && hd.idnhanVien == nv.idnhanVien
                    && (nv.idphongBan == this.state.chonPB || this.state.chonPB == '')
                    && (parseInt( differenceInDays(new Date(hd.ngayHetHan.substring(0,10)), new Date(DMY) )) >0) 
                    ){
                    return (
                        <StyledTableRow key={hd.idhopDong}>
                            <StyledTableCell>{key + 1}</StyledTableCell>
                            <StyledTableCell>{this.layTenNV(hd.idnhanVien)}</StyledTableCell>
                            <StyledTableCell>{format(new Date(hd.ngayLapHd),'dd-MM-yyyy')}</StyledTableCell>
                            <StyledTableCell>{format(new Date(hd.ngayBatDau),'dd-MM-yyyy')}</StyledTableCell>
                            <StyledTableCell>{format(new Date(hd.ngayHetHan),'dd-MM-yyyy')}</StyledTableCell>
                            <StyledTableCell>Còn lại {differenceInDays(new Date(hd.ngayHetHan.substring(0,10)),new Date(DMY) )} ngày</StyledTableCell>
                        </StyledTableRow>)
                }
            })
        })
    }

    render() {
        return (
            <div>
                <div className="container text-center">
                    <h2 className="display-7">DANH SÁCH HỢP ĐỒNG CHÍNH THỨC</h2><hr/>
                </div>

                <Form.Label>Chọn phòng ban: </Form.Label>
                {this.selectPB()}

                <TableContainer>
                <StyledTable className="mt-3">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>#</StyledTableCell>
                            <StyledTableCell>Họ tên nhân viên</StyledTableCell>
                            <StyledTableCell>Ngày ký hợp đồng</StyledTableCell>
                            <StyledTableCell>Ngày bắt đầu</StyledTableCell>
                            <StyledTableCell>Ngày kết thúc</StyledTableCell>
                            <StyledTableCell>Hạn hợp đồng</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {this.showTableDate()}
                    </TableBody>
                </StyledTable>
                </TableContainer>
            </div>
        )
    }
}
