import { maxWidth, width } from "@mui/system";
import React, { Component } from "react";

import UserService from "../services/user.service";

import MyLogo from "../assets/logo.png";
import { Box, Container, CssBaseline } from "@mui/material";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 25,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <img
            src={MyLogo}
            height="175"
            loading="lazy"
          >

          </img>
        </Box>
      </Container>
    );
  }
}
