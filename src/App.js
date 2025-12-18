import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import Adventure from "./components/Adventure";
import Honeymoon from "./components/Honeymoon";
import Cultural from "./components/Cultural";
import Bachelor from "./components/Bachelor";
import Beach from "./components/Beach";
import Family from "./components/Family";
import Nature from "./components/Nature";
import Road from "./components/Road";
import Editor from "./components/editor";
import Calendar from "./components/calendar";
import Planner from "./components/planner";
import Month from "./components/month";
import TripCategory from "./components/TripCategory";
import TripPlannerUIAllInOne from "./components/TripPlannerUIAllInOne";
import Transportation from "./components/transportation";
import Detail from "./components/detail";
import TripComparison from "./components/TripComparison";
import Rewards from "./components/Rewards";
import Mytrip from "./components/Mytrip";
import Login from "./components/login..js";
import SignupPage from "./components/SignupPage";
// 🆕 Import ExplorePage
import ExplorePage from "./components/ExplorePage"; // or "./pages/ExplorePage"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adventure" element={<Adventure />} />
        <Route path="/Honeymoon" element={<Honeymoon />} />
        <Route path="/Cultural" element={<Cultural />} />
        <Route path="/Bachelor" element={<Bachelor />} />
        <Route path="/Family" element={<Family />} />
        <Route path="/Nature" element={<Nature />} />
        <Route path="/Beach" element={<Beach />} />
        <Route path="/Road" element={<Road />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="/editor" element={<Editor />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/TripCategory" element={<TripCategory />} />
        <Route path="/month" element={<Month />} />
        <Route path="/tripmap" element={<TripPlannerUIAllInOne />} />
        <Route path="/transportation" element={<Transportation />} />
        <Route path="/TripComparison" element={<TripComparison />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/mytrip" element={<Mytrip />} />

        <Route path="/category/:categoryID" element={<ExplorePage />} />
      </Routes>
    </>
  );
}

export default App;
