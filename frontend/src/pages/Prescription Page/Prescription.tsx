import React, { useRef, useState } from "react";
import "./Prescription.css";

const Prescription: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const [rxNumber, setRxNumber] = useState("");
  const [patient, setPatient] = useState("");
  const [prescriber, setPrescriber] = useState("");
  const [item, setItem] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [allergies, setAllergies] = useState("");
  const [quantityWritten, setQuantityWritten] = useState("");
  const [quantityDispensed, setQuantityDispensed] = useState("");
  const [refillsDespensed, setRefillsDespensed] = useState("");
  const [quantityRemaining, setQuantityRemaining] = useState("");
  const [directions, setDirections] = useState("");

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
    const newPrescription = {
      rxNumber,
      patient,
      prescriber,
      item,
      address,
      phone,
      dob,
      allergies,
      quantityWritten,
      quantityDispensed,
      quantityRemaining,
      refillsDespensed,
      directions,
      imageSrc,
    };

    const savedPrescriptions = JSON.parse(
      localStorage.getItem("prescription") || "[]"
    );
    savedPrescriptions.push(newPrescription);
    localStorage.setItem("prescriptions", JSON.stringify(savedPrescriptions));
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
          <h3>New/Refill Prescription -- Sample/Name (Rx Number: ---)</h3>
        </div>
      </div>

      <div className="cards">
        <div className="prescription-details">
          <form className="input-form">
            <label>
              Patient:
              <input
                type="text"
                name="patient"
                placeholder="Ex. John Doe"
                value={patient}
                onChange={(e) => setPatient(e.target.value)}
              />
            </label>
            <label>
              Prescriber:
              <input
                type="text"
                name="prescriber"
                placeholder="Ex. John Cena"
                value={prescriber}
                onChange={(e) => setPrescriber(e.target.value)}
              />
            </label>
            <label>
              Item:
              <input
                type="text"
                name="item"
                placeholder="Ex. Motrin"
                value={item}
                onChange={(e) => setItem(e.target.value)}
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
                onChange={(e) => setAddress(e.target.value)}
                readOnly
              />
            </label>
            <label>
              Phone:
              <input
                type="text"
                name="phone"
                placeholder="Ex. 435-1000-0000"
                onChange={(e) => setPhone(e.target.value)}
                readOnly
              />
            </label>
            <label>
              DOB:
              <input
                type="text"
                name="dob"
                placeholder="Ex. 8/15/1864"
                onChange={(e) => setDob(e.target.value)}
                readOnly
              />
            </label>
            <label>
              Allergies:
              <input
                type="text"
                name="allergies"
                placeholder="Ex. Peanut"
                onChange={(e) => setAllergies(e.target.value)}
                readOnly
              />
            </label>
          </form>
        </div>


      <div className="image-upload">
        <form>
          <label>
            Prescription Image:
            <input
              type="file"
              name="prescription-image"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <button
              type="button"
              onClick={handleUploadClick}
              className="upload-button"
            >
              Upload Image
            </button>
            <button
            type="button"
            onClick={handleRemoveImage}
            className="remove-button"
            >
              Remove Image
            </button>
          </label>
        </form>

        {imageSrc && (
          <div className="image-preview">
            <img src={imageSrc} alt="Prescription" />
          </div>
        )}
      </div>

        
      </div>

      <div className="rx-values">
        <div className="quant-written">
          <form>
            <label>
              Quantity Written:
              <input
                type="text"
                name="written"
                placeholder="Ex. 100"
                onChange={(e) => setQuantityWritten(e.target.value)}
              />
            </label>
          </form>
        </div>
        <div className="quant-dispensed">
          <form>
            <label>
              Quantity Dispensed:
              <input
                type="text"
                name="dispensed"
                placeholder="Ex. 100"
                onChange={(e) => setQuantityDispensed(e.target.value)}
              />
            </label>
          </form>
        </div>
        <div className="refills">
          <form>
            <label>
              Refills Dispensed:
              <input
                type="text"
                name="refills"
                placeholder="Ex. 100"
                onChange={(e) => setRefillsDespensed(e.target.value)}
              />
            </label>
          </form>
        </div>
        <div className="remaining">
          <form>
            <label>
              Quantity Remaining:
              <input
                type="text"
                name="remaining"
                placeholder="Ex. 100"
                onChange={(e) => setQuantityRemaining(e.target.value)}
              />
            </label>
          </form>
        </div>
      </div>
      <div className="directions">
        <form>
          <label>
            Directions:
            <input
              type="text"
              name="directions"
              placeholder="Ex. Take at night"
              onChange={(e) => setDirections(e.target.value)}
            />
          </label>
        </form>
      </div>
      <div className="save-button">
        <button type="button" onClick={handleSubmit}>
          Save Prescription
        </button>
      </div>
    </div>
  );
};

export default Prescription;
