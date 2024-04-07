import './App.css';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeLocation from './components/TimeLocation';
import MainDisplay from './components/MainDisplay';
import WeeklyForecast from './components/WeeklyForecast';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const tempFavorites = JSON.parse(localStorage.getItem("favorites") || "[]")
  const [query, setQuery] = useState({q: 'new york'})
  const [units, setUnits] = useState('imperial')
  const [weather, setWeather] = useState(null)
  const [favorites, setFavorites] = useState(tempFavorites)


  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : 'current location.'

      toast.info("Fetching weather for " + message)
      await getFormattedWeatherData({...query, units}).then(
        (data) => {
        if (data == null){
          toast.error("failed to find city " + message)
        } else {
          toast.success(`Successfully fetched weather for ${data.country}`)
          setWeather(data)
        }
      });
    }
    fetchWeather()
  }, [query, units])

  const formatBackground = () => {
    if (!weather) return 'from-cyan-700 to-blue-700'
    const threshold = units === 'metric' ? 20 : 60
    if(weather.temp <= threshold) return 'from-cyan-700 to-blue-700'

    return 'from-yellow-700 to-orange-700'
  }


  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <TopButtons favorites={favorites} setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
      {weather && (
        <div>
          <TimeLocation setFavorites={setFavorites} favorites={favorites} weather={weather}/>
          <MainDisplay weather={weather} />
          <WeeklyForecast items={weather.daily}/>
        </div>
      )}

      <ToastContainer autoClose={5000} theme='colored' newestOnTop={true} />
    </div>
  );
}

export default App;
