import { ReactNode, createContext, useState } from "react";
import { User, UserData } from "../types/responseTypes";
import { getUser } from "../utils/request";

type authType = {
    authenticated: boolean;
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    setTokensAfterSignin(data: UserData): void;
    setTokensOnLoad(): boolean;
};
const authInitial: authType = {
    authenticated: false,
    setAuthenticated: () => {},
    token: "",
    setToken: () =>
        localStorage.getItem("task-manager-token")
            ? JSON.parse(localStorage.getItem("task-manager-token")!)
            : null,
    user: null,
    setUser: () =>
        localStorage.getItem("task-manager-userId")
            ? JSON.parse(localStorage.getItem("task-manager-userId")!)
            : null,
    setTokensAfterSignin: () => {},
    setTokensOnLoad: () => false,
};

export const AuthContext = createContext<authType>(authInitial);

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [token, setToken] = useState<string>("");
    // const [refreshToken, setRefreshToken] = useState<string>("");
    const [user, setUser] = useState<User | null>(null);

    function setTokensAfterSignin(data: UserData): void {
        setToken(data.accessToken);
        // localStorage.setItem("task-manager-token", JSON.stringify(data.accessToken));
        setUser(data.user);
        // localStorage.setItem("task-manager-userId", JSON.stringify(data.createdUser._id));
        setAuthenticated(true);
    }

    async function setTokensOnLoad(): boolean {
        if (authenticated) return false;

        const token = JSON.parse(localStorage.getItem("task-manager-token")!);
        const userId = JSON.parse(localStorage.getItem("task-manager-userId")!);
        const response = await getUser(userId, token);

        if (response.status == "success" && response.data) {
            setToken(token);
            const { _id, firstname, lastname, email } = response.data;
            const user: User = { _id, firstname, lastname, email };
            setUser(user);
            setAuthenticated(true);
            return true;
        } else {
            setAuthenticated(false);
            return false;
        }
    }
    // async function setTokensOnLoad() {
    //     setAuthenticated(true);
    // }
    return (
        <AuthContext.Provider
            value={{
                authenticated,
                setAuthenticated,
                token,
                setToken,
                user,
                setUser,
                setTokensAfterSignin,
                setTokensOnLoad,
            }}>
            {children}
        </AuthContext.Provider>
    );
}
