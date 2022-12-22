import axios from "axios";
import authHeader from "./auth-header";

const ROOM_API_BASE_URL = "https://dormitory-m-s-backend.herokuapp.com/api/v1/rooms";

class RoomService {

    getRoomsList() {
        return axios.get(ROOM_API_BASE_URL, { headers: authHeader() });
    }

    addRoom(room) {
        return axios.post(ROOM_API_BASE_URL, room, { headers: authHeader() });
    }

    deleteRoom(roomId) {
        return axios.delete(ROOM_API_BASE_URL + "/" + roomId, { headers: authHeader() });
    }

    getRoomById(roomId) {
        return axios.get(ROOM_API_BASE_URL + "/" + roomId, { headers: authHeader() });
    }

    updateRoom(roomId, room) {
        return axios.put(ROOM_API_BASE_URL + "/" + roomId, room, { headers: authHeader() });
    }
}

export default new RoomService()