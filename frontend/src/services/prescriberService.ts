import { PrescriberDetailInfo } from "../types/prescriberTypes";
import { PrescriberBasicInfo } from "../pages/Prescriber Page/PrescriberList";
// Fetching Prescribers (default export)
export async function fetchPrescribers(): Promise<PrescriberBasicInfo[]> {
    try {
        const response = await fetch('http://localhost:8000/prescribers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const prescribers: PrescriberBasicInfo[] = await response.json();
        return prescribers;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        return [];
    }
}

// Fetch a single prescriber by ID
export async function fetchPrescriberById(id: number): Promise<PrescriberDetailInfo> {
    const response = await fetch(`http://localhost:8000/prescribers/${id}`);
  
    if (!response.ok) {
        throw new Error('Failed to fetch prescriber');
    }

    const data: PrescriberDetailInfo = await response.json();
    return data;
}

// Deleting a prescriber by ID (fixed typo)
export async function deletePrescriber(prescriberId: number): Promise<void> {
    try {
        const response = await fetch(`http://localhost:8000/prescriber/${prescriberId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to delete prescriber');
        }
        console.log(`Prescriber with ID ${prescriberId} deleted successfully.`);
    } catch (error) {
        console.error("There was a problem deleting the prescriber:", error);
    }
}

export default fetchPrescribers;
