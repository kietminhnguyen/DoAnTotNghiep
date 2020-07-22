import React, {Component} from 'react';
import * as firebase from "firebase";

export class User extends Component {
    static displayName = User.name;

    constructor(props) {
        super(props);
        this.state = {
            taikhoans: [],
        };
    }

    componentDidMount(){
        const rootRef = fetch('https://localhost:44398/api/taikhoans')
            .then(response => response.json())
            .then(data => {
                this.setState({ taikhoans: data });
            });
    }

    Xoa(key){
        var adaRef = firebase.database().ref('TAIKHOAN/'+key);
        adaRef.remove()
            .then(function() {

            })
            .catch(function(error) {
                alert("Remove failed: " + error.message)
            });
    }

    mappingData = () =>{
        const row = this.state.user.map((value,index) => {
            return (
                <tr key={index}>
                    <th >{index+1}</th>
                    <th >{value.user}</th>
                    <th >{value.pass}</th>
                    <th ><button className="btn btn-dark" onClick={ ()=>this.Xoa(value.user)}>Xóa</button></th>
                </tr>
            )
        });
        return row;
    }

    render() {

        return (
            <div>
                <div className="container">

                    <div style={{color : 'red'}}>
                    </div>
                    <h1>Quản lý người dùng</h1>
                    <div className="container">
                        <div className="row">
                            <div className="col col-lg-10">
                            <input type="text" placeholder="Tìm kiếm"></input>
                                <button className="btn btn-info">Tìm kiếm</button>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <table className="table table-bordered">
                        <thead className="thead-light text-center">
                        <tr>
                            <th className="width5">#</th>
                            <th className="width10">Tài Khoản</th>
                            <th className="width25">Mật Khẩu</th>
                            <th className="width10">Chức năng</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.mappingData()}

                        </tbody>
                    </table>



                </div>
            </div>
        );
    }
}
