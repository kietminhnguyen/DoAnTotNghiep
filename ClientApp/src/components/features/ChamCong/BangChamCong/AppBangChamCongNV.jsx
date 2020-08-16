import React, { Component } from 'react';
import { Form, Row, Col } from 'react-bootstrap'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, ButtonGroup, Button, Select, MenuItem } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { format } from 'date-fns'


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

export class AppBangChamCongNV extends Component {
    //static displayName = AppBangChamCong.name;

    constructor(props) {
        super(props);
        this.state = {
            tkToken: [],
            nhanviens: [],
            chamcongs: [],
            pbs: [],

            idphongBan: '',
            ngayChamCong: '',

            editModalShow: false,
            snackbaropen: false,
            snackbarmsg: ''
        };
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.loadChamCong()
        this.loadNV()
        this.loadPB()
    }

    // componentDidUpdate() {
    //     this.loadChamCong()
    // }

    componentWillMount() {
        if (localStorage && localStorage.getItem('token')) {
            var tkToken = JSON.parse(localStorage.getItem('token'))
            this.setState({
                tkToken: tkToken
            })
        }
    }

    loadChamCong() {
        fetch('https://localhost:44390/api/chamcongs')
            .then(response => response.json())
            .then(data => {
                this.setState({ chamcongs: data });
            });
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

    deleteChamCong(idcc) {
        if (window.confirm('Bạn có chắc muốn xóa?')) {
            fetch('https://localhost:44390/api/chamcongs/' + idcc, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })

        }
    }

    handleChange = (event) => {
        const name = event.target.name;
        const values = event.target.value;
        this.setState({
            [name]: values
        })
        // this.setState({
        //     idphongBan: event.target.value
        // })
    }

    layTenNV = (idNVofCC) => {
        for (let i = 0; i < this.state.nhanviens.length; i++) {
            if (idNVofCC == this.state.nhanviens[i].idnhanVien) {
                idNVofCC = this.state.nhanviens[i].hoDem + " " + this.state.nhanviens[i].ten
            }
        }
        return idNVofCC
    }

    layTenPB = (idPBofNV) => {
        for (let i = 0; i < this.state.pbs.length; i++) {
            if (idPBofNV == this.state.pbs[i].idphongBan) {
                idPBofNV = this.state.pbs[i].tenPhongBan
            }
        }
        return idPBofNV
    }

    getNVtoPB = () => {
        // return <select className="ml-1 mt-2" value={this.state.idphongBan} name="idphongBan" onChange={this.handleChange}>
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

    checkToken(idnv) { // kiểm tra tk đăng nhập vào có trùng với idCC. Nếu trùng sẽ show thông tin về ... của nv đó
        let check = false;
        for (let j = 0; j < this.state.tkToken.length; j++) {
            if (this.state.tkToken[j].username == idnv) {
                return check = true
            }
        }
        return check = false
    }

    showTableData() {
        const { nhanviens, chamcongs } = this.state;
        return chamcongs.map(cc => {
            return nhanviens.map(nv => {
                if (cc.idnhanVien == nv.idnhanVien && this.checkToken(nv.idnhanVien) // tra cứu bằng tk nv
                    && ((cc.ngayChamCong.substring(0, 10) == this.state.ngayChamCong)
                        && (nv.idphongBan == this.state.idphongBan || this.state.idphongBan == ''))
                ) {
                    return (
                        <StyledTableRow>
                            {/* <StyledTableCell>{key + 1}</StyledTableCell> */}
                            <StyledTableCell align="center">{this.layTenNV(cc.idnhanVien)}</StyledTableCell>
                            {/* <StyledTableCell>{cc.idnhanVien}</StyledTableCell> */}
                            <StyledTableCell align="center">{this.layTenPB(nv.idphongBan)}</StyledTableCell>
                            <StyledTableCell align="center">{format(new Date(cc.ngayChamCong), 'dd-MM-yyyy')}</StyledTableCell>
                            <StyledTableCell align="center">{cc.gioVao.substring(0, 5)}</StyledTableCell>
                            <StyledTableCell align="center">{cc.gioRa.substring(0, 5)}</StyledTableCell>
                            <StyledTableCell align="center">{cc.soGioLam}</StyledTableCell>

                        </StyledTableRow>)
                }

            })
        })
    }


    render() {
        //console.log(this.state)
        return (

            <div>
                <div className="container text-center">
                    <h1 className="display-7">TRA CỨU NGÀY CÔNG</h1><hr />
                </div>
                <Form>
                    <Row >
                        <Form.Label className="mt-2 ml-4">Chọn phòng ban:</Form.Label>
                        <Col sm={3} className="ml-2">
                            <Form.Group controlId="idphongBan" >
                                {this.getNVtoPB()}
                            </Form.Group>
                        </Col>

                        <Form.Label className="mt-2 ml-5">Chọn ngày:</Form.Label>
                        <Col sm={3}>
                            <Form.Group controlId="ngayChamCong">
                                <Form.Control
                                    type="date"
                                    name="ngayChamCong"
                                    required
                                    onChange={(event) => this.handleChange(event)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>

                <TableContainer>
                    <StyledTable className="mt-3">
                        <TableHead>
                            <StyledTableRow>
                                {/* <StyledTableCell>#</StyledTableCell> */}
                                <StyledTableCell align="center">Tên nhân viên</StyledTableCell>
                                {/* <StyledTableCell>ID Nhân Viên</StyledTableCell> */}
                                <StyledTableCell align="center">Thuộc phòng ban</StyledTableCell>
                                <StyledTableCell align="center">Ngày chấm công</StyledTableCell>
                                <StyledTableCell align="center">Giờ vào</StyledTableCell>
                                <StyledTableCell align="center">Giờ ra</StyledTableCell>
                                <StyledTableCell align="center">Số giờ làm</StyledTableCell>
                                {/* <StyledTableCell align="center">Chức năng</StyledTableCell> */}

                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {/* {this.locNgayChamCong()} */}
                            {this.showTableData()}
                        </TableBody>
                    </StyledTable>
                </TableContainer>
            </div>
        )
    }
}