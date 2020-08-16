import React, { Component } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, ButtonGroup, Button } from '@material-ui/core'
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import { withStyles } from '@material-ui/core/styles'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
//import axios from 'axios';

import { AddChucVuModal } from './AddChucVuModal';
import { EditChucVuModal } from './EditChucVuModal';

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



export class AppChucVu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chucvus: [],
            nhanviens: [],
            addModalShow: false,
            editModalShow: false
        }
    }

    componentDidMount() {
        this.loadCV();
        this.loadNV();
    }

    loadCV() {
        fetch('https://localhost:44390/api/chucvus')
            .then(response => response.json())
            .then(data => {
                this.setState({ chucvus: data });
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
        this.loadCV();
    }


    xoaChucVu = (idcv) => {
        let co = false
        for (let i = 0; i < this.state.nhanviens.length; i++) {
            if (idcv == parseInt(this.state.nhanviens[i].idchucVu)) {
                co = true
            }
        }
        if (co == true) {
            alert('Không thể xóa vì còn nhân viên đang giữa chức vụ này này')
        }
        else {
            if (window.confirm('Bạn có chắc muốn xóa')) {
                //axios.delete('https://localhost:44390/api/chucvus/' + idcv)
                fetch('https://localhost:44390/api/chucvus/' + idcv, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })

            }
        }

    }

    render() {

        const { chucvus, cvid, cvten, cvmota, cvheso } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return (
            <div>
                <div className="container text-center">
                    <h1 className="display-7">QUẢN LÝ CHỨC VỤ</h1><hr />
                </div>

                <Button variant="contained"
                    color="primary"
                    //component="span"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={() => this.setState({ addModalShow: true })}>
                    Thêm chức vụ
                </Button>
                <AddChucVuModal
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
                                {/* <th>#</th> */}
                                <StyledTableCell>Tên chức vụ</StyledTableCell>
                                <StyledTableCell align="center">Hệ số chức vụ</StyledTableCell>
                                <StyledTableCell align="center">Mô tả</StyledTableCell>
                                <StyledTableCell align="center">Chức năng</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {chucvus.map(cv =>
                                <StyledTableRow>
                                    {/* <td>{key + 1}</td> */}
                                    <StyledTableCell>{cv.tenChucVu}</StyledTableCell>
                                    <StyledTableCell align="center">{cv.heSoChucVu}</StyledTableCell>
                                    <StyledTableCell align="center">{cv.moTa}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <ButtonGroup variant="text">

                                            <Button>
                                                <EditIcon color="primary"
                                                    onClick={() => this.setState({
                                                        editModalShow: true,
                                                        cvid: cv.idchucVu,
                                                        cvten: cv.tenChucVu,
                                                        cvmota: cv.moTa,
                                                        cvheso: cv.heSoChucVu,
                                                    })}
                                                ></EditIcon>
                                            </Button>

                                            <Button>
                                                <DeleteIcon color="secondary"
                                                    onClick={() => this.xoaChucVu(cv.idchucVu)}
                                                ></DeleteIcon>
                                            </Button>

                                            {/* <Button className="mr-2" variant="warning"
                                                onClick={() => this.setState({
                                                    editModalShow: true,
                                                    cvid: cv.idchucVu,
                                                    cvten: cv.tenChucVu,
                                                    cvmota: cv.moTa,
                                                })}
                                            ><i className="ik ik-edit-2" />
                                            Sửa </Button>
                                            <Button className="mr-2" variant="danger"
                                                onClick={() => this.xoaChucVu(cv.idchucVu)}
                                            ><i className="ik ik-trash-2" />
                                            Xóa</Button> */}

                                            <EditChucVuModal
                                                show={this.state.editModalShow}
                                                onHide={editModalClose}
                                                cvid={cvid}
                                                cvten={cvten}
                                                cvmota={cvmota}
                                                cvheso={cvheso}
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
