import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';



const App = () => {
  const [token, setToken] = useState(localStorage.getItem('jwt') || '');
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const urlToken = urlParams.get('token');

    if (urlToken) {
      localStorage.setItem('jwt', urlToken);
      setToken(urlToken);
      window.history.replaceState({}, '', '/');
    }
  }, [location.search]);

  return (
    <>
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
    </>
  );
};

export default App;

