import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Row, Col, Form } from 'react-bootstrap';
import { Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, Input } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import CancelIcon from '@material-ui/icons/Cancel';
import AppCSS from '../../../../AppCSS.css'
import { format, differenceInYears, compareAsc } from 'date-fns'

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

const StyledGioiTinh = withStyles((theme) => ({
    root: {
        minWidth: 120
    },
}))(TextField);

const StyledNgay = withStyles((theme) => ({
    root: {
        width: 170
    },
}))(TextField);

const StyledKeID = withStyles((theme) => ({
    root: {
        width: 255
    },
}))(TextField);

const StyledHonNhan = withStyles((theme) => ({
    root: {
        width: 165
    },
}))(TextField);


export class EditUngVienModal extends Component {
    //static displayName = EditPhongbanModal.name;

    constructor(props) {
        super(props);
        this.state = {
            url: "",
            dts: [],
            daotaos: [],
            ungviens: [],
            snackbaropen: false,
            snackbarmsg: '',
            UngvienHO: null,
            UngvienTEN: null,
            UngvienEmail: null,
            UngvienSoCMNN: null,
            UngvienSDT: null,

            formErrors: {
                UngvienHO: ".",
                UngvienTEN: ".",
                UngvienEmail: ".",
                UngvienSoCMNN: ".",
                UngvienSDT: ".",
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeValid = this.handleChangeValid.bind(this)
    }

    SnackbarClose = (event) => {
        this.setState({ snackbaropen: false });
    };

    componentDidMount() {
        this.loadDanToc()
        this.loadDaoTao()
        this.loadUV()
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

    loadUV() {
        fetch('https://localhost:44390/api/ungviens')
            .then(response => response.json())
            .then(data => {
                this.setState({ ungviens: data });
            });
    }

    handleSubmit(event) {
        event.preventDefault();

        var ngayHienTai = format(new Date(), 'yyyy-MM-dd')
        //2020-08-01 vs 1998-09-10 => 21 tuổi
        var tinhTuoi = differenceInYears(
            new Date(ngayHienTai),
            new Date(event.target.UngvienNgaySinh.value)
        )

        //Nhập ngày cấp VS Nhập ngày sinh => phải hơn hơn bằng 14 tuổi mới đc cấp CMND
        var tinhNgayCapCMND = differenceInYears(
            new Date(event.target.UngvienNgNgayCapCMMM.value),
            new Date(event.target.UngvienNgaySinh.value)
        )//console.log(tinhNgayCapCMND)
        //Nếu ngày cấp CMND trước Ngày hiện tại => -1 (bằng là 0)
        var ktNgayCapVsNgayHienTai = compareAsc(new Date(event.target.UngvienNgNgayCapCMMM.value),
            new Date(ngayHienTai)) //console.log(ktNgayCapVsNgayHienTai)

        //Kt trùng số CMND
        // let flagSoCMND = false
        // for (let i = 0; i < this.state.ungviens.length; i++) {
        //     if (this.state.ungviens[i].soCmnn == event.target.UngvienSoCMNN.value 
        //         && event.target.UngvienSoCMNN.value  == this.props.uvsocmnd
        //         ) {
        //         flagSoCMND = true
        //     }
        //     else {
        //         flagSoCMND = false
        //     }
        // }
        //console.log(event.target.UngvienTEN.value)
        let flagTuoi = true
        let flagNgayCapCMND = true
        if (tinhTuoi < 18) { // chưa đủ tuổi đi làm
            flagTuoi = false
            alert("Ngày sinh chưa hợp lệ. YÊU CẦU ỨNG VIÊN PHẢI TRÊN 18 Tuổi!!!")
        } else {
            if (tinhNgayCapCMND < 14 || ktNgayCapVsNgayHienTai == 1) { // chưa đủ 14 tuổi & ngày cấp sau hiện tại 
                flagNgayCapCMND = false
                alert("Ngày cấp CMND chưa hợp lệ")
            }
            else {
                // if (flagSoCMND == true) {
                //     alert("Số CMND đã bị trùng")
                // }
                // else {
                if ((flagTuoi == true && flagNgayCapCMND == true)

                    && this.state.formErrors.UngvienTEN == "." // thỏa tất cả mới đc submit
                    && this.state.formErrors.UngvienHO == "." // nếu không đỏ sẽ post đc
                    && this.state.formErrors.UngvienEmail == "."
                    && this.state.formErrors.UngvienSoCMNN == "."
                    && this.state.formErrors.UngvienSDT == "."

                    && event.target.UngvienTEN.value != "" // gõ đúng hết sau đó nhấn đóng
                    && event.target.UngvienHO.value != ""
                    && event.target.UngvienEmail.value != ""
                    && event.target.UngvienSoCMNN.value != ""
                    && event.target.UngvienSDT.value != ""


                    && event.target.UngvienTonGiao.value != ""
                    && event.target.UngvienNoiSinh.value != ""
                    && event.target.UngvienNoiCap.value != ""
                    && event.target.UngvienQuocTich.value != ""
                    && event.target.UngvienDiaChi.value != ""
                    && event.target.UngvienChoOHienTai.value != ""
                    && event.target.UngvienTinhTrangHonNhan.value != ""

                    && event.target.UngvienNgaySinh.value != ""
                    && event.target.UngvienNgNgayCapCMMM.value != ""
                ) {
                    if (this.state.url == "") {
                        axios.put('https://localhost:44390/api/ungviens/' + event.target.UngvienID.value, {
                            idungVien: event.target.UngvienID.value,
                            hoDem: event.target.UngvienHO.value,
                            ten: event.target.UngvienTEN.value,
                            tinhTrangHonNhan: event.target.UngvienTinhTrangHonNhan.value,
                            ngaySinh: event.target.UngvienNgaySinh.value,
                            gioiTinh: event.target.UngvienGIOITINH.value,
                            hinhanh: this.props.uvpic,
                            //hinhanh: "assets/images/" + this.props.uvpic.substring(14,100),
                            diaChiThuongTru: event.target.UngvienDiaChi.value,
                            choOhienTai: event.target.UngvienChoOHienTai.value,
                            soCmnn: event.target.UngvienSoCMNN.value,
                            ngayCap: event.target.UngvienNgNgayCapCMMM.value,
                            tonGiao: event.target.UngvienTonGiao.value,
                            noiCap: event.target.UngvienNoiCap.value,
                            quocTich: event.target.UngvienQuocTich.value,
                            email: event.target.UngvienEmail.value,
                            soDienThoai: event.target.UngvienSDT.value,
                            //nganhHoc: event.target.UngvienNganhHoc.value,
                            noiDaoTao: "Chưa",
                            idtrinhDo: parseInt(event.target.UngvienTrinhDoDaoTao.value),
                            //xepLoai: event.target.UngvienXepLoai.value,
                            iddanToc: parseInt(event.target.UngvienDanToc.value),
                            noiSinh: event.target.UngvienNoiSinh.value,
                        })
                    } else {
                        axios.put('https://localhost:44390/api/ungviens/' + event.target.UngvienID.value, {
                            idungVien: event.target.UngvienID.value,
                            hoDem: event.target.UngvienHO.value,
                            ten: event.target.UngvienTEN.value,
                            tinhTrangHonNhan: event.target.UngvienTinhTrangHonNhan.value,
                            ngaySinh: event.target.UngvienNgaySinh.value,
                            gioiTinh: event.target.UngvienGIOITINH.value,
                            hinhanh: this.state.url,
                            //hinhanh: "assets/images/" + this.props.uvpic.substring(14,100),
                            diaChiThuongTru: event.target.UngvienDiaChi.value,
                            choOhienTai: event.target.UngvienChoOHienTai.value,
                            soCmnn: event.target.UngvienSoCMNN.value,
                            ngayCap: event.target.UngvienNgNgayCapCMMM.value,
                            tonGiao: event.target.UngvienTonGiao.value,
                            noiCap: event.target.UngvienNoiCap.value,
                            quocTich: event.target.UngvienQuocTich.value,
                            email: event.target.UngvienEmail.value,
                            soDienThoai: event.target.UngvienSDT.value,
                            //nganhHoc: event.target.UngvienNganhHoc.value,
                            noiDaoTao: "Chưa",
                            idtrinhDo: parseInt(event.target.UngvienTrinhDoDaoTao.value),
                            //xepLoai: event.target.UngvienXepLoai.value,
                            iddanToc: parseInt(event.target.UngvienDanToc.value),
                            noiSinh: event.target.UngvienNoiSinh.value,
                        })
                    }
                    alert("Sửa thành công ")
                    this.resetForm()
                } else {
                    alert("VUI LÒNG KIỂM TRA LẠI!!!")
                }
                //}
            }
        }
        //console.log(this.state.url)
    }

    //true mở - false đóng
    checkHideModal() {
        //for(let i=0; i<this.state.length; i++)
        if (this.state.formErrors.UngvienTEN == "." // không đỏ sẽ đóng
            && this.state.formErrors.UngvienHO == "."
            && this.state.formErrors.UngvienEmail == "."
            && this.state.formErrors.UngvienSoCMNN == "."
            && this.state.formErrors.UngvienSDT == "."
        ) {
            return this.props.onHide //flase đóng modal
        }
        // else {// sau khi gõ đúng hết mà nhấn đóng
        //     //thì mở lại modal và không gõ gì rồi nhấn submit sẽ vẫn giữ modal
        //     return true // giữ modal  
        // }
    }

    resetForm = () => {
        this.setState({
            // formErrors: {
            //     UngvienHO: ".",
            //     UngvienTEN: ".",
            //     UngvienEmail: ".",
            //     UngvienSoCMNN: ".",
            //     UngvienSDT: ".",
            // },
            url: ""
        })
    }

    handleChange = (event) => {
        const urlmacdinh = "assets/images/";

        const name = event.target.name;
        const values = event.target.value;
        var result = urlmacdinh + values.substring(12, 100)
        //console.log(values.substring(12, 100))
        this.setState({
            url: result
        })
    }

    handleChangeValid = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        //const tenRegexVN = /^(?:[\$A-Z_a-z \xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0523\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0621-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971\u0972\u097B-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D28\u0D2A-\u0D39\u0D3D\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC\u0EDD\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8B\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10D0-\u10FA\u10FC\u1100-\u1159\u115F-\u11A2\u11A8-\u11F9\u1200-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u1676\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19A9\u19C1-\u19C7\u1A00-\u1A16\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u2094\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2C6F\u2C71-\u2C7D\u2C80-\u2CE4\u2D00-\u2D25\u2D30-\u2D65\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31B7\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FC3\uA000-\uA48C\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA65F\uA662-\uA66E\uA67F-\uA697\uA717-\uA71F\uA722-\uA788\uA78B\uA78C\uA7FB-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA90A-\uA925\uA930-\uA946\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAC00-\uD7A3\uF900-\uFA2D\uFA30-\uFA6A\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1E\uDF30-\uDF4A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F\uDD00-\uDD15\uDD20-\uDD39\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33]|\uD808[\uDC00-\uDF6E]|\uD809[\uDC00-\uDC62]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|[\uD840-\uD868][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6]|\uD87E[\uDC00-\uDE1D])(?:[\$0-9A-Z_a-z\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u0523\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0621-\u065E\u0660-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0901-\u0939\u093C-\u094D\u0950-\u0954\u0958-\u0963\u0966-\u096F\u0971\u0972\u097B-\u097F\u0981-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C01-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C82\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0D02\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D28\u0D2A-\u0D39\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC\u0EDD\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F8B\u0F90-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u1099\u10A0-\u10C5\u10D0-\u10FA\u10FC\u1100-\u1159\u115F-\u11A2\u11A8-\u11F9\u1200-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u1676\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17B3\u17B6-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u1900-\u191C\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19A9\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BAA\u1BAE-\u1BB9\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1D00-\u1DE6\u1DFE-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u2094\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2C6F\u2C71-\u2C7D\u2C80-\u2CE4\u2D00-\u2D25\u2D30-\u2D65\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31B7\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FC3\uA000-\uA48C\uA500-\uA60C\uA610-\uA62B\uA640-\uA65F\uA662-\uA66F\uA67C\uA67D\uA67F-\uA697\uA717-\uA71F\uA722-\uA788\uA78B\uA78C\uA7FB-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA900-\uA92D\uA930-\uA953\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAC00-\uD7A3\uF900-\uFA2D\uFA30-\uFA6A\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE26\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1E\uDF30-\uDF4A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F\uDD00-\uDD15\uDD20-\uDD39\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F]|\uD808[\uDC00-\uDF6E]|\uD809[\uDC00-\uDC62]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|[\uD840-\uD868][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF])*$/;
        //const tenRegex = /^[a-zA-Z]+$/
        const hoRegexp = /\d{1,}/;
        const emailRegex = RegExp(
            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        const sdtRegex = /^\d{10,10}$/;
        const cmndRegex9 = /^\d{9,9}$/;
        const cmndRegex12 = /^\d{12,12}$/;
        switch (name) {
            case "UngvienTEN":
                formErrors.UngvienTEN = value.length < 1 || hoRegexp.test(value) ? "Tên chưa hợp lệ" : ".";
                break;
            case "UngvienHO":
                formErrors.UngvienHO = value.length < 2 || hoRegexp.test(value) ? "Họ đệm chưa hợp lệ" : ".";
                break;
            case "UngvienEmail":
                formErrors.UngvienEmail = emailRegex.test(value) ? "." : "Email chưa hợp lệ";
                break;
            case "UngvienSoCMNN":
                formErrors.UngvienSoCMNN = cmndRegex9.test(value) || cmndRegex12.test(value) ? "." : "Số CMND chưa hợp lệ";
                break;
            case "UngvienSDT":
                formErrors.UngvienSDT = sdtRegex.test(value) ? "." : "Số điện thoại chưa hợp lệ";
                break;
            default:
                break;
        }

        this.setState({
            formErrors,
            [name]: value
        })
    }

    checkErrorHo() {
        if (this.state.formErrors.UngvienHO != "." && this.state.formErrors.UngvienHO != "*") {
            return true
        }
        return false
    }
    checkErrorTen() {
        if (this.state.formErrors.UngvienTEN != "." && this.state.formErrors.UngvienTEN != "*") {
            return true
        }
        return false
    }
    checkErrorEmail() {
        if (this.state.formErrors.UngvienEmail != "." && this.state.formErrors.UngvienEmail != "*") {
            return true
        }
        return false
    }
    checkErrorSDT() {
        if (this.state.formErrors.UngvienSDT != "." && this.state.formErrors.UngvienSDT != "*") {
            return true
        }
        return false
    }
    checkErrorSoCMND() {
        if (this.state.formErrors.UngvienSoCMNN != "." && this.state.formErrors.UngvienSoCMNN != "*") {
            return true
        }
        return false
    }

    showModalBoby() {
        const urlt = "assets/images/"
        const { formErrors } = this.state;

        return (
            <Form onSubmit={this.handleSubmit} noValidate>
                <Row>
                    <Col sm={12}>
                        <Row className="mt-1">
                            <Col sm={3}>
                                <img
                                    src={this.props.uvpic}
                                    srcSet={this.state.url}
                                    className="ml-5"
                                    height="100px"
                                    width="100px"
                                />
                            </Col>
                            <Col sm={2} className="mt-3">
                                <TextField
                                    name="UngvienID"
                                    size="small"
                                    variant="outlined"
                                    label="ID ứng viên"
                                    disabled
                                    defaultValue={this.props.uvid}
                                />
                            </Col>
                            <Col sm={3} className="mt-3">
                                <StyledKeID
                                    name="UngvienHO"
                                    size="small"
                                    variant="outlined"
                                    label="Họ đệm"
                                    error={this.checkErrorHo()}
                                    onChange={this.handleChangeValid}
                                    defaultValue={this.props.uvho}
                                ></StyledKeID>
                                {formErrors.UngvienHO.length > 0 && (
                                    <p><span className="errorMessage">{formErrors.UngvienHO}</span></p>
                                )}
                            </Col>
                            <Col sm={2} className="mt-3">
                                <TextField
                                    name="UngvienTEN"
                                    size="small"
                                    variant="outlined"
                                    label="Tên"
                                    error={this.checkErrorTen()}
                                    onChange={this.handleChangeValid}
                                    defaultValue={this.props.uvten}
                                >
                                </TextField>
                                {formErrors.UngvienTEN.length > 0 && (
                                    <p><span className="errorMessage">{formErrors.UngvienTEN}</span></p>
                                )}
                            </Col>
                            <Col sm={2} className="mt-3">
                                <StyledGioiTinh
                                    name="UngvienGIOITINH"
                                    size="small"
                                    variant="outlined"
                                    select
                                    label="Giới tính"
                                    //defaultValue="Nam"
                                    defaultValue={this.props.uvgioitinh}
                                >
                                    <MenuItem value="Nam">Nam</MenuItem>
                                    <MenuItem value="Nữ">Nữ</MenuItem>
                                </StyledGioiTinh>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col sm={3}>
                                <label className="btn btn-link btn-sm ml-5">
                                    CHỌN HÌNH<input type="file" hidden
                                        name="UngvienHINH"
                                        //defaultValue= ""
                                        onChange={(event) => this.handleChange(event)}
                                    ></input>

                                </label>
                            </Col>
                            <Col sm={2}>
                                <StyledNgay
                                    name="UngvienNgaySinh"
                                    size="small"
                                    type="date"
                                    variant="outlined"
                                    label="Ngày Sinh"
                                    defaultValue={this.props.uvngaysinh}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                ></StyledNgay>
                            </Col>
                            <Col sm={3}>
                                <StyledKeID
                                    name="UngvienNoiSinh"
                                    size="small"
                                    variant="outlined"
                                    label="Nơi sinh"
                                    defaultValue={this.props.uvnoisinh}
                                ></StyledKeID>
                            </Col>
                            <Col sm={2}>
                                <TextField
                                    name="UngvienTonGiao"
                                    size="small"
                                    variant="outlined"
                                    label="Tôn giáo"
                                    defaultValue={this.props.uvtongiao}
                                />
                            </Col>
                            <Col sm={2}>
                                <StyledGioiTinh
                                    name="UngvienDanToc"
                                    size="small"
                                    variant="outlined"
                                    select
                                    label="Dân tộc"
                                    //defaultValue={this.layGiaTriMacDinhDanToc("Kinh")}
                                    defaultValue={this.props.uvdantoc}
                                >
                                    {
                                        this.state.dts.map(dt =>
                                            <MenuItem value={dt.iddanToc}>{dt.tenDanToc}</MenuItem>)
                                    }
                                </StyledGioiTinh>
                            </Col>
                        </Row>
                    </Col>

                    <Col sm={12} className="ml-2">
                        <Row className="mt-4">
                            <Col sm={2} >
                                <TextField
                                    name="UngvienSDT"
                                    size="small"
                                    variant="outlined"
                                    label="Số điện thoại"
                                    error={this.checkErrorSDT()}
                                    onChange={this.handleChangeValid}
                                    defaultValue={this.props.uvsdt}
                                />
                                {formErrors.UngvienSDT.length > 0 && (
                                    <p><span className="errorMessage">{formErrors.UngvienSDT}</span></p>
                                )}
                            </Col>
                            <Col sm={3} >
                                <StyledKeID
                                    name="UngvienEmail"
                                    size="small"
                                    variant="outlined"
                                    label="Email"
                                    error={this.checkErrorEmail()}
                                    onChange={this.handleChangeValid}
                                    defaultValue={this.props.uvmail}
                                ></StyledKeID>
                                {formErrors.UngvienEmail.length > 0 && (
                                    <p><span className="errorMessage">{formErrors.UngvienEmail}</span></p>
                                )}
                            </Col>
                            <Col sm={2} >
                                <StyledHonNhan
                                    name="UngvienSoCMNN"
                                    size="small"
                                    variant="outlined"
                                    label="Số CMND"
                                    error={this.checkErrorSoCMND()}
                                    onChange={this.handleChangeValid}
                                    defaultValue={this.props.uvsocmnd}
                                ></StyledHonNhan>
                                {formErrors.UngvienSoCMNN.length > 0 && (
                                    <p><span className="errorMessage">{formErrors.UngvienSoCMNN}</span></p>
                                )}
                            </Col>
                            <Col sm={2} >
                                <StyledNgay
                                    name="UngvienNgNgayCapCMMM"
                                    size="small"
                                    type="date"
                                    variant="outlined"
                                    label="Ngày cấp CMND"
                                    defaultValue={this.props.uvngaycap}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                ></StyledNgay>
                            </Col>
                            <Col sm={3} >
                                <TextField
                                    name="UngvienNoiCap"
                                    size="small"
                                    variant="outlined"
                                    label="Nơi cấp CMND"
                                    defaultValue={this.props.uvnoicap}
                                />
                            </Col>
                        </Row>

                        <Row className="mt-2">
                            <Col sm={2} >
                                <TextField
                                    name="UngvienQuocTich"
                                    size="small"
                                    variant="outlined"
                                    label="Quốc tịch"
                                    defaultValue={this.props.uvquoctich}
                                />
                            </Col>
                            <Col sm={3} >
                                <StyledKeID
                                    size="small"
                                    name="UngvienDiaChi"
                                    variant="outlined"
                                    label="Địa chỉ thường trú"
                                    defaultValue={this.props.uvdcthuongtru}
                                ></StyledKeID>
                            </Col>
                            <Col sm={3} >
                                <StyledKeID
                                    name="UngvienChoOHienTai"
                                    size="small"
                                    variant="outlined"
                                    label="Chỗ ở hiện tại"
                                    defaultValue={this.props.uvchohientai}
                                ></StyledKeID>
                            </Col>
                            <Col sm={2} >
                                <StyledHonNhan
                                    name="UngvienTinhTrangHonNhan"
                                    size="small"
                                    variant="outlined"
                                    label="Tình trạng hôn nhân"
                                    defaultValue={this.props.uvtinhtranghonnhan}
                                ></StyledHonNhan>
                            </Col>
                            <Col sm={2} >
                                <StyledGioiTinh className="ml-2"
                                    name="UngvienTrinhDoDaoTao"
                                    size="small"
                                    variant="outlined"
                                    select
                                    label="Trình độ"
                                    //defaultValue={this.layGiaTriMacDinhTrinhDo("Đại học")}
                                    defaultValue={this.props.uvdaotao}
                                >
                                    {
                                        this.state.daotaos.map(dt =>
                                            <MenuItem value={dt.idtrinhDo}>{dt.tenTrinhDo}</MenuItem>)
                                    }
                                </StyledGioiTinh>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Button
                    className="mt-5 ml-2"
                    variant="contained"
                    color="primary"
                    type="submit"
                    startIcon={<DoneAllIcon />}
                    onClick={this.checkHideModal()}
                >XÁC NHẬN
                </Button>

            </Form>
        )
    }

    render() {
        return (
            <div className="container">

                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={this.state.snackbaropen}
                    autoHideDuration={3000}
                    onClose={this.SnackbarClose}
                    message={<span id="message-id">{this.state.snackbarmsg}</span>}
                    action={[
                        <IconButton key="close" arial-label="Close" color="inherit" onClick={this.SnackbarClose}>
                            x
                        </IconButton>
                    ]}
                />

                <Modal
                    {...this.props}
                    size="xl"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            CHỈNH SỬA THÔNG TIN ỨNG VIÊN
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        {this.showModalBoby()}

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