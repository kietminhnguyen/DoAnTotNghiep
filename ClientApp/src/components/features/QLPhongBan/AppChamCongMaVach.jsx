import React, { Component } from 'react';
import { Button, ButtonToolbar, Table, Form, Row, Col } from 'react-bootstrap';
import { Label } from 'reactstrap';
import { FormRow } from 'react-bootstrap/Form';
import { format, differenceInDays, getDate } from 'date-fns'

import { AddChamCongThuCong } from '../ChamCongThuCong/AddChamCongThuCong';
import { EditChamCongMaVach } from '../ChamCongMaVach/EditChamCongMaVach';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';


export class AppChamCongMaVach extends Component {
    //static displayName = AppBangChamCong.name;

    constructor(props) {
        super(props);
        this.state = {
            nhanviens: [],
            chamcongs: [],
            ChonNgayChamCong: '',
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

    layTenNV = (idNVofCC) => {
        for (let i = 0; i < this.state.nhanviens.length; i++) {
            if (idNVofCC == this.state.nhanviens[i].idnhanVien) {
                idNVofCC = this.state.nhanviens[i].hoDem + " " + this.state.nhanviens[i].ten
            }
        }
        return idNVofCC
    }

    handleChange = (event) => {
        const name = event.target.name;
        const values = event.target.value;
        //console.log(values.substring(0,10))
        // var result = format(new Date(values), 'yyyy-MM-dd')

        this.setState({
            ChonNgayChamCong: values
        })
        //console.log(result)
    }

    showTableData() {
        const { chamcongs, idchamcong, ccghichu, ccngay, ccgiovao, ccgiora, ccidnv } = this.state;
        let editModalClose = () => this.setState({ editModalShow: false })

        return chamcongs.map((cc, key) => {
            if(cc.ngayChamCong.substring(0,10) == this.state.ChonNgayChamCong || this.state.ChonNgayChamCong==''){
                return (<tr key={cc.idchamCong}>
                    <td>{key + 1}</td>
                    <td>{this.layTenNV(cc.idnhanVien)}</td>
                    <td>{cc.idnhanVien}</td>
                    <td>{format(new Date(cc.ngayChamCong), 'dd-MM-yyyy')}</td>
                    <td>{cc.gioVao.substring(0, 5)}</td>
                    <td>{cc.gioRa.substring(0, 5)}</td>
                    <td>{cc.soGioLam}</td>
                    <td>
                        <ButtonToolbar>
                            <Button className="mr-2" variant="warning"
                                onClick={() => this.setState({
                                    editModalShow: true,
                                    idchamcong: cc.idchamCong,
                                    ccngay: cc.ngayChamCong.substring(0, 10),
                                    ccghichu: cc.ghiChu,
                                    ccgiovao: cc.gioVao,
                                    ccgiora: cc.gioRa,
                                    ccidnv: cc.idnhanVien,
                                })}
                            ><i className="ik ik-edit-2" />
                            Sửa </Button>
    
                            <Button className="mr-2" variant="danger"
                                onClick={() => this.deleteChamCong(cc.idchamCong)}
                            ><i className="ik ik-trash-2" />
                            Xóa</Button>
    
                            <Button className="mr-2" variant="info">
                                Xem full thông tin </Button>
    
                            <EditChamCongMaVach
                                show={this.state.editModalShow}
                                onHide={editModalClose}
                                idchamcong={idchamcong}
                                ccngay={ccngay}
                                ccghichu={ccghichu}
                                ccgiovao={ccgiovao}
                                ccgiora={ccgiora}
                                ccidnv={ccidnv}
                            />
                        </ButtonToolbar>
                    </td>
                </tr>)
            }
            
        })
    }

    locNgayChamCong = () => {
        //console.log("lay dc: " + this.state.ChonNgayChamCong)
        for(let i=0; i<this.state.chamcongs.length; i++){
            if(this.state.chamcongs[i].ngayChamCong.substring(0,10) == this.state.ChonNgayChamCong){
                // {this.showTableData()}
                
                //console.log("ngay nhap: "+this.state.ChonNgayChamCong)
                //console.log("ngay: "+this.state.chamcongs[i].ngayChamCong.substring(0,10))
                
            }else{
                console.log("ngay khong dung")
            }        
        }
    }

    render() {


        return (
            <div>
                <div className="container text-center">
                    <h1 className="display-7">CHẤM CÔNG MÃ VẠCH</h1><hr />
                </div>
                <Form>
                    <Row><Form.Label className="mt-2">Chọn ngày:</Form.Label>
                        <Col sm={3}>
                            <Form.Group controlId="ChonNgayChamCong">
                                
                                <Form.Control
                                    type="date"
                                    name="ChonNgayChamCong"
                                    required
                                    onChange={(event) => this.handleChange(event)}
                                />
                            </Form.Group>
                        </Col>
                        <Button className="mt-1" variant="info" onClick={()=>this.locNgayChamCong()}>Lọc</Button>
                    </Row>


                </Form>

                <Table className="mt-4">
                    <thead className="">
                        <tr>
                            <th>#</th>
                            <th>Tên Nhân Viên</th>
                            <th>ID Nhân Viên</th>
                            <th>Ngày Chấm Công</th>
                            <th>Giờ Vào</th>
                            <th>Giờ Ra</th>
                            <th>Số Giờ Làm</th>
                            <th>Chức Năng</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* {this.locNgayChamCong()} */}
                        {this.showTableData()}
                    </tbody>

                </Table>
            </div>
        )
    }
}