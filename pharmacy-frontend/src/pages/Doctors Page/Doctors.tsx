import './Doctors.css';
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type Doctor = {
  name: string;
  rxNumber: number;
};

const PatientList: React.FC = () => {
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [doctorsFound, setDoctorsFound] = useState(true);

  // Example patient list
  const doctors: Doctor[] = Array.from({ length: 20 }, (_, index) => ({
    name: 'John Doe',
    rxNumber: index + 1
  }));

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Check if any patients match the search term
    const found = doctors.some(doctor =>
      doctor.name.toLowerCase().includes(term.toLowerCase())
    );
    setDoctorsFound(found);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const filteredPatients = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="doctor-list-container">
      <div className="doctor-header">
        <div className="doctor-search-bar">
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
          Add Doctor
        </Button> 
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Doctor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label>
              Doctor Name:
              <input 
                type='text'
                name='name'
                placeholder='Ex. John Pork'
                required
              />
            </label>
            <label>
              Phone:
              <input
                type='tel'
                name='phone'
                placeholder='Ex. 208-487-0000'
                pattern='\d{3}-\d{3}-\d{4}' 
                title="Phone number format: 123-456-7890"
                required
                onInput={(e) => {
                  const input = e.target as HTMLInputElement;
                  input.value = input.value.replace(/[^0-9-]/g, ''); 
                }}
              />
            </label>
            <label>
              Type:
              <input
                type='text'
                name='type'
                placeholder='Dermatologist'
                required
              />
            </label> 
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

      <h1>Current Doctors</h1>
      <div className="patient-list">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient, index) => (
            <div key={index} className="patient-card">
              <p>Name: {patient.name}</p>
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
