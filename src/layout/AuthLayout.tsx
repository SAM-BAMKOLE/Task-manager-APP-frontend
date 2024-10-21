import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";

export default function AuthLayout() {
    const { authenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (authenticated) navigate("/");
    }, [authenticated, navigate]);
    return <Outlet />;
}
