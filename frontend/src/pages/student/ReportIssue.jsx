import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createIssue } from '../../services/issueService';

function ReportIssue() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError('');
        setLoading(true);

        try {
            const response = await createIssue({
                title,
                description,
                category,
                location,
                priority
            });

            if (!response.success) {
                throw new Error(response.message || 'Failed to submit issue');
            }
            navigate('/');
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Something went wrong. Please try again.';

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="report-page">
            <div className='report-header'>
                <h1>Report  an Issue</h1>
                <p>Tell us about a maintenace problem on campus so it can be addressed.</p>
            </div>

            <form onSubmit={handleSubmit} className='report-form'>
                {error && (
                    <div className='auth-error'>
                        {error}
                    </div>
                )}

                <div className='form-group'>
                    <label htmlFor='title'>Issue Title</label>
                    <input type='text'
                           id='title'
                           placeholder='e.g. Broken classroom lights'
                           value={title}
                           onChange={(event) => setTitle(event.target.value)} required />
                </div>

                <div className='form-group'>
                    <label htmlFor='description'>Description</label>
                    <textarea id='description'
                            placeholder='Describe the problem in detil...'
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            row="5"
                            required />
                </div>
                <div className='form-group'>
                    <label htmlFor='category'>Category</label>
                    <select id='category'
                             value={category}
                             onChange={(event) => setCategory(event.target.value)} required >
                            <option value="">Select a category</option>
                            <option value="Electrical">Electrical</option>
                            <option vaalue="Plumbing">Plumbing</option>  
                            <option value="Furniture">Furniture</option> 
                            <option value="Cleaning">Cleaning</option>
                            <option value="Other">Other</option>     
                    </select>
                </div>
                <div className='form-group'>
                    <label htmlFor='location'>Campus Location</label>
                    <input type='text'
                          id='location'
                          placeholder='e.g. Block A, Room 12'
                          value={location}
                          onChange={(event) => setLocation(event.target.value)} required/>
                </div>

                <div className='form-group'>
                    <label htmlFor='Low'>Low</label>
                    <select id='priority'
                            value={priority}
                            onChange={(event) => setPriority(event.target.value)}>
                                <option value='Low'>Low</option>
                                <option value='Medium'>Medium</option>
                                <option value='High'>High</option>
                            </select>
                </div>

                <button type='submit' className='login-button' disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Issue'}
                </button>
            </form>
        </div>
    );
}

export default ReportIssue;