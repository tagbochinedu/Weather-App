import Sun from "../Components/Icons/Sun";
import { useAuth } from "../Context/ForecastContext";

const Home = () => {
  const { locationData } = useAuth();
  return (
    <>
      <div className="pt-6 text-white md:px-6 px-2">
        <div className="">
          <ul>
            {locationData.map((data) => {
              console.log(locationData);
              return (
                <div key={data.name}>
                  <p className="text-xl font-semibold">
                    {data.name}, {data.country}
                  </p>
                  <div className="flex items-center">
                    <div className="mt-12">
                      <p className="text-6xl font-bold mb-4">{`${
                        data.temp
                      }${"\u2103"}`}</p>
                      <div className='flex justify-between'>
                        <span>Max: {`${data.max_temp}${"\u2103"}`}</span>
                        <span>Min: {`${data.min_temp}${"\u2103"}`}</span>
                      </div>
                      <p>{data.weather}</p>
                      <p>{data.sunrise}</p>
                      <p>{data.sunset}</p>
                    </div>
                    <div className="absolute -right-48 top-24">
                      <Sun />
                    </div>
                  </div>
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
