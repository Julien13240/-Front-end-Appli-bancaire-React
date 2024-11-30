import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/userActions";
import logo from "../../assets/img/argentBankLogo.png"; // Chemin du logo
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Hook pour redirection
    const { token, user } = useSelector((state) => state.user); // Accéder au token et aux infos utilisateur

    const handleLogout = () => {
        dispatch(logout());      // Supprime le token et réinitialise l'état utilisateur dans Redux
        navigate("/");           // Redirige vers la page d'accueil
    };

    return (
        <nav className="main-nav">
            {/* Logo du site */}
            <Link className="main-nav-logo" to="/">
                <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {token ? (
                    // Si l'utilisateur est connecté
                    <>

                        <Link

                            className="main-nav-item" to="/UserProfile">
                            <i class="fa-solid fa-circle-user"></i>
                            {user?.userName || "Utilisateur"}

                        </Link>
                        <Link

                            className="main-nav-item"
                            to="/"
                            onClick={(e) => {
                                e.preventDefault(); // Empêche la navigation immédiate
                                handleLogout();     // Gère la déconnexion
                            }}>
                            Sign out
                        </Link>
                    </>
                ) : (
                    // Si l'utilisateur est déconnecté

                    <Link className="main-nav-item" to="/sign-in">
                        <i className="fa fa-user-circle"></i> Sign In
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
