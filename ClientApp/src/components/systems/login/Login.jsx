import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './login.css'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class Login extends Component {

    constructor(props) {
        super(props);

        const token = localStorage.getItem("token");
        let isLogin = true;
        if (token == null) {
            isLogin = false;
        }

        this.state = {
            taikhoans: [],
            signupname: "",
            signuppass: "",
            signuprepass: "",
            signupmail: "",
            username: "",
            password: "",
            isLogin: isLogin

        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChange = this.onChange.bind(this);
        this.onLogin = this.onLogin.bind(this);
    }

    componentDidMount() {
        this.loadTK()
    }
    componentDidUpdate() {
        this.loadTK()
    }

    loadTK() {
        fetch('https://localhost:44390/api/taikhoans')
            .then(response => response.json())
            .then(data => {
                this.setState({ taikhoans: data });
            });
    }

    onChange(event) {
        // this.setState({
        //     [e.target.name]: e.target.value
        // })
        var target = event.target
        var name = target.name
        var value = target.value
        this.setState({
            [name]: value
        })
    }

    onLogin() {
        const { username, password } = this.state;
        let flag = false
        let mangTam = []
        for (let i = 0; i < this.state.taikhoans.length; i++) {
            if (username === this.state.taikhoans[i].username && password === this.state.taikhoans[i].password) {
                mangTam.push({
                    username: this.state.taikhoans[i].username,
                    password: this.state.taikhoans[i].password,
                    mail: this.state.taikhoans[i].mail
                })
                flag = true
                //alert('ok')
                //alert('Tài khoản hoặc Mật khẩu không chính xác')
            }
        }
        if (flag) {
            localStorage.setItem("token", JSON.stringify(mangTam));
            this.setState({
                isLogin: true
            });
        }
        else {
            alert('Tài khoản hoặc Mật khẩu không chính xác')
        }
        //console.log(mangTam)
    }

    SignUp = () => {

        // if (this.state.signuppass === this.state.signuprepass) {
        //     firebase.database().ref('TAIKHOAN/' + this.state.signupname).set(
        //         {
        //             user: this.state.signupname,
        //             pass: this.state.signuppass,
        //             mail: this.state.signupmail
        //         }
        //     ).then(() => {
        //         alert("Thêm thành công");
        //         window.location.reload();
        //     }).catch((error) => {
        //         alert("Thêm thất bại");
        //     });
        // } else {
        //     alert("Mật khẩu chưa trùng")
        // }

        // if (this.state.signuppass === this.state.signuprepass) {
        //     fetch('https://localhost:44398/api/taikhoans/' + this.state.signupname, {
        //         method: 'POST',
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             username: this.state.signupname,
        //             password: this.state.signuppass,
        //             mail: this.state.signupmail
        //         })
        //     })
        //         .then(res => res.json())
        //         .then(() => {
        //             alert("Tạo thành công");
        //             window.location.reload();
        //         }).catch((error) => {
        //             alert("Tạo thất bại");
        //         });
        // }
        // else {
        //     alert("Mật khẩu chưa trùng")
        // }
    }

    handleSubmit(event) {
        // event.preventDefault();
        // //alert(event.target.PhongbanTEN.value)
        // fetch('https://localhost:44398/api/taikhoans/', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         username: event.target.TKusername.value,
        //         password: event.target.TKpassword.value,
        //         mail: event.target.TKmail.value
        //     })
        // })
        //     .then(res => res.json())
        //     .then(() => {
        //         //alert('thanh cong');
        //         this.setState({ snackbaropen: true, snackbarmsg: "Thêm thành công" });
        //     })
        // alert('ok')
    }

    rand() {
        return Math.random().toString(36).substr(2);
    };

    createToken() {
        //return this.rand() + this.rand();
    };

    render() {
        if (this.state.isLogin) {
            return <Redirect to="/" />
        }
        return (
            <div className="login-wrap">
                <div className="login-html">
                    <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked /><label htmlFor="tab-1" className="tab">Đăng nhập</label>
                    <input id="tab-2" type="radio" name="tab" className="sign-up" /><label htmlFor="tab-2" className="tab"></label>
                    <div className="login-form">

                        <div className="sign-in-htm">
                            <div className="group">
                                <label htmlFor="user" className="label">Tài khoản</label>
                                <input name="username" type="text" className="input"
                                    value={this.state.username} onChange={this.onChange} />
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">Mật khẩu</label>
                                <input name="password" type="password" className="input" data-type="password"
                                    value={this.state.password} onChange={this.onChange} />
                            </div>
                            {/* <div className="group">
                                <input id="check" type="checkbox" className="check" defaultChecked />
                                <label htmlFor="check"><span className="icon" /> Keep me Signed in</label>
                            </div> */}
                            <div className="group">
                                <input type="button" className="button" defaultValue="Đăng nhập" onClick={this.onLogin} />
                            </div>
                            <div className="hr" />
                            {/* <div className="foot-lnk">
                                <a href="#forgot">Forgot Password?</a>
                            </div> */}
                        </div>
                        
                        {/*                         
                        <div className="sign-up-htm">
                            <div className="group">
                                <label htmlFor="user" className="label">Username</label>
                                <input name="signupname" id="user" type="text" className="input" value={this.state.signupname} onChange={this.onChange} />
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">Password</label>
                                <input name="signuppass" id="pass" type="password" className="input" data-type="password" value={this.state.signuppass} onChange={this.onChange} />
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">Repeat Password</label>
                                <input name="signuprepass" id="pass" type="password" className="input" data-type="password" value={this.state.signuprepass} onChange={this.onChange} />
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">Email Address</label>
                                <input name="signupmail" id="pass" type="text" className="input" value={this.state.signupmail} onChange={this.onChange} />
                            </div>
                            <div className="group" onSubmit={this.handleSubmit}>
                            <input type="submit" className="button" defaultValue="Sign Up" onClick={this.SignUp} />
                            <input type="submit" className="button" defaultValue="Sign Up"/>
                            </div>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="TKusername">
                                    <Form.Label>Tài khoản</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="TKusername"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="TKpassword">
                                    <Form.Label>Mật khẩu</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="TKpassword"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="TKmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="TKmail"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Button variant="primary" type="submit" >
                                        Tạo tài khoản
                                    </Button>
                                </Form.Group>
                            </Form>
                            <div className="hr" />
                            <div className="foot-lnk">
                                <label htmlFor="tab-1">Đã có tài khoản</label>
                            </div>
                        </div>
                    */}
                    </div>
                </div>
            </div>
        )
    }
}
