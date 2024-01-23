import axios from "axios";
import { useState, useEffect } from "react";

function UserLogin() {
    const [formData, setFormData] = useState({
        email: '',
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
            axios.post('http://127.0.0.1:8000/login_user/', formData, {
                headers: {
                    'X-CSRFToken': csrfToken
                }
            });
        } catch (error) {
            console.log("An error occurred when retriving user", error);
        }
    };

    const handleChange = (e) => {
        setFormData(prevFormData => ({ ...prevFormData, [e.target.name]: e.target.value}));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Email: 
                    <input type="email" name="email" value={formData.email} onChange={handleChange}  />
                </label>
                <label>Password: 
                    <input type="password" name="password" value={formData.password} onChange={handleChange}  />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default UserLogin;