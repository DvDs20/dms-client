import axios from "axios";
import authHeader from "./auth-header";

const API_BASE_URL = "https://dormitory-m-s-backend.herokuapp.com/api/v1/";

class LookupService {

    getAvailableStudentsList() {
        return axios.get(API_BASE_URL + 'students-without-expired-contracts',
            { headers: authHeader() });
    }

    getAvailableRoomList() {
        return axios.get(API_BASE_URL + 'free-rooms',
            { headers: authHeader() });
    }

    getAvailableStudentsListWhichDoNotHaveParcelMessage() {
        return axios.get(API_BASE_URL + 'students-which-do-not-have-parcel-message',
            { headers: authHeader() });
    }

}

export default new LookupService()