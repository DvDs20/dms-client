import axios from "axios";
import authHeader from "../services/auth-header";

const API_URL = "https://dormitory-m-s-backend.herokuapp.com/api/auth/";

class AuthService {
  async login(username, password) {
    const response = await axios
      .post(API_URL + "signin", {
        username,
        password
      });
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("id", JSON.stringify(response.data.id))
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("id");
  }

  register(username, email, password, firstName, lastName, number, academicGroup, userStatus) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      firstName,
      lastName,
      number,
      academicGroup,
      userStatus
    });
  }

  updateProfile(id, profile) {
    return axios.put(API_URL + "update-profile/" + id, profile, { headers: authHeader() });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  changePassword(changePasswordPayload) {
    return axios.put(API_URL + "change-password", changePasswordPayload, { headers: authHeader() });
  }
}

export default new AuthService();
