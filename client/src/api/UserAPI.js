import axios from "axios";
import requestConfigJson from "./configJson";

const BASE_URL = "http://localhost:8090";

class UserAPI {
    // User Login
    static userLogin = (data) => {
        return axios.post(`${BASE_URL}/user/login`, data);
    };

    // User Signup
    static userSignUp = (values) => {
        return axios.post(`${BASE_URL}/user/signup`, values, requestConfigJson);
    };
}

export default UserAPI;
