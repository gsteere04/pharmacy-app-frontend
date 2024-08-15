import React from "react";
import "./Prescription.css";

const Prescription: React.FC = () => {
  return (
    <div className="prescription">
      <div className="prescription-action">
        <h2>New/Refill Prescription -- Sample/Grant (Rx Number: ---)</h2>
      </div>
      <div className="prescription-details">
        <form>
          <label>
            Patient:
            <input type="text" name="patient" />
          </label>
        </form>
        <form>
          <label>
            Prescriber:
            <input type="text" name="prescriber" />
          </label>
        </form>
        <form>
          <label>
            Item:
            <input type="text" name="item" />
          </label>
        </form>
      </div>
    </div>
  );
};

export default Prescription;
