// App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SignIn from './pages/SignIn';
import UserProfile from './pages/UserProfile';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { loginSuccess, logout } from './redux/actions/userActions';
import { getUserProfile } from './lib/client';
import UserEdit from './pages/UserEdit';
import Footer from './components/Footer';


function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const userData = await getUserProfile(token);
          dispatch(loginSuccess({ token, user: userData }));
        } catch (err) {
          console.error('Error fetching user profile:', err);
          if (err.response && err.response.status === 401) {
            dispatch(logout());
            alert("Votre session a expiré. Veuillez vous reconnecter.");
          } else {
            console.error("Erreur inconnue :", err.message);
          }
        }
      }
    };
    fetchData();
  }, [dispatch, token]);


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/UserProfile" element={token ? <UserProfile /> : <SignIn />} />
        <Route path="/editUsername" element={<UserEdit />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
