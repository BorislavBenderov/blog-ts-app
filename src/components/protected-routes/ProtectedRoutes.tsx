import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext, IAuth } from "../../contexts/AuthContext";

export const ProtectedRoutes = () => {
    const { loggedUser } = useContext(AuthContext) as IAuth;

    return (
        loggedUser ? <Outlet /> : <Navigate to='/' />
    );
}