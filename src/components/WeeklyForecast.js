import React from 'react';
import { iconUrlFromCode } from '../services/weatherService';

const WeeklyForecast = ({items}) => {

    const kelvinToFahrenheit = (tempKelvin) => {
    return ((tempKelvin - 273.15) * 9/5 + 32).toFixed();
};

    return (
        <div>
           <div className='flex items-center justify-start my-6'>
                <p className='text-white font-medium uppercase'>Daily Forecast</p>
            </div> 
            <hr className='my-2'/>
            <div className='flex flex-row items-center justify-between text-white'>
                {items.map((item, idx) => (
                <div key={idx} className='flex flex-col items-center justify-center'>
                    <p className='font-light text-sm'>
                        {item.title}
                    </p>
                    <img src={iconUrlFromCode(item.icon)} alt="" className='w-10 my-1' />
                    <p className='font-medium'>{`${kelvinToFahrenheit(item.temp.toFixed())}°`}</p>
                </div>
                ))}
            </div>
        </div>
    );
};

export default WeeklyForecast;