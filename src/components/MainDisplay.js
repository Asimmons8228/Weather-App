// Importing necessary modules and icons
import React from 'react';
import {
    UilArrowUp,
    UilArrowDown,
    UilTemperature,
    UilTear,
    UilWind,
    UilSun,
    UilSunset,
} from "@iconscout/react-unicons"; // Icons for weather details
import { formatToLocalTime, iconUrlFromCode } from '../services/weatherService'; // Utility functions

// MainDisplay component for displaying main weather information
const MainDisplay = ({ weather: { details, icon, temp, temp_min, temp_max, sunrise, sunset, speed, humidity, feels_like, timezone, description } }) => {
    return (
        <div>
            {/* Description of weather condition */}
            <div className='flex items-center my-6 justify-center py-6 font-bold text-2xl text-cyan-400'>
                <p className='capitalize'>{description}</p>
            </div>
            {/* Weather details section */}
            <div className='flex flex-row items-center my-10 justify-between text-white py-3'>
                {/* Weather icon */}
                <img src={iconUrlFromCode(icon)} alt="" className='w-20'></img>
                {/* Current temperature */}
                <p className='text-5xl'>{`${temp.toFixed()}°`}</p>
                {/* Details about temperature, humidity, and wind speed */}
                <div className='flex flex-col space-y-2'>
                    <div className='font-light flex text-md items-center'>
                        <UilTemperature size={18} className='mr-1' />
                        Real feel:
                        <span className='font-medium ml-1'>{`${feels_like.toFixed()}°`}</span>
                    </div>
                    <div className='font-light flex text-md items-center'>
                        <UilTear size={18} className='mr-1' />
                        Humidity:
                        <span className='font-medium ml-1'>{`${humidity.toFixed()}%`}</span>
                    </div>
                    <div className='font-light flex text-md items-center'>
                        <UilWind size={18} className='mr-1' />
                        Wind Speed:
                        <span className='font-medium ml-1'>{`${speed.toFixed()} km/h`}</span>
                    </div>
                </div>
            </div>
            {/* Additional weather information */}
            <div className='flex flex-row items-center my-10 justify-center space-x-2 text-white text-sm py-3'>
                <UilSun /> {/* Sunrise icon */}
                {/* Displaying sunrise time */}
                <p className='font-light text-lg'>Rise: 
                    <span className='font-medium ml-1 text-lg'>{formatToLocalTime(sunrise, timezone, "hh:mm a")}</span>
                </p> 
                <p className='font-light'>|</p> {/* Divider */}
                <UilSunset /> {/* Sunset icon */}
                {/* Displaying sunset time */}
                <p className='font-light text-lg'>Set: 
                    <span className='font-medium ml-1 text-lg'>{formatToLocalTime(sunset, timezone, "hh:mm a")}</span>
                </p> 
                <p className='font-light'>|</p> {/* Divider */}
                <UilArrowUp /> {/* Arrow up icon */}
                {/* Displaying maximum temperature */}
                <p className='font-light text-lg'>High: 
                    <span className='font-medium ml-1 text-lg'>{`${temp_max.toFixed()}°`}</span>
                </p> 
                <p className='font-light'>|</p> {/* Divider */}
                <UilArrowDown /> {/* Arrow down icon */}
                {/* Displaying minimum temperature */}
                <p className='font-light text-lg'>Low: 
                    <span className='font-medium ml-1 text-lg'>{`${temp_min.toFixed()}°`}</span>
                </p> 
            </div>
        </div>
    );
};

export default MainDisplay; // Exporting MainDisplay component
