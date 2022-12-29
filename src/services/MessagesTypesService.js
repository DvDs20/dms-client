import axios from "axios";
import authHeader from "./auth-header";

const MESSAGES_TYPES_API_BASE_URL = "https://dormitory-m-s-backend.herokuapp.com/api/v1/messages-types";
//const MESSAGES_TYPES_API_BASE_URL = "http://localhost:8080/api/v1/messages-types";

class MessagesTypesService {

    getMessagesTypes() {
        return axios.get(MESSAGES_TYPES_API_BASE_URL, { headers: authHeader() });
    }

}

export default new MessagesTypesService()