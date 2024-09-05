// pages/PatientDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPatientById } from "../../services/patientService";
import { PatientDetailInfo } from "../../types/patientTypes";

const PatientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<PatientDetailInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPatient = async () => {
      try {
        if (id) {
          const data = await fetchPatientById(parseInt(id));
          setPatient(data);
        }
      } catch (error) {
        setError("Failed to load patient details");
      }
    };

    loadPatient();
  }, [id]);

  if (error) return <div className="error-message">{error}</div>;
  if (!patient) return <div>Loading...</div>;

  return (
    <div className="patient-detail">
      <h1>{`${patient.first_name} ${patient.last_name}`}</h1>
      <p>Date of Birth: {patient.date_of_birth}</p>
      <p>Phone Number: {patient.phone_number}</p>
      <p>Street: {patient.street}</p>
      <p>City: {patient.city}</p>
      <p>State: {patient.state}</p>
      <p>Zipcode: {patient.zipcode}</p>
      <p>Allergies: {patient.allergies}</p>
      <h2>Insurance Information</h2>
      <p>Insurance Name: {patient.insurance_name || "N/A"}</p>
      <p>Insurance Member ID: {patient.insurance_member_id || "N/A"}</p>
      <p>Insurance Group Number: {patient.insurance_group_number || "N/A"}</p>
      <p>Insurance RX Bin: {patient.insurance_rx_bin || "N/A"}</p>
      <p>Insurance RX PCN: {patient.insurance_rx_pcn || "N/A"}</p>
      <p>Insurance Person Code: {patient.insurance_person_code || "N/A"}</p>
    </div>
  );
};

export default PatientDetail;
