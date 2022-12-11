import axios from "axios";
import authHeader from "./auth-header";

const ROOM_API_BASE_URL = "http://localhost:8080/api/v1/contracts";

class ContractsService {

    getContractsList() {
        return axios.get(ROOM_API_BASE_URL, { headers: authHeader() });
    }

    addNewContract(contract) {
        return axios.post(ROOM_API_BASE_URL, contract, { headers: authHeader() });
    }

}

export default new ContractsService()