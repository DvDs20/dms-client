import axios from "axios";
import authHeader from "./auth-header";

const API_BASE_URL = "http://localhost:8080/api/v1/";

class LookupService {

    getAvailableStudentsList() {
        return axios.get(API_BASE_URL + 'students-without-expired-contracts',
            { headers: authHeader() });
    }

    getAvailableRoomList() {
        return axios.get(API_BASE_URL + 'free-rooms',
            { headers: authHeader() });
    }
}

export default new LookupService()