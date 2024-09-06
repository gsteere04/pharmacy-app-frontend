import "./PrescriberList.css";
import { PrescriberDetailInfo } from "../../types/prescriberTypes";

import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import fetchPatients from "../../services/patientService"; // Import the fetchPatients function

export type PrescriberBasicInfo = {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
};

const PrescriberList: React.FC = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deletePrescriberId, setDeletePrescriberId] = useState<number | null>(null);
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [prescribers, setPrescribers] = useState<PrescriberBasicInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newPrescriber, setNewPrescriber] = useState<PrescriberDetailInfo>({
    first_name: "",
    last_name: "",
    phone_number: "",
    dea: "",
    type: "",
    npi_number: ""
  });

  useEffect(() => {
    const loadPrescribers = async () => {
      try {
        const data: PrescriberBasicInfo[] = await fetchPatients();
        setPrescribers(data);
      } catch (error) {
        setError("Failed to load prescribers");
      } finally {
        setLoading(false);
      }
    };

    loadPrescribers();
  }, []);


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPrescriber((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDeletePrescriber = async (prescriber_id: number) => {
    try {
      const response = await fetch(
        `http://localhost:8000/prescribers/${prescriber_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete prescriber");
      }
      setPrescribers((prevPrescribers) =>
        prevPrescribers.filter((prescriber) => prescriber.id !== prescriber_id)
      );
    } catch (error) {
      console.error("There was a problem deleting the prescriber.");
      setError("Failed to delete prescriber.");
    }
  };

  const handleSaveChanges = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    const prescriberData = {
      first_name: newPrescriber.first_name,
      last_name: newPrescriber.last_name,
      phone_number: newPrescriber.phone_number,
    };

    try {
      const response = await fetch("http://localhost:8000/prescribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prescriberData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Network response was not ok: ${
            errorData.detail || response.statusText
          }`
        );
      }

      const prescriber = await response.json();
      setPrescribers((prevPrescribers) => [
        ...prevPrescribers,
        { ...prescriber, id: prescriber.prescriber_id },
      ]);
      handleClose();
    } catch (error: unknown) {
      let errorMessage = "Failed to add prescriber";

      if (error instanceof Error) {
        errorMessage += `: ${error.message}`;
      }

      setError(errorMessage);
      console.error("Save Changes Error:", error);
    }
  };

  const filteredPrescribers = prescribers.filter((prescriber) =>
    `${prescriber.first_name} ${prescriber.last_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className="prescriber-list-container">
      {error && <div className="error-message">{error}</div>}
      <div className="prescriber-header">
        <div className="prescriber-search-bar">
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
          className="add-prescriber-button"
        >
          Add Prescriber
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Prescriber</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSaveChanges}>
            <div className="prescriber-info">
              <h3>Prescriber Information</h3>
              <div className="form-group">
                <label>
                  Last Name:
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Ex. Doe"
                    required
                    value={newPrescriber.last_name}
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
                    placeholder="Ex. John"
                    required
                    value={newPrescriber.first_name}
                    onChange={handleInputChange}
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
                    value={newPrescriber.phone_number}
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
      <h1>Current Prescribers</h1>
      <div className="prescriber-list">
        {filteredPrescribers.length > 0 ? (
          filteredPrescribers.map((prescriber) => (
            <div key={prescriber.id} className="prescriber-item">
              <span className="prescriber-item-span">
                {prescriber.first_name} {prescriber.last_name} 
              </span>
              <Link to={`/prescribers/${prescriber.id}`} className="prescriber-profile-link">
              View Profile
              </Link>
              <Button className="delete-button"
                variant="danger"
                onClick={() => {
                  setDeletePrescriberId(prescriber.id);
                  setConfirmDelete(true);
                }}
              >
                X
              </Button>
            </div>
          ))
        ) : (
          <div className="no-prescriber">No prescribers found</div>
        )}
      </div>

      <Modal show={confirmDelete} onHide={() => setConfirmDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this prescriber?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmDelete(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              if (deletePrescriberId) {
                handleDeletePrescriber(deletePrescriberId);
              }
              setConfirmDelete(false);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PrescriberList;
