// UserProfile.js

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile } from '../../redux/actions/userActions';
import Transaction from '../../components/Transactions';

const transactions = [
    {
        title: "Argent Bank Checking (x8349)",
        amount: "$2,082.79",
        description: "Available Balance"
    },
    {
        title: "Argent Bank Checking (x8349)",
        amount: "$10,928.42",
        description: "Available Balance"
    },
    {
        title: "Argent Bank Credit Card (x8349)",
        amount: "$184.30",
        description: "Current Balance"
    }
]

function UserProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Sélection des données utilisateur depuis le Redux Store
    const { user, token } = useSelector((state) => state.user);


    // Récupération du profil utilisateur au chargement
    useEffect(() => {
        if (!token) {
            navigate('/signIn'); // Redirection si l'utilisateur n'est pas connecté
        } else {
            dispatch(fetchUserProfile());
        }
    }, [token, dispatch, navigate]);



    // Fonction pour gérer la mise à jour du profil
    const handleEdit = () => {
        navigate("/editUsername")
    };

    if (!user) {
        return <p>Loading...</p>;
    }

    return (

        <main className="main bg-dark">
            <div className="header">
                <h1>Welcome back<br />{user.firstName} {user.lastName}!</h1>
                <button onClick={handleEdit} className="edit-button">Edit Name</button>
            </div>
            <h2 className="sr-only">Accounts</h2>
            {transactions.map((transaction, transactionIndex) => {
                return (
                    <Transaction transaction={transaction} key={transactionIndex} />
                )
            })}


        </main>
    );
}

export default UserProfile;
