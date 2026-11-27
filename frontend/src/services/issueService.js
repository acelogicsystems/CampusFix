import API from './api';

// Get all issues belonging to the logged-in student

export const getMyIssues = async (params = {}) => {
    const response = await API.get('/issues', {params});

    return response.data;
};

// Get one specific issue
export const getIssueById = async (id) => {
    const response = await API.get(`/issues/${id}`);

    return response.data;
}

// Get statistics for logged-in student
export const getMyStats = async () => {
    const response = await API.get('/issues/my-stats');

    return response.data
}

// Submit a new maintenance issue
export const createIssue = async (issueData) => {
    const response = await API.post('/issues', issueData);

    return response.data;
}