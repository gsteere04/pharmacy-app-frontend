import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import NavBar from "./components/NavBar/NavBar";
import HomePage from './pages/Home Page/HomePage';
import Prescription from "./pages/Prescription Page/Prescription";
import Doctors from "./pages/Prescriber Page/PrescriberList";
import PrescriberProfile from "./pages/Prescriber Page/PrescriberProfile";
import Medication from "./pages/Rx Item Page/rxItems";
import PatientList from "./pages/Patients Page/PatientList";
import Patients from "./pages/Patients Page/PatientProfile";
import PatientProfile from "./pages/Patients Page/PatientProfile";

const App: React.FC = () => {

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/prescription" element={<Prescription />}/>
          <Route path="/patient" element={<PatientList />}/>
          <Route path="/doctors" element={<Doctors />}/>
          <Route path="/prescribers/:id" element={<PrescriberProfile />} />
          <Route path="/rxitem" element={<Medication />}/>
          <Route path="/patient/:id" element={<Patients />} />
          <Route path="/patient/:id" element={<PatientProfile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App
