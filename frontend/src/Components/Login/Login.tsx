import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Login.module.css'

function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const url = 'http://127.0.0.1:8000/login/'
            const response = await axios.post(url, {
                email: formData.email,
                password: formData.password
            });
            localStorage.setItem('authToken', response.data.token)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.loginDiv}>
            <div id={styles.title}>
                <h1>Login</h1>
            </div>
            <Form onSubmit={handleSubmit} id={styles.form}>
                <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                    <Form.Control type="email" className='input' placeholder="name@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control type="password" className='input' placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                </FloatingLabel>
                <div id={styles.formButtonDiv}>
                    <Button type='submit' className='input' id={styles.formButton}>Login</Button>
                </div>
            </Form>
            <div>
                <p>Don't have an account? <Link to={'/signup'}>Signup</Link></p>
            </div>
        </div>
    );

}

export default Login;