import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Box } from "@mui/system";
import { Button, Card, CardContent, CardActions, Divider, Grid, Paper, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, IconButton, ButtonGroup } from "@mui/material";
import { Table } from 'react-bootstrap';

import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import MarkunreadMailboxRoundedIcon from '@mui/icons-material/MarkunreadMailboxRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import Toast from "../../alerts/toast.component";

import RoomService from "../../../services/RoomService";
import { withRouter } from '../../../common/with-router';
import ParcelsService from "../../../services/ParcelsService";
import MessagesService from "../../../services/MessagesService";

class MessagesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            open: false,
            showDeleteAlert: false,
            currentPage: 1,
            messagesPerPage: 1
        };
    }

    handleClickOpen = () => {
        this.setState({
            "open": true
        })
    }

    handleClose = () => {
        this.setState({
            "open": false
        })
    }

    componentDidMount() {
        MessagesService.getAllMessages().then((res) => {
            this.setState({ messages: res.data });
        })
    }

    deleteMessage = (messageId) => {
        MessagesService.deleteMessage(messageId)
            .then(response => {
                if (response.data != null) {
                    this.setState({ "showDeleteAlert": true })
                    setTimeout(() => this.setState({ "showDeleteAlert": false }), 5000);
                    window.location.reload();
                }
                else {
                    this.setState({ "showDeleteAlert": false })
                }
            });
    };

    changePage = event => {
        this.setState({
            [event.target.name]: parseInt(event.target.value)
        })
    }

    firstPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: 1
            });
        }
    }

    prevPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: this.state.currentPage - 1
            });
        }
    }

    lastPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.messages.length / this.state.messagesPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.messages.length / this.state.messagesPerPage)
            });
        }
    }

    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.messages.length / this.state.messagesPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    }

    render() {

        const { messages, currentPage, messagesPerPage } = this.state;
        const lastIndex = currentPage * messagesPerPage;
        const firstIndex = lastIndex - messagesPerPage;
        const currentMessage = messages.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(messages.length / messagesPerPage);

        return (

            <div>
                <div style={{ "display": this.state.show ? "block" : "none" }}>
                    <Toast show={this.state.show} message={"Pranešimas sėkmingai ištrintas"} type={"error"} />
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
                                        <Grid item>

                                            {
                                                currentMessage.map(
                                                    message =>
                                                        <div key={message.id}>
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
                                                                        <div>
                                                                            <div>
                                                                                Pranešimo tipas:
                                                                                {message.messageType === "Gedimas" ?
                                                                                    (<span style={{ backgroundColor: 'rgba(245, 66, 66, 0.3)', borderRadius: 12, padding: 4, margin: 10 }} ><FiberManualRecordRoundedIcon color="error" fontSize="small" />Gedimas</span>) :
                                                                                    message.messageType === "Nusiskundimas" ?
                                                                                        <span style={{ backgroundColor: 'rgba(245, 233, 66, 0.3)', borderRadius: 12, padding: 4, margin: 10 }} ><FiberManualRecordRoundedIcon color="warning" fontSize="small" />Nusiskundimas</span> :
                                                                                        message.messageType === "Prašymas" ?
                                                                                            <span style={{ backgroundColor: 'rgba(66, 245, 78, 0.3)', borderRadius: 12, padding: 4, margin: 10 }} ><FiberManualRecordRoundedIcon color="success" fontSize="small" />Prašymas</span> :
                                                                                            <span style={{ backgroundColor: 'rgba(66, 173, 245, 0.3)', borderRadius: 12, padding: 4, margin: 10 }} ><FiberManualRecordRoundedIcon color="info" fontSize="small" />Kita</span>
                                                                                }
                                                                            </div>

                                                                        </div>
                                                                    </Typography>
                                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                                                        {message.messageDate}
                                                                    </Typography>
                                                                    <Divider />
                                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary" paddingTop={1}>
                                                                        Studentas: {message.firstName} {message.lastName}
                                                                    </Typography>
                                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                                        Kambario numeris: {message.roomNumber}
                                                                    </Typography>
                                                                    <Typography variant="h6" component="div">{message.messageTitle}</Typography>
                                                                    <Typography variant="body2">{message.message}</Typography>
                                                                </CardContent>
                                                                <CardActions>
                                                                    <Button size="small" color="error" onClick={this.deleteMessage.bind(this, message.id)}>Trinti pranešimą</Button>
                                                                </CardActions>

                                                            </Card>
                                                        </div>

                                                )
                                            }
                                        </Grid>
                                        <Grid item paddingTop={2}>
                                            <div style={{ "float": "left" }}>
                                                {currentPage} pranešimas iš {totalPages}
                                            </div>
                                            <div style={{ "float": "right" }}>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        '& > *:': {
                                                            m: 1
                                                        },
                                                    }}
                                                >
                                                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                                                        <Button disabled={currentPage === 1 ? true : false} onClick={this.firstPage} ><KeyboardDoubleArrowLeftRoundedIcon /></Button>
                                                        <Button disabled={currentPage === 1 ? true : false} onClick={this.prevPage} ><KeyboardArrowLeftRoundedIcon /></Button>
                                                        <TextField sx={{ width: 50 }} size="small" length="20" name="currentPage" value={currentPage} onChange={this.changePage} InputProps={{
                                                            readOnly: true,
                                                        }}></TextField>
                                                        <Button disabled={currentPage === totalPages ? true : false} onClick={this.nextPage} ><KeyboardArrowRightRoundedIcon /></Button>
                                                        <Button disabled={currentPage === totalPages ? true : false} onClick={this.lastPage} ><KeyboardDoubleArrowRightRoundedIcon /></Button>
                                                    </ButtonGroup>
                                                </Box>
                                            </div>
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

export default withRouter(MessagesList);
