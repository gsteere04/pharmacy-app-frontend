import './PatientList.css';
import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import fetchPatients from '../../services/patientService'; // Import the fetchPatients function

type Patient = {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
};

const PatientList: React.FC = () => {
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // New state for the form
  const [newPatient, setNewPatient] = useState({
    name: '',
    address: '',
    phone: '',
    dob: '',
    allergies: ''
  });

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const data = await fetchPatients();
        setPatients(data);
      } catch (error) {
        setError('Failed to load patients');
      } finally {
        setLoading(false);
      }
    };

    loadPatients();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPatient(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch('http://localhost:8000/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: newPatient.name.split(' ')[0],
          last_name: newPatient.name.split(' ')[1] || '',
          date_of_birth: newPatient.dob,
          allergies: newPatient.allergies
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const patient = await response.json();
      setPatients(prevPatients => [...prevPatients, { ...patient, id: patient.patient_id }]);
      handleClose();
    } catch (error) {
      setError('Failed to add patient');
    }
  };

  const filteredPatients = patients.filter(patient =>
    `${patient.first_name} ${patient.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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

      {/* Modal for adding a new patient */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label>
              Patient Name:
              <input 
                type='text'
                name='name'
                placeholder='Ex. John Doe'
                required
                value={newPatient.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Address:
              <input
                type='text'
                name='address'
                placeholder='Ex. The Moon'
                required
                value={newPatient.address}
                onChange={handleInputChange}
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
                value={newPatient.phone}
                onChange={handleInputChange}
                onInput={(e) => {
                  const input = e.target as HTMLInputElement;
                  input.value = input.value.replace(/[^0-9-]/g, ''); 
                }}
              />
            </label>
            <label>
              DOB:
              <input
                type='date'
                name='dob'
                required
                value={newPatient.dob}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Allergies:
              <input
                type='text'
                name='allergies'
                placeholder='Ex. Peanut'
                required
                value={newPatient.allergies}
                onChange={handleInputChange}
              />
            </label> 
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> 

      <h1>Current Patients</h1>
      <div className="patient-list">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <div key={patient.id} className="patient-card">
              <p>Name: {patient.first_name} {patient.last_name}</p>
              <p>Date of Birth: {patient.date_of_birth}</p>
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
