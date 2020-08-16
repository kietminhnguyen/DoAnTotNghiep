import React, { Component } from 'react'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Modal, Row, Col, Form } from 'react-bootstrap';
import { format, differenceInDays, getMonth, getYear } from 'date-fns'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';

import { Button, Input } from '@material-ui/core';
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
    },
    body: {
        fontSize: 13,
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
        minWidth: 50,
        border: 1
    },
}))(Table);

export class InBangLuongTungNhanVien extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const formatter = new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        })
        return (
            <div className="container">
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    {/* <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" align="center">
                            Thông tin lương nhân viên
                    </Modal.Title>
                    </Modal.Header> */}
                    <Modal.Body>
                        <TableContainer>
                            <StyledTable id="emp1">
                                <StyledTableRow >
                                    <StyledTableCell colSpan="2" align="center"><h5>PHIẾU LƯƠNG CHI TIẾT THÁNG {this.props.thang} NĂM {this.props.nam}</h5></StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <StyledTableCell align="left">ID Nhân Viên</StyledTableCell>
                                    <StyledTableCell align="left">{this.props.idnhanvien}</StyledTableCell>
                                </StyledTableRow>

                                <StyledTableRow>
                                    <StyledTableCell align="left">Họ Và Tên</StyledTableCell>
                                    <StyledTableCell align="left">{this.props.hoten}</StyledTableCell>
                                </StyledTableRow>

                                <StyledTableRow>
                                    <StyledTableCell align="left">Hệ Số Chức Vụ</StyledTableCell>
                                    <StyledTableCell align="left">{this.props.hscv}</StyledTableCell>
                                </StyledTableRow>

                                <StyledTableRow>
                                    <StyledTableCell align="left">Hệ Số Chuyên Môn</StyledTableCell>
                                    <StyledTableCell align="left">{this.props.hscm}</StyledTableCell>
                                </StyledTableRow>

                                <StyledTableRow>
                                    <StyledTableCell align="left">Mức Lương</StyledTableCell>
                                    <StyledTableCell align="left">{this.props.mucluong}</StyledTableCell>
                                </StyledTableRow>

                                <StyledTableRow>
                                    <StyledTableCell align="left">Số ngày đi trễ ˂ 60 phút</StyledTableCell>
                                    <StyledTableCell align="left">{this.props.songayditreduoi60p}</StyledTableCell>
                                </StyledTableRow>

                                <StyledTableRow>
                                    <StyledTableCell align="left">Số ngày đi trễ ≥ 60 phút</StyledTableCell>
                                    <StyledTableCell align="left">{this.props.songayditretren60p}</StyledTableCell>
                                </StyledTableRow>

                                <StyledTableRow>
                                    <StyledTableCell align="left">Số Ngày Nghĩ</StyledTableCell>
                                    <StyledTableCell align="left">{this.props.songaynghi}</StyledTableCell>
                                </StyledTableRow>

                                <StyledTableRow>
                                    <StyledTableCell align="left">Số Ngày Công</StyledTableCell>
                                    <StyledTableCell align="left">{this.props.songaycong}</StyledTableCell>
                                </StyledTableRow>

                                <StyledTableRow>
                                    <StyledTableCell align="left">Số Giờ Tăng Ca</StyledTableCell>
                                    <StyledTableCell align="left">{this.props.sogiotangca}</StyledTableCell>
                                </StyledTableRow>

                                <StyledTableRow>
                                    <StyledTableCell align="left">Tiền Tăng Ca</StyledTableCell>
                                    <StyledTableCell align="left">{this.props.tientangca}</StyledTableCell>
                                </StyledTableRow>

                                <StyledTableRow>
                                    <StyledTableCell align="left">Tiền Phạt Đi Trễ</StyledTableCell>
                                    <StyledTableCell align="left">{this.props.tienditre}</StyledTableCell>
                                </StyledTableRow>

                                <StyledTableRow>
                                    <StyledTableCell align="left">Tiền Phạt Kỉ Luật</StyledTableCell>
                                    <StyledTableCell align="left">{this.props.tienphat}</StyledTableCell>
                                </StyledTableRow>

                                <StyledTableRow>
                                    <StyledTableCell align="left">Tiền Tạm Ứng</StyledTableCell>
                                    <StyledTableCell align="left">{this.props.tamung}</StyledTableCell>
                                </StyledTableRow>

                                <StyledTableRow>
                                    <StyledTableCell align="left">Tiền Thuế TNCN</StyledTableCell>
                                    <StyledTableCell align="left">{this.props.thuetncn}</StyledTableCell>
                                </StyledTableRow>

                                <StyledTableRow>
                                    <StyledTableCell align="left">Tiền Trừ Bảo Hiểm</StyledTableCell>
                                    <StyledTableCell align="left">{this.props.tienbh}</StyledTableCell>
                                </StyledTableRow>

                                <StyledTableRow>
                                    <StyledTableCell align="left">Tiền Khen Thưởng</StyledTableCell>
                                    <StyledTableCell align="left">{this.props.tienthuong}</StyledTableCell>
                                </StyledTableRow>

                                <StyledTableRow>
                                    <StyledTableCell align="left">Tiền Phụ Cấp</StyledTableCell>
                                    <StyledTableCell align="left">{formatter.format(730000)}</StyledTableCell>
                                </StyledTableRow>

                                <StyledTableRow>
                                    <StyledTableCell align="left">Tiền Phụ Cấp Khác</StyledTableCell>
                                    <StyledTableCell align="left">{this.props.tienpckhac}</StyledTableCell>
                                </StyledTableRow>

                                <StyledTableRow>
                                    <StyledTableCell align="left">Thực Lĩnh</StyledTableCell>
                                    <StyledTableCell align="left">{this.props.thuclinh}</StyledTableCell>
                                </StyledTableRow>
                            </StyledTable>
                        </TableContainer>
                    </Modal.Body>
                    <Modal.Footer>
                        <Row>
                            <Col>
                                <ReactHTMLTableToExcel
                                    className="btn btn-success"
                                    table="emp1"
                                    filename="BangLuongDetail"
                                    sheet="Sheet"
                                    buttonText="Xuất Excel"
                                />
                            </Col>
                            <Col>
                                <Button className="btn btn-danger" startIcon={<ExitToAppSharpIcon />} onClick={this.props.onHide}>Đóng</Button>
                            </Col>

                        </Row>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
