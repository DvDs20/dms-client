import axios from "axios";
import authHeader from "./auth-header";

const MESSAGES_API_BASE_URL = "https://dormitory-m-s-backend.herokuapp.com/api/v1";
//const MESSAGES_API_BASE_URL = "http://localhost:8080/api/v1";

class MessagesService {

    sendNewMessage(message) {
        return axios.post(MESSAGES_API_BASE_URL + "/send-new-message", message, { headers: authHeader() });
    }

    getAllMessages() {
        return axios.get(MESSAGES_API_BASE_URL + "/messages", { headers: authHeader() });
    }

    deleteMessage(messageId) {
        return axios.delete(MESSAGES_API_BASE_URL + "/messages/" + messageId, { headers: authHeader() });
    }

}

export default new MessagesService()