import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile } from '../../redux/actions/userActions'; // Action pour récupérer le profil utilisateur

function UserProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Sélection des données utilisateur depuis le Redux Store
    const { user, token } = useSelector((state) => state.user);

    // Vérification de l'authentification
    useEffect(() => {
        if (!token) {
            navigate('/signIn'); // Redirection si l'utilisateur n'est pas connecté
        } else {
            dispatch(fetchUserProfile()); // Récupération des données utilisateur
        }
    }, [token, dispatch, navigate]);

    // Si les données ne sont pas encore disponibles
    if (!user) {
        return <p>Chargement...</p>;
    }

    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>
                    Welcome back
                    <br />
                    {user.firstName} {user.lastName}!
                </h1>
                <button className="edit-button">Edit Name</button>
            </div>
            <h2 className="sr-only">Accounts</h2>
            {user.accounts.map((account) => (
                <section className="account" key={account.id}>
                    <div className="account-content-wrapper">
                        <h3 className="account-title">
                            {account.name} ({account.id})
                        </h3>
                        <p className="account-amount">${account.balance.toFixed(2)}</p>
                        <p className="account-amount-description">{account.description}</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
            ))}
        </main>
    );
}

export default UserProfile;
