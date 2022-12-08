import React, { Component, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardStudent from "./components/board-student.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import StudentsList from "./components/studentsList.components";
import RoomsList from "./components/roomsList.component";
import AddRoom from "./components/add-room.component";
import EditRoom from "./components/edit-room.component";
import AddStudent from "./components/add-student.component";

import BasicMenu from "./components/menu/dropdown-button";

import MyLogo from "./assets/logo.png";

import EventBus from "./common/EventBus";
import CreateContract from "./components/create-contract.component";
import EditStudent from "./components/edit-student.component";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      showStudentBoard: false,
      showStudentsList: false,
      showRoomsList: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        showStudentBoard: user.roles.includes("ROLE_STUDENT"),
        showStudentsList: user.roles.includes("ROLE_ADMIN"),
        showRoomsList: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      showStudentBoard: false,
      showStudentsList: false,
      showRoomsList: false,
      currentUser: undefined,
    });
  }


  render() {
    const { currentUser, showModeratorBoard, showAdminBoard, showStudentBoard, showStudentsList, showRoomsList } = this.state;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand me-2" to={"/"}>
            <img
              src={MyLogo}
              alt="logo"
              height="35"
              loading="lazy"
            />
          </Link>
          <div className="navbar-nav mr-auto">

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  <Button>
                    Moderatorius
                  </Button>
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  <Button>
                    Administratorius
                  </Button>
                </Link>
              </li>
            )}

            {showStudentsList && (
              <li className="nav-item">
                <Link to={"/students"} className="nav-link">
                  <Button>
                    <PeopleAltRoundedIcon />
                    <span>Studentai</span>
                  </Button>
                </Link>
              </li>
            )}

            {showRoomsList && (
              <li className="nav-item">
                <Link to={"/rooms"} className="nav-link">
                  <Button>
                    <MeetingRoomRoundedIcon />
                    <span>Kambariai</span>
                  </Button>
                </Link>
              </li>
            )}

            {showStudentBoard && (
              <li className="nav-item">
                <Link to={"/student"} className="nav-link">
                  <Button>
                    Studentas
                  </Button>
                </Link>
              </li>
            )}

          </div>

          {currentUser ? (
            <div>
              <div className="col">
                <div className="dropdown">
                  <Button
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true">
                    <PersonRoundedIcon /> {currentUser.username}
                  </Button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li className="nav-item">
                      <Link to={"/profile"} className="nav-link">
                        <AccountBoxRoundedIcon />
                        <span>  Profilis</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <span>   Keisti slaptažodį</span>
                    </li>
                    <li className="nav-item">
                      <a href="/login" className="nav-link" onClick={this.logOut}>
                        <ExitToAppRoundedIcon />
                        <span>  Atsijungti</span>
                      </a>
                    </li>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  <Button variant="outlined">Prisijungti</Button>
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/student" element={<BoardStudent />} />
            <Route path="/user" element={<BoardStudent />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
            <Route path="/students" element={<StudentsList />} />
            <Route path="/rooms" element={<RoomsList />} />
            <Route path="/add-room" element={<AddRoom />} />
            <Route path="/rooms/edit/:id" element={<EditRoom />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/create-contract" element={<CreateContract />} />
            <Route path="/students/edit/:id" element={<EditStudent />} />
          </Routes>
        </div>

        {/* <AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;