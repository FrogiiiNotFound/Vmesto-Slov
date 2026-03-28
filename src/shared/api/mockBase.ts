import axios from "axios";
import { MOCK_API_BASE_URL } from "../utils/constants/api";

export const $mockApi = axios.create({
    baseURL: MOCK_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
