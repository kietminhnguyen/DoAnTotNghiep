import React, { Component } from 'react';
import axios from 'axios';
import { TextField, Button } from '@material-ui/core'
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { Redirect } from 'react-router-dom';

export class AppNguoiDung extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showPassOLD: false,
            showPassNEW: false,
            showPassRE: false,
            isLogin: true,
            taikhoans: [],
            tkToken: []
        };
        //this.skLuu = this.skLuu.bind(this);
    }

    componentDidMount() {
        fetch('https://localhost:44390/api/taikhoans')
            .then(response => response.json())
            .then(data => {
                this.setState({ taikhoans: data });
            });
    }

    componentWillMount() {
        if (localStorage && localStorage.getItem('token')) {
            var tkToken = JSON.parse(localStorage.getItem('token'))
            this.setState({
                tkToken: tkToken
            })
        }
    }

    layTk = () => {
        var tk = ''
        for (let i = 0; i < this.state.taikhoans.length; i++) {
            for (let j = 0; j < this.state.tkToken.length; j++) {
                if (this.state.taikhoans[i].username == this.state.tkToken[j].username) {
                    tk = this.state.tkToken[j].username
                }
            }
        }
        return tk
    }

    layMk = () => {
        var mk = ''
        for (let i = 0; i < this.state.taikhoans.length; i++) {
            for (let j = 0; j < this.state.tkToken.length; j++) {
                if (this.state.taikhoans[i].password == this.state.tkToken[j].password) {
                    mk = this.state.tkToken[j].password
                }
            }
        }
        return mk
    }

    layMail = () => {
        var mail = ''
        for (let i = 0; i < this.state.taikhoans.length; i++) {
            for (let j = 0; j < this.state.tkToken.length; j++) {
                if (this.state.taikhoans[i].mail == this.state.tkToken[j].mail) {
                    mail = this.state.tkToken[j].mail
                }
            }
        }
        return mail
    }

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    handleClickShowPassOLD = () => {
        this.setState({
            showPassOLD: !this.state.showPassOLD,
        });
    };
    handleClickShowPassNEW = () => {
        this.setState({
            showPassNEW: !this.state.showPassNEW,
        });
    };
    handleClickShowPassRE = () => {
        this.setState({
            showPassRE: !this.state.showPassRE,
        });
    };

    skLuu = (event) => {
        event.preventDefault();
        var tk = ''
        var mk = ''
        var mail = ''
        for (let i = 0; i < this.state.tkToken.length; i++) {
            tk = this.state.tkToken[i].username
            mk = this.state.tkToken[i].password
            mail = this.state.tkToken[i].mail
        }
        // console.log(tk);
        // console.log(mk);
        // console.log(mail);
        // console.log(event.target.NEWpassword.value);
        if (mk !== event.target.OLDpassword.value
            || (event.target.NEWpassword.value !== event.target.REpassword.value)
            || event.target.NEWpassword.value == ''
        ) {
            //console.log("sai");
            alert("Vui lòng kiểm tra lại!!!")
        }
        else {
            //console.log("Đúng");
            if (window.confirm('Bạn có chắc muốn đổi mật khẩu?')) {
                axios.put('https://localhost:44390/api/taikhoans/' + tk, {
                    username: tk,
                    password: event.target.NEWpassword.value,
                    mail: mail,
                })
                localStorage.removeItem("token");
                this.setState({
                    isLogin: false
                })
                alert("Đổi mật khẩu thành công. Vui lòng đăng nhập lại")
            }
        }
    }

    render() {
        if (!this.state.isLogin) {
            return <Redirect to="/login" />
        }
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
                    <hr />
                    <div className="tab-content ml-1" id="myTabContent">
                        <div className="tab-pane fade show active" id="basicInfo" role="tabpanel" aria-labelledby="basicInfo-tab">
                            <div className="row">
                                <div className="col-sm-3 col-md-2 col-5">
                                    <label style={{ fontWeight: 'bold' }}>Tài khoản:</label>
                                </div>
                                <div className="col-md-8 col-6">
                                    {this.layTk()}
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 col-md-2 col-5">
                                    <label style={{ fontWeight: 'bold' }}>Ngày tạo:</label>
                                </div>
                                <div className="col-md-8 col-6">
                                    {this.layMail()}
                                </div>
                            </div>
                            <hr /><hr />
                        </div>

                        <div className="tab-pane fade" id="connectedServices" role="tabpanel" aria-labelledby="ConnectedServices-tab">
                            <form onSubmit={this.skLuu}>
                                <div className="form-group">
                                    <FormControl variant="outlined" className="mt-3">
                                        <InputLabel>Mật khẩu cũ</InputLabel>
                                        <OutlinedInput
                                            //id="outlined-adornment-password"
                                            name="OLDpassword"
                                            type={this.state.showPassOLD ? 'text' : 'password'}
                                            //value={this.state.showPassOLD}
                                            //onChange={(event) => this.handleChange(event)}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        //aria-label="toggle password visibility"
                                                        onClick={this.handleClickShowPassOLD}
                                                        onMouseDown={this.handleMouseDownPassword}
                                                        onMouseUp={this.handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {this.state.showPassOLD ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            labelWidth={90}
                                        />
                                    </FormControl>
                                </div>
                                <div className="form-group">
                                    <FormControl variant="outlined" className="mt-3">
                                        <InputLabel>Mật khẩu mới</InputLabel>
                                        <OutlinedInput
                                            name="NEWpassword"
                                            type={this.state.showPassNEW ? 'text' : 'password'}
                                            //value={this.state.showPassOLD}
                                            //onChange={(event) => this.handleChange(event)}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={this.handleClickShowPassNEW}
                                                        onMouseDown={this.handleMouseDownPassword}
                                                        onMouseUp={this.handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {this.state.showPassNEW ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            labelWidth={100}
                                        />
                                    </FormControl>
                                </div>
                                <div className="form-group">
                                    <FormControl variant="outlined" className="mt-3">
                                        <InputLabel>Nhập lại mật khẩu</InputLabel>
                                        <OutlinedInput
                                            name="REpassword"
                                            type={this.state.showPassRE ? 'text' : 'password'}
                                            //value={this.state.showPassOLD}
                                            //onChange={(event) => this.handleChange(event)}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={this.handleClickShowPassRE}
                                                        onMouseDown={this.handleMouseDownPassword}
                                                        onMouseUp={this.handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {this.state.showPassRE ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            labelWidth={130}
                                        />
                                    </FormControl>
                                </div>


                                <div className="form-group">
                                    <Button
                                        className="mt-3"
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        startIcon={<DoneAllIcon />}
                                    //onClick={(event) => {this.skLuu(event)}}
                                    >XÁC NHẬN</Button>
                                </div>
                            </form>
                        </div>

                    </div>

                </div>
            </div>

        );
    }
}
