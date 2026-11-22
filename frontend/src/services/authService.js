import API from './api';

// Register a new user
export const registerUser = async(userData) => {
    const response =await  API.post('/auth/register', userData);

    return response.data;
}

// Login an existing user
export const loginUser = async(credentials) => {
    const response = await API.post('/auth/login', credentials);

    return response.data;
};

// Get the currently logged-in user
export const getCurrentUser = async () => {
    const response = await API.get('/auth/me');

    return response.data;
}