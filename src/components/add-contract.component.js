import React, { Component, useState } from "react";
import { Link, useParams } from 'react-router-dom';

import { Box } from "@mui/system";
import { Button, Divider, Grid, IconButton, MenuItem, Paper, Select, TextField, Typography, InputLabel } from "@mui/material";
import ReactBootstrap, { Table } from 'react-bootstrap';
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Form from 'react-bootstrap/Form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import axios from 'axios';
import authHeader from "../services/auth-header";
import Toast from "./toast.component";

import RoomService from "../services/RoomService";
import LookupService from "../services/LookupService";
import ContractsService from "../services/ContractsService";
import { withRouter } from "../common/with-router";

class AddContract extends Component {
    constructor(props) {
        super(props);

        this.state = this.initialState;
        this.state.show = false;
        this.contractChange = this.contractChange.bind(this);
        this.submitContract = this.submitContract.bind(this);
        this.state = {
            optionsOfStudents: [],
            optionsOfRooms: []
        };
    }

    initialState = {
        id: '', studentId: '', roomId: '', expireDate: ''
    }

    resetContract = () => {
        this.setState(() => this.initialState);
    }

    submitContract = event => {
        event.preventDefault();

        const contract = {
            studentId: this.state.studentId,
            roomId: this.state.roomId,
            expireDate: this.state.expireDate,
        };

        ContractsService.addNewContract(contract)
            .then(response => {
                if (response.data != null) {
                    this.setState({ "show": true })
                    setTimeout(() => this.setState({ "show": false }), 5000);
                    setTimeout(() => this.contractList(), 3000);
                }
                else {
                    this.setState({ "show": false })
                }
            });


    }

    componentDidMount() {
        LookupService.getAvailableStudentsList().then((res) => {
            this.setState({ optionsOfStudents: res.data });
        });

        LookupService.getAvailableRoomList().then((res) => {
            this.setState({ optionsOfRooms: res.data });
        })
    }


    contractChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    contractList = () => {
        return this.props.router.navigate("/contracts");
    }

    render() {

        const { expireDate, studentId, roomId } = this.state;
        // const optionsOfStudents.studentId = this.state.optionsOfStudents.studentId;
        // const roomId = this.state.optionsOfRooms.roomId;

        return (
            <div>
                <div style={{ "display": this.state.show ? "block" : "none" }}>
                    <Toast show={this.state.show} message={"Sutartis sukurta sėkmingai!"} type={"success"} />
                </div>
                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            '& > :not(style)': {
                                m: 1,
                                width: 1500
                            },
                        }}
                    >
                        <Paper
                            sx={{
                                p: 2,
                                margin: 'auto',
                                maxWidth: 1400,
                                backgroundColor: (theme) =>
                                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                            }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={8} sm container>
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Grid item>
                                            <Typography gutterBottom variant="subtitle1" component="div">Naujos sutarties kūrimas</Typography>
                                            <Divider />
                                        </Grid>
                                        <Grid item xs container direction="column" spacing={2}>
                                            <Grid item>
                                                <Form onReset={this.resetContract} onSubmit={this.submitContract} id="contractFormId">
                                                    <Grid item>
                                                        <Grid item>
                                                            <div class="row">
                                                                <div class="col-sm">
                                                                    <Form.Group controlId="formGridStudentId">
                                                                        <InputLabel id="student-select-label">Studentas</InputLabel>
                                                                        <Select
                                                                            labelId="student-select-label"
                                                                            id="student-select"
                                                                            name="studentId"
                                                                            value={studentId}
                                                                            onChange={this.contractChange}
                                                                            fullWidth
                                                                        >
                                                                            {
                                                                                this.state.optionsOfStudents.map(option => {
                                                                                    return (
                                                                                        <MenuItem key={option.studentId} value={option.studentId}>
                                                                                            {option.firstName + " " + option.lastName}
                                                                                        </MenuItem>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </Select>
                                                                    </Form.Group>
                                                                </div>

                                                                <div class="col-sm">
                                                                    <Form.Group controlId="formGridRoomId">
                                                                        <InputLabel id="room-select-label">Kambarys</InputLabel>
                                                                        <Select
                                                                            labelId="room-select-label"
                                                                            id="room-select"
                                                                            name="roomId"
                                                                            value={roomId}
                                                                            onChange={this.contractChange}
                                                                            fullWidth
                                                                        >
                                                                            {
                                                                                this.state.optionsOfRooms.map(option => {
                                                                                    return (
                                                                                        <MenuItem key={option.roomId} value={option.roomId}>
                                                                                            {option.roomNumber}
                                                                                        </MenuItem>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </Select>
                                                                    </Form.Group>
                                                                </div>
                                                                <div class="col-sm" >
                                                                    <InputLabel id="room-select-label">Galiojimas iki</InputLabel>
                                                                    <TextField
                                                                        name="expireDate"
                                                                        value={expireDate}
                                                                        onChange={this.contractChange}
                                                                        fullWidth
                                                                        required
                                                                        id="outlined-required"
                                                                        type={"date"}
                                                                        InputProps={{
                                                                            autoComplete: "off"
                                                                        }}
                                                                    >
                                                                    </TextField>
                                                                </div>
                                                            </div>
                                                        </Grid>
                                                        <Grid item paddingTop={2}>
                                                            <div class="row">
                                                                <div class="col-sm">
                                                                    <Button variant="outlined" color="success" type="submit" fullWidth ><span>Kurti naują sutartį</span></Button>{' '}
                                                                </div>
                                                                <div class="col-sm">
                                                                    <Button variant="outlined" color="info" type="reset" fullWidth ><span>Išvalyti</span></Button>
                                                                </div>
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </Form>
                                            </Grid>

                                        </Grid>

                                    </Grid>
                                </Grid>
                            </Grid>

                        </Paper>

                    </Box>
                </Box >
            </div >


        );
    }
}

export default withRouter(AddContract)
