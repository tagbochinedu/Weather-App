import React, { useContext, useEffect, useState } from "react";
const ForecastContext = React.createContext();

export function useAuth() {
  return useContext(ForecastContext);
}

export function AuthProvider({ children }) {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [locationWeather, setLocationWeather] = useState([]);
  const [weeklyWeather, setWeeklyWeather] = useState([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("");
  const [data, setData] = useState([]);
  const [errorText, setErrorText] = useState("");
  const [error, setError] = useState(false);
  const [searchLoader, setSearchLoader] = useState(false);
  const API_KEY = process.env.REACT_APP_API_KEY;

  const TimeCalc = (timing) => {
    const time = new Date(timing * 1000);
    let hours = (time.getUTCHours() + 1).toString();
    const minutes = time.getMinutes().toString();
    if (hours > 12) {
      hours -= 12;
      return `${hours}:${minutes}pm`;
    } else {
      return `${hours}:${minutes}am`;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const res = await response.json();

      const duskCalc = () => {
        let  dusk = [];
        let sunset = [];
        const dusktime = new Date();
        let duskhours = (dusktime.getUTCHours() + 1).toString();
        const duskminutes = dusktime.getMinutes().toString();

        const sunsettime = new Date(res.sys.sunset);
        let sunsethours = (sunsettime.getUTCHours() + 1).toString();
        const sunsetminutes = sunsettime.getMinutes().toString();
        console.log(sunsettime, sunsethours, sunsetminutes)
        if (duskhours > 12) {
          duskhours -= 12;
          dusk = [duskhours, duskminutes];
        }        
        if (sunsethours > 12) {
          sunsethours -= 12;
          sunset = [sunsethours, sunsetminutes]
        } 
        console.log(dusk, sunset)
        return (dusk[0]>=sunset[0] && dusk[1]>sunset[1])
      };

      const resData = [
        {
          dusk: duskCalc(),
          name: res.name,
          temp: res.main.temp,
          min_temp: res.main.temp_min,
          max_temp: res.main.temp_max,
          country: res.sys.country,
          sunrise: TimeCalc(res.sys.sunrise),
          sunset: TimeCalc(res.sys.sunset),
          weather: res.weather[0].main,
          weatherDesc: res.weather[0].description,
        },
      ];
      setData(resData);
      setSearchLoader(false);
      console.log(data);
    } catch (error) {
      console.log(error.message);
      setError(true);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      console.log(longitude, latitude);
    });
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
        );
        const response1 = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
        );
        const res = await response.json();
        const res1 = await response1.json();

        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "June",
          "July",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec",
        ];
        const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
        const DateCalc = (timing) => {
          let time = "";
          if (timing) {
            time = new Date(timing * 1000);
          } else {
            time = new Date();
          }
          const month = months[time.getMonth()];
          const date = time.getDate();
          const day = days[time.getDay()];
          return `${day}, ${month} ${date}`;
        };

        const data = [
          {
            country: res.sys.country,
            name: res.name,
            lng: res.coord.lon,
            lat: res.coord.lat,
            sunrise: TimeCalc(res.sys.sunrise),
            sunset: TimeCalc(res.sys.sunset),
            temp: Math.round(res.main.temp),
            date: DateCalc(),
            weather: res.weather[0].main,
            weatherDesc: res.weather[0].description,
          },
        ];
        const weeklyData = [
          {
            date: DateCalc(res1.daily[0].dt),
            day_temp: Math.round(res1.daily[0].temp.day),
            night_temp: Math.round(res1.daily[0].temp.night),
            weather: res1.daily[0].weather[0].main,
          },
          {
            date: DateCalc(res1.daily[1].dt),
            day_temp: Math.round(res1.daily[1].temp.day),
            night_temp: Math.round(res1.daily[1].temp.night),
            weather: res1.daily[1].weather[0].main,
          },
          {
            date: DateCalc(res1.daily[2].dt),
            day_temp: Math.round(res1.daily[2].temp.day),
            night_temp: Math.round(res1.daily[2].temp.night),
            weather: res1.daily[2].weather[0].main,
          },
          {
            date: DateCalc(res1.daily[3].dt),
            day_temp: Math.round(res1.daily[3].temp.day),
            night_temp: Math.round(res1.daily[3].temp.night),
            weather: res1.daily[3].weather[0].main,
          },
          {
            date: DateCalc(res1.daily[4].dt),
            day_temp: Math.round(res1.daily[4].temp.day),
            night_temp: Math.round(res1.daily[4].temp.night),
            weather: res1.daily[4].weather[0].main,
          },
          {
            date: DateCalc(res1.daily[5].dt),
            day_temp: Math.round(res1.daily[5].temp.day),
            night_temp: Math.round(res1.daily[5].temp.night),
            weather: res1.daily[5].weather[0].main,
          },
          {
            date: DateCalc(res1.daily[6].dt),
            day_temp: Math.round(res1.daily[6].temp.day),
            night_temp: Math.round(res1.daily[6].temp.night),
            weather: res1.daily[6].weather[0].main,
          },
        ];
        setWeeklyWeather(weeklyData);
        setLocationWeather(data);
        setLoading(false);
        console.log(data);
        console.log(res1);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWeather();
  }, [latitude, longitude, API_KEY]);

  const value = {
    locationWeather,
    weeklyWeather,
    loading,
    submitHandler,
    setCity,
    data,
    searchLoader,
    setSearchLoader,
  };
  return (
    <ForecastContext.Provider value={value}>
      {children}
    </ForecastContext.Provider>
  );
}
