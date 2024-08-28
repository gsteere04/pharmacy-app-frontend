// NOTE Doctor = Prescriber.  const and function naming is inconsistent.

type DoctorBasicInfo = {
    first_name: string;
    last_name: string;
    prescriber_type: string;
    street: string;
    city: string;
    state: string;
    zipcode: string;
    contact_number: string;
    dea: string
    npi: string
};

async function fetchDoctors(): Promise<DoctorBasicInfo[]> {
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

        const doctors: DoctorBasicInfo[] = await response.json();
        console.log(doctors);
        return doctors;
    }   catch(error) {
        console.error("There was a problem with the fetch operation:", error);
        return [];

        };
        
    }



export default fetchDoctors;