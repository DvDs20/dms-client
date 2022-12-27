import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import { withRouter } from "../../../common/with-router";

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/system";
import TextField from '@mui/material/TextField';
import { Button, Divider } from "@mui/material";
import authService from "../../../services/auth.service";
import Toast from "../../alerts/toast.component";

class ChangePassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: this.initialState,
            showUpdateAlert: false,
            showOldPasswordIsIncorrectAlert: false,
            showNewPasswordsDoNotMatchAlert: false,
        };
    }

    initialState = {
        id: '', password: '', newPassword: '', newRepeatedPassword: ''
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser, userReady: true })
    }

    passwordChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    changePassword = event => {
        event.preventDefault();

        const { id } = this.props.router.params;

        const changePasswordPayload = {
            id: id,
            password: this.state.password,
            newPassword: this.state.newPassword,
            newRepeatedPassword: this.state.newRepeatedPassword
        };

        authService.changePassword(changePasswordPayload)
            .then(response => {
                if (response.data != null) {
                    this.setState({ "showUpdateAlert": true })
                    setTimeout(() => this.setState({ "showUpdateAlert": false }), 5000);
                }
                else {
                    this.setState({ "showUpdateAlert": false })
                }
            }).catch((error) => {
                if (error.response.data === "Įvestas neteisingas senas slaptažodis") {
                    this.setState({ "showOldPasswordIsIncorrectAlert": true })
                    setTimeout(() => this.setState({ "showOldPasswordIsIncorrectAlert": false }), 5000);
                }
                if (error.response.data === "Įvesti nauji slaptažodžiai nesutampa!") {
                    this.setState({ "showNewPasswordsDoNotMatchAlert": true })
                    setTimeout(() => this.setState({ "showNewPasswordsDoNotMatchAlert": false }), 5000);
                }
            })
        this.setState(this.initialState);
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />
        }

        const { password, newPassword, newRepeatedPassword } = this.state;

        return (
            <div>
                <div style={{ "display": this.state.showUpdateAlert ? "block" : "none" }}>
                    <Toast show={this.state.showUpdateAlert} message={"Slaptažodis pakeistas sėkmingai!"} type={"success"} />
                </div>
                <div style={{ "display": this.state.showOldPasswordIsIncorrectAlert ? "block" : "none" }}>
                    <Toast show={this.state.showOldPasswordIsIncorrectAlert} message={"Įvestas neteisingas senas slaptažodis"} type={"error"} />
                </div>
                <div style={{ "display": this.state.showNewPasswordsDoNotMatchAlert ? "block" : "none" }}>
                    <Toast show={this.state.showNewPasswordsDoNotMatchAlert} message={"Slaptažodžiai nesutampa!"} type={"error"} />
                </div>
                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            '& > :not(style)': {
                                justifyContent: "center",
                                m: 1,
                                marginLeft: 37,
                                width: 500
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                '& > :not(style)': {
                                    m: 1,
                                    width: 600
                                },
                            }}
                        >
                            <Paper
                                sx={{
                                    p: 2,
                                    maxWidth: 400,
                                    maxHeight: 340,
                                    backgroundColor: (theme) =>
                                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                }}
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={8} sm container>
                                        <Grid item xs container direction="column" spacing={2}>
                                            <Grid item
                                            >
                                                <Typography gutterBottom variant="subtitle1" component="div">Slaptažodžio keitimas</Typography>
                                                <Divider />
                                            </Grid>
                                            <Grid item
                                            >
                                                <TextField
                                                    name="password"
                                                    fullWidth
                                                    id="outlined-read-only-input"
                                                    label="Dabartinis slaptažodis"
                                                    type="password"
                                                    value={password}
                                                    onChange={this.passwordChange}
                                                    InputProps={{
                                                        readOnly: false,
                                                        autoComplete: "new-password"
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    name="newPassword"
                                                    fullWidth
                                                    id="outlined-read-only-input"
                                                    label="Naujas slaptaždis"
                                                    value={newPassword}
                                                    onChange={this.passwordChange}
                                                    InputProps={{
                                                        readOnly: false,
                                                    }}
                                                    type="password"
                                                />
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    name="newRepeatedPassword"
                                                    fullWidth
                                                    id="outlined-read-only-input"
                                                    label="Pakartokite naują slaptažodį"
                                                    value={newRepeatedPassword}
                                                    onChange={this.passwordChange}
                                                    InputProps={{
                                                        readOnly: false,
                                                    }}
                                                    type="password"
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Button fullWidth variant="outlined" color="success" onClick={this.changePassword}>Pakeisti slaptažodį</Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Box>
                    </Box>
                </Box>
            </div>


        );
    }
}

export default withRouter(ChangePassword);
