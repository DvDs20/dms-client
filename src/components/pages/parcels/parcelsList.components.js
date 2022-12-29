import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Box } from "@mui/system";
import { Button, Card, CardContent, CardActions, Divider, Grid, Paper, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, IconButton, ButtonGroup } from "@mui/material";

import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import Toast from "../../alerts/toast.component";

import { withRouter } from '../../../common/with-router';
import ParcelsService from "../../../services/ParcelsService";

class ParcelsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            parcels: [],
            open: false,
            showDeleteAlert: false,
            currentPage: 1,
            parcelsMessagesPerPage: 1
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

    deleteParcelMessage = (parcelId) => {
        ParcelsService.deleteParcelMessage(parcelId)
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
        if (this.state.currentPage < Math.ceil(this.state.parcels.length / this.state.parcelsMessagesPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.parcels.length / this.state.parcelsMessagesPerPage)
            });
        }
    }

    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.parcels.length / this.state.parcelsMessagesPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    }

    render() {

        const { parcels, currentPage, parcelsMessagesPerPage } = this.state;
        const lastIndex = currentPage * parcelsMessagesPerPage;
        const firstIndex = lastIndex - parcelsMessagesPerPage;
        const currentParcels = parcels.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(parcels.length / parcelsMessagesPerPage);

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
                                        <Grid item>

                                            {
                                                currentParcels.map(
                                                    parcel =>
                                                        <div key={parcel.id}>
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
                                                                        <div>{parcel.messageTime}
                                                                            {parcel.viewStatus === 1 ?
                                                                                (<span style={{ backgroundColor: 'rgba(227, 30, 16, 0.3)', borderRadius: 12, padding: 4, margin: 10 }} ><FiberManualRecordRoundedIcon color="warning" fontSize="small" />Pranešimas neperžiūrėtas</span>) :
                                                                                <span style={{ backgroundColor: 'rgba(47, 122, 32, 0.3)', borderRadius: 12, padding: 4, margin: 10 }} ><FiberManualRecordRoundedIcon color="info" fontSize="small" />Prenešimas peržiūrėtas</span>
                                                                            }
                                                                        </div>
                                                                    </Typography>
                                                                    <Typography variant="h6" component="div">{parcel.messageTitle}</Typography>
                                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                                        {parcel.firstName} {parcel.lastName}
                                                                    </Typography>
                                                                    <Typography variant="body2">{parcel.message}</Typography>
                                                                </CardContent>
                                                                <CardActions>
                                                                    <Button size="small" color="error" onClick={this.deleteParcelMessage.bind(this, parcel.id)}>Trinti pranešimą</Button>
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
