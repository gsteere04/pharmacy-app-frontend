import React, { useState, useEffect } from "react";
import "./rxItems.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { fetchMedications, addMedication, updateMedication, deleteRxItem } from "../../services/rxItemsService";
import { MedicationDetailInfo } from "../../types/rxTypes";

const Medication: React.FC = () => {
  const [medications, setMedications] = useState<MedicationDetailInfo[]>([]);
  const [newMedication, setNewMedication] = useState<Partial<MedicationDetailInfo>>({});
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);

  useEffect(() => {
    const loadMedications = async () => {
      try {
        const data = await fetchMedications();
        setMedications(data);
      } catch (error) {
        setError("Failed to load medications");
      } finally {
        setLoading(false);
      }
    };

    loadMedications();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMedication((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSaveChanges = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const medicationToSave: MedicationDetailInfo = {
        ...newMedication,
        id: newMedication.id || 0,
      } as MedicationDetailInfo;

      let savedMedication: MedicationDetailInfo;

      if (medicationToSave.id) {
        // Update existing medication
        savedMedication = await updateMedication(medicationToSave.id, medicationToSave);
        setMedications((prev) =>
          prev.map((med) => (med.id === savedMedication.id ? savedMedication : med))
        );
      } else {
        // Add new medication
        savedMedication = await addMedication(medicationToSave);
        setMedications((prev) => [...prev, savedMedication]);
      }

      setShow(false);
      setNewMedication({});
    } catch (error) {
      setError("Failed to save medication");
      console.error("Save Changes Error:", error);
    }
  };

  const handleDeleteRxItem = async (id: number) => {
    try {
      await deleteRxItem(id);
      setMedications(medications.filter(med => med.id !== id));
      setConfirmDelete(false);
    } catch (error) {
      setError("Failed to delete medication");
      console.error("Delete Error:", error);
    }
  };

  const filteredMedications = medications.filter((med) =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className="medication-list-container">
      {error && <div className="error-message">{error}</div>}
      <div className="medication-header">
        <div className="medication-search-bar">
          <form>
            <label>
              Search:
              <input
                type="text"
                placeholder="Ex. Ibuprofen"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </label>
          </form>
        </div>
        <Button
          variant="primary"
          onClick={() => {
            setNewMedication({});
            setShow(true);
          }}
          className="add-medication-button"
        >
          Add Medication
        </Button>
      </div>

      {/* Modal for adding/updating medication */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{newMedication.id ? "Edit Medication" : "Add Medication"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSaveChanges}>
            <div className="form-group">
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  placeholder="Enter medication name"
                  value={newMedication.name || ""}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Strength:
                <input
                  type="text"
                  name="strength"
                  placeholder="Enter strength"
                  value={newMedication.strength || ""}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                NDC:
                <input
                  type="text"
                  name="ndc"
                  placeholder="Enter NDC"
                  value={newMedication.ndc || ""}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Expiration Date:
                <input
                  type="date"
                  name="expiration"
                  placeholder="Enter expiration date"
                  value={newMedication.expiration || ""}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Lot Number:
                <input
                  type="text"
                  name="lot_number"
                  placeholder="Enter lot number"
                  value={newMedication.lot_number || ""}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Dosage Form:
                <input
                  type="text"
                  name="dosage_form"
                  placeholder="Enter dosage form"
                  value={newMedication.dosage_form || ""}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                DEA Schedule:
                <input
                  type="text"
                  name="dea_schedule"
                  placeholder="Enter DEA schedule"
                  value={newMedication.dea_schedule || ""}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Modal for confirming deletion */}
      <Modal show={confirmDelete} onHide={() => setConfirmDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this medication?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmDelete(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => deleteItemId && handleDeleteRxItem(deleteItemId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <h1>Current Medications</h1>
      <div className="medication-list">
        {filteredMedications.length > 0 ? (
          filteredMedications.map((med) => (
            <div key={med.id} className="medication-card">
              <p><strong>Name:</strong> {med.name}</p>
              <p><strong>Strength:</strong> {med.strength}</p>
              <p><strong>NDC:</strong> {med.ndc}</p>
              <p><strong>Expiration:</strong> {med.expiration}</p>
              <p><strong>Lot Number:</strong> {med.lot_number}</p>
              <p><strong>Dosage Form:</strong> {med.dosage_form}</p>
              <p><strong>DEA Schedule:</strong> {med.dea_schedule}</p>
              <Button
                className="edit-button"
                variant="warning"
                onClick={() => {
                  setNewMedication(med);
                  setShow(true);
                }}
              >
                Edit
              </Button>
              <Button
                className="delete-button"
                variant="danger"
                onClick={() => {
                  setDeleteItemId(med.id);
                  setConfirmDelete(true);
                }}
              >
                Delete
              </Button>
            </div>
          ))
        ) : (
          <div className="no-medications">No medications found</div>
        )}
      </div>
    </div>
  );
};

export default Medication;