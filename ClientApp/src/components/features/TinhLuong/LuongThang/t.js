
<Row>
    <Col sm={12} >
        <Form onSubmit={this.handleSubmitPUT}>
            <Form.Group controlId="BangluongID">
                <Form.Label>ID bảng lương</Form.Label>
                <Form.Control
                    type="text"
                    name="BangluongID"
                    //required
                    defaultValue={this.props.idbangLuong}
                />
            </Form.Group>

            <Form.Group controlId="TinhluongTienPHUCAPKHAC">
                <Form.Label>Số tiền</Form.Label>
                <Form.Control
                    type='number'
                    name="TinhluongTienPHUCAPKHAC"
                    defaultValue={this.props.phuCapKhac}
                />
            </Form.Group>

            <Form.Group>
                <Button variant="primary" type="submit" onClick={this.props.onHide}>
                    XÁC NHẬN
                                    </Button>
            </Form.Group>
        </Form>
    </Col>
</Row>

    // <FormControl className={classes.formControl}>
    //     <InputLabel id="demo-mutiple-chip-label">Chip</InputLabel>
    //     <Select
    //         labelId="demo-mutiple-chip-label"
    //         id="demo-mutiple-chip"
    //         multiple
    //         value={personName}
    //         onChange={handleChange}
    //         input={<Input id="select-multiple-chip" />}
    //         renderValue={(selected) => (
    //             <div className={classes.chips}>
    //                 {selected.map((value) => (
    //                     <Chip key={value} label={value} className={classes.chip} />
    //                 ))}
    //             </div>
    //         )}
    //         MenuProps={MenuProps}
    //     >
    //         {names.map((name) => (
    //             <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
    //                 {name}
    //             </MenuItem>
    //         ))}
    //     </Select>
    // </FormControl>

    