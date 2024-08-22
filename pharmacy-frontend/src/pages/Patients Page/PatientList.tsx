import './PatientList.css';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type Patient = {
  name: string;
  rxNumber: number;
};

const PatientList: React.FC = () => {
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [patientsFound, setPatientsFound] = useState(true);

  const patients: Patient[] = Array.from({ length: 20 }, (_, index) => ({
    name: `John Doe ${index + 1}`,
    rxNumber: index + 1
  }));

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    const found = patients.some(patient =>
      patient.name.toLowerCase().includes(term.toLowerCase())
    );
    setPatientsFound(found);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="patient-list-container">
      <div className="patient-header">
        <div className="patient-search-bar">
          <form>
            <label>Search:
              <input
                type="text"
                name="search"
                placeholder="Ex. John Doe"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </label>
          </form>
        </div>
        <Button
          variant="primary"
          onClick={handleShow}
          className="add-patient-button">
          Add Patient
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            {/* Add your form fields here */}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <h1>Current Patients</h1>
      <div className="patient-list">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient, index) => (
            <div key={index} className="patient-card">
              <Link to={`/patients/${patient.rxNumber}`}>
                <p>Name: {patient.name}</p>
              </Link>
              <p>ID: {patient.rxNumber}</p>
            </div>
          ))
        ) : (
          <p>No patients found</p>
        )}
      </div>
    </div>
  );
};

export default PatientList;
