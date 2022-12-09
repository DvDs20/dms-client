import React, { Component } from "react";
import { Link, useLocation, useParams } from 'react-router-dom';

import { Box } from "@mui/system";
import { Button, Dialog, Divider, Grid, IconButton, Paper, TextField, Typography, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import ReactBootstrap, { Table } from 'react-bootstrap';
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Form from 'react-bootstrap/Form';


import axios from 'axios';
import authHeader from "../services/auth-header";
import Toast from "./toast.component";

import RoomService from "../services/RoomService";
import withRouter1 from "../hooks/withRouter";
import { withRouter } from '../common/with-router';
import RoomsList from "./roomsList.component";

class EditRoom extends Component {
    constructor(props) {
        super(props);

        this.state = this.initialState;
        this.state.showUpdateAlert = false;
        this.state.showDeleteAlert = false;
        this.state.showCantDeleteAlert = false;
        this.roomChange = this.roomChange.bind(this);
        this.updateRoom = this.updateRoom.bind(this);
        this.deleteRoom = this.deleteRoom.bind(this);
    }


    initialState = {
        id: '', roomStatus: '', roomNumber: '', floor: '', roomCapacity: ''
    }

    findRoomById = () => {
        const { id } = this.props.router.params;

        RoomService.getRoomById(id)
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        id: response.data.id,
                        roomStatus: response.data.roomStatus,
                        roomNumber: response.data.roomNumber,
                        floor: response.data.floor,
                        roomCapacity: response.data.roomCapacity
                    })
                }
            }).catch((error) => {
                console.error("Error: " + error);
            });
    }

    componentDidMount() {
        this.findRoomById();
    }

    resetRoom = () => {
        this.setState(() => this.initialState);
    }

    updateRoom = event => {
        event.preventDefault();

        const room = {
            roomId: this.state.id,
            roomStatus: this.state.roomStatus,
            roomNumber: this.state.roomNumber,
            floor: this.state.floor,
            roomCapacity: this.state.roomCapacity
        };

        RoomService.updateRoom(room.roomId, room)
            .then(response => {
                if (response.data != null) {
                    this.setState({ "showUpdateAler": true })
                    setTimeout(() => this.setState({ "showUpdateAlert": false }), 5000);
                    setTimeout(() => this.roomsList(), 3000);
                }
                else {
                    this.setState({ "showUpdateAlert": false })
                }
            });
        this.setState(this.initialState);
    }

    roomChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    deleteRoom = event => {
        const { id } = this.props.router.params;
        event.preventDefault();

        if (this.state.roomStatus === 0) {
            this.setState({ "showCantDeleteAlert": true })
            setTimeout(() => this.setState({ "showCantDeleteAlert": false }), 5000);
        }
        else {
            RoomService.deleteRoom(id)
                .then(response => {
                    if (response.data != null) {
                        this.setState({ "showDeleteAlert": true })
                        setTimeout(() => this.setState({ "showDeleteAlert": false }), 5000);
                        setTimeout(() => this.roomsList(), 3000);
                    }
                    else {
                        this.setState({ "showDeleteAlert": false })
                    }
                });
        }
    };

    roomsList = () => {
        return this.props.router.navigate("/rooms");
    }

    render() {

        const { roomNumber, floor, roomCapacity } = this.state;

        return (
            <div>
                <div style={{ "display": this.state.showUpdateAler ? "block" : "none" }}>
                    <Toast show={this.state.showUpdateAler} message={"Kambarys atnaujintas sėkmingai!"} type={"info"} />
                </div>
                <div style={{ "display": this.state.showDeleteAlert ? "block" : "none" }}>
                    <Toast show={this.state.showDeleteAlert} message={"Kambarys ištrintas sėkmingai!"} type={"error"} />
                </div>
                <div style={{ "display": this.state.showCantDeleteAlert ? "block" : "none" }}>
                    <Toast show={this.state.showCantDeleteAlert} message={"Šis kambarys yra užimtas, todėl ištrinti negalima!"} type={"warning"} />
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
                                            <Typography gutterBottom variant="subtitle1" component="div">Kambario redagavimas</Typography>
                                            <Divider />
                                        </Grid>
                                        <Grid item xs container direction="column" spacing={2}>
                                            <Grid item>
                                                <Form onReset={this.resetRoom} onSubmit={this.updateRoom} id="roomFormId">
                                                    <Grid item>
                                                        <Grid item>
                                                            <div class="row">
                                                                <div class="col-sm">
                                                                    <Form.Group controlId="formGridRoomNumber">
                                                                        <TextField
                                                                            name="roomNumber"
                                                                            value={roomNumber}
                                                                            onChange={this.roomChange}
                                                                            fullWidth
                                                                            required
                                                                            id="outlined-required"
                                                                            label="Kambario numeris"
                                                                            InputProps={{
                                                                                autoComplete: "off"
                                                                            }}
                                                                        >
                                                                        </TextField>
                                                                    </Form.Group>
                                                                </div>

                                                                <div class="col-sm">
                                                                    <Form.Group controlId="formGridFloor">
                                                                        <TextField
                                                                            name="floor"
                                                                            value={floor}
                                                                            onChange={this.roomChange}
                                                                            type={"number"}
                                                                            fullWidth
                                                                            required
                                                                            id="outlined-required"
                                                                            label="Aukštas"
                                                                            InputProps={{
                                                                                autoComplete: "off"
                                                                            }}
                                                                        >
                                                                        </TextField>
                                                                    </Form.Group>
                                                                </div>
                                                                <div class="col-sm">
                                                                    <Form.Group controlId="formGridRoomCapacity">
                                                                        <TextField
                                                                            name="roomCapacity"
                                                                            value={roomCapacity}
                                                                            onChange={this.roomChange}
                                                                            type={"number"}
                                                                            fullWidth
                                                                            required
                                                                            id="outlined-required"
                                                                            label="Miegamų vietų skaičius"
                                                                            InputProps={{
                                                                                autoComplete: "off"
                                                                            }}
                                                                        >
                                                                        </TextField>
                                                                    </Form.Group>
                                                                </div>
                                                            </div>
                                                        </Grid>
                                                        <Grid item paddingTop={2}>
                                                            <Divider />
                                                        </Grid>
                                                        <Grid item paddingTop={2}>
                                                            <div class="row">
                                                                <div class="col-sm">
                                                                    <Button variant="outlined" color="success" type="submit" fullWidth ><span>Išsaugoti</span></Button>{' '}
                                                                </div>
                                                                <div class="col-sm">
                                                                    <Button variant="outlined" color="info" type="reset" fullWidth ><span>Išvalyti</span></Button>
                                                                </div>
                                                                <div class="col-sm">
                                                                    <Button variant="outlined" color="error" onClick={this.deleteRoom} fullWidth ><span>Ištrinti</span></Button>
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
                </Box>
            </div >
        );
    }
}

export default withRouter(EditRoom);