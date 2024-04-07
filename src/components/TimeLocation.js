import React from 'react';
import { formatToLocalTime } from '../services/weatherService';

const TimeLocation = ({weather: {dt, timezone, name, country}, favorites, setFavorites}) => {

    const handleAddFavorites= () => {
        for (let i = 0; i < favorites.length; i++) { 
            if (favorites[i].title === name) return
        }

        const newFavorites = [...favorites, {id: 1, title: name}]
        setFavorites(newFavorites)
        localStorage.setItem("favorites", JSON.stringify(newFavorites))
    }
    return (
    <div>
        <div className='flex items-center justify-center my-6'>
            <p className='text-white text-xl font-light'>
                {formatToLocalTime(dt, timezone)}
            </p>
        </div>
        <div className='flex items-center justify-center my-3'>
            <p className='text-white text-3xl font-semibold'>{`${name}, ${country}`}</p>
        </div>
        <div className='flex items-center justify-center'>
            <button onClick={handleAddFavorites} className='text-white text-sm bg-slate-400 rounded-full p-2'>Add To Favorites</button>
        </div>
    </div>
    );
};

export default TimeLocation;