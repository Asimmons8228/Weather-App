import React from 'react'; // Importing React library
import { iconUrlFromCode } from '../services/weatherService'; // Importing iconUrlFromCode function from weatherService

// Functional component for rendering weekly forecast
const WeeklyForecast = ({ items }) => {

    // Function to convert temperature from Kelvin to Fahrenheit
    const kelvinToFahrenheit = (tempKelvin) => {
        return ((tempKelvin - 273.15) * 9/5 + 32).toFixed(); // Conversion formula
    };

    return (
        <div>
            {/* Header section for daily forecast */}
            <div className='flex items-center justify-start my-6'>
                <p className='text-white font-medium uppercase'>Daily Forecast</p> {/* Text displaying Daily Forecast */}
            </div> 
            <hr className='my-2'/> {/* Horizontal line */}
            {/* Container for displaying forecast items */}
            <div className='flex flex-row items-center justify-between text-white'>
                {/* Mapping through forecast items */}
                {items.map((item, idx) => (
                    <div key={idx} className='flex flex-col items-center justify-center'>
                        <p className='font-light text-sm'>
                            {item.title} {/* Displaying forecast title */}
                        </p>
                        {/* Displaying weather icon */}
                        <img src={iconUrlFromCode(item.icon)} alt="" className='w-10 my-1' />
                        {/* Displaying temperature in Fahrenheit */}
                        <p className='font-medium'>{`${kelvinToFahrenheit(item.temp.toFixed())}°`}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeeklyForecast; // Exporting WeeklyForecast component
