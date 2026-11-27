import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from "../../services/authService";

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
 
    const handleSubmit = async (event) => {
        event.preventDefault();

        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await registerUser({
                name,
                email,
                password
            });

            if (!response.success) {
                throw new Error(response.message || 'Registration failed');
            }

            setSuccess('Account created successfully! Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Something went wrong.Please try again.';

            setError(errorMessage);
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-brand">
                <div className="auth-brand-icon">C</div>
                <div>
                <h2>CampusFix</h2>
                <span>Campus Maintenance Platform</span>
                </div>
            </div>
            
            <div className="auth-header">
                <h1>create account</h1>
                <p>Join Campusfix to report and track campus maintenance issues</p>
            </div>

            <form onSubmit={handleSubmit}>
                {error && <div className="auth-error">
                    {error}
                    </div>}

                    {success && <div className="auth-success">
                        {success}
                        </div>}
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>

                    <input type="text"
                           id="name"
                           placeholder="Enter  your full name"
                           value={name}
                           onChange={(event) => setName(event.target.value)} required/>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email"
                           id="email"
                           placeholder="Enter your email"
                           value={email}
                           onChange={(event) => setEmail(event.target.value)} required 
                    /></div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password"
                                id="password"
                                placeholder="create a password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)} required/>
                                </div>

                                <button type="submit" className="login-button" disabled={loading}>
                                    {loading ? 'Creating account...' : 'Create Account'}
                                </button>
                    
                    </form>
                    <div className="auth-footer">
                        <p>
                            Already have an account?
                            <Link to="/login">Sign in</Link>
                        </p>
                    </div>
               
            </div>
        </div>

    )
}

export default Register;