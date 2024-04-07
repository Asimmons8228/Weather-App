import React from 'react';


const TopButtons = ({setQuery, favorites}) => {

    return (
        <div className='flex items-center justify-around my-6'>
            {favorites.map((city) =>(
                <button key={city.id} className='text-white text-lg font-medium' onClick={() => setQuery({q: city.title})}>{city.title}</button>
            ))}
            
        </div>
    );
};

export default TopButtons;