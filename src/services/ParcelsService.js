import axios from "axios";
import authHeader from "./auth-header";

const PARCEL_API_BASE_URL = "https://dormitory-m-s-backend.herokuapp.com/api/v1/parcels";

class ParcelService {

    getParcelsList() {
        return axios.get(PARCEL_API_BASE_URL, { headers: authHeader() });
    }

    deleteParcelMessage(parcelId) {
        return axios.delete(PARCEL_API_BASE_URL + "/" + parcelId, { headers: authHeader() });
    }

    createNewParcelMessage(parcel) {
        return axios.post(PARCEL_API_BASE_URL, parcel, { headers: authHeader() });
    }
}

export default new ParcelService()