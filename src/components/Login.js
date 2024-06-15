import React, { useState } from 'react';
import axios from 'axios';

function Login({ setIsLogin }) {
    const [user, setUser] = useState({
        username: '', // Add username field
        email: '',
        password: ''
    });
    const [err, setErr] = useState('');
    const [isRegister, setIsRegister] = useState(false);

    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        setErr('');
    };

    const registerSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/users/register', {
                username: user.username, // Include username field
                email: user.email,
                password: user.password
            });
            setUser({ username: '', email: '', password: '' }); // Clear form fields
            setErr(res.data.msg);
            setIsRegister(false); // Redirect to login after successful registration
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg);
        }
    };

    const loginSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/users/login', {
                email: user.email,
                password: user.password
            });
            setUser({ username: '', email: '', password: '' }); // Clear form fields
            localStorage.setItem('tokenStore', res.data.token);
            setIsLogin(true);
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg);
        }
    };

    return (
        <section className='login-page'>
            {isRegister ? (
                <div className='register create-note'>
                    <h2>Register</h2>
                    <form onSubmit={registerSubmit}>
                        <input
                            type='text'
                            name='username' // Use 'username' as the name attribute
                            id='register-username' // Use unique id for each input
                            placeholder='Username'
                            required
                            value={user.username}
                            onChange={onChangeInput}
                        />
                        <input
                            type='email'
                            name='email'
                            id='register-email'
                            placeholder='Email'
                            required
                            value={user.email}
                            onChange={onChangeInput}
                        />
                        <input
                            type='password'
                            name='password'
                            id='register-password'
                            placeholder='Password'
                            required
                            value={user.password}
                            autoComplete='true'
                            onChange={onChangeInput}
                        />
                        <button type='submit'>Register</button>
                        <p>
                            You have an account?{' '}
                            <span onClick={() => setIsRegister(false)}>Login Now</span>
                        </p>
                        <h3>{err}</h3>
                    </form>
                </div>
            ) : (
                <div className='login create-note'>
                    <h2>Login</h2>
                    <form onSubmit={loginSubmit}>
                        <input
                            type='email'
                            name='email'
                            id='login-email'
                            placeholder='Email'
                            required
                            value={user.email}
                            onChange={onChangeInput}
                        />
                        <input
                            type='password'
                            name='password'
                            id='login-password'
                            placeholder='Password'
                            required
                            value={user.password}
                            autoComplete='true'
                            onChange={onChangeInput}
                        />
                        <button type='submit'>Login</button>
                        <p>
                            You don't have an account?{' '}
                            <span onClick={() => setIsRegister(true)}>Register Now</span>
                        </p>
                        <h3>{err}</h3>
                    </form>
                </div>
            )}
        </section>
    );
}

export default Login;
