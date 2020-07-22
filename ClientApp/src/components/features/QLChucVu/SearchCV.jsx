import React, { Component } from 'react';
import EditCV from './EditCV';

class SearchCV extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cvObj: {},
            tempValue: ''
        }
    }


    hienThiNut = () => {
        if (this.props.hienThiForm === true) {
            return <div className="btn btn-block btn-secondary" onClick={() => this.props.ketNoi()} >Đóng lại</div>
        }
        else {
            return <div className="btn btn-block btn-info" onClick={() => this.props.ketNoi()}>Thêm mới</div>
        }
    }

    getCVEditInfo = (info) => {//85134lay thong tin can sua
        this.setState({
            cvObj: info
        })
        this.props.getCVEditInfo(info)
    }

    isShowEditForm = () => {
        if (this.props.editCVStatus === true) {
            return <EditCV
                getCVEditInfo={(info) => this.getCVEditInfo(info)}//85134lay thong tin can sua

                CVEditObject={this.props.CVEditObject}
                changeEditCVStatus={() => this.props.changeEditCVStatus()} />
        }
    }

    isChange = (event) => {
        console.log(event.target.value);
        
        this.setState({
            // [name]: value
            tempValue: event.target.value
        })
       // this.props.getTextSearch(this.state.tempValue)        
    }


    render() {
        return (
            <div className="col-12">
                {this.isShowEditForm()}
                <div className="form-group">
                    <div className="btn-group">
                        <input onChange={(event) => this.isChange(event)} type="text" className="form-control" placeholder="Nhập từ khóa" />
                    </div>
                    <div className="btn-group">
                        <div onClick={(dl) => this.props.getTextSearch(this.state.tempValue)} className="btn btn-info">Tìm</div>
                    </div>
                    <div className="btn-group">
                        {this.hienThiNut()}
                    </div>

                </div>
                <hr></hr>

            </div>
        );
    }
}

export default SearchCV;