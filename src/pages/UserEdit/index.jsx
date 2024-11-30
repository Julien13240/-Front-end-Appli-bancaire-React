// UserProfile.js

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateUserProfile } from '../../redux/actions/userActions';

import "./index.css"

function UserEdit() {

    const dispatch = useDispatch();

    // Sélection des données utilisateur depuis le Redux Store
    const { user, } = useSelector((state) => state.user);
    const [userName, setUserName] = useState("")
    const updateUsername = (e) => {

        e.preventDefault()


        dispatch(updateUserProfile({ userName: userName }));

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
                        <button className='cancel'>Cancel</button>
                    </div>

                </form>
            </section>
        </main>

    );
}

export default UserEdit;
