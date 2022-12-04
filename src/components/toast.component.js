import React, { Component } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


export default class Toast extends Component {



    render() {
        return (
            <Snackbar open={this.props.children.show} autoHideDuration={6000}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    {this.props.children.message}
                </Alert>
            </Snackbar>
        );
    }
}