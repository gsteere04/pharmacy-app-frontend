import './PatientList.css';
import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import fetchPatients from '../../services/patientService'; // Import the fetchPatients function

type PatientBasicInfo = {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
};

const PatientList: React.FC = () => {
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState<PatientBasicInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // New state for the form
  const [newPatient, setNewPatient] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    allergies: "",
    insurance_name: "",
    insurance_member_id: "",
    insurance_group_number: "",
    insurance_rx_bin: "",
    insurance_rx_pcn: ""
  });

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const data: PatientBasicInfo[] = await fetchPatients();
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
          first_name: newPatient.first_name.split(' ')[0],
          last_name: newPatient.last_name.split(' ')[1] || '',
          date_of_birth: newPatient.date_of_birth,
          allergies: newPatient.allergies,
          city: newPatient.city,
          state: newPatient.state,
          zipcode: newPatient.zipcode,
          insurance_name: newPatient.insurance_name,
          insurance_member_id: newPatient.insurance_member_id,
          insurance_group_number: newPatient.insurance_group_number,
          insurance_rx_bin: newPatient.insurance_rx_bin,
          insurance_rx_pcn: newPatient.insurance_rx_pcn 


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
              Patient First Name:
              <input 
                type='text'
                name='first_name'
                placeholder='Ex. John Doe'
                required
                value={newPatient.first_name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Patient Last Name:
              <input 
                type='text'
                name='last_name'
                placeholder='Ex. John Doe'
                required
                value={newPatient.last_name}
                onChange={handleInputChange}
              />
            </label>
            <div className='address'>
            <label>
              Address:
              <input
                type='text'
                name='state'
                placeholder=''
                required
                value={newPatient.state}
                onChange={handleInputChange}
              />
            </label> 
            </div>
            <label>
              Date of Birth:
              <input
                title="Date of birth format: yyyy/mm/dd"
                name='date_of_birth'
                required
                value={newPatient.date_of_birth}
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
