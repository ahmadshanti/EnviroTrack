import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Reports from "./pages/Reports";
import About from "./pages/About";
import { mockReadings } from "./data/mockReadings";
import "./App.css";

function App() {
  const [readings, setReadings] = useState(mockReadings || []);

  const handleAddReading = (newReading) => {
    setReadings((prev) => [...prev, newReading]);
  };

  return (
    <BrowserRouter>
      <div className="app">
        <div className="background-glow bg-one"></div>
        <div className="background-glow bg-two"></div>

        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <Dashboard readings={readings} onAddReading={handleAddReading} />
            }
          />
          <Route path="/history" element={<History readings={readings} />} />
          <Route path="/reports" element={<Reports readings={readings} />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;