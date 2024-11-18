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

function App() {
  const dispatch = useDispatch();
  const { token, error } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const userData = await getUserProfile(token);
          dispatch(loginSuccess({ token, user: userData }));
        } catch (err) {
          console.error('Error fetching user profile:', err);
          dispatch(logout());
        }
      }
    };
    fetchData();
  }, [dispatch, token]);

  return (
    <Router>
      <Navbar />
      {error && (
        <div className="error-message" style={{ color: 'red', textAlign: 'center', margin: '10px' }}>
          {error}
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/UserProfile" element={token ? <UserProfile /> : <SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
