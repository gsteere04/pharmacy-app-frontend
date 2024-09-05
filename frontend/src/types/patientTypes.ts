export interface PatientDetailInfo {
    first_name: string;
    last_name: string;
    date_of_birth: string;
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
    insurance_person_code?: string;
}
