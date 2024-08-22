import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import NavBar from "./components/NavBar/NavBar";
import HomePage from './pages/Home Page/HomePage';
import Prescription from "./pages/Prescription Page/Prescription";
import Doctors from "./pages/Doctors Page/Doctors";
import Medication from "./pages/Home Page/Rx Item Page/RxItem";
import PatientList from "./pages/Patients Page/PatientList";

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
          <Route path="/rxitem" element={<Medication />}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App
