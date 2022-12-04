import React, { Component, useState } from "react";
import { Link, withRouter } from 'react-router-dom';



import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import { Box } from "@mui/system";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, Paper, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
// import Table from 'react-bootstrap';
import ReactBootstrap, { Table } from 'react-bootstrap';

import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

import RoomService from "../services/RoomService";
import { AlignHorizontalCenter } from "@mui/icons-material";

export default class RoomsList extends Component {
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




        // UserService.getStudentsList().then(
        //     response => {
        //         this.setState({
        //             content: response.data
        //         });
        //     },
        //     error => {
        //         this.setState({
        //             content:
        //                 (error.response &&
        //                     error.response.data &&
        //                     error.response.data.message) ||
        //                 error.message ||
        //                 error.toString()
        //         });

        //         if (error.response && error.response.status === 401) {
        //             EventBus.dispatch("logout");
        //         }
        //     }
        // );
    }

    render() {
        return (

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
                                                    <th>Veiksmai</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.rooms.map(
                                                        room =>
                                                            <tr key={room.id}>
                                                                <td><span style={{ color: '#1E71C9' }} >{room.roomNumber}</span></td>
                                                                <td> {room.roomStatus == 0 ?
                                                                    (<span style={{ backgroundColor: 'rgba(227, 30, 16, 0.3)', borderRadius: 12, padding: 4, margin: 10 }} ><FiberManualRecordRoundedIcon color="error" fontSize="small" />Užimtas</span>) :
                                                                    <span style={{ backgroundColor: 'rgba(47, 122, 32, 0.3)', borderRadius: 12, padding: 4, margin: 10 }} ><FiberManualRecordRoundedIcon color="success" fontSize="small" />Laisvas</span>} </td>
                                                                <td> {room.floor} </td>
                                                                <td> {room.roomCapacity} </td>
                                                                <td><span><IconButton aria-label="edit"><EditRoundedIcon style={{ color: '#1E71C9' }} /></IconButton>
                                                                    <IconButton aria-label="delete"><DeleteForeverRoundedIcon style={{ color: '#E31E10' }} /></IconButton></span></td>
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
        );
    }
}
