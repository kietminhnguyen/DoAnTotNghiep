import React, { Component } from 'react';
import { ButtonToolbar, Table, Form, Row, Col } from 'react-bootstrap';
import { Label } from 'reactstrap';
import { format, differenceInDays, getDate } from 'date-fns'

import { Button, Input } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices'
import SaveIcon from '@material-ui/icons/Save'


import { ExcelRenderer, OutTable } from "react-excel-renderer";
import moment from 'moment';


//import { AddChamCongThuCong } from '../ChamCongThuCong/AddChamCongThuCong';
import { EditChamCongMaVach } from '../ChamCongMaVach/EditChamCongMaVach';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

const StyledInput = withStyles((theme) => ({
    root: {
        display: 'none',
    }
}))(Input);

export class AppChamCongMaVach extends Component {
    //static displayName = AppChamCongMaVach.name;

    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            cols: [],
            nhanviens: [],
            chamcongs: [],
            pbs: [],

            idphongBan: "",
            ngayChamCong: "",

            editModalShow: false,
            snackbaropen: false,
            snackbarmsg: ''
        };
        this.handleChange = this.handleChange.bind(this)
    }

    SnackbarClose = (event) => {
        this.setState({ snackbaropen: false });
    }

    componentDidMount() {
        this.loadChamCong()
        this.loadNV()
        this.loadPB()
    }

    componentDidUpdate() {
        this.loadChamCong()
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
        // console.log(name)
        // console.log(values)
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
        return <select className="ml-1 mt-2" value={this.state.idphongBan} name="idphongBan" onChange={this.handleChange}>
            {
                this.state.pbs.map(pb => {
                    return (
                        <option value={pb.idphongBan}>
                            {pb.tenPhongBan}
                        </option>
                    )
                })}
        </select>
    }

    //////////////////Import EXcel
    changeHandler(event) {
        let fileObj = event.target.files[0];
        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err);
            } else {
                this.setState({
                    cols: resp.cols,
                    rows: resp.rows
                });
                // console.log(this.state.rows.length);
                // console.log("count: " + this.state.rows.length)
                //console.log(this.state.rows)
                //console.log(this.state.cols)
                //this.ShowTable()
            }
        });
    }

    test(dates) {
        var ngay = new Date(Math.round((dates - 25569) * 86400 * 1000));
        const day = moment(ngay).format('DD/MM/YYYY');
        return day
    }

    converttime(num) {
        var fractional_day = num - Math.floor(num) + 0.0000001;
        var total_seconds = Math.floor(86400 * fractional_day);
        var seconds = total_seconds % 60;
        total_seconds -= seconds;
        var hours = Math.floor(total_seconds / (60 * 60));
        var minutes = Math.floor(total_seconds / 60) % 60;
        return hours + ":" + minutes;
    }


    /////////

    showTableData() {
        const { nhanviens, chamcongs, idchamcong, ccghichu, ccngay, ccgiovao, ccgiora, ccidnv } = this.state;
        let editModalClose = () => this.setState({ editModalShow: false })

        return this.state.rows.map((row, key) => {

            return (
                <tr >
                    <td>{key + 1}</td>
                    <td>{this.test(row[0])}</td>
                    <td>{row[1]}</td>
                    <td>{this.converttime(row[2])}</td>
                    <td>{this.converttime(row[3])}</td>
                </tr >)
        })
    }

    skButtonLuu = () => {
        //console.log(this.state.rows[0])
        var obj = Object.assign({}, [this.state.rows[0]]);
        //console.log(obj)

        // for(let ii=0; ii< obj.length; ii++){
        //     console.log(obj[ii])
        // }


        // var table = document.getElementById("mytab");
        // //console.log(table)
        // //console.log(row.cells)
        // var array=[]
        // for (var i = 0, row; row = table.rows[i]; i++)  {
        //     //for (var j = 0, col; col = row.cells[j]; j++) {
        //         //console.log(table.rows[i])
        //         array+= table.rows[i].value

        //     }

        // //}
        // console.log(array)
    }


    render() {
        return (
            <div>
                <div className="container text-center">
                    <h1 className="display-7">CHẤM CÔNG MÃ VẠCH</h1><hr /><hr />
                </div>

                <Form>
                    <Col sm={12}>
                        <Row>
                            <Col sm={10}>
                                <StyledInput
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    onChange={this.changeHandler.bind(this)}>
                                </StyledInput>
                                <label htmlFor="contained-button-file">
                                    <Button variant="contained"
                                        color="secondary"
                                        component="span"
                                        startIcon={<ImportantDevicesIcon />}>
                                        Lấy dữ liệu máy chấm công
                                        </Button>
                                </label>
                            </Col>

                            <Col sm={2} >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    startIcon={<SaveIcon />}
                                    onClick={() => this.skButtonLuu()}>
                                    Lưu
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Form>

                <Table className="mt-4" cells>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Ngày Chấm Công</th>
                            <th>ID Nhân Viên</th>
                            <th>Giờ Vào</th>
                            <th>Giờ Ra</th>
                        </tr>
                    </thead>
                    <tbody id="mytab">
                        {this.showTableData()}
                    </tbody>

                </Table>

                {/* <OutTable
                    data={this.state.rows}
                    columns={this.state.cols}
                    tableClassName="ExcelTable2007"
                    tableHeaderRowClass="heading">
                </OutTable> */}

            </div>
        )
    }
}