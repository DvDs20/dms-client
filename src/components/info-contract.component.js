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

class InfoContract extends Component {
    constructor(props) {
        super(props);

        this.state = this.initialState;
        this.state.showDeleteContractAlarm = false;
    }

    initialState = {
        id: '', firstName: '', lastName: '', roomNumber: '', expireDate: '', contractNumber: ''
    }

    findContractById = () => {
        const { id } = this.props.router.params;

        ContractsService.getContractInfo(id)
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        id: response.data.id,
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        roomNumber: response.data.roomNumber,
                        expireDate: response.data.expireDate,
                        contractNumber: response.data.contractNumber
                    })
                }
            }).catch((erorr) => {
                console.error("Error: " + erorr);
            });
    }

    componentDidMount() {
        this.findContractById();
    }

    deleteContract = event => {
        const { id } = this.props.router.params;
        event.preventDefault();

        ContractsService.deleteContract(id)
            .then(response => {
                if (response.data != null) {
                    this.setState({ "showDeleteContractAlarm": true })
                    setTimeout(() => this.setState({ "showDeleteContractAlarm": false }), 5000);
                    setTimeout(() => this.contractList(), 3000);
                }
                else {
                    this.setState({ "showDeleteContractAlarm": false })
                }
            });
    }


    contractList = () => {
        return this.props.router.navigate("/contracts");
    }

    render() {

        const { firstName, lastName, roomNumber, expireDate, contractNumber } = this.state;

        return (
            <div>
                <div style={{ "display": this.state.showDeleteContractAlarm ? "block" : "none" }}>
                    <Toast show={this.state.showDeleteContractAlarm} message={"Sutartis sėkmingai ištrinta"} type={"error"} />
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
                                            <Typography gutterBottom variant="subtitle1" component="div">Sutartis - <i>{this.state.contractNumber}</i></Typography>
                                            <Divider />
                                        </Grid>
                                        <Grid item xs container direction="column" spacing={2}>
                                            <Grid item>
                                                <Form id="contractFormId">
                                                    <Grid item>
                                                        <Grid item>
                                                            <div class="row">
                                                                <div class="col-sm">
                                                                    <Form.Group controlId="formGridFirstName">
                                                                        <TextField
                                                                            name="firstName"
                                                                            value={firstName}
                                                                            onChange={this.contractChange}
                                                                            fullWidth
                                                                            id="outlined-required"
                                                                            label="Vardas"
                                                                            InputProps={{
                                                                                readOnly: true,
                                                                            }}
                                                                        >
                                                                        </TextField>
                                                                    </Form.Group>
                                                                </div>

                                                                <div class="col-sm">
                                                                    <Form.Group controlId="formGridLastName">
                                                                        <TextField
                                                                            name="lastName"
                                                                            value={lastName}
                                                                            onChange={this.contractChange}
                                                                            fullWidth
                                                                            id="outlined-required"
                                                                            label="Pavardė"
                                                                            InputProps={{
                                                                                readOnly: true,
                                                                            }}
                                                                        >
                                                                        </TextField>
                                                                    </Form.Group>
                                                                </div>
                                                            </div>
                                                        </Grid>
                                                        <Grid item paddingTop={2}>
                                                            <div class="row">
                                                                <div class="col-sm">
                                                                    <Form.Group controlId="formGridExpireDate">
                                                                        <TextField
                                                                            name="expireDate"
                                                                            value={expireDate}
                                                                            onChange={this.contractChange}
                                                                            fullWidth
                                                                            id="outlined-required"
                                                                            label="Galiojimas iki"
                                                                            InputProps={{
                                                                                readOnly: true,
                                                                            }}
                                                                        >
                                                                        </TextField>
                                                                    </Form.Group>
                                                                </div>

                                                                <div class="col-sm">
                                                                    <Form.Group controlId="formGridRoomNumber">
                                                                        <TextField
                                                                            name="roomNumber"
                                                                            value={roomNumber}
                                                                            onChange={this.contractChange}
                                                                            fullWidth
                                                                            id="outlined-required"
                                                                            label="Kambario numeris"
                                                                            InputProps={{
                                                                                readOnly: true,
                                                                            }}
                                                                        >
                                                                        </TextField>
                                                                    </Form.Group>
                                                                </div>
                                                            </div>
                                                        </Grid>
                                                        <Grid item paddingTop={2}>
                                                            <div class="row">
                                                                <div class="col-sm">
                                                                    <Button variant="outlined" color="error" onClick={this.deleteContract} fullWidth ><span>Trinti sutartį</span></Button>
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

export default withRouter(InfoContract)
