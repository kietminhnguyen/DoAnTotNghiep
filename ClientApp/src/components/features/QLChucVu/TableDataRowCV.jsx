import React, { Component } from 'react';

class TableDataRowCV extends Component {

    deleteDataCV = () => {   
        this.props.deleteDataCV(this.props.CHUCVU.key)
        alert("Xóa thành công");
    }

    //------Edit data--------
    editDataCV = () =>{
        this.props.changeEditCVStatus()
        this.props.editDataCV()        
    }

    render() {
        return (
            <tr>
                <td >{this.props.stt + 1}</td>
                <td >{this.props.MACV}</td>
                <td >{this.props.TENCV}</td>
                <td >{this.props.MOTA}</td>
                <td >
                    <div className="btn btn-warning"  onClick={() => this.editDataCV()}><i className="ik ik-edit-2" />Sửa</div>
                    <div className="btn btn-danger" onClick={() => this.deleteDataCV()}><i className="ik ik-trash-2" />Xóa</div>
                </td>
            </tr>
        );
    }
}

export default TableDataRowCV;