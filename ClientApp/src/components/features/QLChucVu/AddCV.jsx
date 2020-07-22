import React, { Component } from 'react';

class AddCV extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataFirebase: [],
            MACV: '',
            TENCV: '',
            MOTA: ''
        }
    }

    isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState({
            [name]: value
        })
    }

    addData = (MACV, TENCV, MOTA) => {
        var item = {}
        item.MACV = MACV
        item.TENCV = TENCV
        item.MOTA = MOTA
        this.props.add(item)
        alert("Thêm thành công")
    }

    kiemTraTrangThai = () => {
        if (this.props.hienThiForm === true) {
            return (
                <div className="col">
                    <form>
                    <div className="card border-primary mb-3 mt-2" style={{ maxWidth: '18rem' }}>
                        <div className="card-header">Thêm mới chức vụ</div>
                        <div className="card-body text-primary">
                            <div className="form-group">
                                <label>Mã chức vụ</label>
                                <input onChange={(event) => this.isChange(event)} name="MACV" type="text" className="form-control" placeholder="Nhập mã" />
                            </div>
                            <div className="form-group">
                                <label>Tên chức vụ</label>
                                <input onChange={(event) => this.isChange(event)} name="TENCV" type="text" className="form-control" placeholder="Nhập tên" />
                            </div>
                            <div className="form-group">
                                <label>Mô tả</label>
                                <input onChange={(event) => this.isChange(event)} name="MOTA" type="text" className="form-control" placeholder="Nhập mô tả" />
                            </div>
                            <div className="form-group">
                                <input type="reset" className="btn btn-block btn-primary" onClick={() => this.addData(this.state.MACV, this.state.TENCV, this.state.MOTA)} value="Thêm mới"/>
                                {/* <div className="btn btn-block btn-primary" onClick={this.addData}>Thêm mới</div> */}
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
            )
        }
    }


    //Tương tác 2 button trong 1 component
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         trangThaiChinhSua: false
    //     }
    // }

    // thayDoiTrangThai = () => {
    //     this.setState({
    //         trangThaiChinhSua: !this.state.trangThaiChinhSua
    //     })
    // }

    // hienThiNut = () => {
    //     if (this.state.trangThaiChinhSua === true) {
    //         return <div className="btn btn-block btn-secondary" onClick={() => this.thayDoiTrangThai()}>Đóng lại</div>
    //     }
    //     else {
    //         return <div className="btn btn-block btn-info" onClick={() => this.thayDoiTrangThai()} >Thêm mới</div>
    //     }
    // }

    // hienThiForm = () => {
    //     if (this.state.trangThaiChinhSua === true) {
    //         return (
    //             <div className="card border-primary mb-3 mt-2" style={{ maxWidth: '18rem' }}>
    //                 <div className="card-header">Thêm mới phòng ban</div>
    //                 <div className="card-body text-primary">
    //                     <div className="form-group">
    //                         <label>Mã phòng ban</label>
    //                         <input type="text" className="form-control" placeholder="Nhập mã" />
    //                     </div>
    //                     <div className="form-group">
    //                         <label>Tên phòng ban</label>
    //                         <input type="text" className="form-control" placeholder="Nhập tên" />
    //                     </div>
    //                     <div className="form-group">
    //                         <label>Mô tả</label>
    //                         <input type="text" className="form-control" placeholder="Nhập mô tả" />
    //                     </div>
    //                     <div className="form-group">
    //                         <div className="btn btn-block btn-primary">Thêm mới</div>
    //                     </div>
    //                 </div>
    //             </div>
    //         )
    //     }
    // }

    render() {
        return (
            <div>

                {/* {this.hienThiNut()}
                {this.hienThiForm()} */}

                {this.kiemTraTrangThai()}

            </div>

        );
    }
}

export default AddCV;