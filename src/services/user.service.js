import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/v1/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getStudentBoard() {
    return axios.get(API_URL + 'student', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  getStudentsList() {
    return axios.get(API_URL + 'students', { headers: authHeader() });
  }

  getStudentById(userId) {
    return axios.get(API_URL + 'students/' + userId, { headers: authHeader() });
  }

  updateStudent(userId, user) {
    return axios.put(API_URL + 'students/' + userId, user, { headers: authHeader() });
  }

  deleteStudent(userId) {
    return axios.delete(API_URL + 'students/' + userId, { headers: authHeader() });
  }
}

export default new UserService();
