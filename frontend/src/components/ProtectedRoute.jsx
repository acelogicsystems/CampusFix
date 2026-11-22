import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function ProtectedRoute({ children }) {
    const { user, loading } = useContext(AuthContext);


    // wait until session verification is complete

    if (loading) {
        return (
            <div className='auth-loading'>
                <p>checking your session...</p>
            </div>
        );
    }

    //Redirect users who are not authenticated
    if (!user) {
        return <Navigate to="/login" replace/>
    }

    // Allow authenticated users
    return children;
}

export default ProtectedRoute;