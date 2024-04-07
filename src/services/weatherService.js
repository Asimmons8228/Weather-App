import { DateTime } from "luxon";

const API_KEY = "65250e170f987aa126203bde57f85e0b"
const BASE_URL = "https://api.openweathermap.org/data/2.5"
const BASE_URL_TOO = "https://api.openweathermap.org/data/3.0"

const getWeatherData = (version, infoType, searchParams) => {
    const baseUrl = (version === 3) ? BASE_URL_TOO : BASE_URL
    const url = new URL(baseUrl + "/" + infoType);
    url.search = new URLSearchParams({...searchParams, appid:API_KEY})


    return fetch(url).then((res) => res.json())
};

const formatCurrentWeather = (data) => {
    if (data.status === 404 || data.cod === 404) return null
    const {
        coord: {lat, lon},
        main: {temp, feels_like, temp_min, temp_max, humidity},
        name,
        dt,
        sys: {country, sunrise, sunset},
        weather,
        wind: {speed}
    } = data
    console.log(country)
    const {main: details, icon, description} = weather[0]
    return{lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, speed, details, icon, description}
}

const formatForecastWeather = (data) => {
    if (data.status === 404) return null
    let {timezone, daily} = data;
    daily = daily.slice(1,6).map((d) => {
        return{
            title: formatToLocalTime(d.dt, timezone, 'ccc'),
            temp: d.temp.day,
            icon: d.weather[0].icon
        };
    });
    return {timezone, daily};
}

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData(2,'weather', searchParams).then(formatCurrentWeather)

    if (formattedCurrentWeather == null) return null

    const {lat, lon} = formattedCurrentWeather

    const formattedForecastWeather = await getWeatherData(3,'onecall', {
        lat,lon, exclude: 'current, minutely,alerts, units: searchParams.units'
    }).then(formatForecastWeather)

    console.log({...formattedCurrentWeather, ...formattedForecastWeather})
    return {...formattedCurrentWeather, ...formattedForecastWeather};
}

const formatToLocalTime= (secs, zone, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(parseInt(secs)).setZone(zone).toFormat(format)

const iconUrlFromCode = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`

export default getFormattedWeatherData

export {formatToLocalTime, iconUrlFromCode}