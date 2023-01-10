import React, { Component } from "react";
import { Link } from 'react-router-dom';

import UserService from "../../../services/user.service";
import { Box } from "@mui/system";
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import Toast from "../../alerts/toast.component";
import { Button, Divider, Grid, Paper, Typography, TextField, ButtonGroup } from "@mui/material";
import { Table } from 'react-bootstrap';
import { withRouter } from '../../../common/with-router';

class StudentsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            students: [],
            currentPage: 1,
            studentsPerPage: 8
        };
    }

    componentDidMount() {
        UserService.getStudentsList().then((res) => {
            this.setState({ students: res.data });
        });
    }

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
        if (this.state.currentPage < Math.ceil(this.state.students.length / this.state.studentsPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.students.length / this.state.studentsPerPage)
            });
        }
    }

    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.students.length / this.state.studentsPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    }

    render() {

        const { students, currentPage, studentsPerPage } = this.state;
        const lastIndex = currentPage * studentsPerPage;
        const firstIndex = lastIndex - studentsPerPage;
        const currentStudents = students.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(students.length / studentsPerPage);

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
                                                        currentStudents.map(
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
                                                                        student.userStatus === 1 ? (<Link to={"/contracts/info/" + student.contractId} style={{ textDecoration: 'none' }}><span style={{ backgroundColor: 'rgba(47, 122, 32, 0.3)', borderRadius: 12, padding: 4, margin: 10 }} ><FiberManualRecordRoundedIcon color="success" fontSize="small" />Galiojanti sutartis</span></Link>) :
                                                                            student.userStatus === 2 ? (<span style={{ backgroundColor: 'rgba(186, 162, 26, 0.3)', borderRadius: 12, padding: 4, margin: 10 }} ><FiberManualRecordRoundedIcon color="warning" fontSize="small" />Be sutarties</span>) :
                                                                                student.userStatus === 3 ? (<Link to={"/contracts/info/" + student.contractId} style={{ textDecoration: 'none' }}><span style={{ backgroundColor: 'rgba(26, 34, 186, 0.3)', borderRadius: 12, padding: 4, margin: 10 }} ><FiberManualRecordRoundedIcon color="info" fontSize="small" />Nepasirašyta sutartis</span></Link>) :
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
                                        <Grid item paddingTop={2}>
                                            <div style={{ "float": "left" }}>
                                                Rodomas puslapis {currentPage} iš {totalPages}
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