import React, { Component } from "react";

import { Box } from "@mui/system";
import { Alert, Button, Divider, Grid, Paper, TextField, Typography } from "@mui/material";
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import Form from 'react-bootstrap/Form';

import Toast from "../../alerts/toast.component";

import ContractsService from "../../../services/ContractsService";
import { withRouter } from "../../../common/with-router";
import authService from "../../../services/auth.service";

class InfoContract extends Component {
    constructor(props) {
        super(props);

        this.state = this.initialState;
        this.state.showDeleteContractAlarm = false;
        this.state.responseStatus = "";
        this.state.currentUser = { id: "" };
    }

    initialState = {
        id: '', roomNumber: '', expireDate: '', contractNumber: '', contractStatus: '', priceForStudent: '', userStatus: ''
    }



    findContractById = () => {
        const currentUser = authService.getCurrentUser();


        ContractsService.getContractInfoForStudent(currentUser.id)
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        id: response.data.id,
                        roomNumber: response.data.roomNumber,
                        expireDate: response.data.expireDate,
                        contractNumber: response.data.contractNumber,
                        contractStatus: response.data.contractStatus,
                        priceForStudent: response.data.priceForStudent,
                        userStatus: response.data.userStatus,
                    })
                }
            }).catch((erorr) => {
                console.error("Error: " + erorr);
                this.setState({
                    responseStatus: erorr.response.status
                })
            });
    }

    componentDidMount() {
        this.findContractById();
    }


    render() {

        const { roomNumber, expireDate, contractNumber, contractStatus, priceForStudent, userStatus, responseStatus } = this.state;

        return (
            <div>
                <div style={{ "display": this.state.showDeleteContractAlarm ? "block" : "none" }}>
                    <Toast show={this.state.showDeleteContractAlarm} message={"Sutartis sėkmingai ištrinta"} type={"error"} />
                </div>
                {
                    responseStatus === 404 ?
                        <div>
                            <Box>
                                <Alert variant="filled" severity="info">Jūs neturite sutarties! Susisiekite su savo bendrabučio administracija</Alert>
                            </Box>
                        </div> :
                        <div></div>
                }

                {
                    userStatus === 1 || userStatus === 3 ?
                        (
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
                                                        <Typography gutterBottom variant="subtitle1" component="div">Sutartis - <i>{contractNumber}</i>
                                                            <span>
                                                                {
                                                                    contractStatus === 0 ?
                                                                        <span style={{ backgroundColor: 'rgba(227, 30, 16, 0.3)', borderRadius: 12, padding: 4, margin: 10 }} ><FiberManualRecordRoundedIcon color="error" fontSize="small" />Nepasirašyta</span> :
                                                                        <span style={{ backgroundColor: 'rgba(47, 122, 32, 0.3)', borderRadius: 12, padding: 4, margin: 10 }} ><FiberManualRecordRoundedIcon color="success" fontSize="small" />Pasirašyta</span>
                                                                }
                                                            </span>
                                                        </Typography>
                                                        <Divider />
                                                    </Grid>
                                                    <Grid item xs container direction="column" spacing={2}>
                                                        <Grid item>
                                                            <Form id="contractFormId">
                                                                <Grid item>
                                                                    <Grid item>
                                                                        <div class="row">
                                                                            <div class="col-sm">
                                                                                <Form.Group controlId="formGridRoomNumber">
                                                                                    <TextField
                                                                                        name="roomNumber"
                                                                                        value={roomNumber}
                                                                                        onChange={this.contractChange}
                                                                                        fullWidth
                                                                                        id="outlined-required"
                                                                                        label="Kambario numeris"
                                                                                        InputProps={{
                                                                                            readOnly: true,
                                                                                        }}
                                                                                    >
                                                                                    </TextField>
                                                                                </Form.Group>
                                                                            </div>

                                                                            <div class="col-sm">
                                                                                <Form.Group controlId="formGridExpireDate">
                                                                                    <TextField
                                                                                        name="expireDate"
                                                                                        value={expireDate}
                                                                                        onChange={this.contractChange}
                                                                                        fullWidth
                                                                                        id="outlined-required"
                                                                                        label="Galiojimas iki"
                                                                                        InputProps={{
                                                                                            readOnly: true,
                                                                                        }}
                                                                                    >
                                                                                    </TextField>
                                                                                </Form.Group>
                                                                            </div>

                                                                            <div class="col-sm">
                                                                                <Form.Group controlId="formGridPriceForStudent">
                                                                                    <TextField
                                                                                        name="priceForStudent"
                                                                                        value={priceForStudent}
                                                                                        onChange={this.contractChange}
                                                                                        fullWidth
                                                                                        id="outlined-required"
                                                                                        label="Kaina mėnesiui"
                                                                                        InputProps={{
                                                                                            readOnly: true,
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
                                                                                {
                                                                                    contractStatus === 0 ?
                                                                                        <Button variant="outlined" color="success" onClick={this.deleteContract} fullWidth ><span>Pasirašyti sutartį</span></Button> :
                                                                                        <div></div>
                                                                                }

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
                            </Box >
                        ) : userStatus === 0 || userStatus === 2 ?
                            <div>
                                <Box>
                                    <Alert variant="filled" severity="info">Jūs neturite sutarties! Susisiekite su savo bendrabučio administracija</Alert>
                                </Box>
                            </div> :
                            <div></div>
                }


            </div >


        );
    }
}

export default withRouter(InfoContract)