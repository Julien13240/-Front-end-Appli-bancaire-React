import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/userActions'; // Assurez-vous que le chemin est correct
import logo from '../../assets/img/argentBankLogo.png'; // Chemin du logo

function Navbar() {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.user); // Accéder à user et isAuthenticated

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {isAuthenticated ? (
                    <>
                        <span className="main-nav-item">{user ? user.username : 'Utilisateur'}</span>
                        <button onClick={handleLogout} className="main-nav-item">
                            <i className="fa fa-sign-out"></i>
                        </button>
                    </>
                ) : (
                    <Link className="main-nav-item" to="/sign-in">
                        <i className="fa fa-user-circle me-2"></i> Sign In
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
