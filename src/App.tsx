import CountryDetails from "./components/CountryDetails/CountryDetails";
import HomePage from "./components/HomePage/HomePage";
import NavBar from "./components/NavBar/NavBar";
import { ThemeProvide } from "./themeContext/ThemeContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvide>
        <NavBar />
        <Routes>
          <Route path="/country-search" element={<HomePage />} />
          <Route path="/country-details" element={<CountryDetails />} />
        </Routes>
      </ThemeProvide>
    </BrowserRouter>
  );
}

export default App;
