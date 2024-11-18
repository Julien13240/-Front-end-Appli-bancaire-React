import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import du hook useNavigate
import { loginRequest, loginSuccess, loginFailure } from '../../redux/actions/userActions';
import { login } from '../../lib/client';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialisation du hook

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(loginRequest());
        try {
            const token = await login(email, password);
            console.log('Token récupéré:', token); // Debug
            dispatch(loginSuccess(email, token));

            // Redirection vers userProfile après connexion réussie
            navigate("/UserProfile");
        } catch (error) {
            dispatch(loginFailure(error.message));
        }
    };

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="sign-in-button">Sign In</button>
                </form>
            </section>
        </main>
    );
}

export default SignIn;
