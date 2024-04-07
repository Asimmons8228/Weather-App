import React from 'react';

// TopButtons component for rendering buttons for favorite cities
const TopButtons = ({ setQuery, favorites }) => {
    return (
        <div className='flex items-center justify-around my-6'>
            {/* Mapping through favorite cities and rendering buttons */}
            {favorites.map((city) => (
                <button 
                    key={city.id} // Unique key for each button
                    className='text-white text-lg font-medium' // CSS classes for styling
                    onClick={() => setQuery({ q: city.title })} // Click handler to set query based on the selected city
                >
                    {city.title} {/* Displaying city name */}
                </button>
            ))}
        </div>
    );
};

export default TopButtons; // Exporting TopButtons component
