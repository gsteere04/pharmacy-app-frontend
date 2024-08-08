import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import NavBar from "./components/NavBar";
import HomePage from './pages/HomePage';
import Prescription from "./pages/Prescription";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Medication from "./pages/Medication";

const App: React.FC = () => {

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/prescription" element={<Prescription />}/>
          <Route path="/patients" element={<Patients />}/>
          <Route path="/doctors" element={<Doctors />}/>
          <Route path="/medication" element={<Medication />}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App
