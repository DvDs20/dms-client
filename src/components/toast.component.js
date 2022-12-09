import React, { Component } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


export default class Toast extends Component {



    render() {
        return (
            <Snackbar open={this.props.show} autoHideDuration={6000}>
                <Alert severity={this.props.type === "error" ? "error" : this.props.type === "success" ? "success" : this.props.type === "warning" ? "warning" : "info"} sx={{ width: '100%' }}>
                    {this.props.message}
                </Alert>
            </Snackbar>
        );
    }
}