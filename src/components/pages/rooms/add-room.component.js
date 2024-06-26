import React, { Component } from "react";

import { Box } from "@mui/system";
import { Button, Divider, Grid, Paper, TextField, Typography } from "@mui/material";
import Form from 'react-bootstrap/Form';

import Toast from "../../alerts/toast.component";

import RoomService from "../../../services/RoomService";

export default class AddRoom extends Component {
    constructor(props) {
        super(props);

        this.state = this.initialState;
        this.state.show = false;
        this.roomChange = this.roomChange.bind(this);
        this.submitRoom = this.submitRoom.bind(this);
    }

    initialState = {
        id: '', roomStatus: '', roomNumber: '', floor: '', roomCapacity: '', roomLeftCapacity: ''
    }

    resetRoom = () => {
        this.setState(() => this.initialState);
    }

    submitRoom = event => {
        event.preventDefault();

        const room = {
            roomStatus: '1',
            roomNumber: this.state.roomNumber,
            floor: this.state.floor,
            roomCapacity: this.state.roomCapacity,
            leftRoomCapacity: this.state.roomCapacity
        };

        RoomService.addRoom(room)
            .then(response => {
                if (response.data != null) {
                    this.setState({ "show": true })
                    setTimeout(() => this.setState({ "show": false }), 5000);
                }
                else {
                    this.setState({ "show": false })
                }
            });
        this.setState(this.initialState);


    }

    roomChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {

        const { roomNumber, floor, roomCapacity } = this.state;

        return (
            <div>
                <div style={{ "display": this.state.show ? "block" : "none" }}>
                    <Toast show={this.state.show} message={"Kambarys pridėtas sėkmingai!"} type={"success"} />
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
                                            <Typography gutterBottom variant="subtitle1" component="div">Naujo kambario pridėjimas</Typography>
                                            <Divider />
                                        </Grid>
                                        <Grid item xs container direction="column" spacing={2}>
                                            <Grid item>
                                                <Form onReset={this.resetRoom} onSubmit={this.submitRoom} id="roomFormId">
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
                                                            <div class="row">
                                                                <div class="col-sm">
                                                                    <Button variant="outlined" color="success" type="submit" fullWidth ><span>Pridėti naują kambarį</span></Button>{' '}
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
                </Box>
            </div>
        );
    }
}
