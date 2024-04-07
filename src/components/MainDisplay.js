import React from 'react';
import {
    UilArrowUp,
    UilArrowDown,
    UilTemperature,
    UilTear,
    UilWind,
    UilSun,
    UilSunset,
} from "@iconscout/react-unicons"
import { formatToLocalTime, iconUrlFromCode } from '../services/weatherService';

const MainDisplay = ({weather: {
    details, icon, temp, temp_min, temp_max, sunrise, sunset, speed, humidity, feels_like, timezone, description
}}) => {
    return (
        <div>
            <div className='flex items-center justify-center py-6 text-xl text-cyan-400'>
                <p className='capitalize'>{description}</p>
            </div>
            <div className='flex flex-row items-center justify-between text-white py-3'>
                <img src={iconUrlFromCode(icon)} alt="" className='w-20'>
                </img>
                <p className='text-5xl'>{`${temp.toFixed()}°`}</p>
                <div className='flex flex-col space-y-2'>
                    <div className='font-light flex text-sm items-center'>
                        <UilTemperature size={18} className='mr-1'/>
                        Real feel:
                        <span className='font-medium ml-1'>{`${feels_like.toFixed()}°`}</span>
                    </div>
                    <div className='font-light flex text-sm items-center'>
                        <UilTear size={18} className='mr-1'/>
                        Humidity:
                        <span className='font-medium ml-1'>{`${humidity.toFixed()}%`}</span>
                    </div>
                    <div className='font-light flex text-sm items-center'>
                        <UilWind size={18} className='mr-1'/>
                        Wind Speed:
                        <span className='font-medium ml-1'>{`${speed.toFixed()} km/h`}</span>
                    </div>
                </div>
            </div>
            <div className='flex flex-row items-center justify-center space-x-2 text-white text-sm py-3'>
                <UilSun />
                <p className='font-light'>Rise: 
                <span className='font-medium ml-1'>{formatToLocalTime(sunrise, timezone, "hh:mm a")}</span>
                </p> 
                <p className='font-light'>|</p>
                <UilSunset />
                <p className='font-light'>Set: 
                <span className='font-medium ml-1'>{formatToLocalTime(sunset, timezone, "hh:mm a")}</span>
                </p> 
                <p className='font-light'>|</p>
                <UilArrowUp />
                <p className='font-light'>High: 
                <span className='font-medium ml-1'>{`${temp_max.toFixed()}°`}</span>
                </p> 
                <p className='font-light'>|</p>
                <UilArrowDown />
                <p className='font-light'>Low: 
                <span className='font-medium ml-1'>{`${temp_min.toFixed()}°`}</span>
                </p> 
            </div>
        </div>
    );
};

export default MainDisplay;