import React, { useRef, useState, useEffect } from "react";
import "./Prescription.css";

const Prescription: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const [rxNumber, setRxNumber] = useState("");
  const [patientId, setPatientId] = useState<number | "">("");
  const [prescriberId, setPrescriberId] = useState<number | "">("");
  const [item, setItem] = useState("");
  const [prescribedDate, setPrescribedDate] = useState<string>("");
  const [directions, setDirections] = useState("");
  const [quantityWritten, setQuantityWritten] = useState("");
  const [quantityDispensed, setQuantityDispensed] = useState("");
  const [refills, setRefills] = useState("");
  const [quantityRemaining, setQuantityRemaining] = useState("");
  const [techInitials, setTechInitials] = useState("");

  const [patientData, setPatientData] = useState<any | null>(null);
  const [prescriberData, setPrescriberData] = useState<any | null>(null);

  useEffect(() => {
    if (patientId !== "") {
      fetch(`http://localhost:8000/patients/${patientId}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            // If patient is not found, clear the patient data
            setPatientData(null);
            return null;
          }
        })
        .then((data) => {
          if (data) {
            setPatientData(data);
          } else {
            // If no data is returned, clear the fields
            setPatientData(null);
          }
        })
        .catch((error) => console.error("Error fetching patient data:", error));
    } else {
      setPatientData(null); // Clear patient data if no ID is provided
    }
  }, [patientId]);

  useEffect(() => {
    if (prescriberId !== "") {
      fetch(`http://localhost:8000/prescribers/${prescriberId}`)
        .then((response) => response.json())
        .then((data) => {
          setPrescriberData(data);
        })
        .catch((error) => console.error("Error fetching prescriber data:", error));
    } else {
      setPrescriberData(null); // Clear prescriber data if no ID is provided
    }
  }, [prescriberId]);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageSrc(null);
  };

  const handleSubmit = () => {
    const quantityWrittenNumber = Number(quantityWritten);
    const quantityDispensedNumber = Number(quantityDispensed);
    const refillsNumber = Number(refills);
    const quantityRemainingNumber = Number(quantityRemaining);

    const newPrescription = {
      rx_number: Number(rxNumber),
      patient_id: Number(patientId),
      prescriber_id: Number(prescriberId),
      prescribed_date: prescribedDate,
      rx_item_id: Number(item),
      directions,
      quantity: quantityWrittenNumber,
      quantity_dispensed: quantityDispensedNumber,
      refills: refillsNumber,
      quantity_remaining: quantityRemainingNumber,
      status: "pending",
      tech_initials: techInitials,
      image_src: imageSrc,
    };

    fetch("http://localhost:8000/prescriptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPrescription),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Prescription saved successfully:", data);
      })
      .catch((error) => console.error("Error saving prescription:", error));
  };

  return (
    <div className="prescription">
      <div className="action-rx-number">
        <div className="rx-number">
          <form className="input-form">
            <label>
              Rx Number:
              <input
                type="text"
                name="rx"
                placeholder="Ex. 1234"
                value={rxNumber}
                onChange={(e) => setRxNumber(e.target.value)}
              />
            </label>
          </form>
        </div>
        <div className="prescription-action">
          <h3>New/Refill Prescription</h3>
        </div>
      </div>

      <div className="cards">
        <div className="prescription-details">
          <form className="input-form">
            <label>
              Patient ID:
              <input
                type="number"
                name="patientId"
                placeholder="Ex. 1"
                value={patientId === "" ? "" : patientId}
                onChange={(e) => setPatientId(Number(e.target.value))}
              />
            </label>
            <label>
              Prescriber ID:
              <input
                type="number"
                name="prescriberId"
                placeholder="Ex. 1"
                value={prescriberId === "" ? "" : prescriberId}
                onChange={(e) => setPrescriberId(Number(e.target.value))}
              />
            </label>
            <label>
              Item ID:
              <input
                type="text"
                name="item"
                placeholder="Ex. 1"
                value={item}
                onChange={(e) => setItem(e.target.value)}
              />
            </label>
            <label>
              Prescribed Date:
              <input
                type="date"
                name="prescribedDate"
                value={prescribedDate}
                onChange={(e) => setPrescribedDate(e.target.value)}
              />
            </label>
          </form>
        </div>

        <div className="patient-card">
          <h3>Patient Information</h3>
          <form className="input-forms">
            <label>
              Address:
              <input
                type="text"
                name="address"
                placeholder="Ex. 296 The Moon"
                value={patientData ? `${patientData.street}, ${patientData.city}, ${patientData.state} ${patientData.zipcode}` : ""}
                readOnly
              />
            </label>
            <label>
              Phone:
              <input
                type="text"
                name="phone"
                placeholder="Ex. 435-1000-0000"
                value={patientData ? patientData.phone_number : ""}
                readOnly
              />
            </label>
            <label>
              DOB:
              <input
                type="text"
                name="dob"
                placeholder="Ex. 8/15/1864"
                value={patientData ? patientData.date_of_birth : ""}
                readOnly
              />
            </label>
            <label>
              Allergies:
              <input
                type="text"
                name="allergies"
                placeholder="Ex. Peanut"
                value={patientData ? patientData.allergies : ""}
                readOnly
              />
            </label>
          </form>
        </div>

        <div className="prescriber-card">
          <h3>Prescriber Information</h3>
          <form className="input-forms">
            <label>
              Name:
              <input
                type="text"
                name="prescriberName"
                placeholder="Ex. Dr. John Doe"
                value={prescriberData ? `${prescriberData.first_name} ${prescriberData.last_name}` : ""}
                readOnly
              />
            </label>
            <label>
              Address:
              <input
                type="text"
                name="prescriberAddress"
                placeholder="Ex. 1234 Elm St"
                value={prescriberData ? `${prescriberData.street}, ${prescriberData.city}, ${prescriberData.state} ${prescriberData.zipcode}` : ""}
                readOnly
              />
            </label>
            <label>
              Phone:
              <input
                type="text"
                name="prescriberPhone"
                placeholder="Ex. 435-1000-0000"
                value={prescriberData ? prescriberData.contact_number : ""}
                readOnly
              />
            </label>
            <label>
              DEA:
              <input
                type="text"
                name="prescriberDEA"
                placeholder="Ex. AB1234567"
                value={prescriberData ? prescriberData.dea : ""}
                readOnly
              />
            </label>
            <label>
              NPI:
              <input
                type="text"
                name="prescriberNPI"
                placeholder="Ex. 1234567890"
                value={prescriberData ? prescriberData.npi : ""}
                readOnly
              />
            </label>
          </form>
        </div>

        <div className="image-upload">
          <form>
            <label>
              Upload Image:
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <button type="button" onClick={handleUploadClick}>
                Upload Image
              </button>
              {imageSrc && (
                <div className="image-preview">
                  <img src={imageSrc} alt="Prescription" />
                  <button type="button" onClick={handleRemoveImage}>
                    Remove Image
                  </button>
                </div>
              )}
            </label>
          </form>
        </div>

        <div className="prescription-details">
          <form className="input-forms">
            <label>
              Directions:
              <input
                type="text"
                name="directions"
                placeholder="Ex. Take one pill daily"
                value={directions}
                onChange={(e) => setDirections(e.target.value)}
              />
            </label>
            <label>
              Quantity Written:
              <input
                type="number"
                name="quantityWritten"
                placeholder="Ex. 30"
                value={quantityWritten}
                onChange={(e) => setQuantityWritten(e.target.value)}
              />
            </label>
            <label>
              Quantity Dispensed:
              <input
                type="number"
                name="quantityDispensed"
                placeholder="Ex. 30"
                value={quantityDispensed}
                onChange={(e) => setQuantityDispensed(e.target.value)}
              />
            </label>
            <label>
              Refills:
              <input
                type="number"
                name="refills"
                placeholder="Ex. 5"
                value={refills}
                onChange={(e) => setRefills(e.target.value)}
              />
            </label>
            <label>
              Quantity Remaining:
              <input
                type="number"
                name="quantityRemaining"
                placeholder="Ex. 0"
                value={quantityRemaining}
                onChange={(e) => setQuantityRemaining(e.target.value)}
              />
            </label>
            <label>
              Tech Initials:
              <input
                type="text"
                name="techInitials"
                placeholder="Ex. J.D."
                value={techInitials}
                onChange={(e) => setTechInitials(e.target.value)}
              />
            </label>
          </form>
        </div>

        <div className="submit">
          <button onClick={handleSubmit}>Submit Prescription</button>
        </div>
      </div>
    </div>
  );
};

export default Prescription;
