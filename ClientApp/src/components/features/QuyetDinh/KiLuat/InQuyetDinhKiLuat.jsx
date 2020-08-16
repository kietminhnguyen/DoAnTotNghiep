import React, { Component } from 'react';
import { Modal, Row, Col, Form } from 'react-bootstrap';
import { Button } from '@material-ui/core'
import PrintIcon from '@material-ui/icons/Print';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import nvstyle from '../nvstyle.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export class InQuyetDinhKiLuat extends Component {
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
                pdf.save("QuyetDinhKyLuat.pdf");
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
                        Biểu mẫu quyết định kỉ luật
                            <Button>
                                <PrintIcon color="inherit"
                                    onClick={this.printDocument}
                                ></PrintIcon>
                            </Button>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div id="divToPrint" className="page1">
                                <h5 className="tieude">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h5>
                                <p className="tieude">Độc lập – Tự do – Hạnh phúc</p>
                                <p className="tenbieumau">-----------------------------</p>
                                <p className="ngay">Tp Hồ Chí Minh, Ngày.....tháng......năm......</p>
                                <h5 className="tenbieumau">QUYẾT ĐỊNH KỶ LUẬT</h5>
                                <h5 className="tenbieumau">V/v Kỷ luật nhân sự</h5>
                                <p className="noidung"> Căn cứ vào Quy chế nhân sự CÔNG TY CỔ PHẦN ABC</p>   
                                <p className="noidung">Căn cứ vào nội dung cuộc họp xem xét xử lý vi phạm kỷ luật đối với ông(bà) : {this.props.qdhodem}&nbsp;{this.props.qdtennv}</p>
                                <p className="noidung">Ngày {this.props.qdngyathanhlap}  của Hội đồng kỷ luật </p>
                                <p></p>
                                <h5 className="tenbieumau">QUYẾT ĐỊNH KỶ LUẬT</h5>

                                <p className="noidung">Điều 1. Nay kỷ luật  Ông (Bà) : {this.props.qdhodem}&nbsp;{this.props.qdtennv} </p>
                                <p className="noidung"> Điều 2. Các chế độ của ông/bà {this.props.qdhodem}&nbsp;{this.props.qdtennv}  gồm: Phạt  {this.props.qdtienphat} VND. </p>
                                <p className="noidung">&nbsp;&nbsp;&nbsp;-  Lý do: {this.props.qdnoidung}&nbsp;vào ngày : &nbsp;{this.props.qdngyathanhlap} </p>
                                <p className="noidung">Điều 3. Các ông Chánh Văn Phòng (Trưởng phòng hành chính), Trưởng phòng tổ chức cán bộ và Ông (Bà) {this.props.qdhodem}&nbsp;{this.props.qdtennv} chịu trách nhiệm thi hành quyết định này.</p>
                                <p className="noidung">Điều 4. Quyết định này có hiệu lực kể từ ngày ký.</p>

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
                        <Button className="btn btn-block btn-secondary" onClick={this.props.onHide}>Đóng</Button>
                    </Modal.Footer> */}
                </Modal>
            </div>
        );
    }
}