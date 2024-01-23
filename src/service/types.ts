export type AppResponse<T> = {
    status: "success" | "fail" | "error";
    data: T;
};

type ResponsePage = {
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
    number: number;
    order: "string";
};
export type PagedAppResponse<T> = AppResponse<T> & {
    page: ResponsePage;
};

export type TokenPayload = {
    token: string;
};
