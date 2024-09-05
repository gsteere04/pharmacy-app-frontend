import { PatientBasicInfo } from "../pages/Patients Page/PatientList";
import { PatientDetailInfo } from "../types/patientTypes";

// Fetching Patients (default export)
export async function fetchPatients(): Promise<PatientBasicInfo[]> {
    try {
        const response = await fetch('http://localhost:8000/patients', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const patients: PatientBasicInfo[] = await response.json();
        return patients;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        return [];
    }
}

// Fetch a single patient by ID
export async function fetchPatientById(id: number): Promise<PatientDetailInfo> {
    const response = await fetch(`http://localhost:8000/patients/${id}`);
  
    if (!response.ok) {
        throw new Error('Failed to fetch patient');
    }

    const data: PatientDetailInfo = await response.json();
    return data;
}

// Deleting a patient by ID (fixed typo)
export async function deletePatient(patientId: number): Promise<void> {
    try {
        const response = await fetch(`http://localhost:8000/patients/${patientId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to delete patient');
        }
        console.log(`Patient with ID ${patientId} deleted successfully.`);
    } catch (error) {
        console.error("There was a problem deleting the patient:", error);
    }
}

export default fetchPatients;
