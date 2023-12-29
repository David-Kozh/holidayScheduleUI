import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if username and password are provided
        if (!username || !password) {
            // Handle validation error, e.g., show an error message
            return;
        }
        
        const formData = {
            "email":  username,
            password,
        }
        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Authentication succeeded, extract the tokens from the response
                const { accessToken, refreshToken } = await response.json();
                console.log('Login successful');
                console.log('Access token:', accessToken);
                console.log('Refresh token:', refreshToken);
                // Pass the tokens to the onLogin function
                onLogin(accessToken, refreshToken);
            } else {
                // Authentication failed, handle the error, e.g., display an error message
                console.error('Login failed');
            }
        } catch (error) {
            console.error('An error occurred', error);
        }
    };


    return (
        <div className="text-center">
            <form className="form-signin" onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

                <input type="text" id="inputUsername" className="form-control" placeholder="Username" required="" autoFocus=""
                value={username} onChange={handleUsernameChange}/>
            
            
                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required=""
                value={password} onChange={handlePasswordChange} />
                
            
                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me"/> Remember me
                    </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                <p className="mt-5 mb-3 text-muted">© 2023</p>
            </form>
        </div>
    );
};

export default Login;
