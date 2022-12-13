import React, { Component } from "react";
import { Link } from 'react-router-dom';

import UserService from "../../../services/user.service";
import { Box } from "@mui/system";
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import Toast from "../../alerts/toast.component";
import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { Table } from 'react-bootstrap';
import { withRouter } from '../../../common/with-router';

class StudentsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            students: []
        };
    }

    componentDidMount() {
        UserService.getStudentsList().then((res) => {
            this.setState({ students: res.data });
        });
    }

    render() {
        return (

            <div>
                <div style={{ "display": this.state.show ? "block" : "none" }}>
                    <Toast show={this.state.show} message={"Studentas sėkmingai ištrintas!"} type={"error"} />
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
                                            <Typography gutterBottom variant="subtitle1" component="div">Studentų sąrašas</Typography>
                                            <Divider />
                                        </Grid>
                                        <Grid item>
                                            <Table bordered hover striped variant="#edebeb">
                                                <thead>
                                                    <tr>
                                                        <th>Pavardė</th>
                                                        <th>Vardas</th>
                                                        <th>Statusas</th>
                                                        <th>Tel. numeris</th>
                                                        <th>Akademinė grupė</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.students.map(
                                                            student =>
                                                                <tr key={student.id}>
                                                                    <td>
                                                                        <Link to={"/students/edit/" + student.id}>
                                                                            <span style={{ color: '#1E71C9' }} >{student.lastName}</span>
                                                                        </Link>
                                                                    </td>
                                                                    <td> {student.firstName} </td>
                                                                    <td> {student.userStatus === 0 ?
                                                                        (<span style={{ backgroundColor: 'rgba(227, 30, 16, 0.3)', borderRadius: 12, padding: 4, margin: 10 }} > <FiberManualRecordRoundedIcon color="error" fontSize="small" />Negaliojanti sutartis</span>) :
                                                                        student.userStatus === 1 ? (<span style={{ backgroundColor: 'rgba(47, 122, 32, 0.3)', borderRadius: 12, padding: 4, margin: 10 }} ><FiberManualRecordRoundedIcon color="success" fontSize="small" />Galiojanti sutartis</span>) :
                                                                            student.userStatus === 2 ? (<span style={{ backgroundColor: 'rgba(186, 162, 26, 0.3)', borderRadius: 12, padding: 4, margin: 10 }} ><FiberManualRecordRoundedIcon color="warning" fontSize="small" />Be sutarties</span>) :
                                                                                student.userStatus === 3 ? (<span style={{ backgroundColor: 'rgba(26, 34, 186, 0.3)', borderRadius: 12, padding: 4, margin: 10 }} ><FiberManualRecordRoundedIcon color="info" fontSize="small" />Nepasirašyta sutartis</span>) :
                                                                                    (<span style={{ backgroundColor: 'rgba(47, 122, 32, 0.3)', borderRadius: 12, padding: 4, margin: 10 }} ><FiberManualRecordRoundedIcon color="success" fontSize="small" />Laisvas</span>)
                                                                    } </td>
                                                                    <td> {student.number} </td>
                                                                    <td> {student.academicGroup} </td>
                                                                </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </Table>
                                        </Grid>
                                        <Grid item>
                                            <Link to={"/add-student"}
                                                style={{ textDecoration: 'none' }}
                                            >
                                                <Button variant="outlined" color="success"><span>Pridėti naują studentą</span></Button>
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

export default withRouter(StudentsList);