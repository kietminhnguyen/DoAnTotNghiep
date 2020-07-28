import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from '@material-ui/core'
import PrintIcon from '@material-ui/icons/Print';
import CancelIcon from '@material-ui/icons/Cancel';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';


import nvstyle from './nvstyle.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


export class InNhanVienModal extends Component {
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
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                // pdf.output('dataurlnewwindow');
                pdf.save("download.pdf");
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
                            Biểu mẫu hồ sơ nhân viên
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
                                <h4 className="tenbieumau">HỒ SƠ NHÂN VIÊN </h4>
                                <p className="noidung">1. Họ và tên:  {this.props.nvho} {this.props.nvten} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                 Giới tính: {this.props.nvgioitinh}</p>
                                <p className="noidung">2. Họ và tên thường dùng:  {this.props.nvho} {this.props.nvten}</p>
                                <p className="noidung">3. Sinh ngày:  {this.props.nvngaysinh} </p>
                                <p className="noidung">4. Nơi sinh:  {this.props.nvnoisinh} </p>
                                <p className="noidung">5. Nguyên quán: {this.props.nvdcthuongtru}</p>
                                <p className="noidung">6. Nơi đăng ký hộ khẩu thường trú:  {this.props.nvdcthuongtru} </p>
                                <p className="noidung">7. Chỗ ở hiện nay:  {this.props.nvchohientai} </p>
                                <p className="noidung">8. Điện thoại:  {this.props.nvsdt} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Dân tộc:  {this.layTenDT(this.props.nvdantoc)}&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Tôn giáo:  {this.props.nvtongiao}  </p>
                                <p className="noidung">9. Số chứng minh: {this.props.nvsocmnd} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; cấp ngày:  {this.props.nvngaycap}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; nơi cấp:  {this.props.nvnoicap} </p>
                                {/* <p className="noidung">10. Trình độ giáo dục: </p> */}
                                <p className="noidung">10. Trình độ chuyên môn cao nhất được đào tạo:  {this.layTenTD(this.props.nvdaotao)} </p>
                                <p className="noidung">11. Tình trạng hôn nhân:  {this.props.nvtinhtranghonnhan}  </p>
                                <p className="noidung">Tôi xin cam đoan bản khai sơ yếu lý lịch trên đúng sự thật, nếu có điều gì không đúng tôi chịu trách nhiệm trước pháp luật về lời khai của mình.</p>
                                <p className="ngay">…………ngày ………tháng ……năm………</p>
                                <p className="chungnhan">Chứng nhận của cơ quan đang công tác  </p>
                                <p className="chungnhan">hoặc địa phương nơi đăng ký hộ khẩu <h6 className="nguoikhai">Người khai</h6> </p>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button
                            className="mr-3"
                            variant="contained"
                            color="inherit"
                            startIcon={<CancelIcon />}
                            onClick={this.props.onHide}
                        >Đóng</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}