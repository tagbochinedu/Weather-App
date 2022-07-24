import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import MenuOpen from "./Icons/MenuOpen";
import MenuClose from "./Icons/MenuClose";
import { useAuth } from "../Context/ForecastContext";

const SideNav = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [menu, setMenu] = useState(false);
  const { locationData } = useAuth();

  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    if (width > 767) {
      setMenu(false);
    }
  }, [width]);
  return (
    <header className="md:flex md:justify-between items-center  bg-inherit w-full">
      <div className="md:w-2/12 flex justify-between items-center">
        <span
          className="md:hidden"
          onClick={() => {
            setMenu(!menu);
          }}
        >
          {!menu ? <MenuOpen /> : <MenuClose />}
        </span>
        <div className='md:w-6/12 text-center block md:hidden text-xl font-bold text-white'>
        <ul>
          {locationData.map((data) => {
            return <p key={data.date}>{data.date}</p>;
          })}
        </ul>
      </div>
        <div className="text-xl font-bold font-serif text-hdr outline-8 flex  justify-between">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1779/1779940.png"
            className="h-16 w-16 mr-6"
            alt="logo"
          />
        </div>
      </div>
      <div className='w-6/12 text-center md:block hidden text-xl font-bold text-white'>
        <ul>
          {locationData.map((data) => {
            return <p key={data.date}>{data.date}</p>;
          })}
        </ul>
      </div>

      <div className="w-2/12">
        <ul
          className={`${"md:flex md:flex-row md:relative md:justify-between items-center z-[-1] md:z-auto md:top-0 text-white md:text-center md:opacity-100 font-semibold w-full duration-500 ease-in transition-all"} ${
            menu ? "" : "hidden opacity-0"
          }`}
        >
          <li>
            <NavLink
              end
              to="/"
              className="text-xl"
              onClick={() => {
                setMenu(false);
              }}
            >
              Home
            </NavLink>
          </li>

          <li className="md:my-0 my-5">
            <NavLink
              onClick={() => {
                setMenu(false);
              }}
              end
              to="/profile"
              className="text-xl"
            >
              Search
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default SideNav;
