import "./index.css";
import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import LandingPage from "./components/LandingPage/LandingPage";
import { Route, Routes } from "react-router-dom";
import RegionPage from "./components/RegionPage/RegionPage";
import SongPage from "./components/SongPage/SongPage";
import LoginPage from "./components/LoginPage/LoginPage";
import { Toaster } from "react-hot-toast";
import RegistrationPage from "./components/RegistrationPage/RegistrationPage";
import AddMusicPage from "./components/AddMusicePage/AddMusicPage";
import PorfilePage from "./components/ProfilePage/PorfilePage";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/music">
          <Route index element={<HomePage />} />
          <Route path=":region" element={<RegionPage />} />
        </Route>
        <Route path="/songs">
          <Route index element={<HomePage />} />
          <Route path=":id" element={<SongPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/addmusic" element={<AddMusicPage />} />
        <Route path="/profile" element={<PorfilePage />} />
      </Routes>
    </>
  );
}

export default App;
