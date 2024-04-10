import React from 'react';

// TopButtons component for rendering buttons for favorite cities
const TopButtons = ({ setQuery, favorites }) => {
    return (
        <div className='flex py-5 mb-5 items-center justify-around  border-solid border-2 border-white-700'>
            {/* Mapping through favorite cities and rendering buttons */}
            {favorites.map((city) => (
                <button 
                    key={city.id} // Unique key for each button
                    className='text-white text-xl font-bold' // CSS classes for styling
                    onClick={() => setQuery({ q: city.title })} // Click handler to set query based on the selected city
                >
                    {city.title} {/* Displaying city name */}
                </button>
            ))}
        </div>
    );
};

export default TopButtons; // Exporting TopButtons component
