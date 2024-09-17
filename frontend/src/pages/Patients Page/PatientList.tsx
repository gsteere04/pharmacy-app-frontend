import "./PatientList.css";
import { states } from "../../../data/states";
import { PatientDetailInfo } from "../../types/patientTypes";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import ReactSelect from "react-select";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import fetchPatients from "../../services/patientService"; // Import the fetchPatients function

export type PatientBasicInfo = {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
};

const PatientList: React.FC = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deletePatientId, setDeletePatientId] = useState<number | null>(null);
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState<PatientBasicInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newPatient, setNewPatient] = useState<PatientDetailInfo>({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    phone_number: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    allergies: "",
    insurance_name: "",
    insurance_member_id: "",
    insurance_group_number: "",
    insurance_rx_bin: "",
    insurance_rx_pcn: "",
    insurance_person_code: "",
  });

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const data: PatientBasicInfo[] = await fetchPatients();
        setPatients(data);
      } catch (error) {
        setError("Failed to load patients");
      } finally {
        setLoading(false);
      }
    };

    loadPatients();
  }, []);

  const handleStateChange = (
    selectedOption: { value: string; label: string } | null
  ) => {
    setNewPatient((prevState) => ({
      ...prevState,
      state: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPatient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDeletePatient = async (patientId: number) => {
    try {
      const response = await fetch(`http://localhost:8000/patients/${patientId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete patient");
      }
      setPatients((prevPatients) =>
        prevPatients.filter((patient) => patient.id !== patientId)
      );
    } catch (error) {
      console.error("There was a problem deleting the patient.");
      setError("Failed to delete patient.");
    }
  };

  const handleSaveChanges = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Format dateOfBirth to ISO format for consistency
    const formattedDateOfBirth = new Date(newPatient.date_of_birth)
      .toISOString()
      .split("T")[0];

    // Prepare patient data
    const patientData = {
      first_name: newPatient.first_name,
      last_name: newPatient.last_name,
      date_of_birth: formattedDateOfBirth,
      phone_number: newPatient.phone_number,
      street: newPatient.street,
      city: newPatient.city,
      state: newPatient.state,
      zipcode: newPatient.zipcode,
      allergies: newPatient.allergies,
      insurance_name: newPatient.insurance_name || null,
      insurance_member_id: newPatient.insurance_member_id || null,
      insurance_group_number: newPatient.insurance_group_number || null,
      insurance_rx_bin: newPatient.insurance_rx_bin || null,
      insurance_rx_pcn: newPatient.insurance_rx_pcn || null,
      insurance_person_code: newPatient.insurance_person_code,
    };

    try {
      const response = await fetch("http://localhost:8000/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientData),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Capture detailed error message
        throw new Error(`Network response was not ok: ${errorData.detail || response.statusText}`);
      }

      const patient = await response.json();
      setPatients((prevPatients) => [
        ...prevPatients,
        { ...patient, id: patient.patient_id }, // Ensure correct ID field
      ]);
      handleClose(); // Close the modal
    } catch (error: unknown) {
      let errorMessage = "Failed to add patient";

      if (error instanceof Error) {
        errorMessage += `: ${error.message}`;
      }

      setError(errorMessage);
      console.error("Save Changes Error:", error); // Log error
    }
  };

  const filteredPatients = patients.filter((patient) =>
    `${patient.first_name} ${patient.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className="patient-list-container">
      {error && <div className="error-message">{error}</div>}
      <div className="patient-header">
        <div className="patient-search-bar">
          <form>
            <label>
              Search:
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
          className="add-patient-button"
        >
          Add Patient
        </Button>
      </div>

      {/* Modal for adding a new patient */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSaveChanges}>
            <div className="patient-info">
              <h3>Patient Information</h3>
              <div className="form-group">
                <label>
                  Last Name:
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Ex. John Doe"
                    required
                    value={newPatient.last_name}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  First Name:
                  <input
                    type="text"
                    name="first_name"
                    placeholder="Ex. John Doe"
                    required
                    value={newPatient.first_name}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Date of Birth:
                  <input
                    type="date"
                    value={newPatient.date_of_birth}
                    onChange={(e) =>
                      setNewPatient({
                        ...newPatient,
                        date_of_birth: e.target.value,
                      })
                    }
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Phone Number:
                  <input
                    type="text"
                    name="phone_number"
                    placeholder="Enter phone number here"
                    value={newPatient.phone_number}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Allergies:
                  <input
                    type="text"
                    name="allergies"
                    placeholder="Ex. Peanut"
                    required
                    value={newPatient.allergies}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
            </div>

            <div className="address">
              <h3>Address</h3>
              <div className="form-group">
                <label>
                  State:
                  <ReactSelect
                    options={states}
                    isClearable
                    placeholder="Select a state"
                    onChange={handleStateChange}
                    value={states.find(
                      (option) => option.value === newPatient.state
                    )}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  City:
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter city"
                    required
                    value={newPatient.city}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Zip:
                  <input
                    type="text"
                    name="zipcode"
                    placeholder="Enter zip code"
                    required
                    value={newPatient.zipcode}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Street:
                  <input
                    type="text"
                    name="street"
                    placeholder="Enter street address"
                    required
                    value={newPatient.street}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
            </div>

            <div className="insurance">
              <h3>Insurance Information</h3>
              <div className="form-group">
                <label>
                  Insurance Name:
                  <input
                    type="text"
                    name="insurance_name"
                    placeholder="Enter insurance name"
                    value={newPatient.insurance_name}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Member ID:
                  <input
                    type="text"
                    name="insurance_member_id"
                    placeholder="Enter insurance member ID"
                    value={newPatient.insurance_member_id}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Group Number:
                  <input
                    type="text"
                    name="insurance_group_number"
                    placeholder="Enter group number"
                    value={newPatient.insurance_group_number}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  RX Bin:
                  <input
                    type="text"
                    name="insurance_rx_bin"
                    placeholder="Enter RX bin number"
                    value={newPatient.insurance_rx_bin}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  RX PCN:
                  <input
                    type="text"
                    name="insurance_rx_pcn"
                    placeholder="Enter RX PCN number"
                    value={newPatient.insurance_rx_pcn}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Person Code:
                  <input
                    type="text"
                    name="insurance_person_code"
                    placeholder="Enter person code"
                    value={newPatient.insurance_person_code}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
            </div>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={confirmDelete} onHide={() => setConfirmDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this patient?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmDelete(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              if (deletePatientId !== null) {
                await handleDeletePatient(deletePatientId);
              }
              setConfirmDelete(false);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <h1>Current Patients</h1>
      <div className="patients-list">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <div key={patient.id} className="patient-item">
              <span className="patient-item-span">
                {patient.first_name} {patient.last_name}
              </span>
              <Link to={`/patient/${patient.id}`} className="patient-profile-link">
                View Profile
              </Link>
              <Button className="delete-button"
                variant="danger"
                onClick={() => {
                  setDeletePatientId(patient.id);
                  setConfirmDelete(true);
                }}
              >
                X
              </Button>
            </div>
          ))
        ) : (
          <div className="no-patients">No patients found</div>
        )}
      </div>
    </div>
  );
};

export default PatientList;
