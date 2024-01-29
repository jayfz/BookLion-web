import axios from "@/service/AxiosDefaults";
import { AppResponse, TokenPayload } from "@/service/types";

export async function loginWithPassword(email: string, password: string) {
    const { data } = await axios.post<AppResponse<TokenPayload>>("/auth/login", {
        email,
        password,
    });

    return data;
}

export async function loginWithGoogle(googleIdToken: string) {
    const { data } = await axios.post<AppResponse<TokenPayload>>("/auth/google/login", {
        token: googleIdToken,
    });

    return data.data;
}
