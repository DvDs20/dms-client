import React, { Component, useState } from "react";
import { Link } from 'react-router-dom';




import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import { Box } from "@mui/system";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, Paper, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import ReactBootstrap, { Table } from 'react-bootstrap';

import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Toast from "./toast.component";

import RoomService from "../services/RoomService";
import { AlignHorizontalCenter } from "@mui/icons-material";
import { withRouter } from '../common/with-router';

class RoomsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: []
        };
    }

    componentDidMount() {

        RoomService.getRoomsList().then((res) => {
            this.setState({ rooms: res.data });
        });
    }

    render() {
        return (

            <div>
                <div style={{ "display": this.state.show ? "block" : "none" }}>
                    <Toast show={this.state.show} message={"Kambarys ištrintas sėkmingai!"} type={"error"} />
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
                                            <Typography gutterBottom variant="subtitle1" component="div">Kambarių sąrašas</Typography>
                                            <Divider />
                                        </Grid>
                                        <Grid item>
                                            <Table bordered hover striped variant="#edebeb">
                                                <thead>
                                                    <tr>
                                                        <th>Kambario numeris</th>
                                                        <th>Statusas</th>
                                                        <th>Aukštas</th>
                                                        <th>Miegamų vietų skaičius</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.rooms.map(
                                                            room =>
                                                                <tr key={room.id}>
                                                                    <td>
                                                                        <Link to={"/rooms/edit/" + room.id}>
                                                                            <span style={{ color: '#1E71C9' }} >{room.roomNumber}</span>
                                                                        </Link>
                                                                    </td>
                                                                    <td> {room.roomStatus == 0 ?
                                                                        (<span style={{ backgroundColor: 'rgba(227, 30, 16, 0.3)', borderRadius: 12, padding: 4, margin: 10 }} ><FiberManualRecordRoundedIcon color="error" fontSize="small" />Užimtas</span>) :
                                                                        <span style={{ backgroundColor: 'rgba(47, 122, 32, 0.3)', borderRadius: 12, padding: 4, margin: 10 }} ><FiberManualRecordRoundedIcon color="success" fontSize="small" />Laisvas</span>} </td>
                                                                    <td> {room.floor} </td>
                                                                    <td> {room.roomCapacity} </td>
                                                                </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </Table>
                                        </Grid>
                                        <Grid item>
                                            <Link to={"/add-room"}
                                                style={{ textDecoration: 'none' }}
                                            >
                                                <Button variant="outlined" color="success"><span>Pridėti naują kambarį</span></Button>
                                            </Link>
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

export default withRouter(RoomsList);
