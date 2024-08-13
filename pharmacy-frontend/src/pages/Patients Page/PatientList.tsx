import './PatientList.css';
import React from "react";


type Patient = {
    name: string,
    id: number;
};

const PatientList: React.FC = () => {
  // Placeholder data for now
  const patients: Patient[] = Array(20).fill({ name: 'John Doe', id: 1 });

  return (
    <div className="patient-list-container">
      <h1>Patient List</h1>
      <div className="patient-list">
        {patients.map((patient, index) => (
          <div key={index} className="patient-card">
            <p>Name: {patient.name}</p>
            <p>ID: {patient.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientList;
