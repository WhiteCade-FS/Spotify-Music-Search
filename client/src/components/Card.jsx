import React, { useRef } from 'react';

const Card = ({ item, searchType }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;


    const rotateX = ((y - centerY) / centerY) * 20;
    const rotateY = ((x - centerX) / centerX) * -20;

    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  const imageUrl = item.images?.[0]?.url || item.album?.images?.[0]?.url;
  const link = item.external_urls.spotify;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-white dark:bg-gray-800 p-4 rounded shadow hover:shadow-2xl transition-transform duration-75 ease-out cursor-pointer"
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={item.name}
          className="w-full h-48 object-cover rounded mb-2"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
          No Image
        </div>
      )}
      <h3 className="text-lg font-semibold">{item.name}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {(searchType === 'track' || searchType === 'album')
          ? item.artists?.map((a) => a.name).join(', ')
          : item.genres?.join(', ')}
      </p>
    </a>
  );
};

export default Card;

