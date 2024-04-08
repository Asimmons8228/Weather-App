// Importing necessary modules and icons
import React from 'react';
import { UilSearch } from '@iconscout/react-unicons'; // Search icon
import { UilLocationPoint } from '@iconscout/react-unicons'; // Location icon
import { toast } from 'react-toastify'; // Toast notification library
import { useState } from 'react'; // useState hook for managing state

// Inputs component for search and unit selection
const Inputs = ({ setQuery, units, setUnits }) => {
    // State variable for city input
    const [city, setCity] = useState('');

    // Function to handle search button click
    const handleSearchClick = () => {
        // If city is not empty, set query with city name
        if (city !== '') setQuery({ q: city });
    };

    // Function to handle unit change
    const handleUnitChange = (e) => {
        // Get selected unit from button name attribute
        const selectedUnit = e.currentTarget.name;
        // If selected unit is different from current units, update units state
        if (units !== selectedUnit) setUnits(selectedUnit);
    };

    // Function to handle location button click
    const handleLocationClick = () => {
        // Check if geolocation is supported by the browser
        if (navigator.geolocation) {
            // Display info toast
            toast.info('Fetching user\'s location.');
            // Get user's current position
            navigator.geolocation.getCurrentPosition((position) => {
                // Display success toast
                toast.success('Location fetched.');
                // Extract latitude and longitude from position
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                // Set query with latitude and longitude
                setQuery({
                    lat,
                    lon,
                });
            });
        }
    };

    // Function to handle enter key press
    const handleEnter = (e) => {
        // If enter key is pressed
        if (e.key === 'Enter') {
            // Call handleSearchClick function
            handleSearchClick();
        }
    };

    // Render JSX
    return (
    <div className='flex justify-center items-center h-screen'>
    {/* Input field for city search */}
    <div className='flex flex-col w-full justify-center'>
        <input
            value={city}
            onChange={(e) => setCity(e.currentTarget.value)}
            onKeyDown={(e) => handleEnter(e)}
            type='text'
            placeholder='Search for city...'
            className='text-xl font-light p-2 w-full shadow-xl focus:outline-none first-letter:capitalize placeholder:lowercase'
        />
        <div className='flex flex-row justify-between'>
            <div className='flex flex-row'>
                {/* Search icon */}
                <UilSearch
                    size={25}
                    onClick={handleSearchClick}
                    className='text-white cursor-pointer transition ease-out hover:scale-125'
                />
                {/* Location icon */}
                <UilLocationPoint
                    size={25}
                    className='text-white cursor-pointer transition ease-out hover:scale-125'
                    onClick={handleLocationClick}
                />
            </div>
            {/* Unit selection buttons */}
            <div className='flex flex-row w-1/4 items-center justify-center'>
                {/* Celsius button */}
                <button
                    name='metric'
                    className='font-medium text-xl text-white transition ease-out hover:scale-125'
                    onClick={handleUnitChange}
                >
                    °C
                </button>
                <p className='text-xl text-white mx-1'>|</p> {/* Divider */}
                {/* Fahrenheit button */}
                <button
                    name='imperial'
                    className='font-medium text-xl text-white transition ease-out hover:scale-125'
                    onClick={handleUnitChange}
                >
                    °F
                </button>
            </div>
        </div>
    </div>
</div>

    );
};

export default Inputs; // Exporting Inputs component
