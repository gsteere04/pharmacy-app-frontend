import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import NavBar from "./components/NavBar";
import HomePage from './pages/HomePage'
import Prescription from "./pages/Prescription";

const App: React.FC = () => {

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/prescription" element={<Prescription />}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App
