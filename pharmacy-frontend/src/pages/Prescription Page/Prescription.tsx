import React from "react";
import "./Prescription.css";

const Prescription: React.FC = () => {

    //const emptyPrescription = 
    //const filled Prescription = 
    

  return (
    <div className="prescription">
      <div className="prescription-action">
        <h3>New/Refill Prescription -- {} (Rx Number: ---)</h3>
      </div>
      <div className="cards">
        <div className="prescription-details">
          <form>
            <label>
              Patient:
              <input type="text" name="patient" placeholder="Ex. John Doe" />
            </label>
          </form>
          <form>
            <label>
              Prescriber:
              <input type="text" name="prescriber" placeholder="Ex. John Cena" />
            </label>
          </form>
          <form>
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
              Adress:
              <input type="text" name="adress" placeholder="Ex. 296 The Moon"/>
            </label>
          </form>
          <form>
            <label>
              Phone:
              <input type="text" name="phone" placeholder="Ex. 435-1000-0000" />
            </label>
          </form>
          <form>
            <label>
              DOB:
              <input type="text" name="dob" placeholder="Ex. 8/15/1864" />
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Prescription;
