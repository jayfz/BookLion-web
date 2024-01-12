import { useAppContext } from "@/context/AppContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const { logout } = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        logout();
        navigate("/login");
    }, [logout, navigate]);
}
