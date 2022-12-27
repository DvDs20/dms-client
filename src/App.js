import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Button from '@mui/material/Button';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import MarkunreadMailboxRoundedIcon from '@mui/icons-material/MarkunreadMailboxRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';

import AuthService from "./services/auth.service";

import Login from "./components/login/login.component";
import Home from "./components/pages/home/home.component";
import Profile from "./components/pages/profile/profile.component";
import StudentsList from "./components/pages/students/studentsList.components";
import RoomsList from "./components/pages/rooms/roomsList.component";
import AddRoom from "./components/pages/rooms/add-room.component";
import EditRoom from "./components/pages/rooms/edit-room.component";
import AddStudent from "./components/pages/students/add-student.component";


import MyLogo from "./assets/logo.png";

import EventBus from "./common/EventBus";
import EditStudent from "./components/pages/students/edit-student.component";
import ContractsList from "./components/pages/contracts/contractsList.component";
import AddContract from "./components/pages/contracts/add-contract.component";
import InfoContract from "./components/pages/contracts/info-contract.component";
import ContractInfoForStudentComponent from "./components/pages/contracts/contract-info-for-student.component";
import ParcelsListComponents from "./components/pages/parcels/parcelsList.components";
import AddNewParcelMessage from "./components/pages/parcels/add-new-parcel-message.component";
import ChangePassword from "./components/pages/profile/change-password.component";


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
      showContractsList: false,
      showContractForStudent: false,
      showParcelsList: false,
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
        showContractsList: user.roles.includes("ROLE_ADMIN"),
        showContractForStudent: user.roles.includes("ROLE_STUDENT"),
        showParcelsList: user.roles.includes("ROLE_ADMIN"),
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
      showStudentBoard: false,
      showStudentsList: false,
      showRoomsList: false,
      showContractsList: false,
      showContractForStudent: false,
      showParcelsList: false,
      currentUser: undefined,
    });
  }


  render() {
    const { currentUser, showModeratorBoard, showAdminBoard, showStudentBoard, showStudentsList, showRoomsList, showContractsList, showContractForStudent, showParcelsList } = this.state;
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

            {showContractsList && (
              <li className="nav-item">
                <Link to={"/contracts"} className="nav-link">
                  <Button>
                    <ArticleRoundedIcon />
                    <span>Sutartys</span>
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

            {showContractForStudent && (
              <li className="nav-item">
                <Link to={"/student-contract"} className="nav-link">
                  <Button>
                    <ArticleRoundedIcon />
                    <span>Kontraktas</span>
                  </Button>
                </Link>
              </li>
            )}

            {showParcelsList && (
              <li className="nav-item">
                <Link to={"/parcels"} className="nav-link">
                  <Button>
                    <MarkunreadMailboxRoundedIcon />
                    <span>Siuntos</span>
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
                      <Link to={"/change-password/" + localStorage.getItem('id')} className="nav-link">
                        <LockRoundedIcon />
                        <span>  Pakeisti slaptažodį</span>
                      </Link>
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
            <Route path="/profile" element={<Profile />} />
            <Route path="/students" element={<StudentsList />} />
            <Route path="/rooms" element={<RoomsList />} />
            <Route path="/add-room" element={<AddRoom />} />
            <Route path="/rooms/edit/:id" element={<EditRoom />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/students/edit/:id" element={<EditStudent />} />
            <Route path="/contracts" element={<ContractsList />} />
            <Route path="/add-contract" element={<AddContract />} />
            <Route path="/contracts/info/:id" element={<InfoContract />} />
            <Route path="/student-contract" element={<ContractInfoForStudentComponent />} />
            <Route path="/parcels" element={<ParcelsListComponents />} />
            <Route path="/create-new-parcel-message" element={<AddNewParcelMessage />} />
            <Route path="/change-password/:id" element={<ChangePassword />} />
          </Routes>
        </div>

        {/* <AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;