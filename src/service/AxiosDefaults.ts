import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_BASE_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";

export async function sleep(miliseconds: number) {
    return await new Promise((resolve) => setTimeout(resolve, miliseconds));
}

async function artificialNetworkDelay(config: any) {
    if (import.meta.env.DEV) {
        await sleep(import.meta.env.VITE_ARTIFICIAL_NETWORK_DELAY_IN_MILISECONDS);
    }

    return config;
}

axios.interceptors.request.use(artificialNetworkDelay);

export default axios;
