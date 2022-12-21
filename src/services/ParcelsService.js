import axios from "axios";
import authHeader from "./auth-header";

const PARCEL_API_BASE_URL = "http://localhost:8080/api/v1/parcels";

class ParcelService {

    getParcelsList() {
        return axios.get(PARCEL_API_BASE_URL, { headers: authHeader() });
    }

    deleteParcelMessage(parcelId) {
        return axios.delete(PARCEL_API_BASE_URL + "/" + parcelId, { headers: authHeader() });
    }
}

export default new ParcelService()