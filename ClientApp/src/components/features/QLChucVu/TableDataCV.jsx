import React, { Component } from 'react';
import TableDataRowCV from './TableDataRowCV';
import { FirebaseConnCV } from '../firebaseConnect';

class TableDataCV extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataFirebase: []
        }
    }

    //----show data129------
    componentWillMount() {
        FirebaseConnCV.on('value', (CVs) => {
            var arrayData = []
            CVs.forEach(element => {
                const key = element.key
                const MACV = element.val().MACV
                const TENCV = element.val().TENCV
                const MOTA = element.val().MOTA
                arrayData.push({
                    key: key,
                    MACV: MACV,
                    TENCV: TENCV,
                    MOTA: MOTA
                })
            });
            this.setState({
                dataFirebase: arrayData
            })
        })
    }

    getData = () => {
        if (this.state.dataFirebase) {
            
            return this.state.dataFirebase.map((value, key) => {
                return (
                    <TableDataRowCV

                    deleteDataCV={(key) => this.deleteDataCV(key)}

                    editDataCV={(CHUCVU)=>this.props.editDataCV(value)}
                    changeEditCVStatus={() => this.props.changeEditCVStatus()}

                        key={key}
                        stt={key}
                        CHUCVU={value}//133
                        MACV={value.MACV}
                        TENCV={value.TENCV}
                        MOTA={value.MOTA}>

                    </TableDataRowCV>
                )
            })
        }

    }

    //------Delete data139--------
    deleteDataCV = (key) =>{
        this.props.deleteDataCV(key)
    }

    //------Edit data--------
    editDataCV = (CV) =>{
        this.props.editDataCV(CV)
    }

    render() {
     
        return (
            <div className="col">
                <table className="table table-striped table-inverse table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Mã chức vụ</th>
                            <th>Tên chức vụ</th>
                            <th>Mô tả</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getData()}
                        {/* 3user{this.mappingDataCV()} */}

                        {/* 2l{this.props.dataCV} */}

                        {/* 1{this.mappingData()} */}
                    </tbody>
                </table>
            </div>

        );
    }
}

export default TableDataCV;