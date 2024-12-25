// SignIn.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/actions/userActions';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Dispatch action de connexion
            await dispatch(login({ email, password }));

            // Redirige l'utilisateur vers la page de profil
            navigate('/UserProfile');
        } catch (error) {
            console.error('Erreur lors de la connexion', error);
        }
    };

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input autoComplete='false'
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="sign-in-button" type="submit">Sign In</button>
                </form>
            </section>
        </main>
    );
}

export default SignIn;
