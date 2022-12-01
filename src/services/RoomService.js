import axios from "axios";
import authHeader from "./auth-header";

const ROOM_API_BASE_URL = "http://localhost:8080/api/v1/rooms";

class RoomService {

    getRoomsList() {
        return axios.get(ROOM_API_BASE_URL, { headers: authHeader() });
    }

    addRoom() {
        return axios.post(ROOM_API_BASE_URL, { headers: authHeader() });
    }
}

export default new RoomService()