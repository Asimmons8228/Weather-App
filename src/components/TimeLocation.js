// Importing necessary module
import React from 'react';
import { formatToLocalTime } from '../services/weatherService'; // Importing utility function for formatting time

// TimeLocation component for displaying time and location
const TimeLocation = ({ weather: { dt, timezone, name, country, id}, favorites, setFavorites }) => {
    // Function to handle adding location to favorites
    const handleAddFavorites = () => {
        // Check if location already exists in favorites
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].id === id) return;
        }
        // If location does not exist in favorites, add it
        const newFavorites = [...favorites, {id, title: name }];
        setFavorites(newFavorites); // Update favorites state
        localStorage.setItem("favorites", JSON.stringify(newFavorites)); // Update favorites in local storage
    };
     // Function to handle deleting location from favorites
     const handleDeleteFavorites = () => {
        const updatedFavorites = favorites.filter(favorite => favorite.id !== id);
        setFavorites(updatedFavorites); // Update favorites state
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Update favorites in local storage
    };

    // Render JSX
    return (
        <div>
            {/* Display current time */}
            <div className='flex items-center justify-center my-6'>
                <p className='text-white text-xl font-light'>
                    {formatToLocalTime(dt, timezone)} {/* Format time according to timezone */}
                </p>
            </div>
            {/* Display location */}
            <div className='flex items-center justify-center my-3'>
                <p className='text-white my-6 text-3xl font-semibold'>{`${name}, ${country}`}</p> {/* Display location and country */}
            </div>
            {/* Button to add location to favorites */}
            <div className='flex items-center justify-center'>
                <button onClick={handleDeleteFavorites} className='text-white text-lg bg-red-400 rounded-full p-3 mx-1'>Remove From Favorites</button>
                <button onClick={handleAddFavorites} className='text-white text-lg bg-slate-400 rounded-full p-3 mx-1'>Add To Favorites</button> {/* Button for adding to favorites */}
            </div>
        </div>
    );
};

export default TimeLocation; // Exporting TimeLocation component
