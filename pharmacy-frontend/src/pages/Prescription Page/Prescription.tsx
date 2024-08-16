import React, { useRef } from "react";
import "./Prescription.css";

const Prescription: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="prescription">
      <div className="action-rx-number">
        <div className="rx-number">
          <form>
            <label>
              Rx Number:
              <input type="text" name="rx" placeholder="Ex. 1234" />
            </label>
          </form>
        </div>
        <div className="prescription-action">
          <h3>New/Refill Prescription -- Sample/Name (Rx Number: ---)</h3>
        </div>
      </div>

      <div className="cards">
        <div className="prescription-details">
          <form>
            <label>
              Patient:
              <input type="text" name="patient" placeholder="Ex. John Doe" />
            </label>
            <label>
              Prescriber:
              <input
                type="text"
                name="prescriber"
                placeholder="Ex. John Cena"
              />
            </label>
            <label>
              Item:
              <input type="text" name="item" placeholder="Ex. Motrin" />
            </label>
          </form>
        </div>

        <div className="patient-card">
          <h3>Patient Information</h3>
          <form>
            <label>
              Address:
              <input type="text" name="address" placeholder="Ex. 296 The Moon" />
            </label>
            <label>
              Phone:
              <input type="text" name="phone" placeholder="Ex. 435-1000-0000" />
            </label>
            <label>
              DOB:
              <input type="text" name="dob" placeholder="Ex. 8/15/1864" />
            </label>
            <label>
              Allergies:
              <input type="text" name="allergies" placeholder="Ex. Peanut" />
            </label>
          </form>
        </div>
      </div>

      <div className="rx-values">
        <div className="quant-written">
          <form>
            <label>
              Quantity Written:
              <input type="text" name="written" placeholder="Ex. 100" />
            </label>
          </form>
        </div>
        <div className="quant-dispensed">
          <form>
            <label>
              Quantity Dispensed:
              <input type="text" name="dispensed" placeholder="Ex. 100" />
            </label>
          </form>
        </div>
        <div className="refills">
          <form>
            <label>
              Refills Dispensed:
              <input type="text" name="refills" placeholder="Ex. 100" />
            </label>
          </form>
        </div>
        <div className="remaining">
          <form>
            <label>
              Quantity Remaining:
              <input type="text" name="remaining" placeholder="Ex. 100" />
            </label>
          </form>
        </div>
      </div>
      <div className="directions">
        <form>
          <label>
            Directions:
            <input type="text" name="directions" placeholder="Ex. Take at night" />
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
              style={{ display: 'none' }} // Hide the file input
            />
            <button type="button" onClick={handleUploadClick} className="upload-button">
              Upload Image
            </button>
          </label>
        </form>
      </div>
    </div>
  );
};

export default Prescription;
