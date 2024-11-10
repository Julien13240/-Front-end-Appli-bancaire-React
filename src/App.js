import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SignIn from './pages/SignIn';
import UserProfile from './pages/UserProfile';
import Home from './pages/Home';
import { loginFailure, loginSuccess, logout } from './redux/actions/userActions';
import Navbar from './components/Navbar';
import { getUserProfile } from './lib/client';


function App() {
  const dispatch = useDispatch();
  const [token, setToken] = useState("");

  // const isInitialied = useRef(false)
  const loginError = useSelector(state => state.user.error);


  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await getUserProfile(token)
        localStorage.setItem('token', token); // Sauvegarde du token
        dispatch(loginSuccess({ token: token, user: response }));
      }

      catch (e) {
        console.log(e.message)
        dispatch(loginFailure(e))
        dispatch(logout)
      }

    }
    const token = localStorage.getItem('token')
    if (token) {
      setToken(token)
      fetchData()
    }
    // if (token) {
    //   if (!isInitialied.current) {
    //     isInitialied.current = true // Permet d'executer le code qu'une seule fois au lancement de l'appli
    //     fetchData()
    //   }

    // }

  }, [dispatch, token]);
  if (!token) {
    return null
  }

  return (
    <Router>
      <Navbar />
      {/* Affiche l'erreur sous la navbar si loginError est défini */}
      {loginError && <div className="error-message" style={{ color: 'red', textAlign: 'center', margin: '10px' }}>Vous avez été déconnecté</div>}

      <Routes>

        {/* Page d'accueil */}
        <Route path="/" element={<Home />} />

        {/* Route publique pour la page de connexion */}
        <Route path="/sign-in" element={<SignIn />} />

        {/* Route protégée pour la page de profil */}
        <Route path="/UserProfile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
