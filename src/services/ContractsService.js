import axios from "axios";
import authHeader from "./auth-header";

const CONTRACT_API_BASE_URL = "https://dormitory-m-s-backend.herokuapp.com/api/v1/contracts";

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

    deleteContract(contractId) {
        return axios.delete(CONTRACT_API_BASE_URL + '/' + contractId, { headers: authHeader() });
    }

    getContractInfoForStudent(studentId) {
        return axios.get(CONTRACT_API_BASE_URL + '/student-contract/' + studentId, { headers: authHeader() });
    }

    assignContract(studentId, contract) {
        return axios.put(CONTRACT_API_BASE_URL + '/student-contract/' + studentId, contract, { headers: authHeader() });
    }

}

export default new ContractsService()