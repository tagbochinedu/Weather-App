import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import SideNav from "./Components/SideNav";

export default function App() {
  return (
    <div className='bg-gradient-to-bl from-sunrise to-sunset pt-8 md:px-6 px-2 min-h-screen'>
      <SideNav />
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
