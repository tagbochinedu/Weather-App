import React, { useContext, useEffect, useState} from "react";

const ForecastContext = React.createContext();

export function useAuth() {
  return useContext(ForecastContext);
}

export function AuthProvider({ children }) {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [locationData, setLocationData] = useState([]);
  useEffect(() => {
    const API_KEY = process.env.REACT_APP_API_KEY;
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
        const days = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
        const DateCalc = (timing) => {
          let time = "";
          if (timing) {
            time = new Date(timing * 1000);
          } else {
            time = new Date();
          }
          const month = months[time.getMonth()];
          const date = time.getDate();
          const day = days[time.getDay()]
          return `${day}, ${month} ${date}`;
        };

        const TimeCalc = (timing) => {
          const time = new Date(timing * 1000);
          let hours = time.getUTCHours().toString();
          const minutes = time.getMinutes().toString();
          if (hours > 12) {
            hours -= 12;
            return `${hours}:${minutes}pm`;
          } else {
            return `${hours}:${minutes}am`;
          }
        };

        const data = [
          {
            country: res.sys.country,
            name: res.name,
            lng: res.coord.lon,
            lat: res.coord.lat,
            sunrise: TimeCalc(res.sys.sunrise),
            sunset: TimeCalc(res.sys.sunset),
            temp: res1.current.temp,
            date: DateCalc(),
            weekWeather: [
              {
                date: DateCalc(res1.daily[0].dt),
                day_temp: res1.daily[0].temp.day,
                night_temp: res1.daily[0].temp.night,
                weather: res1.daily[0].weather[0].main,
              },
              {
                date: DateCalc(res1.daily[1].dt),
                day_temp: res1.daily[1].temp.day,
                night_temp: res1.daily[1].temp.night,
                weather: res1.daily[1].weather[0].main,
              },
              {
                date: DateCalc(res1.daily[2].dt),
                day_temp: res1.daily[2].temp.day,
                night_temp: res1.daily[2].temp.night,
                weather: res1.daily[2].weather[0].main,
              },
              {
                date: DateCalc(res1.daily[3].dt),
                day_temp: res1.daily[3].temp.day,
                night_temp: res1.daily[3].temp.night,
                weather: res1.daily[3].weather[0].main,
              },
              {
                date: DateCalc(res1.daily[4].dt),
                day_temp: res1.daily[4].temp.day,
                night_temp: res1.daily[4].temp.night,
                weather: res1.daily[4].weather[0].main,
              },
              {
                date: DateCalc(res1.daily[5].dt),
                day_temp: res1.daily[5].temp.day,
                night_temp: res1.daily[5].temp.night,
                weather: res1.daily[5].weather[0].main,
              },
              {
                date: DateCalc(res1.daily[6].dt),
                day_temp: res1.daily[6].temp.day,
                night_temp: res1.daily[6].temp.night,
                weather: res1.daily[6].weather[0].main,
              },
            ],
            weather: res.weather[0].main,
            weatherDesc: res.weather[0].description,
          },
        ];
        setLocationData(data);
        console.log(res1);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWeather();
  }, [latitude, longitude]);


  const value = {locationData};
  return (
    <ForecastContext.Provider value={value}>
      {children}
    </ForecastContext.Provider>
  );
}
