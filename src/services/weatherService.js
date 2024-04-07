import { DateTime } from "luxon"; // Importing DateTime module from Luxon library for date-time handling.

// Constants for API key and base URLs for OpenWeatherMap API.
const API_KEY = "65250e170f987aa126203bde57f85e0b";
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const BASE_URL_TWO = "https://api.openweathermap.org/data/3.0";

// Function to fetch weather data from OpenWeatherMap API.
const getWeatherData = (version, infoType, searchParams) => {
    // Determine the base URL based on the API version.
    const baseUrl = (version === 3) ? BASE_URL_TWO : BASE_URL;
    // Construct URL with parameters.
    const url = new URL(baseUrl + "/" + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

    // Fetch data from the constructed URL and parse JSON response.
    return fetch(url).then((res) => res.json());
};

// Function to format current weather data received from API response.
const formatCurrentWeather = (data) => {
    // If the API response indicates a 404 error, return null.
    if (data.status === 404 || data.cod === 404) return null;
    
    // Destructure required data from the API response.
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed },
        id
    } = data;

    // Destructure weather details from the weather array.
    const { main: details, icon, description } = weather[0];

    // Return formatted current weather data.
    return { lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, speed, details, icon, description, id };
};

// Function to format forecast weather data received from API response.
const formatForecastWeather = (data) => {
    // If the API response indicates a 404 error, return null.
    if (data.status === 404) return null;

    // Destructure timezone and daily forecast data from the API response.
    let { timezone, daily } = data;

    // Extract necessary data from daily forecast and format it.
    daily = daily.slice(1, 6).map((d) => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'ccc'), // Format forecast time to local time.
            temp: d.temp.day, // Extract daily temperature.
            icon: d.weather[0].icon, // Extract weather icon code.
        };
    });

    // Return formatted forecast weather data.
    return { timezone, daily };
};

// Function to fetch and format weather data asynchronously.
const getFormattedWeatherData = async (searchParams) => {
    // Fetch and format current weather data.
    const formattedCurrentWeather = await getWeatherData(2, 'weather', searchParams).then(formatCurrentWeather);

    // If current weather data is null, return null.
    if (formattedCurrentWeather == null) return null;

    // Extract latitude and longitude from current weather data.
    const { lat, lon } = formattedCurrentWeather;

    // Fetch and format forecast weather data.
    const formattedForecastWeather = await getWeatherData(3, 'onecall', {
        lat, lon, exclude: 'current, minutely,alerts, units: searchParams.units'
    }).then(formatForecastWeather);

    // Log and return formatted weather data.
    return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

// Function to format timestamp to local time.
const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(parseInt(secs)).setZone(zone).toFormat(format);

// Function to generate URL for weather icon based on icon code.
const iconUrlFromCode = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`;

// Exporting the asynchronous function for fetching and formatting weather data, and utility functions.
export default getFormattedWeatherData;
export { formatToLocalTime, iconUrlFromCode };
