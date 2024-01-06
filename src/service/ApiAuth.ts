import axios from "@/service/AxiosDefaults";

type AppResponse<T> = {
    status: "success" | "fail" | "error";
    data: T;
};

type TokenPayload = {
    token: string;
};

export async function loginWithPassword(email: string, password: string) {
    const { data } = await axios.post<AppResponse<TokenPayload>>("/auth/login", {
        email,
        password,
    });

    return data;
}
