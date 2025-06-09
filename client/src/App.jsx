import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

const App = () => {
  const [token, setToken] = useState('');
  const [checkingToken, setCheckingToken] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const urlToken = urlParams.get('token');
    const stored = localStorage.getItem('jwt');

    if (urlToken) {
      localStorage.setItem('jwt', urlToken);
      setToken(urlToken);
      window.history.replaceState({}, '', '/');
    } else if (stored) {
      setToken(stored);
    }

    setCheckingToken(false);
  }, [location.search]);

  if (checkingToken) return <div className="text-center mt-10 text-lg">Loading...</div>;

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

