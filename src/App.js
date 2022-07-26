import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Sun from "./Components/Icons/Sun";
import SideNav from "./Components/SideNav";
import { useAuth } from "./Context/ForecastContext";

export default function App() {
  const { loading } = useAuth();
  return (
    <div
      className={"bg-gradient-to-bl from-sunrise to-sunset pt-8 min-h-screen"}
    >
      {loading ? (
        <div className="min-h-screen flex justify-center items-center">
          <Sun className="animate-spin text-white w-16 h-16" />
        </div>
      ) : (
        <>
          <SideNav />
          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>
        </>
      )}
    </div>
  );
}
