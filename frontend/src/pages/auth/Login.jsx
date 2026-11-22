import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { loginUser } from '../../services/authService';


function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();

        setError('');
        setMessage('');
        setLoading(true);

        try {
            const response = await loginUser({
                email,
                password
            });

            if (!response.success) {
                throw new Error(response.message || 'Login failed');
            }

            login(response.user, response.token);
            navigate('/')

            setMessage('Login successful! welcome back.');
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.mesage || 
            'Something went wrong. Please try again.';

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='auth-page'>
            <div className='auth-card'>
                <div className='auth-header'>
                    <h1>Welcome back</h1>
                    <p>Sign in to your CampusFix account.</p>
                </div>
           

            <form onSubmit={handleSubmit}>
                {error && (
                    <div className='auth-error'>
                        {error}
                    </div>
                )}

                {message && (
                    <div className='auth-success'>
                        {message}
                    </div>
                )}
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' placeholder='Enter your email' value={email}
                       onChange={(event) => setEmail(event.target.value)} required/>

               

                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' placeholder='Enter your password' value={password}
                     onChange={(event) => setPassword(event.target.value)} required/>

                     <button 
                         type='submit'
                         className='login-button'
                         disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                     </button>
                  </div>    
            </form>
        </div>
      
       </div>
    );
}

export default Login;