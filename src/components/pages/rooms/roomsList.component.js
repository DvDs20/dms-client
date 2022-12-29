import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Box } from "@mui/system";
import { Button, ButtonGroup, Divider, Grid, Paper, TextField, Typography } from "@mui/material";
import { Table } from 'react-bootstrap';

import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';

import Toast from "../../alerts/toast.component";

import RoomService from "../../../services/RoomService";
import { withRouter } from '../../../common/with-router';

class RoomsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            currentPage: 1,
            roomsPerPage: 8
        };
    }

    componentDidMount() {

        RoomService.getRoomsList().then((res) => {
            this.setState({ rooms: res.data });
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
        if (this.state.currentPage < Math.ceil(this.state.rooms.length / this.state.roomsPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.rooms.length / this.state.roomsPerPage)
            });
        }
    }

    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.rooms.length / this.state.roomsPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    }

    render() {

        const { rooms, currentPage, roomsPerPage } = this.state;
        const lastIndex = currentPage * roomsPerPage;
        const firstIndex = lastIndex - roomsPerPage;
        const currentRooms = rooms.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(rooms.length / roomsPerPage);

        return (

            <div>
                <div style={{ "display": this.state.show ? "block" : "none" }}>
                    <Toast show={this.state.show} message={"Kambarys ištrintas sėkmingai!"} type={"error"} />
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
                                            <Typography gutterBottom variant="subtitle1" component="div">Kambarių sąrašas</Typography>
                                            <Divider />
                                        </Grid>
                                        <Grid item>
                                            <Table bordered hover striped variant="#edebeb">
                                                <thead>
                                                    <tr>
                                                        <th>Kambario numeris</th>
                                                        <th>Statusas</th>
                                                        <th>Aukštas</th>
                                                        <th>Miegamų vietų skaičius</th>
                                                        <th>Likęs miegamų vietų skaičius</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        currentRooms.map(
                                                            room =>
                                                                <tr key={room.id}>
                                                                    <td>
                                                                        <Link to={"/rooms/edit/" + room.id}>
                                                                            <span style={{ color: '#1E71C9' }} >{room.roomNumber}</span>
                                                                        </Link>
                                                                    </td>
                                                                    <td> {room.roomStatus === 0 ?
                                                                        (<span style={{ backgroundColor: 'rgba(227, 30, 16, 0.3)', borderRadius: 12, padding: 4, margin: 10 }} ><FiberManualRecordRoundedIcon color="error" fontSize="small" />Užimtas</span>) :
                                                                        room.roomStatus === 1 ? (<span style={{ backgroundColor: 'rgba(47, 122, 32, 0.3)', borderRadius: 12, padding: 4, margin: 10 }} ><FiberManualRecordRoundedIcon color="success" fontSize="small" />Laisvas</span>) :
                                                                            room.roomStatus === 2 ? (<span style={{ backgroundColor: 'rgba(186, 162, 26, 0.3)', borderRadius: 12, padding: 4, margin: 10 }} ><FiberManualRecordRoundedIcon color="warning" fontSize="small" />Dalinai užimtas</span>) :
                                                                                (<span style={{ backgroundColor: 'rgba(47, 122, 32, 0.3)', borderRadius: 12, padding: 4, margin: 10 }} ><FiberManualRecordRoundedIcon color="success" fontSize="small" />Laisvas</span>)
                                                                    }
                                                                    </td>
                                                                    <td> {room.floor} </td>
                                                                    <td> {room.roomCapacity} </td>
                                                                    <td> {room.leftRoomCapacity} </td>
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
                                            <Link to={"/add-room"}
                                                style={{ textDecoration: 'none' }}
                                            >
                                                <Button variant="outlined" color="success"><span>Pridėti naują kambarį</span></Button>
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

export default withRouter(RoomsList);
