// Importing necessary modules and components
import './App.css';
import TopButtons from './components/Favorites';
import Inputs from './components/Inputs';
import TimeLocation from './components/TimeLocation';
import MainDisplay from './components/MainDisplay';
import WeeklyForecast from './components/WeeklyForecast';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Main App component
function App() {
  // Retrieve favorites from local storage or initialize as empty array
  const tempFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  // State variables for query, units, weather data, and favorites
  const [query, setQuery] = useState({ q: 'new york' });
  const [units, setUnits] = useState('imperial');
  const [weather, setWeather] = useState(null);
  const [favorites, setFavorites] = useState(tempFavorites);

  // useEffect hook to fetch weather data and handle updates
  useEffect(() => {
    // Function to fetch weather data
    const fetchWeather = async () => {
      // Message for toast notifications
      const message = query.q ? query.q : 'current location.';
      // Display fetching message
      toast.info("Fetching weather for " + message);
      // Fetch weather data and handle response
      await getFormattedWeatherData({ ...query, units }).then(
        (data) => {
          // If data is null, show error message
          if (data == null) {
            toast.error("Failed to find city " + message);
          } else {
            // If data is successfully retrieved, show success message and update weather state
            toast.success(`Successfully fetched weather for ${data.country}`);
            setWeather(data);
          }
        }
      );
    };
    // Call fetchWeather function
    fetchWeather();
  }, [query, units]); // Dependencies for useEffect hook

  // Function to determine background gradient based on temperature
  const formatBackground = () => {
    // If weather data is not available, return default background
    if (!weather) return 'from-cyan-700 to-blue-700';
    // Set temperature threshold based on units
    const threshold = units === 'metric' ? 20 : 60;
    // Determine background gradient based on temperature
    if (weather.temp <= threshold) return 'from-cyan-700 to-blue-700';
    return 'from-yellow-700 to-orange-700';
  };

  // Render JSX
  return (
    <div className={`mx-auto mt-4 py-5 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
      {/* TopButtons component for managing favorites and search query */}
      <TopButtons favorites={favorites} setQuery={setQuery} />
      <div className="grid grid-cols-8 gap-4">  
      <div className="col-span-3 pl-16">
      {/* Inputs component for setting search query and units */}
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} weather={weather} setFavorites={setFavorites} favorites={favorites}/>
      </div>
      <div className="col-span-5 px-32">
      {/* Render components only if weather data is available */}
      {weather && (
        <div>
          {/* TimeLocation component for displaying time and location */}
          <TimeLocation setFavorites={setFavorites} favorites={favorites} weather={weather} />
          {/* MainDisplay component for displaying main weather information */}
          <MainDisplay weather={weather} />
          {/* WeeklyForecast component for displaying weekly forecast */}
          <WeeklyForecast items={weather.daily} />
        </div>
      )}
      {/* ToastContainer for displaying toast notifications */}
      <ToastContainer autoClose={5000} theme='colored' newestOnTop={true} />
    </div>
      </div>
      </div>
  );
}

// Exporting App component as default
export default App;

