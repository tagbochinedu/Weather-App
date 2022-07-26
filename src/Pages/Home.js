import Sun from "../Components/Icons/Sun";
import Cloud from "../Components/Icons/Cloud";
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
                          {" "}
                          It's
                          <span className="font-bold">
                            {data.weather === "Clouds"
                              ? " Cloudy"
                              : data.weather === "sunny"
                              ? "Sunny"
                              : data.weather === "Rain"
                              ? "Raining"
                              : ""}{" "}
                          </span>{" "}
                          outside!!
                        </p>
                        <p className="font-semibold">
                          {data.weather === "Clouds"
                            ? "Excellent weather for a walk"
                            : data.weather === "sunny"
                            ? "Its hot outside!!!"
                            : data.weather === "Rain"
                            ? "A rainy day, I see"
                            : ""}
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
        <div className="border-y border-y-white md:my-auto mt-24 px-2">
          <div className="md:hidden flex justify-between items-center text-center">
            <p className="w-2/12">Date</p>
            <p className="w-2/12">Weather ForeCast</p>
            <p className="w-2/12">Day Temp</p>
            <p className="w-2/12">Night Temp</p>
          </div>
          <ul className="overflow-x-auto whitespace-nowrap ... scrollbar-hide">
            {weeklyWeather.map((week) => {
              return (
                <div
                  className="md:w-1/4 text-center flex justify-between md:inline-block my-4"
                  key={week.date}
                >
                  <p className="w-2/12">{week.date}</p>
                  <p className="w-2/12">
                    {week.weather === "Clouds" ? (
                      <Cloud className={"h-6 w-6 text-white"} />
                    ) : week.weather === "sunny" ? (
                      <Sun className={"h-4 w-4 text-white"} />
                    ) : week.weather === "Rain" ? (
                      <Sun className={"h-4 w-4 text-white mx-auto"} />
                    ) : (
                      ""
                    )}
                  </p>
                  <p className="w-2/12">{`${week.day_temp}${"\u2103"}`}</p>
                  <p className="w-2/12">{`${week.night_temp}${"\u2103"}`}</p>
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
