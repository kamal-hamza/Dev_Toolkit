import { useEffect, useState } from 'react';
import axios from 'axios';

function UserCreationForm() {
    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        username: '',
        password: '',
    });

    const [csrfToken, setCsrfToken] = useState('');
    
    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/csrfToken/');
                setCsrfToken(response.data.csrfToken);
            } catch (error) {
                console.log("An error occured while fetching csrf token:", error);
            }
        };
        if (!csrfToken) {
            fetchCsrfToken();    
        }
    }, [csrfToken]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/create_user/', formData, {
                headers: {
                    'X-CSRFToken': csrfToken,
                },
            });
        } catch (error) {
            console.log('Error creating user', error);  
        }
    };

    const handleChange = (e) => {
        setFormData(prevFormData => ({ ...prevFormData, [e.target.name]: e.target.value }));
    };
    

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Email: 
                    <input type='email' name='email' value={formData.email} onChange={handleChange} />
                </label>
                <label>Username: 
                    <input type='text' name='username' value={formData.username} onChange={handleChange} />
                </label>
                <label>First Name:
                    <input type='text' name='first_name' value={formData.first_name} onChange={handleChange} />
                </label>
                <label>Last Name: 
                    <input type='text' name='last_name' value={formData.last_name} onChange={handleChange} />
                </label>
                <label>Password: 
                    <input type='password' name='password' value={formData.password} onChange={handleChange} />
                </label>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default UserCreationForm;