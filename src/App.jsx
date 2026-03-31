import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "./firebase";
import { ref, onValue, push } from "firebase/database";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import History from "./pages/History";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import Tips from "./pages/Tips";
import './App.css';

function App() {
  const [readings, setReadings] = useState([]);

  useEffect(() => {
    const readingsRef = ref(db, "readings");
    onValue(readingsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loaded = Object.entries(data).map(([id, val]) => ({
          id,
          ...val,
        }));
        setReadings(loaded);
      }
    });
  }, []);

  const handleAddReading = (newReading) => {
    const readingsRef = ref(db, "readings");
    push(readingsRef, newReading);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard readings={readings} onAddReading={handleAddReading} />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/history" element={<History readings={readings} />} />
        <Route path="/reports" element={<Reports readings={readings} />} />
        <Route path="/tips" element={<Tips />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;