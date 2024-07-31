import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./Login";
import Membership from "./Membership";
import CocktailsPage from "./CocktailsPage";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/cocktails" element={<CocktailsPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
