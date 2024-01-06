import { useAppContext } from "@/context/AppContext";
import { loginWithPassword } from "@/service/ApiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const appContext = useAppContext();

    type LoginMutation = {
        email: string;
        password: string;
    };

    const { mutate: login, isPending: isLoggingIn } = useMutation({
        mutationFn: ({ email, password }: LoginMutation) => loginWithPassword(email, password),
        onSuccess: (payload) => {
            //   toast.remove();
            toast.success("Succesfully logged in!");

            console.log(payload);
            queryClient.setQueryData(["token"], payload.data.token);
            appContext.login(payload.data.token);
            navigate("/overview", { replace: true });
        },
        onError: (err) => {
            console.log(err);
            //   toast.remove();
            toast.error("Provided email or password are incorrect");
        },
    });

    return { login, isLoggingIn };
}
