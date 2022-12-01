import React, { Component, useState } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import { Box } from "@mui/system";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, Paper, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
// import Table from 'react-bootstrap';
import ReactBootstrap, { Table } from 'react-bootstrap';

export default class StudentsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        UserService.getStudentsList().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );
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
                                        <Typography gutterBottom variant="subtitle1" component="div">Studentų sąrašas</Typography>
                                        <Divider />
                                    </Grid>
                                    <Grid item>
                                        <Table bordered hover striped variant="#edebeb">
                                            <thead>
                                                <tr>
                                                    <th>Vardas</th>
                                                    <th>Pavardė</th>
                                                    <th>Kambario numeris</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Deividas</td>
                                                    <td>Kvietkauskas</td>
                                                    <td>326B</td>
                                                </tr>
                                                <tr>
                                                    <td>Tomas</td>
                                                    <td>Tomauskas</td>
                                                    <td>324A</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Grid>
                                    <Grid item>

                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Paper>

                </Box>
            </Box>


            // <div className="container">
            //     <header className="jumbotron">
            //         <h3>{this.state.content}</h3>
            //     </header>
            // </div>
        );
    }
}
