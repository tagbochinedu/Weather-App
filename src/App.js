import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import { SunIcon } from "@heroicons/react/solid";
import Header from "./Components/Header";

import { useAuth } from "./Context/ForecastContext";
import { useAuth1 } from "./Context/CitiesContext";

export default function App() {
  const { loading, dusk } = useAuth();
  const { loading1 } = useAuth1();
  return (
    <div
      className={`${"pt-6 min-h-screen"} ${
        loading ? "flex justify-center items-center" : ""
      } ${
        dusk
          ? "bg-gradient-to-bl from-midnight to-dawn"
          : "bg-gradient-to-bl from-sunrise to-sunset"
      }`}
    >
      {(loading && loading1) ? (
        <SunIcon className="animate-spin text-white w-16 h-16" />
      ) : (
        <>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/search" element={<Search />} />
          </Routes>
     
        </>
        
      )}
    </div>
  );
}
