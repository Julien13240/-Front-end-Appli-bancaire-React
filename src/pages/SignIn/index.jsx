import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/actions/userActions';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector((state) => state.user.error); // Accès au message d'erreur depuis Redux

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
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="sign-in-button" type="submit">Sign In</button>
                </form>

                {/* Affichage du message d'erreur sous le formulaire */}
                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            </section>
        </main>
    );
}

export default SignIn;
