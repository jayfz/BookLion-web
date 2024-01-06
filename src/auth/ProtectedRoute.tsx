import { useAppContext } from "@/context/AppContext";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
    children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user } = useAppContext();

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
}
