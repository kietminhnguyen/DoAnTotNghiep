import React, { Component } from 'react';
import { Modal, Row, Col, Form } from 'react-bootstrap';
import { Button } from '@material-ui/core'
import PrintIcon from '@material-ui/icons/Print';
//import CancelIcon from '@material-ui/icons/Cancel';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';


import nvstyle from './nvstyle.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
export class InHopDongThuViec extends Component {
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
                const pdf = new jsPDF('p');
                pdf.internal.getNumberOfPages();
                pdf.addPage(600, 2550);

                //pdf.setPage(2);
                pdf.addImage(imgData, 'JPEG', 0, 0);
                //pdf.output('dataurlnewwindow');
                pdf.save("HopDongThuViec.pdf");
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
                            Biểu mẫu hợp đồng nhân viên
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
                                <p className="ngay">Tp Hồ Chí Minh, Ngày.....tháng......năm......</p>
                                <h4 className="tenbieumau">HỢP ĐỒNG THỬ VIỆC</h4>
                                <p className="noidung">Chúng tôi một bên là: Công ty cổ phần ABC</p>
                                <p className="noidung">Đại diện cho: Công ty cổ phần ABC</p>
                                <p className="noidung">Địa chỉ: 145, Tây Thạnh, Quận Tân Phú, Tp Hồ Chí Minh.</p>
                                <p className="noidung">Điện thoại: 0332523232 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Email: congtyabc11@gmail.com</p>
                                <p className="noidung">Và một bên là:</p>
                                <p className="noidung">Ông/Bà: {this.props.nvho}&nbsp;{this.props.nvten}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Quốc tịch: Việt Nam </p>
                                <p className="noidung">Ngày sinh:&nbsp;{this.props.nvngaysinh} </p>
                                <p className="noidung">Hộ khẩu thường trú tại:&nbsp; {this.props.nvdcthuongtru} </p>
                                <p className="noidung">Dân tộc : {this.layTenDT(this.props.nvdantoc)}&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Tôn giáo : {this.props.nvtongiao}</p>
                                <p className="noidung">Số chứng minh: {this.props.nvsocmnd} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; cấp ngày : {this.props.nvngaycap}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; nơi cấp:{this.props.nvnoicap} </p>
                                <p className="noidung">Số điện thoại:&nbsp;{this.props.nvsdt} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Email:&nbsp;{this.props.nvmail}</p>
                                <p className="noidung">Cùng thỏa thuận ký kết Hợp đồng lao động và cam kết làm đúng những điều khoản sau đây:</p>
                                <p className="noidung">Điều 1: Ông (bà): {this.props.nvho}&nbsp;{this.props.nvten} làm việc tại Công ty cổ phần ABC  theo loại Hợp đồng lao động ,có hiệu lức kể từ ngày {this.props.hdbatdau} .
                                Địa điểm làm việc: 145, Tây Thạnh, Quận Tân Phú, Tp Hồ Chí Minh.
                                </p>
                                <p className="noidung">Với nhiệm vụ công việc như sau:</p>
                                <p className="noidung1">- Thực hiện công việc theo đúng chức danh chuyên môn của mình dưới sự quản lý, điều hành của Ban Giám đốc (và các cá nhân được bổ nhiệm hoặc ủy quyền phụ trách).</p>
                                <p className="noidung1">- Phối hợp với các bộ phận, phòng ban khác trong Công ty để phát huy tối đa hiệu quả công việc.</p>
                                <p className="noidung1">- Hoàn thành những công việc khác tùy thuộc theo yêu cầu kinh doanh của Công ty và theo quyết định của Ban Giám đốc.</p>
                                <p className="noidung">Điều 2: Chế độ làm việc</p>
                                <p className="noidung1">- Thời gian làm việc: Theo quy định tại Nội quy lao động hoặc theo sự phân công của Công ty và sắp xếp của người Quản lý.</p>
                                <p className="noidung1">- Do tính chất công việc, nhu cầu kinh doanh hay nhu cầu của tổ chức/bộ phận, Công ty có thể cho áp dụng thời gian làm việc linh hoạt. Những nhân viên được áp dụng thời gian làm việc linh hoạt có thể không tuân thủ lịch làm việc cố định bình thường mà làm theo ca kíp, nhưng vẫn phải đảm bảo đủ số giờ làm việc theo quy định.</p>
                                <p className="noidung1">- Thiết bị và công cụ làm việc sẽ được Công ty cấp phát tùy theo nhu cầu của công việc.</p>
                                <p className="noidung1">- Điều kiện an toàn và vệ sinh lao động tại nơi làm việc theo quy định của pháp luật hiện hành.</p>
                                <p className="noidung">Điều 3: Nghĩa vụ và quyền lợi của người lao động</p>
                                <p className="noidung">1. Quyền lợi</p>
                                <p className="noidung1">-  Công tác phí: Theo quy định của Công ty.</p>
                                <p className="noidung1">-  Phương tiện đi lại làm việc: Tự do</p>
                                <p className="noidung1">-  Mức lương: 6.000.000 VNĐ</p>
                                <p className="noidung1">-  Phụ cấp bao gồm: Tiền đi lại + Tiền ăn</p>
                                <p className="noidung1">-  Bảo hiểm xã hội và bảo hiểm y tế: Có</p>
                                <p className="noidung1">- Hình thức trả lương: Thanh toán vào khoảng ngày 05 đến 10 hàng tháng. Sau khi ký hợp đồng lao động đầu tiên với Công ty, người lao động phải mở tài khoản cá nhân tại Ngân hàng do Công ty quy định để trả lương.</p>
                                <p className="noidung1">- Chế độ nghỉ: Theo sự sắp xếp của Công ty.</p>
                                <p className="noidung1">- Trong thời gian thử việc Công ty có thể đơn phương chấm dứt hợp đồng thử việc với người lao động mà không cần báo trước nếu người lao động không đảm bảo công việc được giao. Người lao động cam kết sẽ không yêu cầu Công ty phải thanh toán bất kỳ chế độ và quyền lợi nào của người lao động trong thời gian đã làm.</p>
                                <p className="noidung">2. Nghĩa vụ</p>
                                <p className="noidung1">- Trong công việc chịu sự điều hành của Ban Giám đốc trong Công ty (và các cá nhân được Ban Giám đốc bổ nhiệm hoặc ủy quyền phụ trách).</p>
                                <p className="noidung1">- Hoàn thành công việc đã cam kết trong Hợp đồng, chấp hành nghiêm túc kỷ luật lao động, an toàn lao động, vệ sinh lao động và nội quy của Công ty.</p>
                                <p className="noidung1">- Nộp bản photo công chứng văn bằng, chứng chỉ (có học hàm cao nhất theo đúng chức danh chuyên môn) cho Công ty ngay khi ký Hợp đồng thử việc.</p>
                                <p className="noidung1">- Chấp hành nội quy lao động, an toàn lao động, kỷ luật lao động…..</p>
                                <p className="noidung1">- Tuyệt đối không sử dụng khách hàng của công ty đê trục lợi cá nhân;</p>
                                <p className="noidung1">- Trong thời gian hiệu lực hợp đồng và trong vòng 24 tháng kể từ khi nghỉ việc tại Công ty nhân viên không được phép: Cung cấp thông tin, tiết lộ bí mật kinh doanh của công ty ra ngoài, không được phép hợp tác, sản xuất, kinh doanh, làm đại lý sử dụng, tiết lộ thông tin về khách hàng, mặt hàng, sản phẩm tương tự của Công ty cho bất kỳ tổ chức cá nhân nào nhằm phục vụ công việc riêng cho mình mà chưa được sự đồng ý bằng văn bản từ phía công ty.Trường hợp bị phát hiện – Cá nhân đó sẽ bị khởi tố trước pháp luật.</p>
                                <p className="noidung">Điều 3: Nghĩa vụ và quyền hạn của người sử dụng lao động</p>
                                <p className="noidung">&nbsp;&nbsp;1. Nghĩa vụ</p>
                                <p className="noidung1">- Thực hiện đầy đủ những điều kiện cần thiết đã cam kết trong Hợp đồng thử việc để người lao động đạt hiệu quả công việc cao. Bảo đảm việc làm cho người lao động theo Hợp đồng đã ký.</p>
                                <p className="noidung1">- Thanh toán đầy đủ, đúng thời hạn các chế độ và quyền lợi cho người lao động theo Hợp đồng thử việc này.</p>
                                <p className="noidung1">- Bảo quản văn bằng, chứng chỉ gốc (nếu có) cho nhân viên trong thời gian hiệu lực Hợp đồng.</p>
                                <p className="noidung">&nbsp;&nbsp;2. Quyền hạn</p>
                                <p className="noidung1">- Điều hành người lao động hoàn thành công việc theo Hợp đồng (bố trí, điều chuyển công việc cho người lao động theo đúng chức năng chuyên môn).</p>
                                <p className="noidung1">- Tạm hoãn, chấm dứt Hợp đồng thử việc, kỷ luật người lao động theo đúng quy định của Pháp luật, và nội quy lao động của Công ty</p>
                                <p className="noidung">&nbsp;&nbsp;Điều 3: Điều khoản thi hành</p>
                                <p className="noidung1">- Những vấn đề về lao động không ghi trong Hợp đồng thử việc này thì áp dụng theo quy định của nội quy lao động và Pháp luật lao động.</p>
                                <p className="noidung1"></p>
                                <p className="noidung1">- Hợp đồng này được lập thành 02 (hai) bản có giá trị như nhau, mỗi bên giữ 01 (một) bản và có hiệu lực kể từ ngày {this.props.hdbatdau} </p>
                                <p className="noidung">Hợp đồng được lập tại: Tp Hồ Chí Minh</p>
                                <p className="noidung">NGƯỜI LAO ĐỘNG
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                NGƯỜI SỬ DỤNG LAO ĐỘNG</p>
                                <p className="noidung">(Ký, ghi rõ họ tên)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                (Ký, ghi rõ họ tên)</p>
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