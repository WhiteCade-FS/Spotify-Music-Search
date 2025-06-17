import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DarkModeToggle from '../components/DarkModeToggle.jsx';
import Card from '../components/Card.jsx';
import { searchSpotify } from '../../services/api.js';

const Home = ({ token }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('track');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('jwt');
    if (!storedToken) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSearch = async () => {
    if (!searchTerm.trim() || !token) return;

    setLoading(true);
    try {
      const data = await searchSpotify(searchTerm, searchType, token);
      setResults(data[`${searchType}s`]?.items || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end items-center gap-4 mb-6">
          <DarkModeToggle />
          <button
            onClick={handleLogout}
            className="fixed top-4 right-20 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            Logout
          </button>
        </div>
        <h1 className="text-4xl font-bold text-center text-green-600 mb-10">
          Spotify Music Search
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search for music..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="track">Track</option>
            <option value="album">Album</option>
            <option value="artist">Artist</option>
          </select>
          <button
            onClick={handleSearch}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Search
          </button>
        </div>
        {loading ? (
          <div className="text-center text-gray-500 text-xl">Loading...</div>
        ) : results.length === 0 ? (
          <div className="text-center text-gray-400 text-lg">No results found.</div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {results.map((item) => (
              <Card key={item.id} item={item} searchType={searchType} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

