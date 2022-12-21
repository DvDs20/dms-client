import React, { Component } from "react";
import Form from "react-validation/build/form";

import CheckButton from "react-validation/build/button";
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import "../../App.css";

import AuthService from "../../services/auth.service";
import { withRouter } from '../../common/with-router';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Visos teisės saugomos © '}
      <Link color="inherit" href="http://localhost:8081/login">
        Bendrabučio valdymo sistema
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

const theme = createTheme();

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.router.navigate("/");
          window.location.reload();
        },
        error => {
          let resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          if (resMessage === "Bad credentials") {
            resMessage = "Blogi prisijungimo duomenys! Patikrinkite ir bandykite iš naujo"
          }

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Form
              onSubmit={this.handleLogin}
              ref={c => {
                this.form = c;
              }}
            >
              <TextField
                sx={{
                  marginBottom: 4
                }}
                size="small"
                label="Prisijungimo vardas"
                fullWidth
                type="text"
                className="form-control"
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
              />


              <TextField
                sx={{
                  marginBottom: 4
                }}
                size="small"
                label="Slaptažodis"
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
              />


              <div className="form-group">
                <button
                  className="btn btn-primary btn-block"
                  disabled={this.state.loading}
                >
                  {this.state.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Prisijungti</span>
                </button>
              </div>

              {this.state.message && (
                <div role="alert">
                  <Alert severity="error">{this.state.message}</Alert>
                </div>
              )}
              <CheckButton
                style={{ display: "none" }}
                ref={c => {
                  this.checkBtn = c;
                }}
              />
            </Form>
          </Box>
        </Container>
        <div>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </div>
      </ThemeProvider>
    );
  }
}

export default withRouter(Login);