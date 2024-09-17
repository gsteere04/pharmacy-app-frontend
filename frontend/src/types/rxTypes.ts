// medicationTypes.ts
export type MedicationDetailInfo = {
    id: number;
    name: string;
    strength: string;
    ndc: string;
    expiration: string; // Use ISO date string format
    lot_number: string;
    dosage_form: string;
    dea_schedule?: string; // Optional field
  };
  