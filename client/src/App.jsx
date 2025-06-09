import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

const App = () => {
  const location = useLocation();
  const [token, setToken] = useState(null);
  const [checkingToken, setCheckingToken] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const urlToken = urlParams.get('token');
    const storedToken = localStorage.getItem('jwt');

    if (urlToken) {
      localStorage.setItem('jwt', urlToken);
      setToken(urlToken);
      console.log('✅ Token saved to localStorage');
      window.history.replaceState({}, '', '/');
    } else if (storedToken) {
      setToken(storedToken);
    }

    setCheckingToken(false);
  }, [location.search]);

  if (checkingToken) return null;

  return (
    <Routes>
      <Route
        path="/"
        element={token ? <Home token={token} /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/login"
        element={!token ? <Login /> : <Navigate to="/" replace />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;

