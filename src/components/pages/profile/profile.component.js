import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../../../services/auth.service";

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/system";
import TextField from '@mui/material/TextField';
import { Button, Divider } from "@mui/material";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (


      <Box>
        <Box
          sx={{
            display: 'flex',
            '& > :not(style)': {
              m: 1,
              width: 1200
            },
          }}
        >
          <Paper
            sx={{
              p: 2,
              margin: 'auto',
              maxWidth: 1100,
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={8} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Grid item paddingBottom={2}>
                      <Typography gutterBottom variant="subtitle1" component="div">Profilio informacija</Typography>
                      <Divider />
                    </Grid>
                    <div class="accordion" id="accordionExample">
                      <div class="card">
                        <div class="card-header" id="headingOne">
                          <h2 class="mb-0">
                            <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                              Asmeninė informacija
                            </button>
                          </h2>
                        </div>

                        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                          <div class="card-body">
                            <div class="container">
                              <Grid item xs container direction="column" spacing={2}>
                                <Grid item
                                >
                                  <div class="row">
                                    <div class="col-sm">
                                      <TextField
                                        fullWidth
                                        id="outlined-read-only-input"
                                        label="Vardas"
                                        value={currentUser.firstName}
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                      />
                                    </div>
                                    <div class="col-sm">
                                      <TextField
                                        fullWidth
                                        id="outlined-read-only-input"
                                        label="Pavardė"
                                        value={currentUser.lastName}
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                      />
                                    </div>
                                  </div>
                                </Grid>
                                <Grid item>
                                  <div class="row">
                                    <div class="col-sm">
                                      <TextField
                                        fullWidth
                                        id="outlined-read-only-input"
                                        label="Prisijungimo vardas"
                                        value={currentUser.username}
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                      />
                                    </div>
                                    <div class="col-sm">
                                      <TextField
                                        fullWidth
                                        id="outlined-read-only-input"
                                        label="Akademinė grupė"
                                        value={currentUser.academicGroup}
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                      />
                                    </div>
                                  </div>
                                </Grid>
                              </Grid>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="card">
                        <div class="card-header" id="headingTwo">
                          <h2 class="mb-0">
                            <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                              Kontaktinė informacija
                            </button>
                          </h2>
                        </div>

                        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                          <div class="card-body">
                            <div class="container">
                              <Grid item xs container direction="column" spacing={2}>
                                <Grid item
                                >
                                  <div class="row">
                                    <div class="col-sm">
                                      <TextField
                                        fullWidth
                                        id="outlined-read-only-input"
                                        label="Elektroninis paštas"
                                        value={currentUser.email}
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                      />
                                    </div>
                                    <div class="col-sm">
                                      <TextField
                                        fullWidth
                                        id="outlined-read-only-input"
                                        label="Telefono numeris"
                                        value={currentUser.number}
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                      />
                                    </div>
                                  </div>
                                </Grid>
                              </Grid>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    );
  }
}