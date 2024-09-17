import "./PrescriberList.css";
import { PrescriberDetailInfo } from "../../types/prescriberTypes";
import { states } from "../../../data/states";
import { prescriber_types } from "../../../data/prescriber_types";

import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ReactSelect from "react-select";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import fetchPrescribers from "../../services/prescriberService";

export type PrescriberBasicInfo = {
  id: number;
  first_name: string;
  last_name: string;
};

const PrescriberList: React.FC = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deletePrescriberId, setDeletePrescriberId] = useState<number | null>(
    null
  );
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [prescribers, setPrescribers] = useState<PrescriberBasicInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newPrescriber, setNewPrescriber] = useState<PrescriberDetailInfo>({
    first_name: "",
    last_name: "",
    prescriber_type: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    contact_number: "",
    dea: "",
    npi: "",
  });

  useEffect(() => {
    const loadPrescribers = async () => {
      try {
        const data: PrescriberBasicInfo[] = await fetchPrescribers();
        setPrescribers(data);
      } catch (error) {
        setError("Failed to load prescribers");
      } finally {
        setLoading(false);
      }
    };

    loadPrescribers();
  }, []);

  const handleStateChange = (
    selectedOption: { value: string; label: string } | null
  ) => {
    setNewPrescriber((prevState) => ({
      ...prevState,
      state: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleTypeChange = (
    selectedOption: { value: string; label: string } | null
  ) => {
    setNewPrescriber((prevState) => ({
      ...prevState,
      prescriber_type: selectedOption ? selectedOption.value : "",
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
      contact_number: newPrescriber.contact_number,
      prescriber_type: newPrescriber.prescriber_type,
      street: newPrescriber.street,
      city: newPrescriber.city,
      state: newPrescriber.state,
      zipcode: newPrescriber.zipcode,
      dea: newPrescriber.dea,
      npi: newPrescriber.npi,
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
                  Contact Number:
                  <input
                    type="text"
                    name="contact_number"
                    placeholder="Enter contact number here"
                    value={newPrescriber.contact_number}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  NPI Number:
                  <input
                    type="text"
                    name="npi"
                    placeholder="Enter NPI number here"
                    value={newPrescriber.npi}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  DEA:
                  <input
                    type="text"
                    name="dea"
                    placeholder="Enter DEA here"
                    value={newPrescriber.dea}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Type:
                  <ReactSelect
                    options={prescriber_types}
                    isClearable
                    placeholder="Select a type"
                    onChange={handleTypeChange}
                    value={prescriber_types.find(
                      (option) => option.value === newPrescriber.prescriber_type
                    )}
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
                      (option) => option.value === newPrescriber.state
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
                    value={newPrescriber.city}
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
                    value={newPrescriber.zipcode}
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
                    value={newPrescriber.street}
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
              <Link
                to={`/prescribers/${prescriber.id}`}
                className="prescriber-profile-link"
              >
                View Profile
              </Link>
              <Button
                className="delete-button"
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
        <Modal.Body>
          Are you sure you want to delete this prescriber?
        </Modal.Body>
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
