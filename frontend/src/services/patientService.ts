type PatientBasicInfo = {
    id: number;
    first_name: string;
    last_name: string;
    date_of_birth: string;
};

async function fetchPatients(): Promise<PatientBasicInfo[]> {
    try {
        const response = await fetch('http://localhost:8000/patients', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const patients: PatientBasicInfo[] = await response.json();
        console.log(patients);
        return patients;
    }   catch(error) {
        console.error("There was a problem with the fetch operation:", error);
        return [];

        };
        
    }
export default fetchPatients;