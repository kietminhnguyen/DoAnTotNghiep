if (window.confirm('Bạn có chắc muốn bổ nhiệm ứng viên này?')) {
    alert("Bổ nhiệm thành công")
}

if (window.confirm('Bạn có chắc muốn xóa quyết định này?')) {
    axios.delete('https://localhost:44390/api/quyetdinhkts/' + idqd)
        .then(response => {
            //this.setState({ arrayBL: response.data })
            alert("Xóa thành công")
        })
        .catch(error => {
            //this.setState({ showError: "Lỗi post dữ liệu" })
            alert("Xóa không thành công")
        })
}

// InputLabelProps={{
//     shrink: true,
// }}

// InputProps={{
//     readOnly: true,
// }}

// axios.detele('https://localhost:44390/api/quyetdinhbonhiems/' + idbn)
            //     .then(response => {
            //         if (response.data != null) {
            //             this.setState({
            //                 qdbns: this.state.qdbns.filter(bn => bn.idquyetDinhBn !== idbn)
            //             })
            //         }
            //     })