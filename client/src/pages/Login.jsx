import React from 'react';

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-black to-gray-900 flex items-center justify-center text-white">
      <div className="bg-black bg-opacity-60 p-10 rounded-2xl shadow-2xl text-center w-full max-w-md">
        <h1 className="text-4xl font-bold mb-6">Spotify Music Search</h1>
        <p className="mb-6 text-gray-300">Search for tracks, albums, and artists — instantly.</p>

        <a
          href="https://spotify-music-search-d229755e687e.herokuapp.com/auth/login"
          className="inline-block bg-green-500 hover:bg-green-400 text-black font-semibold text-lg px-6 py-3 rounded-lg transition-all transform hover:scale-105"
        >
          Login with Spotify
        </a>

        <p className="mt-6 text-sm text-gray-400">
          Secure authentication with Spotify. You'll be redirected.
        </p>
      </div>
    </div>
  );
};

export default Login;

