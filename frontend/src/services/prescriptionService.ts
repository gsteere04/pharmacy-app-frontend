const API_URL = 'http://localhost:8000'; // Adjust this to your FastAPI server URL

// Models based on your SQLModel
interface Prescription {
  rx_number?: number;
  patient_id: number;
  prescriber_id: number;
  prescribed_date: string; // 'YYYY-MM-DD' format
  rx_item_id: number;
  directions: string;
  quantity: number;
  quantity_dispensed: number;
  refills: number;
  status: string;
  tech_initials: string;
}

interface Patient {
  id?: number;
  first_name: string;
  last_name: string;
  date_of_birth: string; // 'YYYY-MM-DD' format
  phone_number: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  allergies: string;
  insurance_name?: string;
  insurance_member_id?: string;
  insurance_group_number?: string;
  insurance_rx_bin?: string;
  insurance_rx_pcn?: string;
  insurance_person_code: string;
}

interface Prescriber {
  id?: number;
  first_name: string;
  last_name: string;
  prescriber_type: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  contact_number?: string;
  dea?: string;
  npi?: string;
}

interface RxItem {
  id?: number;
  name: string;
  strength: string;
  ndc: string;
  expiration: string; // 'YYYY-MM-DD' format
  lot_number: string;
  dosage_form: string;
  dea_schedule?: string;
}

// *************** Prescription Services ***************
// Fetch all prescriptions
export const getAllPrescriptions = async (): Promise<Prescription[]> => {
  const response = await fetch(`${API_URL}/prescriptions`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch prescriptions');
  return await response.json();
};

// Fetch a single prescription by ID
export const getPrescriptionById = async (rx_number: number): Promise<Prescription> => {
  const response = await fetch(`${API_URL}/prescriptions/${rx_number}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to fetch prescription');
  return await response.json();
};

// Create a new prescription
export const createPrescription = async (prescription: Prescription): Promise<Prescription> => {
  const response = await fetch(`${API_URL}/prescriptions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(prescription),
  });
  if (!response.ok) throw new Error('Failed to create prescription');
  return await response.json();
};

// Update an existing prescription
export const updatePrescription = async (rx_number: number, prescription: Prescription): Promise<Prescription> => {
  const response = await fetch(`${API_URL}/prescriptions/${rx_number}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(prescription),
  });
  if (!response.ok) throw new Error('Failed to update prescription');
  return await response.json();
};

// Delete a prescription
export const deletePrescription = async (rx_number: number): Promise<void> => {
  const response = await fetch(`${API_URL}/prescriptions/${rx_number}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete prescription');
};

// *************** Patient Services ***************
// Fetch all patients
export const getAllPatients = async (): Promise<Patient[]> => {
  const response = await fetch(`${API_URL}/patients`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to fetch patients');
  return await response.json();
};

// Fetch a single patient by ID
export const getPatientById = async (id: number): Promise<Patient> => {
  const response = await fetch(`${API_URL}/patients/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to fetch patient');
  return await response.json();
};

// Create a new patient
export const createPatient = async (patient: Patient): Promise<Patient> => {
  const response = await fetch(`${API_URL}/patients`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patient),
  });
  if (!response.ok) throw new Error('Failed to create patient');
  return await response.json();
};

// Update an existing patient
export const updatePatient = async (id: number, patient: Patient): Promise<Patient> => {
  const response = await fetch(`${API_URL}/patients/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patient),
  });
  if (!response.ok) throw new Error('Failed to update patient');
  return await response.json();
};

// Delete a patient
export const deletePatient = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/patients/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete patient');
};

// *************** Prescriber Services ***************
// Fetch all prescribers
export const getAllPrescribers = async (): Promise<Prescriber[]> => {
  const response = await fetch(`${API_URL}/prescribers`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to fetch prescribers');
  return await response.json();
};

// Fetch a single prescriber by ID
export const getPrescriberById = async (id: number): Promise<Prescriber> => {
  const response = await fetch(`${API_URL}/prescribers/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to fetch prescriber');
  return await response.json();
};

// Create a new prescriber
export const createPrescriber = async (prescriber: Prescriber): Promise<Prescriber> => {
  const response = await fetch(`${API_URL}/prescribers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(prescriber),
  });
  if (!response.ok) throw new Error('Failed to create prescriber');
  return await response.json();
};

// Update an existing prescriber
export const updatePrescriber = async (id: number, prescriber: Prescriber): Promise<Prescriber> => {
  const response = await fetch(`${API_URL}/prescribers/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(prescriber),
  });
  if (!response.ok) throw new Error('Failed to update prescriber');
  return await response.json();
};

// Delete a prescriber
export const deletePrescriber = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/prescribers/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete prescriber');
};

// *************** Rx Item Services ***************
// Fetch all Rx items
export const getAllRxItems = async (): Promise<RxItem[]> => {
  const response = await fetch(`${API_URL}/rxitems`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to fetch Rx items');
  return await response.json();
};

// Fetch a single Rx item by ID
export const getRxItemById = async (id: number): Promise<RxItem> => {
  const response = await fetch(`${API_URL}/rxitems/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to fetch Rx item');
  return await response.json();
};

// Create a new Rx item
export const createRxItem = async (rxItem: RxItem): Promise<RxItem> => {
  const response = await fetch(`${API_URL}/rxitems`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(rxItem),
  });
  if (!response.ok) throw new Error('Failed to create Rx item');
  return await response.json();
};

// Update an existing Rx item
export const updateRxItem = async (id: number, rxItem: RxItem): Promise<RxItem> => {
  const response = await fetch(`${API_URL}/rxitems/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(rxItem),
  });
  if (!response.ok) throw new Error('Failed to update Rx item');
  return await response.json();
};

// Delete an Rx item
export const deleteRxItem = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/rxitems/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete Rx item');
};
