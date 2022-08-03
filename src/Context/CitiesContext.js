import React, { useContext, useEffect, useState, useCallback } from "react";
const CitiesContext = React.createContext();

export function useAuth1() {
  return useContext(CitiesContext);
}

export function AuthProvider1({ children }) {
  const [data, setData] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const API_KEY = process.env.REACT_APP_API_KEY;

  const TimeCalc = useCallback((timing) => {
    const time = new Date(timing * 1000);
    let hours = time.getUTCHours() + 1;
    const minutes = time.getMinutes();
    if (hours > 12) {
      hours -= 12;
      return `${hours}:${minutes}pm`;
    } else {
      return `${hours}:${minutes}am`;
    }
  }, []);
  
  const duskCalc = useCallback((timing, locale) => {
    let dusk = [];
    let sunrise = []
    let sunset = [];
    const dusktime = new Date();
    const duskforeign = dusktime.toLocaleString("en-US", { timeZone: locale });
    const duskarray = duskforeign.split(",");
    const newtime = duskarray[1];
    const timess = newtime.toString();
    const last = timess.split(":");
    const arr = [last[2]];
    const arr1 = arr[0].split("");
    const arr2 = arr1.slice(2);
    const arr3 = arr2.join("").toString().trim();
    console.log([dusktime, duskforeign]);
    if (arr3 === "PM") {
      console.log(true)
      let num = parseInt(last[0])+12;
      dusk.push(num)
    } else {
      console.log(false)
      dusk.push(parseInt(last[0]));
    } dusk.push(parseInt(last[1]));

    const sunrisetime = new Date(timing * 1000);
    const sunriseforeign = sunrisetime.toLocaleString('en-US', { timeZone: locale });
    const sunrisearray = sunriseforeign.split(",");
    const sunnewtime = sunrisearray[1];
    const suntimess = sunnewtime.toString();
    const sunlast = suntimess.split(":");
    const sunarr = [sunlast[2]];
    const sunarr1 = sunarr[0].split("");
    const sunarr2 = sunarr1.slice(2);
    const sunarr3 = sunarr2.join("").toString().trim();
    console.log(sunarr3)
    sunrise.push(parseInt(sunlast[0]));
    sunrise.push(parseInt(sunlast[1]))
    
    const sunsettime = new Date(timing * 1000);
    const sunsetforeign = sunsettime.toLocaleString('en-US', { timeZone: locale });
    const sunsetarray = sunsetforeign.split(",");
    const snewtime = sunsetarray[1];
    const stimess = snewtime.toString();
    const slast = stimess.split(":");
    const sarr = [slast[2]];
    const sarr1 = sarr[0].split("");
    const sarr2 = sarr1.slice(2);
    const sarr3 = sarr2.join("").toString().trim();
    console.log([sunsettime, sunsetforeign]);
    if (sarr3 === "PM") {
      console.log(true)
      let num = parseInt(slast[0])+12;
      sunset.push(num)
    } else {
      console.log(false)
      sunset.push(parseInt(slast[0]));
    } sunset.push(parseInt(slast[1]));
    console.log([dusk, sunset, sarr3]);
    return (
      (dusk[0] > sunset[0] && dusk[0] <= 24 && dusk[1] <= 59) || (dusk[0] === sunset[0] && dusk[1] > sunset[1]) || dusk[0] < sunrise[0] || dusk[0] === 0
    );
  }, []);

  useEffect(() => {
    const fetchWeather1 = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Nairobi&units=metric&appid=${API_KEY}`
        );
        const weatherRes = await response.json();
        const georesponse = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${weatherRes.coord.lat}&lon=${weatherRes.coord.lon}&units=metric&appid=${API_KEY}`
        );
        const geores = await georesponse.json();

        const response1 = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Lagos&units=metric&appid=${API_KEY}`
        );
        const weatherRes1 = await response1.json();
        const georesponse1 = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${weatherRes1.coord.lat}&lon=${weatherRes1.coord.lon}&units=metric&appid=${API_KEY}`
        );
        const geores1 = await georesponse1.json();

        const response2 = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Cairo&units=metric&appid=${API_KEY}`
        );
        const weatherRes2 = await response2.json();
        const georesponse2 = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${weatherRes2.coord.lat}&lon=${weatherRes2.coord.lon}&units=metric&appid=${API_KEY}`
        );
        const geores2 = await georesponse2.json();

        const response3 = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Cape Town&units=metric&appid=${API_KEY}`
        );
        const weatherRes3 = await response3.json();
        const georesponse3 = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${weatherRes3.coord.lat}&lon=${weatherRes3.coord.lon}&units=metric&appid=${API_KEY}`
        );
        const geores3 = await georesponse3.json();

        const response4 = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Accra&units=metric&appid=${API_KEY}`
        );
        const weatherRes4 = await response4.json();
        const georesponse4 = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${weatherRes4.coord.lat}&lon=${weatherRes4.coord.lon}&units=metric&appid=${API_KEY}`
        );
        const geores4 = await georesponse4.json();

        const response5 = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Addis Ababa&units=metric&appid=${API_KEY}`
        );
        const weatherRes5 = await response5.json();
        const georesponse5 = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${weatherRes5.coord.lat}&lon=${weatherRes5.coord.lon}&units=metric&appid=${API_KEY}`
        );
        const geores5 = await georesponse5.json();

        const resData = [
          {
            dusk: duskCalc(weatherRes.sys.sunset, geores.timezone),
            name: weatherRes.name,
            temp: Math.round(weatherRes.main.temp),
            min_temp: Math.round(weatherRes.main.temp_min),
            max_temp: Math.round(weatherRes.main.temp_max),
            country: weatherRes.sys.country,
            sunrise: TimeCalc(weatherRes.sys.sunrise),
            sunset: TimeCalc(weatherRes.sys.sunset),
            weather: weatherRes.weather[0].main,
            weatherDesc: weatherRes.weather[0].description,
          },
          {
            dusk: duskCalc(weatherRes1.sys.sunset, geores1.timezone),
            name: weatherRes1.name,
            temp: Math.round(weatherRes1.main.temp),
            min_temp: Math.round(weatherRes1.main.temp_min),
            max_temp: Math.round(weatherRes1.main.temp_max),
            country: weatherRes1.sys.country,
            sunrise: TimeCalc(weatherRes1.sys.sunrise),
            sunset: TimeCalc(weatherRes1.sys.sunset),
            weather: weatherRes1.weather[0].main,
            weatherDesc: weatherRes1.weather[0].description,
          },
          {
            dusk: duskCalc(weatherRes2.sys.sunset, geores2.timezone),
            name: weatherRes2.name,
            temp: Math.round(weatherRes2.main.temp),
            min_temp: Math.round(weatherRes2.main.temp_min),
            max_temp: Math.round(weatherRes2.main.temp_max),
            country: weatherRes2.sys.country,
            sunrise: TimeCalc(weatherRes2.sys.sunrise),
            sunset: TimeCalc(weatherRes2.sys.sunset),
            weather: weatherRes2.weather[0].main,
            weatherDesc: weatherRes2.weather[0].description,
          },
          {
            dusk: duskCalc(weatherRes3.sys.sunset, geores3.timezone),
            name: weatherRes3.name,
            temp: Math.round(weatherRes3.main.temp),
            min_temp: Math.round(weatherRes3.main.temp_min),
            max_temp: Math.round(weatherRes3.main.temp_max),
            country: weatherRes3.sys.country,
            sunrise: TimeCalc(weatherRes.sys.sunrise),
            sunset: TimeCalc(weatherRes3.sys.sunset),
            weather: weatherRes3.weather[0].main,
            weatherDesc: weatherRes3.weather[0].description,
          },
          {
            dusk: duskCalc(weatherRes4.sys.sunset, geores4.timezone),
            name: weatherRes4.name,
            temp: Math.round(weatherRes4.main.temp),
            min_temp: Math.round(weatherRes4.main.temp_min),
            max_temp: Math.round(weatherRes4.main.temp_max),
            country: weatherRes4.sys.country,
            sunrise: TimeCalc(weatherRes4.sys.sunrise),
            sunset: TimeCalc(weatherRes4.sys.sunset),
            weather: weatherRes4.weather[0].main,
            weatherDesc: weatherRes4.weather[0].description,
          },
          {
            dusk: duskCalc(weatherRes5.sys.sunset, geores5.timezone),
            name: weatherRes5.name,
            temp: Math.round(weatherRes5.main.temp),
            min_temp: Math.round(weatherRes5.main.temp_min),
            max_temp: Math.round(weatherRes5.main.temp_max),
            country: weatherRes5.sys.country,
            sunrise: TimeCalc(weatherRes5.sys.sunrise),
            sunset: TimeCalc(weatherRes5.sys.sunset),
            weather: weatherRes5.weather[0].main,
            weatherDesc: weatherRes5.weather[0].description,
          },
        ];
        setData(resData);
        setLoading1(false);
      } catch (error) {}
    };
    fetchWeather1();
  }, [API_KEY, duskCalc, TimeCalc]);

  const value = {
    data,
    loading1,
  };
  return (
    <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>
  );
}
