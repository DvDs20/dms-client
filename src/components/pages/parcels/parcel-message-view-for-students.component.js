import React, { Component } from "react";

import { Box } from "@mui/system";
import { Button, Card, CardContent, CardActions, Divider, Grid, Paper, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, IconButton, ButtonGroup, Alert } from "@mui/material";
import Textarea from '@mui/joy/Textarea';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import Toast from "../../alerts/toast.component";

import RoomService from "../../../services/RoomService";
import LookupService from "../../../services/LookupService";
import ParcelsService from "../../../services/ParcelsService";

import { withRouter } from "../../../common/with-router";
import authService from "../../../services/auth.service";

class ParcelViewForStudents extends Component {
    constructor(props) {
        super(props);

        this.state = {
            parcel: this.initialState,
            responseStatus: "",
        };
    }

    initialState = {
        id: '', message: '', messageTime: '', messageTitle: '', viewStatus: ''
    }

    changeParcelMessageViewStatus = event => {
        event.preventDefault();
        const currentUser = authService.getCurrentUser();
        const parcel = null;
        ParcelsService.changeParcelMessageViewStatus(currentUser.id, parcel)
            .then(response => {
                if (response.data != null) {
                    window.location.reload();
                }
            })
    }

    componentDidMount() {
        const currentUser = authService.getCurrentUser();

        ParcelsService.getParcelsMessagesByStudentId(currentUser.id)
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        id: response.data.id,
                        message: response.data.message,
                        messageTime: response.data.messageTime,
                        messageTitle: response.data.messageTitle,
                        viewStatus: response.data.viewStatus
                    })
                }
            }).catch((error) => {
                this.setState({
                    responseStatus: error.response.status
                })
            });
    }

    render() {

        const { id, message, messageTime, messageTitle, viewStatus, responseStatus } = this.state;

        return (
            <div>
                <div style={{ "display": this.state.show ? "block" : "none" }}>
                    <Toast show={this.state.show} message={"Siuntos pranešimas sėkmingai ištrintas"} type={"error"} />
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
                                            <Typography gutterBottom variant="subtitle1" component="div">Siuntų pranešimų sąrašas</Typography>
                                            <Divider />
                                        </Grid>
                                        {
                                            responseStatus === 404 ?
                                                <Grid item>
                                                    <Box>
                                                        <Alert variant="filled" severity="info">Po kol kas neturite jokių siuntos pranešimų</Alert>
                                                    </Box>
                                                </Grid> :
                                                <Grid item>
                                                    <div key={id}>
                                                        <Card sx={{
                                                            marginTop: 2,
                                                            padding: 2,
                                                            maxWidth: 1100,
                                                            backgroundColor: (theme) =>
                                                                theme.palette.mode === 'dark' ? '#1A2027' : '#F2F2F2',
                                                        }}
                                                        >
                                                            <CardContent>
                                                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                                    <div>{messageTime}
                                                                        {viewStatus === 1 ?
                                                                            (<span style={{ backgroundColor: 'rgba(227, 30, 16, 0.3)', borderRadius: 12, padding: 4, margin: 10 }} ><FiberManualRecordRoundedIcon color="warning" fontSize="small" />Pranešimas neperžiūrėtas</span>) :
                                                                            <span style={{ backgroundColor: 'rgba(47, 122, 32, 0.3)', borderRadius: 12, padding: 4, margin: 10 }} ><FiberManualRecordRoundedIcon color="info" fontSize="small" />Pranešimas peržiūrėtas</span>
                                                                        }
                                                                    </div>
                                                                </Typography>
                                                                <Typography variant="h6" component="div">{messageTitle}</Typography>
                                                                <Typography variant="body2">{message}</Typography>
                                                            </CardContent>
                                                            <CardActions>
                                                                <Button size="small" color="info" onClick={this.changeParcelMessageViewStatus} >Pažymėti kaip perskaitytą pranešimą</Button>
                                                            </CardActions>
                                                        </Card>
                                                    </div>
                                                </Grid>
                                        }

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

export default withRouter(ParcelViewForStudents);
