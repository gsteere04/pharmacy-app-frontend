import { MedicationDetailInfo } from "../types/rxTypes";

// Fetching all medications
export async function fetchMedications(): Promise<MedicationDetailInfo[]> {
    try {
        const response = await fetch('http://localhost:8000/rx-items', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const medications: MedicationDetailInfo[] = await response.json();
        return medications;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        return [];
    }
}

// Fetch a single medication by ID
export async function fetchMedicationById(id: number): Promise<MedicationDetailInfo> {
    try {
        const response = await fetch(`http://localhost:8000/rx-items/${id}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch medication');
        }

        const data: MedicationDetailInfo = await response.json();
        return data;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        throw error;
    }
}

// Adding a new medication
export async function addMedication(medication: Partial<MedicationDetailInfo>): Promise<MedicationDetailInfo> {
  try {
    const response = await fetch("http://localhost:8000/rx-items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(medication),
    });

    if (!response.ok) {
      throw new Error("Failed to add rx item");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
}

// Updating a medication by ID
export async function updateMedication(id: number, medication: Partial<MedicationDetailInfo>): Promise<MedicationDetailInfo> {
  try {
    const response = await fetch(`http://localhost:8000/rx-items/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(medication),
    });

    if (!response.ok) {
      throw new Error("Failed to update rx item");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
}

// Deleting a medication by ID
export async function deleteRxItem(id: number): Promise<void> {
  try {
    const response = await fetch(`http://localhost:8000/rx-items/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete rx item");
    }
  } catch (error) {
    console.error("There was a problem with the delete operation:", error);
    throw error;
  }
}

export default fetchMedications;
