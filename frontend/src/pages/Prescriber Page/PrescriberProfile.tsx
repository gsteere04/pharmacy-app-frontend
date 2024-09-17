import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPrescriberById } from "../../services/prescriberService";
import { PrescriberDetailInfo } from "../../types/prescriberTypes";
import "./PrescriberProfile.css";

const PrescriberProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [prescriber, setPrescriber] = useState<PrescriberDetailInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPrescriber = async () => {
      try {
        const data = await fetchPrescriberById(Number(id));
        setPrescriber(data);
      } catch (error) {
        setError("Failed to load prescriber details");
      } finally {
        setLoading(false);
      }
    };

    loadPrescriber();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="prescriber-profile-container">
      {prescriber ? (
        <div className="prescriber-profile">
          <div className="profile-header">
            <h2>{prescriber.first_name} {prescriber.last_name}</h2>
            <span className="prescriber-type">{prescriber.prescriber_type}</span>
          </div>
          <div className="profile-content">
            <div className="profile-section">
              <h3>Contact Information</h3>
              <p><strong>Address:</strong> {prescriber.street}, {prescriber.city}, {prescriber.state} {prescriber.zipcode}</p>
              <p><strong>Phone:</strong> {prescriber.contact_number || 'N/A'}</p>
            </div>
            <div className="profile-section">
              <h3>Professional Details</h3>
              <p><strong>DEA Number:</strong> {prescriber.dea || 'N/A'}</p>
              <p><strong>NPI Number:</strong> {prescriber.npi || 'N/A'}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="no-data">No prescriber data available</p>
      )}
    </div>
  );
};

export default PrescriberProfile;
