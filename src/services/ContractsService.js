import axios from "axios";
import authHeader from "./auth-header";

const CONTRACT_API_BASE_URL = "http://localhost:8080/api/v1/contracts";

class ContractsService {

    getContractsList() {
        return axios.get(CONTRACT_API_BASE_URL, { headers: authHeader() });
    }

    addNewContract(contract) {
        return axios.post(CONTRACT_API_BASE_URL, contract, { headers: authHeader() });
    }

    getContractInfo(contractId) {
        return axios.get(CONTRACT_API_BASE_URL + '/info/' + contractId, { headers: authHeader() });
    }

}

export default new ContractsService()