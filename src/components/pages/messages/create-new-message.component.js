import React, { Component } from "react";

import { Box } from "@mui/system";
import { Button, Divider, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import Form from 'react-bootstrap/Form';

import Toast from "../../alerts/toast.component";
import SendRoundedIcon from '@mui/icons-material/SendRounded';

import { withRouter } from "../../../common/with-router";
import { Textarea } from "@mui/joy";
import MessagesTypesService from "../../../services/MessagesTypesService";
import MessagesService from "../../../services/MessagesService";
import authService from "../../../services/auth.service";

class CreateNewMessage extends Component {
    constructor(props) {
        super(props);

        this.state = this.initialState;
        this.state.show = false;
        this.sendNewMessage = this.sendNewMessage.bind(this);
        this.state.optionsOfMessageTypes = [];
    }

    initialState = {
        messageType: '', messageTitle: '', message: ''
    }

    messangeChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    sendNewMessage = event => {
        event.preventDefault();
        const currentUser = authService.getCurrentUser();

        const message = {
            studentId: currentUser.id,
            messageType: this.state.messageType,
            messageTitle: this.state.messageTitle,
            message: this.state.message,
        };

        MessagesService.sendNewMessage(message)
            .then(response => {
                if (response.data != null) {
                    this.setState({ "show": true });
                    setTimeout(() => this.setState({ "show": false }), 5000);
                }
                else {
                    this.setState({ "show": false })
                }
            });
        this.setState(this.initialState);
    }

    componentDidMount() {
        MessagesTypesService.getMessagesTypes().then((res) => {
            this.setState({ optionsOfMessageTypes: res.data });
        });
    }

    render() {

        const { messageType, messageTitle, message } = this.state;

        return (
            <div>
                <div style={{ "display": this.state.show ? "block" : "none" }}>
                    <Toast show={this.state.show} message={"Pranešimas sėkmingai išsiųstas!"} type={"success"} />
                </div>
                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            '& > :not(style)': {
                                marginLeft: 23,
                                width: 800
                            },
                        }}
                    >
                        <Paper
                            sx={{
                                p: 2,
                                margin: 'auto',
                                maxWidth: 700,
                                backgroundColor: (theme) =>
                                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                            }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={8} sm container>
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Grid item>
                                            <Typography gutterBottom variant="subtitle1" component="div">Naujo pranešimo kūrimas</Typography>
                                            <Divider />
                                        </Grid>
                                        <Grid item xs container direction="column" spacing={2}>
                                            <Grid item>
                                                <Form onSubmit={this.sendNewMessage} id="roomFormId">
                                                    <Grid item>
                                                        <Grid item>
                                                            <div class="row">
                                                                <div class="col-sm">
                                                                    <Form.Group controlId="formGridMessageType">
                                                                        <InputLabel id="message-type-select-label" >Pranešimo tipas *</InputLabel>
                                                                        <Select
                                                                            labelId="message-type-select-label"
                                                                            id="message-type-select"
                                                                            name="messageType"
                                                                            value={messageType}
                                                                            onChange={this.messangeChange}
                                                                            fullWidth
                                                                        >
                                                                            {
                                                                                this.state.optionsOfMessageTypes.map(option => {
                                                                                    return (
                                                                                        <MenuItem key={option.id} value={option.messageType}>
                                                                                            {option.messageType}
                                                                                        </MenuItem>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </Select>
                                                                    </Form.Group>
                                                                </div>
                                                            </div>
                                                        </Grid>
                                                        <Grid item paddingTop={2}>
                                                            <div class="row">
                                                                <div class="col-sm">
                                                                    <Form.Group controlId="formGridMessageTitle">
                                                                        <TextField
                                                                            name="messageTitle"
                                                                            value={messageTitle}
                                                                            onChange={this.messangeChange}
                                                                            fullWidth
                                                                            required
                                                                            id="outlined-required"
                                                                            label="Pranešimo pavadinimas"
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
                                                                            onChange={this.messangeChange}
                                                                            disabled={false}
                                                                            minRows={8}
                                                                            placeholder="Pranešimas bendrabučio administracijai..."
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
                                                                    <Button variant="outlined" color="success" type="submit" fullWidth ><span>Siųsti</span> <span>  <SendRoundedIcon /></span></Button>{' '}
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

export default withRouter(CreateNewMessage);