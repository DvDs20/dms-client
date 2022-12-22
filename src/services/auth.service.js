import axios from "axios";

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
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
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

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
