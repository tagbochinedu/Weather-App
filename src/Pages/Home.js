import Sun from "../Components/Icons/Sun";
import Cloud from "../Components/Icons/Cloud";
import Arrow from "../Components/Icons/Arrow";
import { useAuth } from "../Context/ForecastContext";

const Home = () => {
  const { locationWeather, weeklyWeather } = useAuth();
  return (
    <>
      <div className="pt-6 text-white ">
        <div className="md:pl-6 pl-2">
          <ul>
            {locationWeather.map((data) => {
              return (
                <div key={data.name}>
                  <p className="text-xl font-semibold">
                    {data.name}, {data.country}
                  </p>
                  <div className="flex items-center justify-between overflow-x-hidden">
                    <div className="mt-12 md:w-4/12">
                      <p className="text-6xl font-bold mb-4">{`${
                        data.temp
                      }${"\u2103"}`}</p>
                      <div>
                        <p>
                          <span className="font-bold">
                            {data.weather === "Clouds"
                              ? " Cloudy"
                              : data.weather === "sunny"
                              ? "Sunny"
                              : data.weather === "Rain"
                              ? "Rainy"
                              : ""}
                          </span>
                        </p>
                        <p className="font-semibold">
                          {data.weatherDesc}
                        </p>
                      </div>

                      <p>Sunrise: {data.sunrise}</p>
                      <p>Sunset: {data.sunset}</p>
                    </div>
                    {
                      <div className="w-3/12 md:w-6/12">
                        <Sun
                          className={
                            "w-48 h-48 md:h-96 md:w-96 text-white rotate-270"
                          }
                        />
                      </div>
                    }
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
        <div className="border-t border-t-white md:my-auto md:flex mt-24 px-2 py-2">
          <div className="flex md:block md:w-2/12 justify-between items-center text-center md:text-left md:text-lg font-semibold">
            <p className="w-2/12 md:w-full mx-auto">Date</p>
            <span className="absolute right-5 bg-sunset hidden md:block rounded-3xl">
              <Arrow className="h-12 w-12 opacity-80" />
            </span>{" "}
            <p className="w-2/12 md:w-full mx-auto">Weather Forecast</p>
            <p className="w-2/12 md:w-full mx-auto">Day Temp</p>
            <p className="w-2/12 md:w-full mx-auto">Night Temp</p>
          </div>
          <ul className="overflow-x-auto whitespace-nowrap ... scrollbar-hide md:w-10/12">
            {weeklyWeather.map((week) => {
              return (
                <div
                  className="md:w-1/4 text-center flex justify-between md:inline-block md:border-l-2 md:border-white"
                  key={week.date}
                >
                  <p className="w-2/12 md:w-full mx-auto text-lg font-semibold">
                    {week.date}
                  </p>
                  <p className="w-2/12 md:w-full mx-auto">
                    {week.weather === "Clouds" ? (
                      <Cloud
                        className={
                          "w-2/12 md:w-full h-8 w-8 text-white mx-auto"
                        }
                      />
                    ) : week.weather === "sunny" ? (
                      <Sun
                        className={
                          "w-2/12 md:w-full h-8 w-8 text-white mx-auto"
                        }
                      />
                    ) : week.weather === "Rain" ? (
                      <Sun
                        className={
                          "w-2/12 md:w-full text-white mx-auto h-8 w-8"
                        }
                      />
                    ) : (
                      ""
                    )}
                  </p>
                  <p className="w-2/12 md:w-full mx-auto text-lg font-semibold">{`${
                    week.day_temp
                  }${"\u2103"}`}</p>
                  <p className="w-2/12 md:w-full mx-auto text-lg font-semibold">{`${
                    week.night_temp
                  }${"\u2103"}`}</p>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
