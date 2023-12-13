import axios from "axios";

import { API_URL } from "@app/constants.js";

export const getBirthdays = (token) => {
    const header = { headers: { Authorization: `Bearer ${token}` } };

    return axios.get(`${API_URL}birthdays`, header);
}