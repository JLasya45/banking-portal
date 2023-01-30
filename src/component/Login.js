import React, { useState } from 'react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        console.log('username:', username);
        console.log('password:', password);
        // Send a request to the server to check the login credentials
    }

    return (
        <div className='login-container d-flex justify-content-center m-5 p-3 col '>
            <div className='row shadow-lg p-3 mb-5 bg-body-tertiary rounded-3 p-3'>
                <h2 className='text-center p-3 '> Please Login Here </h2>
                <form onSubmit={handleSubmit}>
                    <div className="p-3 mb-3 col align-self-center">
                        <input type="number" className="form-control shadow-sm  " id="userId" aria-describedby="UserId"
                            value={username} onChange={event => setUsername(event.target.value)} placeholder="User Id" />
                    </div>
                    <div className="p-3 col align-self-center">
                        <input type="password" className="form-control  shadow-sm " id="InputPassword1"
                            value={password} onChange={event => setPassword(event.target.value)} placeholder="Password" />
                    </div>
                    <div className="text-center p-3">
                    <button type="submit" className="btn btn-primary shadow p-1 mb-5 rounded-1">Login</button><br/>
                    <a className="text-muted" href="/">Forgot password?</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
