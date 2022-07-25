import Sun from "../Components/Icons/Sun";
import { useAuth } from "../Context/ForecastContext";

const Home = () => {
  const { locationWeather, weeklyWeather } = useAuth();
  return (
    <>
      <div className="pt-6 text-white md:px-6 px-2">
        <div className="">
          <ul>
            {locationWeather.map((data) => {
              return (
                <div key={data.name}>
                  <p className="text-xl font-semibold">
                    {data.name}, {data.country}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="mt-12 md:w-4/12">
                      <p className="text-6xl font-bold mb-4">{`${
                        data.temp
                      }${"\u2103"}`}</p>
                      <div>
                        <p>
                          {" "}
                          It's
                          <span className="font-bold">
                            {data.weather === "Clouds"
                              ? " Cloudy"
                              : data.weather === "sunny"
                              ? "Sunny"
                              : ""}{" "}
                          </span>{" "}
                          outside!!
                        </p>
                        <p className="font-semibold">
                          {data.weather === "Clouds"
                            ? "Excellent weather for a walk"
                            : data.weather === "sunny"
                            ? "Its hot outside!!!"
                            : ""}
                        </p>
                      </div>

                      <p>Sunrise: {data.sunrise}</p>
                      <p>Sunset: {data.sunset}</p>
                    </div>
                    <div className="md:static absolute -right-48 top-24 overflow-hidden md:w-4/12">
                      <Sun />
                    </div>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
        <div className="border-y border-y-white md:my-auto mt-24">
          <ul className="flex justify-between overflow-x-auto">
            {weeklyWeather.map((week) => {
              return (
                <div className='w-5/12' key={week.date}>
                  <p>{week.date}</p>
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
