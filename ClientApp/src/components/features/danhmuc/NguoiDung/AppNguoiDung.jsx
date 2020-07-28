import React, { Component } from 'react';
import { Form, Row, Col } from 'react-bootstrap'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, ButtonGroup, Button } from '@material-ui/core'

export class AppNguoiDung extends Component {

    constructor(props) {
        super(props);
        this.state = {
            taikhoans: [],
        };
    }


    render() {

        return (
            <div className="row">
                <div className="col-12">
                    <ul className="nav nav-tabs mb-4" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="basicInfo-tab" data-toggle="tab" href="#basicInfo" role="tab" aria-controls="basicInfo" aria-selected="true">Thông tin người dùng</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="connectedServices-tab" data-toggle="tab" href="#connectedServices" role="tab" aria-controls="connectedServices" aria-selected="false">Đổi mật khẩu</a>
                        </li>
                    </ul>

                    <div className="tab-content ml-1" id="myTabContent">
                        <div className="tab-pane fade show active" id="basicInfo" role="tabpanel" aria-labelledby="basicInfo-tab">
                            <div className="row">
                                <div className="col-sm-3 col-md-2 col-5">
                                    <label style={{ fontWeight: 'bold' }}>UserName</label>
                                </div>
                                <div className="col-md-8 col-6">
                                    Admin
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 col-md-2 col-5">
                                    <label style={{ fontWeight: 'bold' }}>Email</label>
                                </div>
                                <div className="col-md-8 col-6">
                                    admin123a@gmail.com
                            </div>
                            </div>
                            <hr />

                            <hr />
                        </div>
                        <div className="tab-pane fade" id="connectedServices" role="tabpanel" aria-labelledby="ConnectedServices-tab">
                            <div className="form-group">
                                <div className="col-sm-5">
                                    <label htmlFor="phone"><h4>Mật khẩu cũ</h4></label>
                                    <input type="password" className="form-control" name="phone" id="phone"  title="enter your phone number if any." />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-5">
                                    <label htmlFor="mobile"><h4>Mật khẩu mới</h4></label>
                                    <input type="password" className="form-control" name="mobile" id="mobile"  title="enter your mobile number if any." />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-5">
                                    <label htmlFor="mobile"><h4>Nhập lại mật khẩu</h4></label>
                                    <input type="password" className="form-control" name="mobile" id="mobile"  title="enter your mobile number if any." />
                                </div>
                            </div>


                            <div className="form-group">
                                <div className="col-xs-12">
                                    <br />
                                    <button className="btn btn-lg btn-success pull-right" type="submit"><i className="glyphicon glyphicon-ok-sign" /> Save</button>
                                    {/*<button class="btn btn-lg" type="reset"><i class="glyphicon glyphicon-repeat"></i> Reset</button>*/}
                                </div>
                            </div>



                        </div>

                    </div>

                </div>
            </div>

        );
    }
}
