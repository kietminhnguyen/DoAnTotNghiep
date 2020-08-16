import React, { Component } from 'react';
import { Modal, Row, Col, Form } from 'react-bootstrap';
import { Button } from '@material-ui/core'
import PrintIcon from '@material-ui/icons/Print';
//import CancelIcon from '@material-ui/icons/Cancel';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';


import nvstyle from '../nvstyle.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export class InQuyetDinhKhenThong extends Component {
    //static displayName = EditPhongbanModal.name;

    constructor(props) {
        super(props);
        this.state = {
            pbs: [],
            dts: [],
            tds: [],
            daotaos: [],
            cvs: [],
        };
    }
    /*In thong tin nhaan vien PDF */
    printDocument() {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                //pdf.internal.getNumberOfPages();
                //pdf.addPage(600,2500);

                //pdf.setPage(2);
                pdf.addImage(imgData, 'JPEG', 0, 0);
                //pdf.output('dataurlnewwindow');
                pdf.save("QuyetDinhKhenThuong.pdf");
            })
            ;
    }
    /*---------------------------*/
    loadPhongBan() {
        fetch('https://localhost:44390/api/phongbans')
            .then(respone => respone.json())
            .then(data => {
                this.setState({ pbs: data })
            })
    }

    loadDanToc() {
        fetch('https://localhost:44390/api/dantocs/')
            .then(respone => respone.json())
            .then(data => {
                this.setState({ dts: data })
            })
    }

    loadDaoTao() {
        fetch('https://localhost:44390/api/trinhdodaotaos/')
            .then(respone => respone.json())
            .then(data => {
                this.setState({ daotaos: data })
            })
    }

    loadChucVu() {
        fetch('https://localhost:44390/api/chucvus/')
            .then(respone => respone.json())
            .then(data => {
                this.setState({ cvs: data })
            })
    }

    componentDidMount() {
        this.loadPhongBan()
        this.loadDanToc()
        this.loadDaoTao()
        this.loadChucVu()
    }

    layTenDT = (idDTofNV) => {
        for (let i = 0; i < this.state.dts.length; i++) {
            if (idDTofNV == this.state.dts[i].iddanToc) {
                idDTofNV = this.state.dts[i].tenDanToc
            }
        }
        return idDTofNV
    }

    layTenTD = (idTDofNV) => {
        for (let i = 0; i < this.state.tds.length; i++) {
            if (idTDofNV == this.state.tds[i].idtrinhDo) {
                idTDofNV = this.state.tds[i].tenTrinhDo
            }
        }
        return idTDofNV
    }

    layTenPB = (idPBofNV) => {
        for (let i = 0; i < this.state.pbs.length; i++) {
            if (idPBofNV == this.state.pbs[i].idphongBan) {
                idPBofNV = this.state.pbs[i].tenPhongBan
            }
        }
        return idPBofNV
    }
    render() {
        return (
            <div className="container">
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Biểu mẫu quyết định khen thưởng
                            <Button>
                                <PrintIcon color="inherit"
                                    onClick={this.printDocument}
                                ></PrintIcon>
                            </Button>
                            {/* <button onClick={this.printDocument}>Print</button> */}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div id="divToPrint" className="page1">
                                <h5 className="tieude">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h5>
                                <p className="tieude">Độc lập – Tự do – Hạnh phúc</p>
                                <p className="tenbieumau">-----------------------------</p>
                                <p className="ngay">TP.Hồ Chí Minh, Ngày.....tháng......năm......</p>
                                <h5 className="tenbieumau">QUYẾT ĐỊNH KHEN THƯỞNG</h5>
                                <h5 className="tenbieumau">V/v Khen thưởng nhân sự</h5>
                                <h5 className="tenbieumau">GIÁM ĐỐC CÔNG TY CỔ PHẦN ABC</h5>

                                <p className="noidung">Điều 1. Nay khen thưởng  Ông (Bà) : {this.props.qdhodem}&nbsp;{this.props.qdtennv}  </p>
                                <p className="noidung"> Điều 2. Các chế độ của ông/bà {this.props.qdhodem}&nbsp;{this.props.qdtennv}  gồm: thưởng  {this.props.qdtienthuong} VND. </p>
                                <p className="noidung">&nbsp;&nbsp;&nbsp;-  Lý do: {this.props.qdnoidung}</p>
                                <p className="noidung">Điều 3. Các ông Chánh Văn Phòng (Trưởng phòng hành chính), Trưởng phòng tổ chức cán bộ và Ông (Bà) {this.props.qdhodem}&nbsp;{this.props.qdtennv} chịu trách nhiệm thi hành quyết định này.</p>
                                <p className="ft1">GIÁM ĐỐC</p>
                                <p className="noinhan">Nơi nhận &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                (Ký, ghi rõ họ tên)</p>
                                <p className="noinhan"> - Như điều 3</p>
                                <p className="noinhan">- Lưu VP</p>

                            </div>
                        </div>
                    </Modal.Body>
                    {/* <Modal.Footer>
                        <Button
                            className="mr-3"
                            variant="contained"
                            color="inherit"
                            startIcon={<CancelIcon />}
                            onClick={this.props.onHide}
                        >Đóng</Button>
                    </Modal.Footer> */}
                </Modal>
            </div>
        );
    }
}