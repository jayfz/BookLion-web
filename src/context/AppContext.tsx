import useLocalStorage from "@/hooks/useLocalStorage";
import axios from "@/service/AxiosDefaults";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

type AppContextContextType = {
    lightMode: boolean;
    toggleLightMode: () => void;

    user: User | null;
    login: (token: string) => void;
    logout: () => void;

    globalLoadingCounter: number;
    increaseLoadingCounter: () => void;
    decreaseLoadingCounter: () => void;
};

type User = {
    username: string;
    firstName: string;
    lastName: string;
    token: string;
};

type AppProviderProps = {
    children: ReactNode;
};

const AppContext = createContext<AppContextContextType | null>(null);

export function AppProvider({ children }: AppProviderProps) {
    const [user, setUser] = useLocalStorage("user", null); //useState<User | null>(null);
    const [lightMode, setLightMode] = useState(true);
    const [globalLoadingCounter, setGlobalLoadingCounter] = useState(0);

    axios.defaults.headers.common["Authorization"] = user != null ? `Bearer ${user?.token}` : "";
    const login = (token: string) => {
        const user: User = {
            username: "johanntheboss",
            firstName: "Johann",
            lastName: "Klauss",
            token: token,
        };
        setUser(user);
    };

    const logout = () => {
        setUser(null);
        // axios.defaults.headers.common["Authorization"] = "";
    };

    const toggleLightMode = () => {
        setLightMode((prev) => !prev);
    };

    const increaseLoadingCounter = () => {
        setGlobalLoadingCounter((prev) => prev + 1);
    };
    const decreaseLoadingCounter = () => {
        setGlobalLoadingCounter((prev) => prev - 1);
    };

    const providerValue: AppContextContextType = {
        lightMode,
        toggleLightMode,
        user,
        login,
        logout,
        globalLoadingCounter,
        increaseLoadingCounter,
        decreaseLoadingCounter,
    };

    useEffect(() => {
        console.log("adjusting token");

        axios.defaults.headers.common["Authorization"] = user?.token != undefined ? `Bearer ${user?.token}` : "";
    }, [user]);

    return <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>;
}

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext has to be used within <AppContext.Provider>");
    }

    return context;
};
