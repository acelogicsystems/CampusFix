import { useContext } from "react";
import { Navigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

function RoleRoute({ children, allowedRoles}) {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="auth-loading">
                <p>Checking permissions...</p>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />
    }

    return children;
}

export default RoleRoute;