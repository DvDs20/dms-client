import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Box } from "@mui/system";
import { Button, Card, CardContent, CardActions, Divider, Grid, Paper, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, IconButton } from "@mui/material";
import { Table } from 'react-bootstrap';

import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import MarkunreadMailboxRoundedIcon from '@mui/icons-material/MarkunreadMailboxRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import Toast from "../../alerts/toast.component";

import RoomService from "../../../services/RoomService";
import { withRouter } from '../../../common/with-router';
import ParcelsService from "../../../services/ParcelsService";

class ParcelsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            parcels: [],
            open: false
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
        ParcelsService.getParcelsList().then((res) => {
            this.setState({ parcels: res.data });
        })
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
                                            <Typography gutterBottom variant="subtitle1" component="div">Siuntų pranešimų sąrašas</Typography>
                                            <Divider />
                                        </Grid>
                                        <Grid item>

                                            {
                                                this.state.parcels.map(
                                                    parcel =>
                                                        <div>
                                                            <Card sx={{
                                                                marginTop: 2,
                                                                padding: 2,
                                                                maxWidth: 1100,
                                                                backgroundColor: (theme) =>
                                                                    theme.palette.mode === 'dark' ? '#1A2027' : '#F2F2F2',
                                                            }}
                                                                key={parcel.id}
                                                            >
                                                                <CardContent>
                                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                                        {parcel.messageTime}
                                                                    </Typography>
                                                                    <Typography variant="h6" component="div">{parcel.messageTitle}</Typography>
                                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                                        {parcel.firstName} {parcel.lastName}
                                                                    </Typography>
                                                                    <Typography variant="body2">{parcel.message}</Typography>
                                                                </CardContent>
                                                                <CardActions>
                                                                    <Button size="small" color="error">Trinti pranešimą</Button>
                                                                    <Button size="small" color="info" onClick={this.handleClickOpen} >Susisiekti su studentu</Button>
                                                                </CardActions>

                                                            </Card>
                                                            <Dialog
                                                                open={this.state.open}
                                                                onClose={this.handleClose}
                                                                aria-labelledby="alert-dialog-title"
                                                                aria-describedby="alert-dialog-description"
                                                                fullWidth={"lg"}
                                                            >
                                                                <DialogTitle id="alert-dialog-title">
                                                                    Studento kontaktai
                                                                </DialogTitle>
                                                                <DialogContent>
                                                                    <DialogContentText id="alert-dialog-description">
                                                                        <Grid container spacing={2}>
                                                                            <Grid item xs={8} sm container>
                                                                                <Grid item xs container direction="column" spacing={2} >
                                                                                    <Grid item>
                                                                                        <div class="row">
                                                                                            <div class="col-10">
                                                                                                <TextField
                                                                                                    name="number"
                                                                                                    value={parcel.number}
                                                                                                    fullWidth
                                                                                                    id="outlined"
                                                                                                >
                                                                                                </TextField>
                                                                                            </div>
                                                                                            <div class="col-2">
                                                                                                <IconButton onClick={() => { navigator.clipboard.writeText(parcel.number) }}>
                                                                                                    <ContentCopyRoundedIcon />
                                                                                                </IconButton>
                                                                                            </div>
                                                                                        </div>
                                                                                    </Grid>
                                                                                    <Grid item>
                                                                                        <div class="row">
                                                                                            <div class="col-10">
                                                                                                <TextField
                                                                                                    name="email"
                                                                                                    value={parcel.email}
                                                                                                    fullWidth
                                                                                                    id="outlined"
                                                                                                >
                                                                                                </TextField>
                                                                                            </div>
                                                                                            <div class="col-2">
                                                                                                <IconButton onClick={() => { navigator.clipboard.writeText(parcel.email) }}>
                                                                                                    <ContentCopyRoundedIcon />
                                                                                                </IconButton>
                                                                                            </div>
                                                                                        </div>
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </DialogContentText>
                                                                </DialogContent>
                                                                <DialogActions>
                                                                    <Button onClick={this.handleClose}>Uždaryti</Button>
                                                                </DialogActions>

                                                            </Dialog>
                                                        </div>

                                                )
                                            }
                                        </Grid>
                                        <Grid item>
                                            <Link to={"/create-new-parcel-message"}
                                                style={{ textDecoration: 'none' }}
                                            >
                                                <Button variant="outlined" color="success" fullWidth><span>SUkurti naują siuntos pranešimą</span></Button>
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

export default withRouter(ParcelsList);
