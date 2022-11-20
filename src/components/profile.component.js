import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { Girl } from "@mui/icons-material";
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

    var username = currentUser.username;

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
          <Box
            sx={{
              display: 'flex',
              '& > :not(style)': {
                m: 1,
                width: 700
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
                    <Grid item xs>
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
                                          label="Slapyvardis"
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
                                  <Grid item
                                  >
                                    <div class="row">
                                      <div class="col-sm">
                                        <TextField
                                          fullWidth
                                          id="outlined-read-only-input"
                                          label="Galiojimas iki"
                                          value={currentUser.validityUntil}
                                          InputProps={{
                                            readOnly: true,
                                          }}
                                        />
                                      </div>
                                      <div class="col-sm">
                                        <TextField
                                          fullWidth
                                          id="outlined-read-only-input"
                                          label="Lytis"
                                          value={currentUser.gender}
                                          InputProps={{
                                            readOnly: true,
                                          }}
                                        />
                                      </div>
                                      <div class="col-sm">
                                        <TextField
                                          fullWidth
                                          id="outlined-read-only-input"
                                          label="Gimimo data"
                                          value={currentUser.dateOfBirth}
                                          InputProps={{
                                            readOnly: true,
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </Grid>
                                  <Grid item
                                  >
                                    <div class="row">
                                      <div class="col-sm">
                                        <TextField
                                          fullWidth
                                          id="outlined-read-only-input"
                                          label="Kambario numeris"
                                          value={currentUser.roomNUmber}
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
                                          label="El. paštas"
                                          value={currentUser.email}
                                          InputProps={{
                                            readOnly: false,
                                          }}
                                        />
                                      </div>
                                      <div class="col-sm">
                                        <TextField
                                          fullWidth
                                          id="outlined-read-only-input"
                                          label="Tel. numeris"
                                          value={currentUser.number}
                                          InputProps={{
                                            readOnly: false,
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
                    <Grid item>
                      <Button fullWidth variant="outlined" color="success">Išsaugoti pakeitimus</Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Box>
          <Box
            sx={{
              display: 'flex',
              '& > :not(style)': {
                m: 1,
                width: 400
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
                        fullWidth
                        id="outlined-read-only-input"
                        label="Dabartinis slaptažodis"
                        type="password"
                        InputProps={{
                          readOnly: false,
                          autoComplete: "new-password"
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        fullWidth
                        id="outlined-read-only-input"
                        label="Naujas slaptaždis"
                        InputProps={{
                          readOnly: false,
                        }}
                        type="password"
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        fullWidth
                        id="outlined-read-only-input"
                        label="Pakartokite naują slaptažodį"
                        InputProps={{
                          readOnly: false,
                        }}
                        type="password"
                      />
                    </Grid>
                    <Grid item>
                      <Button fullWidth variant="outlined" color="success">Pakeisti slaptažodį</Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Box>
      </Box>

      // <Box>
      //   <Box
      //     sx={{
      //       display: 'flex',
      //       '& > :not(style)': {
      //         m: 1,
      //         width: 1200
      //       },
      //     }}
      //   >
      //     <Paper
      //       sx={{
      //         p: 2,
      //         margin: 'auto',
      //         maxWidth: 800,
      //         backgroundColor: (theme) =>
      //           theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      //       }}
      //     >
      //       <Grid container spacing={2}>
      //         <Grid item xs={8} sm container>
      //           <Grid item xs container direction="column" spacing={2}>
      //             <Grid item xs>
      //               <TextField
      //                 fullWidth
      //                 id="outlined-read-only-input"
      //                 label="Slapyvardis"
      //                 value={currentUser.username}
      //                 InputProps={{
      //                   readOnly: true,
      //                 }}
      //               />
      //               <TextField
      //                 id="outlined-read-only-input"
      //                 label="Vardas"
      //                 value={currentUser.firstName}
      //                 InputProps={{
      //                   readOnly: true,
      //                 }}
      //               />
      //               <TextField
      //                 id="outlined-read-only-input"
      //                 label="Pavardė"
      //                 value={currentUser.lastName}
      //                 InputProps={{
      //                   readOnly: true,
      //                 }}
      //               />
      //               <TextField
      //                 id="outlined-read-only-input"
      //                 label="El. paštas"
      //                 value={currentUser.email}
      //                 InputProps={{
      //                   readOnly: false,
      //                 }}
      //               />
      //               <TextField
      //                 id="outlined-read-only-input"
      //                 label="Tel. numeris"
      //                 value={currentUser.number}
      //                 InputProps={{
      //                   readOnly: false,
      //                 }}
      //               />
      //             </Grid>
      //           </Grid>
      //         </Grid>
      //       </Grid>
      //     </Paper>
      //     <Paper
      //       sx={{
      //         p: 2,
      //         margin: 'auto',
      //         maxWidth: 400,
      //         backgroundColor: (theme) =>
      //           theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      //       }}
      //     >
      //       <Grid container spacing={2}>
      //         <Grid item xs={8} sm container>
      //           <Grid item xs container direction="column" spacing={2}>
      //             <Grid item xs>
      //               <Typography gutterBottom variant="subtitle1" component="div">
      //                 Standard license
      //               </Typography>
      //               <Typography variant="body2" gutterBottom>
      //                 Full resolution 1920x1080 • JPEG
      //               </Typography>
      //               <Typography variant="body2" color="text.secondary">
      //                 ID: 1030114
      //               </Typography>
      //             </Grid>
      //             <Grid item>
      //               <Typography sx={{ cursor: 'pointer' }} variant="body2">
      //                 Remove
      //               </Typography>
      //             </Grid>
      //           </Grid>
      //           <Grid item>
      //             <Typography variant="subtitle1" component="div">
      //               $19.00
      //             </Typography>
      //           </Grid>
      //         </Grid>
      //       </Grid>
      //     </Paper>
      //   </Box>
      // </Box>


















      // <div className="container">
      //   {(this.state.userReady) ?
      //     <div>
      //       <header className="jumbotron">
      //         <h3>
      //           <strong>{currentUser.username}</strong> Profile
      //         </h3>
      //       </header>
      //       <p>
      //         <strong>Token:</strong>{" "}
      //         {currentUser.accessToken.substring(0, 20)} ...{" "}
      //         {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      //       </p>
      //       <p>
      //         <strong>Id:</strong>{" "}
      //         {currentUser.id}
      //       </p>
      //       <p>
      //         <strong>Email:</strong>{" "}
      //         {currentUser.email}
      //       </p>
      //       <strong>Authorities:</strong>
      //       <ul>
      //         {currentUser.roles &&
      //           currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      //       </ul>
      //     </div> : null}
      // </div>
    );
  }
}
