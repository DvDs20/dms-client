import React, { Component } from "react";
import { Link, useParams } from 'react-router-dom';

import { Box } from "@mui/system";
import { Button, Divider, Grid, IconButton, Paper, TextField, Typography } from "@mui/material";
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

import authService from "../services/auth.service";
import { withRouter } from "../common/with-router";

import RoomService from "../services/RoomService";
import userService from "../services/user.service";

class EditStudent extends Component {
    constructor(props) {
        super(props);

        this.state = this.initialState;
        this.state.show = false;
        this.studentChange = this.studentChange.bind(this);
        this.updateStudent = this.updateStudent.bind(this);
    }

    initialState = {
        id: '', username: '', email: '', password: '', firstName: '', lastName: '', number: '', academicGroup: '', userStatus: ''
    }

    findStudentById = () => {
        const { id } = this.props.router.params;

        UserService.getStudentById(id)
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        id: response.data.id,
                        username: response.data.username,
                        email: response.data.email,
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        number: response.data.number,
                        academicGroup: response.data.academicGroup
                    })
                }
            }).catch((error) => {
                console.error("Error:" + error);
            });
    }

    componentDidMount() {
        this.findStudentById();
    }

    resetStudent = () => {
        this.setState(() => this.initialState);
    }

    updateStudent = event => {
        const { id } = this.props.router.params;
        event.preventDefault();

        const student = {
            username: this.state.username,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            number: this.state.number,
            academicGroup: this.state.academicGroup,
            password: this.state.password
        };

        userService.updateStudent(id, student)
            .then(response => {
                if (response.data != null) {
                    this.setState({ "show": true })
                    setTimeout(() => this.setState({ "show": false }), 5000);
                    setTimeout(() => this.studentsList(), 3000);
                }
                else {
                    this.setState({ "show": false })
                }
            });
        this.setState(this.initialState);


    }

    studentChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    studentsList = () => {
        return this.props.router.navigate("/students");
    }

    render() {

        const { username, email, password, firstName, lastName, number, academicGroup } = this.state;

        return (
            <div>
                <div style={{ "display": this.state.show ? "block" : "none" }}>
                    <Toast show={this.state.show} message={"Studentas atnaujintas sėkmingai!"} type={"success"} />
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
                                            <Typography gutterBottom variant="subtitle1" component="div">Studento redagavimas</Typography>
                                            <Divider />
                                        </Grid>
                                        <Grid item xs container direction="column" spacing={2}>
                                            <Grid item>
                                                <Form onReset={this.resetStudent} onSubmit={this.updateStudent} id="roomFormId">
                                                    <Grid item>
                                                        <Grid item paddingBottom={2}>
                                                            <Typography gutterBottom variant="subtitle1" component="div" paddingLeft={2}>Asmeninė informacija</Typography>
                                                            <Divider />
                                                        </Grid>
                                                        <Grid item>
                                                            <div class="row">
                                                                <div class="col-sm">
                                                                    <Form.Group controlId="formGridFirstName">
                                                                        <TextField
                                                                            name="firstName"
                                                                            value={firstName}
                                                                            onChange={this.studentChange}
                                                                            fullWidth
                                                                            required
                                                                            id="outlined-required"
                                                                            label="Vardas"
                                                                            InputProps={{
                                                                                autoComplete: "off"
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
                                                                            onChange={this.studentChange}
                                                                            fullWidth
                                                                            required
                                                                            id="outlined-required"
                                                                            label="Pavardė"
                                                                            InputProps={{
                                                                                autoComplete: "off"
                                                                            }}
                                                                        >
                                                                        </TextField>
                                                                    </Form.Group>
                                                                </div>
                                                                <div class="col-sm">
                                                                    <Form.Group controlId="formGridAcademicGroup">
                                                                        <TextField
                                                                            name="academicGroup"
                                                                            value={academicGroup}
                                                                            onChange={this.studentChange}
                                                                            fullWidth
                                                                            required
                                                                            id="outlined-required"
                                                                            label="Akademinė grupė"
                                                                            InputProps={{
                                                                                autoComplete: "off"
                                                                            }}
                                                                        >
                                                                        </TextField>
                                                                    </Form.Group>
                                                                </div>
                                                            </div>
                                                        </Grid>
                                                        <Grid item paddingTop={2} paddingBottom={2}>
                                                            <Typography gutterBottom variant="subtitle1" component="div" paddingLeft={2}>Prisijungimo informacija</Typography>
                                                            <Divider />
                                                        </Grid>
                                                        <Grid item>
                                                            <div class="row">
                                                                <div class="col-sm">
                                                                    <Form.Group controlId="formGridUsername">
                                                                        <TextField
                                                                            name="username"
                                                                            value={username}
                                                                            onChange={this.studentChange}
                                                                            fullWidth
                                                                            required
                                                                            id="outlined-required"
                                                                            label="Prisijungimo vardas"
                                                                            InputProps={{
                                                                                autoComplete: "new-password"
                                                                            }}
                                                                        >
                                                                        </TextField>
                                                                    </Form.Group>
                                                                </div>

                                                                <div class="col-sm">
                                                                    <Form.Group controlId="formGridPassword">
                                                                        <TextField
                                                                            name="password"
                                                                            value={password}
                                                                            onChange={this.studentChange}
                                                                            fullWidth
                                                                            type={"password"}
                                                                            required
                                                                            id="outlined-required"
                                                                            label="Naujas slaptažodis"
                                                                            InputProps={{
                                                                                autoComplete: "new-password"
                                                                            }}
                                                                        >
                                                                        </TextField>
                                                                    </Form.Group>
                                                                </div>
                                                                <div class="col-sm">
                                                                    <Form.Group controlId="formGridReapetPassword">
                                                                        <TextField
                                                                            name="reapetPassword"
                                                                            onChange={this.studentChange}
                                                                            fullWidth
                                                                            required
                                                                            type={"password"}
                                                                            id="outlined-required"
                                                                            label="Pakartokite naują slaptažodį"
                                                                            InputProps={{
                                                                                autoComplete: "new-password"
                                                                            }}
                                                                        >
                                                                        </TextField>
                                                                    </Form.Group>
                                                                </div>
                                                            </div>
                                                        </Grid>
                                                        <Grid item paddingTop={2} paddingBottom={2}>
                                                            <Typography gutterBottom variant="subtitle1" component="div" paddingLeft={2}>Kontaktinė informacija</Typography>
                                                            <Divider />
                                                        </Grid>
                                                        <Grid item>
                                                            <div class="row">
                                                                <div class="col-sm">
                                                                    <Form.Group controlId="formGridEmail">
                                                                        <TextField
                                                                            name="email"
                                                                            value={email}
                                                                            onChange={this.studentChange}
                                                                            fullWidth
                                                                            type={"email"}
                                                                            required
                                                                            id="outlined-required"
                                                                            label="Elektroninis paštas"
                                                                            InputProps={{
                                                                                autoComplete: "off"
                                                                            }}
                                                                        >
                                                                        </TextField>
                                                                    </Form.Group>
                                                                </div>

                                                                <div class="col-sm">
                                                                    <Form.Group controlId="formGridNumber">
                                                                        <TextField
                                                                            name="number"
                                                                            value={number}
                                                                            onChange={this.studentChange}
                                                                            fullWidth
                                                                            required
                                                                            id="outlined-required"
                                                                            label="Telefono numeris"
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
                                                                    <Button variant="outlined" color="success" type="submit" fullWidth ><span>Atnaujinti studento informaciją</span></Button>{' '}
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

export default withRouter(EditStudent);