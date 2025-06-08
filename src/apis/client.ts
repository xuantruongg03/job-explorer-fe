import axios from "axios";
import { stringify } from "qs";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    headers: {
        "content-type": "application/json",
    },
    paramsSerializer: (params) => stringify(params, { encode: false }),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hanldeError = (e: any) => {
    throw e;
};

axiosClient.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, hanldeError);

export default axiosClient;