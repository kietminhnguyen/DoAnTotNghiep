import React, { Component } from 'react';

class EditCV extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: this.props.CVEditObject.key,
            MACV: this.props.CVEditObject.MACV,
            TENCV: this.props.CVEditObject.TENCV,
            MOTA: this.props.CVEditObject.MOTA
        }
    }

    isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name);
        console.log(value);
        this.setState({
            [name]: value
        })
    }

    //85134lay thong tin can sua
    saveButton = () => {
        var info = {}
        info.key = this.state.key
        info.MACV = this.state.MACV
        info.TENCV = this.state.TENCV
        info.MOTA = this.state.MOTA
        
        this.props.getCVEditInfo(info)
        this.props.changeEditCVStatus() // tat form
        alert("Sửa thành công");
    }

    render() { 
        return (
            <div className="row">
                <div className="col">
                    <div className="card border-primary mb-3 mt-2" >
                        <h3 className="text-center"><div className="card-header">Chỉnh sửa chức vụ</div></h3>
                        
                        <div className="card-body text-primary">
                            <div className="form-group">
                                <label>Mã chức vụ</label>
                                {/* defaultValue83 */}
                                <input onChange={(event)=>this.isChange(event)} defaultValue={this.props.CVEditObject.MACV} name="MACV" type="text" className="form-control" placeholder="Nhập mã" disabled />
                            </div>
                            <div className="form-group">
                                <label>Tên chức vụ</label>
                                <input onChange={(event)=>this.isChange(event)} defaultValue={this.props.CVEditObject.TENCV} name="TENCV" type="text" className="form-control" placeholder="Nhập tên" />
                            </div>
                            <div className="form-group">
                                <label>Mô tả</label>
                                <input onChange={(event)=>this.isChange(event)} defaultValue={this.props.CVEditObject.MOTA} name="MOTA" type="text" className="form-control" placeholder="Nhập mô tả" />
                            </div>
                            <div className="form-group">
                                {/* <div className="btn btn-block btn-primary" onClick={() => this.addData(this.state.MACV, this.state.TENCV, this.state.MOTA)}>Thêm mới</div> */}
                                <div className="btn btn-block btn-primary" onClick={()=>this.saveButton()}>Lưu</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditCV;