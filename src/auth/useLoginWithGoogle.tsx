import { useAppContext } from "@/context/AppContext";
import { loginWithGoogle } from "@/service/ApiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useLoginWithGoogle() {
    const { login } = useAppContext();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: googleLogin, isPending: isLoggingWithGoogle } = useMutation({
        mutationFn: loginWithGoogle,
        onSuccess: (payload) => {
            toast.success("Succesfully logged in!");
            queryClient.setQueryData(["token"], payload.token);
            login(payload.token);
            navigate("/dashboard/overview", { replace: true });
        },
        onError: () => {
            toast.error("Unable to verify your Google identity");
        },
    });

    return { googleLogin, isLoggingWithGoogle };
}
