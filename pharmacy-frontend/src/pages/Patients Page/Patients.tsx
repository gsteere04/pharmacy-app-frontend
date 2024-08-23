import React from "react";
import { useParams } from "react-router-dom";
import "./Patients.css";

const Patients: React.FC = () => {
  const { rxNumber } = useParams<{ rxNumber: string }>();

  return (
    <div className="patients">
      <div className="patient-name-card">
        <h1 className="patient-name">Patient Name: --- {rxNumber}</h1>
      </div>
      <div className="patient-container">
        <h1 className="patient-title">Patient Information</h1>
        <div className="patient-card">
          <div className="patient-card-text">
            <p>Address:</p>
            <p>Phone:</p>
            <p>DOB:</p>
          </div>
        </div>
        <div className="allergies-balance">
          <h2>Allergies: --</h2>
          <h2>Balance: --</h2>
        </div>
      </div>
    </div>
  );
};

export default Patients;
