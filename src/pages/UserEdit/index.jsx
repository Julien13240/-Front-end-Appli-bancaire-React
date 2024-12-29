// UserProfile.js

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserProfile } from '../../redux/actions/userActions';

import "./index.css"

function UserEdit() {

    const dispatch = useDispatch();
    const navigate = useNavigate(); // Hook pour redirection
    const [errorMessage, setErrorMessage] = useState("");
    // Sélection des données utilisateur depuis le Redux Store
    const { user, } = useSelector((state) => state.user);
    const [userName, setUserName] = useState("")
    const updateUsername = (e) => {

        e.preventDefault()

        if (!userName) {
            setErrorMessage("Veuillez remplir le champ userName")
            return;
        }
        dispatch(updateUserProfile({ userName: userName }));
        navigate("/UserProfile")

    }
    useEffect(() => {
        setUserName(user?.userName)
    }, [user])

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <main className='main bg-dark'>
            <h2 className='header'>
                Edit user info
            </h2>
            <section className='edit-form'>
                <form action="">
                    <div className='input-wrapper'>
                        <label htmlFor="username">User Name:</label>
                        <input onChange={e => setUserName(e.target.value)} type="text" value={userName} />
                    </div>
                    <div className='input-wrapper'>
                        <label htmlFor="firstname">First Name:</label>
                        <input disabled type="text" value={user.firstName} />
                    </div>
                    <div className='input-wrapper'>
                        <label htmlFor="lastname">Last Name:</label>
                        <input disabled type="text" value={user.lastName} />
                    </div>
                    <div className='button-edit'>
                        <button onClick={updateUsername} className='save'>Save</button>
                        <button onClick={() => navigate("/UserProfile")} className='cancel'>Cancel</button>
                    </div>

                </form>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </section>
        </main>

    );
}

export default UserEdit;
