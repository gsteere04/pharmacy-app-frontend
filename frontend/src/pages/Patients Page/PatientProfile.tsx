import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPatientById } from "../../services/patientService"; // Import the fetchPatientById function
import { PatientDetailInfo } from "../../types/patientTypes";
import "./PatientProfile.css"

const PatientProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<PatientDetailInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPatient = async () => {
      try {
        // Ensure ID is converted to number
        const data = await fetchPatientById(Number(id)); 
        setPatient(data);
      } catch (error) {
        setError("Failed to load patient details");
      } finally {
        setLoading(false);
      }
    };

    loadPatient();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="patient-profile-container">
      {patient ? (
        <div className="patient-profile">
          <div className="profile-header">
            <h2>{patient.first_name} {patient.last_name}</h2>
          </div>
          <div className="profile-content">
            <div className="profile-section">
              <h3>Personal Information</h3>
              <p><strong>Date of Birth:</strong> {patient.date_of_birth}</p>
              <p><strong>Phone Number:</strong> {patient.phone_number}</p>
              <p><strong>Address:</strong> {patient.street}, {patient.city}, {patient.state} {patient.zipcode}</p>
              <p><strong>Allergies:</strong> {patient.allergies}</p>
            </div>
            <div className="profile-section">
              <h3>Insurance Information</h3>
              <p><strong>Insurance Name:</strong> {patient.insurance_name}</p>
              <p><strong>Member ID:</strong> {patient.insurance_member_id}</p>
              <p><strong>Group Number:</strong> {patient.insurance_group_number}</p>
              <p><strong>RX Bin:</strong> {patient.insurance_rx_bin}</p>
              <p><strong>RX PCN:</strong> {patient.insurance_rx_pcn}</p>
              <p><strong>Person Code:</strong> {patient.insurance_person_code}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="no-data">No patient data available</p>
      )}
    </div>
  );
};

export default PatientProfile;
