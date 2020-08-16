import React, { Component } from 'react';
//import { Row, Col } from 'react-bootstrap'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, ButtonGroup, Button } from '@material-ui/core'
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import { withStyles } from '@material-ui/core/styles'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import { AddPhongbanModal } from './AddPhongbanModal';
import { EditPhongbanModal } from './EditPhongbanModal';

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


export class AppPhongBan extends Component {
    //static displayName = AppPhongBan.name;


    constructor(props) {
        super(props);
        this.state = {
            phongbans: [],
            nhanviens: [],
            addModalShow: false,
            editModalShow: false
        }
    }

    componentDidMount() {
        this.loadPB();
        this.loadNV()
    }

    loadPB() {
        fetch('https://localhost:44390/api/phongbans')
            .then(response => response.json())
            .then(data => {
                this.setState({ phongbans: data });
            });
    }

    loadNV() {
        fetch('https://localhost:44390/api/nhanviens')
            .then(response => response.json())
            .then(data => {
                this.setState({ nhanviens: data });
            });
    }

    componentDidUpdate() {
        this.loadPB();
    }

    deletePhongBan = (idpb) => {
        let co = false
        for (let i = 0; i < this.state.nhanviens.length; i++) {
            if (idpb == this.state.nhanviens[i].idphongBan) {
                co = true
            }
        }
        if (co) {
            alert('Không thể xóa vì còn nhân viên trong phòng ban này')
        }
        else {
            if (window.confirm('Bạn có chắc muốn xóa phòng ban này')) {
                fetch('https://localhost:44390/api/phongbans/' + idpb, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
            }
        }
    }

    layTenTruongPhong = (id) => {
        for (let i = 0; i < this.state.nhanviens.length; i++) {
            if (id == this.state.nhanviens[i].idnhanVien
            ) {
                id = this.state.nhanviens[i].hoDem + " " + this.state.nhanviens[i].ten
            }
        }
        return id
    }

    render() {

        const { phongbans, pbid, pbname, pbtruong, pbmota } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return (
            <div>
                <div className="container text-center">
                    <h1 className="display-7">QUẢN LÝ PHÒNG BAN</h1><hr />
                </div>

                <Button variant="contained"
                    color="primary"
                    //component="span"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={() => this.setState({ addModalShow: true })}>
                    Thêm phòng ban
                </Button>

                <AddPhongbanModal
                    show={this.state.addModalShow}
                    onHide={addModalClose}
                />

                {/* <ButtonToolbar>
                    <Button variant="primary" onClick={() => this.setState({ addModalShow: true })}
                    >Thêm Mới</Button>
                </ButtonToolbar> */}

                <TableContainer>
                    <StyledTable className="mt-3">
                        <TableHead>
                            <StyledTableRow>
                                {/* <StyledTableCell>#</StyledTableCell> */}
                                <StyledTableCell align="center">Tên Phòng Ban</StyledTableCell>
                                {/* <StyledTableCell align="center">Trưởng phòng</StyledTableCell> */}
                                <StyledTableCell align="center">Mô tả</StyledTableCell>
                                <StyledTableCell align="center">Chức năng</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {phongbans.map(phongban =>
                                <StyledTableRow>
                                    {/* <td>{key + 1}</td> */}
                                    <StyledTableCell align="center">{phongban.tenPhongBan}</StyledTableCell>
                                    {/* <StyledTableCell align="center">{phongban.tenTruongPhong}</StyledTableCell> */}
                                    <StyledTableCell align="center">{phongban.moTa}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <ButtonGroup variant="text">

                                            <Button>
                                                <EditIcon color="primary"
                                                    onClick={() => this.setState({
                                                        editModalShow: true,
                                                        pbid: phongban.idphongBan,
                                                        pbname: phongban.tenPhongBan,
                                                        pbtruong: phongban.tenTruongPhong,
                                                        pbmota: phongban.moTa
                                                    })}
                                                ></EditIcon>
                                            </Button>

                                            <Button>
                                                <DeleteIcon color="secondary"
                                                    onClick={() => this.deletePhongBan(phongban.idphongBan)}
                                                ></DeleteIcon>
                                            </Button>
                                            {/* <Button className="mr-2" variant="warning"
                                                onClick={() => this.setState({
                                                    editModalShow: true,
                                                    pbid: phongban.idphongBan,
                                                    pbname: phongban.tenPhongBan,
                                                    pbtruong: phongban.tenTruongPhong,
                                                    pbmota: phongban.moTa
                                                })}
                                            ><i className="ik ik-edit-2" />
                                            Sửa </Button> */}
                                            {/* <Button className="mr-2" variant="danger"
                                                onClick={() => this.deletePhongBan(phongban.idphongBan)}
                                            ><i className="ik ik-trash-2" />
                                            Xóa</Button> */}

                                            <EditPhongbanModal
                                                show={this.state.editModalShow}
                                                onHide={editModalClose}
                                                pbid={pbid}
                                                pbname={pbname}
                                                pbtruong={pbtruong}
                                                pbmota={pbmota}
                                            />
                                        </ButtonGroup>
                                    </StyledTableCell>
                                </StyledTableRow>
                            )}
                        </TableBody>
                    </StyledTable>
                </TableContainer>
            </div>
        )
    }
}
