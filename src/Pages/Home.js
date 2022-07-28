import {
  SunIcon,
  CloudIcon,
  ArrowNarrowRightIcon,
  MoonIcon,
} from "@heroicons/react/solid";
import { useAuth } from "../Context/ForecastContext";

const Home = () => {
  const { locationWeather, weeklyWeather, dusk } = useAuth();
  return (
    <>
      <div className="pt-8 text-white ">
        <div className="md:pl-12 pl-2">
          <ul>
            {locationWeather.map((data) => {
              return (
                <div key={data.name}>
                  <p className="text-xl font-semibold">
                    {data.name}, {data.country}
                  </p>
                  <div className="flex items-center justify-between overflow-x-hidden">
                    <div className="md:w-4/12">
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
                        <p className="font-semibold">{data.weatherDesc}</p>
                      </div>

                      <p>Sunrise: {data.sunrise}</p>
                      <p>Sunset: {data.sunset}</p>
                    </div>

                    <div className=" md:w-6/12">
                      {dusk ? (
                        <MoonIcon className="w-48 h-48 md:h-96 md:w-96 text-white rotate-270" />
                      ) : (
                        <SunIcon className="w-48 h-48 md:h-96 md:w-96 text-white rotate-270" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
        <div className="border-t border-t-white md:my-auto md:flex md:mt-24 mt-28 md:px-12 px-2 py-2">
          <div className="flex md:block md:w-2/12 justify-between items-center md:text-left md:text-lg font-semibold">
            <p className="w-2/12 md:w-full text-center">Date</p>
            <span className="absolute right-5 bg-sunset hidden md:block rounded-3xl">
              <ArrowNarrowRightIcon className="h-12 w-12 opacity-80" />
            </span>{" "}
            <p className="w-2/12 md:w-full text-center">Weather Forecast</p>
            <p className="w-2/12 md:w-full text-center">Day Temp</p>
            <p className="w-2/12 md:w-full text-center">Night Temp</p>
          </div>
          <ul className="overflow-x-auto whitespace-nowrap ... scrollbar-hide w-full">
            {weeklyWeather.map((week) => {
              return (
                <div
                  className="md:w-1/4 text-center flex justify-between items-center md:inline-block md:border-l-2 md:border-white my-0.5"
                  key={week.date}
                >
                  <p className="w-2/12 md:w-full text-center text-lg font-semibold">
                    {week.date}
                  </p>
                  <p className="w-2/12 md:w-full">
                    {week.weather === "Clouds" ? (
                      <CloudIcon
                        className="md:w-full h-8 w-8 text-white mx-auto"
                      />
                    ) : week.weather === "sunny" ? (
                      <SunIcon
                        className="md:w-full h-8 w-8 text-white mx-auto"
                      />
                    ) : week.weather === "Rain" ? (
                      <ion-icon name="rainy-outline" size='large' className='text-white'></ion-icon>
                    ) : (
                      ""
                    )}
                  </p>
                  <p className="w-2/12 md:w-full text-center text-lg font-semibold">{`${
                    week.day_temp
                  }${"\u2103"}`}</p>
                  <p className="w-2/12 md:w-full text-center text-lg font-semibold">{`${
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
