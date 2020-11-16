import axios from "axios";
export const OpenWeather = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
  params: {
    appid: process.env.REACT_APP_WEATHER_API_KEY,
  },
});
