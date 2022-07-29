import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./Context/ForecastContext";
import { AuthProvider1 } from "./Context/CitiesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
    <AuthProvider1>
      <App />
    </AuthProvider1>
    </AuthProvider>
  </BrowserRouter>
);
