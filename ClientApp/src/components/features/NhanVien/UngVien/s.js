<Row>
    <Col sm={12}>
        <Form onSubmit={this.handleSubmit}>
            <Row >

                <Col sm={3}>

                    <Form.Group controlId="UngvienHO">
                        <Form.Label>Họ đệm</Form.Label>
                        <Form.Control
                            type="text"
                            name="UngvienHO"
                            required
                        //defaultValue={this.props.uvho}

                        />
                    </Form.Group>

                    <Form.Group controlId="UngvienNoiSinh">
                        <Form.Label>Nơi sinh</Form.Label>
                        <Form.Control
                            type="text"
                            name="UngvienNoiSinh"
                            required
                        //defaultValue={this.props.uvnoisinh}

                        />
                    </Form.Group>

                    <Form.Group controlId="UngvienSoCMNN">
                        <Form.Label>Số CMNN</Form.Label>
                        <Form.Control
                            type="text"
                            name="UngvienSoCMNN"
                            required
                            defaultValue={this.props.uvsocmnd}

                        />
                    </Form.Group>

                    <Form.Group controlId="UngvienDanToc">
                        <Form.Label>Dân Tộc</Form.Label>
                        <Form.Control as="select" defaultValue={this.props.uvdantoc}>
                            {this.state.dts.map(dt =>
                                <option key={dt.iddanToc} value={dt.iddanToc}>{dt.tenDanToc}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="UngvienEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            name="UngvienEmail"
                            required
                            defaultValue={this.props.uvmail}

                        />
                    </Form.Group>

                </Col>


                <Col sm={3}>

                    <Form.Group controlId="UngvienTEN">
                        <Form.Label>Tên</Form.Label>
                        <Form.Control
                            type="text"
                            name="UngvienTEN"
                            required
                        //defaultValue={this.props.uvten}

                        />
                    </Form.Group>

                    <Form.Group controlId="UngvienNgaySinh">
                        <Form.Label>Ngày Sinh</Form.Label>
                        <Form.Control
                            type="date"
                            name="UngvienNgaySinh"
                            required
                        //defaultValue={this.props.uvngaysinh}
                        />
                    </Form.Group>

                    <Form.Group controlId="UngvienNgNgayCapCMMM">
                        <Form.Label>Ngày Cấp CMNN</Form.Label>
                        <Form.Control
                            type="date"
                            name="UngvienNgNgayCapCMMM"
                            required
                        //defaultValue={this.props.uvngaycap}

                        />
                    </Form.Group>

                    <Form.Group controlId="UngvienSDT">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control
                            type="text"
                            name="UngvienSDT"
                            required
                        //defaultValue={this.props.uvsdt}

                        />
                    </Form.Group>

                </Col>


                <Col sm={2}>

                    <Form.Group controlId="UngvienGIOITINH">
                        <Form.Label>Giới tính</Form.Label>
                        <Form.Control
                            type="text"
                            name="UngvienGIOITINH"
                            required
                        //defaultValue={this.props.uvgioitinh}
                        />
                    </Form.Group>

                    <Form.Group controlId="UngvienTonGiao">
                        <Form.Label>Tôn giáo</Form.Label>
                        <Form.Control
                            type="text"
                            name="UngvienTonGiao"
                            required
                        //defaultValue={this.props.uvtongiao}

                        />
                    </Form.Group>

                    <Form.Group controlId="UngvienNoiCap">
                        <Form.Label>Nơi cấp </Form.Label>
                        <Form.Control
                            type="text"
                            name="UngvienNoiCap"
                            required
                        //defaultValue={this.props.uvnoidaotao}

                        />
                    </Form.Group>

                    <Form.Group controlId="UngvienXepLoai">
                        <Form.Label>Xếp loại</Form.Label>
                        <Form.Control
                            type="text"
                            name="UngvienXepLoai"
                            required
                        //defaultValue={this.props.uvxeploai}

                        />
                    </Form.Group>

                    <Form.Group controlId="UngvienQuocTich">
                        <Form.Label>Quốc tịch</Form.Label>
                        <Form.Control
                            type="text"
                            name="UngvienQuocTich"
                            required
                        //defaultValue={this.props.uvquoctich}

                        />
                    </Form.Group>
                </Col>


                <Col sm={4}>

                    <Form.Group controlId="UngvienDiaChi">
                        <Form.Label>Địa chỉ thường trú</Form.Label>
                        <Form.Control
                            type="text"
                            name="UngvienDiaChi"
                            required
                        //defaultValue={this.props.uvdcthuongtru}

                        />
                    </Form.Group>

                    <Form.Group controlId="UngvienChoOHienTai">
                        <Form.Label>Chỗ ở hiện tại</Form.Label>
                        <Form.Control
                            type="text"
                            name="UngvienChoOHienTai"
                            required
                        //defaultValue={this.props.uvchohientai}

                        />
                    </Form.Group>

                    <Form.Group controlId="UngvienTrinhDoDaoTao">
                        <Form.Label>Trình độ đào tạo</Form.Label>
                        <Form.Control as="select">
                            {this.state.daotaos.map(dt2 =>
                                <option key={dt2.idtrinhDo} value={dt2.idtrinhDo}>{dt2.tenTrinhDo}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="UngvienTinhTrangHonNhan">
                        <Form.Label>Tình trạng hôn nhân</Form.Label>
                        <Form.Control
                            type="text"
                            name="UngvienTinhTrangHonNhan"
                            required
                        //defaultValue={this.props.uvtinhtranghonnhan}

                        />
                    </Form.Group>

                </Col>

            </Row>

            <Form.Group>
                <Button variant="primary" type="submit" onClick={this.props.onHide}>
                    Xác nhận
                                        </Button>
            </Form.Group>
        </Form>
    </Col>
</Row>