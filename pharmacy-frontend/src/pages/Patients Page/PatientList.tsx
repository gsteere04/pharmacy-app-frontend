import './PatientList.css';
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type Patient = {
    name: string,
    id: number;
};

const PatientList: React.FC = () => {
  // Placeholder data for now
  const patients: Patient[] = Array(20).fill({ name: 'John Doe', id: 1 });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="patient-list-container">
      <div className="patient-search-bar">
        <form>
          <label>Seach:
            <input type='text' name='search' placeholder='Ex. John Doe' />
          </label>
        </form>
      </div>
     <Button 
     variant="primary" onClick={handleShow}>Add Patient
      </Button> 

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
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
