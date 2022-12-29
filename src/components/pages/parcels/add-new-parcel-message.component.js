import React, { Component } from "react";

import { Box } from "@mui/system";
import { Button, Divider, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import Textarea from '@mui/joy/Textarea'
import Form from 'react-bootstrap/Form';

import Toast from "../../alerts/toast.component";

import LookupService from "../../../services/LookupService";
import ParcelsService from "../../../services/ParcelsService";

export default class AddNewParcelMessage extends Component {
    constructor(props) {
        super(props);

        this.state = this.initialState;
        this.state.show = false;
        this.parcelMessageChange = this.parcelMessageChange.bind(this);
        this.submitParcelMessage = this.submitParcelMessage.bind(this);
        this.state.optionsOfStudents = [];
    }

    initialState = {
        studentId: '', messageTitle: '', message: ''
    }

    resetParcelMessage = () => {
        this.setState(() => this.initialState);
    }

    submitParcelMessage = event => {
        event.preventDefault();

        const parcelMessage = {
            studentId: this.state.studentId,
            messageTitle: this.state.messageTitle,
            message: this.state.message,
        };

        ParcelsService.createNewParcelMessage(parcelMessage)
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

    parcelMessageChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    componentDidMount() {
        LookupService.getAvailableStudentsListWhichDoNotHaveParcelMessage().then((res) => {
            this.setState({ optionsOfStudents: res.data });
        });
    }

    render() {

        const { studentId, messageTitle, message } = this.state;

        return (
            <div>
                <div style={{ "display": this.state.show ? "block" : "none" }}>
                    <Toast show={this.state.show} message={"Siuntos pranešimas sukurtas!"} type={"success"} />
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
                                            <Typography gutterBottom variant="subtitle1" component="div">Naujos siuntos pranešimo sukūrimas</Typography>
                                            <Divider />
                                        </Grid>
                                        <Grid item xs container direction="column" spacing={2}>
                                            <Grid item>
                                                <Form onReset={this.resetParcelMessage} onSubmit={this.submitParcelMessage} id="roomFormId">
                                                    <Grid item>
                                                        <Grid item>
                                                            <div class="row">
                                                                <div class="col-sm">
                                                                    <Form.Group controlId="formGridStudent">
                                                                        <InputLabel id="student-select-label">Studentas *</InputLabel>
                                                                        <Select
                                                                            labelId="student-select-label"
                                                                            id="student-select"
                                                                            name="studentId"
                                                                            value={studentId}
                                                                            onChange={this.parcelMessageChange}
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
                                                                    <Form.Group controlId="formGridMessageTitle">
                                                                        <InputLabel id="messageTitle">Pranešimo pavadimas *</InputLabel>
                                                                        <TextField
                                                                            name="messageTitle"
                                                                            value={messageTitle}
                                                                            onChange={this.parcelMessageChange}
                                                                            fullWidth
                                                                            id="outlined-required"
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
                                                                    <Form.Group controlId="formGridMessage">
                                                                        <Textarea
                                                                            color="primary"
                                                                            name="message"
                                                                            value={message}
                                                                            onChange={this.parcelMessageChange}
                                                                            disabled={false}
                                                                            minRows={5}
                                                                            placeholder="Pranešimas studentui..."
                                                                            size="lg"
                                                                            variant="outlined"
                                                                        />
                                                                    </Form.Group>
                                                                </div>
                                                            </div>
                                                        </Grid>
                                                        <Grid item paddingTop={2}>
                                                            <div class="row">
                                                                <div class="col-sm">
                                                                    <Button variant="outlined" color="success" type="submit" fullWidth ><span>Kurti naują siuntos pranešimą</span></Button>{' '}
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
