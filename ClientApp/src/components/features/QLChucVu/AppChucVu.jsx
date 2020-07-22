import React, { Component } from 'react';
import HeaderCV from './HeaderCV';
import SearchCV from './SearchCV';
import TableDataCV from './TableDataCV';
import AddCV from './AddCV';
import { FirebaseConnCV } from '../firebaseConnect';
import * as firebase from 'firebase';

export class AppChucVu extends Component {

    constructor(props) {
        super(props)
        this.state = {
            FirebaseConnCV:[],
            hienThiForm: false,
            editCVStatus: false,
            CVEditObject: {},//83
            searchText:''
        }
    }

    changeEditCVStatus = () => {
        this.setState({
            editCVStatus: !this.state.editCVStatus
        })
    }

    doiTrangThai = () => {
        this.setState({
            hienThiForm: !this.state.hienThiForm
        })
    }

    //--------tim kiem--------
    getTextSearch = (dl) => {
        this.setState({
            searchText: dl
        });
    }   

    //--------them data-------
    addDataCV = (item) => {
        var connectData = firebase.database().ref('CHUCVU/')
        connectData.push(item)
    }

    //------xoa data139--------
    deleteDataCV = (key) => {
        FirebaseConnCV.child(key).remove()
    }

    //--------sua data--------
    editDataCV = (itemRow) => {
        this.setState({//83
            CVEditObject: itemRow
        })
    }

    getCVEditInfo = (info) => {//85134lay thong tin can sua 
        FirebaseConnCV.child(info.key).update({
            MACV : info.MACV,
            TENCV : info.TENCV,
            MOTA : info.MOTA
        })
    }

    render() {
        var ketqua = []
        this.state.FirebaseConnCV.forEach((item)=>{
            if(item.TENCV.indexOf(this.state.searchText) !== -1){
                ketqua.push(item);
            }
        })
        console.log(ketqua);
        
        return (
            <div>
                <HeaderCV></HeaderCV>
                <div className="searchForm">
                    <div className="container">
                        <div className="row">
                            <SearchCV
                                getTextSearch = {(dl)=>this.getTextSearch(dl)}

                                getCVEditInfo = {(info)=> this.getCVEditInfo(info)}
                                CVEditObject={this.state.CVEditObject}
                                ketNoi={() => this.doiTrangThai()}
                                hienThiForm={this.state.hienThiForm}
                                editCVStatus={this.state.editCVStatus}
                                changeEditCVStatus={() => this.changeEditCVStatus()}>
                            </SearchCV>
                            <TableDataCV
                                changeEditCVStatus={() => this.changeEditCVStatus()}
                                deleteDataCV={(key) => this.deleteDataCV(key)}
                                editDataCV={(itemRow) => this.editDataCV(itemRow)}>
                            </TableDataCV>
                            <AddCV
                                hienThiForm={this.state.hienThiForm}
                                add={(item) => this.addDataCV(item)}>
                            </AddCV>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}
